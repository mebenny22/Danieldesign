// --- Ambient Floating Particle System ---
(function initAmbientParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'ambient-particle-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 30;
  const colors = ['rgba(255, 107, 53, 0.45)', 'rgba(255, 107, 53, 0.25)', 'rgba(22, 22, 22, 0.12)'];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35 - 0.1,
      size: Math.random() * 2.5 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: Math.random() > 0.55 ? 'cross' : 'dot'
    });
  }

  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const diff = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;
    particles.forEach(p => {
      p.y -= diff * 0.08;
    });
  }, { passive: true });

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.fillStyle = p.color;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1;

      if (p.type === 'cross') {
        const len = p.size * 2;
        ctx.beginPath();
        ctx.moveTo(p.x - len, p.y);
        ctx.lineTo(p.x + len, p.y);
        ctx.moveTo(p.x, p.y - len);
        ctx.lineTo(p.x, p.y + len);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    requestAnimationFrame(render);
  }
  render();
})();

// --- Scroll Progress Bar ---
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress-bar';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  progressBar.style.width = scrolled + '%';
}, { passive: true });

// --- Section Reveal Observer ---
document.querySelectorAll('.reveal, .section-head, section, blockquote, .project, .poster, article').forEach((element, i) => {
  element.style.transitionDelay = `${Math.min((i % 5) * 65, 300)}ms`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, section, blockquote, .project, .poster, article').forEach(el => observer.observe(el));

// --- Showreel Cards Video Toggle ---
document.querySelectorAll('.reel-card').forEach(card => {
  const toggleVideo = () => {
    const video = card.querySelector('video');
    if (!video) return card.classList.toggle('playing');
    if (video.paused) {
      document.querySelectorAll('.reel-card video').forEach(other => {
        if (other !== video) {
          other.pause();
          other.closest('.reel-card').classList.remove('playing');
        }
      });
      video.play();
      card.classList.add('playing');
    } else {
      video.pause();
      card.classList.remove('playing');
    }
  };
  card.addEventListener('click', toggleVideo);
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleVideo();
    }
  });
});

// --- Contact Form ---
const form = document.getElementById('contact-form');
if (form) form.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = form.querySelector('.form-status');
  status.textContent = 'Brief received. I’ll be in touch shortly.';
  form.reset();
});

// --- Social Links Handler ---
const socialLinks = {
  linkedin: 'https://linkedin.com/in/daniel-peniel-jeba-rueben-ramesh',
  instagram: 'https://www.instagram.com/danielruben220/',
  resume: 'assets/resume/Daniel-Ruben-Resume.pdf'
};
document.querySelectorAll('a').forEach(link => {
  const label = link.textContent.trim().toLowerCase();
  if (label.includes('linkedin')) { link.href = socialLinks.linkedin; link.target = '_blank'; link.rel = 'noreferrer'; }
  if (label.includes('instagram')) { link.href = socialLinks.instagram; link.target = '_blank'; link.rel = 'noreferrer'; }
  if (label.includes('résumé') || label.includes('resume')) { link.href = socialLinks.resume; link.target = '_blank'; link.rel = 'noreferrer'; }
});

// --- Interactive 3D Parallax Tilt for Cards ---
document.querySelectorAll('.project, .poster').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 6;
    const rotateY = (x / rect.width) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
