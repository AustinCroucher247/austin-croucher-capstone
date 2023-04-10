import projectileSound from '../../assets/audio/shoot.wav'
// import invaderKilled from '../spaceinvaders/Assets/invaderkilled.wav'
import playerKilled from '../../assets/audio/explosion.wav'
// import backgroundMusic from '../spaceinvaders/Assets/backgroundMusic.wav'
import gameOver from '../../assets/audio/GameOver.wav'
// import invaderKilled2 from '../../assets/audio/invaderKilled2.wav'
import invaderImg from '../../../src/assets/invader.png'
import playerImg from '../../../src/assets/spaceship.png'

let game = {
    over: false,
    active: true
};

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

function keyHandler({ key, type }) {
    if (type === 'keydown') {
        if (key === 'a') {
            keys.a.pressed = true;
        }
        if (key === 'd') {
            keys.d.pressed = true;
        }
        if (key === ' ') {
            keys.space.pressed = true;
        }
    } else if (type === 'keyup') {
        if (key === 'a') {
            keys.a.pressed = false;
        }
        if (key === 'd') {
            keys.d.pressed = false;
        }
        if (key === ' ') {
            keys.space.pressed = false;
        }
    }
}




// Game logic goes here
game.mount = (canvas, score, handleScore, postScore, setShowGameOverModal, socketRef, playerMode) => {
    canvas.width = 1075
    canvas.height = 620
    console.log(postScore)

    console.log('mount was called');

    const c = canvas.getContext('2d');

    class Player {
        constructor() {
            this.velocity = {
                x: 0,
                y: 0
            }
            this.rotation = 0
            this.opacity = 1
            this.image = new Image()
            this.image.src = playerImg
            this.width = 0
            this.height = 0
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
                //player spwans in the middle of the screen 'width/2' and at the bottom 'this.height' 
                //but 20px higher than bottom

            }
            this.image.onload = () => {
                const scale = 0.15
                this.width = this.image.width * scale
                this.height = this.image.height * scale
                this.position = {
                    x: canvas.width / 2 - this.width / 2,
                    y: canvas.height - this.height - 20
                }
            }
            this.audio = new Audio(playerKilled);
            this.audio = new Audio(gameOver)
            this.audio.volume = 0.5
        }

        draw() {
            c.save()
            c.globalAlpha = this.opacity
            c.translate(
                player.position.x + player.width / 2,
                player.position.y + player.height / 2)

            c.rotate(this.rotation)

            c.translate(
                -player.position.x - player.width / 2,
                -player.position.y - player.height / 2)

            c.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            )
            c.restore()
        }

        update() {
            if (this.image) {
                this.draw()
                this.position.x += this.velocity.x
            }
        }
        playSoundEffect() {
            this.audio.play();
        }
    }
    class Projectile {
        constructor({ position, velocity }) {
            this.position = position
            this.velocity = velocity

            this.radius = 4
            this.audio = new Audio(projectileSound);
            this.audio.volume = 0.1
            this.hasPlayedAudio = false; // new flag
        }
        draw() {
            c.beginPath()
            c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
            c.fillStyle = 'red'
            c.fill()
            c.closePath()
        }
        update() {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            if (this.velocity.y < 0 && this.position.y < canvas.height && !this.hasPlayedAudio) { // check flag before playing audio
                this.audio.play();
                this.hasPlayedAudio = true; // set flag to true
            }
        }
    }
    class Particle {
        constructor({ position, velocity, radius, color, fades }) {
            this.position = position
            this.velocity = velocity

            this.radius = radius
            this.color = color
            this.opacity = 1
            this.fades = fades

        }
        draw() {
            c.save()
            c.globalAlpha = this.opacity
            c.beginPath()
            c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
            c.fillStyle = this.color
            c.fill()
            c.closePath()
            c.restore()
        }
        update() {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y

            if (this.fades)
                this.opacity -= 0.1
        }
    }
    class InvaderProjectile {
        constructor({ position, velocity }) {
            this.position = position
            this.velocity = velocity
            this.width = 4
            this.height = 12
        }
        draw() {
            c.fillStyle = 'lime'
            c.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
        update() {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }

    // eslint-disable-next-line 
    function checkInvaderCollisionWithPlayer(invader, player) {
        const distanceX = Math.abs(invader.position.x + invader.width / 2 - (player.position.x + player.width / 2));
        const distanceY = Math.abs(invader.position.y + invader.height / 2 - (player.position.y + player.height / 2));

        const minDistanceX = invader.width / 2 + player.width / 2;
        const minDistanceY = invader.height / 2 + player.height / 2;

        return distanceX < minDistanceX && distanceY < minDistanceY;
    }

    class Invader {
        constructor({ position }) {
            this.velocity = {
                x: 0,
                y: 0
            }
            this.image = new Image()
            this.image.src = invaderImg
            this.width = 31
            this.height = 39
            this.position = position;
            this.imagePromise = new Promise((resolve, reject) => {
                this.image.onload = () => {
                    resolve();
                    const scale = 1
                    this.width = this.image.width * scale
                    this.height = this.image.height * scale
                    this.position = {
                        x: position.x,
                        y: position.y
                    }
                }
            })

            // Create audio object for sound effect
            // this.audio = new Audio(invaderKilled2);
            // this.audio.volume = 0.5
        }

        draw() {
            this.imagePromise.then(() => {
                c.drawImage(
                    this.image,
                    this.position.x,
                    this.position.y,
                    this.width,
                    this.height
                )
            })
        }

        update({ velocity }) {
            if (this.image) {
                this.draw()
                this.position.x += velocity.x
                this.position.y += velocity.y
            }
        }

        shoot(InvaderProjectiles) {
            InvaderProjectiles.push(new InvaderProjectile({
                position: {
                    x: this.position.x + this.width / 2,
                    y: this.position.y + this.height
                },
                velocity: {
                    x: 0,
                    y: 18
                }
            }))
        }

        // Play sound effect when invader is killed
        // playSoundEffect() {
        //     this.audio.play();
        // }
    }
    class Grid {
        constructor() {
            this.position = {
                x: 0,
                y: 0,
            }
            this.velocity = {
                x: 11.5,
                y: 0
            }
            this.invaders = [
                new Invader({
                    position: {
                        x: 0,
                        y: 0
                    }
                })
            ]

            const columns = Math.floor(Math.random() * 10 + 5)
            const rows = Math.floor(Math.random() * 5 + 2)

            this.width = columns * 30

            for (let x = 0; x < columns; x++) {
                for (let y = 0; y < rows; y++) {
                    this.invaders.push(new Invader({
                        position: {
                            x: x * 30,
                            y: y * 30
                        }
                    }))
                }
            }
        }
        update() {

            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            this.velocity.y = 0

            if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
                this.velocity.x = -this.velocity.x
                this.velocity.y = 75
            }

        }

    }



    let projectiles = []
    let grids = []
    let invaderProjectiles = []
    let particles = []
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle({
            position: {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height
            },
            velocity: {
                x: 0,
                y: 5.5
            },
            radius: Math.random() * 3,
            color: 'white'
        }))
    }



    function createParticles({ object, color, fades }) {
        for (let i = 0; i < 15; i++) {
            particles.push(new Particle({
                position: {
                    x: object.position.x + object.width / 2,
                    y: object.position.y + object.height / 2
                },
                velocity: {
                    x: (Math.random()) * 8,
                    y: (Math.random()) * 8
                },
                radius: Math.random() * 3,
                color: color || '#CBC3E3',
                fades: true
            }))
        }
    }
    let player = new Player()
    canvas.width = 1075
    canvas.height = 620
    let frames = 0
    let randomInterval = (Math.floor(Math.random() * 125) + 125)


    // eslint-disable-next-line no-restricted-globals
    addEventListener('keydown', keyHandler);

    const animate = () => {

        c.fillStyle = 'black';
        c.fillRect(0, 0, canvas.width, canvas.height);
        player.update()
        grids.forEach((grid, gridIndex) => {
            grid.update()
            if (frames % 70 === 0 && grid.invaders.length > 0) {
                grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(
                    invaderProjectiles
                )
            }

            grid.invaders.forEach((invader, i) => {
                invader.update({ velocity: grid.velocity })

                projectiles.forEach((projectile, j) => {
                    if (projectile.position.y - projectile.radius <= invader.position.y + invader.height &&
                        projectile.position.x - projectile.radius <= invader.position.x + invader.width &&
                        projectile.position.x + projectile.radius >= invader.position.x &&
                        projectile.position.y + projectile.radius >= invader.position.y) {


                        setTimeout(() => {
                            const invaderFound = grid.invaders.find(invader2 =>
                                invader2 === invader);
                            const projectileFound = projectiles.find(
                                projectile2 => projectile2 === projectile);



                            if (invaderFound && projectileFound) {
                                score += 100
                                handleScore(100)
                                score = score.innerHTML
                                createParticles({
                                    object: invader,
                                    fades: true
                                })
                                // invader.playSoundEffect();

                                grid.invaders.splice(i, 1);
                                projectiles.splice(j, 1);

                                if (grid.invaders.length > 0) {
                                    const firstInvader = grid.invaders[0]
                                    const lastInvader = grid.invaders[grid.invaders.length - 1]
                                    grid.width = lastInvader.position.x - firstInvader.position.x
                                        + lastInvader.width
                                    grid.position.x = firstInvader.position.x
                                } else {
                                    grids.splice(gridIndex, 1)
                                }
                            }
                        }, 0);
                    }
                });
            });
        });

        if (keys.a.pressed && player.position.x >= 0) {
            player.velocity.x = - 20
            player.rotation = -.15
        } else if (
            keys.d.pressed &&
            player.position.x + player.width <= canvas.width
        ) {
            player.velocity.x = 20
            player.rotation = 0.15
        } else {
            player.velocity.x = 0
            player.rotation = 0
        }
        if (frames % randomInterval === 0) {
            grids.push(new Grid())
            randomInterval = (Math.floor(Math.random() * 100) + 75)
            frames = 0
        }

        frames++
        projectiles.forEach((projectile, index) => {
            if (projectile.position.y + projectile.radius <= 0) {
                setTimeout(() => {
                    projectiles.splice(index, 1)

                }, 0)
            } else {
                projectile.update()
            }
        })

        invaderProjectiles.forEach((invaderProjectile, index) => {
            if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height) {
                setTimeout(() => {
                    invaderProjectiles.splice(index, 1);
                }, 0);
            } else
                invaderProjectile.update()

            //projectile hits player. The if statement insures that the projectile has to hit the middle of the player
            //in order to actually register as a hit and destroy
            if (invaderProjectile.position.y + invaderProjectile.height >=
                player.position.y && invaderProjectile.position.x +
                invaderProjectile.width >= player.position.x &&
                invaderProjectile.position.x <= player.position.x +
                player.width) {

                // Play sound effect when player is hit
                player.playSoundEffect();


                setTimeout(() => {
                    invaderProjectiles.splice(index, 1)
                    player.opacity = 0
                    game.active = true


                }, 0)
                setTimeout(() => {
                    setShowGameOverModal(true);
                }, 100);
                setTimeout(() => {
                    game.unmount();
                    postScore();
                }, 500);


                createParticles({
                    object: player,
                    color: 'white',
                    fades: true
                })
            }

        })

        particles.forEach((particle, i) => {
            if (particle.position.y - particle.radius >= canvas.height) {
                particle.position.x = Math.random() * canvas.width
                particle.position.y = -particle.radius
            }
            if (particle.opacity <= 0) {
                setTimeout(() => {
                    particles.splice(i, 1)

                }, 0)
            } else {
                particle.update()

            }

        });
    };




    if (playerMode) {
        game.intervalId = setInterval(() => {
            animate();

            if (frames % 2 === 0) {
                socketRef.current.emit('updateGameState', {
                    player,
                    grids,
                    frames,
                    projectiles,
                    particles,
                    invaderProjectiles,
                });
            }


        }, 50);

    }

    else {
        socketRef.current.on('updateGameState', state => {

            // Update state
            player.position = state.player.position;
            player.rotate = state.player.rotate;
            projectiles = state.projectiles.map(projectile => new Projectile(projectile));
            particles = state.particles.map(particle => new Particle(particle));
            invaderProjectiles = state.invaderProjectiles.map(invaderProjectile => new InvaderProjectile(invaderProjectile));
            state.grids.forEach(grid => {
                grid.invaders.forEach(invader => {
                    new Invader(invader).draw();
                })
            })
            c.fillStyle = 'black';
            c.fillRect(0, 0, canvas.width, canvas.height);
            player.draw();
            particles.forEach(particle => particle.draw());
            projectiles.forEach(projectile => projectile.draw())
            invaderProjectiles.forEach(invaderProjectile => invaderProjectile.draw())

        })
    }


    document.addEventListener('keydown', (event) => {
        if (event.key === ' ' && !keys.space.pressed) {
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: -45
                }
            }));
        }
    });
    document.addEventListener('keyup', keyHandler);
};

game.unmount = () => {
    console.log('unmount was called');
    clearInterval(game.intervalId);
    // eslint-disable-next-line no-restricted-globals
    removeEventListener('keydown', keyHandler);

};


export default game;

            // grids.forEach(grid => {
            //     grid.invaders.forEach(invader => invader.draw());
            // });