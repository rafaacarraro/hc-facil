// ==========================================
// HC FÁCIL
// ==========================================


// ==========================================
// ATIVAR OS ÍCONES
// ==========================================

if (typeof lucide !== "undefined") {
    lucide.createIcons();
}


// ==========================================
// PESQUISA NA TELA INICIAL
// ==========================================

const homeSearchInput =
    document.getElementById("homeSearchInput");

if (homeSearchInput) {

    homeSearchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            const pesquisa =
                homeSearchInput.value.trim();

            if (pesquisa !== "") {

                window.location.href =
                    "pesquisa.html?busca=" +
                    encodeURIComponent(pesquisa);

            }

        }

    });

}


// ==========================================
// BOTÃO SETORES
// ==========================================

const sectorsButton =
    document.getElementById("sectorsButton");

if (sectorsButton) {

    sectorsButton.addEventListener("click", function () {

        window.location.href = "setores.html";

    });

}


// ==========================================
// BOTÃO ENTRADAS
// ==========================================

const entrancesButton =
    document.getElementById("entrancesButton");

if (entrancesButton) {

    entrancesButton.addEventListener("click", function () {

        window.location.href = "entradas.html";

    });

}


// ==========================================
// BOTÃO MAPA
// ==========================================

const mapButton =
    document.getElementById("mapButton");

if (mapButton) {

    mapButton.addEventListener("click", function () {

        window.location.href = "mapa.html";

    });

}


// ==========================================
// PESQUISA DE LOCAIS
// ==========================================

const destinationInput =
    document.getElementById("destinationInput");

const noResults =
    document.getElementById("noResults");

const locais =
    document.querySelectorAll(".location-card");


function filtrarLocais() {

    if (!destinationInput) {
        return;
    }

    const pesquisa =
        destinationInput.value
            .toLowerCase()
            .trim();

    let encontrou = false;

    locais.forEach(function (local) {

        const nome =
            local.dataset.location
                ? local.dataset.location.toLowerCase()
                : "";

        const setor =
            local.dataset.sector
                ? local.dataset.sector.toLowerCase()
                : "";

        if (
            pesquisa === "" ||
            nome.includes(pesquisa) ||
            setor.includes(pesquisa)
        ) {

            local.style.display = "flex";

            encontrou = true;

        } else {

            local.style.display = "none";

        }

    });

    if (noResults) {

        noResults.style.display =
            encontrou ? "none" : "block";

    }

}


// ==========================================
// PESQUISA DIGITADA NA PÁGINA
// ==========================================

if (destinationInput) {

    destinationInput.addEventListener(
        "input",
        filtrarLocais
    );

}


// ==========================================
// RECEBER PESQUISA DA TELA INICIAL
// ==========================================

if (destinationInput) {

    const parametrosPesquisa =
        new URLSearchParams(window.location.search);

    const buscaInicial =
        parametrosPesquisa.get("busca");

    if (buscaInicial) {

        destinationInput.value =
            buscaInicial;

    }

    filtrarLocais();

}


// ==========================================
// PESQUISA DE SETORES
// ==========================================

const sectorSearch =
    document.getElementById("sectorSearch");

if (sectorSearch) {

    sectorSearch.addEventListener("input", function () {

        const pesquisa =
            sectorSearch.value
                .toLowerCase()
                .trim();

        const setores =
            document.querySelectorAll("[data-sector]");

        setores.forEach(function (setor) {

            const nome =
                setor.dataset.sector
                    ? setor.dataset.sector.toLowerCase()
                    : "";

            if (nome.includes(pesquisa)) {

                setor.style.display = "flex";

            } else {

                setor.style.display = "none";

            }

        });

    });

}


// ==========================================
// MAPA - DESTINO SELECIONADO
// ==========================================

const parametrosMapa =
    new URLSearchParams(window.location.search);

const localSelecionado =
    parametrosMapa.get("local");

const destinationLocation =
    document.getElementById("destinationLocation");

const destinationText =
    document.getElementById("destinationText");

const destinoPonto =
    document.getElementById("destinationPoint");

const routePath =
    document.getElementById("routePath");

const currentPoint =
    document.getElementById("currentPoint");


// ==========================================
// DESTINOS DO MAPA
// ==========================================
//
// Coordenadas baseadas diretamente na imagem
// do mapa (1536 x 1024).
//
// Os caminhos foram definidos seguindo
// os traçados desenhados sobre as ruas.
//
// ==========================================

const destinos = {

    exames: {
        nome: "Andares de Exames",
        x: 0,
        y: 0,
        rota: ""
    },

    maternidade: {
        nome: "Maternidade — Anexo A",
        x: 0,
        y: 0,
        rota: ""
    },

    sams: {
        nome: "SAM'S de Atendimento — Anexo B",
        x: 1217,
        y: 397,

        rota:
            "M 1062 664 " +
            "L 1260 581 " +
            "L 1257 557 " +
            "L 1193 503 " +
            "L 1163 433 " +
            "L 1201 425 " +
            "L 1217 397"
    },

    laboratorios: {
        nome: "Laboratório Central de Ciências da Saúde",
        x: 544,
        y: 550,

        rota:
            "M 978 697 " +
            "L 606 837 " +
            "L 528 843 " +
            "L 429 788 " +
            "L 416 692 " +
            "L 346 625 " +
            "L 351 589 " +
            "L 373 570 " +
            "L 528 529 " +
            "L 544 550"
    },

    farmacia: {
        nome: "Farmácia",
        x: 0,
        y: 0,
        rota: ""
    },

    central: {
        nome: "Prédio Central",
        x: 0,
        y: 0,
        rota: ""
    },

    "anexo-b": {
        nome: "Anexo B — UTI",
        x: 1217,
        y: 397,

        rota:
            "M 1062 664 " +
            "L 1260 581 " +
            "L 1257 557 " +
            "L 1193 503 " +
            "L 1163 433 " +
            "L 1201 425 " +
            "L 1217 397"
    }

};


// ==========================================
// ATUALIZAR O MAPA
// ==========================================

if (
    localSelecionado &&
    destinos[localSelecionado]
) {

    const destino =
        destinos[localSelecionado];


    // --------------------------------------
    // TÍTULO
    // --------------------------------------

    if (destinationLocation) {

        destinationLocation.textContent =
            destino.nome;

    }


    // --------------------------------------
    // TEXTO INFERIOR
    // --------------------------------------

    if (destinationText) {

        destinationText.textContent =
            destino.nome;

    }


    // --------------------------------------
    // POSIÇÃO DO DESTINO
    // --------------------------------------

    if (destinoPonto) {

        destinoPonto.setAttribute(
            "cx",
            destino.x
        );

        destinoPonto.setAttribute(
            "cy",
            destino.y
        );

        destinoPonto.style.opacity = "1";

    }


    // --------------------------------------
    // PONTO DE SAÍDA
    // RUA GENERAL CARNEIRO
    // --------------------------------------

    if (currentPoint) {

        currentPoint.setAttribute(
            "cx",
            1062
        );

        currentPoint.setAttribute(
            "cy",
            664
        );

    }


    // --------------------------------------
    // ROTA
    // --------------------------------------

    if (routePath) {

        routePath.setAttribute(
            "d",
            destino.rota
        );

        routePath.style.opacity =
            destino.rota ? "1" : "0";

    }

}
// ==========================================
// ZOOM E MOVIMENTO DO MAPA
// ==========================================

const mapViewport =
    document.querySelector(".map-viewport");

const mapContent =
    document.querySelector(".map-content");

const zoomIn =
    document.getElementById("zoomIn");

const zoomOut =
    document.getElementById("zoomOut");

const zoomReset =
    document.getElementById("zoomReset");

let zoomAtual = 1;
let posicaoX = 0;
let posicaoY = 0;

let arrastando = false;
let inicioX = 0;
let inicioY = 0;
let inicioPosicaoX = 0;
let inicioPosicaoY = 0;


// ==========================================
// APLICAR ZOOM E POSIÇÃO
// ==========================================

function aplicarTransformacao() {

    if (!mapContent) {
        return;
    }

    mapContent.style.transform =
        "translate(" +
        posicaoX +
        "px, " +
        posicaoY +
        "px) scale(" +
        zoomAtual +
        ")";
}


// ==========================================
// AUMENTAR ZOOM
// ==========================================

if (zoomIn) {

    zoomIn.addEventListener("click", function () {

        if (zoomAtual < 2.5) {

            zoomAtual += 0.25;

            aplicarTransformacao();
        }

    });
}


// ==========================================
// DIMINUIR ZOOM
// ==========================================

if (zoomOut) {

    zoomOut.addEventListener("click", function () {

        if (zoomAtual > 1) {

            zoomAtual -= 0.25;

            if (zoomAtual === 1) {
                posicaoX = 0;
                posicaoY = 0;
            }

            aplicarTransformacao();
        }

    });
}


// ==========================================
// RESTAURAR ZOOM
// ==========================================

if (zoomReset) {

    zoomReset.addEventListener("click", function () {

        zoomAtual = 1;

        posicaoX = 0;
        posicaoY = 0;

        aplicarTransformacao();
    });
}


// ==========================================
// MOVIMENTO COM MOUSE E DEDO
// ==========================================

if (mapViewport && mapContent) {

    // ------------------------------------------
    // INICIAR ARRASTO
    // ------------------------------------------

    mapViewport.addEventListener("pointerdown", function (event) {

        // Não iniciar arrasto ao clicar nos botões
        if (
            event.target &&
            event.target.closest &&
            event.target.closest(".map-zoom-controls")
        ) {
            return;
        }

        // Só permite movimentar quando estiver ampliado
        if (zoomAtual <= 1) {
            return;
        }

        arrastando = true;

        inicioX = event.clientX;
        inicioY = event.clientY;

        inicioPosicaoX = posicaoX;
        inicioPosicaoY = posicaoY;

        mapViewport.setPointerCapture(event.pointerId);

        event.preventDefault();
    });


    // ------------------------------------------
    // MOVIMENTAR
    // ------------------------------------------

    mapViewport.addEventListener("pointermove", function (event) {

        if (!arrastando) {
            return;
        }

        const movimentoX =
            event.clientX - inicioX;

        const movimentoY =
            event.clientY - inicioY;

        posicaoX =
            inicioPosicaoX + movimentoX;

        posicaoY =
            inicioPosicaoY + movimentoY;

        aplicarTransformacao();

        event.preventDefault();
    });


    // ------------------------------------------
    // FINALIZAR ARRASTO
    // ------------------------------------------

    mapViewport.addEventListener("pointerup", function (event) {

        arrastando = false;

        if (mapViewport.hasPointerCapture(event.pointerId)) {
            mapViewport.releasePointerCapture(event.pointerId);
        }

    });


    mapViewport.addEventListener("pointercancel", function (event) {

        arrastando = false;

        if (mapViewport.hasPointerCapture(event.pointerId)) {
            mapViewport.releasePointerCapture(event.pointerId);
        }

    });

}