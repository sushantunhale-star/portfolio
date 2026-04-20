/* Smooth scroll for navbar */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* Navbar active on scroll */
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(section => {
    if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
      document.querySelector('.navbar a[href="#' + section.id + '"]').style.color = '#8a2be2';
    }
  });
});

/* Cursor light effect */
const light = document.getElementById("light");

document.addEventListener("mousemove", (e) => {
    light.style.left = e.clientX + "px";
    light.style.top = e.clientY + "px";
});

/* Typing effect for hero */
const typingElement = document.querySelector('.typing');
const text = 'Sushant Basavaraj Unhale';
let i = 0;

function typeWriter() {
  if (i < text.length) {
    typingElement.textContent = text.slice(0, i + 1);
    i++;
    setTimeout(typeWriter, 100);
  }
}

setTimeout(typeWriter, 500);

/* Enhanced 3D tilt + scale */
const cards = document.querySelectorAll(".card, .hero");

cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = -(y / rect.height - 0.5) * 15;
        const rotateY = (x / rect.width - 0.5) * 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
});

/* Particles system */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 100;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }
  draw() {
  ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/* Contact form */
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const button = e.target.querySelector('button');
  button.textContent = 'Sending...';
  button.style.transform = 'scale(0.95)';
  
  setTimeout(() => {
    button.textContent = 'Sent! 🎉';
    button.style.background = 'linear-gradient(45deg, #23d5ab, #23a6d5)';
    setTimeout(() => {
      e.target.reset();
      button.textContent = 'Send Message';
      button.style.transform = '';
      button.style.background = 'linear-gradient(45deg, #00f7ff, #8a2be2)';
    }, 2000);
  }, 1500);
});

/* Enhanced scroll reveal with stagger */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add("show");
            }, index * 200);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".hidden").forEach(el => observer.observe(el));

/* Theme toggle */
const themeToggle = document.createElement('button');
themeToggle.innerHTML = '🌙';
themeToggle.className = 'theme-toggle';
themeToggle.style.cssText = `
  position: fixed; top: 20px; right: 20px; z-index: 101;
  background: rgba(255,255,255,0.1); border: none; border-radius: 50%;
  width: 50px; height: 50px; color: #00f7ff; font-size: 20px;
  cursor: pointer; backdrop-filter: blur(10px); transition: all 0.3s;
`;
document.body.appendChild(themeToggle);

let isDark = true;
themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  document.body.style.filter = isDark ? '' : 'invert(1)';
  themeToggle.innerHTML = isDark ? '🌙' : '☀️';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
