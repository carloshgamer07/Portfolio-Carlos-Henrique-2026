const menuBotao = document.getElementById('menuBotao');
const menultr = document.getElementById('menultr');
const overlay = document.getElementById('overlay');
const body = document.body;
const fadeElemento = document.querySelectorAll('.fade-up');
const carrosselInner = document.getElementById('carrosselInner');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const btnTopo = document.getElementById('btnTopo');

let currentIndex = 0;
let totalItems = 0;

// Função do menu
function abrirMenu() {
    if (menultr) menultr.classList.add('active');
    if (overlay) overlay.classList.add('active');
    if (body) body.classList.add('abre-menu');
}

function fecharMenu() {
    if (menultr) menultr.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    if (body) body.classList.remove('abre-menu');
}

function checarVisibilidade() {
    const fadeElemento = document.querySelectorAll('.fade-up');
    
    fadeElemento.forEach(element => {
        const rect = element.getBoundingClientRect();
        const alturaTela = window.innerHeight;
        
        if (rect.top < alturaTela - 100 && rect.bottom > 100) {
            element.classList.add('visible');
        }
        // remove a linha "else" para que não suma ao rolar para cima
    });
}


// Carrossel
if (carrosselInner && prevBtn && nextBtn) {
    totalItems = document.querySelectorAll('.carrossel-item').length;
    
    function updateCarrossel() {
        carrosselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarrossel();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarrossel();
    });
}


// Mostrar/esconder botão baseado na rolagem
window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) {
        btnTopo.classList.add('show');
    } else {
        btnTopo.classList.remove('show');
    }
});

// Voltar ao topo suavemente
btnTopo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// Eventos do menu
if (menuBotao) menuBotao.addEventListener('click', abrirMenu);
if (overlay) overlay.addEventListener('click', fecharMenu);

// Forçar verificação ao carregar e ao rolar
window.addEventListener('load', () => {
    checarVisibilidade();
    // Força a primeira imagem do carrossel
    if (carrosselInner) updateCarrossel();
});
window.addEventListener('scroll', checarVisibilidade);