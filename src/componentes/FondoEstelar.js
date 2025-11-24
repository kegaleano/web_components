class FondoEstelar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.stars = [];
        this.numStars = 120;

        this._animFrame = null;
        this._resizeHandler = () => this.redimensionar();
    }

    connectedCallback() {
        this.configurarEstilo();
        this.shadowRoot.appendChild(this.canvas);

        this.redimensionar();
        this.inicializarEstrellas();
        this.animar();

        window.addEventListener("resize", this._resizeHandler);
    }

    disconnectedCallback() {
        window.removeEventListener("resize", this._resizeHandler);

        if (this._animFrame) {
            cancelAnimationFrame(this._animFrame);
        }
    }

    configurarEstilo() {
        const style = document.createElement("style");
        style.textContent = `
            :host {
                position: fixed;
                inset: 0;
                width: 100vw;
                height: 100vh;
                display: block;
                z-index: 0;              /* ← Ya no queda atrás del fondo del body */
                pointer-events: none;
            }

            canvas {
                width: 100%;
                height: 100%;
                display: block;
                background: transparent; /* ← Asegura que nada tape */
            }
        `;
        this.shadowRoot.appendChild(style);
    }

    redimensionar() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    inicializarEstrellas() {
        this.stars = Array.from({ length: this.numStars }, () => ({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            radius: Math.random() * 1.2 + 0.3,
            speed: Math.random() * 0.7 + 0.2,
        }));
    }

    animar() {
        const ctx = this.ctx;

        const frame = () => {
            const width = this.canvas.width;
            const height = this.canvas.height;

            ctx.clearRect(0, 0, width, height);

            for (let star of this.stars) {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = "white";
                ctx.fill();

                star.y += star.speed;

                if (star.y > height) {
                    star.y = -2;
                    star.x = Math.random() * width;
                }
            }

            this._animFrame = requestAnimationFrame(frame);
        };

        frame();
    }
}

customElements.define("fondo-estelar", FondoEstelar);
