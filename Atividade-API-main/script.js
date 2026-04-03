const container = document.getElementById('jogo-container');
let nomeCorreto = "";

async function novoDesafio() {
    container.innerHTML = '<h2>Buscando Pokémon...</h2>';
    const idSorteado = Math.floor(Math.random() * 151) + 1; // Sorteia da 1ª Geração

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idSorteado}`);
    const data = await res.json();
    
    nomeCorreto = data.name;
    const imagemUrl = data.sprites.other['official-artwork'].front_default;

    async function abrirCamera() {
    const video = document.getElementById('video');
    const container = document.getElementById('camera-container');
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        container.style.display = "block";
    } catch (err) {
        alert("Erro ao acessar a câmera: " + err);
    }
}
    const CACHE_NAME = 'poke-v1';
const assets = ['./', './index.html', './style.css', './script.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

function fecharCamera() {
    const video = document.getElementById('video');
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    document.getElementById('camera-container').style.display = "none";
}
    container.innerHTML = `
        <div class="card-game">
            <img src="${imagemUrl}" id="poke-img" class="silhueta">
            <h2>Quem é esse Pokémon?</h2>
            <input type="text" id="palpite" placeholder="Nome em inglês...">
            <button onclick="verificar()">Revelar</button>
            <br>
            <button onclick="novoDesafio()" style="margin-top:10px; background:gray;">Pular</button>
        </div>
    `;
}

function verificar() {
    const chute = document.getElementById('palpite').value.toLowerCase().trim();
    const img = document.getElementById('poke-img');
    
    if (chute === nomeCorreto) {
        img.classList.add('revelado');
        alert("Acertou! Era o " + nomeCorreto.toUpperCase());
    } else {
        alert("Errou! Tente novamente.");
    }
}

novoDesafio();