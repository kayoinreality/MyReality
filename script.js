/* ============================================================
   MYREALITY PORTFOLIO — script.js
   ============================================================ */

const GITHUB_USERNAME = 'kayoinreality';
const CACHE_KEY       = 'mr_github_repos';
const CACHE_TTL_MS    = 10 * 60 * 1000; // 10 minutes

/* ---- helpers ---- */
function getLangClass(lang) {
  const map = {
    Python:            'lang-python',
    JavaScript:        'lang-javascript',
    Java:              'lang-java',
    TypeScript:        'lang-typescript',
    CSS:               'lang-css',
    HTML:              'lang-html',
    'Jupyter Notebook':'lang-jupyter',
  };
  return map[lang] || 'lang-default';
}

/* ============================================================
   SCROLL PROGRESS BAR
============================================================ */
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width  = docHeight > 0 ? (scrollTop / docHeight * 100) + '%' : '0%';
  }, { passive: true });
})();

/* ============================================================
   BACK TO TOP
============================================================ */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ============================================================
   SMOOTH SCROLL — internal links
============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      // close mobile menu if open
      const menu = document.getElementById('mobile-menu');
      if (menu) menu.classList.remove('open');
      syncHamburger(false);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ============================================================
   MOBILE HAMBURGER MENU
============================================================ */
let menuOpen = false;

function syncHamburger(open) {
  menuOpen = open;
  const lines = document.querySelectorAll('#hamburger .hamburger-line');
  if (open) {
    lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    lines[1].style.opacity   = '0';
    lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    lines.forEach(l => { l.style.transform = ''; l.style.opacity = ''; });
  }
}

(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    syncHamburger(menuOpen);
  });
})();

/* ============================================================
   ACTIVE NAV LINK ON SCROLL
============================================================ */
(function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link[data-section]');
  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(sec => observer.observe(sec));
})();

/* ============================================================
   REVEAL ON SCROLL
============================================================ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   TYPED TEXT EFFECT
============================================================ */
(function initTypedText() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'Conectando codigo e insights.',
    'Analista de Logistica e Desenvolvedor.',
    'Construindo sistemas de dados com IA.',
    'Disponivel para novos projetos.',
  ];

  let phraseIdx = 0, charIdx = 0, isDeleting = false;

  function loop() {
    const current = phrases[phraseIdx];
    if (isDeleting) {
      el.textContent = current.substring(0, --charIdx);
    } else {
      el.textContent = current.substring(0, ++charIdx);
    }

    let delay = isDeleting ? 40 : 80;
    if (!isDeleting && charIdx === current.length) {
      delay = 2200; isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx  = (phraseIdx + 1) % phrases.length;
      delay      = 300;
    }
    setTimeout(loop, delay);
  }
  loop();
})();

/* ============================================================
   WEBSITES ROULETTE + NATIVE PREVIEW
============================================================ */
(function initWebsiteRoulette() {
  const list  = document.getElementById('website-roulette');
  const cards = Array.from(document.querySelectorAll('#website-roulette .website-card'));
  const miniatureFrames = Array.from(document.querySelectorAll('#website-roulette .website-miniature'));
  const prev  = document.getElementById('website-roulette-prev');
  const next  = document.getElementById('website-roulette-next');

  if (!list || !cards.length || !prev || !next) return;

  let activeIndex = cards.findIndex(card => card.classList.contains('is-active'));
  if (activeIndex < 0) activeIndex = 0;
  let autoplayId = null;
  let isPaused = false;
  const AUTOPLAY_MS = 3800;
  const MINI_VIEWPORT_WIDTH = 1366;
  const MINI_VIEWPORT_HEIGHT = 768;

  function fitMiniatures() {
    miniatureFrames.forEach(frame => {
      const wrap = frame.closest('.website-miniature-wrap');
      if (!wrap) return;

      const wrapWidth = wrap.clientWidth;
      const wrapHeight = wrap.clientHeight;
      if (!wrapWidth || !wrapHeight) return;

      const scale = Math.min(wrapWidth / MINI_VIEWPORT_WIDTH, wrapHeight / MINI_VIEWPORT_HEIGHT);

      frame.style.width = `${MINI_VIEWPORT_WIDTH}px`;
      frame.style.height = `${MINI_VIEWPORT_HEIGHT}px`;
      frame.style.transform = `scale(${scale})`;
    });
  }

  function markActive(card) {
    cards.forEach(c => c.classList.remove('is-active'));
    card.classList.add('is-active');
  }

  function activateByIndex(index, smooth = true) {
    const safeIndex = (index + cards.length) % cards.length;
    activeIndex = safeIndex;
    const card = cards[activeIndex];
    markActive(card);
    card.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'nearest', inline: 'start' });
  }

  function tickAutoplay() {
    if (isPaused || cards.length < 2) return;
    activateByIndex(activeIndex + 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayId = window.setInterval(tickAutoplay, AUTOPLAY_MS);
  }

  function stopAutoplay() {
    if (!autoplayId) return;
    window.clearInterval(autoplayId);
    autoplayId = null;
  }

  function pauseAutoplay() {
    isPaused = true;
  }

  function resumeAutoplay() {
    isPaused = false;
  }

  cards.forEach((card, idx) => {
    card.addEventListener('click', () => activateByIndex(idx));
    card.addEventListener('focusin', pauseAutoplay);
    card.addEventListener('focusout', resumeAutoplay);
  });

  prev.addEventListener('click', () => activateByIndex(activeIndex - 1));
  next.addEventListener('click', () => activateByIndex(activeIndex + 1));

  list.addEventListener('mouseenter', pauseAutoplay);
  list.addEventListener('mouseleave', resumeAutoplay);
  list.addEventListener('touchstart', pauseAutoplay, { passive: true });
  list.addEventListener('touchend', resumeAutoplay, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseAutoplay();
    else resumeAutoplay();
  });

  if (typeof ResizeObserver !== 'undefined') {
    const resizeObserver = new ResizeObserver(() => fitMiniatures());
    miniatureFrames.forEach(frame => {
      const wrap = frame.closest('.website-miniature-wrap');
      if (wrap) resizeObserver.observe(wrap);
    });
  }
  window.addEventListener('resize', fitMiniatures, { passive: true });

  fitMiniatures();
  activateByIndex(activeIndex, false);
  startAutoplay();
})();

/* ============================================================
   ANIMATED STAT COUNTERS
============================================================ */
function animateCount(el, target, duration = 1500) {
  let startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

(function initCounters() {
  const firstCounter = document.querySelector('[data-count]');
  if (!firstCounter) return;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('[data-count]').forEach(el => {
        animateCount(el, parseInt(el.dataset.count, 10));
      });
      observer.disconnect();
    }
  }, { threshold: 0.5 });

  observer.observe(firstCounter.closest('section') || firstCounter);
})();

/* ============================================================
   GITHUB API — with localStorage cache + fallback repos
   FIX: cache evita rate-limit (403); fallback exibe repos
   reais caso a API esteja indisponível (ex: arquivo local).
============================================================ */
let allRepos = [];

/**
 * Retorna repos do cache se ainda válido, null caso contrário.
 */
function getCachedRepos() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > CACHE_TTL_MS) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

/**
 * Salva repos no cache com timestamp.
 */
function setCachedRepos(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch { /* localStorage cheio ou indisponível */ }
}

/**
 * Repos de fallback — exibidos quando a API falha ou está offline.
 * Mantém os dados reais do GitHub do usuário.
 */
const FALLBACK_REPOS = [
  {
    name: 'Portifolio',
    description: 'Portfólio pessoal desenvolvido com HTML, CSS e JavaScript.',
    html_url: 'https://github.com/kayoinreality/Portifolio',
    language: 'CSS',
    stargazers_count: 1,
    forks_count: 0,
    fork: false,
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    name: 'javabootcamp',
    description: 'Repositório para armazenar todo o conteúdo do curso de Java.',
    html_url: 'https://github.com/kayoinreality/javabootcamp',
    language: 'Java',
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    name: 'new-java-project',
    description: 'Projeto Java.',
    html_url: 'https://github.com/kayoinreality/new-java-project',
    language: 'Java',
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    updated_at: '2023-01-01T00:00:00Z',
  },
  {
    name: 'kayo-arch',
    description: 'Config files for my GitHub profile.',
    html_url: 'https://github.com/kayoinreality/kayo-arch',
    language: null,
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    updated_at: '2023-01-01T00:00:00Z',
  },
  {
    name: 'dio-lab-open-source',
    description: 'Repositório do lab "Contribuindo em um Projeto Open Source no GitHub" da Digital Innovation One.',
    html_url: 'https://github.com/kayoinreality/dio-lab-open-source',
    language: 'Jupyter Notebook',
    stargazers_count: 0,
    forks_count: 0,
    fork: true,
    updated_at: '2023-01-01T00:00:00Z',
  },
];

function renderProjects(repos) {
  const grid = document.getElementById('projects-grid');
  if (!repos.length) {
    grid.innerHTML = '<p class="text-slate-500 col-span-3 text-center py-8">Nenhum repositório encontrado para este filtro.</p>';
    return;
  }

  grid.innerHTML = repos.map((repo, i) => {
    const lang      = repo.language || 'N/A';
    const langClass = getLangClass(repo.language);
    const desc      = repo.description || 'Sem descricao disponivel.';
    const updatedAt = new Date(repo.updated_at).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });

    return `
      <a href="${repo.html_url}" target="_blank" rel="noopener"
         class="github-card group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10
                p-6 flex flex-col gap-4 reveal reveal-delay-${(i % 4) + 1}"
         style="text-decoration:none;">

        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-2 min-w-0">
            <span class="material-symbols-outlined text-primary text-xl flex-shrink-0">
              ${repo.fork ? 'fork_right' : 'folder_code'}
            </span>
            <h4 class="text-lg font-bold text-white group-hover:text-primary transition-colors truncate">
              ${repo.name}
            </h4>
          </div>
          <span class="material-symbols-outlined text-slate-600 group-hover:text-primary transition-colors text-xl flex-shrink-0">
            open_in_new
          </span>
        </div>

        <p class="text-slate-400 text-sm leading-relaxed flex-1">
          ${desc.length > 90 ? desc.slice(0, 87) + '...' : desc}
        </p>

        <div class="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <div class="flex items-center gap-3">
            ${repo.language ? `
              <span class="flex items-center gap-1.5 text-xs text-slate-400">
                <span class="w-3 h-3 rounded-full ${langClass} inline-block flex-shrink-0"></span>
                ${lang}
              </span>` : ''}
            ${repo.stargazers_count > 0 ? `<span class="text-xs text-slate-400">⭐ ${repo.stargazers_count}</span>` : ''}
            ${repo.forks_count > 0       ? `<span class="text-xs text-slate-400">🍴 ${repo.forks_count}</span>`       : ''}
          </div>
          <span class="text-xs text-slate-600">${updatedAt}</span>
        </div>
      </a>
    `;
  }).join('');

  // Observa os novos elementos reveal injetados dinamicamente
  document.querySelectorAll('#projects-grid .reveal').forEach(el => revealObserver.observe(el));
}

async function fetchGitHubRepos() {
  const grid       = document.getElementById('projects-grid');
  const errorPanel = document.getElementById('github-error');

  // 1️⃣  Tenta cache local primeiro
  const cached = getCachedRepos();
  if (cached) {
    allRepos = cached.filter(r => r.name !== GITHUB_USERNAME);
    animateCount(document.getElementById('repo-count'), cached.length);
    renderProjects(allRepos);
    setupFilterButtons();
    return;
  }

  // 2️⃣  Busca da API do GitHub
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );

    // Rate limit: exibe aviso e cai no fallback
    if (res.status === 403) {
      const resetTs  = res.headers.get('X-RateLimit-Reset');
      const resetMin = resetTs
        ? Math.ceil((parseInt(resetTs, 10) * 1000 - Date.now()) / 60000)
        : '?';
      console.warn(`GitHub API rate limit atingido. Reset em ~${resetMin} min.`);
      throw new Error('rate_limit');
    }

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const repos = await res.json();
    setCachedRepos(repos); // salva no cache

    allRepos = repos.filter(r => r.name !== GITHUB_USERNAME);
    animateCount(document.getElementById('repo-count'), repos.length);
    renderProjects(allRepos);

  } catch (err) {
    console.error('GitHub API error:', err.message);

    // 3️⃣  Fallback: exibe repos hardcoded mas indica que é cache
    allRepos = FALLBACK_REPOS;
    animateCount(document.getElementById('repo-count'), FALLBACK_REPOS.length);
    renderProjects(allRepos);

    // Mostra banner suave de aviso (não tira o conteúdo da tela)
    if (errorPanel) {
      errorPanel.classList.remove('hidden');
      errorPanel.innerHTML = `
        <p class="text-slate-500 text-xs mt-2 text-center">
          ⚠️ API indisponível (offline ou rate limit) — exibindo dados em cache.
          <a href="https://github.com/${GITHUB_USERNAME}" class="text-primary hover:underline ml-1" target="_blank">
            Ver no GitHub →
          </a>
        </p>`;
    }
  }

  setupFilterButtons();
}

/* ============================================================
   FILTER BUTTONS
============================================================ */
function setupFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
        b.classList.add('text-slate-400', 'border-white/10');
        b.classList.remove('text-primary', 'border-primary');
      });
      this.classList.add('active', 'text-primary', 'border-primary');
      this.classList.remove('text-slate-400', 'border-white/10');

      const filter   = this.dataset.filter;
      const filtered = filter === 'all'
        ? allRepos
        : allRepos.filter(r => r.language === filter);
      renderProjects(filtered);
    });
  });
}

// Inicia fetch
fetchGitHubRepos();

/* ============================================================
   CONTACT FORM
============================================================ */
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent  = msg;
  document.getElementById('toast-icon').textContent = type === 'success' ? '✅' : '❌';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function handleContactForm() {
  const name    = document.getElementById('contact-name').value.trim();
  const email   = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  const btn     = document.getElementById('send-btn');
  const btnText = document.getElementById('send-btn-text');
  const btnIcon = document.getElementById('send-btn-icon');

  if (!name)                                        { showToast('Por favor, insira seu nome.', 'error');         return; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('Por favor, insira um e-mail válido.', 'error'); return; }
  if (!message)                                     { showToast('Por favor, escreva uma mensagem.', 'error');    return; }

  btn.disabled      = true;
  btnText.textContent = 'Enviando...';
  btnIcon.textContent = 'hourglass_empty';

  setTimeout(() => {
    const mailto = `mailto:kayorodrigodzn@gmail.com?subject=${encodeURIComponent(`Contato via Portfolio - ${name}`)}&body=${encodeURIComponent(`De: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailto;

    showToast('Cliente de e-mail aberto com sua mensagem!', 'success');
    btn.disabled        = false;
    btnText.textContent = 'Enviar Mensagem';
    btnIcon.textContent = 'send';
    document.getElementById('contact-name').value    = '';
    document.getElementById('contact-email').value   = '';
    document.getElementById('contact-message').value = '';
  }, 800);
}

/* ============================================================
   FLOATING PARTICLES
============================================================ */
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 12; i++) {
    const p    = document.createElement('div');
    p.className = 'particle';
    const size  = Math.random() * 6 + 2;
    p.style.cssText = `
      width:${size}px;
      height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 20 + 15}s;
      animation-delay:${Math.random() * -20}s;
    `;
    container.appendChild(p);
  }
})();
