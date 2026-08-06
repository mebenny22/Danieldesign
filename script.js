document.querySelectorAll('.reveal').forEach((element, i) => {
  element.style.transitionDelay = `${Math.min(i * 60, 320)}ms`;
});
const observer = new IntersectionObserver((entries) => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.querySelectorAll('.reel-card').forEach(card => card.addEventListener('click', () => card.classList.toggle('playing')));
const form = document.getElementById('contact-form');
if (form) form.addEventListener('submit', (event) => { event.preventDefault(); const status = form.querySelector('.form-status'); status.textContent = 'Brief received. I’ll be in touch shortly.'; form.reset(); });
