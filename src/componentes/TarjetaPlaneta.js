class TarjetaPlaneta extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this._planeta = null;
    }

    static get observedAttributes() {
        return ["nombre", "color", "descripcion"];    }

    attributeChangedCallback() {
        this.renderizar();
    }

    set planeta(data) {
        this._planeta = data;
        this.renderizar();
    }

    get planeta() {
        return this._planeta;
    }

    connectedCallback() {
        this.renderizar();
    }

    renderizar() {
        const planeta = this._planeta || {
            nombre: this.getAttribute("nombre") || "Planeta",
            color: this.getAttribute("color") || "gray",
            descripcion: this.getAttribute("descripcion") || "Descripción del planeta."
        };

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: rgba(255, 255, 255, 0.06);
                    padding: 18px;
                    border-radius: 12px;
                    backdrop-filter: blur(4px);
                    margin-bottom: 16px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: transform 0.2s ease;
                }

                :host(:hover) {
                    transform: scale(1.02);
                }

                .circulo {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    margin-bottom: 10px;
                    background: ${planeta.color};
                }

                h3 {
                    margin: 0;
                    font-size: 1.3rem;
                    letter-spacing: 1px;
                }

                p {
                    margin-top: 8px;
                    font-size: 0.95rem;
                    line-height: 1.5;
                }
            </style>

            <div class="tarjeta">
                <div class="circulo"></div>
                <h3>${planeta.nombre}</h3>
                <p>${planeta.descripcion}</p>
            </div>
        `;
    }
}

customElements.define("tarjeta-planeta", TarjetaPlaneta);