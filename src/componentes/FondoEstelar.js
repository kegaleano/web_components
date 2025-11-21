class FondoEstelar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.numStars = 120;
    }

    connectedCallback() {
        this.shadowRoot.appendChild(this.canvas);
        this.configurarEstilo();
        this.redimensionar();
        this.inicializarEstrellas();
        this.animar();

        window.addEventListener('resize', () => this.redimensionar());
    }

    configurarEstilo() {
        const style = document.createElement('style');
        style.textContent = `
            :host {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                display: block;
                z-index: -1;
                pointer-events: none;
            }

            canvas {
                width: 100%;
                height: 100%;
                display: block;
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
            speed: Math.random() * 0.5 + 0.2
        }));
    }

    animar() {
        const ctx = this.ctx;

        const animarFrame = () => {
            const width = this.canvas.width;
            const height = this.canvas.height;

            ctx.clearRect(0, 0, width, height);

            for (let star of this.stars) {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'white';
                ctx.fill();

                star.y += star.speed;

                if (star.y > height) {
                    star.y = 0;
                    star.x = Math.random() * width;
                }
            }

            requestAnimationFrame(animarFrame);
        };

        animarFrame();
    }
}

customElements.define("fondo-estelar", FondoEstelar);
