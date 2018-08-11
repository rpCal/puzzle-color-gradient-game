
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
    mainDiv.style.background = `linear-gradient(180deg, #fff, #FF1122, #000, #FF9955, #fff)`
    body.appendChild(mainDiv);

    let wrapper:HTMLElement = document.createElement('div');
    wrapper.style.width = `${width}px`;
    wrapper.style.height = `${height}px`;
    wrapper.style.position = "relative";
    wrapper.style.cssFloat = "left"
    wrapper.classList.add('game-wrapper');
    body.appendChild(wrapper);
    const _colors = [0xFFFFFF, 0xFF1122, 0x000000, 0xFF9955, 0xFFFFFF]
    const level_1 = new Level({
        elem: wrapper,
        rows: 4,
        cols: 2,
        gradient: { 
            type: GradientType.LINEAR, 
            
            colors: _colors,
            // colors: [0xFFFFFF, 0xFF1122],
            angleDeg: 180
        } as IGradient,
        blocked: [0, 2, 3, 5, 6, 8],
        onFinishedLevel: () => {}
    } as ILevelInput); 

    let canvas = document.createElement('canvas');
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.style.position = "absolute";
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    canvas.style.zIndex = "100";
    canvas.width = width;
    canvas.height = height;
    wrapper.appendChild(canvas);
    let context = canvas.getContext('2d');
    let childHeight = height / (_colors.length - 1);
    context.fillStyle = "rgba(100, 100, 255, 1)";
    for(let i = 0; i < _colors.length; i++){
        context.fillRect(0, (childHeight * i) - 1, width, 2);
    }
   
    
});




enum GradientType {
    LINEAR = 1,
    QUAD = 2,
}

interface IGradient {
    type: GradientType,
    colors: Array<number>,
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

class Level {
    parentElement: HTMLElement = null;
    parentWidth: number;
    parentHeight: number;
    rows:number;
    cols:number;
    childrens: Array<HTMLElement> = [];
    gradient: IGradient

    constructor(initOptions: ILevelInput){
        // wyzerowac kontener z poprzednich danych
        this.parentElement = initOptions.elem;
        this.clearParentElement();
        // odczytac w & h kontenera .elem
        this.readContainerSize();

        // stworzyc dzieci 
        this.rows = initOptions.rows;
        this.cols = initOptions.cols;
        this.createChildrens();

        // nalozyc gradient na dzieci
        this.gradient = initOptions.gradient;
        this.fillChildrendWithGradient();
        // zablokowac dzieci ktore sa w .blocked
        // podpiac eventy do dziecki 
        // nasluchiwac na event zakoczenia levela
    }

    fillChildrendWithGradient(){
        // interface IGradient {
        //     type: GradientType,
        //     colors: Array<number>,
        //     angleDeg: number 
        // }
        
        const hexToRgb = (hex:number) => {
            var r = (hex >> 16) & 255;
            var g = (hex >> 8) & 255;
            var b = hex & 255;
            return r + "," + g + "," + b;
        }

        const calculateRgbByPercentage = (colorStart:number, colorEnd:number, percentage:number) =>{
            let r_start = (colorStart >> 16) & 255;
            let g_start = (colorStart >> 8) & 255;
            let b_start = colorStart & 255;

            let r_end = (colorEnd >> 16) & 255;
            let g_end = (colorEnd >> 8) & 255;
            let b_end = colorEnd & 255;

            
            let r_finish = r_start + ((r_end - r_start) * percentage);
            let g_finish = g_start + ((g_end - g_start) * percentage);
            let b_finish = b_start + ((b_end - b_start) * percentage);
            console.log('COLOR R', r_start, r_end, r_finish) 
            console.log('COLOR G', g_start, g_end, g_finish) 
            console.log('COLOR B', b_start, b_end, b_finish)
            console.log('COLOR %', percentage)

            return `rgb(${r_finish},${g_finish},${b_finish})`;
        }

        const calculateCssColor = (y:number) => {
            let containerHeight:number = this.parentHeight
            let colorHeight:number = containerHeight / (this.gradient.colors.length - 1);

            let gradientColorIndexStart:number = Math.floor(y / colorHeight); 
            let gradientColorIndexEnd:number = gradientColorIndexStart + 1;
           
            if(gradientColorIndexEnd >= this.gradient.colors.length){
                gradientColorIndexEnd = gradientColorIndexStart; 
                gradientColorIndexStart = gradientColorIndexStart - 1; 
            }

            let gradientColorStart = this.gradient.colors[gradientColorIndexStart];
            let gradientColorEnd = this.gradient.colors[gradientColorIndexEnd];

            let colorStartHeight = gradientColorIndexStart * colorHeight;
            let percentageColorStart = (y - colorStartHeight) / colorHeight;

            console.log('KOLORY', hexToRgb(gradientColorStart), hexToRgb(gradientColorEnd))
            console.log("%%", percentageColorStart, y, colorStartHeight, colorHeight, gradientColorIndexStart);
            
            let cssColorFinish = calculateRgbByPercentage(gradientColorStart, gradientColorEnd, percentageColorStart);
            
            return {
                css: cssColorFinish,
                gradientColorIndexStart: gradientColorIndexStart,
                gradientColorIndexEnd: gradientColorIndexEnd
            }
        }

        if(this.gradient.type == GradientType.LINEAR){
            let cssGradientType = "linear-gradient";
            let cssAngleDeg = `${this.gradient.angleDeg}deg`;
           
            for(let i:number = 0, child; child = this.childrens[i]; i++){
                let { top, left, width, height } = child.style;
                let x1:number = parseInt(left, 10);
                let y1:number = parseInt(top, 10);
                let x2:number = parseInt(left, 10) + parseInt(width, 10);
                let y2:number = parseInt(top, 10) + parseInt(height, 10);

                console.log('---WIERSZ', i)
                
                let colStart = calculateCssColor(y1);
                let colEnd = calculateCssColor(y2);

                console.log('-- ',i,  colStart, colEnd);

                // let indexAmount = colEnd.gradientColorIndexEnd - colStart.gradientColorIndexStart;
                // let containerHeight:number = this.parentHeight
                // let colorHeight:number = containerHeight / (this.gradient.colors.length - 1);
                // let aa = colorHeight / containerHeight;
                

                let cssColors = `${colStart.css}, `;
                for(let j = colStart.gradientColorIndexEnd; j < colEnd.gradientColorIndexEnd; j++){
                    let currentColor = this.gradient.colors[j];
                    cssColors += `rgb(${hexToRgb(currentColor)}), `
                }
                cssColors += `${colEnd.css}`;
                console.log(' ?? ', i, cssColors);
                let cssBackground = `${cssGradientType}(${cssAngleDeg}, ${cssColors})`                
                
                child.style.background = cssBackground;   
                child.style.border = "1px solid #0FF"; 
                child.style.boxSizing = "border-box";
            }
        }
    }

    createChildrens(){
        let iterateCount = this.rows * this.cols;
        let childHeight = this.parentHeight / this.rows;
        let childWidth = this.parentWidth / this.cols;

        for(let i:number = 0; i < iterateCount; i++){
            let child = document.createElement('div');

            child.style.background = "#0ff";
            child.style.width = `${childWidth}px`;
            child.style.height = `${childHeight}px`;
            child.style.position = "absolute";
            
            let currentRow = Math.floor(i / this.cols);
            let top = childHeight * currentRow;
            child.style.top = `${top}px`;

            let curretCol = Math.floor(i % this.cols);
            let left = childWidth * curretCol;
            child.style.left = `${left}px`;
            
            this.parentElement.appendChild(child);
            this.childrens.push(child);
        }
    }

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


