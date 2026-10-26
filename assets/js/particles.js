(() => {
  'use strict';
    const canvas = document.getElementById('constellationCanvas');
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId;

    let width, height;
    let sphereParticles = [];
    let ambientParticles = [];
    
    const SPHERE_COUNT = window.innerWidth <= 768 ? 500 : 1000; // Quantidade de partículas para a esfera densa
    const AMBIENT_COUNT = 70;   // Partículas flutuantes dispersas

    // Paleta de Cores do DESIGN.md
    const colors = [
      '#8052ff', // Electric Iris (Violeta Principal)
      '#ffb829', // Saffron Spark (Âmbar)
      '#15846e', // Deep Verdant (Teal)
      '#a855f7', // Purple/Magenta
      '#3b82f6', // Blue accent
      '#ffffff'  // Bone White highlight
    ];

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    // Partícula da Esfera 3D
    class SphereParticle {
      constructor() {
        this.reset();
      }

      init(index, total) {
        // Distribuição esférica de Fibonacci
        const phi = Math.acos(-1 + (2 * index) / total);
        const theta = Math.sqrt(total * Math.PI) * phi;

        // Dimensão ajustada perfeitamente conforme o tamanho da tela (Mobile vs Desktop)
        const isMobile = width <= 768;
        this.radius = isMobile ? width * 0.45 : Math.min(width, height) * 0.35;

        this.baseX = this.radius * Math.sin(phi) * Math.cos(theta);
        this.baseY = this.radius * Math.sin(phi) * Math.sin(theta);
        this.baseZ = this.radius * Math.cos(phi);

        this.size = Math.random() * 3.5 + 1.8;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
      }

      reset() {
        this.baseX = 0;
        this.baseY = 0;
        this.baseZ = 0;
        this.size = 2;
        this.color = colors[0];
        this.rotation = 0;
        this.rotSpeed = 0;
      }

      project(angleX, angleY) {
        // Rotação 3D em torno dos eixos Y e X
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);

        // Rotação no eixo Y
        let x1 = this.baseX * cosY - this.baseZ * sinY;
        let z1 = this.baseZ * cosY + this.baseX * sinY;

        // Rotação no eixo X
        let y1 = this.baseY * cosX - z1 * sinX;
        let z2 = z1 * cosX + this.baseY * sinX;

        // Perspectiva
        const perspective = 700;
        const scale = perspective / (perspective + z2 + 250);

        // POSICIONAMENTO DA ANIMAÇÃO: Na parte SUPERIOR DO SITE
        // No celular: Centralizado no topo da página
        // No desktop: No topo, ligeiramente deslocado à direita
        const isMobile = width <= 768;
        const centerX = isMobile ? width * 0.5 : width * 0.65;
        const centerY = isMobile ? 180 : 220; // Fixo no topo do site

        const screenX = centerX + x1 * scale;
        const screenY = centerY + y1 * scale;
        const alpha = Math.max(0.12, (z2 + this.radius) / (2 * this.radius));

        return {
          x: screenX,
          y: screenY,
          scale: scale,
          alpha: alpha,
          z: z2
        };
      }

      draw(proj) {
        ctx.save();
        ctx.translate(proj.x, proj.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = proj.alpha * 0.9;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;

        const scaledSize = this.size * proj.scale;

        // Desenhar triângulo
        ctx.beginPath();
        ctx.moveTo(0, -scaledSize);
        ctx.lineTo(scaledSize, scaledSize);
        ctx.lineTo(-scaledSize, scaledSize);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
      }
    }

    // Partícula Flutuante de Fundo (Ambient)
    class AmbientParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 4 + 2;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.35 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += 0.005;

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.lineTo(this.size, this.size);
        ctx.lineTo(-this.size, this.size);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
      }
    }

    let rotAngleX = 0.2;
    let rotAngleY = 0;

    function initParticles() {
      sphereParticles = [];
      for (let i = 0; i < SPHERE_COUNT; i++) {
        const p = new SphereParticle();
        p.init(i, SPHERE_COUNT);
        sphereParticles.push(p);
      }

      ambientParticles = [];
      for (let i = 0; i < AMBIENT_COUNT; i++) {
        ambientParticles.push(new AmbientParticle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Rotação suave contínua
      rotAngleY += 0.0035;
      rotAngleX += 0.001;

      // Desenhar partículas de ambiente
      ambientParticles.forEach(p => {
        p.update();
        p.draw();
      });

      // Rotação e projeção da esfera do topo
      const projectedSphere = sphereParticles.map(p => {
        p.rotation += p.rotSpeed;
        return {
          particle: p,
          proj: p.project(rotAngleX, rotAngleY)
        };
      });

      // Ordenar por Z
      projectedSphere.sort((a, b) => a.proj.z - b.proj.z);

      // Renderizar partículas
      projectedSphere.forEach(item => {
        item.particle.draw(item.proj);
      });

      if (!reducedMotion.matches && !document.hidden) frameId = requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    function start() {
      cancelAnimationFrame(frameId);
      resizeCanvas();
      initParticles();
      animateParticles();
    }
    document.addEventListener('visibilitychange', () => {
      cancelAnimationFrame(frameId);
      if (!document.hidden) animateParticles();
    });
    reducedMotion.addEventListener('change', start);
    start();
})();
