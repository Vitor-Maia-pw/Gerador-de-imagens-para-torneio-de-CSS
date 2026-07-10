const canvas = document.getElementById("canva");
const ctx = canvas.getContext("2d");
let objetosArray = []
let razãoX = 1
let razãoY = 1

let direction = 0
let quant = 0
let nDiv = 0
let w = 0
let h = 0
let x = 0
let y = 0
let porcentagem = 0
let a = 0
let tipoRet = 0
let aleatorio = 0
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
    razãoX = canvas.width / 1920
    razãoY = canvas.height / 960
}


window.addEventListener("resize", resizeCanvas);
resizeCanvas();
/* A layer serve para organizar os elementos em camadas diferentes, assim os elementos da layer 1 foram criador a partir dos 
elementos da layer 0 */
function EscolheLayout (layer, x, y, w, h, W, H, direction, id) {
    if (!objetosArray[layer]) {
        objetosArray[layer] = [];
    }
/* O Id é importante, pois quando o VerificaDiv for chamado, ele receberá um elemento [[[][]]] assim quando ele for dividir um 
elemento, ele vai selecionar a layer, e terá o id para não verificar duas vezes o elemento da mesma layer, assim ficando:
1. divide o 1° elemento da layer 0, e chama o VerificaDiv com a layer 1 e id 0
2. divide o 2° elemento da layer 0, e chama o VerificaDiv com a layer 1 e id 1
dessa forma quando o VerificaDiv for chamado para dividir o elemento id 0 da layer 1,
ele não irá verificar o elemento id 1 da layer 1, e quando for chamado para dividir o elemento id 1 da layer 1,
ele não irá verificar o elemento id 0 da layer 1, assim evitando que um elemento seja dividido mais de uma vez*/
    if (!objetosArray[layer][id]) {
        objetosArray[layer][id] = [];
    }
    // direction = row
    if (direction === 0) {
        nDiv = W / 192
        if (nDiv > 3) {
            nDiv = 3
        }
        quant = Math.floor(Math.random() * (nDiv - 1)) + 1
        nDiv = 1
        
        for (let i = 0; i <= quant; i++) {
            x = x + w
            // w min 192
            if (quant === i) {
                w = W
            }
            else {
                // tem a chance de gerar 
                w = Math.floor(Math.random() * (W - (192 * (quant - i + 1)))) + 192
                W -= w  
                nDiv--
            }
            objetosArray[layer][id].push({
                x: x,
                y: y,
                w: w,
                h: H,
            })
        }
    }
    //direction = column
    else {
        nDiv = H / 192
        if (nDiv > 3) {
            nDiv = 3
        }
        quant = Math.floor(Math.random() * (nDiv - 1)) + 1
        nDiv = 1
        
        for (let i = 0; i <= quant; i++) {
            y = y + h
            // w min 192
            if (quant === i) {
                h = H
            }
            else {
                h = Math.floor(Math.random() * (H - (192 * (quant - i + 1)))) + 192
                H -= h  
            }
        
            objetosArray[layer][id].push({
                x: x,
                y: y,
                w: W,
                h: h,
            })
        }
        
    }
    if (a === 0) {
        
        VerificaDiv(layer, direction, id)
    }
}

let ultimaVolta = 0
function VerificaDiv(layer, direction, id) {
    let divisoes = 0
    for (let i = 0; i < objetosArray[layer][id].length; i++) {
        let dividir = 0 
        if (direction === 0) {
            if (objetosArray[layer][id][i].h > 192 * 2) {
                porcentagem = (objetosArray[layer][id][i].h / 192)
                dividir = Math.floor(Math.random() * porcentagem) + (porcentagem < 3 ? 0 : 2)  
                
            }
        }else{
            if (objetosArray[layer][id][i].w > 192 * 2) {
                porcentagem = (objetosArray[layer][id][i].w / 192)
                dividir = Math.floor(Math.random() * porcentagem) + (porcentagem < 3 ? 0 : 2)  
                
            }
        }
        
        if (dividir > 0) {
            aleatorio = Math.floor(Math.random() * 2)
            if (aleatorio === 0) {
                EscolheLayout(layer + 1, objetosArray[layer][id][i].x, objetosArray[layer][id][i].y, 0, 0, objetosArray[layer][id][i].w, objetosArray[layer][id][i].h, direction === 0 ? 1 : 0, i)
                
            }else{
                AddRet(layer, id, i)
            }
            // se for o primeiro elemento da função, é impossivel a layerAtual ser diferente de layer
            // se o id for maior que 0, a layerAtual pode ser diferente de layer
            // se id for 0, e não tiver mais IDs ele pode ser diferente de layer
            // 
            divisoes++
        }
        if(layer === 0 && i === objetosArray[layer][id].length - 1 ) {
            ultimaVolta++
        }
    }
    if(layer === 0){
        geraCor()
        console.log(objetosArray)
       
    }
    if (layer  === objetosArray.length - 1 && id === objetosArray[layer].length - 1 && divisoes === 0) {
    }
}

function AddRet(layer, id, obj) {
    if (!objetosArray[layer + 1]) {
        objetosArray[layer + 1] = [];
    }

    if (!objetosArray[layer + 1][id + 1]) {
        objetosArray[layer + 1][id + 1] = [];
    }

    W = objetosArray[layer][id][obj].w
    H = objetosArray[layer][id][obj].h
    x = objetosArray[layer][id][obj].x
    y = objetosArray[layer][id][obj].y
    direction = Math.floor(Math.random() * 2)
    // if (w > 192 * 2 + 50 && h > 192 * 2 + 50) {
    //     tipoRet = Math.floor(Math.random() * 2)
    // }
    switch (tipoRet) {
        case 0:
            w = Math.floor(Math.random() * (W/2) + W/2)
            h = Math.floor(Math.random() * (H - H * 7 / 10) + H * 7 / 10)
            
            y = Math.floor(Math.random() * (H - h) + y)
            objetosArray[layer + 1][id + 1].push({
                x: x,
                y: y,
                w: w,
                h: h,
            })
            
            VerificaDiv(layer + 1, direction, id )
            break;
    
        case 1:

            break;
    }
}

direction = Math.floor(Math.random() * 2)
// layer, x, y, w, h, W, H, direction, id
EscolheLayout(0, 0, 0, 0, 0, 1920, 960, direction, 0)

function geraCor() {
    
    for (const camada of objetosArray) {
        for (const ids of camada) {
            if (ids) {
                for (const obj of ids) {
                    criarElem(obj.x, obj.y, obj.w, obj.h, `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`)
                }

            }
        }
    }
}
function criarElem(x, y, w, h, cor) {
    x = Math.floor(x * razãoX)
    w = Math.floor(w * razãoX)
    y = Math.floor(y * razãoY)
    h = Math.floor(h * razãoY)
   
    ctx.beginPath()
    ctx.fillStyle = cor
    ctx.fillRect(x, y, w, h)

}
// x = Math.random() * (xf - xi - tamMinX) + xi;
// y = Math.random() * (ch - tamMinY) + yi;
// 6 9 12
/*
g: 6
m: 9
p: 12

G: 6
M: 9
P: 12

g / G = 83
m / M =
p / P =

300 100 = p 200 = m 283 = g
*/