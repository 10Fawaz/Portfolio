// Smooth scroll
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Fade-in sections
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
sections.forEach(section => sectionObserver.observe(section));

// Skills animation
const skillSections = document.querySelectorAll('.progress');
const skillObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progress = entry.target;
      const value = parseInt(progress.getAttribute('data-skill'));
      const percentElem = progress.parentElement.nextElementSibling;
      progress.style.width = value + '%';
      let count = 0;
      const interval = setInterval(() => {
        if (count >= value) clearInterval(interval);
        else percentElem.textContent = (++count) + '%';
      }, 15);
      observer.unobserve(progress);
    }
  });
}, { threshold: 0.5 });
skillSections.forEach(skill => skillObserver.observe(skill));

// Typing effect
const typingElement = document.querySelector(".typing");
const words = ["Fawaz", "a Developer", "a Cybersecurity Student"];
let wordIndex = 0, charIndex = 0, isDeleting = false;
function typeEffect() {
  const currentWord = words[wordIndex];
  typingElement.textContent = currentWord.substring(0, charIndex);
  if (!isDeleting) charIndex++; else charIndex--;
  if (!isDeleting && charIndex === currentWord.length) { isDeleting = true; setTimeout(typeEffect, 1000); return; }
  if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; }
  setTimeout(typeEffect, isDeleting ? 80 : 120);
}
typeEffect();
