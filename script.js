const canvas = document.getElementById("canva");
const ctx = canvas.getContext("2d");
let objetosArray = [];
let objetosArrayE = [];
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
  for (let i = 0; i < objetosArrayE.length; i++) {
    criarElem(
      objetosArray[i].x,
      objetosArray[i].y,
      objetosArray[i].w,
      objetosArray[i].h,
      objetosArray[i].cor,
    );
  }
  razãoX = canvas.width / 1000;
  razãoY = canvas.height / 960;
}

window.addEventListener("resize", resizeCanvas());
resizeCanvas();
/* A layer serve para organizar os elementos em camadas diferentes, assim os elementos da layer 1 foram criador a partir dos 
elementos da layer 0 */
function EscolheLayout(layer, x, y, w, h, W, H, count, direction) {
  if (!objetosArray[layer]) {
    objetosArray[layer] = [];
  }
  // direction = row
  if (direction === 0) {
    nDiv = W / 100;
    if (nDiv > 3) {
      nDiv = 3;
    }
    quant = Math.floor(Math.random() * (nDiv - 1)) + 1;
    nDiv = 1;

    for (let i = 0; i <= quant; i++) {
      x = x + w;
      // w min 100
      if (quant === i) {
        w = W;
      } else {
        // tem a chance de gerar
        w = Math.floor(Math.random() * (W - 100 * (quant - i + 1))) + 100;
        W -= w;
        nDiv--;
      }
      objetosArray[layer].push({
        x: x,
        y: y,
        w: w,
        h: H,
        count: count + 1,
        color: {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256),
        },
      });
    }
  }
  //direction = column
  else {
    nDiv = H / 100;
    if (nDiv > 3) {
      nDiv = 3;
    }
    quant = Math.floor(Math.random() * (nDiv - 1)) + 1;
    nDiv = 1;

    for (let i = 0; i <= quant; i++) {
      y = y + h;
      // w min 100
      if (quant === i) {
        h = H;
      } else {
        h = Math.floor(Math.random() * (H - 100 * (quant - i + 1))) + 100;
        H -= h;
      }

      objetosArray[layer].push({
        x: x,
        y: y,
        w: W,
        h: h,
        count: count + 1,
        color: {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256),
        },
      });
    }
  }

  VerificaDiv(layer, direction);
}

let ultimaVolta = 0;
function VerificaDiv(layer, direction) {
  for (let i = 0; i < objetosArray[layer].length; i++) {
    let dividir = 0;
    if (direction === 0) {
      if (objetosArray[layer][i].h > 100 * 2) {
        porcentagem = objetosArray[layer][i].h / 100;
        dividir =
          Math.floor(Math.random() * porcentagem) + (porcentagem < 2 ? 0 : 2);
      }
    } else if (direction === 1) {
      if (objetosArray[layer][i].w > 100 * 2) {
        porcentagem = objetosArray[layer][i].w / 100;
        dividir =
          Math.floor(Math.random() * porcentagem) + (porcentagem < 2 ? 0 : 2);
      }
    } else {
      let maiorLado = Math.max(
        objetosArray[layer][i].w,
        objetosArray[layer][i].h,
      );
      if (maiorLado > 100 * 2) {
        porcentagem = maiorLado / 100;
        dividir =
          Math.floor(Math.random() * porcentagem) + (porcentagem < 2 ? 0 : 2);
      }
    }
    // verifica se vai cortar ou adicionar objeto

    if (dividir > 0) {
      if (objetosArray[layer][i].count < 3) {
        porcentagem = (objetosArray[layer][i].count * 2.5) / 10 + 1 / 10;
        cortar = Math.random() > porcentagem;
      } else {
        cortar = false;
      }
      if (cortar) {
        objetosArrayE.push(objetosArray[layer][i]);
        objetosArray[layer].splice(i, 1);
        objetosArray[layer].unshift(0);
        let ultimoObjetoExecutado = objetosArrayE.length - 1;
        EscolheLayout(
          layer + 1,
          objetosArrayE[ultimoObjetoExecutado].x,
          objetosArrayE[ultimoObjetoExecutado].y,
          0,
          0,
          objetosArrayE[ultimoObjetoExecutado].w,
          objetosArrayE[ultimoObjetoExecutado].h,
          objetosArrayE[ultimoObjetoExecutado].count,
          direction === 0 ? 1 : 0,
        );
      } else {
        objetosArrayE.push(objetosArray[layer][i]);
        objetosArray[layer].splice(i, 1);
        objetosArray[layer].unshift(0);
        let ultimoObjetoExecutado = objetosArrayE.length - 1;

        AddRet(
          layer + 1,
          objetosArrayE[ultimoObjetoExecutado].x,
          objetosArrayE[ultimoObjetoExecutado].y,
          0,
          0,
          objetosArrayE[ultimoObjetoExecutado].w,
          objetosArrayE[ultimoObjetoExecutado].h,
          ultimoObjetoExecutado,
          Math.floor(Math.random() * 3),
          1,
        );
      }
    } else {
      let confirmW = objetosArray[layer][i].w > 100;
      let confirmH = objetosArray[layer][i].h > 100;
      if (confirmW || confirmH) {
        objetosArrayE.push(objetosArray[layer][i]);
        objetosArray[layer].splice(i, 1);
        objetosArray[layer].unshift(0);

        let ultimoObjetoExecutado = objetosArrayE.length - 1;
        AddRet(
          layer + 1,
          objetosArrayE[ultimoObjetoExecutado].x,
          objetosArrayE[ultimoObjetoExecutado].y,
          0,
          0,
          objetosArrayE[ultimoObjetoExecutado].w,
          objetosArrayE[ultimoObjetoExecutado].h,
          ultimoObjetoExecutado,
          Math.floor(Math.random() * 3),
          0,
        );
      }
    }
    if (layer === 0 && i === objetosArray[layer].length - 1) {
      ultimaVolta++;
    }
  }

  if (ultimaVolta > 0) {
    geraCor();
    console.log(objetosArrayE);
    console.log(objetosArray);
  }
}

function AddRet(layer, x, y, w, h, W, H, posicaoPai, tipoRet, verificar) {
  if (!objetosArray[layer]) {
    objetosArray[layer] = [];
  }
  if ((W >= 190 && H >= 50) || (W >= 100 && H >= 90)) {
  } else {
    tipoRet = Math.floor(Math.random() * 2);
  }

  direction = null;
  const ratio = W / H;
  const parentX = x;
  const parentY = y;
  if (objetosArrayE[posicaoPai].color) {
    corPai = objetosArrayE[posicaoPai].color;
  } else {
    corPai = { r: 0, g: 0, b: 0 };
  }

  switch (tipoRet) {
    // retangulo comum
    case 0:
      w = randomInt(W * 0.7, W * 0.8);
      h = randomInt(H * 0.7, H * 0.8);
      x = randomInt(5, W - w - 5) + parentX;
      y = randomInt(5, H - h - 5) + parentY;
      if (verificar === 1) {
        objetosArray[layer].push({
          x: x,
          y: y,
          w: w,
          h: h,
          count: 0,
          color: {
            r: Math.abs(Math.floor(Math.random() * 256) - corPai.r),
            g: Math.abs(Math.floor(Math.random() * 256) - corPai.g),
            b: Math.abs(Math.floor(Math.random() * 256) - corPai.b),
          },
        });

        VerificaDiv(layer, direction);
      } else {
        objetosArrayE.push({
          x: x,
          y: y,
          w: w,
          h: h,
          count: 0,
          color: {
            r: Math.abs(Math.floor(Math.random() * 256) - corPai.r),
            g: Math.abs(Math.floor(Math.random() * 256) - corPai.g),
            b: Math.abs(Math.floor(Math.random() * 256) - corPai.b),
          },
        });
      }
      break;
    // quadrado centralizado
    case 1:
      w = randomInt(W * 0.7, W * 0.8);
      h = randomInt(H * 0.7, H * 0.8);

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

      if (verificar === 1) {
        objetosArray[layer].push({
          x: x,
          y: y,
          w: w,
          h: h,
          count: 0,
          color: {
            r: Math.abs(Math.floor(Math.random() * 256) - corPai.r),
            g: Math.abs(Math.floor(Math.random() * 256) - corPai.g),
            b: Math.abs(Math.floor(Math.random() * 256) - corPai.b),
          },
        });

        VerificaDiv(layer, direction);
      } else {
        objetosArrayE.push({
          x: x,
          y: y,
          w: w,
          h: h,
          count: 0,
          color: {
            r: Math.abs(Math.floor(Math.random() * 256) - corPai.r),
            g: Math.abs(Math.floor(Math.random() * 256) - corPai.g),
            b: Math.abs(Math.floor(Math.random() * 256) - corPai.b),
          },
        });
      }
      break;

    //quadrados em sequencia
    case 2:
      // if (W > H) {
      //   //terminar isso
      //   const areaPai = (W - 10);
      //   const maxRetangles

      // }
      const totalRectangles = randomInt(2, 6);
      const horizontalLayout = Math.random() < 0.5;

      // Each child has its own width and height, derived directly from
      // the parent's width (W) and height (H), never from an average.
      const preferredGap = 10;
      const minChildWidth = W * 0.25;
      const maxChildWidth = W * 0.8;
      const minChildHeight = H * 0.25;
      const maxChildHeight = H * 0.8;

      // Calculates the free size for one child in a given grid. The gap is
      // reduced for small parents so the grid always remains inside it.
      function getGridCapacity(columns, rows) {
        return {
          maxWidth: (W - (columns + 1) * preferredGap) / columns,
          maxHeight: (H - (rows + 1) * preferredGap) / rows,
        };
      }

      let columns;
      let rows;
      let gridCapacity;

      // Find the layout with the most items in the primary direction
      // while keeping the desired minimum width and height for each child.
      if (horizontalLayout) {
        for (
          let possibleColumns = totalRectangles;
          possibleColumns >= 1;
          possibleColumns--
        ) {
          const possibleRows = Math.ceil(totalRectangles / possibleColumns);
          const capacity = getGridCapacity(possibleColumns, possibleRows);

          if (
            capacity.maxWidth >= minChildWidth &&
            capacity.maxHeight >= minChildHeight
          ) {
            columns = possibleColumns;
            rows = possibleRows;
            gridCapacity = capacity;
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
          const capacity = getGridCapacity(possibleColumns, possibleRows);

          if (
            capacity.maxWidth >= minChildWidth &&
            capacity.maxHeight >= minChildHeight
          ) {
            columns = possibleColumns;
            rows = possibleRows;
            gridCapacity = capacity;
            break;
          }
        }
      }

      // Fallback for constrained parents: choose the grid with the largest
      // available area for one child, even if it is below the preferred size.
      if (!gridCapacity) {
        let largestAvailableArea = -1;

        for (
          let possibleColumns = 1;
          possibleColumns <= totalRectangles;
          possibleColumns++
        ) {
          const possibleRows = Math.ceil(totalRectangles / possibleColumns);
          const capacity = getGridCapacity(possibleColumns, possibleRows);
          const availableArea = capacity.maxWidth * capacity.maxHeight;

          if (availableArea > largestAvailableArea) {
            columns = possibleColumns;
            rows = possibleRows;
            gridCapacity = capacity;
            largestAvailableArea = availableArea;
          }
        }
      }
      // Choose dimensions independently, limited by both the desired size
      // and the maximum space that this grid provides.
      const heightLimit = Math.min(maxChildHeight, gridCapacity.maxHeight);
      const widthLimit = Math.min(maxChildWidth, gridCapacity.maxWidth);
      const widthStart = Math.min(minChildWidth, widthLimit);
      const heightStart = Math.min(minChildHeight, heightLimit);

      w = widthStart + Math.random() * (widthLimit - widthStart);
      h = heightStart + Math.random() * (heightLimit - heightStart);

      const finalGapX = (W - w * columns) / (columns + 1);
      const finalGapY = (H - h * rows) / (rows + 1);

      // Center the complete grid inside the parent.
      const usedWidth = columns * w + (columns + 1) * finalGapX;
      const usedHeight = rows * h + (rows + 1) * finalGapY;

      const startX = parentX + (W - usedWidth) / 2 + finalGapX;
      const startY = parentY + (H - usedHeight) / 2 + finalGapY;
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

        x = startX + column * (w + finalGapX);
        y = startY + row * (h + finalGapY);

        if (verificar === 1) {
          objetosArray[layer].push({
            x: x,
            y: y,
            w: w,
            h: h,
            count: 0,
            color: {
              r: Math.abs(Math.floor(Math.random() * 256) - corPai.r),
              g: Math.abs(Math.floor(Math.random() * 256) - corPai.g),
              b: Math.abs(Math.floor(Math.random() * 256) - corPai.b),
            },
          });

          VerificaDiv(layer, direction);
        } else {
          objetosArrayE.push({
            x: x,
            y: y,
            w: w,
            h: h,
            count: 0,
            color: {
              r: Math.abs(Math.floor(Math.random() * 256) - corPai.r),
              g: Math.abs(Math.floor(Math.random() * 256) - corPai.g),
              b: Math.abs(Math.floor(Math.random() * 256) - corPai.b),
            },
          });
        }
      }
      break;
    // dois quadrados em lados opostos
    case 3:
      minSide = Math.max(1, Math.floor(Math.min(W, H) * 0.4));
      maxSide = Math.max(minSide, Math.floor(Math.min(W, H) * 0.47));

      for (let i = 0; i < 2; i++) {
        w = randomInt(minSide, maxSide);
        h = w;

        const isLeftSquare = i === 0;
        const alignTop = Math.random() < 0.5;

        x = isLeftSquare ? parentX : parentX + W - (w + 5);

        y = alignTop ? parentY : parentY + H - (h + 5);

        objetosArray[layer].push({
          x: x,
          y: y,
          w: w,
          h: h,
          count: 0,
          color: {
            r: Math.abs(Math.floor(Math.random() * 256) - corPai.r),
            g: Math.abs(Math.floor(Math.random() * 256) - corPai.g),
            b: Math.abs(Math.floor(Math.random() * 256) - corPai.b),
          },
        });
      }

      if (verificar === 1) {
        VerificaDiv(layer, direction);
      }
      break;
  }
}

function geraCor() {
  for (let i = 0; i < objetosArrayE.length; i++) {
    if (objetosArrayE[i].color) {
      criarElem(
        objetosArrayE[i].x,
        objetosArrayE[i].y,
        objetosArrayE[i].w,
        objetosArrayE[i].h,
        rgb(`${objetosArrayE[i].color.r}, ${objetosArrayE[i].color.g}, ${objetosArrayE[i].color.b}`),
      );
    }
  }
}

function criarElem(x, y, w, h, cor) {
  x = Math.floor(x * razãoX);
  w = Math.floor(w * razãoX);
  y = Math.floor(y * razãoX);
  h = Math.floor(h * razãoX);

  ctx.beginPath();
  ctx.fillStyle = cor;
  ctx.fillRect(x, y, w, h);
}

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

direction = Math.floor(Math.random() * 2);
criarElem(0, 0, 800, 800, "pink");
criarElem(0, 900, 150, 100, "white");
EscolheLayout(0, 0, 0, 0, 0, 800, 800, 0, direction, 0);

// coisas para fazer:
// 1. adicionar elementos no final dos cortes
// 2. acrescentar niveis de dificuldade