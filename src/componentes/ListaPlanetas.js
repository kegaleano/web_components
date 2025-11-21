
class ListaPlanetas extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.planetas = [
            { nombre: "Mercurio", color: "#b1b1b1", descripcion: "El planeta más cercano al Sol." },
            { nombre: "Venus", color: "#e0b36c", descripcion: "El planeta más caliente del sistema solar." },
            { nombre: "Tierra", color: "#4da6ff", descripcion: "Nuestro hogar azul." },
            { nombre: "Marte", color: "#c1440e", descripcion: "El planeta rojo y posible futuro hogar humano." },
            { nombre: "Júpiter", color: "#d1a177", descripcion: "El planeta más grande del sistema solar." },
            { nombre: "Saturno", color: "#d8c27a", descripcion: "Famoso por sus anillos espectaculares." },
            { nombre: "Urano", color: "#7fd1d1", descripcion: "Un gigante helado con rotación extrema." },
            { nombre: "Neptuno", color: "#4570e6", descripcion: "El planeta más ventoso y distante." }
        ];
    }

    connectedCallback() {
        this.renderizar();
    }

    emitirSeleccion(planeta) {
        this.dispatchEvent(new CustomEvent("planeta-seleccionado", {
            detail: planeta,
            bubbles: true,
            composed: true
        }));
    }

    renderizar() {
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

                .planeta {
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 12px;
                    margin-bottom: 12px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: transform 0.2s, background 0.3s;
                }

                .planeta:hover {
                    background: rgba(255, 255, 255, 0.15);
                    transform: scale(1.03);
                }

                .circulo {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    margin-right: 12px;
                }

                .nombre {
                    font-size: 1.1rem;
                    font-weight: bold;
                }
            </style>

            <h2>Planetas</h2>
            <div id="lista">
                ${this.planetas.map(p => `
                    <div class="planeta" data-nombre="${p.nombre}">
                        <div class="circulo" style="background:${p.color}"></div>
                        <div class="nombre">${p.nombre}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Asignar eventos
        this.shadowRoot.querySelectorAll('.planeta').forEach(elem => {
            elem.addEventListener('click', () => {
                const nombre = elem.getAttribute('data-nombre');
                const planeta = this.planetas.find(p => p.nombre === nombre);
                this.emitirSeleccion(planeta);
            });
        });
    }
}

customElements.define("lista-planetas", ListaPlanetas);