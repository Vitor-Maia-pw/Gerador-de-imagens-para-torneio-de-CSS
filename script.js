const canvas = document.getElementById("canva");
const ctx = canvas.getContext("2d");
const scale = window.devicePixelRatio;

canvas.width = 1920 * scale;
canvas.height = 1080 * scale;

canvas.style.width = "1920px";
canvas.style.height = "1080px";

ctx.scale(scale, scale);

//tamanho minimo que um objeto pode ter de W ou H
let tamMin = 100
let value = 0

// função que seleciona um dos layouts que serviram para limitar os objetos
function escolheLayout(l) {
    switch (l) {
        case 1:
            layout1()
            break;

        default:
            break;
    }
}
escolheLayout(1)

// a função do layout numero 1, tem as demarcações dele
function layout1() {
    // a parte superior do layout um, sua primeira parte
    // ele que contem o mapa para criar os objetos dentro da parte 1
    
    let arrayElem1 = [] 
    // cria de forma visivel as demarcações do layout, os lugares que devem ter quadrados sem vazar
    ctx.beginPath()
    ctx.fillStyle = "blue"
    ctx.fillRect(0, 0, 1920, 270)
    ctx.fillStyle = "red"
    ctx.fillRect(0, 270, 1920, 540)
    ctx.fillStyle = "green"
    ctx.fillRect(0, 810, 1920, 270)
    // chama a função, e envia o "mapa" das partes necessarias
    criarElem(0, 0, 1920, 270, "black")

}
// xi, yi = coordenadas iniciais(minimas) xf, yf = coordenadas finais(maximas) 
// w, h = tamanho maximo width e height que pode chegar o objeto
function criarElem(xi, yi, xf, yf, color) {
    // limita e gera um valor aleatorio conforme as informações enviadas pela part enviada
    let x = Math.random() * (xf - xi - tamMin) + xi
    let y = Math.random() * (yf - yi - tamMin) + yi
    let w = Math.random() * (xf - tamMin - x) + tamMin
    let h = Math.random() * (yf - tamMin - y) + tamMin
    
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)

    if(x + w < xf - tamMin ){
        criarElem((x + w), yi, xf, yf, "red")
        
    }
    
    // verifica se irá gerar um elemnto dentro do elemento anterior
    if (value === 0) {
        addElem = Math.random() * 2
        value++
        if (addElem < 1) {
            criarElem(x, y, (x + w), (y + h), "green")
        }
    }
}