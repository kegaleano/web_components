
class ModalInfo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._planeta = null;
    }

    set planeta(valor) {
        this._planeta = valor;
        this.renderizar();
    }

    get planeta() {
        return this._planeta;
    }

    connectedCallback() {
        this.renderizar();
    }

    cerrar() {
        this._planeta = null;
        this.renderizar();
    }

    renderizar() {
        if (!this._planeta) {
            this.shadowRoot.innerHTML = "";
            return;
        }

        const { nombre, descripcion, color } = this._planeta;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: absolute;
                    right: 20px;
                    top: 80px;
                    width: 300px;
                    background: rgba(0,0,0,0.55);
                    border: 1px solid rgba(255,255,255,0.2);
                    border-radius: 12px;
                    padding: 20px;
                    backdrop-filter: blur(5px);
                    color: white;
                    animation: aparecer 0.3s ease;
                }

                @keyframes aparecer {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .circulo {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: ${color};
                    margin-bottom: 12px;
                }

                h2 {
                    margin: 0;
                    font-size: 1.4rem;
                    letter-spacing: 2px;
                }

                p {
                    margin-top: 10px;
                    line-height: 1.5;
                }

                button {
                    margin-top: 15px;
                    padding: 8px 12px;
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.4);
                    color: white;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: 0.3s;
                }

                button:hover {
                    background: rgba(255,255,255,0.2);
                }
            </style>

            <div class="contenido">
                <div class="circulo"></div>
                <h2>${nombre}</h2>
                <p>${descripcion}</p>
                <button id="cerrar">Cerrar</button>
            </div>
        `;

        this.shadowRoot.querySelector('#cerrar').addEventListener('click', () => this.cerrar());
    }
}

customElements.define("modal-info", ModalInfo);
