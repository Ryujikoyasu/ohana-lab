async function loadFromOhanaWorks(){
  try{
    const htmlRes = await fetch('../site_ohana/works.html', {cache:'no-store'});
    if(!htmlRes.ok) throw new Error('Failed to fetch works.html');
    const html = await htmlRes.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const items = Array.from(doc.querySelectorAll('.atlas-grid a.atlas-item, .atlas-grid a.atlas-item.span-2'));
    // Filter out author="mi" (みー). Include items without data-author.
    const filtered = items.filter(a => (a.getAttribute('data-author') || '').trim() !== 'mi');
    return filtered.map(a => {
      const label = (a.querySelector('.label')?.textContent || '').trim();
      const imgEl = a.querySelector('img');
      const vidEl = a.querySelector('video');
      const thumb = imgEl?.getAttribute('src') || vidEl?.getAttribute('poster') || '';
      const href = a.getAttribute('href') || '#';
      return {
        title: label || 'Untitled',
        thumbnail: thumb.startsWith('http') || thumb.startsWith('/') ? thumb : `../${thumb}`,
        path: href.startsWith('http') || href.startsWith('/') ? href : `../${href}`,
      };
    });
  }catch(e){
    console.error(e);
    return [];
  }
}

async function loadFromContentIndex(){
  try{
    const res = await fetch('../content/projects/index.json', {cache:'no-store'});
    if(!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.projects) ? data.projects : [];
  }catch(e){
    return [];
  }
}

function cardTemplate(p){
  const link = p.path || '#';
  const img = p.thumbnail || '';
  return `
    <a class="card" href="${link}" target="_blank" rel="noopener">
      ${img ? `<img src="${img}" alt="${p.title || ''}">` : ''}
      <div class="body">
        <div class="title">${p.title || 'Untitled'}</div>
      </div>
    </a>
  `;
}

(async function init(){
  const root = document.getElementById('works');
  if(!root) return;
  // Load from Ohana (excluding author=mi) and merge ryuddi-only entries from content index
  const fromOhana = await loadFromOhanaWorks();
  const fromContent = await loadFromContentIndex();
  const normalizedContent = fromContent.map(p => ({ title: p.title, thumbnail: p.thumbnail, path: p.path }));
  const map = new Map();
  [...fromOhana, ...normalizedContent].forEach(p => {
    const key = p.path || p.title;
    if(!map.has(key)) map.set(key, p);
  });
  const projects = Array.from(map.values());
  if(projects.length===0){
    root.innerHTML = `
      <p style="grid-column:1 / -1">作品が見つかりません。Ohanaの <code>works.html</code> または <code>/content/projects/index.json</code> を確認してください。</p>
    `;
    return;
  }
  root.innerHTML = projects.map(cardTemplate).join('');
})();
