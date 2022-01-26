const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const circles = []

class Circle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.dx = Math.random() * 8 - 4
    this.dy = Math.random() * 8 - 4
    this.radius = Math.random() * 30 + 20
    this.friction = 0.75
    this.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`
  }

  collisionDetect() {
    if (this.x + this.radius > canvas.width) {
      this.dx = -this.dx
    }
    if (this.x - this.radius < 0) {
      this.dx = -this.dx
    }
    if (this.y + this.radius > canvas.height) {
      this.dy = -this.dy * this.friction
    }
    if (this.y - this.radius < 0) {
      this.dy = -this.dy
    }
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  update() {
    this.draw()
    this.x += this.dx
    this.y += this.dy
    this.collisionDetect()
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (circles.length) {
    circles.forEach(circle => {
      circle.update()
    })
  }
  requestAnimationFrame(animate)
}

animate()

canvas.addEventListener('click', generateCircle)

function generateCircle(e) {
  const x = e.offsetX
  const y = e.offsetY

  const circle = new Circle(x, y)
  circles.push(circle)
}
