const slides=[
  "img/foto1.jpg",
  "img/foto2.jpg",
  "img/foto3.jpg",
  "img/foto4.jpg",
  "img/foto5.jpg",
  "img/foto6.jpg",
  "img/foto7.jpg",
  "img/foto8.jpg",
  "img/foto9.jpg",
  "img/foto10.jpg",
  "img/foto11.jpg",
  "img/foto12.jpg"
];

let index = 0;
let auto = true;
let timer;

const img = document.getElementById("mainImage");
const thumbs = document.querySelectorAll(".thumbs img");
const current = document.getElementById("current");
const music = document.getElementById("music");

// Selecionando os textos que vão mudar
const tituloFoto = document.getElementById("titulo-foto");
const descFoto = document.getElementById("desc-foto");

function render(){
  img.style.opacity = "0.2";
  setTimeout(() => {
    img.src = slides[index];
    img.style.opacity = "1";
  }, 250);

  thumbs.forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });

  current.textContent = index + 1;

  // Lógica para mudar o texto na foto 10 (índice 9)
  if (tituloFoto && descFoto) {
    if (index >= 9) {
      tituloFoto.innerText = "Equipe Spirit Fight";
      descFoto.innerText = "Novo treino.";
    } else {
      tituloFoto.innerText = "Equipe Jiu-Jitsu";
      descFoto.innerText = "treino semanal.";
    }
  }
}

function nextSlide(){
  index = (index + 1) % slides.length;
  render();
}

function prevSlide(){
  index = (index - 1 + slides.length) % slides.length;
  render();
}

function goTo(i){
  index = i;
  render();
}

function startAuto(){
  timer = setInterval(nextSlide, 3000);
}

function stopAuto(){
  clearInterval(timer);
}

function toggleAuto(){
  if(auto){ startAuto(); } else { stopAuto(); }
}

function toggleMusic(){
  if(music.paused){
    music.play();
  } else {
    music.pause();
  }
}

function fullscreen(){
  document.documentElement.requestFullscreen();
}

let startX = 0;

img.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

img.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  if(startX - endX > 50) nextSlide();
  if(endX - startX > 50) prevSlide();
});

startAuto();
render();
