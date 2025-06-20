const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')

// Setting the width and height of canvas
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// It return the random no. between the min & max argument 
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// It creates a random rgb color in rgb string
function randomrgb(){
    return `rgb(${random(0, 255)} ${random(0, 255)} ${random(0, 255)})`
}

// Creating the class named ball
class Ball {

// defining the structure of the ball
  constructor(x, y, velx, vely, color, size) {
    this.collisionCount = 0;
    this.x = x;
    this.y = y;
    this.velx = velx;
    this.vely = vely;
    this.color = color;
    this.size = size;
  }

// creating the function draw()
  draw(){
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x , this.y , this.size , 0 , 2*Math.PI)
    ctx.fill()
  }

// updating the ball 
  update(){

    if (this.x + this.size >= width) {
        this.velx =- this.velx;
    }

    if (this.x - this.size <= 0) {
        this.velx =- this.velx;
    }

    if (this.y + this.size >= height) {
      this.vely =- this.vely;
    }

    if (this.y - this.size <= 0) {
      this.vely =- this.vely;
    }

    this.x += this.velx;
    this.y += this.vely;
  }

// Adding collision function so ball know when they hit another ball
  collision(){
    for (const ball of balls){

// In this we check that loop & condition is on the same ball 
      if(this !== ball){
        const dx = this.x - ball.x
        const dy = this.y - ball.y
        const distance = Math.sqrt(dx * dx + dy * dy)
// In this we change the color of ball if its collide
        if (distance < this.size + ball.size){
          ball.color = this.color = randomrgb()
        }
// IN this we changes the trajectory of collides balls
        if (this.collisionCount > 1 && ball.collisionCount > 1) {
          // Swap velocities (basic physics)
          const tempVelX = this.velx;
          const tempVelY = this.vely;

          this.velx = ball.velx;
          this.vely = ball.vely;

          ball.velx = tempVelX;
          ball.vely = tempVelY;
        }
      }
    }
  }
}

const testBall = new Ball(60, 200, 4, 4, "blue", 13);

testBall.x;
testBall.size;
testBall.color;
testBall.draw();

// Creating more balls in canvas
const balls = []

while (balls.length <25){
  const size = random(10,20)
  const ball = new Ball(
    random(0+size , width - size), // x cordinate of the ball
    random(0+size , height - size), // y cordinate of the ball
    random(-7,7), // velx means the velocity of ball in horizontly
    random(-7,7), // vely means the velocity of ball in vertically
    randomrgb(), // creates a random rgb 
    size // give the size of ball between 10 & 20 as we declare it above
  )
  balls.push(ball)
  console.log(ball)
}

// this loop function creates the ball on canvas
function loop(){
  ctx.fillStyle = "rgb(0 0 0 / 25%)"
  ctx.fillRect(0 , 0 , width , height)
  for (const ball of balls){
    ball.draw()
    ball.update()
    ball.collision()
  }
  requestAnimationFrame(loop)
}
loop();

