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
// função que seleciona um dos layouts que servirão para limitar os objetos
function escolheLayout(l) {
    switch (l) {
        case 1:
            // gera um header, um main e um footer
            layout1()
            break;

        default:
            break;
    }
}
escolheLayout(1)

// a função do layout numero 1, tem as demarcações dele
function layout1() {

    // cria de forma visivel as demarcações do layout, os lugares que devem ter quadrados sem vazar
    // criação dos limites do header
    ctx.beginPath()
    ctx.fillStyle = "blue"
    ctx.fillRect(0, 0, larguraMax, 270)
    // criação dos limites da main
    ctx.fillStyle = "red"
    ctx.fillRect(0, 270, larguraMax, 540)
    // criação dos limites do footer
    ctx.fillStyle = "green"
    ctx.fillRect(0, 810, larguraMax, 270)

    // decide o tipo de header de forma aleatória
    tipoHeader = Math.floor(Math.random() * 5) + 1
    // chama a função, e envia o tipo de layout do header
    escolheHeader(tipoHeader, larguraMax, 270)
    // decide o tipo de header de forma aleatória
    tipoMain = Math.floor(Math.random() * 5) + 1
    // chama a função, e envia o tipo de layout do Main
    escolheMain(tipoMain, larguraMax, 540)

}

// função que recebe os limites do layout e o tipo do header para chamar a sua devida função
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

// função que cria o header do tipo 1 com os limites do layout
function criarHeader1(wHe, hHe, x, y, xf, yf, tamMinX, tamMinY, w, h, cx, cy, ch, cw, aleatorio, rgb1, rgb2, rgb3) {

    // esse é a distancia do objeto até a borda esquerda
    x = Math.floor(Math.random() * 6 * 10)
    y = Math.floor(Math.random() * 10) * 10

    // valor usado para limitar o tamanho do objeto, ele não pode ser maior que isso
    xf = wHe / 4
    yf = hHe - y

    // margem do tamanho do objeto
    tamMinX = hHe - x * 2
    tamMinY = hHe - y * 2

    // gera o tamanho de forma aleatoria, com os limites impostos
    w = Math.floor(Math.random() * (xf - tamMinX - x) + tamMinX)
    h = Math.floor(Math.random() * (yf - tamMinY - y) + tamMinY)

    // salva os tamanhos para usa-los posteriormente
    cx = x
    cy = y
    cw = w
    ch = h

    // envia as características para serem desenhadas
    rgb1 = Math.floor(Math.random() * 256)
    rgb2 = Math.floor(Math.random() * 256)
    rgb3 = Math.floor(Math.random() * 256)
    criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
    aleatorio = Math.floor(Math.random() * 7)
    // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
    escolheRet(x, y, w, h, aleatorio)

    // chama o segundo quadrado do centro
    // gera um valor aleatório para o x, ele deve ser o quadrado anterior mais uma pequena margem
    x = x + w + Math.floor(Math.random() * 20) * 10 + 20
    // gera um valor aleatório para o y, deve ser o valor de height maximo dividido por 5, mais uma margem de height maximo vezes 2 dividido por 5
    y = Math.floor(Math.random() * ((hHe * 2 / 5) - hHe / 5)) + hHe / 5;
    // limita o tamanho do quadrado, deve ser espelhado a margem do lado esquerdo no lado direito
    xf = wHe - x * 2
    // calcula o width do quadrado
    tamMinX = wHe - x * 2
    // calcula um valor aproximado para o height do quadrado
    tamMinY = hHe - y * 2

    // determina os tamanhos
    w = tamMinX
    h = Math.random() * (yf - tamMinY - y) + tamMinY

    //desenha o segundo quadrado
    rgb1 = Math.floor(Math.random() * 256)
    rgb2 = Math.floor(Math.random() * 256)
    rgb3 = Math.floor(Math.random() * 256)
    criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
    aleatorio = Math.floor(Math.random() * 7)
    escolheRet(x, y, w, h, aleatorio)

    // espelha o primeiro quadrado do outro lado
    x = wHe - cx - cw
    y = cy

    criarElem(x, y, cw, ch, "black")
    escolheRet(x, y, cw, ch, aleatorio)
}
// criarHeader1()

// função que cria o header do tipo 1 com os limites do layout
function criarHeader2(wHe, hHe, x, y, xf, yf, tamMinX, tamMinY, w, h, aleatorio, rgb1, rgb2, rgb3) {

    // esse é a distancia do objeto até a borda esquerda
    x = Math.floor(Math.random() * 6) * 10
    y = Math.floor(Math.random() * 10) * 10

    // valor limite usado para limitar o tamanho do objeto, ele não pode ser maior que isso
    xf = wHe / 3 * 2
    yf = hHe - y

    // tamanho aproximado do objeto
    tamMinX = wHe / 4 * 2.5
    tamMinY = hHe - y * 2

    // gera o tamanho de forma aleatoria, gera um valor entre valorF e margem, e com tamanho minimo tamMin
    w = Math.floor(Math.random() * ((xf - x) - tamMinX)) + tamMinX
    h = Math.floor(Math.random() * ((yf - y) - tamMinY)) + tamMinY

    // envia as características para serem desenhadas
    rgb1 = Math.floor(Math.random() * 256)
    rgb2 = Math.floor(Math.random() * 256)
    rgb3 = Math.floor(Math.random() * 256)
    criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
    // gera um valor aleatorio de 10 a 11
    aleatorio = Math.floor(Math.random() * 2) + 10
    // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
    escolheRet(x, y, w, h, aleatorio)

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
    rgb1 = Math.floor(Math.random() * 256)
    rgb2 = Math.floor(Math.random() * 256)
    rgb3 = Math.floor(Math.random() * 256)
    criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
    aleatorio = Math.floor(Math.random() * 7)
    escolheRet(x, y, w, h, aleatorio)
}
// criarHeader2()
function criarHeader3(wHe, hHe, x, y, xf, yf, tamMinX, tamMinY, w, h, aleatorio, rgb1, rgb2, rgb3) {

    // esse é a distancia do objeto até a borda esquerda
    x = Math.floor(Math.random() * 6 * 10)
    y = Math.floor(Math.random() * 10) * 10

    // valor limite usado para limitar o tamanho do objeto, ele não pode ser maior que isso
    xf = wHe / 4
    yf = hHe - y

    // tamanho aproximado do objeto, as vezes pode ser menor
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
    rgb1 = Math.floor(Math.random() * 256)
    rgb2 = Math.floor(Math.random() * 256)
    rgb3 = Math.floor(Math.random() * 256)
    criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
    aleatorio = Math.floor(Math.random() * 7)
    // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
    escolheRet(x, y, w, h, aleatorio)

    // valor limite usado para limitar o tamanho do objeto, ele não pode ser maior que isso
    xf = wHe / 4 * 2
    yf = hHe - y
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
    rgb1 = Math.floor(Math.random() * 256)
    rgb2 = Math.floor(Math.random() * 256)
    rgb3 = Math.floor(Math.random() * 256)
    criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
    aleatorio = Math.floor(Math.random() * 2) + 10
    // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
    escolheRet(x, y, w, h, aleatorio)
}
// criarHeader3()

function criarHeader4(wHe, hHe, x, y, cx, w, h, aleatorio, quant, rgb1, rgb2, rgb3) {

    // gera a quantidade de quadrados, a quantidade pode alterar o tamanho dos objetos 
    quant = Math.floor(Math.random() * 3) + 4

    // fração da quantidade de quadrado pelo espaço
    // quant / (1 + 2 * quant)

    // o width é um valor aleatório, o ele deve ser no minimo o width total dividido pelo numero de quadrados e espaços entre eles
    w = wHe / (1 + 2 * quant) + Math.floor(Math.random() * 21) + wHe / (1 + 2 * quant * 5)
    // o height é o tamanho total dividido por 5
    h = hHe / 5
    // a margem é igual ao width total dividido pela quatidade de quadrados mais os espaços
    x = (wHe / (1 + 2 * quant)) * 2 - w
    y = Math.floor(Math.random() * 41)

    //envia as características para serem desenhadas
    rgb1 = Math.floor(Math.random() * 256)
    rgb2 = Math.floor(Math.random() * 256)
    rgb3 = Math.floor(Math.random() * 256)
    criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
    aleatorio = Math.floor(Math.random() * 2) + 10
    // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
    escolheRet(x, y, w, h, aleatorio)
    for (let i = 0; i < quant - 1; i++) {
        x += (wHe / (1 + 2 * quant)) * 2
        //envia as características para serem desenhadas
        rgb1 = Math.floor(Math.random() * 256)
        rgb2 = Math.floor(Math.random() * 256)
        rgb3 = Math.floor(Math.random() * 256)
        criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
        aleatorio = Math.floor(Math.random() * 2) + 10
        // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
        escolheRet(x, y, w, h, aleatorio)

    }
    quant = Math.floor(Math.random() * 2) + 2
    x = Math.floor((wHe / (1 + 2 * quant)) * 4 / 10)
    cx = x
    y = y + h + Math.floor(Math.random() * 30) + 20
    w = Math.floor((wHe - (quant + 1) * x) / quant)
    h = hHe - y - Math.floor(Math.random() * 30)
    //envia as características para serem desenhadas
    rgb1 = Math.floor(Math.random() * 256)
    rgb2 = Math.floor(Math.random() * 256)
    rgb3 = Math.floor(Math.random() * 256)
    criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
    aleatorio = Math.floor(Math.random() * 7)
    // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
    escolheRet(x, y, w, h, aleatorio)
    for (let i = 0; i < quant - 1; i++) {
        x += cx + w
        //envia as características para serem desenhadas
        rgb1 = Math.floor(Math.random() * 256)
        rgb2 = Math.floor(Math.random() * 256)
        rgb3 = Math.floor(Math.random() * 256)
        criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
        aleatorio = Math.floor(Math.random() * 7)
        // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
        escolheRet(x, y, w, h, aleatorio)

    }


}
// criarHeader4()
function criarHeader5(wHe, hHe, x, y, cx, ch, w, h, aleatorio, quant, rgb1, rgb2, rgb3) {

    //fração da quantidade de quadrado pelo espaço
    quant = Math.floor(Math.random() * 2) + 2
    x = Math.floor((wHe / (1 + 2 * quant)) * 4 / 10)
    cx = x
    ch = Math.floor(Math.random() * 30) + 40
    y = Math.floor(Math.random() * 20) + 10
    w = (wHe - (quant + 1) * x) / quant
    h = hHe - ch - y * 2
    //envia as características para serem desenhadas
    rgb1 = Math.floor(Math.random() * 256)
    rgb2 = Math.floor(Math.random() * 256)
    rgb3 = Math.floor(Math.random() * 256)
    criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
    console.log(x, y, w, h)
    aleatorio = Math.floor(Math.random() * 7)
    // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
    escolheRet(x, y, w, h, aleatorio)
    for (let i = 0; i < quant - 1; i++) {
        x += cx + w
        //envia as características para serem desenhadas
        rgb1 = Math.floor(Math.random() * 256)
        rgb2 = Math.floor(Math.random() * 256)
        rgb3 = Math.floor(Math.random() * 256)
        criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
        aleatorio = Math.floor(Math.random() * 7)
        // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
        escolheRet(x, y, w, h, aleatorio)

    }

    x = 0
    w = wHe
    h = hHe - y * 2 - h
    y = hHe - h
    rgb1 = Math.floor(Math.random() * 256)
    rgb2 = Math.floor(Math.random() * 256)
    rgb3 = Math.floor(Math.random() * 256)
    criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)

}

function escolheMain(tipo, w, h) {

    //verifica qual o tipo do Main e chama a função
    switch (1) {
        case 1:
            // quadrado + retangulo + quadrado
            criarMain1(w, h, 270)
            break;

        case 2:
            // retangulo + quadrado
            criarMain2(w, h, 270)

            break;
        case 3:
            // quadrado + retangulo
            criarMain3(w, h, 270)

            break;
        case 4:
            //retangulinhos/retangulos
            criarMain4(w, h, 270)

            break;
        case 5:
            //retangulinhos/retangulos
            criarMain5(w, h, 270)

            break;
    }
}

// função que cria o Main do tipo 1 com os limites do layout
function criarMain1(wMa, hMa, yi, x, y, w, h, cx, aleatorio, rgb1, rgb2, rgb3) {

    quant = Math.floor(Math.random() * 3) + 3
    w = Math.floor(wMa / (2 * quant + 1)) + Math.floor(Math.random() * 80 + 80)
    y = Math.floor(Math.random() * 40 + 30) + yi
    h = hMa - 2 * (y - yi)
    x = Math.floor((wMa - (w * quant)) / (quant + 1))
    cx = x
    console.log(x, y, w, h, "para")
    rgb1 = Math.floor(Math.random() * 256)
    rgb2 = Math.floor(Math.random() * 256)
    rgb3 = Math.floor(Math.random() * 256)
    criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
    aleatorio = Math.floor(Math.random() * 2) + 20
    // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
    escolheRet(x, y, w, h, aleatorio)
    for (let i = 0; i < quant; i++) {
        x += cx + w
        rgb1 = Math.floor(Math.random() * 256)
        rgb2 = Math.floor(Math.random() * 256)
        rgb3 = Math.floor(Math.random() * 256)
        criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
        aleatorio = Math.floor(Math.random() * 2) + 20
        // envia o x e y inicial, width e height maximos, para gerar quadrados dentro
        escolheRet(x, y, w, h, aleatorio)
    }
}
function escolheRet(x, y, w, h, aleatorio, xi, yi, xf, yf, cw, ch, p, px, py, tamMinX, tamMinY, lado, rgb1, rgb2, rgb3) {
    xi = x
    yi = y
    xf = x + w
    yf = y + h
    cw = w
    ch = h
    switch (aleatorio) {
        case 0:

            break;
        // um quadrado com margin lateral
        case 1:
            // tamanho minimo é 20% do quadrado pai
            tamMinX = Math.floor(w / 8)
            tamMinY = Math.floor(h / 8)
            x = x + Math.floor(Math.random() * (20 - 10) + 10)
            y = y + x - xi
            w = Math.floor(Math.random() * ((xf - x) - tamMinX) + tamMinX)
            h = Math.floor(Math.random() * ((yf - y) - tamMinY) + tamMinY)
            rgb1 = Math.floor(Math.random() * 256)
            rgb2 = Math.floor(Math.random() * 256)
            rgb3 = Math.floor(Math.random() * 256)
            criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
            break;
        // dois quadrados, um no topo a esquerda, e outro na direita em baixo, no quadrado pai
        case 2:
            lado = Math.floor(Math.random() * 2)
            p = Math.floor(Math.random() * 2)
            tamMinX = Math.floor(w / 8)
            tamMinY = Math.floor(h / 8)
            if (lado === 0) {

                px = Math.floor(Math.random() * 10) + 10
                py = Math.floor(Math.random() * 10) + 10
                x = xi + px
                y = yi + py

                w = Math.floor(Math.random() * ((xf - x) / 2 - tamMinX) + tamMinX)
                h = Math.floor(Math.random() * ((yf - y) / 2 - tamMinY) + tamMinY)
                rgb1 = Math.floor(Math.random() * 256)
                rgb2 = Math.floor(Math.random() * 256)
                rgb3 = Math.floor(Math.random() * 256)
                criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)

                x = xf - w - px
                y = yf - h - py

                rgb1 = Math.floor(Math.random() * 256)
                rgb2 = Math.floor(Math.random() * 256)
                rgb3 = Math.floor(Math.random() * 256)
                criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
            } else {

                px = Math.floor(Math.random() * 10) + 10
                py = Math.floor(Math.random() * 10) + 10
                w = Math.floor(Math.random() * ((cw - px) / 2 - tamMinX) + tamMinX)
                h = Math.floor(Math.random() * ((ch - py) / 2 - tamMinY) + tamMinY)
                x = xf - px - w
                y = yi + py



                rgb1 = Math.floor(Math.random() * 256)
                rgb2 = Math.floor(Math.random() * 256)
                rgb3 = Math.floor(Math.random() * 256)
                criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)

                x = xi + px
                y = yf - h - py


                rgb1 = Math.floor(Math.random() * 256)
                rgb2 = Math.floor(Math.random() * 256)
                rgb3 = Math.floor(Math.random() * 256)
                criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
            }

            break;
        // gera dois quadrados no topo
        case 3:
            tamMinX = Math.floor(cw / 5)
            tamMinY = Math.floor(ch / 5)

            x = xi + Math.floor(Math.random() * 10) + 10
            y = yi + Math.floor(Math.random() * 10) + 10
            w = Math.floor(Math.random() * ((xf - (x * 2 - xi)) / 2 - tamMinX - Math.floor(Math.random() * 10) - 10)) + tamMinX
            h = Math.floor(Math.random() * ((yf - y) / 2 - tamMinY - Math.floor(Math.random() * 10) + 10)) + tamMinY
            rgb1 = Math.floor(Math.random() * 256)
            rgb2 = Math.floor(Math.random() * 256)
            rgb3 = Math.floor(Math.random() * 256)
            criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)

            x = xf - w - x + xi
            rgb1 = Math.floor(Math.random() * 256)
            rgb2 = Math.floor(Math.random() * 256)
            rgb3 = Math.floor(Math.random() * 256)
            criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
            break;
        // gera um quadrado no centro
        case 4:
            tamMinX = Math.floor(cw / 5)
            tamMinY = Math.floor(ch / 5)
            w = Math.floor(Math.random() * (cw / 2 - tamMinX) + tamMinX)
            h = Math.floor(Math.random() * (ch / 2 - tamMinY) + tamMinY)
            x = xi + cw / 2 - w / 2
            y = yi + ch / 2 - h / 2
            rgb1 = Math.floor(Math.random() * 256)
            rgb2 = Math.floor(Math.random() * 256)
            rgb3 = Math.floor(Math.random() * 256)
            criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)

            break;
        // gera 3 retangulos centralizados
        case 5:
            w = Math.floor(cw / 2)
            h = Math.floor(ch / 8)

            x = xi + cw / 2 - w / 2
            y = yi + ch / 32 * 5
            rgb1 = Math.floor(Math.random() * 256)
            rgb2 = Math.floor(Math.random() * 256)
            rgb3 = Math.floor(Math.random() * 256)
            criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
            y = y + ch / 32 * 5 + h
            rgb1 = Math.floor(Math.random() * 256)
            rgb2 = Math.floor(Math.random() * 256)
            rgb3 = Math.floor(Math.random() * 256)
            criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
            y = y + ch / 32 * 5 + h
            rgb1 = Math.floor(Math.random() * 256)
            rgb2 = Math.floor(Math.random() * 256)
            rgb3 = Math.floor(Math.random() * 256)
            criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
            break;
        // gera 3 retangulos sequenciais
        case 6:

            tamMinY = Math.floor(ch / 5)
            w = cw
            h = Math.floor(Math.random() * (ch / 4 - tamMinY) + tamMinY)
            x = xi
            y = yi + ch / 2 - h / 2
            rgb1 = Math.floor(Math.random() * 256)
            rgb2 = Math.floor(Math.random() * 256)
            rgb3 = Math.floor(Math.random() * 256)
            criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
            break;

        // casos acima de 9 são para retangulos do header
        // gera ou 3 retangulos sequenciais ou 1 retangulo central
        case 10:
            if (ch / 5 > 30) {
                w = Math.floor(cw / 2)
                h = Math.floor(ch / 8)

                x = xi + Math.floor(Math.random() * 90)
                y = yi + ch / 32 * 5
                rgb1 = Math.floor(Math.random() * 256)
                rgb2 = Math.floor(Math.random() * 256)
                rgb3 = Math.floor(Math.random() * 256)
                criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
                y = y + ch / 32 * 5 + h
                rgb1 = Math.floor(Math.random() * 256)
                rgb2 = Math.floor(Math.random() * 256)
                rgb3 = Math.floor(Math.random() * 256)
                criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
                y = y + ch / 32 * 5 + h
                rgb1 = Math.floor(Math.random() * 256)
                rgb2 = Math.floor(Math.random() * 256)
                rgb3 = Math.floor(Math.random() * 256)
                criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
            } else {
                w = Math.floor(cw / 2)
                h = Math.floor(ch / 5)

                x = xi + Math.floor(Math.random() * cw / 4)
                y = yi + ch / 2 - h / 2
                rgb1 = Math.floor(Math.random() * 256)
                rgb2 = Math.floor(Math.random() * 256)
                rgb3 = Math.floor(Math.random() * 256)
                criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
            }
            break;
        case 11:
            if (ch / 5 > 30) {
                w = Math.floor(cw / 2)
                h = Math.floor(ch / 8)

                x = xf - w - Math.floor(Math.random() * 90)
                y = yi + ch / 32 * 5
                rgb1 = Math.floor(Math.random() * 256)
                rgb2 = Math.floor(Math.random() * 256)
                rgb3 = Math.floor(Math.random() * 256)
                criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
                y = y + ch / 32 * 5 + h
                rgb1 = Math.floor(Math.random() * 256)
                rgb2 = Math.floor(Math.random() * 256)
                rgb3 = Math.floor(Math.random() * 256)
                criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
                y = y + ch / 32 * 5 + h
                rgb1 = Math.floor(Math.random() * 256)
                rgb2 = Math.floor(Math.random() * 256)
                rgb3 = Math.floor(Math.random() * 256)
                criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
            } else {
                w = Math.floor(cw / 2)
                h = Math.floor(ch / 5)

                x = xf - w - Math.floor(Math.random() * cw / 4)
                y = yi + ch / 2 - h / 2
                rgb1 = Math.floor(Math.random() * 256)
                rgb2 = Math.floor(Math.random() * 256)
                rgb3 = Math.floor(Math.random() * 256)
                criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
            }
            break;
        case 20:
            x = xi + Math.floor(Math.random() * 11) + 20
            y = yi + Math.floor(Math.random() * 11) + 20
            w = xi + cw - (x * 2 - xi)
            h = Math.floor(Math.random() * 50 + 150)

            rgb1 = Math.floor(Math.random() * 256)
            rgb2 = Math.floor(Math.random() * 256)
            rgb3 = Math.floor(Math.random() * 256)
            criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
            aleatorio = Math.floor(Math.random() * 10) + 15
            y += h + aleatorio
            h = (ch - h) / 7 + Math.floor(Math.random() * 10);
            for (let i = 0; i < 3; i++) {
                rgb1 = Math.floor(Math.random() * 256)
                rgb2 = Math.floor(Math.random() * 256)
                rgb3 = Math.floor(Math.random() * 256)
                criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
                y += h + aleatorio

            }
            break;
        case 21:

            x = xi + Math.floor(Math.random() * 11) + 20
            y = yi + Math.floor(Math.random() * 11) + 20
            w = xi + cw - (x * 2 - xi)
            h = Math.floor(Math.random() * 50 + 150)

            rgb1 = Math.floor(Math.random() * 256)
            rgb2 = Math.floor(Math.random() * 256)
            rgb3 = Math.floor(Math.random() * 256)
            criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
            aleatorio = Math.floor(Math.random() * 10) + 15
            y += h + aleatorio
            h = (ch - h) / 7 + Math.floor(Math.random() * 10) - 10;
            rgb1 = Math.floor(Math.random() * 256)
            rgb2 = Math.floor(Math.random() * 256)
            rgb3 = Math.floor(Math.random() * 256)
            criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
            y += h + Math.floor(Math.random() * 20) + 10
            rgb1 = Math.floor(Math.random() * 256)
            rgb2 = Math.floor(Math.random() * 256)
            rgb3 = Math.floor(Math.random() * 256)
            criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
            y += h + aleatorio
            h = Math.floor(Math.random() * ((yf - y - Math.floor(Math.random() * 20)) - (ch - h) / 7)) + (ch - h) / 7 ;
            rgb1 = Math.floor(Math.random() * 256)
            rgb2 = Math.floor(Math.random() * 256)
            rgb3 = Math.floor(Math.random() * 256)
            criarElem(x, y, w, h, `rgb(${rgb1}, ${rgb2}, ${rgb3})`)
            
            break;
        case 22:

            break;
        case 23:

            break;
    }
}

function criarElem(x, y, w, h, color) {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)

}
// x = Math.random() * (xf - xi - tamMinX) + xi;
// y = Math.random() * (ch - tamMinY) + yi;