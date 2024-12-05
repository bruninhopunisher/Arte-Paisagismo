let chuva = [];
let estrelas = [];
let folhas = [];

let quantidade = 500;

let passarosGif;
let corvosAudio;
let vento_forteAudio;
let trovaoAudio;
let chuvaAudio;
let carroPassandoAudio;

let carroX1 = 415;
let carroY1 = 160;
let scalaCarro1 = 30;

let carroX2 = 450;
let carroY2 = 500;
let scalaCarro2 = 350;

let passarosX = 300;
let passarosX1 = 600;
let passarosX2 = 900;

let passarosY = 40;
let passarosY1 = 40;
let passarosY2 = 40;

let circulo = 0;
let circuloX = 0;
let circuloY = 480;

let dentroESQ;
let dentroDIR;

let x1 = 0,
  y1 = 169;
let x2 = 430,
  y2 = 170;
let x3 = 0,
  y3 = 594;

let x4 = 471;
let y4 = 170;
let x5 = 900;
let y5 = 170;
let x6 = 900;
let y6 = 594;

function preload() {
  passarosGif = loadImage("passaros.gif");
  carroAmarelo = loadImage("carro_amarelo.png");
  carroVerde = loadImage("carro_verde.png");
  corvosAudio = loadSound("corvos.mp3");
  vento_forteAudio = loadSound("vento_forte.mp3");
  trovaoAudio = loadSound("trovao.mp3");
  chuvaAudio = loadSound("chovendo.mp3");
  carroPassandoAudio = loadSound("carro_passando.mp3");
}

function setup() {
  createCanvas(900, 600);
  stroke(255);
  //For da chuva
  for (let i = 0; i < quantidade; i++) {
    chuva[i] = [];
    chuva[i][0] = random(width);
    chuva[i][1] = random(0, -height);
    chuva[i][2] = random(3);

    //For das folhas
    folhas[i] = [];
    folhas[i][0] = random(width);
    folhas[i][1] = random(0, -height);
    folhas[i][2] = random(3);
  }

  //For das estrelas
  for (let i = 0; i < 100; i++) {
    // 100 estrelas
    let x = random(1, 900);
    let y = random(0, 160);
    let tamanho = random(1, 4);
    estrelas.push({ x, y, tamanho });
  }
}

function draw() {
  background(0);
  triangulo();
  nublado();
  tracejado();
  estrelasFuncao();
  vulcao();
  arvoresES();
  arvoresDR();

  image(passarosGif, passarosX, passarosY, 150, 100);
  image(passarosGif, passarosX1, passarosY2, 150, 100);
  image(passarosGif, passarosX2, passarosY2, 150, 100);
  image(carroVerde, carroX1, carroY1, scalaCarro1, scalaCarro1);
  image(carroAmarelo, carroX2, carroY2, scalaCarro2, scalaCarro2);

  if (keyIsDown(DOWN_ARROW)) {
    carroY1 += 5;
    carroX1 -= 7;
    scalaCarro1 += 7;
    console.log(carroX1, carroY1);
    if (carroX1 < -120) {
      carroX1 = 415;
      carroY1 = 160;
      scalaCarro1 = 30;
    }
  }

  if (keyIsDown(UP_ARROW)) {
    if (!carroPassandoAudio.isPlaying()) {
      carroPassandoAudio.play();
    }
    carroY2 -= 5;
    scalaCarro2 -= 3;
    console.log(carroX2, carroY2);
    if (scalaCarro2 < 200) {
      scalaCarro2 -= 5;
    }
    if (carroY2 < 135) {
      carroY2 = 500;
      scalaCarro2 = 350;
    }
  } else {
    if (carroPassandoAudio.isPlaying()) {
      carroPassandoAudio.stop();
    }
  }

  if (keyIsPressed == true && key == "p") {
    passarosX -= 1;
    passarosX1 -= 2;
    passarosX2 -= 3;
    // passarosY = 10 * sin(passarosX/24) - 140;
    // passarosX -= 1.5;
    if (passarosX < -150) {
      passarosX = 900;
      passarosX1 = 900;
      passarosX2 = 900;
    }
    if (!corvosAudio.isPlaying()) {
      corvosAudio.play();
    }
  } else {
    if (corvosAudio.isPlaying()) {
      corvosAudio.stop();
    }
  }

  if (keyIsPressed == true && key == "t") {
    noStroke();
    trovao();
    estrelasFuncao();
    vulcao();
    arvoresES();
    arvoresDR();
    chuvaCaindo();

    image(passarosGif, passarosX, passarosY, 150, 100);
    image(passarosGif, passarosX1, passarosY2, 150, 100);
    image(passarosGif, passarosX2, passarosY2, 150, 100);

    if (!chuvaAudio.isPlaying()) {
      chuvaAudio.play();
    }
    if (!trovaoAudio.isPlaying()) {
      trovaoAudio.play();
    }
  } else {
    if (chuvaAudio.isPlaying()) {
      chuvaAudio.stop();
    }
    if (trovaoAudio.isPlaying()) {
      trovaoAudio.stop();
    }
  }

  sol();

  let dentroESQ = dentroDoTrianguloESQ(mouseX, mouseY, x1, y1, x2, y2, x3, y3);
  let dentroDIR = dentroDoTrianguloDIR(mouseX, mouseY, x4, y4, x5, y5, x6, y6);

  if (dentroESQ) {
    folhasVoandoESQ();
  }

  if (dentroDIR) {
    folhasVoandoDIR();
  }

  if (dentroESQ || dentroDIR) {
    if (!vento_forteAudio.isPlaying()) {
      vento_forteAudio.play();
    }
  } else {
    if (vento_forteAudio.isPlaying()) {
      vento_forteAudio.stop();
    }
  }
}

// Função das estrelas
function estrelasFuncao() {
  noStroke();
  fill(206, 211, 219);
  for (let estrela of estrelas) {
    ellipse(estrela.x, estrela.y, estrela.tamanho, estrela.tamanho);
  }
}

//Função dos passáros
function passaros() {
  image(passarosGif, 200, -150, 150, 100);
  image(passarosGif, -50, -150, 150, 100);
  image(passarosGif, -300, -150, 150, 100);
}

function chuvaCaindo() {
  stroke("#A3CBFF");
  for (let i = 0; i < quantidade; i++) {
    let espessura = map(chuva[i][2], 0, 3, 3, 3);
    strokeWeight(espessura);
    line(chuva[i][0], chuva[i][1], chuva[i][0], chuva[i][1] + 5);
    chuva[i][1] += chuva[i][2] + 5;

    if (chuva[i][1] > height + 15) {
      chuva[i][0] = random(width);
      chuva[i][1] = random(0, -height);
    }
  }
}

function folhasVoandoESQ() {
  stroke("green");
  translate(470, 50);
  rotate(165);
  for (let i = 0; i < quantidade; i++) {
    let folha = map(folhas[i][1], 0, 1, 1, 1);
    let espessura = map(folhas[i][2], 0, 10, 10, 10);
    strokeWeight(espessura);

    line(folhas[i][0], folhas[i][1], folhas[i][0], folhas[i][1] - 20);
    folhas[i][1] -= folhas[i][2] + 1; // Alterado o sinal para subtrair

    if (folhas[i][1] < 50) {
      folhas[i][0] = random(width);
      // Alterado para gerar uma posição acima do topo
      folhas[i][1] = random(height, height * 2);
    }
  }
}

function folhasVoandoDIR() {
  stroke("green");
  translate(-500, 900);
  rotate(300);
  for (let i = 0; i < quantidade; i++) {
    let folha = map(folhas[i][1], 0, 1, 1, 1);
    let espessura = map(folhas[i][2], 0, 10, 10, 10);
    strokeWeight(espessura);

    // Alterado o valor para subtrair
    line(folhas[i][0], folhas[i][1], folhas[i][0], folhas[i][1] - 20);
    folhas[i][1] -= folhas[i][2] + 1; // Alterado o sinal para subtrair
    // Alterado o teste para verificar se a folha está acima do topo
    if (folhas[i][1] < 50) {
      folhas[i][0] = random(width);
      // Alterado para gerar uma posição acima do topo
      folhas[i][1] = random(height, height * 2);
    }
  }
}

function dentroDoTrianguloESQ(x, y, x1, y1, x2, y2, x3, y3) {
  
  let det1 = (x - x1) * (y2 - y1) - (x2 - x1) * (y - y1);
  let det2 = (x - x2) * (y3 - y2) - (x3 - x2) * (y - y2);
  let det3 = (x - x3) * (y1 - y3) - (x1 - x3) * (y - y3);

  return (
    (det1 >= 0 && det2 >= 0 && det3 >= 0) ||
    (det1 <= 0 && det2 <= 0 && det3 <= 0)
  );
}

// triangle(471, 170, 900, 170, 900, 594);

function dentroDoTrianguloDIR(x, y, x4, y4, x5, y5, x6, y6) {

  let det1 = (x - x4) * (y5 - y4) - (x5 - x4) * (y - y4);
  let det2 = (x - x5) * (y6 - y5) - (x6 - x5) * (y - y5);
  let det3 = (x - x6) * (y4 - y6) - (x4 - x6) * (y - y6);

  return (
    (det1 >= 0 && det2 >= 0 && det3 >= 0) ||
    (det1 <= 0 && det2 <= 0 && det3 <= 0)
  );
}

function arvoresES() {
  fill(34, 139, 34);
  stroke(0);
  let incrementoY = 40;
  let incrementoX = 50;

  for (let y = 200, xContagem = 7; y <= 440; y += incrementoY, xContagem--) {
    for (let x = 0; x < xContagem * incrementoX; x += incrementoX) {
      circle(x, y, 80);
    }
  }

  noStroke();
  fill(101, 67, 33);
  rect(-5, 480, 15, 100);
  rect(43, 440, 15, 95);
  rect(95, 400, 15, 85);
  rect(145, 360, 15, 75);
  rect(195, 320, 15, 65);
  rect(245, 280, 15, 55);
  rect(295, 240, 15, 45);
}

function arvoresDR() {
  fill(34, 139, 34);
  stroke(0);
  let incrementoY = 40;
  let incrementoX = 50;

  for (let y = 200, xContagem = 6; y <= 440; y += incrementoY, xContagem--) {
    for (let x = 900; x >= 900 - xContagem * incrementoX; x -= incrementoX) {
      circle(x, y, 80);
    }
  }

  noStroke();
  fill(101, 67, 33);
  rect(890, 480, 15, 100);
  rect(840, 440, 15, 95);
  rect(790, 400, 15, 85);
  rect(740, 360, 15, 75);
  rect(690, 320, 15, 65);
  rect(640, 280, 15, 55);
  rect(590, 240, 15, 45);
}

function arvoresDesenho(x, y, troncoL, troncoA, folhas) {
  noStroke();

  fill(101, 67, 33);
  rect(x - troncoL / 2, y - troncoA, troncoL, troncoA);

  fill(34, 139, 34);
  ellipse(x, y - troncoA, folhas, folhas);
}

function sol() {
  noStroke();
  translate(450, 171);
  fill(206, 211, 219);
  let raio = 40;

  beginShape();
  for (let i = 0; i < 100; i++) {
    let angulo = map(i, 201, 100, 0, PI);
    let x = raio * cos(angulo);
    let y = raio * sin(angulo);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function triangulo() {
  noStroke();
  fill(158, 133, 110);
  triangle(0, 169, 430, 170, 0, 594);
  triangle(471, 170, 900, 170, 900, 594);
}

function buraco() {
  fill(110, 74, 29);
  ellipse(-35, 50, 45, 15);
  fill(199, 78, 38);
  ellipse(-35, 50, 35, 10);
}

function vulcao() {
  // Cor da montanha
  fill(94, 58, 25);
  triangle(300, 170, 350, 170, 325, 135);
  triangle(580, 170, 640, 170, 610, 135);
  triangle(160, 170, 220, 170, 192, 135);

  // Cor do pico de neve
  fill(255);
  triangle(179, 150, 192, 135, 204, 150);
  triangle(315, 150, 325, 135, 335, 150);
  triangle(598, 150, 610, 135, 622, 150);
}

function tracejado() {
  var distance = 30;
  var space = 10;
  var expessura = 10;
  var y2 = 690;
  stroke("#FFEB3B");
  for (var y1 = 650; y1 > 150; y1 -= space) {
    line(450, y1, 450, y2);
    expessura = expessura - 0.6;
    strokeWeight(expessura);
    y1 = y2 - space;
    y2 = y1 - distance;
  }
}

function trovao() {
  fill(99, 99, 99);
  rectMode(CORNER);
  rect(0, 0, 900, 170);
}

function nublado() {
  fill(0, 23, 61);
  rectMode(CORNER);
  rect(0, 0, 900, 170);
}