import React, { useEffect, useRef } from 'react';

const PlexusBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    const stars = [];
    const x = 220; // More stars for denser web
    const mouse = {
      x: 0,
      y: 0
    };

    // Track hovered and clicked stars
    let hoveredStar = null;
    let clickedStar = null;

    // Star class
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4; // Slightly faster movement
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 1; // Larger, more visible dots
        this.originalSize = this.size;
        this.isHovered = false;
        this.isClicked = false;
        this.clickAnimation = 0;
        this.hoverAnimation = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Enhanced visual effects for interactions
        if (this.isClicked) {
          // Click effect - pulsing glow
          const pulseSize = this.originalSize + Math.sin(this.clickAnimation) * 3;
          ctx.beginPath();
          ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
          ctx.fill();
          
          // Inner glow
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(59, 130, 246, 1)';
          ctx.fill();
          
          // Outer ring
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size + 2, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
          ctx.lineWidth = 2;
          ctx.stroke();
        } else if (this.isHovered) {
          // Hover effect - glowing
          ctx.fillStyle = 'rgba(59, 130, 246, 1)';
          ctx.fill();
          
          // Glow effect
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size + 1, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)';
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          // Normal state
          ctx.fillStyle = 'rgba(59, 130, 246, 0.9)';
          ctx.fill();
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        // Update animation timers
        if (this.isClicked) {
          this.clickAnimation += 0.2;
        }
        
        if (this.isHovered) {
          this.hoverAnimation += 0.1;
        }
      }

      // Check if mouse is over this star
      isMouseOver(mouseX, mouseY) {
        const distance = Math.sqrt((this.x - mouseX) ** 2 + (this.y - mouseY) ** 2);
        return distance <= this.size + 5; // Slightly larger hit area
      }
    }

    // Initialize stars
    for (let i = 0; i < x; i++) {
      stars.push(new Star());
    }

    // Mouse move event
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Check for hover
      let foundHover = false;
      stars.forEach(star => {
        if (star.isMouseOver(mouse.x, mouse.y)) {
          star.isHovered = true;
          foundHover = true;
        } else {
          star.isHovered = false;
        }
      });
      
      hoveredStar = foundHover ? stars.find(star => star.isHovered) : null;
    };

    // Mouse click event
    const handleMouseClick = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Check for click
      stars.forEach(star => {
        if (star.isMouseOver(mouse.x, mouse.y)) {
          // Reset previous clicked star
          if (clickedStar && clickedStar !== star) {
            clickedStar.isClicked = false;
          }
          
          star.isClicked = !star.isClicked; // Toggle click state
          clickedStar = star.isClicked ? star : null;
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleMouseClick);

    // Animation loop
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw stars
      stars.forEach(star => {
        star.update();
        star.draw();
      });

      // Draw connections with much more visible lines
      ctx.lineWidth = 1.2; // Much thicker lines for maximum visibility
      
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) { // Larger connection distance for more webs
            // Create gradient effect based on distance
            const opacity = 1 - (distance / 150);
            
            // Enhanced connection effects for interactive stars
            let lineOpacity = opacity * 0.8;
            let lineWidth = 1.2;
            
            if (stars[i].isHovered || stars[j].isHovered) {
              lineOpacity = opacity * 1.2;
              lineWidth = 2;
            }
            
            if (stars[i].isClicked || stars[j].isClicked) {
              lineOpacity = opacity * 1.5;
              lineWidth = 2.5;
            }
            
            ctx.strokeStyle = `rgba(59, 130, 246, ${lineOpacity})`;
            ctx.lineWidth = lineWidth;
            
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleMouseClick);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: '#ffffff',
        pointerEvents: 'auto' // Changed to 'auto' to enable mouse interactions
      }}
    />
  );
};

export default PlexusBackground; 