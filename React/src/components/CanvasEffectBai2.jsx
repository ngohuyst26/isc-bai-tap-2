import { useEffect, useRef, useState } from "react";
const CanvasEffect2 = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("blue");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let x = 100;
    let y = 100;
    let animationFrameId;

    const draw = (x, y) => {
      const length = 300;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + length, y + length);
      ctx.stroke();
    };

    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, "white");
      gradient.addColorStop(1, "white");
      return gradient;
    };

    const animate = () => {
      ctx.strokeStyle = createGradient();
      draw(x, y);
      x += 2;
      y += 0.5;

      if (x >= 1025) {
        setColor((prevColor) => (prevColor === "red" ? "blue" : "red")); // Đổi màu
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas
        x = 0;
        y = 0;
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [color]); // Re-run khi `color` thay đổi

  return <canvas ref={canvasRef} id="canvas1" className="absolute top-0 left-0 w-full h-full"></canvas>;
};

export default CanvasEffect2;
