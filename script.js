const container = document.getElementById('jogo-container');
let nomeCorreto = "";

async function novoDesafio() {
    container.innerHTML = '<h2>Buscando Pokémon...</h2>';
    const idSorteado = Math.floor(Math.random() * 151) + 1;

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idSorteado}`);
    const data = await res.json();

    nomeCorreto = data.name;
    const imagemUrl = data.sprites.other['official-artwork'].front_default;

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

function abrirCamera() {
    const video = document.getElementById('video');
    const section = document.getElementById('camera-section');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            section.style.display = "block";
        })
        .catch(err => {
            alert("Erro ao acessar a câmera: " + err);
        });
}

function fecharCamera() {
    const video = document.getElementById('video');
    if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
    }
    document.getElementById('camera-section').style.display = "none";
}

novoDesafio();
