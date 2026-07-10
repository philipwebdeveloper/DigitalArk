// ============================================================
// DIGITAL ARK — Free FAQ Chat Widget logic (no AI, no API, no cost)
// Save this as js/faq-chatbot.js and add:
//   <script src="js/faq-chatbot.js"></script>
// right before </body> on every page (after js/main.js).
//
// How it works: it matches whatever the visitor types against a
// list of keywords below and replies with a preset answer. It does
// NOT understand free-form language the way a real AI would — it's
// a simple, zero-cost keyword matcher. Edit the KNOWLEDGE_BASE array
// any time your services, prices, or contact info change.
// ============================================================

const KNOWLEDGE_BASE = [
  {
    id: 'services',
    label: '🛠️ Services',
    keywords: ['service', 'services', 'offer', 'what do you do', 'build', 'website', 'store', 'ecommerce', 'landing', 'redesign', 'seo'],
    answer: "We offer:\n• Business Websites\n• Online Stores\n• Landing Pages\n• Website Redesigns\n• Maintenance & Hosting\n• SEO Foundations\n\nWant details on any of these? Just ask, or check our Services page."
  },
  {
    id: 'pricing',
    label: '💰 Pricing',
    keywords: ['price', 'pricing', 'cost', 'how much', 'rate', 'package', 'budget', 'fee'],
    answer: "Our starting packages:\n• Starter — ₱8,500 (1-page site)\n• Business — ₱24,990 (up to 5 pages, most popular)\n• Growth — Let's Talk (up to 10 pages or online store)\n\nNeed something custom? Message us for a free quote."
  },
  {
    id: 'timeline',
    label: '⏱️ Timeline',
    keywords: ['how long', 'timeline', 'turnaround', 'time', 'fast', 'when', 'deadline', 'days', 'weeks'],
    answer: "Most projects get a first draft within 5–10 days of kickoff. Full timeline depends on scope and how quickly we get feedback from you along the way."
  },
  {
    id: 'process',
    label: '📋 How it works',
    keywords: ['process', 'how it works', 'steps', 'workflow', 'how do we start', 'get started'],
    answer: "Our process has 4 steps:\n1. Discover — we learn about your business\n2. Design — you review the layout & look\n3. Build — we develop and test it\n4. Launch & support — we publish it and stay reachable after\n\nReady to begin? Send us a message with a bit about your business."
  },
  {
    id: 'contact',
    label: '📍 Contact & hours',
    keywords: ['contact', 'email', 'phone', 'number', 'address', 'location', 'hours', 'reach', 'call', 'message'],
    answer: "You can reach us at:\n📧 philip.webdeveloper21@gmail.com\n📞 0994 926 2935\n💬 Messenger: m.me/61579037024996\n📍 San Jose Del Monte, Bulacan, PH\n🕐 Mon–Sat, 9AM–6PM"
  },
  },
  {
    id: 'portfolio',
    label: '🖼️ Past work',
    keywords: ['portfolio', 'work', 'example', 'sample', 'project', 'client', 'case study'],
    answer: "You can see the kind of sites we build on our Projects page — business sites, online stores, and landing pages across different industries."
  }
];

const FALLBACK_ANSWER = "I'm a simple FAQ helper, so I might not catch everything — but I can help with services, pricing, timelines, our process, or contact info. Pick a topic below, or reach the team directly at philip.webdeveloper21@gmail.com or 0994-926-2935";

document.addEventListener('DOMContentLoaded', () => {
  const fab = document.getElementById('faq-chat-fab');
  const win = document.getElementById('faq-chat-window');
  const closeBtn = document.getElementById('faq-chat-close');
  const form = document.getElementById('faq-chat-form');
  const input = document.getElementById('faq-chat-input');
  const messagesEl = document.getElementById('faq-chat-messages');
  const chipsEl = document.getElementById('faq-chat-chips');

  if (!fab || !win || !form) return; // widget not on this page

  const toggleWindow = () => {
    win.classList.toggle('open');
    if (win.classList.contains('open')) input.focus();
  };
  fab.addEventListener('click', toggleWindow);
  closeBtn.addEventListener('click', toggleWindow);

  function addMessage(role, text) {
    const div = document.createElement('div');
    div.className = 'ai-msg ' + (role === 'user' ? 'ai-msg-user' : 'ai-msg-bot');
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function renderChips() {
    chipsEl.innerHTML = '';
    KNOWLEDGE_BASE.forEach(topic => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'faq-chip';
      btn.textContent = topic.label;
      btn.addEventListener('click', () => {
        const displayText = topic.label.replace(/^\S+\s/, '');
        addMessage('user', displayText);
        setTimeout(() => {
          addMessage('assistant', topic.answer);
          renderChips();
        }, 300);
      });
      chipsEl.appendChild(btn);
    });
    messagesEl.appendChild(chipsEl); // move chips to the bottom after new messages
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function findAnswer(text) {
    const lower = text.toLowerCase();
    let best = null;
    let bestScore = 0;

    KNOWLEDGE_BASE.forEach(topic => {
      let score = 0;
      topic.keywords.forEach(kw => {
        if (lower.includes(kw)) score += kw.split(' ').length; // multi-word matches score higher
      });
      if (score > bestScore) {
        bestScore = score;
        best = topic;
      }
    });

    return best ? best.answer : FALLBACK_ANSWER;
  }

  function handleUserText(text) {
    if (!text.trim()) return;
    addMessage('user', text);
    const reply = findAnswer(text);
    // tiny delay so it doesn't feel instant/robotic
    setTimeout(() => {
      addMessage('assistant', reply);
      renderChips();
    }, 350);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    handleUserText(text);
  });

  // initial chip row
  renderChips();
});
