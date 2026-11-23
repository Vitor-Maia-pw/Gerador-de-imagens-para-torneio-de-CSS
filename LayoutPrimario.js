coresPai.push([
  {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  },
]);
corFundo = `rgb(${coresPai[0][0].r}, ${coresPai[0][0].g}, ${coresPai[0][0].b})`;
criarElem(0, 0, null, proporcaoImagem.x, proporcaoImagem.y, false, corFundo);

let qualLayoutPrimario = 0;
if (dificuldade === 1) {
  qualLayoutPrimario = Math.floor(Math.random() * 2);
} else {
  qualLayoutPrimario = Math.floor(Math.random() * 8);
}
direction = Math.floor(Math.random() * 2);
console.log(qualLayoutPrimario)
switch (qualLayoutPrimario) {
  case 0:
    EscolheLayout(0, 0, 0, 0, 0, proporcaoImagem.x, proporcaoImagem.y / 4, 0, 0, 0);
    EscolheLayout(0, 0, proporcaoImagem.y / 4, 0, 0, proporcaoImagem.x, proporcaoImagem.y / 2, 0, direction, 0);
    EscolheLayout(0, 0, proporcaoImagem.y * 3 / 4, 0, 0, proporcaoImagem.x, proporcaoImagem.y / 4, 0, 0, 0);

    break;
  case 1:
    EscolheLayout(0, 0, 0, 0, 0, proporcaoImagem.x / 4, proporcaoImagem.y, 0, 1, 0);
    EscolheLayout(0, proporcaoImagem.x / 4, 0, 0, 0, proporcaoImagem.x / 2, proporcaoImagem.y, 0, direction, 0);
    EscolheLayout(0, proporcaoImagem.x * 3 / 4, 0, 0, 0, proporcaoImagem.x / 4, proporcaoImagem.y, 0, 1, 0);
    break;
  case 2:
    EscolheLayout(0, 0, 0, 0, 0, proporcaoImagem.x * 3 / 8, proporcaoImagem.y * 3 / 4, 0, direction, 0);
    EscolheLayout(0, proporcaoImagem.x * 3 / 8, 0, 0, 0, proporcaoImagem.x * 5 / 8, proporcaoImagem.y * 3 / 4, 0, direction, 0);
    EscolheLayout(0, 0, proporcaoImagem.y * 3 / 4, 0, 0, proporcaoImagem.x, proporcaoImagem.y / 4, 0, direction, 0);
    break;
  case 3:
    EscolheLayout(0, 0, 0, 0, 0, proporcaoImagem.x, proporcaoImagem.y / 4, 0, direction, 0);
    EscolheLayout(0, 0, proporcaoImagem.y / 4, 0, 0, proporcaoImagem.x / 4, proporcaoImagem.y / 2, 0, direction, 0);
    EscolheLayout(0, proporcaoImagem.x / 4, proporcaoImagem.y / 4, 0, 0, proporcaoImagem.x * 3 / 4, proporcaoImagem.y / 2, 0, direction, 0);
    EscolheLayout(0, 0, proporcaoImagem.y * 3 / 4, 0, 0, proporcaoImagem.x, proporcaoImagem.y / 4, 0, direction, 0);
    break;
  case 4:
    EscolheLayout(0, 0, 0, 0, 0, proporcaoImagem.x, proporcaoImagem.y * 4 / 10, 0, direction, 0);
    EscolheLayout(0, 0, proporcaoImagem.y * 4 / 10, 0, 0, proporcaoImagem.x / 3, proporcaoImagem.y * 6 / 10, 0, direction, 0);
    EscolheLayout(0, proporcaoImagem.x / 3, proporcaoImagem.y * 4 / 10, 0, 0, proporcaoImagem.x / 3, proporcaoImagem.y * 6 / 10, 0, direction, 0);
    EscolheLayout(0, proporcaoImagem.x * 2 / 3, proporcaoImagem.y * 4 / 10, 0, 0, proporcaoImagem.x / 3, proporcaoImagem.y * 6 / 10, 0, direction, 0);
    break;
  case 5:
    EscolheLayout(0, 0, 0, 0, 0, proporcaoImagem.x / 2, proporcaoImagem.y / 2, 0, direction, 0);
    EscolheLayout(0, proporcaoImagem.x / 2, 0, 0, 0, proporcaoImagem.x / 2, proporcaoImagem.y / 2, 0, direction, 0);
    EscolheLayout(0, 0, proporcaoImagem.y / 2, 0, 0, proporcaoImagem.x / 2, proporcaoImagem.y / 2, 0, direction, 0);
    EscolheLayout(0, proporcaoImagem.x / 2, proporcaoImagem.y / 2, 0, 0, proporcaoImagem.x / 2, proporcaoImagem.y / 2, 0, direction, 0);
    break;
  case 6:
    EscolheLayout(0, 0, 0, 0, 0, proporcaoImagem.x * 6 / 10, proporcaoImagem.y, 0, direction, 0);
    EscolheLayout(0, proporcaoImagem.x * 6 / 10, 0, 0, 0, proporcaoImagem.x * 4 / 10, proporcaoImagem.y / 2, 0, direction, 0);
    EscolheLayout(0, proporcaoImagem.x * 6 / 10, proporcaoImagem.y / 2, 0, 0, proporcaoImagem.x * 4 / 10, proporcaoImagem.y / 2, 0, direction, 0);
    break;
  case 7:
    EscolheLayout(0, 0, 0, 0, 0, proporcaoImagem.x, proporcaoImagem.y / 8, 0, direction, 0);
    EscolheLayout(0, 0, proporcaoImagem.y / 8, 0, 0, proporcaoImagem.x / 5, proporcaoImagem.y * 7 / 8, 0, direction, 0);
    EscolheLayout(0, proporcaoImagem.x / 5, proporcaoImagem.y / 8, 0, 0, proporcaoImagem.x * 4 / 5, proporcaoImagem.y * 7 / 16, 0, direction, 0);
    EscolheLayout(0, proporcaoImagem.x / 5, proporcaoImagem.y * 9 / 16, 0, 0, proporcaoImagem.x * 4 / 5, proporcaoImagem.y * 7 / 16, 0, direction, 0);
    break;


}
setTimeout(() => {
  SelecionaDificuldade(dificuldade)

}, 200);
function SelecionaDificuldade(dificuldade) {
  let posicaoRemover = 0;
  objetosArrayFinal.sort((obj1, obj2) => {
    if (obj1.circle !== obj2.circle) {
      return obj1.circle ? 1 : -1;
    }

    return (obj2.w + obj2.h) / 2 - (obj1.w + obj1.h) / 2;
  })
  setTimeout(() => {
    switch (dificuldade) {
      // Facil
      case 1:
        posicaoRemover = 7

        objetosArrayFinal.splice(
          posicaoRemover,
          Math.floor(objetosArrayFinal.length - posicaoRemover),
        );
        resizeCanvas();

        break;
      // Media
      case 2:
        posicaoRemover = 14

        objetosArrayFinal.splice(
          posicaoRemover,
          Math.floor(objetosArrayFinal.length - posicaoRemover),
        );
        resizeCanvas();
        break;
    }
  }, 1000);
}

