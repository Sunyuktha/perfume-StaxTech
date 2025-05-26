// Scroll to products section when offer image clicked
document.querySelectorAll('.offers td').forEach(cell => {
  cell.addEventListener('click', () => {
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Smooth scroll for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Contact form submission handler
document.querySelector('.contact-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const message = this.querySelector('textarea').value;

  if (name && email && message) {
    alert(`Thanks, ${name}! Your message has been sent.`);
    this.reset(); // Clear the form
  } else {
    alert('Please fill out all fields before submitting.');
  }
});
9