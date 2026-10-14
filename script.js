const canvas = document.getElementById("canva");
const ctx = canvas.getContext("2d");
const LARGURA_BASE = 1000;
const ALTURA_BASE = 960;
let objetosArray = [];
let objetosArrayE = [];
let objetosArrayFinal = [];
let coresPai = [];
let corFundo = null;
let direction = 0;
let margemMin = 15;
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
  const larguraVisual = canvas.clientWidth;
  const alturaVisual = canvas.clientHeight;
  const densidade = window.devicePixelRatio || 1;

  // O bitmap interno acompanha a densidade da tela, mas os objetos continuam
  // usando o sistema de coordenadas fixo da imagem gerada (1000 x 960).
  canvas.width = Math.round(larguraVisual * densidade);
  canvas.height = Math.round(alturaVisual * densidade);
  ctx.setTransform(
    canvas.width / LARGURA_BASE,
    0,
    0,
    canvas.height / ALTURA_BASE,
    0,
    0,
  );

  if (corFundo) {
    criarElem(0, 0, null, 800, 800, false, corFundo);
  }

  for (const objeto of objetosArrayFinal  ) {
    const cor = `rgb(${objeto.color.r}, ${objeto.color.g}, ${objeto.color.b})`;
    criarElem(
      objeto.x,
      objeto.y,
      objeto.diameter ?? null,
      objeto.w ?? null,
      objeto.h ?? null,
      Boolean(objeto.circle),
      cor,
    );
  }
}

window.addEventListener("resize", resizeCanvas);
window.visualViewport?.addEventListener("resize", resizeCanvas);
resizeCanvas();
/* A layer serve para organizar os elementos em camadas diferentes, assim os elementos da layer 1 foram criador a partir dos 
elementos da layer 0 */
function EscolheLayout(layer, x, y, w, h, W, H, count, direction, layerCor) {
  if (!objetosArray[layer]) {
    objetosArray[layer] = [];
  }
  // direction = row
  if (direction === 0) {
    nDiv = Math.floor(W / 100);
    if (nDiv > 3) {
      nDiv = 3;
    }
    quant = nDiv > 1 ? Math.ceil(Math.random() * (nDiv - 1)) : 0;
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
        cortado: true,
      });
    }
  }
  //direction = column
  else {
    nDiv = Math.floor(H / 100);
    if (nDiv > 3) {
      nDiv = 3;
    }
    quant = nDiv > 1 ? Math.floor(Math.random() * (nDiv - 1)) + 1 : 0;
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
        cortado: true,
      });
    }
  }

  VerificaDiv(layer, direction, layerCor);
}

let ultimaVolta = 0;
function VerificaDiv(layer, direction, layerCor) {
  for (let i = 0; i < objetosArray[layer].length; i++) {
    let dividir = 0;
    if (direction === 0) {
      if (objetosArray[layer][i].h > 100 * 2 && objetosArray[layer][i].w > 100) {
        porcentagem = objetosArray[layer][i].h / 100;
        dividir =
          Math.floor(Math.random() * porcentagem) + (porcentagem < 3 ? 0 : 2);
      }
    } else if (direction === 1) {
      if (objetosArray[layer][i].w > 100 * 2 && objetosArray[layer][i].h > 100) {
        porcentagem = objetosArray[layer][i].w / 100;
        dividir =
          Math.floor(Math.random() * porcentagem) + (porcentagem < 3 ? 0 : 2);
      }
    } else {
      let maiorLado = Math.max(
        objetosArray[layer][i].w,
        objetosArray[layer][i].h,
      );
      let menorLado = Math.min(
        objetosArray[layer][i].w,
        objetosArray[layer][i].h,
      );
      if (maiorLado > 100 * 2 && menorLado > 100) {
        porcentagem = maiorLado / 100;
        dividir =
          Math.floor(Math.random() * porcentagem) + (porcentagem < 3 ? 0 : 2);
      }
    }
    // verifica se vai cortar ou adicionar objeto
    if (objetosArray[layer][i].color) {
      layerCor++;
      if (!coresPai[layerCor]) {
        coresPai[layerCor] = [];
      }
      coresPai[layerCor].push(objetosArray[layer][i].color);
    }
    if (dividir > 0) {
      let cortar;
      if (objetosArray[layer][i].count < 3) {
        porcentagem = (objetosArray[layer][i].count * 2.5) / 10 + 1 / 10;
        cortar = Math.random() > porcentagem;
      } else {
        cortar = false;
      }
      objetosArrayE.push(objetosArray[layer][i]);
      objetosArray[layer].splice(i, 1);
      objetosArray[layer].unshift(0);
      let ultimoObjetoExecutado = objetosArrayE.length - 1;
      if (cortar) {
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
          layerCor,
        );
      } else {
        AddRet(
          layer + 1,
          ( objetosArrayE[ultimoObjetoExecutado].x + margemMin ),
          ( objetosArrayE[ultimoObjetoExecutado].y + margemMin ),
          0,
          0,
          ( objetosArrayE[ultimoObjetoExecutado].w - margemMin * 2 ),
          ( objetosArrayE[ultimoObjetoExecutado].h - margemMin * 2 ),
          Math.floor(Math.random() * 3),
          1,
          layerCor,
        );
      }
    } else {
      let confirmW =
       ( objetosArray[layer][i].w > 100 && objetosArray[layer][i].h > 80 );
      let confirmH =
       ( objetosArray[layer][i].h > 100 && objetosArray[layer][i].w > 80 );
      if (objetosArray[layer][i]) {
        objetosArrayE.push(objetosArray[layer][i]);
        objetosArray[layer].splice(i, 1);
        objetosArray[layer].unshift(0);
      }

      let ultimoObjetoExecutado = objetosArrayE.length - 1;

      if (confirmW || confirmH) {
        AddRet(
          layer + 1,
          ( objetosArrayE[ultimoObjetoExecutado].x + margemMin ),
          ( objetosArrayE[ultimoObjetoExecutado].y + margemMin ),
          0,
          0,
          ( objetosArrayE[ultimoObjetoExecutado].w - margemMin * 2 ),
          ( objetosArrayE[ultimoObjetoExecutado].h - margemMin * 2 ),
          Math.floor(Math.random() * 3),
          0,
          layerCor,
        );
      }
    }
    if (layer === 0 && i === objetosArray[layer].length - 1) {
      ultimaVolta++;
    }
  }

  if (layer === 0 && ultimaVolta > 0) {
    // A inserção de objetos acontece em chamadas recursivas. Portanto, o filho
    // de um pai não é necessariamente o próximo item de objetosArrayE.
    // Usamos uma cópia para que cada pai seja conferido contra os objetos que
    // já existiam antes desta correção, sem uma adição influenciar outra.
    const objetosParaConferir = objetosArrayE.slice();
    for (let i = 0; i < objetosParaConferir.length; i++) {
      const pai = objetosParaConferir[i];
      if (pai.cortado) {
        const confirmFilho = objetosParaConferir.some((filho, indiceFilho) => {
          if (indiceFilho === i) {
            return false;
          }

          const larguraFilho = filho.diameter ?? filho.w;
          const alturaFilho = filho.diameter ?? filho.h;

          return (
            pai.x <= filho.x &&
            pai.x + pai.w >= filho.x + larguraFilho &&
            pai.y <= filho.y &&
            pai.y + pai.h >= filho.y + alturaFilho
          );
        });

        if (!confirmFilho) {
          AddRet(
            layer + 1,
            ( pai.x + margemMin ),
            ( pai.y + margemMin ),
            0,
            0,
            ( pai.w - margemMin * 2 ),
            ( pai.h - margemMin * 2 ),
            Math.floor(Math.random() * 3),
            0,
            layerCor,
          );
        }
      }
    }
    geraCor();
  }
}

function AddRet(layer, x, y, w, h, W, H, tipoRet, verificar, layerCor) {
  if (!objetosArray[layer]) {
    objetosArray[layer] = [];
  }
  if ((W >= 190 && H >= 50) || (W >= 60 && H >= 190)) {
  } else {
    tipoRet = Math.floor(Math.random() * 2);
  }
  if (verificar === 0) {
    tipoRet = (Math.floor(Math.random() * 3) + 3) % 4;
  }

  direction = null;
  const parentX = x;
  const parentY = y;

  // seleciona a cor do pai para gerar a cor do filho
  const corPai = coresPai[layerCor][coresPai[layerCor].length - 1];
  // define a cor do filho aleatoriamente com base na cor do pai
  let color = {
    r: Math.abs(Math.floor(Math.random() * 55) + corPai.r + 100) % 255,
    g: Math.abs(Math.floor(Math.random() * 55) + corPai.g + 100) % 255,
    b: Math.abs(Math.floor(Math.random() * 55) + corPai.b + 100) % 255,
  };
  if (
    color.r - color.g < 40 &&
    color.r - color.b < 40 &&
    color.g - color.b < 40
  ) {
    aleatorio = Math.random() * 3;
    aleatorio < 1
      ? (color.r = (color.r + 100) % 255)
      : aleatorio < 2
        ? (color.g = (color.g + 100) % 255)
        : (color.b = (color.b + 100) % 255);
  }
  switch (tipoRet) {
    // retangulo comum
    case 0:
      w = randomInt(W * 0.8, W * 1);
      h = randomInt(H * 0.8, H * 1);
      x = randomInt(0, W - w) + parentX;
      y = randomInt(0, H - h) + parentY;
      if (verificar === 1) {
        objetosArray[layer].push({
          x: x,
          y: y,
          w: w,
          h: h,
          count: 0,
          tipo: 0,
          color,
        });

        VerificaDiv(layer, direction, layer);
      } else {
        objetosArrayE.push({
          x: x,
          y: y,
          w: w,
          h: h,
          count: 0,
          tipo: 0,
          ultimo: "ultimo",
          color,
        });
      }
      break;
    // quadrado centralizado
    case 1:
      w = randomInt(W * 0.7, W * 1);
      h = randomInt(H * 0.7, H * 1);

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
          tipo: 1,
          color,
        });

        VerificaDiv(layer, direction, layer);
      } else {
        objetosArrayE.push({
          x: x,
          y: y,
          w: w,
          h: h,
          count: 0,
          tipo: 1,
          ultimo: "ultimo",
          color,
        });
      }
      break;

    //quadrados em sequencia
    case 2:
      let horizontalLayout;
      let maxRetangles = 0;
      if (W >= H) {
        const areaPai = (W - 10 + (H - 10)) / 2;
        const minAreaObjeto = 65; // (180 + 40) / 2
        maxRetangles =
          areaPai / minAreaObjeto >= 6 ? 6 : areaPai / minAreaObjeto;
        horizontalLayout = true;
      } else {
        horizontalLayout = false;
        const areaPai = (W - 10 + (H - 10)) / 2;
        const minAreaObjeto = 70; // (180 + 60) / 2
        maxRetangles =
          areaPai / minAreaObjeto >= 6 ? 6 : areaPai / minAreaObjeto;
      }
      const totalRectangles = randomInt(2, maxRetangles);

      // Each child has its own width and height, derived directly from
      // the parent's width (W) and height (H), never from an average.
      const preferredGap = 10;
      const minChildWidth = W * 0.5;
      const maxChildWidth = W * 1;
      const minChildHeight = H * 0.5;
      const maxChildHeight = H * 1;

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
            tipo: 2,
            color,
          });

          VerificaDiv(layer, direction, layer);
        } else {
          objetosArrayE.push({
            x: x,
            y: y,
            w: w,
            h: h,
            count: 0,
            tipo: 2,
            ultimo: "ultimo",
            color,
          });
        }
      }
      break;
    // circulo
    case 3:
      const diameter = Math.max(randomInt(Math.min(W, H) * 0.9, Math.min(W, H) * 1), 20);
      const greatSide = Math.max(W, H) + margemMin * 2;
      const minGap = 30;
      
      const quantCircles = Math.max(
        1,
        Math.floor((greatSide - minGap) / (diameter + minGap)),
      );
      const finalGap = (greatSide - quantCircles * diameter) / (quantCircles + 1);
      for (let i = 0; i < quantCircles; i++) {
        if (W >= H) {
          x = (parentX - margemMin) + finalGap + i * (diameter + finalGap);
          y = (parentY ) + H / 2 - diameter / 2 ;
        } else {
          x = (parentX) + W / 2 - diameter / 2;
          y = (parentY - margemMin) + finalGap + i * (diameter + finalGap) ;
        }
        objetosArrayE.push({
          x: x,
          y: y,
          diameter: diameter,
          count: 0,
          tipo: 0,
          circle: true,
          ultimo: "ultimo",
          color,
        });
      }
  }
}

function geraCor() {
  for (let i = 0; i < objetosArrayE.length; i++) {
      if (!objetosArrayE[i].circle) {
        criarElem(
          objetosArrayE[i].x,
          objetosArrayE[i].y,
          null,
          objetosArrayE[i].w,
          objetosArrayE[i].h,
          null,
          `rgb(${objetosArrayE[i].color.r}, ${objetosArrayE[i].color.g}, ${objetosArrayE[i].color.b})`,
        );
      } else if (objetosArrayE[i].color) {
        criarElem(
          objetosArrayE[i].x,
          objetosArrayE[i].y,
          objetosArrayE[i].diameter,
          null,
          null,
          true,
          `rgb(${objetosArrayE[i].color.r}, ${objetosArrayE[i].color.g}, ${objetosArrayE[i].color.b})`,
        );
      }
    }
    
    // objetos array final serve para que a correção de objetos vazios não aconteça duas vezes no mesmo objeto
    objetosArrayFinal.push(...objetosArrayE)
    objetosArrayE = []
  
}

function criarElem(x, y, diameter, w, h, circle, cor) {
  if (!circle) {
    ctx.beginPath();
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, w, h);
  } else {
    ctx.beginPath();
    ctx.fillStyle = cor;
    ctx.arc(x + diameter / 2, y + diameter / 2, diameter / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

coresPai.push([
  {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  },
]);
corFundo = `rgb(${coresPai[0][0].r}, ${coresPai[0][0].g}, ${coresPai[0][0].b})`;
criarElem(
  0,
  0,
  null,
  800,
  800,
  false,
  corFundo,
);

let qualLayoutPrimario = Math.floor(Math.random() * 3);
direction = Math.floor(Math.random() * 2);

if (qualLayoutPrimario === 0) {
  //(layer, x, y, w, h, W, H, count, direction, layerCor)
  EscolheLayout(0, 0, 0, 0, 0, 800, 200, 0, 0, 0);
  EscolheLayout(0, 0, 200, 0, 0, 800, 400, 0, direction, 0);
  EscolheLayout(0, 0, 600, 0, 0, 800, 200, 0, 0, 0);
} else if (qualLayoutPrimario === 1) {
  EscolheLayout(0, 0, 0, 0, 0, 200, 800, 0, 1, 0);
  EscolheLayout(0, 200, 0, 0, 0, 400, 800, 0, direction, 0);
  EscolheLayout(0, 600, 0, 0, 0, 200, 800, 0, 1, 0);
} else if (qualLayoutPrimario === 2) {
  EscolheLayout(0, 0, 0, 0, 0, 300, 600, 0, direction, 0);
  EscolheLayout(0, 300, 0, 0, 0, 500, 600, 0, direction, 0);
  EscolheLayout(0, 0, 600, 0, 0, 800, 200, 0, direction, 0);
}

// coisas para fazer:
// 1. adicionar elementos no final dos cortes
// 2. acrescentar niveis de dificuldade
