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
    console.log(canvas.width, razãoX)
}


window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function EscolheLayout (layer, x, y, w, h, W, H, direction, id) {
    console.log("a")
    if (!objetosArray[layer]) {
        objetosArray[layer] = [];
    }
    if (!objetosArray[layer][id]) {
        objetosArray[layer][id] = [];
    }
    // direction = row
    if (direction === 0) {
        nDiv = W / 150
        if (nDiv > 4) {
            nDiv = 4
        }
        quant = Math.floor(Math.random() * (nDiv - 1)) + 1
        nDiv = 1
        
        console.log(quant)
        for (let i = 0; i <= quant; i++) {
            x = x + w
            console.log(i)
            // w min 150
            if (quant === i) {
                w = W
            }
            else {
                w = Math.floor(Math.random() * ((W / (quant + nDiv)) - 150)) + 150
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
        console.log(objetosArray)
    }
    //direction = column
    else {
        nDiv = H / 150
        if (nDiv > 4) {
            nDiv = 4
        }
        quant = Math.floor(Math.random() * (nDiv - 1)) + 1
        nDiv = 1
        
        console.log(quant)
        for (let i = 0; i <= quant; i++) {
            y = y + h
            console.log(i)
            // w min 150
            if (quant === i) {
                h = H
            }
            else {
                h = Math.floor(Math.random() * ((H/ (quant + nDiv)) - 150)) + 150
                H -= h  
                nDiv--
            }
            objetosArray[layer][id].push({
                x: x,
                y: y,
                w: W,
                h: h,
            })
        }
        console.log(objetosArray)
        
    }
    if (a === 0) {
        
        VerificaDiv(layer, direction, id)
    }
}

function VerificaDiv(layer, direction, id) {
    let dividir = 0 
    let divisoes = 0
    for (let i = 0; i < objetosArray[layer][id].length; i++) {
        if (direction === 0) {
            if (objetosArray[layer][id][i].h > 150 * 2) {
                dividir = Math.floor(Math.random() * 2)   
                
            }
        }else{
            if (objetosArray[layer][id][i].w > 150 * 2) {
                dividir = Math.floor(Math.random() * 2)  
                
            }
        }
        if (dividir === 1) {
            console.log("dividir")
            EscolheLayout(layer + 1, objetosArray[layer][id][i].x, objetosArray[layer][id][i].y, 0, 0, objetosArray[layer][id][i].w, objetosArray[layer][id][i].h, direction === 0 ? 1 : 0, i)
            divisoes++
        }
    }
    if (divisoes === 0) {
        geraCor()
    }
}

direction = Math.floor(Math.random() * 2)
// layer, x, y, w, h, W, H, direction, id
EscolheLayout(0, 0, 0, 0, 0, 1920, 960, 0, 0)

function geraCor() {
    console.log(objetosArray[0][0].length)
    
    for (const camada of objetosArray) {
        console.log(camada)
        for (const ids of camada) {
            console.log(ids)
            if (ids) {
                for (const obj of ids) {
                    console.log(obj)
                    criarElem(obj.x, obj.y, obj.w, obj.h, `hsl(${Math.random() * 360}, 100%, 50%)`)
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