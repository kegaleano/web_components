class AplicacionEspacial extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Estado unificado
        this.state = {
            planetaSeleccionado: null,
            modoOscuro: false,
            filtros: { q: "" },

            // Datos iniciales (seed)
            items: this._seedPlanets(),
            filtered: []
        };
    }

    connectedCallback() {
        // Aplicar filtros iniciales
        this.aplicarFiltros();

        // Renderizar UI
        this.renderizar();

        // Configurar listeners
        this.configurarEventos();

        // Renderizar lista inicial
        this.renderizarLista();
    }


    _seedPlanets() {
        return [
            { nombre: "Sol", descripcion: "El Sol es una estrella enana amarilla de tipo G2V, lo que significa que pertenece a la secuencia principal y tiene una clase de luminosidad V. Es una estrella bastante común en la Vía Láctea y se caracteriza por ser una esfera de plasma caliente que emite luz y calor" },
            { nombre: "Mercurio", descripcion: "Planeta más cercano al sol" },
            { nombre: "Venus", descripcion: "El planeta más caliente" },
            { nombre: "Tierra", descripcion: "Nuestro hogar azul" },
            { nombre: "Marte", descripcion: "El planeta rojo" },
            { nombre: "Júpiter", descripcion: "El gigante gaseoso" },
            { nombre: "Saturno", descripcion: "Rodeado por un sistema de 10 anillos y 80 satélites naturales" },
            { nombre: "Urano", descripcion: "Urano está compuesto por una mezcla de elementos y compuestos, principalmente agua, amoníaco y metano, lo que lo califica como un gigante helado" },
            { nombre: "Neptuno", descripcion: "La estructura interna de Neptuno está compuesta mayormente por hielo y roca." }
        ];
    }

    configurarEventos() {
        // Desde lista-planetas (item seleccionado)
        this.shadowRoot.addEventListener("planeta-seleccionado", (e) => {
            this.state.planetaSeleccionado = e.detail;
            this.actualizarModal();
        });

        // Desde panel-controles (modo oscuro)
        this.shadowRoot.addEventListener("toggle-modo-oscuro", () => {
            this.state.modoOscuro = !this.state.modoOscuro;
            this.renderizar();
            this.renderizarLista();
        });

        // Desde panel-controles (filtros)
        this.shadowRoot.addEventListener("filtros-cambiados", (e) => {
            this.state.filtros = { ...this.state.filtros, ...(e.detail || {}) };
            this.aplicarFiltros();
            this.renderizarLista();
        });
    }

    aplicarFiltros() {
        const q = (this.state.filtros.q || "").toLowerCase();

        this.state.filtered = this.state.items.filter((it) => {
            if (!q) return true;
            return (
                (it.nombre || "").toLowerCase().includes(q) ||
                (it.descripcion || "").toLowerCase().includes(q)
            );
        });
    }

    renderizarLista() {
        const listaEl = this.shadowRoot.querySelector("lista-planetas");
        if (listaEl) {
            listaEl.planetas = this.state.filtered;
        }
    }

   
    actualizarModal() {
        const modal = this.shadowRoot.querySelector("modal-info");
        if (modal) {
            modal.planeta = this.state.planetaSeleccionado;
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
                    background: ${this.state.modoOscuro ? "#000" : "#0a0f1f"};
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

                <panel-controles 
                    modoOscuro="${this.state.modoOscuro}">
                </panel-controles>

                <div class="contenido">
                    <lista-planetas></lista-planetas>
                    <modal-info></modal-info>
                </div>
            </div>
        `;
    }
}

customElements.define("aplicacion-espacial", AplicacionEspacial);
