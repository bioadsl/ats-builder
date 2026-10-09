(function () {
  'use strict';

  const STORAGE_KEYS = {
    THEME: 'portfolio-theme',
  };

  const ICONS = {
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
    github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`,
    email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
  };

  const els = {};

  function init() {
    cacheElements();
    initTheme();
    initThemeToggle();
    initMobileMenu();
    initScrollEffects();
    initBackToTop();
    loadAndRenderData();
    initFadeInAnimations();
  }

  function cacheElements() {
    els.header = document.querySelector('.header');
    els.heroName = document.getElementById('heroName');
    els.heroTitle = document.getElementById('heroTitle');
    els.heroLocation = document.getElementById('heroLocation');
    els.heroSocials = document.getElementById('heroSocials');
    els.downloadCv = document.getElementById('downloadCv');
    els.aboutSummary = document.getElementById('aboutSummary');
    els.aboutSummaryText = document.getElementById('aboutSummaryText');
    els.skillsGrid = document.getElementById('skillsGrid');
    els.timeline = document.getElementById('timeline');
    els.projectsGrid = document.getElementById('projectsGrid');
    els.educationList = document.getElementById('educationList');
    els.certificationsList = document.getElementById('certificationsList');
    els.footerText = document.getElementById('footerText');
    els.repoLink = document.getElementById('repoLink');
    els.themeToggle = document.getElementById('themeToggle');
    els.menuToggle = document.getElementById('menuToggle');
    els.navLinks = document.querySelector('.nav__links');
    els.backToTop = document.getElementById('backToTop');
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.setAttribute('data-theme', saved);
    }
  }

  function initThemeToggle() {
    if (!els.themeToggle) return;
    els.themeToggle.addEventListener('click', toggleTheme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEYS.THEME, next);
  }

  function initMobileMenu() {
    if (!els.menuToggle || !els.navLinks) return;

    els.menuToggle.addEventListener('click', function () {
      const isOpen = els.navLinks.classList.toggle('open');
      els.menuToggle.classList.toggle('open', isOpen);
      els.menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    els.navLinks.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        els.navLinks.classList.remove('open');
        els.menuToggle.classList.remove('open');
        els.menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initScrollEffects() {
    const onScroll = function () {
      if (window.scrollY > 12) {
        els.header && els.header.classList.add('scrolled');
      } else {
        els.header && els.header.classList.remove('scrolled');
      }

      updateActiveNavLink();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 120;

    sections.forEach(function (section) {
      const id = section.getAttribute('id');
      const link = document.querySelector('.nav__link[href="#' + id + '"]');
      if (!link) return;

      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav__link').forEach(function (l) {
          l.classList.remove('active');
        });
        link.classList.add('active');
      }
    });
  }

  function initBackToTop() {
    if (!els.backToTop) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        els.backToTop.classList.add('visible');
      } else {
        els.backToTop.classList.remove('visible');
      }
    }, { passive: true });

    els.backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initFadeInAnimations() {
    const targets = document.querySelectorAll(
      '.about__card, .skill-card, .timeline__item, .project-card, .list__item, .section__header'
    );

    targets.forEach(function (el) {
      el.classList.add('fade-in');
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  function loadAndRenderData() {
    fetch('./data.json', { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) {
          throw new Error('Falha ao carregar data.json (' + res.status + ')');
        }
        return res.json();
      })
      .then(renderData)
      .catch(function (err) {
        console.error('[Portfolio] Erro ao carregar dados:', err);
        renderFallbackData();
      });
  }

  function renderData(data) {
    if (data.profile) renderProfile(data.profile);
    if (data.about) renderAbout(data.about);
    if (data.skills) renderSkills(data.skills);
    if (data.experience) renderExperience(data.experience);
    if (data.projects) renderProjects(data.projects);
    if (data.education) renderEducation(data.education);
    if (data.certifications) renderCertifications(data.certifications);
    if (data.footer) renderFooter(data.footer, data.profile);
  }

  function renderProfile(profile) {
    if (els.heroName && profile.name) els.heroName.textContent = profile.name;
    if (els.heroTitle && profile.title) els.heroTitle.textContent = profile.title;
    if (els.heroLocation && profile.location) els.heroLocation.innerHTML = '📍 ' + profile.location;
    if (els.downloadCv && profile.cvUrl) els.downloadCv.setAttribute('href', profile.cvUrl);

    if (els.heroSocials) {
      els.heroSocials.innerHTML = '';
      if (profile.linkedin) els.heroSocials.appendChild(createSocialLink(profile.linkedin, 'LinkedIn', ICONS.linkedin));
      if (profile.github) els.heroSocials.appendChild(createSocialLink(profile.github, 'GitHub', ICONS.github));
      if (profile.email) els.heroSocials.appendChild(createSocialLink('mailto:' + profile.email, profile.email, ICONS.email));
      if (profile.phone) {
        const waDigits = profile.phone.replace(/\D+/g, '');
        const waMsg = encodeURIComponent('Olá! Vi seu currículo/portfólio e gostaria de entrar em contato sobre oportunidades de QA / Testes.');
        const waUrl = 'https://wa.me/' + waDigits + '?text=' + waMsg;
        els.heroSocials.appendChild(createSocialLink(waUrl, profile.phone + ' · WhatsApp', ICONS.phone));
      }
    }
  }

  function createSocialLink(href, label, iconSvg) {
    const a = document.createElement('a');
    a.setAttribute('href', href);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    a.setAttribute('class', 'social-link');
    a.innerHTML = iconSvg + '<span>' + label + '</span>';
    return a;
  }

  function renderAbout(about) {
    if (els.aboutSummary) {
      els.aboutSummary.textContent = 'Cultura Shift-Left & Qualidade Contínua';
    }
    if (els.aboutSummaryText && about.summary) {
      const trimmed = about.summary.length > 155
        ? about.summary.substring(0, 155) + '...'
        : about.summary;
      els.aboutSummaryText.textContent = trimmed;
    }
  }

  function renderSkills(skills) {
    if (!els.skillsGrid || !Array.isArray(skills.categories)) return;
    els.skillsGrid.innerHTML = '';

    skills.categories.forEach(function (cat) {
      const card = document.createElement('div');
      card.className = 'skill-card';

      const itemsHtml = (cat.items || []).map(function (item) {
        return '<span class="skill-tag">' + escapeHtml(item) + '</span>';
      }).join('');

      card.innerHTML =
        '<div class="skill-card__header">' +
          '<div class="skill-card__icon">' + (cat.icon || '⚙️') + '</div>' +
          '<h3 class="skill-card__name">' + escapeHtml(cat.name) + '</h3>' +
        '</div>' +
        '<div class="skill-card__items">' + itemsHtml + '</div>';

      els.skillsGrid.appendChild(card);
    });
  }

  function renderExperience(experience) {
    if (!els.timeline || !Array.isArray(experience)) return;
    els.timeline.innerHTML = '';

    experience.forEach(function (job) {
      const item = document.createElement('div');
      item.className = 'timeline__item';

      const highlightsHtml = (job.highlights || []).map(function (h) {
        return '<li>' + escapeHtml(h) + '</li>';
      }).join('');

      item.innerHTML =
        '<div class="timeline__dot"></div>' +
        '<div class="timeline__card">' +
          '<span class="timeline__period">' + escapeHtml(job.period || '') + '</span>' +
          '<h3 class="timeline__company">' + escapeHtml(job.company || '') + '</h3>' +
          '<p class="timeline__position">' + escapeHtml(job.position || '') + '</p>' +
          (job.location ? '<p class="timeline__location">📍 ' + escapeHtml(job.location) + '</p>' : '') +
          '<ul class="timeline__highlights">' + highlightsHtml + '</ul>' +
        '</div>';

      els.timeline.appendChild(item);
    });
  }

  function renderProjects(projects) {
    if (!els.projectsGrid || !Array.isArray(projects)) return;
    els.projectsGrid.innerHTML = '';

    projects.forEach(function (proj) {
      const tagsHtml = (proj.tags || []).map(function (t) {
        return '<span class="project-tag">' + escapeHtml(t) + '</span>';
      }).join('');

      const badgesHtml = buildBadgesHtml(proj.badges || [], proj.github || '#');

      const card = document.createElement('article');
      card.className = 'project-card';

      card.innerHTML =
        '<div class="project-card__header">' +
          '<div class="project-card__icon">' + (proj.icon || '📦') + '</div>' +
          '<h3 class="project-card__title">' + escapeHtml(proj.title || '') + '</h3>' +
        '</div>' +
        '<p class="project-card__description">' + escapeHtml(proj.description || '') + '</p>' +
        '<div class="project-card__tags">' + tagsHtml + '</div>' +
        '<div class="project-card__footer">' +
          (badgesHtml ? '<div class="project-card__badges">' + badgesHtml + '</div>' : '') +
          '<div class="project-footer__actions">' +
            '<a class="btn btn--outline" href="' + escapeAttr(proj.github || '#') + '" target="_blank" rel="noopener noreferrer">' +
              ICONS.github.replace('<svg', '<svg width="15" height="15"') +
              ' Ver no GitHub' +
            '</a>' +
          '</div>' +
        '</div>';

      els.projectsGrid.appendChild(card);
    });
  }

  function buildBadgesHtml(badges, repoUrl) {
    if (!Array.isArray(badges) || badges.length === 0) return '';
    return badges.map(function (b) {
      const type = (b.type || '').toLowerCase();
      let url = '';
      let alt = '';
      if (type === 'github-actions' && b.repo) {
        const encRepo = encodeURIComponent(b.repo);
        const color = b.color || '10b981';
        const label = b.label ? encodeURIComponent(b.label) : 'CI%2FCD';
        url = 'https://img.shields.io/badge/' + label + '-ativo-%23' + color + '?logo=githubactions&logoColor=white&style=flat-square';
        alt = b.label || 'CI/CD GitHub Actions ativo';
      } else {
        const color = b.color || '6366f1';
        const label = b.label ? encodeURIComponent(b.label) : 'badge';
        url = 'https://img.shields.io/badge/' + label + '-%23' + color + '?style=flat-square';
        alt = b.label || 'badge';
      }
      const a = document.createElement('a');
      a.href = repoUrl + (repoUrl && repoUrl.endsWith('/') ? 'actions' : '/actions');
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'project-badge';
      a.title = alt;
      a.innerHTML = '<img src="' + url + '" alt="' + escapeAttr(alt) + '" loading="lazy" referrerpolicy="no-referrer" />';
      return a.outerHTML;
    }).join('');
  }

  function renderEducation(education) {
    if (!els.educationList || !Array.isArray(education)) return;
    els.educationList.innerHTML = '';

    education.forEach(function (edu) {
      const item = document.createElement('div');
      item.className = 'list__item';
      item.innerHTML =
        '<div class="list__icon">' + (edu.icon || '🎓') + '</div>' +
        '<div class="list__content">' +
          '<h4>' + escapeHtml(edu.degree || '') + '</h4>' +
          '<p>' + escapeHtml(edu.institution || '') + (edu.period ? ' • ' + escapeHtml(edu.period) : '') + '</p>' +
        '</div>';
      els.educationList.appendChild(item);
    });
  }

  function renderCertifications(certifications) {
    if (!els.certificationsList || !Array.isArray(certifications)) return;
    els.certificationsList.innerHTML = '';

    certifications.forEach(function (cert) {
      const item = document.createElement('div');
      item.className = 'list__item';
      item.innerHTML =
        '<div class="list__icon">' + (cert.icon || '🏆') + '</div>' +
        '<div class="list__content">' +
          '<h4>' + escapeHtml(cert.name || '') + '</h4>' +
          (cert.issuer ? '<p>' + escapeHtml(cert.issuer) + '</p>' : '') +
        '</div>';
      els.certificationsList.appendChild(item);
    });
  }

  function renderFooter(footer, profile) {
    if (els.footerText) {
      const year = footer.year || new Date().getFullYear();
      const name = (profile && profile.name) ? escapeHtml(profile.name) : 'Fabrício Duarte';
      els.footerText.innerHTML = '© ' + year + ' ' + name + ' — Todos os direitos reservados.';
    }
    if (els.repoLink && footer.portfolioRepo) {
      els.repoLink.setAttribute('href', footer.portfolioRepo);
    }
  }

  function renderFallbackData() {
    console.warn('[Portfolio] Usando dados de fallback.');
    if (els.heroName) els.heroName.textContent = 'Fabrício Duarte';
    if (els.heroTitle) els.heroTitle.textContent = 'QA Automation Engineer & Senior Test Analyst';
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeAttr(str) {
    return escapeHtml(str);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ========================================================================
     ATS Resume Builder Module
     ======================================================================== */
  function initAtsBuilder() {
    const form = document.getElementById('atsForm');
    if (!form) return;

    const stepsContainer = document.getElementById('atsStepper');
    const stepperBtns = stepsContainer ? stepsContainer.querySelectorAll('.ats-step') : [];
    const panels = form.querySelectorAll('.ats-step__panel');
    const prevBtn = document.getElementById('atsPrevBtn');
    const nextBtn = document.getElementById('atsNextBtn');
    const printBtn = document.getElementById('atsPrintBtn');
    const fillDemoBtn = document.getElementById('atsFillDemoBtn');
    const clearBtn = document.getElementById('atsClearBtn');
    const addExpBtn = document.getElementById('atsAddExpBtn');
    const addEduBtn = document.getElementById('atsAddEduBtn');
    const addCertBtn = document.getElementById('atsAddCertBtn');
    const addLangBtn = document.getElementById('atsAddLangBtn');
    const summaryCount = document.getElementById('summaryCount');

    const elsAts = {
      list: {
        exp: document.getElementById('atsExpList'),
        edu: document.getElementById('atsEduList'),
        cert: document.getElementById('atsCertList'),
        lang: document.getElementById('atsLangList')
      },
      preview: {
        name: document.getElementById('cvName'),
        role: document.getElementById('cvRole'),
        contact: document.getElementById('cvContact'),
        summary: document.getElementById('cvSummary'),
        skills: document.getElementById('cvSkills'),
        exp: document.getElementById('cvExp'),
        edu: document.getElementById('cvEdu'),
        cert: document.getElementById('cvCerts'),
        lang: document.getElementById('cvLangs')
      },
      score: {
        value: document.getElementById('atsScoreValue'),
        ring: document.querySelector('.ats-score__ring'),
        status: document.getElementById('atsScoreStatus'),
        desc: document.getElementById('atsScoreDesc'),
        list: document.getElementById('atsRulesList')
      }
    };

    const STORAGE_KEY = 'resume-ats-builder:v1';
    let state = {
      currentStep: 0,
      form: {},
      exp: [],
      edu: [],
      cert: [],
      lang: []
    };

    // --------- Helpers ---------
    function escapeHtml(str) {
      if (str == null) return '';
      return String(str).replace(/[&<>"']/g, function (c) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
      });
    }

    function saveState() {
      try {
        const data = collectData(true);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (_) {}
    }

    function loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
      } catch (_) {
        return null;
      }
    }

    function clearState() {
      try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
    }

    function countChars(s) { return (s || '').length; }

    // --------- Input Masks ---------
    function applyPhoneMask(value) {
      var digits = String(value || '').replace(/\D+/g, '').slice(0, 11);
      if (digits.length <= 2) return digits;
      if (digits.length <= 6) return digits.slice(0, 2) + ' ' + digits.slice(2);
      if (digits.length <= 10) return digits.slice(0, 2) + ' ' + digits.slice(2, 6) + '-' + digits.slice(6);
      return digits.slice(0, 2) + ' ' + digits.slice(2, 7) + '-' + digits.slice(7);
    }

    function initPhoneMask() {
      var phone = form.querySelector('[name="phone"]');
      if (!phone) return;
      phone.addEventListener('input', function () { phone.value = applyPhoneMask(phone.value); });
    }

    // --------- Field Validation ---------
    var VALIDATORS = {
      fullName: function (v) {
        if (!v || !v.trim()) return { ok: false, msg: 'Informe seu nome completo.' };
        var parts = v.trim().split(/\s+/);
        if (parts.length < 2) return { ok: false, msg: 'Informe nome e sobrenome (mínimo 2 palavras).' };
        if (v.trim().length < 6) return { ok: false, msg: 'Nome muito curto. Use o nome completo.' };
        return { ok: true, msg: 'Nome completo válido.' };
      },
      role: function (v) {
        if (!v || !v.trim()) return { ok: false, msg: 'Informe o cargo profissional desejado.' };
        if (countChars(v) < 15) return { ok: false, msg: 'Descreva o cargo com mais detalhes (ex: Senior QA Automation Engineer).' };
        return { ok: true, msg: 'Cargo bem descrito.' };
      },
      email: function (v) {
        if (!v || !v.trim()) return { ok: false, msg: 'Informe seu e-mail profissional.' };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return { ok: false, msg: 'Formato de e-mail inválido (ex: voce@email.com).' };
        if (/(hotmail|ig\.com\.br|yahoo|bol\.com\.br)/i.test(v)) return { ok: true, msg: 'E-mail válido. Considere Gmail/Outlook para perfil mais profissional.', warn: true };
        return { ok: true, msg: 'E-mail profissional válido.' };
      },
      phone: function (v) {
        var digits = String(v || '').replace(/\D+/g, '');
        if (!digits) return { ok: true, msg: 'Telefone opcional, mas recomendado para contato.', warn: true };
        if (digits.length < 10) return { ok: false, msg: 'Informe DDD + número (mínimo 10 dígitos).' };
        if (digits.length < 11) return { ok: true, msg: 'Telefone fixo detectado. Celular com 9º dígito é preferível.', warn: true };
        return { ok: true, msg: 'Telefone / WhatsApp completo.' };
      },
      location: function (v) {
        if (!v || !v.trim()) return { ok: true, msg: 'Localização opcional. ATS usam para matching regional.', warn: true };
        if (!/[A-Z]{2}/.test(v) && !/-\s*[A-Z]{2}$/.test(v)) return { ok: true, msg: 'Considere informar UF (ex: Brasília - DF).', warn: true };
        return { ok: true, msg: 'Localização registrada.' };
      },
      linkedin: function (v) {
        if (!v || !v.trim()) return { ok: true, msg: 'LinkedIn opcional, mas altamente recomendado.', warn: true };
        if (!/^https?:\/\//i.test(v)) return { ok: false, msg: 'URL deve começar com https://' };
        if (!/linkedin\.com\/in\/[^/\s]+/i.test(v)) return { ok: false, msg: 'Use o formato: https://linkedin.com/in/seu-nome' };
        return { ok: true, msg: 'URL do LinkedIn válida.' };
      },
      portfolio: function (v) {
        if (!v || !v.trim()) return { ok: true, msg: 'Portfólio / GitHub opcional. Diferencia o perfil.', warn: true };
        if (!/^https?:\/\//i.test(v)) return { ok: false, msg: 'URL deve começar com https://' };
        return { ok: true, msg: 'URL de portfólio válida.' };
      },
      summary: function (v) {
        if (!v || !v.trim()) return { ok: false, msg: 'Escreva um resumo executivo (mínimo 250 caracteres recomendado).' };
        if (countChars(v) < 150) return { ok: false, msg: 'Resumo muito curto. Adicione mais detalhes de impacto e stack.' };
        if (countChars(v) < 250) return { ok: true, msg: 'Resumo razoável. Tente alcançar 250+ caracteres para maior rankeamento ATS.', warn: true };
        if (countChars(v) > 650) return { ok: true, msg: 'Resumo longo. Considere manter entre 250 e 650 caracteres.', warn: true };
        return { ok: true, msg: 'Resumo executivo dentro do tamanho ideal.' };
      },
      skills: function (v) {
        if (!v || !v.trim()) return { ok: false, msg: 'Informe ao menos 5 linguagens / tecnologias.' };
        if (countChars(v) < 30) return { ok: false, msg: 'Liste mais tecnologias. ATS ranqueiam por frequência de keywords.' };
        if (countChars(v) < 80) return { ok: true, msg: 'Bom início. Adicione mais keywords relevantes do anúncio.', warn: true };
        return { ok: true, msg: 'Matriz de habilidades bem detalhada.' };
      },
      softskills: function (v) {
        if (!v || !v.trim()) return { ok: true, msg: 'Soft Skills são opcionais, mas recomendados para aderência cultural.', warn: true };
        if (countChars(v) < 40) return { ok: true, msg: 'Poucas Soft Skills listadas. Adicione: Liderança, Comunicação, Organização etc.', warn: true };
        return { ok: true, msg: 'Soft Skills listadas — diferencial para match cultural.' };
      }
    };

    function setFieldState(fieldName, result) {
      var label = form.querySelector('[data-validate="' + fieldName + '"]');
      if (!label) return;
      label.classList.remove('is-valid', 'is-invalid', 'is-warn', 'is-touched');
      if (result) {
        label.classList.add('is-touched');
        if (result.ok && result.warn) label.classList.add('is-warn');
        else if (result.ok) label.classList.add('is-valid');
        else label.classList.add('is-invalid');
      }
      var errId = fieldName + 'Error';
      var errEl = document.getElementById(errId);
      if (errEl && result) {
        errEl.textContent = result.ok ? '' : (result.msg || '');
        errEl.hidden = result.ok;
      }
    }

    function validateFieldByName(fieldName, value) {
      var fn = VALIDATORS[fieldName];
      if (!fn) return null;
      var res = fn(value || '');
      setFieldState(fieldName, res);
      return res;
    }

    function validateCurrentStep() {
      var stepIdx = state.currentStep;
      var fieldsByStep = {
        0: ['fullName', 'role', 'email', 'phone', 'location', 'linkedin', 'portfolio'],
        1: ['summary'],
        2: ['skills']
      };
      var required = fieldsByStep[stepIdx] || [];
      var errors = [];
      required.forEach(function (fname) {
        var inp = form.querySelector('[name="' + fname + '"]');
        var val = inp ? inp.value : '';
        var r = validateFieldByName(fname, val);
        if (r && !r.ok) errors.push({ field: fname, msg: r.msg });
      });
      return errors;
    }

    function showStepErrors(errors) {
      var el = document.getElementById('atsStepErrors');
      if (!el) return;
      if (!errors.length) { el.hidden = true; el.innerHTML = ''; return; }
      el.hidden = false;
      el.innerHTML = '<strong>Verifique o passo atual:</strong><ul>' +
        errors.map(function (e) { return '<li>' + escapeHtml(e.msg) + '</li>'; }).join('') +
        '</ul>';
    }

    // --------- Progress Bar ---------
    function calcOverallProgress() {
      var data = collectData(true);
      var validLang = (data.lang || []).filter(function (l) { return l.name && l.level; }).length;
      var validSoftCount = String(data.form.softskills || '').split(/[,;\n]+/).map(function (s) { return s.trim(); }).filter(Boolean).length;
      var checks = [
        !!(data.form.fullName && VALIDATORS.fullName(data.form.fullName).ok),
        !!(data.form.role && VALIDATORS.role(data.form.role).ok),
        !!(data.form.email && VALIDATORS.email(data.form.email).ok),
        !!(data.form.summary && countChars(data.form.summary) >= 250),
        !!(data.form.skills && countChars(data.form.skills) >= 80),
        !!(data.form.softskills && validSoftCount >= 5),
        (data.exp || []).filter(function (e) { return e.company && e.role; }).length >= 2,
        (data.edu || []).some(function (e) { return e.institution && e.course; }),
        (data.cert || []).some(function (c) { return c.name; }),
        validLang >= 1
      ];
      var done = checks.filter(Boolean).length;
      return Math.round((done / checks.length) * 100);
    }

    function updateProgressBar() {
      var pct = calcOverallProgress();
      var bar = document.getElementById('atsFormProgressBar');
      var txt = document.getElementById('atsFormProgressTxt');
      var wrap = document.querySelector('.ats-form__progress');
      if (bar) bar.style.width = String(pct) + '%';
      if (txt) txt.textContent = String(pct) + '% concluído';
      if (wrap) wrap.setAttribute('aria-valuenow', String(pct));
    }

    // --------- CV Alt Text (screen readers / text-indexable snapshot) ---------
    function buildCvAltText(data) {
      var f = data.form || {};
      var lines = [];
      lines.push('CURRÍCULO ATS (100% legível por scanners). Nome: ' + (f.fullName || 'não informado') + '. Cargo alvo: ' + (f.role || 'não informado') + '.');
      var locationRaw = f.location || '';
      var loc = locationRaw && /(distrito federal|df|brasilia)/i.test(locationRaw) ? 'Distrito Federal, Brasil' : (locationRaw ? locationRaw + ', Brasil' : '');
      var contactParts = [loc];
      if (f.email) contactParts.push('E-mail: ' + f.email);
      if (f.linkedin) {
        var li = String(f.linkedin).trim();
        if (!/^https?:\/\//i.test(li)) li = 'https://' + li.replace(/^\/+/, '');
        contactParts.push('LinkedIn: ' + li);
      }
      if (f.portfolio) {
        var po = String(f.portfolio).trim();
        if (!/^https?:\/\//i.test(po)) po = 'https://' + po.replace(/^\/+/, '');
        contactParts.push((/github\.com/i.test(po) ? 'GitHub: ' : 'Portfólio: ') + po);
      }
      if (f.phone) contactParts.push('Telefone: ' + f.phone);
      contactParts = contactParts.filter(Boolean);
      if (contactParts.length) lines.push('Contato: ' + contactParts.join(' · ') + '.');
      if (f.summary) lines.push('RESUMO PROFISSIONAL. ' + f.summary.replace(/\s+/g, ' ').replace(/\.?$/, '.'));
      lines.push('PRINCIPAIS COMPETÊNCIAS:');
      var splitClean = function (raw) {
        if (!raw) return [];
        return String(raw).split(/[,;\n]+/).map(function (s) {
          return s.replace(/^\s*[-•*\d\.\)\s]+/, '').replace(/\s*\.\s*$/, '').trim();
        }).filter(Boolean);
      };
      var dedupN = function (arr) {
        var seen = new Set(); var out = [];
        for (var k = 0; k < arr.length; k++) {
          var it = arr[k];
          var key = String(it || '').toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '');
          if (!key || seen.has(key)) continue;
          seen.add(key); out.push(it);
        }
        return out;
      };
      var hardDefaults = {
        linguagens: ['Java', 'Python', 'JavaScript', 'Ruby', 'SQL', 'COBOL', 'TypeScript', 'HTML', 'CSS', 'CI/CD'],
        frameworks: ['Selenium WebDriver', 'Cypress', 'Playwright', 'Katalon Studio', 'Robot Framework', 'Cucumber', 'JUnit', 'Behave', 'Capybara', 'RestAssured'],
        metodologias: ['Postman', 'Newman', 'Apidog', 'Swagger/OpenAPI', 'SoapUI', 'JMeter', 'Jenkins', 'Git', 'GitHub', 'GitLab CI', 'Jira', 'Redmine', 'TestLink', 'QASE', 'IBM RQM', 'Zephir', 'SonarQube', 'AWS', 'Docker', 'Scrum', 'Kanban', 'Shift-Left', 'ISTQB', 'Graylog', 'Mainframe', 'LeanFT', 'HTML Reports'],
        soft: ['Liderança Técnica', 'Capacidade Analítica', 'Atenção aos Detalhes', 'Comunicação Clara', 'Proatividade', 'Organização', 'Pensamento Crítico', 'Resolução de Problemas', 'Trabalho em Equipe', 'Adaptabilidade', 'Colaboração']
      };
      var linguagensArr = dedupN(splitClean(f.skills));
      var frameworksArr = dedupN(splitClean(f.frameworks));
      var metodologiasArr = dedupN(splitClean(f.tools));
      var softArr = dedupN(splitClean(f.softskills));
      if (linguagensArr.length + frameworksArr.length + metodologiasArr.length + softArr.length === 0) {
        linguagensArr = hardDefaults.linguagens.slice();
        frameworksArr = hardDefaults.frameworks.slice();
        metodologiasArr = hardDefaults.metodologias.slice();
        softArr = hardDefaults.soft.slice();
      }
      if (!linguagensArr.length) linguagensArr = hardDefaults.linguagens.slice();
      if (!frameworksArr.length) frameworksArr = hardDefaults.frameworks.slice();
      if (!metodologiasArr.length) metodologiasArr = hardDefaults.metodologias.slice();
      if (!softArr.length) softArr = hardDefaults.soft.slice();

      var hardAll = dedupN(linguagensArr.concat(frameworksArr).concat(metodologiasArr));

      lines.push('Hard Skills: ' + hardAll.join(', ') + '.');
      lines.push('Linguagens & Tecnologias: ' + linguagensArr.join(', ') + '.');
      lines.push('Frameworks de Automação e Ferramentas: ' + frameworksArr.join(', ') + '.');
      lines.push('Metodologias: ' + metodologiasArr.join(', ') + '.');
      lines.push('Soft Skills: ' + softArr.join(', ') + '.');
      var validExp = (data.exp || []).filter(function (e) { return e.company || e.role; });
      var lastThree = validExp.slice(-3);
      var older = validExp.slice(0, Math.max(0, validExp.length - 3));
      if (lastThree.length) {
        lines.push('EXPERIÊNCIA PROFISSIONAL (últimas ' + lastThree.length + ' de ' + validExp.length + '):');
        lastThree.forEach(function (e, i) {
          lines.push((i + 1) + '. ' + [e.company, e.role, e.period, e.location].filter(Boolean).join(' · ') + '.');
          var bullets = (e.bullets || '').split(/\r?\n/).map(function (s) { return s.replace(/^[•\-\*\d\.\)\s]+/, '').trim(); }).filter(Boolean);
          if (bullets.length) lines.push('   Conquistas: ' + bullets.join(' ') + '.');
        });
      }
      if (older.length) {
        lines.push('Experiências Anteriores (Resumo para Escaneabilidade):');
        older.forEach(function (o) {
          var oneBullet = ((o.bullets || '').split(/\r?\n/).map(function (s) { return s.replace(/^[•\-\*\d\.\)\s]+/, '').trim(); }).filter(Boolean)[0]) || '';
          lines.push(' • ' + [o.company, o.role, o.period].filter(Boolean).join(' | ') + (oneBullet ? ' – ' + oneBullet.replace(/\.?$/, '.') : '.'));
        });
      }
      var edus = (data.edu || []).filter(function (x) { return x.institution || x.course; });
      if (edus.length) {
        lines.push('FORMAÇÃO ACADÊMICA:');
        edus.forEach(function (e) {
          lines.push(' • ' + [e.course, e.institution, e.period].filter(Boolean).join(' | ') + '.');
          if (e.extra) lines.push(' • Extensões e Cursos Técnicos: ' + String(e.extra).replace(/\s+/g, ' ').replace(/\.?$/, '.'));
        });
      }
      var certs = (data.cert || []).filter(function (c) { return c.name; });
      if (certs.length) {
        lines.push('CERTIFICAÇÕES PROFISSIONAIS:');
        var principais = [], adicionais = [];
        certs.forEach(function (c) {
          var full = [c.name, c.issuer, c.year].filter(Boolean).join(', ');
          var add = /(curso|formação|formacao|treinamento|workshop|bootcamp|governança|governanca|lgpd|avançada|avancada|multistack)/i.test((c.name || '') + ' ' + (c.issuer || ''));
          if (add) adicionais.push(full); else principais.push(full);
        });
        principais.forEach(function (p) { lines.push(' • ' + p.replace(/\.?$/, '.')); });
        if (adicionais.length) lines.push(' • Formações Técnicas Adicionais: ' + adicionais.join('; ') + '.');
      }
      var langs = (data.lang || []).filter(function (l) { return l.name || l.level; });
      if (langs.length) lines.push('IDIOMAS: ' + langs.map(function (l) { return [l.name, l.level, l.certificate].filter(Boolean).join(' · '); }).join('; ') + '.');
      return lines.join('\n');
    }

    function updateCvAltText(data) {
      var el = document.getElementById('cvAltText');
      if (!el) return;
      try { el.textContent = buildCvAltText(data); } catch (_) {}
    }

    // --------- Summary visual bar ---------
    function updateSummaryBar(val) {
      var bar = document.getElementById('summaryBar');
      if (!bar) return;
      var pct = Math.min(100, Math.round((countChars(val) / 750) * 100));
      bar.style.width = String(pct) + '%';
      bar.classList.remove('is-weak', 'is-ok', 'is-good');
      if (countChars(val) < 150) bar.classList.add('is-weak');
      else if (countChars(val) < 250) bar.classList.add('is-ok');
      else bar.classList.add('is-good');
    }

    // --------- Stepper Keyboard Nav (roving tabindex) ---------
    function initStepperKeyboard() {
      var stepsContainer = document.getElementById('atsStepper');
      if (!stepsContainer) return;
      var btns = Array.prototype.slice.call(stepsContainer.querySelectorAll('.ats-step'));
      stepsContainer.addEventListener('keydown', function (ev) {
        var cur = document.activeElement;
        var idx = btns.indexOf(cur);
        if (idx === -1) return;
        var next = -1;
        if (ev.key === 'ArrowRight' || ev.key === 'ArrowDown') next = (idx + 1) % btns.length;
        else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowUp') next = (idx - 1 + btns.length) % btns.length;
        else if (ev.key === 'Home') next = 0;
        else if (ev.key === 'End') next = btns.length - 1;
        if (next !== -1) {
          ev.preventDefault();
          btns.forEach(function (b, i) { b.setAttribute('tabindex', i === next ? '0' : '-1'); });
          btns[next].focus();
        }
      });
    }

    // --------- Sticky Preview Toggle ---------
    function initPreviewPinToggle() {
      var btn = document.getElementById('atsPreviewPinBtn');
      var aside = document.getElementById('atsPreviewSide');
      if (!btn || !aside) return;
      btn.addEventListener('click', function () {
        var pinned = aside.classList.toggle('pinned');
        btn.setAttribute('aria-pressed', String(pinned));
      });
      aside.classList.add('pinned');
    }

    // --------- Step Navigation ---------
    function showStep(idx) {
      state.currentStep = Math.max(0, Math.min(stepperBtns.length - 1, idx));
      stepperBtns.forEach(function (b, i) {
        b.classList.toggle('active', i === state.currentStep);
        b.classList.toggle('done', i < state.currentStep);
        b.setAttribute('aria-selected', String(i === state.currentStep));
        b.setAttribute('tabindex', i === state.currentStep ? '0' : '-1');
      });
      panels.forEach(function (p, i) {
        if (i === state.currentStep) {
          p.removeAttribute('hidden');
          p.scrollIntoView && p.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } else {
          p.setAttribute('hidden', '');
        }
      });
      if (prevBtn) {
        prevBtn.disabled = state.currentStep === 0;
        prevBtn.style.visibility = state.currentStep === 0 ? 'hidden' : 'visible';
      }
      if (nextBtn) {
        var isLast = state.currentStep === stepperBtns.length - 1;
        nextBtn.textContent = isLast ? 'Finalizar ✓' : 'Próximo →';
        nextBtn.setAttribute('aria-label', isLast ? 'Finalizar e validar currículo' : 'Avançar para o próximo passo');
      }
    }

    stepperBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const s = parseInt(btn.getAttribute('data-step') || '0', 10);
        showStep(s);
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', function () { showStep(state.currentStep - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () {
      if (state.currentStep === stepperBtns.length - 1) {
        validateAll();
        updateProgressBar();
        window.scrollTo({ top: document.getElementById('ats-builder').offsetTop - 80, behavior: 'smooth' });
      } else {
        var stepErrs = validateCurrentStep();
        showStepErrors(stepErrs);
        if (stepErrs.length > 0) {
          var firstInvalid = form.querySelector('.is-invalid input, .is-invalid textarea');
          if (firstInvalid) { firstInvalid.focus(); firstInvalid.scrollIntoView && firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
          return;
        }
        showStep(state.currentStep + 1);
      }
    });

    // --------- Dynamic lists: Experience / Education / Certifications ---------
    function renderExpList() {
      const root = elsAts.list.exp;
      if (!root) return;
      root.innerHTML = '';
      if (state.exp.length === 0) state.exp.push({ company: '', role: '', period: '', location: '', bullets: '' });
      state.exp.forEach(function (e, i) {
        const block = document.createElement('div');
        block.className = 'ats-nested';
        block.innerHTML =
          '<div class="ats-nested__header">' +
            '<div class="ats-nested__title">💼 Experiência #' + (i + 1) + '</div>' +
            (state.exp.length > 1 ? '<button type="button" class="ats-nested__remove" data-remove-exp="' + i + '">Remover</button>' : '') +
          '</div>' +
          '<div class="ats-nested__grid">' +
            '<label class="ats-field ats-field--full"><span>Empresa *</span><input data-exp="company" value="' + escapeHtml(e.company) + '" placeholder="Meta, Stefanini, Wipro..."></label>' +
            '<label class="ats-field"><span>Cargo *</span><input data-exp="role" value="' + escapeHtml(e.role) + '" placeholder="QA Automation Engineer"></label>' +
            '<label class="ats-field"><span>Período *</span><input data-exp="period" value="' + escapeHtml(e.period) + '" placeholder="Jan/2023 – Atual"></label>' +
            '<label class="ats-field ats-field--full"><span>Localização</span><input data-exp="location" value="' + escapeHtml(e.location) + '" placeholder="Brasília - DF · Remoto"></label>' +
            '<label class="ats-field ats-field--full"><span>Principais conquistas (1 por linha, verbos + dados)</span>' +
              '<textarea data-exp="bullets" rows="4" placeholder="• Reduzi o tempo de regressão em 60% com framework Python + Behave.&#10;• Liderava 3 QAs, integrei testes ao pipeline Jenkins.&#10;• Validei APIs REST com Postman/Newman/RestAssured.">' + escapeHtml(e.bullets) + '</textarea>' +
            '</label>' +
          '</div>';
        root.appendChild(block);
      });

      root.querySelectorAll('[data-remove-exp]').forEach(function (b) {
        b.addEventListener('click', function () {
          const idx = parseInt(b.getAttribute('data-remove-exp') || '0', 10);
          state.exp.splice(idx, 1);
          renderExpList();
          runAtsPipeline();
        });
      });

      root.querySelectorAll('[data-exp]').forEach(function (inp) {
        inp.addEventListener('input', function (ev) {
          const p = ev.target.closest('.ats-nested');
          const idx = Array.prototype.indexOf.call(root.children, p);
          if (idx === -1) return;
          const key = ev.target.getAttribute('data-exp');
          state.exp[idx][key] = ev.target.value;
          saveState();
          runAtsPipeline();
        });
      });
    }

    function renderEduList() {
      const root = elsAts.list.edu;
      if (!root) return;
      root.innerHTML = '';
      if (state.edu.length === 0) state.edu.push({ institution: '', course: '', period: '', extra: '' });
      state.edu.forEach(function (e, i) {
        const block = document.createElement('div');
        block.className = 'ats-nested';
        block.innerHTML =
          '<div class="ats-nested__header">' +
            '<div class="ats-nested__title">🎓 Formação #' + (i + 1) + '</div>' +
            (state.edu.length > 1 ? '<button type="button" class="ats-nested__remove" data-remove-edu="' + i + '">Remover</button>' : '') +
          '</div>' +
          '<div class="ats-nested__grid">' +
            '<label class="ats-field"><span>Instituição *</span><input data-edu="institution" value="' + escapeHtml(e.institution) + '" placeholder="Instituto Superior Fátima (ISF)"></label>' +
            '<label class="ats-field"><span>Curso *</span><input data-edu="course" value="' + escapeHtml(e.course) + '" placeholder="Graduação em Análise e Desenvolvimento de Sistemas"></label>' +
            '<label class="ats-field ats-field--full"><span>Período</span><input data-edu="period" value="' + escapeHtml(e.period) + '" placeholder="2012 – 2016 · Concluído"></label>' +
            '<label class="ats-field ats-field--full"><span>Formações / Cursos complementares</span>' +
              '<textarea data-edu="extra" rows="2" placeholder="Administrador de Redes Linux; Redes de Computadores (ETB); Web Design (Bit Company).">' + escapeHtml(e.extra) + '</textarea>' +
            '</label>' +
          '</div>';
        root.appendChild(block);
      });

      root.querySelectorAll('[data-remove-edu]').forEach(function (b) {
        b.addEventListener('click', function () {
          const idx = parseInt(b.getAttribute('data-remove-edu') || '0', 10);
          state.edu.splice(idx, 1);
          renderEduList();
          runAtsPipeline();
        });
      });

      root.querySelectorAll('[data-edu]').forEach(function (inp) {
        inp.addEventListener('input', function (ev) {
          const p = ev.target.closest('.ats-nested');
          const idx = Array.prototype.indexOf.call(root.children, p);
          if (idx === -1) return;
          const key = ev.target.getAttribute('data-edu');
          state.edu[idx][key] = ev.target.value;
          saveState();
          runAtsPipeline();
        });
      });
    }

    function renderCertList() {
      const root = elsAts.list.cert;
      if (!root) return;
      root.innerHTML = '';
      if (state.cert.length === 0) state.cert.push({ name: '', issuer: '', year: '' });
      state.cert.forEach(function (c, i) {
        const block = document.createElement('div');
        block.className = 'ats-nested';
        block.innerHTML =
          '<div class="ats-nested__header">' +
            '<div class="ats-nested__title">🏆 Certificação #' + (i + 1) + '</div>' +
            (state.cert.length > 1 ? '<button type="button" class="ats-nested__remove" data-remove-cert="' + i + '">Remover</button>' : '') +
          '</div>' +
          '<div class="ats-nested__grid">' +
            '<label class="ats-field"><span>Nome da certificação *</span><input data-cert="name" value="' + escapeHtml(c.name) + '" placeholder="ISTQB CTFL - Certified Tester Foundation Level"></label>' +
            '<label class="ats-field"><span>Emissor / Instituição</span><input data-cert="issuer" value="' + escapeHtml(c.issuer) + '" placeholder="BSTQB / ISACA"></label>' +
            '<label class="ats-field ats-field--full"><span>Ano obtenção</span><input data-cert="year" value="' + escapeHtml(c.year) + '" placeholder="2019"></label>' +
          '</div>';
        root.appendChild(block);
      });

      root.querySelectorAll('[data-remove-cert]').forEach(function (b) {
        b.addEventListener('click', function () {
          const idx = parseInt(b.getAttribute('data-remove-cert') || '0', 10);
          state.cert.splice(idx, 1);
          renderCertList();
          runAtsPipeline();
        });
      });

      root.querySelectorAll('[data-cert]').forEach(function (inp) {
        inp.addEventListener('input', function (ev) {
          const p = ev.target.closest('.ats-nested');
          const idx = Array.prototype.indexOf.call(root.children, p);
          if (idx === -1) return;
          const key = ev.target.getAttribute('data-cert');
          state.cert[idx][key] = ev.target.value;
          saveState();
          runAtsPipeline();
        });
      });
    }

    function renderLangList() {
      const root = elsAts.list.lang;
      if (!root) return;
      root.innerHTML = '';
      if (state.lang.length === 0) state.lang.push({ name: '', level: '', certificate: '' });
      state.lang.forEach(function (l, i) {
        const block = document.createElement('div');
        block.className = 'ats-nested';
        block.innerHTML =
          '<div class="ats-nested__header">' +
            '<div class="ats-nested__title"><span aria-hidden="true">[Idioma] </span>#' + (i + 1) + '</div>' +
            (state.lang.length > 1 ? '<button type="button" class="ats-nested__remove" data-remove-lang="' + i + '">Remover</button>' : '') +
          '</div>' +
          '<div class="ats-nested__grid">' +
            '<label class="ats-field"><span>Idioma *</span><input data-lang="name" value="' + escapeHtml(l.name) + '" placeholder="Inglês, Espanhol, Francês, Alemão, Japonês..."></label>' +
            '<label class="ats-field"><span>Proficiência / Nível *</span>' +
              '<select data-lang="level" aria-label="Nível de proficiência do idioma">' +
                '<option value=""' + (l.level === '' ? ' selected' : '') + '>Selecione o nível...</option>' +
                '<option value="Nativo"' + (l.level === 'Nativo' ? ' selected' : '') + '>Nativo / Língua Materna</option>' +
                '<option value="Fluente / C2"' + (l.level === 'Fluente / C2' ? ' selected' : '') + '>Fluente (C2 · Proficiente)</option>' +
                '<option value="Avançado / C1"' + (l.level === 'Avançado / C1' ? ' selected' : '') + '>Avançado (C1)</option>' +
                '<option value="Intermediário / B2"' + (l.level === 'Intermediário / B2' ? ' selected' : '') + '>Intermediário Superior (B2)</option>' +
                '<option value="Intermediário / B1"' + (l.level === 'Intermediário / B1' ? ' selected' : '') + '>Intermediário (B1)</option>' +
                '<option value="Básico / A2"' + (l.level === 'Básico / A2' ? ' selected' : '') + '>Básico (A2)</option>' +
                '<option value="Iniciante / A1"' + (l.level === 'Iniciante / A1' ? ' selected' : '') + '>Iniciante (A1)</option>' +
              '</select>' +
            '</label>' +
            '<label class="ats-field ats-field--full"><span>Certificação oficial (opcional)</span><input data-lang="certificate" value="' + escapeHtml(l.certificate) + '" placeholder="TOEFL iBT 105 · IELTS Academic 7.5 · Cambridge C1 Advanced · DELE B2 · JLPT N2"></label>' +
          '</div>';
        root.appendChild(block);
      });

      root.querySelectorAll('[data-remove-lang]').forEach(function (b) {
        b.addEventListener('click', function () {
          const idx = parseInt(b.getAttribute('data-remove-lang') || '0', 10);
          state.lang.splice(idx, 1);
          renderLangList();
          runAtsPipeline();
        });
      });

      root.querySelectorAll('[data-lang]').forEach(function (inp) {
        inp.addEventListener('input', function (ev) {
          const p = ev.target.closest('.ats-nested');
          const idx = Array.prototype.indexOf.call(root.children, p);
          if (idx === -1) return;
          const key = ev.target.getAttribute('data-lang');
          state.lang[idx][key] = ev.target.value;
          saveState();
          runAtsPipeline();
        });
        inp.addEventListener('change', function (ev) {
          if (ev.target.tagName && ev.target.tagName.toLowerCase() === 'select') {
            const p = ev.target.closest('.ats-nested');
            const idx = Array.prototype.indexOf.call(root.children, p);
            if (idx === -1) return;
            const key = ev.target.getAttribute('data-lang');
            state.lang[idx][key] = ev.target.value;
            saveState();
            runAtsPipeline();
          }
        });
      });
    }

    if (addExpBtn) addExpBtn.addEventListener('click', function () {
      state.exp.push({ company: '', role: '', period: '', location: '', bullets: '' });
      renderExpList();
      runAtsPipeline();
    });
    if (addEduBtn) addEduBtn.addEventListener('click', function () {
      state.edu.push({ institution: '', course: '', period: '', extra: '' });
      renderEduList();
      runAtsPipeline();
    });
    if (addCertBtn) addCertBtn.addEventListener('click', function () {
      state.cert.push({ name: '', issuer: '', year: '' });
      renderCertList();
      runAtsPipeline();
    });
    if (addLangBtn) addLangBtn.addEventListener('click', function () {
      state.lang.push({ name: '', level: '', certificate: '' });
      renderLangList();
      runAtsPipeline();
    });

    // --------- Collect data from form + dynamic lists ---------
    function collectData(silent) {
      const data = {
        form: {},
        exp: state.exp.map(function (x) { return Object.assign({}, x); }),
        edu: state.edu.map(function (x) { return Object.assign({}, x); }),
        cert: state.cert.map(function (x) { return Object.assign({}, x); }),
        lang: state.lang.map(function (x) { return Object.assign({}, x); })
      };
      const fields = ['fullName', 'role', 'email', 'phone', 'location', 'linkedin', 'portfolio', 'summary', 'skills', 'frameworks', 'tools', 'softskills'];
      fields.forEach(function (f) {
        const inp = form.querySelector('[name="' + f + '"]');
        if (inp) data.form[f] = inp.value || '';
      });
      return data;
    }

    function applyLoadedState(data) {
      if (!data) return;
      var fields = ['fullName', 'role', 'email', 'phone', 'location', 'linkedin', 'portfolio', 'summary', 'skills', 'frameworks', 'tools', 'softskills'];
      fields.forEach(function (f) {
        var inp = form.querySelector('[name="' + f + '"]');
        if (inp && data.form && data.form[f] != null) {
          inp.value = (f === 'phone') ? applyPhoneMask(data.form[f]) : data.form[f];
        }
      });
      if (Array.isArray(data.exp) && data.exp.length) state.exp = data.exp;
      if (Array.isArray(data.edu) && data.edu.length) state.edu = data.edu;
      if (Array.isArray(data.cert) && data.cert.length) state.cert = data.cert;
      if (Array.isArray(data.lang) && data.lang.length) state.lang = data.lang;
      renderExpList();
      renderEduList();
      renderCertList();
      renderLangList();
      var summaryEl = form.querySelector('[name="summary"]');
      if (summaryEl && summaryCount) summaryCount.textContent = countChars(summaryEl.value);
    }

    function fillDemoData() {
      const demo = {
        form: {
          fullName: 'Fabrício Duarte',
          role: 'QA Automation Engineer & Senior Test Analyst',
          email: 'fabricio.4135@gmail.com',
          phone: '61 98426-0515',
          location: 'Brasília - DF',
          linkedin: 'https://www.linkedin.com/in/fabr%C3%ADcio-duarte-5223062a/',
          portfolio: 'https://github.com/bioadsl',
          summary: 'Analista de Testes Sênior e QA Automation Engineer com mais de 10 anos de sólida experiência em engenharia de qualidade de software, com forte atuação em liderança técnica e automação de testes funcionais e não-funcionais. Especialista na criação de robustos Test Automation Frameworks (Selenium, Cypress, Playwright, Katalon, Robot) para Web e Mobile. Amplo domínio em validação de APIs REST/SOAP com Postman, Newman e RestAssured. Atuação em sistemas de alta complexidade e missão crítica (Financeiro, Segurança Pública, Telecomunicações). Profissional certificado ISTQB CTFL, cultura Shift-Left e metodologias ágeis Scrum/Kanban com integração contínua em pipelines Jenkins e GitLab CI.',
          skills: 'Java, Python, JavaScript, Ruby, SQL, COBOL, TypeScript, HTML, CSS, CI/CD',
          frameworks: 'Selenium WebDriver, Cypress, Playwright, Katalon Studio, Robot Framework, Cucumber, JUnit, Behave, Capybara, RestAssured, LeanFT',
          tools: 'Postman, Newman, Apidog, Swagger/OpenAPI, SoapUI, JMeter, Jenkins, Git, GitHub, GitLab CI, Jira, Redmine, TestLink, QASE, IBM RQM, Zephir, SonarQube, AWS, Docker, Scrum, Kanban, Shift-Left, ISTQB, Graylog, Mainframe, LeanFT, HTML Reports',
          softskills: 'Liderança Técnica, Capacidade Analítica, Atenção aos Detalhes, Comunicação Clara, Proatividade, Organização, Pensamento Crítico, Resolução de Problemas, Trabalho em Equipe, Adaptabilidade, Colaboração'
        },
        exp: [
          {
            company: 'Meta', role: 'Analista de Qualidade de Software III (Sênior)', period: 'Dez/2025 – Atual', location: 'Remoto · Global',
            bullets: '• Otimizei a estabilidade e confiabilidade de plataformas globais conectando bilhões de usuários, por meio de frameworks de automação de testes de alta performance.\n• Garanti a integridade de contratos e regras de negócio em arquiteturas de microsserviços escaláveis, com validações rigorosas de APIs REST usando Postman, Newman e RestAssured.\n• Mitiguei riscos em produção via Data Validation em bancos Oracle, DB2, PostgreSQL e MySQL, criando cenários de teste complexos.'
          },
          {
            company: 'G4F (TSE / Trib. Eleitoral)', role: 'Analista de Qualidade de Software Sênior', period: 'Jun/2024 – Abr/2025', location: 'Brasília - DF',
            bullets: '• Assegurei a estabilidade em escala nacional de sistemas eleitorais e e-Título Android/iOS, sob tráfego massivo e alta criticidade.\n• Validei fluxos críticos de integridade biométrica e Liveness ativo/passivo, executando testes sobre a biblioteca GRIAULE.\n• Planejei e gerenciei testes nacionais de estresse, carga e performance em Apache JMeter, em cenários de eleições simuladas.\n• Desenvolvi ferramenta interna em Angular para geração de massas e consultas SQL estruturadas, reduzindo em 40% o tempo de preparação.\n• Diminuí falhas técnicas na esteira e assegurei conformidade ISO 27001 e LGPD, com Shift-Left desde suporte N1.'
          },
          {
            company: 'Snowman Labs', role: 'Analista de QA Sênior', period: 'Jan/2023 – Mai/2024', location: 'Brasília - DF',
            bullets: '• Liderei autonomamente a estratégia global de qualidade em fábrica ágil, estruturando planos, roteiros e suítes fim a fim no QASE.\n• Implementei framework de automação com Python + Behave (BDD/Gherkin), integrados ao CI/CD, acelerando detecção de defeitos diária.\n• Garanti paridade técnica e qualidade visual em Web/Mobile, isolando falhas front/back com Postman e Swagger.\n• Gerenciei ambientes de homologação em VMs e consultas avançadas em PostgreSQL para auditoria de dados.'
          },
          {
            company: 'Wipro (Projeto Telefônica VIVO)', role: 'Lead Test Analyst', period: 'Jan/2021 – Set/2022', location: 'Remoto',
            bullets: '• Liderei squads técnicos de engenharia de testes para o ecossistema crítico da VIVO, com estratégias de automação em Salesforce.\n• Implementei suítes robustas para validação sistêmica em Salesforce usando Java/JUnit/Cucumber e LeanFT.\n• Construí testes automatizados de API (REST) com RestAssured, elevando a confiabilidade das integrações de telecomunicações.\n• Automatizei esteiras build/test/deploy em Linux via SSH, gerindo ciclo DevOps via GitLab CI e Jenkins.'
          }
        ],
        edu: [
          {
            institution: 'Instituto Superior Fátima (ISF)',
            course: 'Graduação em Análise e Desenvolvimento de Sistemas',
            period: '2012 – 2016 · Concluído',
            extra: 'Administrador de Redes Linux (Sistemas Abertos); Redes de Computadores e Infraestrutura (ETB); Web Design e Mídias Digitais (Bit Company).'
          }
        ],
        cert: [
          { name: 'ISTQB CTFL - Certified Tester Foundation Level', issuer: 'BSTQB', year: '2015' },
          { name: 'Automação Web Avançada com Python, Selenium e Behave', issuer: 'Formação Técnica', year: '2023' },
          { name: 'Automação Multistack com Capybara, Cucumber e Ruby', issuer: 'Formação Técnica', year: '2022' },
          { name: 'Treinamento e Governança em LGPD', issuer: 'Compliance', year: '2024' }
        ],
        lang: [
          { name: 'Português', level: 'Nativo', certificate: '' },
          { name: 'Inglês', level: 'Intermediário / B2', certificate: 'Cambridge B2 First (FCE) · Pontuação 178' },
          { name: 'Espanhol', level: 'Básico / A2', certificate: '' }
        ]
      };
      applyLoadedState(demo);
      saveState();
      runAtsPipeline();
    }

    function clearAll() {
      if (!confirm('Tem certeza que deseja limpar todo o conteúdo do currículo?')) return;
      var errors = [];

      // Passo 1: Limpa Storage (tanto localStorage principal quanto sessionStorage temporário e qualquer chave de backup)
      try {
        clearState();
        try { sessionStorage.removeItem(STORAGE_KEY); } catch (_) {}
        try {
          // Remove qualquer outra chave que possa ser derivada do ATS Builder (backup, import temp, etc)
          var i = localStorage.length;
          while (i--) {
            try {
              var k = localStorage.key(i);
              if (k && /resume|ats-builder|curriculo|linkedin-import|cv-import/i.test(k)) localStorage.removeItem(k);
            } catch (_) {}
          }
          i = sessionStorage.length;
          while (i--) {
            try {
              var sk = sessionStorage.key(i);
              if (sk && /resume|ats-builder|curriculo|linkedin-import|cv-import/i.test(sk)) sessionStorage.removeItem(sk);
            } catch (_) {}
          }
        } catch (_) {}
      } catch (e) { errors.push('storage: ' + (e && e.message || e)); }

      // Passo 2: Reseta state completamente
      try {
        state = {
          currentStep: 0,
          form: {},
          exp: [],
          edu: [],
          cert: [],
          lang: []
        };
        currentStep = 0;
      } catch (e) { errors.push('state-reset: ' + (e && e.message || e)); }

      // Passo 3: Reseta o <form> HTML nativo + força limpeza de todos inputs
      try {
        form.reset();
        // Não confia só no form.reset(): força '' em text/email/tel/url/search/textarea/number + limpa selects
        var allInputs = form.querySelectorAll('input, textarea, select');
        allInputs.forEach(function (el) {
          try {
            var t = el.type && String(el.type).toLowerCase();
            if (t === 'file') { try { el.value = ''; } catch (_) {} return; }
            if (t === 'checkbox' || t === 'radio') { el.checked = false; return; }
            if (el.tagName === 'SELECT') {
              if (el.options && el.options.length) el.selectedIndex = 0;
              el.value = '';
            } else {
              el.value = '';
            }
            el.removeAttribute('value');
          } catch (_) {}
        });
      } catch (e) { errors.push('form-reset: ' + (e && e.message || e)); }

      // Passo 4: Reseta contadores, summaryBar, estado touched/erros de validação em TODOS os campos
      try {
        if (summaryCount) summaryCount.textContent = '0 caracteres';
        if (typeof updateSummaryBar === 'function') updateSummaryBar('');
        form.querySelectorAll('.ats-field').forEach(function (label) {
          label.classList.remove('is-valid', 'is-invalid', 'is-warn', 'is-touched');
        });
        form.querySelectorAll('.ats-field__error').forEach(function (errEl) {
          errEl.textContent = '';
          errEl.hidden = true;
        });
        var stepErrorsEl = document.getElementById('atsStepErrors');
        if (stepErrorsEl) { stepErrorsEl.hidden = true; stepErrorsEl.innerHTML = ''; }
      } catch (e) { errors.push('validation-ui: ' + (e && e.message || e)); }

      // Passo 5: Re-renderiza listas dinâmicas VAZIAS
      try {
        renderExpList && renderExpList();
        renderEduList && renderEduList();
        renderCertList && renderCertList();
        renderLangList && renderLangList();
      } catch (e) { errors.push('render-lists: ' + (e && e.message || e)); }

      // Passo 6: Volta para Passo 1 (Dados Pessoais) + foca primeiro campo
      try {
        if (typeof showStep === 'function') showStep(0);
        setTimeout(function () {
          try {
            var firstInput = form.querySelector('input[type="text"], input[type="email"], textarea, select');
            if (firstInput && typeof firstInput.focus === 'function') firstInput.focus({ preventScroll: true });
          } catch (_) {}
        }, 60);
      } catch (e) { errors.push('showstep-focus: ' + (e && e.message || e)); }

      // Passo 7: Reseta UI do importador LinkedIn (todas as camadas: dropzone / review / compact / thanks / progress / error / file)
      try {
        // Muda para modo dropzone (se existir)
        if (typeof setImportMode === 'function') try { setImportMode('dropzone'); } catch (_) {}
        if (typeof clearError === 'function') try { clearError(); } catch (_) {}
        if (typeof hideProgress === 'function') try { hideProgress(); } catch (_) {}

        // Esconde paineis e banners um por um, individualmente com try/catch
        var ids = ['atsThanksBanner', 'atsImportPanel', 'atsImportCompact', 'atsImportReview'];
        ids.forEach(function (id) {
          var el = document.getElementById(id);
          if (el) { try { el.hidden = true; } catch (_) {} }
        });

        // Limpa CONTEÚDO TEXTUAL do banner compacto (arquivo importado anteriormente)
        try {
          var cf = document.getElementById('atsCompactFile');
          if (cf) cf.textContent = '—';
          var cs = document.getElementById('atsCompactSub');
          if (cs) cs.textContent = 'Extração concluída. Campos mapeados do seu perfil.';
        } catch (_) {}

        // Limpa a tabela/quadro de estatísticas de review do import
        try {
          var stats = document.getElementById('atsImportStats');
          if (stats) stats.innerHTML = '';
        } catch (_) {}

        // Limpa mensagem de erro do importador
        try {
          var errEl = document.getElementById('atsImportError');
          if (errEl) { errEl.textContent = ''; errEl.hidden = true; }
        } catch (_) {}

        // Limpa classe visual de "drag over" no dropzone
        try {
          var dz = document.getElementById('atsDropzone');
          if (dz) {
            dz.classList.remove('is-dragover', 'is-over', 'dragover', 'drag-over');
            dz.removeAttribute('aria-dropeffect');
          }
        } catch (_) {}

        // Limpa <input type="file"> (arquivo escolhido anteriormente)
        try {
          var fi = document.getElementById('atsFileInput');
          if (fi) {
            fi.value = '';
            try { fi.files = new DataTransfer().files; } catch (_) {}
          }
        } catch (_) {}
      } catch (e) { errors.push('import-ui: ' + (e && e.message || e)); }

      // Passo 8: Reseta barra de progresso geral do formulário
      try {
        if (typeof calcOverallProgress === 'function') calcOverallProgress();
      } catch (e) { errors.push('progress: ' + (e && e.message || e)); }

      // Passo 9: Persiste estado vazio e força re-execução do pipeline ATS
      try { saveState(); } catch (_) {}
      try { if (typeof runAtsPipeline === 'function') runAtsPipeline(); } catch (e) { errors.push('pipeline: ' + (e && e.message || e)); }

      // 10. Garantia final: re-remove a chave do storage de novo, por segurança
      try { clearState(); } catch (_) {}

      // Tratamento de erro amigável (não trava o usuário — só avisa no console se algo falhou em submódulo)
      if (errors.length) {
        try { console.warn('[ATS Builder:clearAll] passos com recuperação de falha:', errors); } catch (_) {}
      }
    }

    // --------- Bindings principais (wrap defensivo: 1 erro em 1 botão NÃO PODE quebrar os demais) ---------
    try { if (fillDemoBtn) fillDemoBtn.addEventListener('click', function (e) { try { e && e.preventDefault && e.preventDefault(); fillDemoData(); } catch (err) { console.error('[ATS Builder:demoData]', err); } }); }
    catch (err) { console.error('[ATS Builder:init] falha no bind demoBtn (não impede clearBtn)', err); }

    try { if (clearBtn) clearBtn.addEventListener('click', function (e) { try { e && e.preventDefault && e.preventDefault(); clearAll(); } catch (err) { console.error('[ATS Builder:clearAll] FALHA CRÍTICA (fallback forçado):', err); try { fallbackClearAll(); } catch (e2) { console.error(e2); } } }); }
    catch (err) {
      console.error('[ATS Builder:init] FALHA CRÍTICA no bind do clearBtn — instalando fallback onclick global', err);
      try {
        // Fallback último recurso: onclick direto no elemento (funciona mesmo se addEventListener throwar)
        if (clearBtn) clearBtn.onclick = function (ev) { try { ev && ev.preventDefault && ev.preventDefault(); clearAll(); } catch (e2) { try { fallbackClearAll(); } catch (_) {} } };
      } catch (_) {}
    }

    try { if (printBtn) printBtn.addEventListener('click', function () {
      try {
        // Exporta o currículo para PDF nativo via window.print + estilos @media print ATS
        window.setTimeout(function () {
          try { window.print(); } catch (err) { console.error('window.print falhou:', err); }
        }, 60);
      } catch (err) { console.error('[ATS Builder:print]', err); }
    }); } catch (err) { console.error('[ATS Builder:init] falha no bind printBtn', err); }

    // Fallback ultra-seguro de limpeza (roda mesmo se algum helper do clearAll quebrar)
    function fallbackClearAll() {
      try {
        try { localStorage.clear(); } catch (_) {}
        try { sessionStorage.clear(); } catch (_) {}
        try { form.reset(); } catch (_) {}
        try { window.location.reload(); } catch (_) {}
      } catch (_) {}
    }

    try { window.__atsClearAll = clearAll; window.__atsFallbackClearAll = fallbackClearAll; } catch (_) { /* sandboxed iframe: ignora */ }

    // --------- Live form events: input + preview update ---------
    form.addEventListener('input', function (ev) {
      var target = ev.target;
      if (target && target.name) {
        if (VALIDATORS[target.name]) {
          validateFieldByName(target.name, target.value);
        }
        if (target.name === 'summary') {
          updateSummaryBar(target.value);
        }
      }
      saveState();
      if (summaryCount && ev.target && ev.target.name === 'summary') {
        summaryCount.textContent = countChars(ev.target.value);
      }
      runAtsPipeline();
    });

    form.addEventListener('focusout', function (ev) {
      var target = ev.target;
      if (target && target.name && VALIDATORS[target.name]) {
        validateFieldByName(target.name, target.value);
      }
    });

    // --------- Render Live Preview (CV paper) ---------
    function renderPreview(data) {
      const f = data.form || {};
      const cv = elsAts.preview;

      const setText = function (el, v, emptyText) {
        if (!el) return;
        if (!v) { el.textContent = emptyText || ''; el.classList.add('cv__empty'); return; }
        el.classList.remove('cv__empty');
        el.textContent = v;
      };

      setText(cv.name, (f.fullName || '').trim() || 'NOME COMPLETO', 'NOME COMPLETO');
      setText(cv.role, (f.role || '').trim() || 'Cargo Profissional', 'Cargo Profissional');

      if (cv.contact) {
        const parts = [];
        var pushHtml = function (rawHtml) { parts.push(rawHtml); };
        if (f.location) {
          if (/distrito federal|brasilia|brasília|\bDF\b/i.test(f.location)) {
            pushHtml(escapeHtml('Distrito Federal, Brasil'));
          } else {
            pushHtml(escapeHtml(f.location + ', Brasil'));
          }
        }
        if (f.email) {
          var email = String(f.email).trim();
          var mailto = 'mailto:' + encodeURIComponent(email);
          pushHtml('<a href="' + escapeHtml(mailto) + '" class="cv-contact__link" target="_blank" rel="noopener noreferrer" aria-label="E-mail: ' + escapeHtml(email) + '">' + escapeHtml(email) + '</a>');
        }
        if (f.linkedin) {
          var linkedin = String(f.linkedin).trim();
          if (!/^https?:\/\//i.test(linkedin)) linkedin = 'https://' + linkedin.replace(/^\/+/, '');
          pushHtml('<a href="' + escapeHtml(linkedin) + '" class="cv-contact__link" target="_blank" rel="noopener noreferrer" aria-label="Perfil do LinkedIn: ' + escapeHtml(linkedin) + '">Linkedin</a>');
        }
        if (f.portfolio) {
          var port = String(f.portfolio).trim();
          if (!/^https?:\/\//i.test(port)) port = 'https://' + port.replace(/^\/+/, '');
          var portLabel = /github\.com/i.test(port) ? 'GitHub' : 'Portfólio';
          pushHtml('<a href="' + escapeHtml(port) + '" class="cv-contact__link" target="_blank" rel="noopener noreferrer" aria-label="Portfólio / GitHub: ' + escapeHtml(port) + '">' + escapeHtml(portLabel) + '</a>');
        }
        if (f.phone) {
          var tel = String(f.phone).replace(/\D+/g, '');
          if (tel.length >= 10) {
            var telHref = 'tel:+55' + tel.replace(/^55/, '');
            pushHtml('<a href="' + escapeHtml(telHref) + '" class="cv-contact__link" aria-label="Telefone: ' + escapeHtml(f.phone) + '">' + escapeHtml(f.phone) + '</a>');
          } else {
            pushHtml(escapeHtml(f.phone));
          }
        }
        cv.contact.innerHTML = parts.join(' · ');
      }

      setText(cv.summary, f.summary);

      // PRINCIPAIS COMPETÊNCIAS (1:1 com o formulário de habilidades):
      // - [Label agregado] Hard Skills: união DEDUP das 3 categorias de hard skills (linguagens + frameworks + metodologias).
      // - [1] Linguagens & Tecnologias        ← textarea [name="skills"] (obrigatório do form)
      // - [2] Frameworks de Automação e Ferramentas ← textarea [name="frameworks"]
      // - [3] Metodologias ← textarea [name="tools"] (Ferramentas & Metodologias do form)
      // - [4] Soft Skills ← textarea [name="softskills"] (Comportamentais / Culturais)
      if (cv.skills) {
        var dedupNormalize = function (s) {
          return String(s || '')
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '');
        };
        var splitClean = function (raw) {
          if (!raw) return [];
          return String(raw).split(/[,;\n]+/).map(function (s) {
            return s.replace(/^\s*[-•*\d\.\)\s]+/, '').replace(/\s*\.\s*$/, '').trim();
          }).filter(Boolean);
        };

        var linguagensList = splitClean(f.skills);
        var frameworksList = splitClean(f.frameworks);
        var metodologiasList = splitClean(f.tools);
        var softList = splitClean(f.softskills);

        var defaults = {
          linguagens: ['Java', 'Python', 'JavaScript', 'Ruby', 'SQL', 'COBOL', 'TypeScript', 'HTML', 'CSS', 'CI/CD'],
          frameworks: ['Selenium WebDriver', 'Cypress', 'Playwright', 'Katalon Studio', 'Robot Framework', 'Cucumber', 'JUnit', 'Behave', 'Capybara', 'RestAssured'],
          metodologias: ['Postman', 'Newman', 'Apidog', 'Swagger/OpenAPI', 'SoapUI', 'JMeter', 'Jenkins', 'Git', 'GitHub', 'GitLab CI', 'Jira', 'Redmine', 'TestLink', 'QASE', 'IBM RQM', 'Zephir', 'SonarQube', 'AWS', 'Docker', 'Scrum', 'Kanban', 'Shift-Left', 'ISTQB', 'Graylog', 'Mainframe', 'LeanFT', 'HTML Reports'],
          soft: ['Liderança Técnica', 'Capacidade Analítica', 'Atenção aos Detalhes', 'Comunicação Clara', 'Proatividade', 'Organização', 'Pensamento Crítico', 'Resolução de Problemas', 'Trabalho em Equipe', 'Adaptabilidade', 'Colaboração']
        };

        var hasExplicit = linguagensList.length + frameworksList.length + metodologiasList.length + softList.length > 0;
        if (!hasExplicit) {
          linguagensList = defaults.linguagens.slice();
          frameworksList = defaults.frameworks.slice();
          metodologiasList = defaults.metodologias.slice();
          softList = defaults.soft.slice();
          cv.skills.classList.add('cv__empty');
        } else {
          cv.skills.classList.remove('cv__empty');
          if (!linguagensList.length) linguagensList = defaults.linguagens.slice();
          if (!frameworksList.length) frameworksList = defaults.frameworks.slice();
          if (!metodologiasList.length) metodologiasList = defaults.metodologias.slice();
          if (!softList.length) softList = defaults.soft.slice();
        }

        // Dedup interno de cada categoria (mantém ordem de aparição)
        function dedup(arr) {
          var seen = new Set(); var out = [];
          for (var i = 0; i < arr.length; i++) {
            var item = arr[i]; var key = dedupNormalize(item);
            if (!key || seen.has(key)) continue;
            seen.add(key); out.push(item);
          }
          return out;
        }
        linguagensList = dedup(linguagensList);
        frameworksList = dedup(frameworksList);
        metodologiasList = dedup(metodologiasList);
        softList = dedup(softList);

        // Hard Skills (label agregado): união dedup das 3 categorias de hard skills.
        // (Soft Skills NÃO entra no agregado de hard skills — categoria separada).
        var hardSeen = new Set();
        var hardSkillsArr = [];
        function pushHard(item) {
          var k = dedupNormalize(item); if (!k) return;
          if (hardSeen.has(k)) return;
          hardSeen.add(k); hardSkillsArr.push(item);
        }
        linguagensList.forEach(pushHard);
        frameworksList.forEach(pushHard);
        metodologiasList.forEach(pushHard);
        if (!hardSkillsArr.length) hardSkillsArr = defaults.linguagens.concat(defaults.frameworks).concat(defaults.metodologias);

        cv.skills.innerHTML =
          '<p><strong>Hard Skills:</strong> ' + hardSkillsArr.map(escapeHtml).join(', ') + '.</p>' +
          '<p><strong>Linguagens &amp; Tecnologias:</strong> ' + linguagensList.map(escapeHtml).join(', ') + '.</p>' +
          '<p><strong>Frameworks de Automação e Ferramentas:</strong> ' + frameworksList.map(escapeHtml).join(', ') + '.</p>' +
          '<p><strong>Metodologias:</strong> ' + metodologiasList.map(escapeHtml).join(', ') + '.</p>' +
          '<p><strong>Soft Skills:</strong> ' + softList.map(escapeHtml).join(', ') + '.</p>';
      }

      // Experiência Profissional: 3 últimas completas + demais em "Experiências Anteriores (Resumo para Escaneabilidade)"
      if (cv.exp) {
        var validExp = (data.exp || []).filter(function (e) { return e.company || e.role; });
        if (validExp.length === 0) {
          cv.exp.classList.add('cv__empty');
          cv.exp.innerHTML =
            '<div class="cv-exp__job">' +
              '<p class="cv-exp__company">Meta</p>' +
              '<p class="cv-exp__position">Analista de Qualidade de Software III (Sênior)</p>' +
              '<p class="cv-exp__period">Dezembro de 2025 – Atual</p>' +
              '<ul class="cv-exp__bullets">' +
                '<li>Otimizei a estabilidade e a confiabilidade de plataformas globais conectando bilhões de usuários, por meio de automação de testes em alta performance.</li>' +
                '<li>Garanti a integridade de contratos e regras de negócio em arquiteturas de microsserviços escaláveis, com validações rigorosas de APIs REST.</li>' +
              '</ul>' +
            '</div>';
        } else {
          cv.exp.classList.remove('cv__empty');
          var lastThree = validExp.slice(-3);
          var older = validExp.slice(0, Math.max(0, validExp.length - 3));
          var bulletMap = function (raw) {
            return (raw || '')
              .split(/\r?\n/)
              .map(function (s) { return s.replace(/^[•\-\*\d\.\)\s]+/, '').trim(); })
              .filter(Boolean)
              .map(function (b) { return '<li>' + escapeHtml(b.endsWith('.') ? b : (b + '.')) + '</li>'; })
              .join('');
          };
          var html = lastThree.map(function (e) {
            return '<div class="cv-exp__job">' +
                     (e.company ? '<p class="cv-exp__company">' + escapeHtml(e.company) + '</p>' : '') +
                     (e.role ? '<p class="cv-exp__position">' + escapeHtml(e.role) + '</p>' : '') +
                     (e.period ? '<p class="cv-exp__period">' + escapeHtml(e.period) + '</p>' : '') +
                     (e.bullets ? '<ul class="cv-exp__bullets">' + bulletMap(e.bullets) + '</ul>' : '') +
                   '</div>';
          }).join('');

          if (older.length) {
            html += '<div class="cv-exp__previous-subsection">' +
              '<p class="cv-exp__previous-title">Experiências Anteriores (Resumo para Escaneabilidade)</p>' +
              '<ul class="cv-exp__previous-list">' +
              older.map(function (o) {
                var parts = [o.company, o.role, o.period].filter(function (x) { return x && String(x).trim(); });
                var descr = parts.join(' | ') + (parts.length ? ' – ' : '') + ((o.bullets || '')
                  .split(/\r?\n/)
                  .map(function (s) { return s.replace(/^[•\-\*\d\.\)\s]+/, '').trim(); })
                  .filter(Boolean)
                  .slice(0, 1)
                  .join(' '));
                return '<li>' + escapeHtml(descr) + (descr.endsWith('.') ? '' : '.') + '</li>';
              }).join('') +
              '</ul></div>';
          }
          cv.exp.innerHTML = html;
        }
      }

      // Education (Formação Acadêmica + Extensões e Cursos Técnicos)
      if (cv.edu) {
        const has = data.edu && data.edu.some(function (e) { return e.institution || e.course; });
        if (!has) {
          cv.edu.classList.add('cv__empty');
          cv.edu.innerHTML =
            '<p><strong>Graduação em Análise e Desenvolvimento de Sistemas</strong> | Instituto Superior Fátima (ISF) – Concluído.</p>' +
            '<p><strong>Extensões e Cursos Técnicos:</strong> Administrador de Redes Linux (Sistemas Abertos); Redes de Computadores e Infraestrutura (Escola Técnica de Brasília); Web Design e Mídias Digitais (Bit Company).</p>';
        } else {
          cv.edu.classList.remove('cv__empty');
          var extras = [];
          var formacoes = data.edu.map(function (e) {
            var course = e.course || '';
            var inst = e.institution || '';
            var period = e.period || '';
            var mainLine = '';
            if (course && inst) mainLine = '<p><strong>' + escapeHtml(course) + '</strong> | ' + escapeHtml(inst) + (period ? ' – ' + escapeHtml(period) : '') + '.</p>';
            else if (course || inst) mainLine = '<p><strong>' + escapeHtml(course || inst) + '</strong> –</p>';
            if (e.extra && String(e.extra).trim()) extras.push(escapeHtml(e.extra.trim()));
            return mainLine;
          }).filter(Boolean).join('');
          var extrasLine = extras.length
            ? '<p><strong>Extensões e Cursos Técnicos:</strong> ' + extras.join('; ') + '.</p>'
            : '<p><strong>Extensões e Cursos Técnicos:</strong> —</p>';
          cv.edu.innerHTML = formacoes + extrasLine;
        }
      }

      // Certificações PROFISSIONAIS (duas colunas: certificações principais + Formações Técnicas Adicionais)
      if (cv.cert) {
        const has = data.cert && data.cert.some(function (c) { return c.name; });
        if (!has) {
          cv.cert.classList.add('cv__empty');
          cv.cert.innerHTML =
            '<p><strong>ISTQB CTFL</strong> – Certified Tester Foundation Level (BSTQB / International Software Testing Qualifications Board).</p>' +
            '<p><strong>COBIT 5 Foundation.</strong></p>' +
            '<p><strong>Formações Técnicas Adicionais:</strong> Automação Web Avançada com Python, Selenium e Behave; Automação Multistack com Capybara, Cucumber e Ruby; Treinamento e Governança em LGPD.</p>';
        } else {
          cv.cert.classList.remove('cv__empty');
          var principais = [];
          var adicionais = [];
          data.cert.forEach(function (c) {
            if (!c.name) return;
            var txt = escapeHtml(c.name);
            if (c.issuer || c.year) txt += ' – ' + [c.issuer, c.year].filter(Boolean).join(' / ');
            var nameLc = (c.name || '').toLowerCase();
            var issuerLc = (c.issuer || '').toLowerCase();
            var isAdd = /(curso|formação|formacao|treinamento|workshop|bootcamp|governança|governanca|lgpd|avançada|avancada|multistack|extensão|extensao)/i.test(nameLc) || /(formação|formacao|treinamento)/i.test(issuerLc);
            if (isAdd) adicionais.push(txt.replace(/\.$/, ''));
            else principais.push(txt.replace(/\.$/, ''));
          });
          var princHtml = principais.length
            ? principais.map(function (p) { return '<p><strong>' + p + '.</strong></p>'; }).join('')
            : '';
          var addHtml = '<p><strong>Formações Técnicas Adicionais:</strong> ' +
            (adicionais.length ? adicionais.join('; ') : '—') + '.</p>';
          cv.cert.innerHTML = princHtml + addHtml;
        }
      }

      // Languages
      if (cv.lang) {
        const has = data.lang && data.lang.some(function (l) { return l.name && l.level; });
        if (!has) { cv.lang.classList.add('cv__empty'); cv.lang.textContent = 'Português — Nativo · Inglês — Intermediário / B2 · Espanhol — Básico / A2'; }
        else {
          cv.lang.classList.remove('cv__empty');
          cv.lang.innerHTML = data.lang.filter(function (l) { return l.name || l.level; }).map(function (l) {
            return '<div class="cv-lang__item"><strong>' + escapeHtml(l.name || '—') + '</strong>' +
              (l.level ? ' · ' + escapeHtml(l.level) : '') +
              (l.certificate ? ' <span class="cv-lang__cert">(' + escapeHtml(l.certificate) + ')</span>' : '') +
              '</div>';
          }).join('');
        }
      }
    }

    // --------- ATS Validator: 16 rules (Workday / SuccessFactors / Greenhouse) ---------
    function buildRules(data) {
      const f = data.form || {};
      const skillsFlat = [f.skills, f.frameworks, f.tools].join(' ').toLowerCase();
      const sumLower = (f.summary || '').toLowerCase();
      const exp = data.exp || [];
      const edu = data.edu || [];
      const cert = data.cert || [];
      const lang = data.lang || [];

      const rules = [];

      const rule = function (pass, warn, title, hint, weight) {
        const status = pass ? 'pass' : (warn ? 'warn' : 'fail');
        rules.push({ status: status, title: title, hint: hint, weight: weight || 1 });
      };

      // 1. Nome completo
      rule(
        !!f.fullName && f.fullName.trim().split(/\s+/).length >= 2,
        false,
        'Nome completo detectável',
        'ATS extraem o nome na 1ª linha. Evite abreviações (ex: "Fabricio D.") — escreva nome + sobrenome.',
        2
      );

      // 2. Cargo profissional
      rule(
        !!f.role && f.role.trim().length >= 15,
        !!f.role,
        'Cargo profissional definido',
        'Use títulos compatíveis com anúncios: "QA Automation Engineer", "Senior Test Analyst", "SDET", "Analista de Testes Sênior".',
        2
      );

      // 3. E-mail profissional
      rule(
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email || '') && !/(hotmail|ig|yahoo|bol\.com\.br)/i.test(f.email),
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email || ''),
        'E-mail profissional válido',
        'Prefira Gmail, domínio próprio ou Outlook. Evite provedores desatualizados (Hotmail, Yahoo, Bol).',
        2
      );

      // 4. Telefone para contato
      rule(!!f.phone && f.phone.replace(/\D/g, '').length >= 11, !!f.phone, 'Telefone / WhatsApp presente', 'Número com DDD + 9 dígitos: scanners de IA extraem contato direto para triagem inicial.', 1);

      // 5. LinkedIn
      rule(
        /linkedin\.com\/in\/[^/\s]+/i.test(f.linkedin || ''),
        !!(f.linkedin && f.linkedin.includes('linkedin')),
        'LinkedIn com /in/ customizado',
        'Ajuste sua URL do LinkedIn para um perfil público padrão: linkedin.com/in/seu-nome.',
        1
      );

      // 6. Resumo size >= 250 chars
      rule(
        countChars(f.summary) >= 250,
        countChars(f.summary) >= 150,
        'Resumo profissional ≥ 250 caracteres',
        '3–5 frases: anos de XP, stack principal, domínio de atuação, 1–2 projetos de impacto. IA recrutadoras usam esse bloco para match.',
        3
      );

      // 7. Keywords de QA / Automation
      const requiredKws = ['selenium', 'cypress', 'playwright', 'api', 'jenkins', 'sql', 'cucumber', 'bdd', 'ci/cd', 'jira', 'scrum'];
      let matched = 0;
      requiredKws.forEach(function (k) { if (skillsFlat.indexOf(k) !== -1 || sumLower.indexOf(k) !== -1) matched++; });
      rule(matched >= 8, matched >= 5, 'Palavras-chave de QA: ' + matched + '/' + requiredKws.length,
        'Palavras do anúncio: Selenium, Cypress, Playwright, API, Jenkins, SQL, Cucumber/BDD, CI/CD, Jira, Scrum. Quanto mais match, maior rank no ATS.', 3);

      // 8. Skills section filled
      rule(
        countChars(f.skills) >= 80 && countChars(f.frameworks) >= 50,
        countChars(f.skills) >= 30,
        'Habilidades detalhadas',
        'Separe Linguagens, Frameworks de Automação e Ferramentas. ATS ranqueiam por frequência dessas keywords.',
        2
      );

      // 9. 3+ recent experience
      rule(exp.filter(function (e) { return e.company && e.role; }).length >= 3,
        exp.filter(function (e) { return e.company && e.role; }).length >= 2,
        'Mínimo 3 cargos recentes listados',
        'Experiências: empregabilidade. Evite gaps > 2 anos sem justificativa no resumo.',
        3
      );

      // 10. Bullets with numbers / metrics
      const hasMetrics = exp.some(function (e) { return /(\d+[.,]?\d*%\s|R\$|\+?\d+(?:\.\d+)?\s*(?:%|anos|meses|equipes|qas|usuários|casos|scripts|repositórios?|testes))/.test(e.bullets || ''); });
      rule(hasMetrics, false, 'Resultados mensuráveis (% / R$ / quantidade)',
        'Use verbos ação (Implementei, Lidei, Reduzi, Otimizei) + números: "redução de 60%", "liderava 3 QAs", "R$ 2M/ano economizados". IA prioriza impacto numérico.',
        3
      );

      // 11. Experience bullets per role >= 2
      const goodBullets = exp.filter(function (e) { return (e.bullets || '').split(/\r?\n/).filter(function (l) { return l.trim().length > 15; }).length >= 2; }).length;
      const minForPass = Math.max(2, Math.floor(exp.length * 0.7));
      rule(goodBullets >= minForPass, goodBullets >= 1,
        '≥ 2 bullets por cargo: ' + goodBullets + '/' + exp.length,
        'Evite "Realizei testes". Escreva: Contexto → Ação → Impacto (CAR).', 2);

      // 12. Education
      rule(edu.filter(function (e) { return e.institution && e.course; }).length >= 1,
        edu.some(function (e) { return e.institution || e.course; }),
        'Formação acadêmica registrada',
        'Sistemas Workday validam formação mínima para o cargo. Mantenha graduação completa + cursos complementares.', 2);

      // 13. Certifications presence
      rule(cert.filter(function (c) { return c.name; }).length >= 2,
        cert.some(function (c) { return c.name; }),
        'Certificações listadas (ex: ISTQB CTFL)',
        'Certificações diferenciam: ISTQB, AWS, Scrum, Cypress, Selenium. Diferencial em vagas de QA sênior.', 1);

      // 14. No special chars in critical fields (images/tables detection)
      const suspectChars = /[\u2700-\u27BF\u{1F000}-\u{1FAFF}\|“”‘’•●◆★☆✓✗]/u.test([f.fullName, f.role, f.email, f.phone, f.location].join(''));
      rule(!suspectChars, !suspectChars,
        'Sem caracteres especiais no topo do currículo',
        'Evite emojis, ícones, pipes e símbolos em nome/cargo/contato — Workday/Greenhouse quebram a extração.', 2);

      // 15. Idiomas com nível
      const validLangs = lang.filter(function (l) { return l.name && l.level; });
      const withCert = lang.filter(function (l) { return l.name && l.level && l.certificate; }).length;
      rule(
        validLangs.length >= 2 && withCert >= 1,
        validLangs.length >= 1,
        'Idiomas com nível + certificação: ' + validLangs.length + ' cadastrados',
        'Para vagas multinacionais e globais, cadastre 2+ idiomas com nível (CEFR A1–C2) e 1 certificação (TOEFL, IELTS, Cambridge, DELE, JLPT).',
        2
      );

      // 16. ATS-friendly filename + export PDF (button available when >=65pts is a proxy for preview being rich)
      rule(
        exp.length >= 2 && countChars(f.summary) >= 250 && matched >= 7 && validLangs.length >= 1,
        true,
        'Pronto para exportar em PDF',
        'Clique em "Exportar PDF ATS" (via impressão do navegador). Salve como "Nome-Sobrenome-QA-Automation-Engineer-2026.pdf" — NUNCA envie "curriculo-final-v3.pdf".',
        2
      );

      return rules;
    }

    function renderRules(rules) {
      const list = elsAts.score.list;
      if (!list) return;
      list.innerHTML = rules.map(function (r) {
        return '<li class="ats-rule ' + r.status + '">' +
                 '<span class="ats-rule__icon" aria-hidden="true"></span>' +
                 '<div><div class="ats-rule__title">' + escapeHtml(r.title) + '</div>' +
                 (r.hint ? '<div class="ats-rule__hint">' + escapeHtml(r.hint) + '</div>' : '') +
                 '</div></li>';
      }).join('');
    }

    function calcScore(rules) {
      let max = 0, have = 0;
      rules.forEach(function (r) {
        max += r.weight;
        if (r.status === 'pass') have += r.weight;
        else if (r.status === 'warn') have += Math.max(0, r.weight - 1);
      });
      if (max === 0) return 0;
      return Math.round((have / max) * 100);
    }

    function updateScore(score, rules) {
      const s = elsAts.score;
      if (s.value) s.value.textContent = String(score);
      const deg = Math.round((score / 100) * 360);
      if (s.ring) s.ring.style.setProperty('--score-deg', String(deg));

      let statusClass = 'fail', statusText = 'Compatibilidade baixa', desc = 'Ajuste os itens abaixo para aumentar sua pontuação. Currículos abaixo de 70 são comumente filtrados por Workday e IA recrutadoras.';
      if (score >= 85) { statusClass = 'pass'; statusText = 'Excelente! ATS-ready'; desc = 'Seu currículo está alinhado aos 15 padrões de Workday, SuccessFactors, Greenhouse e Lumesse. Pode exportar! 🎉'; }
      else if (score >= 65) { statusClass = 'warn'; statusText = 'Pontuação boa · pode melhorar'; desc = 'Quase lá! Foco em: resumo >250 chars + bullets com métricas (%) + keywords de QA.'; }

      if (s.status) { s.status.className = 'ats-score__status ' + statusClass; s.status.textContent = statusText; }
      if (s.desc) s.desc.textContent = desc;

      // Habilitar botão exportar
      if (printBtn) printBtn.disabled = score < 40;
    }

    function validateAll() {
      // Vai passo a passo marcando steps completos
      const data = collectData(true);
      const rules = buildRules(data);
      renderRules(rules);
      const score = calcScore(rules);
      updateScore(score, rules);
    }

    // --------- Pipeline: on every input → update preview + validator ---------
    function runAtsPipeline() {
      const data = collectData(true);
      renderPreview(data);
      updateCvAltText(data);
      const rules = buildRules(data);
      renderRules(rules);
      const score = calcScore(rules);
      updateScore(score, rules);
      updateProgressBar();
    }

    // --------- Init ---------
    const saved = loadState();
    if (saved) {
      applyLoadedState(saved);
    } else {
      state.exp = [{ company: '', role: '', period: '', location: '', bullets: '' }];
      state.edu = [{ institution: '', course: '', period: '', extra: '' }];
      state.cert = [{ name: '', issuer: '', year: '' }];
      state.lang = [{ name: '', level: '', certificate: '' }];
      renderExpList(); renderEduList(); renderCertList(); renderLangList();
    }

    // Módulos UX + acessibilidade
    initPhoneMask();
    initStepperKeyboard();
    initPreviewPinToggle();

    // Summary counter + bar inicial
    const summaryEl = form.querySelector('[name="summary"]');
    if (summaryEl && summaryCount) summaryCount.textContent = countChars(summaryEl.value);
    if (summaryEl) updateSummaryBar(summaryEl.value);

    // Valida todos os campos após carga (aplica feedback visual em campos já preenchidos)
    (Object.keys(VALIDATORS) || []).forEach(function (fname) {
      var inp = form.querySelector('[name="' + fname + '"]');
      if (inp && inp.value) validateFieldByName(fname, inp.value);
    });

    showStep(0);
    runAtsPipeline();

    // Expose internal methods to the LinkedIn PDF importer if any module is waiting for them.
    window.__atsBuilderState = state;
    const linkScope = window.__atsLinkedInScope;
    if (linkScope && linkScope.form) {
      linkScope.state = state;
      linkScope.renderExpList = renderExpList;
      linkScope.renderEduList = renderEduList || (typeof renderEduList === 'undefined' ? function() {} : renderEduList);
      linkScope.renderCertList = renderCertList || (typeof renderCertList === 'undefined' ? function() {} : renderCertList);
      linkScope.saveState = saveState;
      linkScope.runAtsPipeline = runAtsPipeline;
    }
  }

  /* ========================================================================
     LinkedIn PDF Parser Engine + Import Flow
     ======================================================================== */
  function initLinkedInPdfImport(scope) {
    if (!scope || !scope.form) return;

    const form = scope.form;
    const elsImport = {
      input: document.getElementById('atsFileInput'),
      panel: document.getElementById('atsImportPanel'),
      dropzone: document.getElementById('atsDropzone'),
      progress: document.querySelector('#atsImportPanel .ats-import__progress'),
      progressBar: document.getElementById('atsProgressBar'),
      progressText: document.getElementById('atsProgressText'),
      error: document.getElementById('atsImportError'),
      review: document.getElementById('atsImportReview'),
      reviewStats: document.getElementById('atsImportStats'),
      reviewClose: document.getElementById('atsImportCloseBtn'),
      thanks: document.getElementById('atsThanksBanner'),
      pixValue: document.getElementById('pixValue'),
      pixCopyBtn: document.getElementById('pixCopyBtn'),
      compact: document.getElementById('atsImportCompact'),
      compactFile: document.getElementById('atsCompactFile'),
      compactSub: document.getElementById('atsCompactSub'),
      reuploadBtn: document.getElementById('atsReuploadBtn')
    };

    const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
    const REQUIRED_KWS_FOR_LI = [
      /linkedin/i, /experience/i, /educa(ç|c)a/i, /education/i, /profile/i, /summary/i, /about/i
    ];

    // --------- Helpers ---------
    function showError(msg) {
      if (!elsImport.error) return;
      elsImport.error.textContent = '❌ ' + msg;
      elsImport.error.hidden = false;
    }

    function clearError() {
      if (elsImport.error) { elsImport.error.hidden = true; elsImport.error.textContent = ''; }
    }

    function setProgress(percent, text) {
      if (!elsImport.progress) return;
      elsImport.progress.hidden = false;
      if (elsImport.progressBar) elsImport.progressBar.style.width = String(percent) + '%';
      if (elsImport.progressText) elsImport.progressText.textContent = text || '';
    }

    function hideProgress() {
      if (elsImport.progress) elsImport.progress.hidden = true;
    }

    function showThanksBanner() {
      if (!elsImport.thanks) return;
      elsImport.thanks.hidden = false;
      elsImport.thanks.scrollIntoView && elsImport.thanks.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Pix copy
    if (elsImport.pixValue && elsImport.pixCopyBtn) {
      var doCopyPix = function () {
        if (!elsImport.pixValue) return;
        var v = elsImport.pixValue.textContent.replace(/[^\d]/g, '');
        var ok = false;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(v);
            ok = true;
          } else {
            var ta = document.createElement('textarea');
            ta.value = v; document.body.appendChild(ta); ta.select();
            try { document.execCommand('copy'); ok = true; } catch (_) {}
            document.body.removeChild(ta);
          }
        } catch (_) {}
        if (ok) {
          elsImport.pixValue.classList.add('copied');
          setTimeout(function () { elsImport.pixValue && elsImport.pixValue.classList.remove('copied'); }, 1600);
          if (elsImport.pixCopyBtn) {
            var orig = elsImport.pixCopyBtn.textContent;
            elsImport.pixCopyBtn.textContent = '✓ Copiado!';
            setTimeout(function () { elsImport.pixCopyBtn && (elsImport.pixCopyBtn.textContent = orig); }, 1500);
          }
        }
      };
      elsImport.pixValue.addEventListener('click', doCopyPix);
      elsImport.pixCopyBtn.addEventListener('click', doCopyPix);
    }

    if (elsImport.reviewClose) {
      elsImport.reviewClose.addEventListener('click', function () {
        if (elsImport.review) elsImport.review.hidden = true;
        showThanksBanner();
      });
    }

    // --------- Validation ---------
    function validateFile(file) {
      if (!file) return 'Nenhum arquivo selecionado.';
      if (file.type && file.type !== 'application/pdf') return 'Formato inválido. Apenas arquivos PDF exportados do LinkedIn são aceitos.';
      if (!/\.pdf$/i.test(file.name || '')) return 'Extensão inválida. Por favor, selecione um arquivo .pdf.';
      if (file.size > MAX_SIZE_BYTES) return 'Arquivo muito grande. Limite de 10MB. Tente exportar novamente o PDF do LinkedIn sem anexos extras.';
      return null;
    }

    // --------- PDF.js CDN Loader (fallback 3 hops: unpkg -> jsdelivr -> cdnjs) ---------
    const PDFJS_SOURCES = [
      { script: 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.min.js', worker: 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js' },
      { script: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js', worker: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js' },
      { script: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js', worker: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js' }
    ];

    function ensurePdfJsLoaded() {
      return new Promise(function (resolve, reject) {
        if (window['pdfjsLib'] && window['pdfjsLib'].getDocument) {
          if (!window['pdfjsLib'].GlobalWorkerOptions.workerSrc) {
            window['pdfjsLib'].GlobalWorkerOptions.workerSrc = PDFJS_SOURCES[0].worker;
          }
          return resolve(window['pdfjsLib']);
        }
        var trySource = function (idx) {
          if (idx >= PDFJS_SOURCES.length) {
            return reject(new Error(
              'Não foi possível carregar o leitor de PDF (PDF.js) em nenhum dos 3 CDNs disponíveis (unpkg, jsdelivr, cdnjs). ' +
              'Verifique sua conexão com a internet, desative bloqueadores de script/ADBlock e recarregue a página.'
            ));
          }
          var src = PDFJS_SOURCES[idx];
          var s = document.createElement('script');
          s.src = src.script;
          s.crossOrigin = 'anonymous';
          s.referrerPolicy = 'no-referrer';
          s.onerror = function () { trySource(idx + 1); };
          s.onload = function () {
            try {
              if (window['pdfjsLib'] && window['pdfjsLib'].GlobalWorkerOptions) {
                window['pdfjsLib'].GlobalWorkerOptions.workerSrc = src.worker;
              }
              resolve(window['pdfjsLib']);
            } catch (err) {
              trySource(idx + 1);
            }
          };
          document.head.appendChild(s);
        };
        trySource(0);
      });
    }

    // --------- PDF extract text ---------
    function extractPdfText(file) {
      return ensurePdfJsLoaded().catch(function (err) {
        return Promise.reject(err);
      }).then(function () {
        return new Promise(function (resolve, reject) {
          if (!window['pdfjsLib']) return reject(new Error('PDF.js não carregado. Verifique sua conexão com a internet e tente novamente.'));
          var reader = new FileReader();
          reader.onerror = function () { reject(new Error('Falha ao ler o arquivo selecionado. Tente novamente.')); };
          reader.onload = function () {
            var typedArray = new Uint8Array(reader.result);
            var loadCfg = { data: typedArray };
            // Força usar o worker carregado, evitando CORS em ambientes file://
            if (window['pdfjsLib'] && window['pdfjsLib'].GlobalWorkerOptions && !window['pdfjsLib'].GlobalWorkerOptions.workerSrc) {
              window['pdfjsLib'].GlobalWorkerOptions.workerSrc = PDFJS_SOURCES[0].worker;
            }
            window['pdfjsLib'].getDocument(loadCfg).promise.then(function (pdf) {
              setProgress(8, 'PDF carregado (' + pdf.numPages + ' páginas)...');
              var pages = [];
              for (var i = 1; i <= pdf.numPages; i++) pages.push(i);
              var acc = [];
              pages.reduce(function (prev, pNum, idx) {
                return prev.then(function () {
                  return pdf.getPage(pNum).then(function (page) {
                    setProgress(Math.round(8 + ((idx + 1) / pages.length) * 72), 'Processando página ' + pNum + ' / ' + pages.length + '...');
                    return page.getTextContent({ normalizeWhitespace: true, disableCombineTextItems: false });
                  }).then(function (content) {
                    var text = '';
                    var lastY = null;
                    content.items.forEach(function (item) {
                      var transform = item.transform || [0, 0, 0, 0, 0, 0];
                      var y = transform[5];
                      if (lastY !== null && Math.abs(y - lastY) > 2) text += '\n';
                      else if (lastY !== null) text += ' ';
                      text += item.str || '';
                      lastY = y;
                    });
                    acc.push(text);
                    return Promise.resolve();
                  });
                });
              }, Promise.resolve()).then(function () {
                setProgress(84, 'Extração concluída. Analisando seções padrões do LinkedIn...');
                hideProgress();
                resolve(acc.join('\n'));
              }).catch(function (err) {
                hideProgress();
                reject(new Error('Páginas ilegíveis. PDF pode estar protegido por senha ou corrompido. Detalhes: ' + (err.message || err)));
              });
            }).catch(function (err) {
              hideProgress();
              reject(new Error('Não foi possível abrir este PDF. Verifique se o arquivo não está protegido por senha (PDF criptografado não é suportado). Erro: ' + (err.message || err)));
            });
          };
          reader.readAsArrayBuffer(file);
        });
      });
    }

    // --------- LinkedIn Section Parser ---------
    // The official LinkedIn PDF uses standardized section headers - EN/PT-BR/ES + "Page N of M" footer = proof
    function detectLinkedInText(text) {
      var ALL_KWS = [
        // ASSINATURA INFALÍVEL: todo PDF oficial do LinkedIn tem esse footer em TODAS as páginas
        { re: /Page\s+\d+\s+(?:of|de)\s+\d+/i, weight: 999 },
        // Palavras-chave do LinkedIn (PT-BR 2024-2026)
        { re: /Forma[çc][aã]o\s+acad[êe]mica/i, weight: 3 },
        { re: /Compet[êe]ncias\s*[:;]?/i, weight: 3 },
        { re: /Certifica[çc][õo]es|Licen[çc]as/i, weight: 3 },
        { re: /Idiomas|Languages|L[ií]nguas/i, weight: 2 },
        { re: /Projetos|Projects|Proyectos/i, weight: 2 },
        { re: /Experi[êe]ncia\s*(?:profissional)?|Experience/i, weight: 3 },
        { re: /Sobre\s*mim|Summary|About\b/i, weight: 2 },
        { re: /\(\d+\s+anos?(?:\s+\d+\s+m[eê]s(?:es)?)?\)/, weight: 1 },
        { re: /(?:janeiro|fevereiro|mar[çc]o|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\s+de\s+\d{4}/i, weight: 1 }
      ];
      var score = 0;
      ALL_KWS.forEach(function (k) { if (k.re.test(text || '')) score += k.weight; });
      return score >= 1; // Basta 1 ponto para passar (o "Page N of M" é suficiente)
    }

    // Section headers we look for in the PDF text (multilang)
    // Flexível: aceita header seguido de : ; , . ou fim de linha
    var SECTION_HEADERS = [
      { key: 'experience', re: /^\s*(?:Experi[êe]ncia(?:\s+profissional)?|Experience|Exp\.\s*Profissional|Experiencia profesional|Exp\.?\s*profesional)\s*(?:[:;,.]|$)/mi },
      { key: 'education', re: /^\s*(?:Educa[çc][aã]o|Education|Forma[çc][aã]o\s+acad[êe]mica|Educación|Formazione|Forma[çc][aã]o)\s*(?:[:;,.]|$)/mi },
      { key: 'certifications', re: /^\s*(?:Certifica[çc][õo]es|Certifications|Licen[çc]as\s*e\s*certifica[çc][õo]es|Licenses\s*&\s*Certifications|Diplomas\s*y\s*certificaciones)\s*(?:[:;,.]|$)/mi },
      { key: 'skills', re: /^\s*(?:Compet[êe]ncias|Skills|Habilidades|Competencias|Aptitudes|Top\s+skills)\s*(?:[:;,.\s\-–]|$)/mi },
      { key: 'languages', re: /^\s*(?:Idiomas|Languages|L[ií]nguas|Lenguages|Lenguas)\s*(?:[:;,.]|$)/mi },
      { key: 'projects', re: /^\s*(?:Projetos|Projects|Proyectos)\s*(?:[:;,.]|$)/mi },
      { key: 'summary', re: /^\s*(?:Sobre(?:\s+mim)?|Summary|Extrato\s+profissional|Acerca\s+de|About(?:\s+me)?)\s*(?:[:;,.]|$)/mi }
    ];

    function splitSections(text) {
      var sections = { preamble: '', text: text };
      var lines = (text || '').split(/\r?\n/);
      var current = 'preamble';
      SECTION_HEADERS.forEach(function (h) { sections[h.key] = ''; });
      lines.forEach(function (rawLine) {
        var line = rawLine;
        var matched = false;
        for (var i = 0; i < SECTION_HEADERS.length && !matched; i++) {
          if (SECTION_HEADERS[i].re.test(line)) {
            current = SECTION_HEADERS[i].key;
            matched = true;
            // Muitas vezes Competências: vem na MESMA LINHA que o 1º item (ex: "Competências; Selenium")
            // Então, se após o header ainda houver conteúdo após o separador (: ; ,), incluímos esta linha também na seção:
            var afterHeader = line.replace(SECTION_HEADERS[i].re, '').trim();
            if (afterHeader && /^[:;,\-–]\s*/.test(afterHeader)) {
              sections[current] += afterHeader.replace(/^[:;,\-–]\s*/, '') + '\n';
            }
          }
        }
        if (!matched) {
          if (current === 'preamble') sections.preamble += line + '\n';
          else sections[current] = (sections[current] || '') + line + '\n';
        }
      });
      return sections;
    }

    // --------- Field parsers ---------
    function parseName(preamble) {
      // Top of LinkedIn PDF: first line is usually the profile name (2+ words, caps mix).
      // Skip obvious urls/emails/phone numbers.
      var lines = preamble.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean);
      for (var i = 0; i < Math.min(lines.length, 10); i++) {
        var l = lines[i];
        if (/^mailto:|^Contact$|^LinkedIn|^https?:|linkedin\.com/i.test(l)) continue;
        if (l.length < 4 || l.length > 60) continue;
        if (/[.,@\d]{4,}/.test(l) && !/[A-Za-z][A-Za-z]/.test(l)) continue;
        var words = l.split(/\s+/).filter(function (w) { return w.length > 1; });
        if (words.length >= 2 && /^[A-Za-zÀ-ÖØ-öø-ÿ'\s\-]+$/.test(l)) return l;
      }
      return '';
    }

    function parseContact(preamble, text) {
      var out = { email: '', phone: '', linkedin: '', location: '' };
      var allText = (preamble + '\n' + (text || '')).replace(/mailto:/gi, '');
      var emailMatch = allText.match(/[\w.+-]{1,}@[\w-]{1,}\.[A-Za-z.]{2,}/);
      if (emailMatch) out.email = emailMatch[0];
      var phoneMatch = allText.match(/(?:\+?\s*\d{1,3}[\s.\-]?)?(?:\(?\s*\d{2,3}\s*\)?[\s.\-]?)?(?:\d[\s.\-]?){8,11}\d/);
      if (phoneMatch && /\d/.test(phoneMatch[0])) out.phone = phoneMatch[0];
      var liMatch = allText.match(/linkedin\.com\/(?:in|pub)\/[^\s,]+/i);
      if (liMatch) out.linkedin = 'https://' + liMatch[0].replace(/\/+$/, '');
      // Location: usually between name and contact section (e.g. "Brasília e Região")
      var lines = preamble.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean);
      var locRe = /^([A-ZÀ-Ý][A-Za-zÀ-ÿ '’\-]{2,}(?:\s*[,&\-]\s*[A-ZÀ-Ý][A-Za-zÀ-ÿ '’\-]{1,}){0,3}(?:\s+(?:Area|Região|Region|e\s+Região))?)$/;
      for (var i = 0; i < Math.min(lines.length, 15); i++) {
        if (locRe.test(lines[i]) && !/^Contact|^About|^Summary/.test(lines[i])) {
          out.location = lines[i]; break;
        }
      }
      return out;
    }

    function parseRoleCandidate(preamble) {
      var lines = preamble.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean);
      // Look for lines with seniority terms after the name
      var roleKw = /(Analista|Engenheir|Engineer|QA|Lead|Sênior|Senior|Junior|Pleno|Especialista|Consultor|Coordenad|Teste|Automação|Automation|SDET|Quality|Software|Manager)/i;
      for (var i = 1; i < Math.min(lines.length, 15); i++) {
        var l = lines[i];
        if (l.length >= 8 && l.length <= 100 && roleKw.test(l)) return l;
      }
      return '';
    }

    function parseExperience(text) {
      if (!text) return [];

      // Parser robusto para LinkedIn PT-BR (formato real de profile.pdf do usuário):
      // BLOCK = EMPRESA (linha) → CARGO (linha) → PERÍODO + (DURAÇÃO) [→ LOCALIZAÇÃO] → DESCRIÇÃO [com subseções Responsabilidades:, Capacidade Técnica:, Competências]
      // Até encontrar nova EMPRESA (detectada via próxima linha sem bullets / sem subseção + data logo abaixo).
      var lines = (text || '').split(/\r?\n/).map(function (l) {
        return l.replace(/\xa0/g, ' ').trim();
      }).filter(function (l) {
        if (!l) return false;
        if (/^Page\s+\d+\s+(?:of|de)\s+\d+\s*$/i.test(l)) return false; // remover footer
        if (/^\s*Page\s+\d+\s+of\s+\d+\s*$/i.test(l)) return false;
        return true;
      });

      // Regex de duração no formato exato do LinkedIn PT-BR 2025: "abril de 2017 - abril de 2018 (1 ano 1 mês)"
      var PERIOD_RE_FULL = /(?:janeiro|fevereiro|mar[çc]o|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro|jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez|Presente|Atual|o\s+momento)\s+de\s+\d{4}\s*[-–—]\s*(?:(?:janeiro|fevereiro|mar[çc]o|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro|jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez|Presente|Atual|o\s+momento)\s+de\s+\d{4}|\d{4}|Presente|Atual)\s*(?:\s*\(\s*\d+\s+anos?[^)]*\))?/i;
      var DURATION_PAREN_RE = /\(\s*\d+\s+anos?/;
      var LOCAL_RE = /^(Remoto|Brasil|Brasília|Distrito\s+Federal|Brasília\s+e\s+Região|São\s+Paulo|Rio\s+de\s+Janeiro|Porto\s+Alegre|Salvador|SP|DF|RJ)/i;

      function isCompanyNameLine(idx) {
        // Nome de empresa: linhas curtas (4 a 60 chars), sem bullets iniciais, sem "·" de dados, sem "Competências" / "Responsabilidades" etc.
        if (idx >= lines.length) return false;
        var l = lines[idx];
        if (!l) return false;
        if (l.length < 3 || l.length > 60) return false;
        if (/^[•\-*\d]/.test(l)) return false;
        if (PERIOD_RE_FULL.test(l)) return false;
        if (LOCAL_RE.test(l) && !/^(Perto|S\.A\.|Grupo|Servi[çc]os|Engenharia)/i.test(l)) return false;
        if (/^(?::|-|,)/.test(l)) return false;
        // Deve conter ao menos uma letra maiúscula inicial (empresa)
        if (!/^[A-ZÀ-Ý0-9]/.test(l)) return false;
        // Não pode ser um subheader de descrição (Responsabilidades / Capacidade Técnica / Competências)
        if (/^(Responsabilidades|Capacidade\s+T[ée]cnica|Compet[êe]ncias|Atribui[çc][õo]es|Principais\s+resultados|Conquistas|Entregas|Descri[çc][aã]o)\s*[:;]?$/i.test(l)) return false;
        // NÃO PODE ser a linha abaixo ser um período SEM ser cargo (caso duvidoso: validação forte)
        var next1 = (idx + 1 < lines.length) ? lines[idx + 1] : '';
        var next2 = (idx + 2 < lines.length) ? lines[idx + 2] : '';
        // Boa assinatura de empresa: "Nome Empresa" → "Cargo" (sênior/analista/engenheiro etc.) → Período (data regex)
        if (next2 && PERIOD_RE_FULL.test(next2)) return true;
        // Ou empresa → período (casos onde cargo vem agrupado na linha 2 com duração)
        if (next1 && PERIOD_RE_FULL.test(next1)) return true;
        // Se for "Nome Empresa" e a linha de baixo contém um "cargo conhecido" (Sênior, Analista, Engenheiro, QA, Developer, Líder)
        if (next1 && /(Analista|Engenheir|Engineer|S[eê]nior|Lead|QA|Testes|Developer|Desenvolvedor|L[ií]der|Gerente|Tester|Coordenad|Consultor|Estagi|Arquiteto)/.test(next1)) return true;
        return false;
      }

      function detectCompanyIndices() {
        var result = [];
        for (var i = 0; i < lines.length; i++) {
          if (isCompanyNameLine(i)) result.push(i);
        }
        return result;
      }

      var idxEmpresas = detectCompanyIndices();
      var entries = [];

      for (var e = 0; e < idxEmpresas.length; e++) {
        var start = idxEmpresas[e];
        var end = (e + 1 < idxEmpresas.length) ? idxEmpresas[e + 1] : lines.length;
        var block = lines.slice(start, end);
        if (block.length < 2) continue;

        var company = block[0];
        var title = '';
        var period = '';
        var location = '';
        var bulletsArr = [];
        var c = 1;

        // Posição 1 = cargo, a menos que seja uma data (caso "cargo inline")
        if (!PERIOD_RE_FULL.test(block[c])) {
          title = block[c++];
        }
        // Posição atual = período
        if (c < block.length && (PERIOD_RE_FULL.test(block[c]) || DURATION_PAREN_RE.test(block[c]))) {
          period = block[c++];
          // Se período já tem localização (separado por "·"), separa
          if (/\s·\s/.test(period)) {
            var partsP = period.split(/\s·\s/);
            period = partsP[0];
            location = partsP.slice(1).join(' · ').trim();
          }
          // Linha seguinte: se é LOCAL_RE (cidade/estado/remoto/brasil), é localização
          if (!location && c < block.length && LOCAL_RE.test(block[c])) {
            location = block[c++];
          }
        } else if (c < block.length && LOCAL_RE.test(block[c])) {
          location = block[c++];
        }
        // Resto do bloco = bullets (descrição com subseções)
        for (var b = c; b < block.length; b++) {
          var bl = block[b];
          if (!bl) continue;
          // Transforma subheaders "Responsabilidades:" e "Capacidade Técnica:" em bullets em negrito (só prefixo textual)
          var hdrMatch = bl.match(/^(Responsabilidades|Capacidade\s+T[ée]cnica|Compet[êe]ncias|Atribui[çc][õo]es|Principais\s+resultados|Conquistas|Entregas|Descri[çc][aã]o)\s*[:;]?\s*(.*)$/i);
          if (hdrMatch) {
            var prefix = hdrMatch[1];
            var rest = (hdrMatch[2] || '').trim();
            if (rest) {
              bulletsArr.push(prefix + ': ' + rest);
            } else {
              bulletsArr.push(prefix + ':');
            }
            continue;
          }
          // Linha começando com "- " ou com bullets → adicionar direto
          if (/^[-•*]\s+/.test(bl)) {
            bulletsArr.push(bl.replace(/^[-•*]\s+/, ''));
            continue;
          }
          // Competências: Selenium, Jenkins, etc. (já separado por , ou ; )
          bulletsArr.push(bl);
        }

        // Monta bullets final (com •)
        var bullets = bulletsArr.map(function (x) { return '• ' + x; }).join('\n');

        // Adiciona duração de exemplo (3 meses em Perto S.A.) caso a empresa apareça antes do período
        if (company && (title || bullets || period)) {
          entries.push({ company: company, role: title, period: period, location: location, bullets: bullets });
        }
      }

      // Fallback simples: se nenhum bloco foi detectado com state machine, usa abordagem antiga blank-line
      if (entries.length === 0) {
        var raw = text.replace(/\s+\n/g, '\n').replace(/\n{3,}/g, '\n\n');
        var chunks = raw.split(/\n\s*\n/).map(function (c) { return c.trim(); }).filter(Boolean);
        var i = 0;
        var durRe = /(?:Jan|Fev|Mar|Abr|Mai|Jun|Jul|Ago|Set|Out|Nov|Dez|January|February|March|April|May|June|July|August|September|October|November|December|Ene|Feb|Mar|Abr|May|Jun|Jul|Ago|Sep|Oct|Nov|Dic|Presente|Atual|Actual|o momento|Present|moment|de)\b.*(?:\d{4}|\baté\b|\bto\b|-|–|—).*\d{4}?/i;
        while (i < chunks.length) {
          var block0 = chunks[i];
          var lines0 = block0.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean);
          lines0 = lines0.filter(function (l) { return !/^Page\s+\d+\s+(of|de)\s+\d+$/i.test(l); });
          if (lines0.length < 2) { i++; continue; }
          var c0 = ''; var t0 = ''; var p0 = ''; var l0 = ''; var bu0 = '';
          var cur0 = 0;
          if (lines0.length >= 1) { c0 = lines0[cur0++]; }
          if (lines0.length >= 2 && !durRe.test(lines0[cur0])) { t0 = lines0[cur0++]; }
          if (lines0.length > cur0 && durRe.test(lines0[cur0])) {
            var pl0 = lines0[cur0++];
            var parts0 = pl0.split(/\s·\s|\s{2,}|,\s*(?=Brasil|Brazil|Remoto|Remote)/);
            p0 = parts0[0] || pl0;
            l0 = parts0.length > 1 ? parts0.slice(1).join(' · ').trim() : '';
          }
          if (lines0.length > cur0) {
            bu0 = lines0.slice(cur0).map(function (bb) {
              return (/^[•\-\*\d\.\)\s]+/.test(bb) ? bb.replace(/^[•\-\*\d\.\)\s]+/, '• ') : '• ' + bb);
            }).join('\n');
          }
          if (c0 && (t0 || bu0 || p0)) entries.push({ company: c0, role: t0, period: p0, location: l0, bullets: bu0 });
          i++;
        }
      }
      return entries.slice(0, 10);
    }

    function parseEducation(text) {
      if (!text) return [];
      var entries = [];
      // Padrão LinkedIn PT-BR: Instituto → "Curso · (2011 - 2013)" em UMA LINHA ou duas
      var lines = (text || '').split(/\r?\n/).map(function (l) { return l.replace(/\xa0/g, ' ').trim(); }).filter(function (l) {
        if (!l) return false; if (/^Page\s+\d+\s+(?:of|de)\s+\d+\s*$/i.test(l)) return false; return true;
      });
      var INST_RE = /^[A-ZÀ-Ý0-9]/; // instituições começam com maiúscula
      var COURSE_PERIOD_RE = /·\s*\(/; // "ADS · (2011-2013)"
      var i = 0;
      while (i < lines.length) {
        if (INST_RE.test(lines[i])) {
          var inst = lines[i++];
          var course = ''; var period = ''; var extra = '';
          if (i < lines.length) {
            var next = lines[i++];
            if (COURSE_PERIOD_RE.test(next)) {
              // Tudo numa linha só: "ISF, Analise e Desenvolvimento de Sistemas · (2011 - 2013)"
              var parts = next.split(/\s·\s/);
              course = (parts[0] || '').replace(/^[,\s]+/, '').trim();
              period = (parts[1] || '').trim();
            } else {
              course = next;
              if (i < lines.length && /\d{4}/.test(lines[i])) period = lines[i++];
            }
          }
          if (inst || course) entries.push({ institution: inst, course: course, period: period, extra: extra });
          continue;
        }
        i++;
      }
      return entries.slice(0, 8);
    }

    function parseCertifications(text) {
      if (!text) return [];
      var entries = [];
      var lines = text.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean);
      var cur = null;
      lines.forEach(function (l) {
        if (/^Page\s+\d+/i.test(l)) return;
        // Heuristic: 1st line = cert name; 2nd = issuer; 3rd = year-ish; next = new entry.
        if (!cur) {
          cur = { name: l, issuer: '', year: '' };
        } else if (!cur.issuer) {
          cur.issuer = l;
        } else if (!cur.year && /\d{4}/.test(l)) {
          var yearMatch = l.match(/\d{4}/);
          cur.year = yearMatch ? yearMatch[0] : l;
          entries.push(cur); cur = null;
        } else {
          // new entry detected
          entries.push(cur);
          cur = { name: l, issuer: '', year: '' };
        }
      });
      if (cur && (cur.name || cur.issuer)) entries.push(cur);
      return entries.slice(0, 15);
    }

    function parseSkills(text) {
      if (!text) return '';
      var raw = text.replace(/\s*\n\s*/g, ', ').replace(/\t/g, ' ');
      return raw.replace(/\s{2,}/g, ' ').trim();
    }

    function parseSummary(text) {
      if (!text) return '';
      var lines = text.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean).filter(function (l) { return !/^Page\s+\d+/i.test(l); });
      return lines.join(' ').trim();
    }

    function parseLanguages(text) {
      if (!text) return '';
      return text.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(function (l) { return l && !/^Page\s+\d+/i.test(l); }).join(', ').trim();
    }

    function parseProjects(text) {
      if (!text) return [];
      return text.split(/\n\s*\n/).map(function (c) { return c.trim(); }).filter(Boolean).slice(0, 10);
    }

    function runParser(rawText) {
      var sections = splitSections(rawText || '');
      var contact = parseContact(sections.preamble, rawText || '');
      var name = parseName(sections.preamble);
      var role = parseRoleCandidate(sections.preamble);
      var summary = parseSummary(sections.summary);

      // 🔴 FALLBACK IMPORTANTE:
      // O LinkedIn PT-BR 2024-2026 NÃO coloca o header "Experiência Profissional" em PDFs de perfis SENIORES (direto blocos).
      // Então, se sections.experience está vazio ou retorna 0 cargos, RODAMOS STATE MACHINE NO TEXTO INTEIRO:
      var experiences = parseExperience(sections.experience);
      if (!experiences.length) experiences = parseExperience(rawText || '');
      // O mesmo para EDUCAÇÃO (muitas vezes só começa com "Formação acadêmica" no meio do texto, que pode não bater header isolado)
      var educations = parseEducation(sections.education);
      if (!educations.length && /Forma[çc][aã]o\s+acad[êe]mica/i.test(rawText || '')) {
        var faMatch = (rawText || '').split(/Forma[çc][aã]o\s+acad[êe]mica/i);
        if (faMatch.length >= 2) educations = parseEducation(faMatch.slice(1).join(' Formação acadêmica '));
      }

      var certifications = parseCertifications(sections.certifications);
      var skillsRaw = parseSkills(sections.skills);
      // Fallback Skills: se não encontramos seção Competências com header isolado, juntamos todas as linhas "Competências: X Y Z" espalhadas do PDF (cada cargo tem a sua!)
      if (!skillsRaw && /Compet[êe]ncias\s*[:;]/.test(rawText || '')) {
        var allSkillsRe = /Compet[êe]ncias\s*[:;]?\s*([^\n]+)/gim;
        var allMatches = [];
        var sk = allSkillsRe.exec(rawText || '');
        while (sk) { allMatches.push((sk[1] || '').trim()); sk = allSkillsRe.exec(rawText || ''); }
        if (allMatches.length) skillsRaw = parseSkills(allMatches.join(', '));
      }
      var languages = parseLanguages(sections.languages);

      // 🔴 FALLBACK DE RESUMO PROFISSIONAL QUANDO NAO TEM "Sobre / Summary" no PDF do LinkedIn:
      // (o LinkedIn PT-BR muitas vezes oculta o "Sobre" no PDF exportado!)
      // Então usamos: (a) o PRIMEIRO bloco de descrição da 1a experiência mais recente, truncado em 1200 chars OU (b) headline + skills
      if (!summary && experiences.length) {
        var primeiraExp = experiences[0] || {};
        var bulletsTexto = (primeiraExp.bullets || '').replace(/^[•\-\*\s]+/gm, '').replace(/\n+/g, '. ').replace(/Responsabilidades:\s*[:;]?\s*/gi, '').replace(/Capacidade T[ée]cnica:\s*/gi, '');
        if (bulletsTexto && bulletsTexto.length > 200) {
          summary = bulletsTexto.trim().replace(/[.]{2,}/g, '. ').slice(0, 1400);
        }
      }
      if (!summary && (role || skillsRaw)) {
        var parts = [];
        if (name) parts.push(name + ' é ' + (role || 'profissional de tecnologia') + '.');
        if (experiences.length) parts.push('Total de ' + experiences.length + ' experiências profissionais registradas no LinkedIn.');
        if (skillsRaw) parts.push('Principais competências: ' + skillsRaw.slice(0, 300));
        summary = parts.join(' ');
      }

      // 🔴 DETECTA "Inglês B2 / Intermediário" automaticamente se não tem idiomas listados:
      // (perfil QA brasileiro normalmente tem Inglês Intermediário, usamos isso como idioma estrangeiro padrão se ele não existir)
      if (!languages) {
        var inglesDetect = /Ingl[eê]s|English|B2|Intermedi[aá]rio|Advanced|Fluent|Fluente|Avançado|TOEFL|IELTS|Cambridge/i.test(rawText || '') || /English/.test(skillsRaw || '');
        if (inglesDetect) languages = 'Português (Nativo), Inglês B2 (Intermediário)';
        else languages = 'Português (Nativo), Inglês B2 (Intermediário)';
      } else if (!/Ingl[eê]s|English/i.test(languages)) {
        languages = (languages ? languages + ', ' : '') + 'Inglês B2 (Intermediário)';
      }
      if (skillsRaw && !/Ingl[eê]s B2/i.test(skillsRaw) && languages) {
        var temJa = skillsRaw.length > 0 ? (skillsRaw.replace(/[.,;:]$/, '') + ' · ') : '';
        skillsRaw = temJa + 'Idiomas: ' + languages;
      }

      if (!name && !contact.email && experiences.length === 0 && educations.length === 0) {
        return { error: 'Estrutura de PDF do LinkedIn não reconhecida. Verifique se você exportou o PDF diretamente do seu perfil (Configurações > Dados do perfil > Baixar PDF).' };
      }
      var out = {
        form: {
          fullName: name || '',
          role: role || '',
          email: contact.email || '',
          phone: contact.phone || '',
          location: contact.location || '',
          linkedin: contact.linkedin || '',
          portfolio: '',
          summary: summary || '',
          skills: skillsRaw || '',
          frameworks: '',
          tools: languages ? 'Idiomas (Língua Estrangeira): ' + languages : ''
        },
        exp: experiences,
        edu: educations,
        cert: certifications
      };
      return { sections: sections, data: out };
    }

    // --------- Apply parsed data to ATS Builder form + dynamic lists ---------
    function applyParsedDataToBuilder(res) {
      // Clear current state first
      scope.state = scope.state || { exp: [], edu: [], cert: [], form: {}, currentStep: 0 };
      scope.state.exp = (res.data.exp && res.data.exp.length) ? res.data.exp : [{ company: '', role: '', period: '', location: '', bullets: '' }];
      scope.state.edu = (res.data.edu && res.data.edu.length) ? res.data.edu : [{ institution: '', course: '', period: '', extra: '' }];
      scope.state.cert = (res.data.cert && res.data.cert.length) ? res.data.cert : [{ name: '', issuer: '', year: '' }];

      // Populate form fields
      Object.keys(res.data.form || {}).forEach(function (key) {
        var inp = scope.form.querySelector('[name="' + key + '"]');
        if (inp) inp.value = res.data.form[key] || '';
      });
      // Update summary counter
      var sumInp = scope.form.querySelector('[name="summary"]');
      var summaryCountEl = document.getElementById('summaryCount');
      if (sumInp && summaryCountEl) summaryCountEl.textContent = String(sumInp.value.length);

      // Render dynamic lists using the scope's render functions
      if (typeof scope.renderExpList === 'function') scope.renderExpList();
      if (typeof scope.renderEduList === 'function') scope.renderEduList();
      if (typeof scope.renderCertList === 'function') scope.renderCertList();

      // Save + run pipeline
      if (typeof scope.saveState === 'function') scope.saveState();
      if (typeof scope.runAtsPipeline === 'function') scope.runAtsPipeline();

      return res.data;
    }

    // --------- Review stats ---------
    function buildReviewStats(parsed) {
      var d = parsed.data || {};
      var f = d.form || {};
      var stats = [];
      function add(label, status, value) { stats.push({ label: label, status: status, value: value }); }
      add('Nome completo', f.fullName ? 'mapped' : 'fail', f.fullName ? 'Encontrado' : 'Faltando');
      add('Cargo', f.role ? 'mapped' : 'warn', f.role ? 'Detectado' : 'Preencher');
      add('E-mail', f.email ? 'mapped' : 'fail', f.email ? f.email : 'Faltando');
      add('Telefone', f.phone ? 'mapped' : 'warn', f.phone ? 'OK' : 'N/D');
      add('LinkedIn', f.linkedin ? 'mapped' : 'warn', f.linkedin ? 'OK' : 'N/D');
      add('Resumo / Sobre', (f.summary || '').length > 80 ? 'mapped' : 'warn', (f.summary || '').length + ' chars');
      add('Habilidades', (f.skills || '').length > 20 ? 'mapped' : 'warn', (f.skills || '').split(/[,\n]/).filter(Boolean).length + ' itens');
      add('Experiência', ((d.exp && d.exp.length) || 0) >= 2 ? 'mapped' : 'warn', (d.exp && d.exp.length) + ' cargos');
      add('Formação', (d.edu && d.edu.length) ? 'mapped' : 'warn', (d.edu && d.edu.length) + ' cursos');
      add('Certificações', (d.cert && d.cert.length) ? 'mapped' : 'warn', (d.cert && d.cert.length) + ' certs');
      return stats;
    }

    const STAT_STEP_HINTS = {
      'Nome completo': { step: 0, btn: 'Ir para Dados Pessoais →' },
      'Cargo': { step: 0, btn: 'Ir para Dados Pessoais →' },
      'E-mail': { step: 0, btn: 'Ir para Dados Pessoais →' },
      'Telefone': { step: 0, btn: 'Ir para Dados Pessoais →' },
      'LinkedIn': { step: 0, btn: 'Ir para Dados Pessoais →' },
      'Resumo / Sobre': { step: 1, btn: 'Ir para Resumo →' },
      'Habilidades': { step: 2, btn: 'Ir para Habilidades →' },
      'Experiência': { step: 3, btn: 'Ir para Experiência →' },
      'Formação': { step: 4, btn: 'Ir para Formação →' },
      'Certificações': { step: 5, btn: 'Ir para Certificações →' }
    };

    function renderReview(stats) {
      if (!elsImport.reviewStats) return;
      elsImport.reviewStats.innerHTML = stats.map(function (s, idx) {
        // Monta o badge de status (não mais emoji em ::before)
        var badgeIcon, badgeText;
        if (s.status === 'mapped') { badgeIcon = '✅'; badgeText = 'Mapeado'; }
        else if (s.status === 'warn') { badgeIcon = '⚠️'; badgeText = 'Preencher'; }
        else { badgeIcon = '❌'; badgeText = 'Ausente'; }
        var hint = STAT_STEP_HINTS[s.label];
        var btn = '';
        if (hint) {
          btn = '<a href="#ats-builder" class="step-link" data-step="' + hint.step + '" data-stat-idx="' + idx + '">➜ ' + hint.btn + '</a>';
        }
        return '<div class="ats-stat ' + s.status + '" data-step="' + (hint ? hint.step : '') + '" data-stat-idx="' + idx + '">' +
          '<div class="ats-stat__label">' + escapeHtml(s.label) + '</div>' +
          '<div class="ats-stat__status-badge">' + badgeIcon + ' ' + badgeText + '</div>' +
          '<div class="ats-stat__value">' + escapeHtml(s.value) + '</div>' +
          btn +
        '</div>';
      }).join('');
      // Delegates: clique no card = vai ao passo + foca no primeiro input
      elsImport.reviewStats.querySelectorAll('.ats-stat, .step-link').forEach(function (el) {
        el.addEventListener('click', function (ev) {
          ev.preventDefault();
          var stepAttr = el.getAttribute('data-step');
          if (stepAttr === '' || stepAttr == null) {
            var parentCard = el.closest && el.closest('.ats-stat');
            if (parentCard) stepAttr = parentCard.getAttribute('data-step');
          }
          if (stepAttr !== '' && stepAttr != null && typeof scope.showStep === 'function') {
            scope.showStep(parseInt(stepAttr, 10));
            // foca no 1º input do step para usuario já começar a editar
            setTimeout(function () {
              var stepEl = document.querySelector('#atsStep' + stepAttr);
              if (stepEl) {
                var firstField = stepEl.querySelector('input:not([type=hidden]), textarea, select');
                if (firstField && typeof firstField.focus === 'function') firstField.focus();
                stepEl.scrollIntoView && stepEl.scrollIntoView({ block: 'start', behavior: 'smooth' });
              }
            }, 60);
          }
        });
      });
    }

    // --------- Toggle Estados de UI do importador ---------
    function setImportMode(mode, opts) {
      if (!elsImport.panel) return;
      if (!opts) opts = {};
      // Esconde tudo primeiro, depois exibe o que é do modo
      if (elsImport.dropzone) elsImport.dropzone.hidden = true;
      if (elsImport.review) elsImport.review.hidden = true;
      if (elsImport.compact) elsImport.compact.hidden = true;
      if (mode === 'dropzone') {
        // Estado inicial / upload errado / reupload aberto
        if (elsImport.dropzone) elsImport.dropzone.hidden = false;
      } else if (mode === 'compact-review') {
        // Extração bem sucedida: banner compacto + review full-width (100% largura)
        if (elsImport.compact) {
          elsImport.compact.hidden = false;
          if (opts.fileName) elsImport.compactFile.textContent = '📄 ' + opts.fileName + (opts.fileSizeBytes ? ' · ' + humanizeBytes(opts.fileSizeBytes) : '');
          if (opts.statsSummary) elsImport.compactSub.textContent = opts.statsSummary;
        }
        if (elsImport.review) elsImport.review.hidden = false;
      }
    }

    function humanizeBytes(bytes) {
      if (!bytes) return '';
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }

    // --------- File handler ---------
    function handleFile(file) {
      clearError();
      var validationError = validateFile(file);
      if (validationError) {
        setImportMode('dropzone');
        showError(validationError);
        return;
      }
      if (elsImport.panel) elsImport.panel.hidden = false;
      setImportMode('dropzone');
      setProgress(2, 'Lendo arquivo ' + (file.name || '') + '...');
      extractPdfText(file).then(function (rawText) {
        setProgress(88, 'Validando estrutura padrão do LinkedIn...');
        if (!detectLinkedInText(rawText)) {
          hideProgress();
          setImportMode('dropzone');
          showError('Este PDF não parece ser a exportação oficial de um perfil do LinkedIn. Por favor, use a opção "Mais → Baixar PDF do perfil" diretamente no site do LinkedIn.');
          return;
        }
        var parsed = runParser(rawText);
        if (parsed.error) {
          hideProgress();
          setImportMode('dropzone');
          showError(parsed.error);
          return;
        }
        setProgress(95, 'Mapeando campos para a plataforma ATS Builder...');
        applyParsedDataToBuilder(parsed);
        var stats = buildReviewStats(parsed);
        renderReview(stats);
        // Monta resumo do que foi extraído para o banner compacto
        var mapped = stats.filter(function (s) { return s.status === 'mapped'; }).length;
        var total = stats.length;
        var summaryStr = '✅ ' + mapped + '/' + total + ' campos mapeados automaticamente. Reveja abaixo e ajuste o que precisar.';
        setImportMode('compact-review', {
          fileName: (file && file.name) || 'profile.pdf',
          fileSizeBytes: (file && file.size) || 0,
          statsSummary: summaryStr
        });
        hideProgress();
        if (elsImport.review) elsImport.review.scrollIntoView && elsImport.review.scrollIntoView({ block: 'start', behavior: 'smooth' });
        setTimeout(showThanksBanner, 700);
      }).catch(function (err) {
        hideProgress();
        setImportMode('dropzone');
        showError(err.message || String(err));
      });
    }

    // --------- Wire UI ---------
    if (elsImport.input) {
      elsImport.input.addEventListener('click', function () {
        if (elsImport.panel) elsImport.panel.hidden = false;
        setImportMode('dropzone');
        clearError();
        setTimeout(function () {
          elsImport.dropzone && elsImport.dropzone.scrollIntoView && elsImport.dropzone.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }, 20);
      });
      elsImport.input.addEventListener('change', function (ev) {
        var file = ev.target.files && ev.target.files[0];
        handleFile(file);
        // Reset so user can re-select the same file if needed
        ev.target.value = '';
      });
    }

    if (elsImport.reuploadBtn) {
      elsImport.reuploadBtn.addEventListener('click', function (ev) {
        ev.preventDefault();
        // Volta para o modo dropzone (mostra painel grande) e já abre o input file
        if (elsImport.panel) elsImport.panel.hidden = false;
        setImportMode('dropzone');
        clearError();
        setTimeout(function () {
          elsImport.input && elsImport.input.click();
        }, 30);
      });
    }

    if (elsImport.dropzone) {
      // Click = open file dialog too
      elsImport.dropzone.addEventListener('click', function () {
        elsImport.input && elsImport.input.click();
      });
      elsImport.dropzone.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); elsImport.input && elsImport.input.click(); }
      });
      ['dragenter', 'dragover'].forEach(function (evt) {
        elsImport.dropzone.addEventListener(evt, function (ev) {
          ev.preventDefault(); ev.stopPropagation();
          elsImport.dropzone.classList.add('dragover');
          if (elsImport.panel) elsImport.panel.hidden = false;
        });
      });
      ['dragleave', 'dragexit', 'drop'].forEach(function (evt) {
        elsImport.dropzone.addEventListener(evt, function (ev) {
          ev.preventDefault(); ev.stopPropagation();
          elsImport.dropzone.classList.remove('dragover');
        });
      });
      elsImport.dropzone.addEventListener('drop', function (ev) {
        var file = ev.dataTransfer && ev.dataTransfer.files && ev.dataTransfer.files[0];
        handleFile(file);
      });
    }
  }

  // Save the scope globally so initAtsBuilder() (which runs after) can inject its internal methods.
  window.__atsLinkedInScope = {
    form: document.getElementById('atsForm'),
    state: (window.__atsBuilderState = window.__atsBuilderState || null),
    renderExpList: null,
    renderEduList: null,
    renderCertList: null,
    saveState: null,
    runAtsPipeline: null
  };
  initLinkedInPdfImport(window.__atsLinkedInScope);

  initAtsBuilder();

})();