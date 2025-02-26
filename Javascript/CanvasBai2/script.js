window.onload = function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const Effect = new CanvasEffect(ctx, canvas.width, canvas.height);
  Effect.animate();
};
class CanvasEffect {
  #ctx;
  #width;
  #height;

  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#width = width;
    this.#height = height;
    this.color = "blue";
    console.log("Load hiệu ứng");
    this.x = 0;
    this.y = 0;
    this.gradient;
  }
  #draw(x, y) {
    const length = 300;
    this.#ctx.beginPath();
    this.#ctx.moveTo(x, y);
    this.#ctx.lineTo(x + length, y + length);
    this.#ctx.stroke();
  }
  #colorGradient() {
    this.gradient = this.#ctx.createLinearGradient(
      0,
      0,
      this.#width,
      this.#height
    );
    this.gradient.addColorStop(0, this.color);
    this.gradient.addColorStop(0.5, "white");
    this.gradient.addColorStop(1, "white");
  }
  animate() {
    this.#draw(this.x, this.y);
    this.x += 2;
    this.y += 0.5;
    if (this.x >= 1025) {
      this.color = this.color === "red" ? "blue" : "red";
      this.#ctx.clearRect(0, 0, this.#width, this.#height);
      this.x = 0; // Reset x về 0
      this.y = 0; // Reset y về 0
    }
    requestAnimationFrame(this.animate.bind(this));
    this.#colorGradient();
    this.#ctx.strokeStyle = this.gradient;
  }
}
