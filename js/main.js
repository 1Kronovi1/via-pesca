// Year
document.getElementById('year').textContent = new Date().getFullYear();

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
  { name: 'Varas',        sub: 'Linha Premium',   desc: 'Varas para pesca leve, média e pesada — modelos nacionais e importados das melhores marcas, expostos para você sentir antes de levar.' },
  { name: 'Molinetes',    sub: 'Suavidade & Força', desc: 'Molinetes com rolamentos calibrados, freios precisos e acabamento robusto para enfrentar desde o tucunaré ao dourado.' },
  { name: 'Carretilhas',  sub: 'Performance',      desc: 'Modelos de perfil baixo e redondo, com freio magnético ou centrífugo, prontos para arremessos certeiros e brigas memoráveis.' },
  { name: 'Iscas',        sub: 'Naturais & Artificiais', desc: 'Plugs, jigs, spinnerbaits, soft baits e iscas naturais selecionadas para imitar a presa certa em cada ambiente.' },
  { name: 'Anzóis & Linhas', sub: 'Precisão',      desc: 'Anzóis temperados, linhas monofilamento, multifilamento e fluorocarbono nas melhores bitolas e cores.' },
  { name: 'Equipamentos & Acessórios', sub: 'Pesca Completa', desc: 'Caixas, alicates, sondas, coletes, bonés e tudo o que faltava para deixar a sua pescaria pronta antes do amanhecer.' },
];
const wrap = document.getElementById('products');
PRODUCTS.forEach((p, i) => {
  const el = document.createElement('div');
  el.className = 'product';
  el.style.transitionDelay = (i * 80) + 'ms';
  el.innerHTML = `
    <div class="product__circle"></div>
    <h3>${p.name}</h3>
    <div class="product__sub">${p.sub}</div>
    <p>${p.desc}</p>
  `;
  wrap.appendChild(el);
});

const ip = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); ip.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.product').forEach(el => ip.observe(el));
