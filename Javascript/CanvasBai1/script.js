window.onload = function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const effect = new CanvasEffect(ctx, canvas.width, canvas.height);
  effect.animate();
};

class CanvasEffect {
  #ctx;
  #width;
  #height;

  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#width = width;
    this.#height = height;
    this.color = "yellow"; // Màu của hình tròn
    this.x = this.#width / 2; // Tọa độ X giữa màn hình
    this.y = this.#height / 2; // Tọa độ Y giữa màn hình
    this.radius = 10; // Bán kính ban đầu của hình tròn
  }

  #drawCircle() {
    this.#ctx.beginPath();
    this.#ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.#ctx.lineTo(this.x, this.y);
    this.#ctx.fillStyle = this.color;
    this.#ctx.fill();
    this.#ctx.stroke();
    this.#ctx.strokeStyle = "white";
  }

  animate() {
    this.#ctx.clearRect(0, 0, this.#width, this.#height); // Xóa canvas trước khi vẽ lại
    this.#drawCircle();
    this.radius += 0.3; // Tăng bán kính của hình tròn

    if (this.radius >= 250) {
      this.radius = 20; // Reset lại kích thước ban đầu khi đạt giới hạn
    }

    requestAnimationFrame(this.animate.bind(this)); // Tiếp tục vẽ
  }
}
