function geraCor() {
  for (let i = 0; i < objetosArrayE.length; i++) {
    if (!objetosArrayE[i].circle) {
      if (objetosArrayE[i].color) {
        criarElem(
          objetosArrayE[i].x,
          objetosArrayE[i].y,
          null,
          objetosArrayE[i].w,
          objetosArrayE[i].h,
          null,
          `rgb(${objetosArrayE[i].color.r}, ${objetosArrayE[i].color.g}, ${objetosArrayE[i].color.b})`,
        );
      }
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
    // objetos array final serve para que a correção de objetos vazios não aconteça duas vezes no mesmo objeto
    if (objetosArrayE[i].color) {
      objetosArrayFinal.push(objetosArrayE[i]);
    }
  }

  objetosArrayE = [];
  console.log(objetosArrayFinal);
  console.log(objetosArrayE);
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