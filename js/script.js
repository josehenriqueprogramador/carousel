const slides = [
  "img/foto1.jpg", "img/foto2.jpg", "img/foto3.jpg", "img/foto4.jpg", 
  "img/foto5.jpg", "img/foto6.jpg", "img/foto7.jpg", "img/foto8.jpg", 
  "img/foto9.jpg", "img/foto10.jpg", "img/foto11.jpg", "img/foto12.jpg", 
  "img/foto13.jpg"
];

let index = 0;
let isPaused = false;
let timer;
let startX = 0;

const img = document.getElementById("mainImage");
const thumbs = document.querySelectorAll(".thumbs img");
const current = document.getElementById("current");
const tituloFoto = document.getElementById("titulo-foto");
const descFoto = document.getElementById("desc-foto");

function render() {
  img.style.opacity = "0.2";
  setTimeout(() => {
    img.src = slides[index];
    img.style.opacity = "1";
  }, 250);

  thumbs.forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });

  current.textContent = index + 1;

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

function nextSlide() {
  index = (index + 1) % slides.length;
  render();
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  render();
}

function goTo(i) {
  index = i;
  render();
}

function startAuto() {
  stopAuto();
  timer = setInterval(nextSlide, 3000);
}

function stopAuto() {
  clearInterval(timer);
}

function toggleFreeze() {
  const btn = document.getElementById("btnFreeze");
  if (isPaused) {
    startAuto();
    btn.innerText = "⏸️";
    isPaused = false;
  } else {
    stopAuto();
    btn.innerText = "▶️";
    isPaused = true;
  }
}

async function downloadImage() {
  const imageUrl = slides[index];
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'foto_' + (index + 1) + '.jpg';
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Erro ao baixar:", err);
    alert("Erro ao baixar a imagem.");
  }
}

// Eventos de toque para deslizar
img.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

img.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextSlide();
  else if (endX - startX > 50) prevSlide();
});

// Inicia
startAuto();
render();
