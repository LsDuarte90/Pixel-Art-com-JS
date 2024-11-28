const canvas = document.querySelector(".canvas");
const inputSize = document.querySelector(".input-size");
const inputColor = document.querySelector(".input-color");
const usedColors = document.querySelector(".used-colors");
const buttonSave = document.querySelector(".button-save");
const colResize = document.querySelector(".resize");
const main = document.querySelector("main");

let isPainting = false;

const MIN_CANVAS_SIZE = 4;

let isResizing = false;

const createElement = (tag, className = "") => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

const setPixelColor = (pixel) => {
    pixel.style.backgroundColor = inputColor.value;
    //essa função pega a cor selecionada no input de cor
};

const createPixel = () => {
    const pixel = createElement("dev", "pixel");
    pixel.addEventListener("mousedown",() => setPixelColor(pixel));
    pixel.addEventListener("mouseover", () => {
        if(isPainting) setPixelColor(pixel);
    });
    return pixel;
    //função que ira gerar os pixels
    //essa função ira criar um elemento div com a class pixel
};

const loadCanvas = () => {
    //essa função ira criar as linhas e preencher com os pixels de acordo com a quantidade inserida no input "Tamanho"
    const length = inputSize.value;
    canvas.innerHTML = "";

    for (let i = 0; i < length; i += 1){
        const row = createElement("div", "row");
        for(let j = 0; j < length; j += 1){
            row.append(createPixel());
        }
        canvas.append(row);
    }
};

const updateCanvasSize = () =>{
    if(inputSize.value >= MIN_CANVAS_SIZE){
        loadCanvas();
    };
    
};

const changeColor = () =>{
    const button = createElement("button", "button-color");
    const currentColor = inputColor.value;

    button.style.backgroundColor = currentColor;    
    button.setAttribute("data-color", currentColor);
    button.addEventListener("click", () => (inputColor.value = currentColor));

    const savedColors = Array.from(usedColors.children);

    const check = (btn) => btn.getAttribute("data-color") != currentColor;

    if(savedColors.every(check)){
        usedColors.append(button);
    }


    
};

const resizeCanvas = (cursorPositionX) =>{
    if(!isResizing) return;

    const canvaOffSet = canvas.getBoundingClientRect().left;
    const width = `${cursorPositionX - canvaOffSet - 20}px`;

    canvas.style.maxWidth = width;
    colResize.style.height = width;
};


canvas.addEventListener("mousedown", () => (isPainting = true));
canvas.addEventListener("mouseup", () => (isPainting = false));
//esses comandos permitem que enquanto o usuario estiver segurando o botão do mouse o pixel vai ser pintado

inputSize.addEventListener("change", updateCanvasSize);
inputColor.addEventListener("change", changeColor);

colResize.addEventListener("mousedown", () => (isResizing = true));

main.addEventListener("mouseup", () => (isResizing = false));
main.addEventListener("mousemove", ({ clientX }) => resizeCanvas(clientX));


loadCanvas();