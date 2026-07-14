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
      console.log(x, y, w, h);
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
          let ultimoObjetoExecutado = objetosArrayExecutado.length - 1;
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
          let ultimoObjetoExecutado = objetosArrayExecutado.length - 1;
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
      } else {
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
      w =
        Math.floor(Math.random() * (W * (9 / 10) - (W * 4) / 5)) + (W * 4) / 5;
      h =
        Math.floor(Math.random() * (H * (9 / 10) - (H * 4) / 5)) + (H * 4) / 5;
      x = Math.floor(Math.random() * (W - w - 5)) + x + 5;
      y = Math.floor(Math.random() * (H - h - 5)) + y + 5;
      console.log(x, y, w, h);
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
      const parentX = x;
      const parentY = y;

      // Use a square between 25% and 40% of the parent's smallest dimension.
      const minSide = Math.max(1, Math.floor(Math.min(W, H) * 0.3));
      const maxSide = Math.max(minSide, Math.floor(Math.min(W, H) * 0.45));

      for (let i = 0; i < 2; i++) {
        w = randomInt(minSide, maxSide);
        h = w;

        const isLeftSquare = i === 0;
        const alignTop = Math.random() < 0.5;

        // First square stays left; second square stays right.
        x = isLeftSquare ? parentX : parentX + W - w + 5;

        // Each square independently chooses top or bottom.
        y = alignTop ? parentY : parentY + H - h + 5;

        objetosArray[layer].push({
          x: x,
          y: y,
          w: w,
          h: h,
          count: 0,
        });
      }

      VerificaDiv(layer, direction);
      break;
    case 2:
      const parentX = x;
      const parentY = y;

      const minSide = Math.max(1, Math.floor(Math.min(W, H) * 0.25));
      const maxSide = Math.max(minSide, Math.floor(Math.min(W, H) * 0.45));

      w = randomInt(minSide, maxSide);
      h = w;

      const horizontalCenterMode = Math.random() < 0.5;

      if (horizontalCenterMode) {
        // Horizontal center; random top, center, or bottom.
        x = parentX + Math.floor((W - w) / 2);

        const verticalPositions = [
          parentY,
          parentY + Math.floor((H - h) / 2),
          parentY + H - h,
        ];

        y = verticalPositions[randomInt(0, 2)];
      } else {
        // Vertical center; random left, center, or right.
        y = parentY + Math.floor((H - h) / 2);

        const horizontalPositions = [
          parentX,
          parentX + Math.floor((W - w) / 2),
          parentX + W - w,
        ];

        x = horizontalPositions[randomInt(0, 2)];
      }

      objetosArray[layer].push({
        x: x,
        y: y,
        w: w,
        h: h,
        count: 0,
      });

      VerificaDiv(layer, direction);
      break;
    case 2:
      const parentX = x;
      const parentY = y;

      const totalRectangles = randomInt(3, 6);
      const horizontalLayout = Math.random() < 0.5;

      // Parent and child average sizes:
      // parentAverage = (W + H) / 2
      // childAverage normally stays between 20% and 40% of it.
      const parentAverage = (W + H) / 2;
      const minChildAverage = parentAverage * 0.2;
      const maxChildAverage = parentAverage * 0.4;

      // Same gap between all neighboring rectangles.
      const gap = Math.max(1, Math.floor(Math.min(W, H) * 0.05));

      // Keep each child rectangle proportional to the parent.
      const ratio = W / H;

      // Returns the largest possible child average size for a grid.
      function getMaximumChildAverage(columns, rows) {
        const maxChildWidth = (W - (columns - 1) * gap) / columns;
        const maxChildHeight = (H - (rows - 1) * gap) / rows;

        // Convert maximum width/height back into maximum average size
        // while preserving the W:H aspect ratio.
        const maxAverageFromWidth = (maxChildWidth * (ratio + 1)) / (2 * ratio);
        const maxAverageFromHeight = (maxChildHeight * (ratio + 1)) / 2;

        return Math.min(maxAverageFromWidth, maxAverageFromHeight);
      }

      let columns;
      let rows;
      let maximumPossibleAverage;

      // Find the layout with the most items in the primary direction
      // while keeping child size normally at least 20% of parent average.
      if (horizontalLayout) {
        for (
          let possibleColumns = totalRectangles;
          possibleColumns >= 1;
          possibleColumns--
        ) {
          const possibleRows = Math.ceil(totalRectangles / possibleColumns);
          const maxAverage = getMaximumChildAverage(
            possibleColumns,
            possibleRows,
          );

          if (maxAverage >= minChildAverage) {
            columns = possibleColumns;
            rows = possibleRows;
            maximumPossibleAverage = maxAverage;
            break;
          }
        }
      } else {
        for (
          let possibleRows = totalRectangles;
          possibleRows >= 1;
          possibleRows--
        ) {
          const possibleColumns = Math.ceil(totalRectangles / possibleRows);
          const maxAverage = getMaximumChildAverage(
            possibleColumns,
            possibleRows,
          );

          if (maxAverage >= minChildAverage) {
            columns = possibleColumns;
            rows = possibleRows;
            maximumPossibleAverage = maxAverage;
            break;
          }
        }
      }

      // Fallback for very small parents: choose the grid that permits
      // the largest possible children, even if they must be below 20%.
      if (maximumPossibleAverage === undefined) {
        maximumPossibleAverage = 0;

        for (
          let possibleColumns = 1;
          possibleColumns <= totalRectangles;
          possibleColumns++
        ) {
          const possibleRows = Math.ceil(totalRectangles / possibleColumns);
          const maxAverage = getMaximumChildAverage(
            possibleColumns,
            possibleRows,
          );

          if (maxAverage > maximumPossibleAverage) {
            columns = possibleColumns;
            rows = possibleRows;
            maximumPossibleAverage = maxAverage;
          }
        }
      }

      // Select the child size.
      let childAverage;

      if (maximumPossibleAverage >= minChildAverage) {
        const upperLimit = Math.min(maxChildAverage, maximumPossibleAverage);

        childAverage =
          minChildAverage + Math.random() * (upperLimit - minChildAverage);
      } else {
        // Leave a little spare room for very constrained parents.
        childAverage = maximumPossibleAverage * 0.9;
      }

      // Convert the chosen average back to proportional width and height.
      w = (2 * childAverage * ratio) / (ratio + 1);
      h = (2 * childAverage) / (ratio + 1);

      // Center the complete grid inside the parent.
      const usedWidth = columns * w + (columns - 1) * gap;
      const usedHeight = rows * h + (rows - 1) * gap;

      const startX = parentX + (W - usedWidth) / 2;
      const startY = parentY + (H - usedHeight) / 2;

      for (let i = 0; i < totalRectangles; i++) {
        let row;
        let column;

        if (horizontalLayout) {
          // Fill left-to-right, then wrap to the next row.
          row = Math.floor(i / columns);
          column = i % columns;
        } else {
          // Fill top-to-bottom, then wrap to the next column.
          column = Math.floor(i / rows);
          row = i % rows;
        }

        x = startX + column * (w + gap);
        y = startY + row * (h + gap);

        objetosArray[layer].push({
          x: x,
          y: y,
          w: w,
          h: h,
          count: 0,
        });
      }

      VerificaDiv(layer, direction);
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

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
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

// alterar o colums - 1 para colums + 1
