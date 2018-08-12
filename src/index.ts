
// document.addEventListener("DOMContentLoaded", () => { });
window.addEventListener("load", function(event) { 
    
    const width = 500;
    const height = 450;
   
    const body:HTMLElement = document.querySelector('body');
    
    // sample gradient - DEBUG ONLY
    // let mainDiv:HTMLElement = document.createElement('div');
    // mainDiv.style.width = `${width}px`;
    // mainDiv.style.height = `${height}px`; 
    // mainDiv.style.background = "#0ff";
    // mainDiv.style.marginBottom = "20px"; 
    // mainDiv.style.cssFloat = "left"
    // mainDiv.style.background = "transparent"
    // mainDiv.style.background = `linear-gradient(180deg, #fff, #FF1122, #000, #FF9955, #fff)`
    // body.appendChild(mainDiv);

    let wrapper:HTMLElement = document.createElement('div');
    wrapper.style.width = `${width}px`;
    wrapper.style.height = `${height}px`;
    wrapper.style.position = "relative";
    wrapper.style.cssFloat = "left"
    wrapper.classList.add('game-wrapper');
    body.appendChild(wrapper);
    const _colors = [
            {color: 0xF38630, percentage: 0}, 
            {color: 0xFA6900, percentage: 0.3}, 
            {color: 0xE0E4CC, percentage: 0.5}, 
            {color: 0xA7DBD8, percentage: 0.7}, 
            {color: 0x69D2E7, percentage: 1}, 
    ];

    const level_1 = new Level({
        elem: wrapper,
        rows: 5,
        cols: 5,
        gradient: { 
            type: GradientType.LINEAR, 
            colors: _colors,
            angleDeg: 180
        } as IGradient,
        blocked: [0, 2, 3, 5, 6, 8, 22, 24],
        onFinishedLevel: () => {}
    } as ILevelInput); 

    // GRID on canvas - DEBUG ONLY 
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
    id: string,
    elem: HTMLElement,
    isBlocked: boolean,
    startTop: number,
    startLeft: number,
    isMouseDownPressed?: boolean,
    isClicked?: boolean,
    startIndex: number,
    currentIndex: number
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
    secoundBeforeStart: number = 6

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

        // show loading wrapper
        this.showStartCounter();

        // when loading time finished - shuffle and add events
        setTimeout(() => {

            // zablokowac dzieci ktore sa w .blocked
            this.blockedChildrensIndexes = initOptions.blocked;
            this.blockChildrens();

            this.shuffleChildrens();
            
            // podpiac eventy do dziecki 
            // plus nasluchiwac na event zakoczenia levela
            this.attachEvents();
        }, (this.secoundBeforeStart * 1000));
    }
    showStartCounter(){
        let timeFinish = new Date(new Date().getTime() + this.secoundBeforeStart * 1000);
        let counter = document.createElement('div');
        counter.style.position = "absolute";
        counter.style.width = "250px"
        counter.style.height = "250px"
        counter.style.top = "50%";
        counter.style.left = "50%";
        counter.style.transform = "translate(-50%, -50%)"
        counter.style.display = "block";
        counter.style.zIndex = "10";
        counter.style.fontSize = "80px";
        counter.style.color = "#fff";
        counter.style.background = "rgba(105,210,231,1)"
        counter.style.borderRadius = "50%";
        counter.style.textAlign = "center";
        counter.style.lineHeight = `250px`;
        
        let interval = setInterval(() => {
            var now = new Date();
            var diff = timeFinish.getTime() - now.getTime();
            var sec = Math.floor(diff / 1000);
            if(sec <= 0){
                counter.innerHTML = "";
                counter.remove();
                clearInterval(interval);
            }else{
                counter.innerHTML = `${sec}s`
            }
        }, 100);
        this.parentElement.appendChild(counter);
    }

    shuffleChildrens(){
        let blockedCount = this.blockedChildrensIndexes.length;
        for(let i = 0, from:LevelChildren; from = this.childrens[i]; i++){
            if(!from.isBlocked){
                let toIndex = null;
                let to = null;
                
                while(true){
                    toIndex = Math.floor(Math.random() * (this.childrens.length - blockedCount));
                    to = this.childrens[toIndex]; 
                    if(to.isBlocked === false){ break; }
                }

                if(toIndex != null && to != null){
                    this.replaceChildrenPosition(from, to);
                }
            }
        }
    }

    levelFinished(){
        console.log('koniec gry');
        this.detachEvents();
    }

    isLevelFinished(){
        return this.childrens.every((e) => e.startIndex === e.currentIndex);
    }

    detachEvents(){
        for(let i:number = 0, child; child = this.childrens[i]; i++){
            let childClone = child.elem.cloneNode(true);
            child.elem.parentNode.replaceChild(childClone, child.elem);
            child.elem = childClone as HTMLElement;
        }
    }

    replaceChildrenPosition(from: LevelChildren, to: LevelChildren){
        let top = to.elem.style.top;
        let left = to.elem.style.left; 

        to.elem.style.top = from.elem.style.top;
        to.elem.style.left = from.elem.style.left;
        
        from.elem.style.top = top;
        from.elem.style.left = left;

        let index = from.currentIndex;
        from.currentIndex = to.currentIndex;
        to.currentIndex = index;
    }

    attachEvents(){
        let isItemClicked:boolean = false;
        let itemClicked:LevelChildren = null;
        for(let i:number = 0, child:LevelChildren; child = this.childrens[i]; i++){
            
            let { elem, isBlocked } = child;

            if(isBlocked){ continue; }

            const onClick = (ev: MouseEvent) => {
                if(isItemClicked && itemClicked != null){
                    itemClicked.elem.style.transform = "scale(1.0)";
                    itemClicked.elem.style.zIndex = "1";

                    this.replaceChildrenPosition(itemClicked, child);
                    
                    itemClicked = null;
                    isItemClicked = false;   
                    
                    if(this.isLevelFinished()){
                        this.levelFinished()
                    }; 
                }else{
                    elem.style.transform = "scale(1.2)";
                    elem.style.zIndex = "2";
                    child.isClicked = true;

                    isItemClicked = true;
                    itemClicked = child;
                }

            }

            elem.addEventListener('click', onClick);
        }
    }

    blockChildrens(){
        for(let i:number = 0; i < this.blockedChildrensIndexes.length; i++){
            let index = this.blockedChildrensIndexes[i];
            this.childrens[index].isBlocked = true;
            this.childrens[index].elem.style.opacity = "1";
            this.childrens[index].elem.style.cursor = "not-allowed";
            let dot = document.createElement('div');
            dot.innerHTML = "&bull;"
            dot.style.position = "absolute";
            dot.style.top = "50%";
            dot.style.left = "50%";
            dot.style.width = "auto";
            dot.style.height = "auto";
            dot.style.color = "#000";
            dot.style.transform = "translate(-50%, -50%)";
            dot.style.fontSize = "30px";
            dot.style.textAlign = "center";
            dot.style.lineHeight = `${this.childrens[index].elem.style.height}px`;
            this.childrens[index].elem.appendChild(dot);
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
        
        let pheta = Math.atan2(- mainChildCanvas.height, mainChildCanvas.width);
        let AB = Math.abs(mainChildCanvas.height * Math.cos(pheta)); 

        let xdx = Math.cos(pheta + Math.PI/2);
        let xdy = Math.sin(pheta + Math.PI/2);

        let x1 = mainChildCanvas.width / 2 - xdx * AB;
        let y1 = mainChildCanvas.height / 2 - xdy * AB;
        let x2 = mainChildCanvas.width / 2 + xdx * AB;
        let y2 = mainChildCanvas.height / 2 + xdy * AB;

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
        let childHeight = Math.floor(this.parentHeight / this.rows);
        let childWidth = Math.floor(this.parentWidth / this.cols);
        let id = 0;
        
        for(let i:number = 0; i < iterateCount; i++){
            let child = document.createElement('div');

            child.style.background = "transparent";
            child.style.width = `${childWidth}px`;
            child.style.height = `${childHeight}px`;
            child.style.position = "absolute";
            child.style.padding = "0px";
            child.style.zIndex = "1";
            child.style.opacity = "1";
            child.style.cursor = "move";
            child.style.border = "0px solid #eee";
            child.style.transform = "scale(1)"; 
            child.style.animationDuration = "1s";
            child.style.animationTimingFunction = "ease-in-out"

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
            id++;
            this.childrens.push({
                elem: child,
                isBlocked: false,
                startLeft: left,
                startTop: top,
                id: id.toString(),
                startIndex: i,
                currentIndex: i
            } as LevelChildren);
        }
    }

    // attachMoveEvents(){

        // let shiftTop = 0;
        // let shiftLeft = 0;

        // const onMouseMove = (ev: MouseEvent) => {
        //     if(child.isMouseDownPressed){        
        //         let newLeft = ev.clientX - this.parentElement.offsetLeft + shiftLeft;
        //         let newTop = ev.clientY - this.parentElement.offsetTop + shiftTop;
        //         console.log('?', 
        //             this.parentElement.offsetLeft, this.parentElement.offsetTop,
        //             ev.clientX, ev.clientY, 
        //             ev.clientX - this.parentElement.offsetLeft, ev.clientY - this.parentElement.offsetTop,
        //             elem.style.top, elem.style.left)
        //         elem.style.top = `${newTop}px`;
        //         elem.style.left = `${newLeft}px`;
        //     }
        // }
        
        // const onMouseUp = (ev: MouseEvent) => {
        //     elem.style.transform = "scale(1)";
        //     elem.style.zIndex = "1";
        //     elem.style.top = `${startTop}px`;
        //     elem.style.left = `${startLeft}px`;
        //     child.isMouseDownPressed = false;
        //     elem.removeEventListener('mouseup', onMouseUp);
        //     // elem.removeEventListener('mousemove', onMouseMove);
        // }

        // const onMouseDown = (ev: MouseEvent) => {
        //     elem.style.transform = "scale(1.2)";
        //     elem.style.zIndex = "2";
        //     child.isMouseDownPressed = true;

        //     shiftTop    = (ev.clientY - this.parentElement.offsetTop - elem.offsetTop)  * 1.2;
        //     shiftLeft   = (ev.clientX - this.parentElement.offsetLeft - elem.offsetLeft) * 1.2;

        //     window.addEventListener('mouseup', onMouseUp);
        //     window.addEventListener('mousemove', onMouseMove);
        // }
        
        // elem.addEventListener('mousedown', onMouseDown);
    // }


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


