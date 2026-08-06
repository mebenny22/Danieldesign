document.querySelectorAll('.reveal').forEach((element, i) => {
  element.style.transitionDelay = `${Math.min(i * 60, 320)}ms`;
});
const observer = new IntersectionObserver((entries) => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.querySelectorAll('.reel-card').forEach(card => {
  const toggleVideo = () => {
    const video = card.querySelector('video');
    if (!video) return card.classList.toggle('playing');
    if (video.paused) {
      document.querySelectorAll('.reel-card video').forEach(other => { if (other !== video) { other.pause(); other.closest('.reel-card').classList.remove('playing'); } });
      video.play(); card.classList.add('playing');
    } else { video.pause(); card.classList.remove('playing'); }
  };
  card.addEventListener('click', toggleVideo);
  card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleVideo(); } });
});
const form = document.getElementById('contact-form');
if (form) form.addEventListener('submit', (event) => { event.preventDefault(); const status = form.querySelector('.form-status'); status.textContent = 'Brief received. I’ll be in touch shortly.'; form.reset(); });

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
