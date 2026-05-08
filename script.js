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