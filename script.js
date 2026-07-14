const canvas = document.getElementById("canva");
const ctx = canvas.getContext("2d");
let objetosArray = [];
let objetosArrayExecutado = [];
let razãoX = 1;
let razãoY = 1;

let direction = 0;
let quant = 0;
let nDiv = 0;
let w = 0;
let h = 0;
let x = 0;
let y = 0;
let porcentagem = 0;
let a = 0;
let tipoRet = 0;
let aleatorio = 0;
function resizeCanvas() {
  const scale = window.devicePixelRatio;

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  canvas.width = width * scale;
  canvas.height = height * scale;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  for (let i = 0; i < objetosArray.length; i++) {
    criarElem(
      objetosArray[i].x,
      objetosArray[i].y,
      objetosArray[i].w,
      objetosArray[i].h,
      objetosArray[i].cor,
      1,
    );
  }
  razãoX = canvas.width / 1920;
  razãoY = canvas.height / 960;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
/* A layer serve para organizar os elementos em camadas diferentes, assim os elementos da layer 1 foram criador a partir dos 
elementos da layer 0 */
function EscolheLayout(layer, x, y, w, h, W, H, count, direction) {
  if (!objetosArray[layer]) {
    objetosArray[layer] = [];
  }
  // direction = row
  if (direction === 0) {
    nDiv = W / 192;
    if (nDiv > 3) {
      nDiv = 3;
    }
    quant = Math.floor(Math.random() * (nDiv - 1)) + 1;
    nDiv = 1;

    for (let i = 0; i <= quant; i++) {
      x = x + w;
      // w min 192
      if (quant === i) {
        w = W;
      } else {
        // tem a chance de gerar
        w = Math.floor(Math.random() * (W - 192 * (quant - i + 1))) + 192;
        W -= w;
        nDiv--;
      }
      console.log(x, y, w, h)
      objetosArray[layer].push({
        x: x,
        y: y,
        w: w,
        h: H,
        count: count + 1,
      });
    }
  }
  //direction = column
  else {
    nDiv = H / 192;
    if (nDiv > 3) {
      nDiv = 3;
    }
    quant = Math.floor(Math.random() * (nDiv - 1)) + 1;
    nDiv = 1;

    for (let i = 0; i <= quant; i++) {
      y = y + h;
      // w min 192
      if (quant === i) {
        h = H;
      } else {
        h = Math.floor(Math.random() * (H - 192 * (quant - i + 1))) + 192;
        H -= h;
      }

      objetosArray[layer].push({
        x: x,
        y: y,
        w: W,
        h: h,
        count: count + 1,
      });
    }
  }

  VerificaDiv(layer, direction);
}

let ultimaVolta = 0;
function VerificaDiv(layer, direction) {
  let divisoes = 0;
  for (let i = 0; i < objetosArray[layer].length; i++) {
    if (objetosArray[layer][i] === 0) {
    } else {
      let dividir = 0;
      if (direction === 0) {
        if (objetosArray[layer][i].h > 192 * 2) {
          porcentagem = objetosArray[layer][i].h / 192;
          dividir = 
          Math.floor(Math.random() * porcentagem) + (porcentagem < 0 ? 0 : 2);
        }
      } else {
        if (objetosArray[layer][i].w > 192 * 2) {
          porcentagem = objetosArray[layer][i].w / 192;
          dividir =
            Math.floor(Math.random() * porcentagem) + (porcentagem < 0 ? 0 : 2);
        }
      }

      if (dividir > 0) {
        if (objetosArray[layer][i].count < 3) {
          aleatorio = Math.floor(Math.random() * 2);
        } else {
          aleatorio = 1;
        }
        if (aleatorio === 0) {
          objetosArrayExecutado.push(objetosArray[layer][i]);
          objetosArray[layer].splice(i, 1);
          objetosArray[layer].unshift(0);
          let ultimoObjetoExecutado = objetosArrayExecutado.length - 1
          EscolheLayout(
            layer + 1,
            objetosArrayExecutado[ultimoObjetoExecutado].x,
            objetosArrayExecutado[ultimoObjetoExecutado].y,
            0,
            0,
            objetosArrayExecutado[ultimoObjetoExecutado].w,
            objetosArrayExecutado[ultimoObjetoExecutado].h,
            objetosArrayExecutado[ultimoObjetoExecutado].count,
            direction === 0 ? 1 : 0,
          );
        } else {
          objetosArrayExecutado.push(objetosArray[layer][i]);
          objetosArray[layer].splice(i, 1);
          objetosArray[layer].unshift(0);
          let ultimoObjetoExecutado = objetosArrayExecutado.length - 1
          AddRet(
            layer + 1,
            objetosArrayExecutado[ultimoObjetoExecutado].x,
            objetosArrayExecutado[ultimoObjetoExecutado].y,
            0,
            0,
            objetosArrayExecutado[ultimoObjetoExecutado].w,
            objetosArrayExecutado[ultimoObjetoExecutado].h,
            objetosArrayExecutado[ultimoObjetoExecutado].count,
          );
        }
        // se for o primeiro elemento da função, é impossivel a layerAtual ser diferente de layer
        // se o id for maior que 0, a layerAtual pode ser diferente de layer
        // se id for 0, e não tiver mais IDs ele pode ser diferente de layer
        //
        divisoes++;
      }else{
        objetosArrayExecutado.push(objetosArray[layer][i]);
        objetosArray[layer].splice(i, 1);
        objetosArray[layer].unshift(0);
      }
      if (layer === 0 && i === objetosArray[layer].length - 1) {
        ultimaVolta++;
      }
    }
  }

  if (ultimaVolta > 0) {
    geraCor();
    console.log(objetosArrayExecutado);
    console.log(objetosArray);
  }
}

function AddRet(layer, x, y, w, h, W, H, count) {
  if (!objetosArray[layer]) {
    objetosArray[layer] = [];
  }

  tipoRet = 0;
  direction = Math.floor(Math.random() * 2);
  // if (w > 192 * 2 + 50 && h > 192 * 2 + 50) {
  //     tipoRet = Math.floor(Math.random() * 2)
  // }
  switch (tipoRet) {
    case 0:
      // // // AddRet(layer, id, i)
      w = Math.floor(Math.random() * (W * (9 / 10) - W / 2)) + W / 2;
      h = Math.floor(Math.random() * (H * (9 / 10) - H / 2)) + H / 2;
      x = Math.floor(Math.random() * (W - w)) + x;
      y = Math.floor(Math.random() * (H - h)) + y;
      console.log(x, y, w, h)
      objetosArray[layer].push({
        x: x,
        y: y,
        w: w,
        h: h,
        count: 0,
        });

      VerificaDiv(layer, direction);
      break;

    case 1:
      break;
  }
}

direction = Math.floor(Math.random() * 2);
// layer, x, y, w, h, W, H, direction, id

function geraCor() {
  for (let i = 0; i < objetosArrayExecutado.length; i++) {
    criarElem(
      objetosArrayExecutado[i].x,
      objetosArrayExecutado[i].y,
      objetosArrayExecutado[i].w,
      objetosArrayExecutado[i].h,
      `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
    );
  }
}
function criarElem(x, y, w, h, cor) {
  x = Math.floor(x * razãoX);
  w = Math.floor(w * razãoX);
  y = Math.floor(y * razãoY);
  h = Math.floor(h * razãoY);

  ctx.beginPath();
  ctx.fillStyle = cor;
  ctx.fillRect(x, y, w, h);
}

EscolheLayout(0, 0, 0, 0, 0, 1920, 960, 0, direction, 0);
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
