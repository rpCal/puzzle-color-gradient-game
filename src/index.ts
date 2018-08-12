
// document.addEventListener("DOMContentLoaded", () => { });
window.addEventListener("load", function(event) { 
    
    const width = 500;
    const height = 450;
   
    const body:HTMLElement = document.querySelector('body');
    
    let mainDiv:HTMLElement = document.createElement('div');
    mainDiv.style.width = `${width}px`;
    mainDiv.style.height = `${height}px`; 
    mainDiv.style.background = "#0ff";
    mainDiv.style.marginBottom = "20px"; 
    mainDiv.style.cssFloat = "left"
    mainDiv.style.background = "transparent"
    // mainDiv.style.background = `linear-gradient(180deg, #fff, #FF1122, #000, #FF9955, #fff)`
    body.appendChild(mainDiv);

    let wrapper:HTMLElement = document.createElement('div');
    wrapper.style.width = `${width}px`;
    wrapper.style.height = `${height}px`;
    wrapper.style.position = "relative";
    wrapper.style.cssFloat = "left"
    wrapper.classList.add('game-wrapper');
    body.appendChild(wrapper);
    const _colors = [
            {color: 0xFFFFFF, percentage: 0}, 
            {color: 0xFF1122, percentage: 0.3}, 
            {color: 0x000000, percentage: 0.5}, 
            {color: 0xFF9955, percentage: 0.7}, 
            {color: 0xFFFFFF, percentage: 1}, 
    ];

    const level_1 = new Level({
        elem: wrapper,
        rows: 5,
        cols: 3,
        gradient: { 
            type: GradientType.LINEAR, 
            colors: _colors,
            angleDeg: 180
        } as IGradient,
        blocked: [0, 2, 3, 5, 6, 8],
        onFinishedLevel: () => {}
    } as ILevelInput); 

    // let canvas = document.createElement('canvas');
    // canvas.style.width = `${width}px`;
    // canvas.style.height = `${height}px`;
    // canvas.style.position = "absolute";
    // canvas.style.top = "0px";
    // canvas.style.left = "0px";
    // canvas.style.zIndex = "100";
    // canvas.width = width;
    // canvas.height = height;
    // wrapper.appendChild(canvas);
    // let context = canvas.getContext('2d');
    // let childHeight = height / (_colors.length - 1);
    // context.fillStyle = "rgba(100, 100, 255, 1)";
    // for(let i = 0; i < _colors.length; i++){
    //     context.fillRect(0, (childHeight * i) - 1, width, 2);
    // }
   
    
});




enum GradientType {
    LINEAR = 1,
    QUAD = 2,
}

type GradientColor = {
    color: number,
    percentage: number
}

interface IGradient {
    type: GradientType,
    colors: Array<GradientColor>,
    angleDeg: number 
}

interface ILevelInput {
    elem: HTMLElement, 
    rows: number,
    cols: number,
    gradient: IGradient,
    blocked: Array<number>,
    onFinishedLevel: Function
}
type LevelChildren = {
    elem: HTMLElement,
    isBlocked: boolean,
    startTop: number,
    startLeft: number,
    isMouseDownPressed?: boolean,
}

class Level {
    parentElement: HTMLElement = null;
    parentWidth: number;
    parentHeight: number;
    rows:number;
    cols:number;
    childrens: Array<LevelChildren> = [];
    gradient: IGradient;
    mainChildCanvas: HTMLCanvasElement;
    blockedChildrensIndexes: Array<number>

    constructor(initOptions: ILevelInput){
        // wyzerowac kontener z poprzednich danych
        this.parentElement = initOptions.elem;
        this.clearParentElement();
        // odczytac w & h kontenera .elem
        this.readContainerSize();

        
        this.rows = initOptions.rows;
        this.cols = initOptions.cols;

        this.gradient = initOptions.gradient;
        this.createMainChildCanvas();
        
        // stworzyc dzieci 
        // nalozyc gradient na dzieci
        this.createChildrens();

        // zablokowac dzieci ktore sa w .blocked
        this.blockedChildrensIndexes = initOptions.blocked;
        this.blockChildrens();
        
        // podpiac eventy do dziecki 
        this.attachEvents();
        // nasluchiwac na event zakoczenia levela
        
    }

    detachEvents(){
        for(let i:number = 0, child; child = this.childrens[i]; i++){
            let childClone  = child.elem.cloneNode(true);
            child.elem.parentNode.replaceChild(childClone, child.elem);
            child.elem = childClone as HTMLElement;
        }
    }

    attachEvents(){
        for(let i:number = 0, child:LevelChildren; child = this.childrens[i]; i++){
            
            let { elem, isBlocked, startLeft, startTop } = child;

            if(isBlocked){ continue; }

            let shiftTop = 0;
            let shiftLeft = 0;

            const onMouseMove = (ev: MouseEvent) => {
                if(child.isMouseDownPressed){        
                    let newLeft = ev.clientX - this.parentElement.offsetLeft + shiftLeft;
                    let newTop = ev.clientY - this.parentElement.offsetTop + shiftTop;
                    console.log('?', 
                        this.parentElement.offsetLeft, this.parentElement.offsetTop,
                        ev.clientX, ev.clientY, 
                        ev.clientX - this.parentElement.offsetLeft, ev.clientY - this.parentElement.offsetTop,
                        elem.style.top, elem.style.left)
                    elem.style.top = `${newTop}px`;
                    elem.style.left = `${newLeft}px`;
                }
            }
            
            const onMouseUp = (ev: MouseEvent) => {
                elem.style.transform = "scale(1)";
                elem.style.zIndex = "1";
                elem.style.top = `${startTop}px`;
                elem.style.left = `${startLeft}px`;
                child.isMouseDownPressed = false;
                elem.removeEventListener('mouseup', onMouseUp);
                elem.removeEventListener('mousemove', onMouseMove);
            }

            const onMouseDown = (ev: MouseEvent) => {
                // elem.style.transform = "scale(1.3)";
                // elem.style.zIndex = "2";
                // child.isMouseDownPressed = true;
                console.log('jakie przesuniecie?')
                console.log('?', ev.clientX, ev.clientY,
                elem.offsetTop, elem.offsetLeft, "|",
                        ev.clientX - elem.offsetLeft, ev.clientY - elem.offsetTop)

                // shiftTop = ev.clientX - this.parentElement.offsetLeft;
                // shiftLeft = ev.clientY - this.parentElement.offsetTop;
                // elem.addEventListener('mouseup', onMouseUp)
                // elem.addEventListener('mousemove', onMouseMove);
            }
            
            elem.addEventListener('mousedown', onMouseDown);
        }
    }

    blockChildrens(){
        for(let i:number = 0; i < this.blockedChildrensIndexes.length; i++){
            let index = this.blockedChildrensIndexes[i];
            this.childrens[index].isBlocked = true;
            this.childrens[index].elem.style.opacity = "0.5";
            this.childrens[index].elem.style.cursor = "default";
        }
    }


    createMainChildCanvas(){
        let mainChildCanvas = document.createElement('canvas');
        mainChildCanvas.width = this.parentWidth;
        mainChildCanvas.height = this.parentHeight;
        mainChildCanvas.style.opacity = "0.01";
        mainChildCanvas.style.position = "absolute";
        mainChildCanvas.style.top = "0px";
        mainChildCanvas.style.left = "0px";
        mainChildCanvas.style.zIndex = "0";

        let mainChildCanvasCTX = mainChildCanvas.getContext('2d');
        
        let pheta = Math.atan2(-mainChildCanvas.height, mainChildCanvas.width);
        let AB = Math.abs(mainChildCanvas.height * Math.cos(pheta)); 

        let xdx = Math.cos(pheta + Math.PI/2);
        let xdy = Math.sin(pheta + Math.PI/2);

        let x1 = mainChildCanvas.width/2 - xdx * AB;
        let y1 = mainChildCanvas.height/2 - xdy * AB;
        let x2 = mainChildCanvas.width/2 + xdx * AB;
        let y2 = mainChildCanvas.height/2 + xdy * AB;

        const hexToRgb = (hex:number) => {
            var r = (hex >> 16) & 255;
            var g = (hex >> 8) & 255;
            var b = hex & 255;
            return {r, g, b};
        }

        const componentToHex = (c:number) => {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        
        const rgbToHex = (r:number, g:number, b:number) => {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }

        let gradient = mainChildCanvasCTX.createLinearGradient(x1, y1, x2, y2);

        for(let i:number = 0, el:GradientColor; el = this.gradient.colors[i]; i++){
            let percentage = 0;
            if(el.percentage < 0){
                percentage = 0;
            }else if (el.percentage > 1){
                percentage = 1;
            }else{
                percentage = el.percentage;
            }
            let hex = hexToRgb(el.color);
            let color = `${rgbToHex(hex.r, hex.g, hex.b)}`;
            gradient.addColorStop(percentage, color);    
        }

        mainChildCanvasCTX.fillStyle = gradient;
        mainChildCanvasCTX.fillRect(0, 0, mainChildCanvas.width, mainChildCanvas.height);

        this.parentElement.appendChild(mainChildCanvas);
        this.mainChildCanvas = mainChildCanvas;
    }

    createChildrens(){
        let iterateCount = this.rows * this.cols;
        let childHeight = Math.ceil(this.parentHeight / this.rows);
        let childWidth = Math.ceil(this.parentWidth / this.cols);
        
        for(let i:number = 0; i < iterateCount; i++){
            let child = document.createElement('div');

            child.style.background = "transparent";
            child.style.width = `${childWidth}px`;
            child.style.height = `${childHeight}px`;
            child.style.position = "absolute";
            child.style.zIndex = "1";
            child.style.opacity = "1";
            child.style.cursor = "move";
            child.style.border = "1px solid #000";
            child.style.transform = "scale(1)";

            let currentRow = Math.floor(i / this.cols);
            let top = childHeight * currentRow;
            child.style.top = `${top}px`;

            let curretCol = Math.floor(i % this.cols);
            let left = childWidth * curretCol;
            child.style.left = `${left}px`;

            let childCanvas = document.createElement('canvas');
            childCanvas.width = childWidth;
            childCanvas.height = childHeight;
            let childCTX = childCanvas.getContext('2d');

            childCTX.drawImage(this.mainChildCanvas, 
                left, top, childWidth, childHeight, 0, 0, childWidth, childHeight);

            child.appendChild(childCanvas);
            this.parentElement.appendChild(child);
            this.childrens.push({
                elem: child,
                isBlocked: false,
                startLeft: left,
                startTop: top
            } as LevelChildren);
        }
    }


    // fillChildrendWithGradient(){
    //     // interface IGradient {
    //     //     type: GradientType,
    //     //     colors: Array<number>,
    //     //     angleDeg: number 
    //     // }
        
    //     const hexToRgb = (hex:number) => {
    //         var r = (hex >> 16) & 255;
    //         var g = (hex >> 8) & 255;
    //         var b = hex & 255;
    //         return r + "," + g + "," + b;
    //     }

    //     const calculateRgbByPercentage = (colorStart:number, colorEnd:number, percentage:number) =>{
    //         let r_start = (colorStart >> 16) & 255;
    //         let g_start = (colorStart >> 8) & 255;
    //         let b_start = colorStart & 255;

    //         let r_end = (colorEnd >> 16) & 255;
    //         let g_end = (colorEnd >> 8) & 255;
    //         let b_end = colorEnd & 255;

            
    //         let r_finish = r_start + ((r_end - r_start) * percentage);
    //         let g_finish = g_start + ((g_end - g_start) * percentage);
    //         let b_finish = b_start + ((b_end - b_start) * percentage);
    //         console.log('COLOR R', r_start, r_end, r_finish) 
    //         console.log('COLOR G', g_start, g_end, g_finish) 
    //         console.log('COLOR B', b_start, b_end, b_finish)
    //         console.log('COLOR %', percentage)

    //         return `rgb(${r_finish},${g_finish},${b_finish})`;
    //     }

    //     const calculateCssColor = (y:number) => {
    //         let containerHeight:number = this.parentHeight
    //         let colorHeight:number = containerHeight / (this.gradient.colors.length - 1);

    //         let gradientColorIndexStart:number = Math.floor(y / colorHeight); 
    //         let gradientColorIndexEnd:number = gradientColorIndexStart + 1;
           
    //         if(gradientColorIndexEnd >= this.gradient.colors.length){
    //             gradientColorIndexEnd = gradientColorIndexStart; 
    //             gradientColorIndexStart = gradientColorIndexStart - 1; 
    //         }

    //         let gradientColorStart = this.gradient.colors[gradientColorIndexStart];
    //         let gradientColorEnd = this.gradient.colors[gradientColorIndexEnd];

    //         let colorStartHeight = gradientColorIndexStart * colorHeight;
    //         let percentageColorStart = (y - colorStartHeight) / colorHeight;
    //         let diffHeightInPx =  colorHeight - (y - colorStartHeight);  


    //         console.log('KOLORY', hexToRgb(gradientColorStart), hexToRgb(gradientColorEnd))
    //         console.log("%%", percentageColorStart, y, colorStartHeight, colorHeight, gradientColorIndexStart);
            
    //         let cssColorFinish = calculateRgbByPercentage(gradientColorStart, gradientColorEnd, percentageColorStart);
            
    //         return {
    //             css: cssColorFinish,
    //             gradientColorIndexStart: gradientColorIndexStart,
    //             gradientColorIndexEnd: gradientColorIndexEnd,
    //             diffHeightInPx: diffHeightInPx,
    //         }
    //     }

    //     if(this.gradient.type == GradientType.LINEAR){
    //         let cssGradientType = "linear-gradient";
    //         let cssAngleDeg = `${this.gradient.angleDeg}deg`;
           
    //         for(let i:number = 0, child; child = this.childrens[i]; i++){
    //             let { top, left, width, height } = child.style;
    //             let x1:number = parseInt(left, 10);
    //             let y1:number = parseInt(top, 10);
    //             let x2:number = parseInt(left, 10) + parseInt(width, 10);
    //             let y2:number = parseInt(top, 10) + parseInt(height, 10);

    //             console.log('---WIERSZ', i)
                
    //             let colStart = calculateCssColor(y1);
    //             let colEnd = calculateCssColor(y2);

    //             console.log('-- ',i,  colStart, colEnd);

    //             // let indexAmount = colEnd.gradientColorIndexEnd - colStart.gradientColorIndexStart;
    //             // let containerHeight:number = this.parentHeight
    //             // let colorHeight:number = containerHeight / (this.gradient.colors.length - 1);
    //             // let aa = colorHeight / containerHeight;

                
    //             let percentageStart = 0;
    //             if(i == 0){
    //                 // percentageStart = colStart.diffHeightInPx / parseInt(height, 10) - 100;  
                    
    //             }else{
    //                 // percentageStart = colStart.diffHeightInPx / parseInt(height, 10) - 100;  
    //             }
    //             percentageStart = colStart.diffHeightInPx / parseInt(height, 10);  

    //             let percentageCss = (percentageStart) ? percentageStart + "%": ""
    //             let cssColors = `${colStart.css} ${percentageCss}, `;
    //             for(let j = colStart.gradientColorIndexEnd; j < colEnd.gradientColorIndexEnd; j++){
    //                 // let percentageCurrent:number = colStart.diffHeightInPx / parseInt(height, 10) - 100;  
    //                 // console.log('------------- co mamy w przesunieciu?', percentageCurrent, colStart.diffHeightInPx, parseInt(height, 10));
    //                 // Wys = wysokosc przesuniecia wzgledem poczatku kolor w px
    //                 // ProcentPrzesuniecia = cala wysokosc bloku pojedycznego / Wys
    //                 let currentColor = this.gradient.colors[j];
    //                 cssColors += `rgb(${hexToRgb(currentColor)}), `
    //             }
    //             cssColors += `${colEnd.css}`;
    //             console.log(' ?? ', i, cssColors);
    //             let cssBackground = `${cssGradientType}(${cssAngleDeg}, ${cssColors})`
    //             console.log('co wyszlo?', cssBackground, cssAngleDeg)                
                
    //             child.style.background = cssBackground;   
    //             child.style.border = "1px solid #0FF"; 
    //             child.style.boxSizing = "border-box";
    //         }
    //     }
    // }

    // createChildrens(){
    //     let iterateCount = this.rows * this.cols;
    //     let childHeight = this.parentHeight / this.rows;
    //     let childWidth = this.parentWidth / this.cols;

    //     for(let i:number = 0; i < iterateCount; i++){
    //         let child = document.createElement('div');

    //         child.style.background = "#0ff";
    //         child.style.width = `${childWidth}px`;
    //         child.style.height = `${childHeight}px`;
    //         child.style.position = "absolute";
            
    //         let currentRow = Math.floor(i / this.cols);
    //         let top = childHeight * currentRow;
    //         child.style.top = `${top}px`;

    //         let curretCol = Math.floor(i % this.cols);
    //         let left = childWidth * curretCol;
    //         child.style.left = `${left}px`;
            
    //         this.parentElement.appendChild(child);
    //         this.childrens.push(child);
    //     }
    // }

    readContainerSize(){
        this.parentHeight = this.parentElement.clientHeight;
        this.parentWidth = this.parentElement.clientWidth;
    }

    clearParentElement(){
        this.parentElement.innerHTML = "";
    }

}

class LevelManager {
    // dostep do aktualnego levelu
    // tworzenie levele i wyswietlanie levela
    // przejscia pomiedzy poziomami
    // przekazanie callbacka do zakonczenia levelu
}

class App {
    // tworzy level managera
    // tworzy gracza
    // logika przegrana / wygrana  
    //  plus zarzadzanie level managerem
}


