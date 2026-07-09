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

  /* ---- Contact form -> mailto ---- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const service = form.service ? form.service.value : '';
      const message = form.message.value.trim();
      const status = document.getElementById('form-status');

      if (!name || !email || !message) {
        status.textContent = 'Please fill in your name, email, and message.';
        status.style.color = '#e08a8a';
        return;
      }

      const subject = encodeURIComponent(`New project inquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nService interested in: ${service}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:philip.webdeveloper@gmail.com?subject=${subject}&body=${body}`;

      status.style.color = 'var(--gold-bright)';
      status.textContent = 'Opening your email app to send this message…';
      form.reset();
    });
  }

});

document.addEventListener("DOMContentLoaded", () => {
    const chatbox = document.getElementById("fb-customer-chat");

    if (chatbox) {
        chatbox.setAttribute("page_id", "680290905177760");
        chatbox.setAttribute("attribution", "biz_inbox");
    }
});

.ai-chat-fab {
  position: fixed;
  right: 24px;
  bottom: 96px; /* stacked above the Messenger button at bottom:24px */
  z-index: 999;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--gold-bright), var(--gold));
  box-shadow: 0 10px 28px -6px rgba(46,140,255,0.6);
  color: #05070a;
  cursor: pointer;
  transition: transform .35s cubic-bezier(0.16,1,0.3,1), box-shadow .35s cubic-bezier(0.16,1,0.3,1);
}
.ai-chat-fab:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 16px 34px -6px rgba(46,140,255,0.75); }
.ai-chat-fab svg { width: 26px; height: 26px; }

/* If you are NOT using the Messenger button, change bottom: 96px above to bottom: 24px */

.ai-chat-window {
  position: fixed;
  right: 24px;
  bottom: 168px;
  z-index: 1000;
  width: 360px;
  max-width: calc(100vw - 32px);
  height: 480px;
  max-height: calc(100vh - 200px);
  background: #0a0d12;
  border: 1px solid rgba(233, 238, 245, 0.08);
  border-radius: 20px;
  box-shadow: 0 30px 60px -12px rgba(0,0,0,0.6);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 0;
  transform: translateY(16px) scale(0.98);
  pointer-events: none;
  transition: opacity .3s cubic-bezier(0.16,1,0.3,1), transform .3s cubic-bezier(0.16,1,0.3,1);
}
.ai-chat-window.open {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

.ai-chat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(233, 238, 245, 0.08);
  background: linear-gradient(135deg, rgba(46,140,255,0.14), transparent);
}
.ai-chat-header img { width: 34px; height: 34px; flex-shrink: 0; }
.ai-chat-header div { flex: 1; display: flex; flex-direction: column; line-height: 1.3; }
.ai-chat-header strong { font-family: 'Space Grotesk', sans-serif; font-size: 14.5px; color: #e9eef5; }
.ai-chat-header span { font-size: 12px; color: #8fa3bd; }
.ai-chat-header button {
  background: none; border: none; color: #8fa3bd; cursor: pointer;
  padding: 4px; display: flex; transition: color .2s;
}
.ai-chat-header button:hover { color: #e9eef5; }
.ai-chat-header button svg { width: 18px; height: 18px; }

.ai-chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.ai-chat-messages::-webkit-scrollbar { width: 6px; }
.ai-chat-messages::-webkit-scrollbar-thumb { background: rgba(233,238,245,0.15); border-radius: 999px; }

.ai-msg {
  max-width: 84%;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
}
.ai-msg-bot {
  align-self: flex-start;
  background: #10233a;
  color: #e9eef5;
  border-bottom-left-radius: 4px;
}
.ai-msg-user {
  align-self: flex-end;
  background: linear-gradient(135deg, #22e0ff, #2e8cff);
  color: #05070a;
  font-weight: 500;
  border-bottom-right-radius: 4px;
}
.ai-msg-typing {
  align-self: flex-start;
  display: flex;
  gap: 4px;
  padding: 12px 14px;
  background: #10233a;
  border-radius: 14px;
  border-bottom-left-radius: 4px;
}
.ai-msg-typing span {
  width: 6px; height: 6px; border-radius: 50%;
  background: #8fa3bd;
  animation: ai-typing 1.2s infinite ease-in-out;
}
.ai-msg-typing span:nth-child(2) { animation-delay: .2s; }
.ai-msg-typing span:nth-child(3) { animation-delay: .4s; }
@keyframes ai-typing {
  0%, 60%, 100% { transform: translateY(0); opacity: .5; }
  30% { transform: translateY(-4px); opacity: 1; }
}

.ai-chat-input-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px;
  border-top: 1px solid rgba(233, 238, 245, 0.08);
}
.ai-chat-input-row input {
  flex: 1;
  background: #10233a;
  border: 1px solid rgba(233, 238, 245, 0.08);
  border-radius: 999px;
  padding: 11px 16px;
  color: #e9eef5;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
}
.ai-chat-input-row input:focus { outline: none; border-color: #2e8cff; }
.ai-chat-input-row button {
  width: 40px; height: 40px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #22e0ff, #2e8cff);
  color: #05070a;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform .2s;
}
.ai-chat-input-row button:hover { transform: scale(1.06); }
.ai-chat-input-row button svg { width: 17px; height: 17px; }
.ai-chat-input-row button:disabled { opacity: .5; cursor: not-allowed; transform: none; }

@media (max-width: 600px) {
  .ai-chat-fab { right: 16px; bottom: 84px; width: 54px; height: 54px; }
  .ai-chat-window { right: 16px; bottom: 148px; width: calc(100vw - 32px); }
}

/* ---------------- Quick-reply chips (FAQ bot) ---------------- */
.faq-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}
.faq-chip {
  background: #10233a;
  border: 1px solid rgba(46,140,255,0.35);
  color: #e9eef5;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: background .25s, border-color .25s, transform .2s;
  font-family: 'Inter', sans-serif;
}
.faq-chip:hover {
  background: rgba(46,140,255,0.16);
  border-color: var(--gold);
  transform: translateY(-1px);
}
