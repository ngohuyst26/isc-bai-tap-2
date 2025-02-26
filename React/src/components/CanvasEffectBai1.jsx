import { useEffect, useRef, useState } from "react";
const CanvasEffect1 = () => {
  const canvasRef = useRef(null);
  const [reset, setReset] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let radius = 10;
    let color = "yellow";
    let animationFrameId;


    const draw = (x, y) => {
      ctx.beginPath();
      ctx.arc(x,y, radius, 0, Math.PI * 2);
      ctx.lineTo(x, y);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = "white";
    };

    const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas trước khi vẽ lại
      draw(x, y);
      radius += 0.3;
      if (radius >= 250) {
        radius = 20; // Reset lại kích thước ban đầu khi đạt giới hạn
        setReset(!reset);
      }
    animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [reset]); // Re-run khi `color` thay đổi

  return <canvas ref={canvasRef} id="canvas2" className=""></canvas>;
};

export default CanvasEffect1;
