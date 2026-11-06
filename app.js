'use strict';
const config = window.CONVITE;
const pages = [...document.querySelectorAll('.page')];
const names = ['Boas-vindas', 'Save the date', 'O convite', 'Agradecimentos', 'Data e local', 'Contagem regressiva', 'Manual dos convidados', 'Com carinho'];
let current = 0;
let opening = false;
let openingTimer = 0;
const menu = document.querySelector('#menu');
const menuButton = document.querySelector('#menu-button');
function closeMenu() { menu.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); }
// Todas as telas ficam no fluxo da página: rolagem livre, inclusive por toque.
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
pages.forEach(page => { page.hidden = false; });
function updateNavigation(index) {
  current = Math.max(0, Math.min(pages.length - 1, index));
  document.querySelector('#navigation').hidden = current === 0;
  document.querySelector('#previous').disabled = current === 0;
  document.querySelector('#next').hidden = current === pages.length - 1;
  document.querySelector('#page-name').textContent = names[current];
  document.querySelector('#page-number').textContent = `${String(current + 1).padStart(2, '0')} / 08`;
  menu.querySelectorAll('a').forEach((a, i) => {
    if(i === current) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}
function showPage(index, updateHash = true, focus = true, smooth = true) {
  clearTimeout(openingTimer);
  opening = false;
  pages[0].classList.remove('leaving');
  const target = Math.max(0, Math.min(pages.length - 1, index));
  updateNavigation(target);
  if(updateHash) history.replaceState(null, '', `#${pages[target].id}`);
  if(target === 0) {
    document.querySelector('#envelope').classList.remove('opened');
    opening = false;
  }
  closeMenu();
  if(focus) {
    const title = pages[target].querySelector('h1,h2');
    title.tabIndex = -1;
    title.focus({preventScroll:true});
  }
  pages[target].scrollIntoView({behavior: smooth && focus && !reducedMotion() ? 'smooth' : 'instant', block:'start'});
}
// Sincroniza o índice e os botões quando o visitante rola manualmente.
let scrollFrame = 0;
function syncScroll() {
  scrollFrame = 0;
  const marker = window.innerHeight * 0.35;
  let index = 0;
  pages.forEach((page, i) => { if(page.getBoundingClientRect().top <= marker) index = i; });
  if(index !== current) updateNavigation(index);
}
function queueScrollSync() {
  if(!scrollFrame) scrollFrame = requestAnimationFrame(syncScroll);
}
window.addEventListener('scroll', queueScrollSync, {passive:true});
window.addEventListener('resize', queueScrollSync, {passive:true});
names.forEach((name, i) => { const a = document.createElement('a'); a.href = `#${pages[i].id}`; a.textContent = `${String(i+1).padStart(2,'0')} · ${name}`; a.addEventListener('click', e => {e.preventDefault();showPage(i);}); menu.append(a); });
menuButton.addEventListener('click', () => { menu.hidden = !menu.hidden; menuButton.setAttribute('aria-expanded', String(!menu.hidden)); });
// Transição direta: a página 2 existe apenas uma vez no documento.
document.querySelector('#open-envelope').addEventListener('click', () => {
  if(opening) return;
  opening = true;
  document.querySelector('#envelope').classList.add('opened');
  pages[0].classList.add('leaving');
  openingTimer = setTimeout(() => {
    opening = false;
    if(current === 0) {
      showPage(1, true, true, false);
      pages[1].classList.remove('entering');
      void pages[1].offsetWidth;
      pages[1].classList.add('entering');
    }
    pages[0].classList.remove('leaving');
  }, reducedMotion() ? 0 : 700);
});
document.querySelector('#previous').addEventListener('click', () => showPage(current-1));
document.querySelector('#next').addEventListener('click', () => showPage(current+1));
document.querySelector('#restart').addEventListener('click', () => showPage(0));
document.querySelector('.brand').addEventListener('click', e => { e.preventDefault();showPage(0); });
window.addEventListener('hashchange', () => { const i=pages.findIndex(p=>`#${p.id}`===location.hash);if(i>=0)showPage(i,false); });
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') {closeMenu();menuButton.focus();}
  if(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.altKey || e.ctrlKey || e.metaKey) return;
  if(e.key === 'ArrowRight' && current>0 && current<7) showPage(current+1);
  if(e.key === 'ArrowLeft' && current>0) showPage(current-1);
});
document.querySelectorAll('[data-photo]').forEach(img => { img.src = config.fotos[img.dataset.photo]; });
document.querySelector('#address').textContent = config.endereco;
document.querySelector('#map').src = `https://maps.google.com/maps?q=${encodeURIComponent(config.endereco)}&output=embed`;
document.querySelector('#directions').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.endereco)}`;
document.querySelector('#rsvp').href = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(config.mensagem)}`;
// Fevereiro de 2027 começa na segunda-feira e tem 28 dias.
const tbody = document.querySelector('#calendar-body');
for(let row=0;row<5;row++) { const tr = document.createElement('tr'); for(let col=0;col<7;col++) { const td=document.createElement('td'); const day=row*7+col; if(day>=1&&day<=28) { const span=document.createElement('span');span.textContent=day;td.append(span);if(day===13){td.className='chosen';td.setAttribute('aria-label','13 de fevereiro: baile de formatura');}} tr.append(td);}tbody.append(tr); }
function remaining(now) { const total=Math.max(0, Math.floor((new Date(config.data).getTime()-now)/1000));return [Math.floor(total/86400),Math.floor(total%86400/3600),Math.floor(total%3600/60),total%60]; }
function tick(){ const values=remaining(Date.now());['days','hours','minutes','seconds'].forEach((id,i)=>document.getElementById(id).textContent=String(values[i]).padStart(2,'0'));if(values.every(v=>v===0))document.querySelector('#countdown-title').textContent='CHEGOU O GRANDE DIA!'; }
tick();setInterval(tick,1000);
const escapeICS = s => s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
const stamp = new Date(config.data).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Julia Ribeiro//Convite//PT-BR','BEGIN:VEVENT','UID:formatura-julia-20270213@convite.local','DTSTAMP:20261106T000000Z',`DTSTART:${stamp}`,'SUMMARY:Baile de Formatura — Julia Ribeiro',`LOCATION:${escapeICS(config.endereco)}`,`DESCRIPTION:${escapeICS('Vivaro — Maringá/PR. Com carinho, Dra. Julia Ribeiro.')}`,'END:VEVENT','END:VCALENDAR',''].join('\r\n');
document.querySelector('#add-calendar').href=URL.createObjectURL(new Blob([ics],{type:'text/calendar;charset=utf-8'}));
const initial = pages.findIndex(p=>`#${p.id}`===location.hash);showPage(initial>=0?initial:0,false,false);
