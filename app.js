// dom references
const msg = document.getElementById('msg')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// make canvas full screen and change on resize
canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

// color scheme for the balls
const colors = ['#71B9E0', '#E09871', '#71E0CF', '#8CC02A', '#E07181']

// this will hold all the balls
const balls = []

class Ball {
  constructor(x, y) {
    // class gets its x and y from the click event
    this.x = x
    this.y = y
    // random directions for x and y
    this.dx = Math.random() * 12 - 6
    this.dy = Math.random() * 12 - 6
    // random radius
    this.radius = Math.random() * 30 + 20
    // properties used to slow down
    this.friction = 0.75
    this.gravity = 0.1
    // random color for the color scheme array
    this.color = generateColor()
  }

  // this will check if the ball is colliding with walls, adjust its position and reverse direction, applying some friction
  collisionDetect() {
    // right side
    if (this.x + this.radius > canvas.width) {
      this.x = canvas.width - this.radius
      this.dx = -(this.dx * this.friction)
    }
    // left side
    if (this.x - this.radius < 0) {
      this.x = this.radius
      this.dx = -(this.dx * this.friction)
    }
    // bottom
    if (this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius
      this.dx *= this.friction
      this.dy = -this.dy * this.friction
    }
    // top
    if (this.y - this.radius < 0) {
      this.y = this.radius
      this.dy = -(this.dy * this.friction)
    }
  }

  // draw the ball
  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  // update loop, draw first, change position, collision detect
  update() {
    this.draw()
    this.x += this.dx
    this.dy += this.gravity
    this.y += this.dy
    this.collisionDetect()
  }
}

// main animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // safety check in case the balls array is empty (no clicks yet)
  if (balls.length) {
    // call each ball's update method
    balls.forEach(ball => {
      ball.update()
    })
  }
  // and loop
  requestAnimationFrame(animate)
}

// call animation loop once to get the requestAnimationFrame going
animate()

// listener that creates a ball when clicked
canvas.addEventListener('click', generateBall)

// instantiate a ball and add it to the balls array
function generateBall(e) {
  // hide text
  hideMsg()

  // get the mouse position
  const x = e.offsetX
  const y = e.offsetY

  // instantiate a new ball and add it to the balls array
  const ball = new Ball(x, y)
  balls.push(ball)
}

// return a random color from the colors array
function generateColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

// hides the msg div
function hideMsg() {
  // this check makes sure we only hide the msg div if it's visible
  if (!msg.classList.contains('hide')) {
    msg.classList.add('hide')
  }
}
