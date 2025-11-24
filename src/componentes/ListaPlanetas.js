class ListaPlanetas extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        /* Lista interna que viene desde AplicacionEspacial */
        this._planetas = [];

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 30%;
                    min-width: 250px;
                    height: 100%;
                    overflow-y: auto;
                    background: rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(4px);
                    padding: 20px;
                    border-right: 1px solid rgba(255, 255, 255, 0.1);
                }

                h2 {
                    text-align: center;
                    margin: 0 0 20px;
                    font-size: 1.5rem;
                    letter-spacing: 2px;
                }

                .lista {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .vacio {
                    text-align: center;
                    opacity: 0.7;
                    font-size: 1.1rem;
                    margin-top: 20px;
                }
            </style>

            <h2>Planetas</h2>
            <div class="lista"></div>
        `;
    }

  
    set planetas(value) {
        if (!Array.isArray(value)) return;
        this._planetas = value;
        this.renderizar();
    }

    get planetas() {
        return this._planetas;
    }

    
    emitirSeleccion(planeta) {
        this.dispatchEvent(new CustomEvent("planeta-seleccionado", {
            detail: planeta,
            bubbles: true,
            composed: true
        }));
    }

 
    renderizar() {
        const contenedor = this.shadowRoot.querySelector(".lista");
        contenedor.innerHTML = "";

        // Si no hay planetas (ej: filtro vacío)
        if (this._planetas.length === 0) {
            contenedor.innerHTML = `<div class="vacio">No hay resultados</div>`;
            return;
        }

        // Renderizar tarjetas
        this._planetas.forEach(p => {
            const tarjeta = document.createElement("tarjeta-planeta");
            tarjeta.setAttribute("nombre", p.nombre);
            tarjeta.setAttribute("color", p.color);
            tarjeta.setAttribute("descripcion", p.descripcion);

            tarjeta.addEventListener("click", () => this.emitirSeleccion(p));

            contenedor.appendChild(tarjeta);
        });
    }
}

customElements.define("lista-planetas", ListaPlanetas);
