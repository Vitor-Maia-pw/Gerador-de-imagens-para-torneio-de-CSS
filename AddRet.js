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
    r: Math.abs(Math.floor(Math.random() * 105) + corPai.r + 75) % 255,
    g: Math.abs(Math.floor(Math.random() * 105) + corPai.g + 75) % 255,
    b: Math.abs(Math.floor(Math.random() * 105) + corPai.b + 75) % 255,
  };
  if (
    Math.abs(color.r - color.g) < 40 &&
    Math.abs(color.r - color.b) < 40 &&
    Math.abs(color.g - color.b) < 40
  ) {
    if (corPai.r >= corPai.b && corPai.r >= corPai.g) {
      aleatorio = Math.random() * 2 + 1;
    } else if (corPai.g >= corPai.r && corPai.g >= corPai.b) {
      aleatorio = Math.random() * 2 + (2 % 3);
    } else {
      aleatorio = Math.random() * 2;
    }
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
      const diameter = Math.max(
        randomInt(Math.min(W, H) * 0.9, Math.min(W, H) * 1),
        (proporcaoImagem.x + proporcaoImagem.y)/2 * (2/80),
      );
      const greatSide = Math.max(W, H) + margemMin * 2;
      const minGap = (proporcaoImagem.x + proporcaoImagem.y)/2 * (3/80);

      const quantCircles = Math.max(
        1,
        Math.floor((greatSide - minGap) / (diameter + minGap)),
      );
      const finalGap =
        (greatSide - quantCircles * diameter) / (quantCircles + 1);
      for (let i = 0; i < quantCircles; i++) {
        if (W >= H) {
          x = parentX - margemMin + finalGap + i * (diameter + finalGap);
          y = parentY + H / 2 - diameter / 2;
        } else {
          x = parentX + W / 2 - diameter / 2;
          y = parentY - margemMin + finalGap + i * (diameter + finalGap);
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