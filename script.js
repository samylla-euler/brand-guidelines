// Generate color scales
  const slate = [
    ['50','#F8FAFC'],['100','#F1F5F9'],['200','#ECEFF3'],['300','#DBE0E5'],['400','#ADB6C0'],
    ['500','#546078'],['600','#3F4A5E'],['700','#2F3847'],['800','#232B38'],['900','#151F2E'],['950','#0A0F18']
  ];
  const blue = [
    ['50','#F1F5FE'],['100','#DDE8FC'],['200','#BCD0F8'],['300','#92B2F4'],['400','#5E8AEF'],
    ['500','#2563EB'],['600','#1E4FCB'],['700','#1A42A8'],['800','#173886'],['900','#132C64'],['950','#0B1A3D']
  ];
  const pink = [
    ['50','#FFF0F8'],['100','#FFD9EE'],['200','#FFB5DC'],['300','#FF8FCD'],['400','#FF54B8'],
    ['500','#FF1FA8'],['600','#D80E8C'],['700','#A40D6E'],['800','#7A0950'],['900','#520634'],['950','#2D031C']
  ];
  function isDark(hex) {
    const r = parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
    return (r*0.299 + g*0.587 + b*0.114) < 150;
  }
  function buildScale(id, scale) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = scale.map(([n,hex]) => {
      const dark = isDark(hex);
      const fg = dark ? 'rgba(255,255,255,0.95)' : 'rgba(10,15,24,0.85)';
      return `<div class="step" style="background:${hex};color:${fg};">
        <span class="num">${n}</span>
        <span class="hex">${hex}</span>
      </div>`;
    }).join('');
    // adjust template-columns for non-11
    if (scale.length !== 11) {
      el.style.gridTemplateColumns = `repeat(${scale.length}, 1fr)`;
    }
  }
  buildScale('slate-scale', slate);
  buildScale('blue-scale', blue);
  buildScale('pink-scale', pink);

  // Personality matrix
  const personality = [
    ['Elite',          1, 'Approachable'],
    ['Serious',        2, 'Playful'],
    ['Conventional',   3, 'Rebel'],
    ['Authoritative',  2, 'Friendly'],
    ['Mature',         1, 'Youthful'],
    ['Classic',        3, 'Innovative'],
    ['Feminine',       3, 'Masculine'],
    ['Complex',        4, 'Simple'],
    ['Subtle',         1, 'Bright'],
    ['Expensive',      2, 'Economical'],
    ['Mainstream',     3, 'Unconventional'],
    ['Elegant',        2, 'Casual'],
  ];
  const pEl = document.getElementById('personality');
  if (pEl) {
    pEl.innerHTML = personality.map(([l, pos, r]) => {
      const cells = [1,2,3,4].map(n => {
        const active = n === pos;
        const cls = active ? (n === 1 || n === 4 ? 'active pink-mark' : 'active') : '';
        return `<div class="cell ${cls}">${active ? n : ''}</div>`;
      }).join('');
      return `<div class="person-row">
        <div class="label-l">${l}</div>
        <div class="scale">${cells}</div>
        <div class="label-r">${r}</div>
      </div>`;
    }).join('');
  }

  // Active section in sidebar
  const links = document.querySelectorAll('#nav a');
  const sections = [...document.querySelectorAll('section[id]')];
  function setActive() {
    const y = window.scrollY + 200;
    let active = sections[0];
    for (const s of sections) {
      if (s.offsetTop <= y) active = s;
    }
    links.forEach(a => a.classList.toggle('active', a.dataset.target === active.id));
  }
  setActive();
  window.addEventListener('scroll', setActive, { passive: true });
  // Smooth scroll
  links.forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.getElementById(a.dataset.target);
    if (t) window.scrollTo({ top: t.offsetTop - 24, behavior: 'smooth' });
  }));

document.addEventListener('DOMContentLoaded', function() {
  var fonts = [
    { label: 'EB Garamond',     sub: 'Old-style serif',      value: "'EBGaramond', Georgia, serif",             cardName: 'EB Garamond',      cardRole: 'Carries the wordmark and every display moment. Classical and literary, with editorial warmth in the strokes.',    cardDesigner: 'Georg Duffner',       cardClass: 'Old-style serif',      cardWeights: '400, 500',  cardUsed: 'Display, headlines' },
    { label: 'Instrument Serif',sub: 'Transitional serif',    value: "'InstrumentSerif', Georgia, serif",         cardName: 'Instrument Serif', cardRole: 'Sharp and editorial with a contemporary tension. Bridges classical structure and modern precision.',                cardDesigner: 'Rodrigo Fuenzalida',  cardClass: 'Transitional serif',   cardWeights: '400',       cardUsed: 'Display, headlines' },
    { label: 'Instrument Sans', sub: 'Geometric sans-serif',  value: "'InstrumentSans', system-ui, sans-serif",   cardName: 'Instrument Sans',  cardRole: 'Clean and geometric with technical authority. Ideal for bold display in product and UI contexts.',                cardDesigner: 'Rodrigo Fuenzalida',  cardClass: 'Geometric sans-serif', cardWeights: '400–700',   cardUsed: 'Display, UI' },
    { label: 'Erode',           sub: 'Humanist serif',        value: "'Erode', Georgia, serif",                   cardName: 'Erode',            cardRole: 'Organic and warm with humanist roots. Brings approachability and craft to display moments.',                       cardDesigner: 'Fontshare',           cardClass: 'Humanist serif',       cardWeights: '300–700',   cardUsed: 'Display, headlines' },
    { label: 'Uncut Sans',      sub: 'Grotesque sans-serif',  value: "'UncutSans', system-ui, sans-serif",        cardName: 'Uncut Sans',       cardRole: 'Versatile grotesque with strong neutrality. Works across sizes with quiet confidence.',                           cardDesigner: 'Fontshare',           cardClass: 'Grotesque sans-serif', cardWeights: '100–900',   cardUsed: 'Display, body, UI' },
    { label: 'LT Remark',       sub: 'Geometric display',     value: "'LTRemark', system-ui, sans-serif",         cardName: 'LT Remark',        cardRole: 'Bold and structural with commanding presence. A geometric display face built for impact at large sizes.',           cardDesigner: 'LT Type Foundry',     cardClass: 'Geometric display',    cardWeights: '400–900',   cardUsed: 'Display, headlines' },
  ];
  var current  = 0;
  var picker   = document.getElementById('font-picker');
  var trigger  = document.getElementById('fp-trigger');
  var menu     = document.getElementById('fp-menu');
  var curLabel = document.getElementById('fp-current-label');

  fonts.forEach(function(f, i) {
    var opt = document.createElement('div');
    opt.className = 'fp-option' + (i === 0 ? ' active' : '');
    opt.setAttribute('role', 'option');
    opt.dataset.index = i;
    opt.innerHTML =
      '<div class="fp-opt-text">' +
        '<div class="fp-opt-name">' + f.label + '</div>' +
        '<div class="fp-opt-sub">'  + f.sub   + '</div>' +
      '</div>' +
      '<span class="fp-opt-sample" style="font-family:' + f.value + '">Aa</span>' +
      '<svg class="fp-check" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5"/></svg>';
    opt.addEventListener('click', function() { applyFont(i); closeMenu(); });
    menu.appendChild(opt);
  });

  function applyFont(i) {
    current = i;
    var f = fonts[i];
    document.documentElement.style.setProperty('--heading-font', f.value);
    curLabel.textContent = f.label;
    menu.querySelectorAll('.fp-option').forEach(function(o, j) { o.classList.toggle('active', j === i); });
    var card = document.querySelector('.face-card.display');
    if (card) {
      var nameEl = card.querySelector('.face-name');
      var roleEl = card.querySelector('.face-role');
      var vals   = card.querySelectorAll('.val');
      if (nameEl) nameEl.textContent = f.cardName;
      if (roleEl) roleEl.textContent = f.cardRole;
      if (vals[0]) vals[0].textContent = f.cardDesigner;
      if (vals[1]) vals[1].textContent = f.cardClass;
      if (vals[2]) vals[2].textContent = f.cardWeights;
      if (vals[3]) vals[3].textContent = f.cardUsed;
    }
    var rule = document.querySelector('.demo-rule > div');
    if (rule) rule.innerHTML = 'Headline → ' + f.cardName + '<span> · Medium · -0.035em</span>';
    var tag  = document.querySelector('.sub-head .tag');
    if (tag)  tag.textContent = 'Display in ' + f.cardName + ' · Text in Inter';
  }

  function openMenu()  { picker.classList.add('open'); }
  function closeMenu() { picker.classList.remove('open'); }
  trigger.addEventListener('click', function(e) { e.stopPropagation(); picker.classList.contains('open') ? closeMenu() : openMenu(); });
  document.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeMenu(); });
});