class PanelControles extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // estado local opcional
    this._filtros = { q: "" };
  }

  static get observedAttributes() {
    return ["modoOscuro"];
  }

  attributeChangedCallback() {
    // Cuando cambia el modo desde afuera, se vuelve a dibujar
    this.renderizar();
    this.configurarEventos();
  }

  connectedCallback() {
    this.renderizar();
    this.configurarEventos();
  }

  configurarEventos() {
    const btnModo = this.shadowRoot.querySelector('#btnModo');
    const inputQ = this.shadowRoot.querySelector('#q');

    if (!btnModo || !inputQ) return; // seguridad

    btnModo.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent("toggle-modo-oscuro", { bubbles: true, composed: true })
      );
    });

    inputQ.addEventListener('input', () => {
      this._filtros.q = inputQ.value;

      this.dispatchEvent(
        new CustomEvent("filtros-cambiados", {
          detail: { ...this._filtros },
          bubbles: true,
          composed: true
        })
      );
    });
  }

  // Opción: permitir setear filtros desde afuera
  set filtros(val) {
    this._filtros = { ...this._filtros, ...val };
    this.renderizar();
    this.configurarEventos();
  }

  renderizar() {
    const modoOscuro = this.getAttribute("modoOscuro") === "true";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          gap: 8px;
          align-items: center;
          padding: 12px;
        }

        input {
          flex: 1;
          padding: 8px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          color: inherit;
        }

        button {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.2);
          cursor: pointer;
          background: transparent;
          color: inherit;
        }
      </style>

      <input id="q" type="search" placeholder="Buscar planeta..." value="${this._filtros.q || ""}"/>
      <button id="btnModo">${modoOscuro ? "Modo Claro" : "Modo Oscuro"}</button>
    `;
  }
}

customElements.define("panel-controles", PanelControles);
