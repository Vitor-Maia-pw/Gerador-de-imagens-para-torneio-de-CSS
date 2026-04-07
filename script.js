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

    tipoHeader = Math.floor(Math.random() * 5) + 1
    // chama a função, e envia o tipo de layout do header
    escolheHeader(tipoHeader, larguraMax, 270)

}

function escolheHeader(tipo, w, h) {
    //verifica qual o tipo do header e chama a função
    switch (tipo) {
        case 1:
            // quadrado + retangulo + quadrado
            criarHeader1(w, h)
            break;

        case 2:
            // retangulo + quadrado
            criarHeader2(w, h)

            break;
        case 3:
            // quadrado + retangulo
            criarHeader3(w, h)

            break;
        case 4:
            //retangulinhos/retangulos
            criarHeader4(w, h)

            break;
        case 5:
            //retangulinhos/retangulos
            criarHeader5(w, h)

            break;
    }
}

function criarHeader1(wHe, hHe, x, y, xf, yf, tamMinX, tamMinY, w, h, cx, cy, ch, cw, aleatorio) {

    //gera um valor aleatorio para x que vai de 0 a 60
    // esse é a distancia do objeto até a borda esquerda
    x = Math.floor(Math.random() * 6 * 10)
    y = Math.floor(Math.random() * 10) * 10

    // valor limite usado para limitar o tamanho do objeto, ele não pode ser maior que isso
    xf = wHe / 4
    yf = hHe - y

    // tamanho minimo do objeto, as vezes pode ser menor
    tamMinX = hHe - x * 2
    tamMinY = hHe - y * 2

    // gera o tamanho de forma aleatoria
    w = Math.floor(Math.random() * (xf - tamMinX - x) + tamMinX)
    h = Math.floor(Math.random() * (yf - tamMinY - y) + tamMinY)

    // salva os tamanhos para usalos posteriormente
    cx = x
    cy = y
    cw = w
    ch = h

    //envia as características para serem desenhadas
    criarElem(x, y, w, h, "black")
    aleatorio = Math.floor(Math.random() * 7)
    // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
    escolheRet(x, y, w + x, h + y, aleatorio)

    //chama o segundo quadrado do centro
    x = x + w + Math.floor(Math.random() * 20) * 10 + 20
    y = Math.floor(Math.random() * 9) * 10;
    xf = wHe - x * 2
    tamMinX = wHe - x * 2
    tamMinY = hHe - y * 2

    w = tamMinX
    h = Math.random() * (yf - tamMinY - y) + tamMinY

    //desenha o segundo quadrado
    criarElem(x, y, w, h, "black")
    aleatorio = Math.floor(Math.random() * 7)
    escolheRet(x, y, w + x, h + y, aleatorio)

    // espelha o primeiro quadrado do outro lado
    x = wHe - cx - cw
    y = cy

    criarElem(x, y, cw, ch, "black")
    escolheRet(x, y, cw + x, ch + y, aleatorio)
}
// criarHeader1()

function criarHeader2(wHe, hHe, x, y, xf, yf, tamMinX, tamMinY, w, h, aleatorio) {

    //gera um valor aleatorio para x que vai de 0 a 60
    // esse é a distancia do objeto até a borda esquerda
    x = Math.floor(Math.random() * 60)
    y = Math.floor(Math.random() * 10) * 10

    // valor limite usado para limitar o tamanho do objeto, ele não pode ser maior que isso
    xf = wHe / 3 * 2
    yf = hHe - y

    // tamanho minimo do objeto
    tamMinX = wHe / 4 * 2.5
    tamMinY = hHe - y * 2

    // gera o tamanho de forma aleatoria
    w = Math.floor(Math.random() * ((xf - x) - tamMinX)) + tamMinX
    h = Math.floor(Math.random() * ((yf - y) - tamMinY)) + tamMinY

    //envia as características para serem desenhadas
    criarElem(x, y, w, h, "black")
    aleatorio = Math.floor(Math.random() * 2) + 10
    // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
    escolheRet(x, y, w + x, h + y, aleatorio)

    //gera um valor aleatorio para x que vai de 0 a 60
    // esse é a distancia do objeto até a borda esquerda
    x = Math.floor(Math.random() * 60)
    y = Math.floor(Math.random() * 10) * 10

    // valor limite usado para limitar o tamanho do objeto, ele não pode ser maior que isso
    xf = wHe / 4
    yf = hHe - y

    // tamanho minimo do objeto, as vezes pode ser menor
    tamMinX = hHe - y * 2
    tamMinY = hHe - y * 2

    // gera o tamanho de forma aleatoria
    w = Math.floor(Math.random() * (xf - tamMinX - x)) + tamMinX
    h = Math.floor(Math.random() * (yf - tamMinY - y)) + tamMinY

    x = wHe - x - w
    criarElem(x, y, w, h, "black")
    aleatorio = Math.floor(Math.random() * 7)
    escolheRet(x, y, w + x, h + y, aleatorio)
}
// criarHeader2()
function criarHeader3(wHe, hHe, x, y, xf, yf, tamMinX, tamMinY, w, h, aleatorio) {

    //gera um valor aleatorio para x que vai de 0 a 60
    // esse é a distancia do objeto até a borda esquerda
    x = Math.floor(Math.random() * 6 * 10)
    y = Math.floor(Math.random() * 10) * 10

    // valor limite usado para limitar o tamanho do objeto, ele não pode ser maior que isso
    xf = wHe / 4
    yf = hHe - y

    // tamanho minimo do objeto, as vezes pode ser menor
    tamMinX = hHe - x * 2
    tamMinY = hHe - y * 2

    // gera o tamanho de forma aleatoria
    w = Math.floor(Math.random() * (xf - tamMinX - x) + tamMinX)
    h = Math.floor(Math.random() * (yf - tamMinY - y) + tamMinY)

    // salva os tamanhos para usalos posteriormente
    cx = x
    cy = y
    cw = w
    ch = h

    //envia as características para serem desenhadas
    criarElem(x, y, w, h, "black")
    aleatorio = Math.floor(Math.random() * 7)
    // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
    escolheRet(x, y, w + x, h + y, aleatorio)

    // valor limite usado para limitar o tamanho do objeto, ele não pode ser maior que isso
    xf = wHe / 4 * 2
    yf = hHe - y
    //gera um valor aleatorio para x que vai de 0 a 60
    // esse é a distancia do objeto até a borda esquerda
    x = Math.floor(Math.random() * 60)
    y = Math.floor(Math.random() * 10) * 10


    // tamanho minimo do objeto
    tamMinX = wHe / 4 * 3
    tamMinY = hHe - y * 2

    // gera o tamanho de forma aleatoria
    w = Math.floor(Math.random() * ((xf - x) - tamMinX)) + tamMinX
    h = Math.floor(Math.random() * ((yf - y) - tamMinY)) + tamMinY

    x = wHe - w - x

    //envia as características para serem desenhadas
    criarElem(x, y, w, h, "black")
    aleatorio = Math.floor(Math.random() * 2) + 10
    // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
    escolheRet(x, y, w + x, h + y, aleatorio)
}
// criarHeader3()
function criarHeader4(wHe, hHe, x, y, cx, w, h, aleatorio, quant) {

    quant = Math.floor(Math.random() * 3) + 4

    //fração da quantidade de quadrado pelo espaço
    quant / (1 + 2 * quant)

    w = wHe / (1 + 2 * quant) + Math.floor(Math.random() * 21) + wHe / (1 + 2 * quant * 5)
    h = hHe / 5
    x = (wHe / (1 + 2 * quant)) * 2 - w
    y = Math.floor(Math.random() * 41)
    //envia as características para serem desenhadas
    criarElem(x, y, w, h, "black")
    aleatorio = Math.floor(Math.random() * 2) + 10
    // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
    escolheRet(x, y, w + x, h + y, aleatorio)
    for (let i = 0; i < quant - 1; i++) {
        x += (wHe / (1 + 2 * quant)) * 2
        //envia as características para serem desenhadas
        criarElem(x, y, w, h, "black")
        aleatorio = Math.floor(Math.random() * 2) + 10
        // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
        escolheRet(x, y, w + x, h + y, aleatorio)

    }
    quant = Math.floor(Math.random() * 2) + 2
    x = (wHe / (1 + 2 * quant)) * 4 / 10
    cx = x
    y = y + h + Math.floor(Math.random() * 30) + 20
    w = (wHe - (quant + 1) * x) / quant
    h = hHe - y - Math.floor(Math.random() * 30)
    //envia as características para serem desenhadas
    criarElem(x, y, w, h, "black")
    aleatorio = Math.floor(Math.random() * 7)
    // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
    escolheRet(x, y, w + x, h + y, aleatorio)
    for (let i = 0; i < quant - 1; i++) {
        x += cx + w
        //envia as características para serem desenhadas
        criarElem(x, y, w, h, "black")
        aleatorio = Math.floor(Math.random() * 7)
        // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
        escolheRet(x, y, w + x, h + y, aleatorio)

    }


}
// criarHeader4()
function criarHeader5(wHe, hHe, x, y, cx, ch, w, h, aleatorio, quant) {

    //fração da quantidade de quadrado pelo espaço
    quant = Math.floor(Math.random() * 2) + 2
    x = (wHe / (1 + 2 * quant)) * 4 / 10
    cx = x
    ch = Math.floor(Math.random() * 30) + 40
    y = Math.floor(Math.random() * 20) + 10
    w = (wHe - (quant + 1) * x) / quant
    h = hHe - ch - y * 2
    //envia as características para serem desenhadas
    criarElem(x, y, w, h, "black")
    aleatorio = Math.floor(Math.random() * 7)
    // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
    escolheRet(x, y, w + x, h + y, aleatorio)
    for (let i = 0; i < quant - 1; i++) {
        x += cx + w
        //envia as características para serem desenhadas
        criarElem(x, y, w, h, "black")
        aleatorio = Math.floor(Math.random() * 7)
        // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
        escolheRet(x, y, w + x, h + y, aleatorio)

    }

    x = 0
    w = wHe
    h = hHe - y * 2 - h
    y = hHe - h
    criarElem(x, y, w, h, "black")

}
// criarHeader5()
function escolheRet(xi, yi, xf, yf, aleatorio, x, y, w, h, p, px, py, tamMinX, tamMinY, lado) {
    switch (aleatorio) {
        case 0:

            break;
        // um quadrado com margin lateral
        case 1:
            // tamanho minimo é 20% do quadrado pai
            tamMinX = Math.floor((xf - xi) / 5)
            tamMinY = Math.floor((yf - yi) / 5)
            x = xi + Math.floor(Math.random() * (20 - 10) + 5)
            y = yi + x - xi
            w = Math.floor(Math.random() * ((xf - x) - tamMinX) + tamMinX)
            h = Math.floor(Math.random() * ((yf - y) - tamMinY) + tamMinY)
            criarElem(x, y, w, h, "green")
            break;
        // dois quadrados, um no topo a esquerda, e outro na direita em baixo, no quadrado pai
        case 2:
            lado = Math.floor(Math.random() * 2)
            p = Math.floor(Math.random() * 2)
            tamMinX = Math.floor((xf - xi) / 5)
            tamMinY = Math.floor((yf - yi) / 5)
            if (lado === 0) {

                px = Math.floor(Math.random() * 10) + 10
                py = Math.floor(Math.random() * 10) + 10
                x = xi + px
                y = yi + py

                w = Math.floor(Math.random() * ((xf - x) / 2 - tamMinX) + tamMinX)
                h = Math.floor(Math.random() * ((yf - y) / 2 - tamMinY) + tamMinY)
                criarElem(x, y, w, h, "green")

                x = xf - w - px
                y = yf - h - py

                criarElem(x, y, w, h, "white")
            } else {
                
                    px = Math.floor(Math.random() * 10) + 10
                    py = Math.floor(Math.random() * 10) + 10
                    w = Math.floor(Math.random() * ((xf - xi - px) / 2 - tamMinX) + tamMinX)
                    h = Math.floor(Math.random() * ((yf - yi - py) / 2 - tamMinY) + tamMinY)
                    x = xf - px - w
                    y = yi + py

                

                criarElem(x, y, w, h, "green")
                
                    x = xi + px
                    y = yf - h - py
                

                criarElem(x, y, w, h, "white")
            }

            break;
        // gera dois quadrados no topo
        case 3:
            tamMinX = Math.floor((xf - xi) / 5)
            tamMinY = Math.floor((yf - yi) / 5)

            x = xi + Math.floor(Math.random() * 10) + 10
            y = yi + Math.floor(Math.random() * 10) + 10
            w = Math.floor(Math.random() * ((xf - x) / 2 - tamMinX - Math.floor(Math.random() * 10) + 10) + tamMinX)
            h = Math.floor(Math.random() * ((yf - y) / 2 - tamMinY - Math.floor(Math.random() * 10) + 10) + tamMinY)
            criarElem(x, y, w, h, "green")

            x = xf - w - x + xi
            criarElem(x, y, w, h, "white")
            break;
        // gera um quadrado no centro
        case 4:
            tamMinX = Math.floor((xf - xi) / 5)
            tamMinY = Math.floor((yf - yi) / 5)
            w = Math.floor(Math.random() * ((xf - xi) / 2 - tamMinX) + tamMinX)
            h = Math.floor(Math.random() * ((yf - yi) / 2 - tamMinY) + tamMinY)
            x = xi + (xf - xi) / 2 - w / 2
            y = yi + (yf - yi) / 2 - h / 2
            criarElem(x, y, w, h, "white")

            break;
        // gera 3 retangulos centralizados
        case 5:
            w = Math.floor((xf - xi) / 2)
            h = Math.floor((yf - yi) / 8)

            x = xi + (xf - xi) / 2 - w / 2
            y = yi + (yf - yi) / 32 * 5
            criarElem(x, y, w, h, "pink")
            y = y + (yf - yi) / 32 * 5 + h
            criarElem(x, y, w, h, "pink")
            y = y + (yf - yi) / 32 * 5 + h
            criarElem(x, y, w, h, "pink")
            break;
        // gera 3 retangulos sequenciais
        case 6:

            tamMinY = Math.floor((yf - yi) / 5)
            w = xf - xi
            h = Math.floor(Math.random() * ((yf - yi) / 4 - tamMinY) + tamMinY)
            x = xi
            y = yi + (yf - yi) / 2 - h / 2
            criarElem(x, y, w, h, "white")
            break;

        // casos acima de 9 são para retangulos do header
        // gera ou 3 retangulos sequenciais ou 1 retangulo central
        case 10:
            if ((yf - yi) / 5 > 30) {
                w = Math.floor((xf - xi) / 2)
                h = Math.floor((yf - yi) / 8)

                x = xi + Math.floor(Math.random() * 90)
                y = yi + (yf - yi) / 32 * 5
                criarElem(x, y, w, h, "pink")
                y = y + (yf - yi) / 32 * 5 + h
                criarElem(x, y, w, h, "pink")
                y = y + (yf - yi) / 32 * 5 + h
                criarElem(x, y, w, h, "pink")
            } else {
                w = Math.floor((xf - xi) / 2)
                h = Math.floor((yf - yi) / 5)

                x = xi + Math.floor(Math.random() * (xf - xi) / 4)
                y = yi + (yf - yi) / 2 - h / 2
                criarElem(x, y, w, h, "pink")
            }
            break;
        case 11:
            if ((yf - yi) / 5 > 30) {
                w = Math.floor((xf - xi) / 2)
                h = Math.floor((yf - yi) / 8)

                x = xf - w - Math.floor(Math.random() * 90)
                y = yi + (yf - yi) / 32 * 5
                criarElem(x, y, w, h, "pink")
                y = y + (yf - yi) / 32 * 5 + h
                criarElem(x, y, w, h, "pink")
                y = y + (yf - yi) / 32 * 5 + h
                criarElem(x, y, w, h, "pink")
            } else {
                w = Math.floor((xf - xi) / 2)
                h = Math.floor((yf - yi) / 5)

                x = xf - w - Math.floor(Math.random() * (xf - xi) / 4)
                y = yi + (yf - yi) / 2 - h / 2
                criarElem(x, y, w, h, "pink")
            }
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