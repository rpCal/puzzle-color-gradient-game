
// document.addEventListener("DOMContentLoaded", () => { });
window.addEventListener("load", function(event) { 
    
    const calc = (width:number, height:number, rows: number, cols: number) => {
        return {
            
        }
    }

    const width = 500;
    const height = 500;
    
    const childHeight = 100;
    const childWidth = 100;
   
    const body:HTMLElement = document.querySelector('body');
    
    let mainDiv:HTMLElement = document.createElement('div');
    mainDiv.style.width = `${width}px`;
    mainDiv.style.height = `${height}px`; 
    mainDiv.style.background = "#0ff";
    body.appendChild(mainDiv);

    let wrapper:HTMLElement = document.createElement('div');
    wrapper.classList.add('game-wrapper');

    for(let i:number = 0; i <= 9; i++){
        
        
        let elem:HTMLElement = document.createElement('div');
        elem.classList.add('child');
        // elem.style.height = 
        wrapper.appendChild(elem);
    }
    body.appendChild(wrapper);



    
});




enum GradientType {
    LINEAR = 1,
    QUAD = 2,
}

interface IGradient {
    type: GradientType,
    colors: Array<number>
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
    constructor(initOptions: ILevelInput){
        // wyzerowac kontener z poprzednich danych
        // odczytac w & h kontenera .elem
        // stworzyc dzieci 
        // nalozyc gradient na dzieci
        // zablokowac dzieci ktore sa w .blocked
        // podpiac eventy do dziecki 
        // nasluchiwac na event zakoczenia levela
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


let levelContainer:HTMLElement = document.createElement('div');

const level_1 = new Level({
    elem: levelContainer,
    rows: 5,
    cols: 3,
    gradient: { 
        type: GradientType.LINEAR, 
        colors: [0xFFFFFFFF, 0xFF000000] 
    } as IGradient,
    blocked: [0, 2, 3, 5, 6, 8],
    onFinishedLevel: () => {}
} as ILevelInput); 

