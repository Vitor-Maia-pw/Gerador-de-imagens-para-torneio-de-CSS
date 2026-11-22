/* A layer serve para organizar os elementos em camadas diferentes, assim os elementos da layer 1 foram criador a partir dos 
elementos da layer 0 */
function EscolheLayout(layer, x, y, w, h, W, H, count, direction, layerCor) {
  if (!objetosArray[layer]) {
    objetosArray[layer] = [];
  }
  // direction = row
  if (direction === 0) {
    nDiv = Math.floor(W / tamanhoMin);
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
        w =
          Math.floor(Math.random() * (W - tamanhoMin * (quant - i + 1))) +
          tamanhoMin;
        W -= w;
        nDiv--;
      }
      objetosArray[layer].push({
        x: x,
        y: y,
        w: w,
        h: H,
        count: count + 1,
        cortado: true,
      });
    }
  }
  //direction = column
  else {
    nDiv = Math.floor(H / tamanhoMin);
    if (nDiv > 3) {
      nDiv = 3;
    }
    quant = nDiv > 1 ? Math.floor(Math.random() * (nDiv - 1)) + 1 : 0;
    nDiv = 1;

    for (let i = 0; i <= quant; i++) {
      y = y + h;

      if (quant === i) {
        h = H;
      } else {
        h =
          Math.floor(Math.random() * (H - tamanhoMin * (quant - i + 1))) +
          tamanhoMin;
        H -= h;
      }

      objetosArray[layer].push({
        x: x,
        y: y,
        w: W,
        h: h,
        count: count + 1,
        cortado: true,
      });
    }
  }

  VerificaDiv(layer, direction, layerCor);
}