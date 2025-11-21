class AplicacionEspacial extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Estado inicial
        this.estado = {
            planetaSeleccionado: null,
            modoOscuro: false,
        };
    }

    connectedCallback() {
        this.renderizar();
        this.configurarEventos();
    }

    // Escuchar eventos de componentes hijos
    configurarEventos() {
        this.shadowRoot.addEventListener("planeta-seleccionado", (e) => {
            this.estado.planetaSeleccionado = e.detail;
            this.actualizarModal();
        });

        this.shadowRoot.addEventListener("toggle-modo-oscuro", () => {
            this.estado.modoOscuro = !this.estado.modoOscuro;
            this.renderizar();
        });
    }

    actualizarModal() {
        const modal = this.shadowRoot.querySelector("modal-info");
        if (modal) {
            modal.planeta = this.estado.planetaSeleccionado;
        }
    }

    renderizar() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100vh;
                    overflow: hidden;
                    background: \${this.estado.modoOscuro ? "#000" : "#0a0f1f"};
                    color: white;
                    transition: background 0.3s ease;
                    font-family: 'Orbitron', sans-serif;
                }

                .contenedor {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    position: relative;
                }

                .contenido {
                    display: flex;
                    flex: 1;
                    overflow: hidden;
                }

                fondo-estelar {
                    position: absolute;
                    inset: 0;
                    z-index: -1;
                }
            </style>

            <div class="contenedor">
                <fondo-estelar></fondo-estelar>
                <panel-controles modoOscuro="\${this.estado.modoOscuro}"></panel-controles>

                <div class="contenido">
                    <lista-planetas></lista-planetas>
                    <modal-info></modal-info>
                </div>
            </div>
        `;
    }
}

customElements.define("aplicacion-espacial", AplicacionEspacial);
