class PanelControles extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.renderizar();
        this.configurarEventos();
    }

    configurarEventos() {
        const btnModo = this.shadowRoot.querySelector('#btnModo');

        btnModo.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent("toggle-modo-oscuro", {
                bubbles: true,
                composed: true
            }));
        });
    }

    renderizar() {
        const modoOscuro = this.getAttribute("modoOscuro") === "true";

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 20px;
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(4px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
                }

                h1 {
                    margin: 0;
                    font-size: 1.4rem;
                    letter-spacing: 3px;
                }

                button {
                    background: transparent;
                    color: white;
                    padding: 8px 14px;
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    border-radius: 8px;
                    cursor: pointer;
                    transition: 0.3s;
                    font-size: 0.95rem;
                }

                button:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            </style>

            <h1>Explorador Espacial</h1>

            <button id="btnModo">
                ${modoOscuro ? "Modo Claro" : "Modo Oscuro"}
            </button>
        `;
    }
}

customElements.define("panel-controles", PanelControles);