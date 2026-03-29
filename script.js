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
    let part1 = {
        xi: 0,
        yi: 0,
        xf: 1920,
        yf: 270,
        w: 1920,
        h: 270
    }
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
    criarElem(part1)

}
function criarElem(part) {
    // limita e gera um valor aleatorio conforme as informações enviadas pela part enviada
    this.x = Math.random() * (part.xf - part.xi - tamMin) + part.xi
    this.y = Math.random() * (part.yf -part.yi - tamMin) + part.yi
    this.w = Math.random() * (part.w - tamMin - this.x) + tamMin
    this.h = Math.random() * (part.h - tamMin - this.y) + tamMin
    if (this.h + this.y > part.h ) {
        this.h -= tamMin
    }
    if (this.w + this.x > part.w) {
        this.w -= tamMin
    }
    ctx.beginPath()
    ctx.fillStyle = "black"
    ctx.fillRect(this.x, this.y, this.w, this.h)
}