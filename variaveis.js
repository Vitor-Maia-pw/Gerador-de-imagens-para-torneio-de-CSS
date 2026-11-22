const canvas = document.getElementById("canva");
const ctx = canvas.getContext("2d");
let a = 0;
let aleatorio = 0;
let coresPai = [];
let corFundo = null;
let dificuldade = 3;
let direction = 0;

//x 15/8
let nDiv = 0;
let objetosArray = [];
let objetosArrayE = [];
let objetosArrayFinal = [];
let porcentagem = 0;
let proporcaoImagem = {
  x: 800,
  y: 800,
};

let quant = 0;
let tamanhoMin = (proporcaoImagem.x + proporcaoImagem.y)/2 * (7/80)
let margemMin = (proporcaoImagem.x + proporcaoImagem.y)/2 * (15/800);
let w = 0;
let h = 0;
let x = 0;
let y = 0;