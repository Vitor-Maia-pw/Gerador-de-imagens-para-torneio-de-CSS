function resizeCanvas() {
  const larguraVisual = canvas.clientWidth;
  const alturaVisual = canvas.clientHeight;
  const densidade = window.devicePixelRatio || 1;

  // O bitmap interno acompanha a densidade da tela, mas os objetos continuam
  // usando o sistema de coordenadas fixo da imagem gerada (1000 x 960).
  canvas.width = Math.round(larguraVisual * densidade);
  canvas.height = Math.round(alturaVisual * densidade);
  ctx.setTransform(
    canvas.width / Math.max(proporcaoImagem.x, proporcaoImagem.y),
    0,
    0,
    canvas.height / Math.max(proporcaoImagem.x, proporcaoImagem.y),
    0,
    0,
  );

  if (corFundo) {
    criarElem(0, 0, null, proporcaoImagem.x, proporcaoImagem.y, false, corFundo);
  }

  for (const objeto of objetosArrayFinal) {
    if (objeto.color) {
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
}

window.addEventListener("resize", resizeCanvas);
window.visualViewport?.addEventListener("resize", resizeCanvas);
resizeCanvas();