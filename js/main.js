// ============================================================
// DIGITAL ARK — shared interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Nav: scrolled state + mobile toggle ---- */
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');

  const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      nav.classList.toggle('mobile-open');
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        nav.classList.remove('mobile-open');
      });
    });
  }

  /* ---- Active nav link ---- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---- Project filters (projects.html) ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('[data-category]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        projectCards.forEach(card => {
          const show = cat === 'all' || card.dataset.category === cat;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---- Contact form -> auto-sends via Web3Forms (no email app opens) ---- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const submitBtn = form.querySelector('button[type="submit"]');

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const service = form.service ? form.service.value : '';
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        status.style.color = '#e08a8a';
        status.textContent = 'Please fill in your name, email, and message.';
        return;
      }

      submitBtn.disabled = true;
      status.style.color = 'var(--gold-bright)';
      status.textContent = 'Sending…';

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: 'a05b3c48-13ad-437d-84be-714f98608c3a',
            subject: `New project inquiry from ${name} — Digital Ark website`,
            from_name: 'Digital Ark Website',
            name: name,
            email: email,
            service_interested_in: service,
            message: message
          })
        });

        const data = await res.json();

        if (data.success) {
          status.style.color = 'var(--gold-bright)';
          status.textContent = "Thanks! Your message has been sent — we'll get back to you soon.";
          form.reset();
        } else {
          status.style.color = '#e08a8a';
          status.textContent = "Something went wrong sending your message. Please try again or email us directly.";
        }
      } catch (err) {
        status.style.color = '#e08a8a';
        status.textContent = "Couldn't send right now. Please check your connection or email us directly.";
      }

      submitBtn.disabled = false;
    });
  }

});
