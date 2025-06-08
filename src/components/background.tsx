"use client";

import React, { useEffect, useRef } from "react";

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Set canvas dimensions
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create gradient background
    function drawGradientBackground() {
      if (!ctx || !canvas) return;
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#1e0d3b");
      gradient.addColorStop(0.5, "#2d1155");
      gradient.addColorStop(1, "#170b2e");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        if (!canvas) {
          this.x = 0;
          this.y = 0;
          this.size = 0;
          this.speedX = 0;
          this.speedY = 0;
          this.color = 'rgba(0, 0, 0, 0)';
          return;
        }
        
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 0.8 - 0.4;
        
        // Purple color palette
        const colors = [
          'rgba(114, 9, 183, 0.6)',   // Vivid purple
          'rgba(140, 82, 255, 0.6)',   // Medium purple
          'rgba(80, 40, 200, 0.6)',    // Blue-ish purple
          'rgba(173, 127, 229, 0.6)',  // Light purple
          'rgba(91, 33, 182, 0.6)'     // Deep purple
        ];
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (!canvas) return;
        
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Only create particles if canvas exists
    if (!canvas) return;
    
    // Create particles - optimal count for performance
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 25000));
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Draw connections between particles
    function drawConnections() {
      if (!ctx || !canvas) return;
      const maxDistance = 170;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(140, 82, 255, ${opacity * 0.3})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // Animation loop with frame limiting for performance
    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;
    
    function animate(timestamp: number) {
      // Throttle framerate
      if (timestamp - lastTime < interval) {
        requestAnimationFrame(animate);
        return;
      }
      
      lastTime = timestamp;
      
      if (!ctx || !canvas) return;
      
      // Draw gradient background
      drawGradientBackground();
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      drawConnections();
      
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10"
    />
  );
} 