// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Hero slideshow
(() => {
  const slides = document.querySelectorAll('.hero__slide');
  if (slides.length < 2) return;
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('is-active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('is-active');
  }, 5000);
})();

// About slider
(() => {
  const root = document.getElementById('aboutSlider');
  if (!root) return;
  const imgs = root.querySelectorAll('.about-slider__track img');
  const dotsWrap = root.querySelector('.about-slider__dots');
  let i = 0, timer;
  imgs.forEach((_, idx) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Slide ' + (idx + 1));
    if (idx === 0) b.classList.add('is-active');
    b.addEventListener('click', () => go(idx));
    dotsWrap.appendChild(b);
  });
  const dots = dotsWrap.querySelectorAll('button');
  function go(n) {
    imgs[i].classList.remove('is-active');
    dots[i].classList.remove('is-active');
    i = (n + imgs.length) % imgs.length;
    imgs[i].classList.add('is-active');
    dots[i].classList.add('is-active');
    restart();
  }
  function restart() { clearInterval(timer); timer = setInterval(() => go(i + 1), 4500); }
  root.querySelector('.about-slider__btn--prev').addEventListener('click', () => go(i - 1));
  root.querySelector('.about-slider__btn--next').addEventListener('click', () => go(i + 1));
  restart();
})();

// Nav scroll effect
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 40) nav.classList.add('is-scrolled');
  else nav.classList.remove('is-scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');
const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spy.observe(s));

// Products
const PRODUCTS = [
  {
    name: 'Linha Multifilamento Maruri Super Braid X9',
    sub: 'Linhas · 150m · 100% PE Fiber',
    img: 'images/produtos/linha-braid.png',
    desc: 'Multifilamento de 9 fios trançados de alta densidade, oferecendo resistência superior, baixíssima memória e arremessos longos com extrema precisão. Ideal para pesca esportiva em água doce e salgada, suporta brigas intensas com tucunarés, dourados e robalos. Cor amarelo fluorescente para alta visibilidade na água.'
  },
  {
    name: 'Sapatilha Aquática Seasub Aqua',
    sub: 'Acessórios · Sub & Náutica',
    img: 'images/produtos/sapatilha-aqua.png',
    desc: 'Sapatilha de neoprene com sola antiderrapante de borracha resistente, perfeita para mergulho, pesca de costão, caiaque e atividades náuticas. Design ergonômico com proteção contra abrasão, secagem rápida e excelente aderência em superfícies molhadas e escorregadias.'
  },
  {
    name: 'Isca Artificial Marine Inna 88 Pro Tuned',
    sub: 'Iscas Artificiais · Long Cast 88mm',
    img: 'images/produtos/isca-inna88.png',
    desc: 'Isca minnow de 88mm com sistema magnético Magnet Lock que garante arremessos extremamente longos. Equipada com anzóis VMC de alta performance, padrão de cores realista holográfico e ação natural na captação. Indicada para todos os tipos de peixes predadores em água doce e salgada.'
  },
  {
    name: 'Camarão Soft Big Ones Twister 10X Tough',
    sub: 'Iscas Soft · Camarão Artificial',
    img: 'images/produtos/camarao-twister.png',
    desc: 'Camarão soft com tecnologia 10X Tough — flexibilidade extrema e alta durabilidade mesmo após muitas fisgadas. Olhos 3D realistas, textura translúcida que imita perfeitamente o camarão natural. Embalagem com 2 unidades, ideal para robalo, corvina e peixes de estuário.'
  },
  {
    name: 'Chumbada Duncan 160g Sortida',
    sub: 'Anzóis & Chumbadas · Pesca de Praia',
    img: 'images/produtos/chumbada-duncan.png',
    desc: 'Chumbada modelo pirâmide de 160 gramas com pintura colorida fluorescente e contas atrativas, garantindo fixação perfeita no fundo arenoso e visibilidade adicional. Ideal para pesca de praia, surf casting e arremessos longos. Disponível em diversas cores: laranja, amarelo, verde, azul, rosa e listrada.'
  },
  {
    name: 'Máscara + Snorkel DiveCom',
    sub: 'Equipamentos Sub · Mergulho',
    img: 'images/produtos/mascara-divecom.png',
    desc: 'Conjunto de máscara de mergulho com lentes panorâmicas de vidro temperado e snorkel ergonômico com bocal anatômico em silicone macio. Ajuste confortável, vedação perfeita e visão ampla — perfeito para snorkeling, pesca submarina amadora e exploração aquática.'
  },
  {
    name: 'Linha Fluorocarbono Marine Vexter Power Leader 0.81mm',
    sub: 'Linhas · Leader Made in Japan',
    img: 'images/produtos/leader-vexter.png',
    desc: 'Líder 100% fluorocarbono fabricado no Japão, bitola 0.81mm com 39,5kg / 87,2lb de resistência e 50m de comprimento. Praticamente invisível debaixo d\'água, com altíssima resistência à abrasão. Indicado para pesca de grandes predadores, traíras dentadas e pesca em estruturas.'
  },
  {
    name: 'Molinete Saint Plus Lufthansa 8000',
    sub: 'Molinetes · Linha Pesada',
    img: 'images/produtos/molinete-lufthansa.png',
    desc: 'Molinete robusto Saint Plus série Lufthansa 8000, corpo em alumínio anodizado azul, múltiplos rolamentos para suavidade ímpar, freio dianteiro micrométrico e capacidade generosa de linha. Construído para pesca pesada de praia, pesqueiros e grandes peixes esportivos.'
  },
  {
    name: 'Porta Vara para Barco — Trio Ajustável',
    sub: 'Acessórios · Embarcações',
    img: 'images/produtos/porta-vara.png',
    desc: 'Conjunto com 3 porta-varas em PVC reforçado e tubo de alumínio inox, com fixadores azuis ajustáveis para encaixe perfeito em qualquer bordo. Mantém suas varas seguras e organizadas durante a navegação e a pescaria. Resistente ao sal, sol e à umidade.'
  },
  {
    name: 'Cilindros de CO2 Leão 12g — Caixa com 10',
    sub: 'Equipamentos · CO2 12g',
    img: 'images/produtos/cilindro-co2.png',
    desc: 'Caixa com 10 cartuchos de CO2 de 12 gramas da marca Leão. Vedação precisa e desempenho consistente para uso em equipamentos pneumáticos, infladores de coletes salva-vidas e acessórios náuticos. Não expor a temperaturas acima de 45°C.'
  },
];

const wrap = document.getElementById('products');
PRODUCTS.forEach((p, i) => {
  const el = document.createElement('article');
  el.className = 'product';
  el.style.transitionDelay = (i * 60) + 'ms';
  el.dataset.idx = i;
  el.innerHTML = `
    <button class="product__media" type="button" aria-label="Ver detalhes de ${p.name}">
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
    </button>
    <h3 class="product__name"><button type="button" class="product__namebtn">${p.name}</button></h3>
    <div class="product__sub">${p.sub}</div>
  `;
  wrap.appendChild(el);

  const open = () => openSidebar(p);
  el.querySelector('.product__media').addEventListener('click', open);
  el.querySelector('.product__namebtn').addEventListener('click', open);
});

const ip = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); ip.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.product').forEach(el => ip.observe(el));

// ===== Sidebar de produto =====
const sidebar = document.createElement('aside');
sidebar.className = 'pside';
sidebar.setAttribute('aria-hidden', 'true');
sidebar.innerHTML = `
  <div class="pside__backdrop" data-close></div>
  <div class="pside__panel" role="dialog" aria-modal="true" aria-labelledby="psideTitle">
    <button class="pside__close" type="button" aria-label="Fechar" data-close>×</button>
    <div class="pside__imgwrap">
      <img class="pside__img" src="" alt="" />
    </div>
    <div class="pside__body">
      <div class="pside__sub" id="psideSub"></div>
      <h3 class="pside__title" id="psideTitle"></h3>
      <p class="pside__desc" id="psideDesc"></p>
      <a class="pside__cta" target="_blank" rel="noopener" href="https://wa.me/5581996514078?text=Ol%C3%A1!%20Tenho%20interesse%20no%20produto%3A%20">
        Consultar no WhatsApp
      </a>
    </div>
  </div>
`;
document.body.appendChild(sidebar);

function openSidebar(p) {
  sidebar.querySelector('.pside__img').src = p.img;
  sidebar.querySelector('.pside__img').alt = p.name;
  sidebar.querySelector('#psideTitle').textContent = p.name;
  sidebar.querySelector('#psideSub').textContent = p.sub;
  sidebar.querySelector('#psideDesc').textContent = p.desc;
  sidebar.querySelector('.pside__cta').href =
    'https://wa.me/5581996514078?text=' + encodeURIComponent('Olá! Tenho interesse no produto: ' + p.name);
  sidebar.classList.add('is-open');
  sidebar.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  sidebar.classList.remove('is-open');
  sidebar.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
sidebar.addEventListener('click', (e) => {
  if (e.target.matches('[data-close]')) closeSidebar();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSidebar();
});
