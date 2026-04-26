const canvas = document.getElementById("canva");
const ctx = canvas.getContext("2d");
let objetosArray = []
let razãoX = 1
let razãoY = 1
function resizeCanvas() {
    const scale = window.devicePixelRatio;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width * scale;
    canvas.height = height * scale;
    
    
    canvas.style.width = window.innerWidth + "px"
    canvas.style.height = window.innerHeight + "px"

    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    for (let i = 0; i < objetosArray.length; i++) {
        criarElem(objetosArray[i].x, objetosArray[i].y, objetosArray[i].w, objetosArray[i].h, objetosArray[i].cor, 1)
        
    }
    razãoX = canvas.width/1920
    razãoY = canvas.height/960
    console.log(canvas.width, razãoX)
}


window.addEventListener("resize", resizeCanvas);
resizeCanvas();


//tamanho minimo que um objeto pode ter de W ou H
let tipoHeader = 0
let larguraMax = window.innerWidth
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
    ctx.fillStyle = "rgb(255, 0, 0)"
    ctx.fillRect(0, 0, larguraMax, 240)
    objetosArray.push({
        x: 0,
        y: 0,
        w: larguraMax,
        h: 240,
        cor: "red"
    })
    // criação dos limites da main
    ctx.fillStyle = "green"
    ctx.fillRect(0, 240, larguraMax, 480)
    objetosArray.push({
        x: 0,
        y: 240,
        w: larguraMax,
        h: 480,
        cor: "green"
    })
    // criação dos limites do footer
    ctx.fillStyle = "blue"
    ctx.fillRect(0, 720, larguraMax, 240)
    objetosArray.push({
        x: 0,
        y: 720,
        w: larguraMax,
        h: 240,
        cor: "blue"
    })

    // decide o tipo de header de forma aleatória
    tipoHeader = Math.floor(Math.random() * 5) + 1
    tipoCorHeader = {
        r: 0,
        g: 1,
        b: 1,
    }
    tipoCorMain = {
        r: 1,
        g: 0,
        b: 1,
    }
    tipoCorFooter = {
        r: 1,
        g: 1,
        b: 0,
    }
    // chama a função, e envia o tipo de layout do header
    escolheHeader(tipoHeader, larguraMax, 240, tipoCorHeader)
    // decide o tipo de header de forma aleatória
    tipoMain = Math.floor(Math.random() * 2) + 1
    // chama a função, e envia o tipo de layout do Main
    escolheMain(tipoMain, larguraMax, 480, tipoCorMain)

}

// função que recebe os limites do layout e o tipo do header para chamar a sua devida função
function escolheHeader(tipo, w, h, tipoCor) {

    //verifica qual o tipo do header e chama a função
    switch (tipo) {
        case 1:
            // quadrado + retangulo + quadrado
            criarHeader1(w, h, tipoCor)
            break;

        case 2:
            // retangulo + quadrado
            criarHeader2(w, h, tipoCor)

            break;
        case 3:
            // quadrado + retangulo
            criarHeader3(w, h, tipoCor)

            break;
        case 4:
            //retangulinhos/retangulos
            criarHeader4(w, h, tipoCor)

            break;
        case 5:
            //retangulinhos/retangulos
            criarHeader5(w, h, tipoCor)

            break;
    }
}

// função que cria o header do tipo 1 com os limites do layout
function criarHeader1(wHe, hHe, tipoCor, x, y, xf, yf, tamMinX, tamMinY, w, h, cx, cy, ch, cw, aleatorio) {

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

    aleatorio = Math.floor(Math.random() * 9)
    geraCor(x, y, w, h, tipoCor, 1, aleatorio)

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

    aleatorio = Math.floor(Math.random() * 9)
    geraCor(x, y, w, h, tipoCor, 1, aleatorio)

    // espelha o primeiro quadrado do outro lado
    x = wHe - cx - cw
    y = cy

    aleatorio = Math.floor(Math.random() * 9)
    geraCor(x, y, cw, ch, tipoCor, 1, aleatorio)
}
// criarHeader1()

// função que cria o header do tipo 1 com os limites do layout
function criarHeader2(wHe, hHe, tipoCor, x, y, xf, yf, tamMinX, tamMinY, w, h, aleatorio) {

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

    aleatorio = Math.floor(Math.random() * 9)
    geraCor(x, y, w, h, tipoCor, 1, aleatorio)

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


    aleatorio = Math.floor(Math.random() * 9)
    geraCor(x, y, w, h, tipoCor, 1, aleatorio)
}
// criarHeader2()
function criarHeader3(wHe, hHe, tipoCor, x, y, xf, yf, tamMinX, tamMinY, w, h, aleatorio) {

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

    aleatorio = Math.floor(Math.random() * 9)
    geraCor(x, y, w, h, tipoCor, 1, aleatorio)

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

    aleatorio = Math.floor(Math.random() * 9)
    geraCor(x, y, w, h, tipoCor, 1, aleatorio)
}
// criarHeader3()

function criarHeader4(wHe, hHe, tipoCor, x, y, cx, w, h, aleatorio, quant) {

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

    aleatorio = Math.floor(Math.random() * 9)
    geraCor(x, y, w, h, tipoCor, 1, aleatorio)
    for (let i = 0; i < quant - 1; i++) {
        x += (wHe / (1 + 2 * quant)) * 2
        //envia as características para serem desenhadas

        aleatorio = Math.floor(Math.random() * 9)
        geraCor(x, y, w, h, tipoCor, 1, aleatorio)

    }
    quant = Math.floor(Math.random() * 2) + 2
    x = Math.floor((wHe / (1 + 2 * quant)) * 4 / 10)
    cx = x
    y = y + h + Math.floor(Math.random() * 30) + 20
    w = Math.floor((wHe - (quant + 1) * x) / quant)
    h = hHe - y - Math.floor(Math.random() * 30)
    //envia as características para serem desenhadas

    aleatorio = Math.floor(Math.random() * 9)
    geraCor(x, y, w, h, tipoCor, 1, aleatorio)
    for (let i = 0; i < quant - 1; i++) {
        x += cx + w
        //envia as características para serem desenhadas

        aleatorio = Math.floor(Math.random() * 9)
        geraCor(x, y, w, h, tipoCor, 1, aleatorio)

    }


}
// criarHeader4()
function criarHeader5(wHe, hHe, tipoCor, x, y, cx, ch, w, h, aleatorio, quant) {

    //fração da quantidade de quadrado pelo espaço
    quant = Math.floor(Math.random() * 2) + 2
    x = Math.floor((wHe / (1 + 2 * quant)) * 4 / 10)
    cx = x
    ch = Math.floor(Math.random() * 30) + 40
    y = Math.floor(Math.random() * 20) + 10
    w = (wHe - (quant + 1) * x) / quant
    h = hHe - ch - y * 2
    //envia as características para serem desenhadas

    aleatorio = Math.floor(Math.random() * 9)
    geraCor(x, y, w, h, tipoCor, 1, aleatorio)
    for (let i = 0; i < quant - 1; i++) {
        x += cx + w
        //envia as características para serem desenhadas

        aleatorio = Math.floor(Math.random() * 9)
        geraCor(x, y, w, h, tipoCor, 1, aleatorio)

    }

    x = 0
    w = wHe
    h = hHe - y * 2 - h
    y = hHe - h

    geraCor(x, y, w, h, tipoCor, 0, aleatorio)

}

function escolheMain(tipo, w, h, tipoCor) {

    //verifica qual o tipo do Main e chama a função
    switch (tipo) {
        case 1:
            // quadrado + retangulo + quadrado
            criarMain1(w, h, 240, tipoCor)
            break;

        case 2:
            // retangulo + quadrado
            criarMain2(w, h, 240, tipoCor)

            break;
        case 3:
            // quadrado + retangulo
            criarMain3(w, h, 240, tipoCor)

            break;
        case 4:
            //retangulinhos/retangulos
            criarMain4(w, h, 240, tipoCor)

            break;
        case 5:
            //retangulinhos/retangulos
            criarMain5(w, h, 240, tipoCor)

            break;
    }
}
// escolhe main
// função que cria o Main do tipo 1 com os limites do layout
function criarMain1(wMa, hMa, yi, tipoCor, x, y, w, h, cx, aleatorio, quant) {

    quant = Math.floor(Math.random() * 3) + 3
    w = Math.floor(wMa / (2 * quant + 1)) + Math.floor(Math.random() * 80 + 80)
    y = Math.floor(Math.random() * 40 + 30) + yi
    h = hMa - 2 * (y - yi)
    x = Math.floor((wMa - (w * quant)) / (quant + 1))
    cx = x

    aleatorio = Math.floor(Math.random() * 3) + 20
    geraCor(x, y, w, h, tipoCor, 1, aleatorio)
    for (let i = 0; i < quant - 1; i++) {
        x += cx + w
        aleatorio = Math.floor(Math.random() * 3) + 20
        geraCor(x, y, w, h, tipoCor, 1, aleatorio)
    }
}
// Main1
function criarMain2(wMa, hMa, yi, tipoCor, x, y, w, h, cx, cy, aleatorio, quant, gap) {
    quant = Math.floor(Math.random() * 2 + 2)
    gap = Math.floor(Math.random() * 50) + 30
    x = Math.floor(Math.random() * (wMa / (4 * quant + 1)))
    y = Math.floor(Math.random() * 40 + 30) + yi
    w = Math.floor((wMa - 2 * x) / quant - (gap * 2))
    h = hMa / 2 - 3 * (y - yi) / 2
    cx = x
    cy = y

    y = hMa - (y - yi) + yi - h
    aleatorio = Math.floor(Math.random() * 9)
    geraCor(x, cy, w, h, tipoCor, 1, aleatorio)
    console.log(aleatorio)

    aleatorio = Math.floor(Math.random() * 9)
    geraCor(x, y, w, h, tipoCor, 1, aleatorio)
    console.log(aleatorio)

    for (let i = 0; i < quant - 1; i++) {
        x += w + (wMa - w * quant - cx * 2) / (quant - 1)
        aleatorio = Math.floor(Math.random() * 9)
        geraCor(x, cy, w, h, tipoCor, 1, aleatorio)
        console.log(aleatorio)
        aleatorio = Math.floor(Math.random() * 9)
        geraCor(x, y, w, h, tipoCor, 1, aleatorio)
        console.log(aleatorio)

    }
}
// Main2
function escolheRet(x, y, w, h, aleatorio, cor, xi, yi, xf, yf, cw, ch, p, px, py, tamMinX, tamMinY, lado) {
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

            criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
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
                criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)

                x = xf - w - px
                y = yf - h - py

                criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
            } else {

                px = Math.floor(Math.random() * 10) + 10
                py = Math.floor(Math.random() * 10) + 10
                w = Math.floor(Math.random() * ((cw - px) / 2 - tamMinX) + tamMinX)
                h = Math.floor(Math.random() * ((ch - py) / 2 - tamMinY) + tamMinY)
                x = xf - px - w
                y = yi + py



                criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)

                x = xi + px
                y = yf - h - py


                criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
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

            criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)

            x = xf - w - x + xi

            criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
            break;
        // gera um quadrado no centro
        case 4:
            tamMinX = Math.floor(cw / 5)
            tamMinY = Math.floor(ch / 5)
            w = Math.floor(Math.random() * (cw / 2 - tamMinX) + tamMinX)
            h = Math.floor(Math.random() * (ch / 2 - tamMinY) + tamMinY)
            x = xi + cw / 2 - w / 2
            y = yi + ch / 2 - h / 2

            criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)

            break;
        // gera 3 retangulos centralizados
        case 5:
            w = Math.floor(cw / 2)
            h = Math.floor(ch / 8)

            x = xi + cw / 2 - w / 2
            y = yi + ch / 32 * 5

            criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
            y = y + ch / 32 * 5 + h

            criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
            y = y + ch / 32 * 5 + h

            criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
            break;
        // gera 3 retangulos sequenciais
        case 6:

            tamMinY = Math.floor(ch / 5)
            w = cw
            h = Math.floor(Math.random() * (ch / 4 - tamMinY) + tamMinY)
            x = xi
            y = yi + ch / 2 - h / 2

            criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
            break;

        // casos acima de 9 são para retangulos do header
        // gera ou 3 retangulos sequenciais ou 1 retangulo central
        case 7:
            if (ch / 5 > 30) {
                w = Math.floor(cw / 2)
                h = Math.floor(ch / 8)

                x = xi + Math.floor(Math.random() * 90)
                y = yi + ch / 32 * 5
                criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
                y = y + ch / 32 * 5 + h
                criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
                y = y + ch / 32 * 5 + h
                criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
            } else {
                w = Math.floor(cw / 2)
                h = Math.floor(ch / 5)

                x = xi + Math.floor(Math.random() * cw / 4)
                y = yi + ch / 2 - h / 2
                criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
            }
            break;
        // dependendo do tamanho gera retangulos centralizados verticalmente
        case 8:
            if (ch / 5 > 30) {
                w = Math.floor(cw / 2)
                h = Math.floor(ch / 8)

                x = xf - w - Math.floor(Math.random() * 90)
                y = yi + ch / 32 * 5
                criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
                y = y + ch / 32 * 5 + h
                criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
                y = y + ch / 32 * 5 + h
                criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
            } else {
                w = Math.floor(cw / 2)
                h = Math.floor(ch / 5)

                x = xf - w - Math.floor(Math.random() * cw / 4)
                y = yi + ch / 2 - h / 2
                criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
            }
            break;
        // gera um card de produto com apenas "escrita"
        case 20:
            x = xi + Math.floor(Math.random() * 11) + 20
            y = yi + Math.floor(Math.random() * 11) + 20
            w = xi + cw - (x * 2 - xi)
            h = Math.floor(Math.random() * 50 + 150)


            criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
            aleatorio = Math.floor(Math.random() * 10) + 15
            y += h + aleatorio
            h = (ch - h) / 7 + Math.floor(Math.random() * 10);
            for (let i = 0; i < 3; i++) {
                criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
                y += h + aleatorio

            }
            break;
        // gera um card de produto com botão
        case 21:

            x = xi + Math.floor(Math.random() * 11) + 20
            y = yi + Math.floor(Math.random() * 11) + 20
            w = xi + cw - (x * 2 - xi)
            h = Math.floor(Math.random() * 50 + 150)


            criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
            aleatorio = Math.floor(Math.random() * 10) + 15
            y += h + aleatorio
            h = (ch - h) / 7 + Math.floor(Math.random() * 10) - 10;

            criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
            y += h + Math.floor(Math.random() * 20) + 10

            criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
            y += h + aleatorio
            h = ch + yi - y - aleatorio;

            criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)

            break;
        // card com primeiro retangulo maior e segundo menor
        case 22:
            x = xi + Math.floor(Math.random() * 11) + 20
            y = yi + Math.floor(Math.random() * 11) + 20
            w = xi + cw - (x * 2 - xi)
            h = Math.floor(Math.random() * (h / 4) + h / 2)


            criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
            aleatorio = Math.floor(Math.random() * 10) + 15
            y += h + aleatorio
            h = ch + yi - y - aleatorio;

            criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)

            break;
        case 23:

            break;
    }
}
function geraCor(x, y, w, h, tipoCor, ret, aleatorio, cor, corRet) {
    cor = {
        r: Math.floor(Math.random() * (255 * tipoCor.r)),
        g: Math.floor(Math.random() * (255 * tipoCor.g)),
        b: Math.floor(Math.random() * (255 * tipoCor.b))
    }
    criarElem(x, y, w, h, `rgb(${cor.r}, ${cor.g}, ${cor.b})`)
    if (ret === 1) {
        corRet = {
            r: 255 - cor.r,
            g: 255 - cor.g,
            b: 255 - cor.b,
        }
        escolheRet(x, y, w, h, aleatorio, corRet)

    }
}
function criarElem(x, y, w, h, cor, redesenhar) {
    x = Math.floor(x * razãoX)
    w = Math.floor(w * razãoX)
    y = Math.floor(y * razãoY)
    h = Math.floor(h * razãoY)
    console.log(x,y,w,h, razãoX, razãoY)
    if (!redesenhar) {
        objetosArray.push({
            x: x,
            y: y,
            w: w,
            h: h,
            cor: cor
        })
    } else {

    }
    ctx.beginPath()
    ctx.fillStyle = cor
    ctx.fillRect(x, y, w, h)

}
// x = Math.random() * (xf - xi - tamMinX) + xi;
// y = Math.random() * (ch - tamMinY) + yi;