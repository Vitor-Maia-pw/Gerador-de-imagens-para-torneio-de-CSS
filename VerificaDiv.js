let ultimaVolta = 0;
function VerificaDiv(layer, direction, layerCor) {
  for (let i = 0; i < objetosArray[layer].length; i++) {
    let dividir = 0;
    if (direction === 0) {
      if (
        objetosArray[layer][i].h > tamanhoMin * 2 &&
        objetosArray[layer][i].w > tamanhoMin
      ) {
        porcentagem = objetosArray[layer][i].h / tamanhoMin;
        dividir =
          Math.floor(Math.random() * porcentagem) + (porcentagem < 3 ? 0 : 2);
      }
    } else if (direction === 1) {
      if (
        objetosArray[layer][i].w > tamanhoMin * 2 &&
        objetosArray[layer][i].h > tamanhoMin
      ) {
        porcentagem = objetosArray[layer][i].w / tamanhoMin;
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
      if (maiorLado > (objetosArray[layer][i].w === maiorLado? tamanhoMin : tamanhoMin) * 2 && menorLado > (objetosArray[layer][i].h === menorLado? tamanhoMin : tamanhoMin)) {
        porcentagem = maiorLado / (objetosArray[layer][i].w === maiorLado? tamanhoMin : tamanhoMin);
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
      if (objetosArray[layer][i].count < 2) {
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
          objetosArrayE[ultimoObjetoExecutado].x + margemMin,
          objetosArrayE[ultimoObjetoExecutado].y + margemMin,
          0,
          0,
          objetosArrayE[ultimoObjetoExecutado].w - margemMin * 2,
          objetosArrayE[ultimoObjetoExecutado].h - margemMin * 2,
          Math.floor(Math.random() * 3),
          1,
          layerCor,
        );
      }
    } else {
      // excessão para o tamanho minimo
      let confirmW =
        objetosArray[layer][i].w > 100 && objetosArray[layer][i].h > 80;
      let confirmH =
        objetosArray[layer][i].h > 100 && objetosArray[layer][i].w > 80;
      if (objetosArray[layer][i]) {
        objetosArrayE.push(objetosArray[layer][i]);
        objetosArray[layer].splice(i, 1);
        objetosArray[layer].unshift(0);
      }

      let ultimoObjetoExecutado = objetosArrayE.length - 1;

      if (confirmW || confirmH) {
        AddRet(
          layer + 1,
          objetosArrayE[ultimoObjetoExecutado].x + margemMin,
          objetosArrayE[ultimoObjetoExecutado].y + margemMin,
          0,
          0,
          objetosArrayE[ultimoObjetoExecutado].w - margemMin * 2,
          objetosArrayE[ultimoObjetoExecutado].h - margemMin * 2,
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
            pai.x + margemMin,
            pai.y + margemMin,
            0,
            0,
            pai.w - margemMin * 2,
            pai.h - margemMin * 2,
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