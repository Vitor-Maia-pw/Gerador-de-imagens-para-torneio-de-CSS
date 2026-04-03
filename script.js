const canvas = document.getElementById("canva");
const ctx = canvas.getContext("2d");
const scale = window.devicePixelRatio;

canvas.width = 1920 * scale;
canvas.height = 1080 * scale;

canvas.style.width = "1920px";
canvas.style.height = "1080px";

ctx.scale(scale, scale);

//tamanho minimo que um objeto pode ter de W ou H
let tipoHeader = 0
let larguraMax = 1920
let value = 0
let aleatorio = 0
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
    ctx.fillRect(0, 0, larguraMax, 270)
    ctx.fillStyle = "red"
    ctx.fillRect(0, 270, larguraMax, 540)
    ctx.fillStyle = "green"
    ctx.fillRect(0, 810, larguraMax, 270)

    tipoHeader = Math.random() * 2
    // chama a função, e envia o tipo de layout do header
    escolheHeader(1, larguraMax, 270)

}

function escolheHeader(tipo, w, h) {
    //verifica qual o tipo do header e chama a função
    switch (tipo) {
        case 1:
            // envia o tamanho do objeto
            criarHeader1(w, h)
            break;

        default:
            break;
    }
}

function criarHeader1(wHe, hHe, x, y, xf, yf, tamMinX, tamMinY, w, h, cx, cy, ch, cw) {

    //gera um valor aleatorio para x que vai de 0 a 60
    // esse é a distancia do objeto até a borda esquerda
    x = Math.random() * 6 * 10
    y = parseInt(Math.random() * 10) * 10

    // valor limite usado para limitar o tamanho do objeto, ele não pode ser maior que isso
    xf = wHe / 4
    yf = hHe - y

    // tamanho minimo do objeto, as vezes pode ser menor
    tamMinX = hHe - y * 2
    tamMinY = hHe - y * 2

    // gera o tamanho de forma aleatoria
    w = Math.random() * (xf - tamMinX - x) + tamMinX
    h = Math.random() * (yf - tamMinY - y) + tamMinY

    // salva os tamanhos para usalos posteriormente
    cx = x
    cy = y
    cw = w
    ch = h

    //envia as características para serem desenhadas
    criarElem(x, y, w, h, "black")
    escolheRet(x, y, w + x, h + y)

    //chama o segundo quadrado do centro
    x = x + w + parseInt(Math.random() * 20) * 10
    y = parseInt(Math.random() * 9) * 10;
    xf = wHe - x * 2
    tamMinX = wHe - x * 2
    tamMinY = hHe - y * 2

    w = tamMinX
    h = Math.random() * (yf - tamMinY - y) + tamMinY

    //desenha o segundo quadrado
    criarElem(x, y, w, h, "purple")
    escolheRet(x, y, w + x, h + y)
    
    // espelha o primeiro quadrado do outro lado
    x = wHe - cx - cw
    y = cy
    
    criarElem(x, y, cw, ch, "black")
    escolheRet(x, y, cw + x, ch + y)
}

function escolheRet(xi, yi, xf, yf, x, y, w, h, tamMin) {
    aleatorio = Math.floor(Math.random() * 5)
    switch (aleatorio) {
        case 0:

            break;
        case 1:
            tamMinX = Math.floor((xf - xi) / 5)
            tamMinY = Math.floor((yf - yi) / 5)
            x = xi + Math.floor(Math.random() * (20 - 10) + 5)
            y = yi + x - xi
            w = Math.random() * ((xf - x) - tamMinX) + tamMinX
            h = Math.random() * ((yf - y) - tamMinY) + tamMinY
            criarElem(x, y, w, h, "green")
            break;
        case 2:
            tamMinX = Math.floor((xf - xi) / 5)
            tamMinY = Math.floor((yf - yi) / 5)
            x = xi
            y = yi
            w = Math.random() * ((xf - x)/2 - tamMinX) + tamMinX
            h = Math.random() * ((yf - y)/2 - tamMinY) + tamMinY
            criarElem(x, y, w, h, "green")
            
            x = xf - w
            y = yf - h
            criarElem(x, y, w, h, "white")
        break;
        case 3:
            tamMinX = Math.floor((xf - xi) / 5)
            tamMinY = Math.floor((yf - yi) / 5)
            x = xi
            y = yi
            w = Math.random() * ((xf - x)/2 - tamMinX) + tamMinX
            h = Math.random() * ((yf - y)/2 - tamMinY) + tamMinY
            criarElem(x, y, w, h, "green")
            
            x = xf - w
            criarElem(x, y, w, h, "white")
        break;
        case 4:
            tamMinX = Math.floor((xf - xi) / 5)
            tamMinY = Math.floor((yf - yi) / 5)
            w = Math.random() * ((xf - xi)/2 - tamMinX) + tamMinX
            h = Math.random() * ((yf - yi)/2 - tamMinY) + tamMinY
// x deve ser um valor de xi + metade do w do retangulo, menos metade do w do retangulo menor
            x = xi + (xf - xi)/2 - w/2
            y = yi + (yf - yi)/2 - h/2
            criarElem(x, y, w, h, "white")

        break;
        case 5:

        break;
    }
}

function criarElem(x, y, w, h, color) {

    ctx.beginPath()
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)

}
// x = Math.random() * (xf - xi - tamMinX) + xi;
// y = Math.random() * (yf - yi - tamMinY) + yi;