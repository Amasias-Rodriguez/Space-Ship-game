function initCanvas() {
    const ctx = document.getElementById('my_canvas').getContext('2d');
    const backgroundImage = new Image();
    const naveImage = new Image();
    const enemiesPic1 = new Image();
    const enemiesPic2 = new Image();

    backgroundImage.src = "images/background-pic.jpg";
    naveImage.src = "images/spaceship-pic.png";

    enemiesPic1.src = "images/enemigo1.png";
    enemiesPic2.src = "images/enemigo2.png";

    const cW = ctx.canvas.width;
    const cH = ctx.canvas.height;

    let enemyTemplate = function (options) {
        return {
            id: options.id || '',
            x: options.x || '',
            y: options.y || '',
            w: options.w || '',
            h: options.h || '',
            image: options.image || enemiesPic1
        }
    }

    let enemies = [
        new enemyTemplate({ id: "enemy3", x: 350, y: 50, w: 80, h: 30 })
    ];

    let renderEnemies = function (enemyList) {
        for (let i = 0; i < enemyList.length; i++) {
            let enemy = enemyList[i]
            ctx.drawImage(enemy.image, enemy.x, enemy.y += 0.5, enemy.w, enemy.h)
        }
    }

    function Launcher() {
        this.y = 500,
            this.x = cW * 0. - 25,
            this.w = 100,
            this.h = 100,
            this.direction,
            this.bg = "white",
            this.isiles = [];

        this.render = function () {
            if (this.direction === 'left') {
                this.x -= 5;
            }
            else if (this.direction === 'right') {
                this.x += 5;
            }

            else if (this.direction === 'downArrow') {
                this.y += 5;
            }

            else if (this.direction === 'upArrow') {
                this.y -= 5;
            }
            ctx.fillStyle = this.bg;
            ctx.drawImage(backgroundImage, 10, 10);
            ctx.drawImage(naveImage, this.x, this.y, 100, 90)
        }
    }

    let launcher = new Launcher();

    function animate() {
        ctx.clearRect(0, 0, cW, cH);
        launcher.render();
        renderEnemies(enemies);
    }

    let animateInterval = setInterval(animate, 6);

    document.addEventListener('keydown', function (event) {
        if (event.key === 37) {
            launcher.direction = 'left';
            if (launcher.x < cW * 0.2 - 130) {
                launcher.x += 0;
                launcher.direction = '';
            }
        }
    })

}

window.addEventListener('load', function (event) {
    initCanvas();
})