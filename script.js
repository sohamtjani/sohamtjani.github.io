const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const appLayer = document.querySelector('.app-layer');
const windows = document.querySelectorAll('[data-app-window]');
const dockItems = document.querySelectorAll('.dock-item[data-open]');
const apps = ['about', 'current', 'work', 'resume', 'notes', 'contact'];

function openApp(name, updateHash = true) {
  const target = document.querySelector('[data-app-window="' + name + '"]');
  if (!target) return;
  appLayer.classList.add('is-open');
  windows.forEach((item) => item.classList.toggle('is-open', item === target));
  dockItems.forEach((item) => item.classList.toggle('is-active', item.dataset.open === name));
  if (updateHash) history.pushState({ app: name }, '', '#' + name);
}

function closeApps(updateHash = true) {
  appLayer.classList.remove('is-open');
  windows.forEach((item) => item.classList.remove('is-open'));
  dockItems.forEach((item) => item.classList.remove('is-active'));
  if (updateHash) history.pushState({}, '', '#home');
}

document.querySelectorAll('[data-open]').forEach((control) => control.addEventListener('click', () => openApp(control.dataset.open)));
document.querySelectorAll('[data-close-apps]').forEach((control) => control.addEventListener('click', () => closeApps()));
appLayer.addEventListener('click', (event) => { if (event.target === appLayer) closeApps(); });
window.addEventListener('popstate', () => {
  const hash = window.location.hash.slice(1);
  if (apps.includes(hash)) openApp(hash, false); else closeApps(false);
});
const initialHash = window.location.hash.slice(1);
if (apps.includes(initialHash)) openApp(initialHash, false);

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeApps();
  if (event.key.toLowerCase() === 'a') openApp('about');
  if (event.key.toLowerCase() === 'b') openApp('current');
  if (event.key.toLowerCase() === 'w') openApp('work');
  if (event.key.toLowerCase() === 'n') openApp('notes');
  if (event.key.toLowerCase() === 'c') openApp('contact');
});

const workData = {
  excalibur: {
    type: 'OPERATING',
    counter: '01 / 02',
    role: 'CEO · Education × Growth',
    title: 'Excalibur',
    body: 'A company I built to learn the full loop: finding the problem, earning trust, making the product useful, and designing an operating system that can keep moving without me in every room.',
    link: 'https://github.com/sohamtjani/Excalibur-Site',
    linkText: 'Open the source',
    art: 'art-excalibur',
    word: 'EXCALIBUR',
    caption: 'education / growth'
  },
  renova: {
    type: 'PRODUCT / VENTURE',
    counter: '02 / 02',
    role: 'Product · Venture building',
    title: 'Renova',
    body: 'A feasibility layer for renovation decisions: translating an ambiguous, expensive project into something people can understand before they commit.',
    link: 'https://askrenova.com/',
    linkText: 'Visit Renova',
    art: 'art-renova',
    word: 'RENOVA',
    caption: 'know before you build'
  }
};
const workButtons = document.querySelectorAll('.work-select');
const workArt = document.querySelector('#work-art');
function setWork(key) {
  const data = workData[key];
  if (!data) return;
  workButtons.forEach((button) => {
    const active = button.dataset.work === key;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', String(active));
  });
  document.querySelector('#work-type').textContent = data.type;
  document.querySelector('#work-counter').textContent = data.counter;
  document.querySelector('#work-role').textContent = data.role;
  document.querySelector('#work-title').textContent = data.title;
  document.querySelector('#work-body').textContent = data.body;
  const link = document.querySelector('#work-link');
  link.href = data.link;
  link.innerHTML = data.linkText + ' <span>↗</span>';
  workArt.className = 'work-display-art ' + data.art;
  workArt.innerHTML = '<span class="art-word">' + data.word + '</span><span class="art-signal"></span><span class="art-signal art-signal-two"></span><span class="art-caption">' + data.caption + '</span>';
}
workButtons.forEach((button) => button.addEventListener('click', () => setWork(button.dataset.work)));

const companyLogos = document.querySelectorAll('.company-logo');
let companyLogoIndex = 0;
function rotateCompanyLogo() {
  if (companyLogos.length < 2) return;
  companyLogos[companyLogoIndex].classList.remove('is-active');
  companyLogoIndex = (companyLogoIndex + 1) % companyLogos.length;
  companyLogos[companyLogoIndex].classList.add('is-active');
}
if (!reduced && companyLogos.length > 1) window.setInterval(rotateCompanyLogo, 3000);
const currentCompanyLogos = document.querySelectorAll('.current-company-logo');
let currentCompanyLogoIndex = 0;
function rotateCurrentCompanyLogo() {
  if (currentCompanyLogos.length < 2) return;
  currentCompanyLogos[currentCompanyLogoIndex].classList.remove('is-active');
  currentCompanyLogoIndex = (currentCompanyLogoIndex + 1) % currentCompanyLogos.length;
  currentCompanyLogos[currentCompanyLogoIndex].classList.add('is-active');
}
if (!reduced && currentCompanyLogos.length > 1) window.setInterval(rotateCurrentCompanyLogo, 3500);
if (!reduced) {
  window.addEventListener('pointermove', (event) => {
    root.style.setProperty('--mx', event.clientX + 'px');
    root.style.setProperty('--my', event.clientY + 'px');
  });
}
