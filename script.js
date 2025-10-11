// script.js (更新版)
document.addEventListener('DOMContentLoaded', () => {

    const mainContent = document.getElementById('main-content');
    const cursor = document.querySelector('.cursor');
    const navTrigger = document.getElementById('nav-trigger');
    const navigation = document.getElementById('navigation');
    const navLinks = document.querySelectorAll('.nav-link');
    const siteHeader = document.getElementById('site-header');
    const modeToggle = document.getElementById('mode-toggle');
    const specimenToggle = document.getElementById('specimen-toggle');
    const specimenDrawer = document.getElementById('specimen-drawer');
    const notesOpen = document.getElementById('notes-open');
    const notesOverlay = document.getElementById('notes-overlay');
    const notesClose = document.getElementById('notes-close');
    const notesContent = document.getElementById('notes-content');

    // ページ読み込み時の初期化
    if(navTrigger) {
        navTrigger.style.opacity = '1';
    }

    // カスタムカーソルの追従
    window.addEventListener('mousemove', e => {
        cursor.style.top = e.clientY + 'px';
        cursor.style.left = e.clientX + 'px';
        if (document.body.classList.contains('mode-play')) maybeSpawnSeed(e);
    });

    // ホバーエフェクト
    document.querySelectorAll('a, button, .grid-item, #nav-trigger, input, audio, .work-image-container').forEach(el => {
        el.addEventListener('mouseover', () => {
            cursor.style.width = '32px';
            cursor.style.height = '32px';
            cursor.style.backgroundColor = 'rgba(228, 161, 193, 0.2)'; // 桜色
            cursor.style.boxShadow = '0 0 12px rgba(228, 161, 193, 0.4)';
        });
        el.addEventListener('mouseout', () => {
            cursor.style.width = '16px';
            cursor.style.height = '16px';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.boxShadow = '0 0 8px rgba(228, 161, 193, 0.3)';
        });
    });

    // ナビゲーションの開閉
    if(navTrigger) {
        navTrigger.addEventListener('click', () => {
            navigation.classList.toggle('active');
        });
    }
    
    // ナビゲーションリンククリックでメニューを閉じる
    if(navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // index.html内でのスムーススクロールの場合
                if(link.getAttribute('href').startsWith('#')) {
                    navigation.classList.remove('active');
                }
                // ページ遷移の場合は何もしない
            });
        });
    }

    // スクロールに応じたフェードイン
    const sections = document.querySelectorAll('.creation-section, .about-section');
    if(sections.length > 0){
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.15 
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // 浮遊する花びらを生成
    function createFloatingPetals() {
        const petalsContainer = document.getElementById('petals-container');
        if (!petalsContainer) return;

        function createPetal() {
            const petal = document.createElement('div');
            petal.className = 'petal';
            
            // ランダムな位置とアニメーション遅延を設定
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDelay = Math.random() * 6 + 's';
            petal.style.animationDuration = (12 + Math.random() * 6) + 's';
            
            // ランダムなサイズ（より小さく繊細に）
            const size = 3 + Math.random() * 4;
            petal.style.width = size + 'px';
            petal.style.height = size + 'px';
            
            petalsContainer.appendChild(petal);
            
            // アニメーション完了後に削除
            setTimeout(() => {
                if (petal.parentNode) {
                    petal.parentNode.removeChild(petal);
                }
            }, 20000);
        }

        // 定期的に花びらを生成（より控えめに）
        setInterval(createPetal, 1500);
        
        // 初期花びらを生成
        for (let i = 0; i < 3; i++) {
            setTimeout(createPetal, i * 2000);
        }
    }

    // 回転する小花を各セクションタイトルに追加
    function addRotatingFlowers() {
        const titleWrappers = document.querySelectorAll('.section-title-wrapper');
        titleWrappers.forEach((wrapper, index) => {
            const flower = document.createElement('div');
            flower.className = 'rotating-flower';
            flower.style.animationDelay = (index * 2) + 's';
            wrapper.appendChild(flower);
        });
    }

    // 光の粒子エフェクトを追加
    function addLightParticles() {
        const sections = document.querySelectorAll('.creation-section, .about-section');
        sections.forEach(section => {
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'light-particles';
            section.appendChild(particlesContainer);
            
            function createParticle() {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 4 + 's';
                
                particlesContainer.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 4000);
            }
            
            // 定期的に粒子を生成
            setInterval(createParticle, 2000);
            
            // 初期粒子を生成
            for (let i = 0; i < 3; i++) {
                setTimeout(createParticle, i * 500);
            }
        });
    }

    // 揺れるエフェクトを特定の要素に追加
    function addSwayingEffect() {
        const sectionsToSway = document.querySelectorAll('.section-title, .vertical-text');
        sectionsToSway.forEach((element, index) => {
            element.classList.add('swaying-element');
            element.style.animationDelay = (index * 0.5) + 's';
        });
    }


    // エフェクトを初期化（低モーション環境に配慮）
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(() => {
        if (!reduceMotion) {
            createFloatingPetals();
            addRotatingFlowers();
            addLightParticles();
            addSwayingEffect();
        }
        initMediaGalleries();
        initForestParallax(reduceMotion);
        initPlayMode(reduceMotion);
        initSpecimenDrawer();
        initFieldNotes();
        initShowreel(reduceMotion);
        initHeaderOnHero();
        initWorksStack();
    }, 600);

    // メディアギャラリーの初期化（サムネクリックでメイン切替）
    function initMediaGalleries() {
        const galleries = document.querySelectorAll('[data-gallery]');
        galleries.forEach(gallery => {
            const mainImg = gallery.querySelector('img.gallery-main');
            const mainPlaceholder = gallery.querySelector('.gallery-main-placeholder');
            const thumbs = gallery.querySelectorAll('.gallery-thumb');

            // 最初の有効サムネをメインに適用
            let initialized = false;
            thumbs.forEach((thumb, idx) => {
                const src = thumb.getAttribute('data-src');
                // サムネ画像が用意されていれば img を入れる
                if (src) {
                    // プレースホルダーがあれば外す
                    const ph = thumb.querySelector('.placeholder-image');
                    if (ph) ph.remove();
                    const thumbImg = document.createElement('img');
                    thumbImg.alt = `ギャラリー サムネイル ${idx+1}`;
                    thumbImg.src = src; // 画像未配置でも壊れはするが構造は維持
                    thumb.appendChild(thumbImg);
                }
                thumb.addEventListener('click', () => {
                    thumbs.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                    if (mainImg) {
                        mainImg.style.opacity = '0';
                        const nextSrc = src || '';
                        if (nextSrc) {
                            // 画像のロード完了後にフェードイン
                            const onload = () => {
                                mainImg.style.display = 'block';
                                mainImg.style.opacity = '1';
                                mainImg.removeEventListener('load', onload);
                            };
                            mainImg.addEventListener('load', onload);
                            mainImg.src = nextSrc;
                        } else {
                            mainImg.style.display = 'none';
                        }
                    }
                    if (mainPlaceholder) {
                        mainPlaceholder.style.display = src ? 'none' : 'flex';
                    }
                });
                // 初期選択
                if (!initialized && src) {
                    thumb.click();
                    initialized = true;
                }
            });
        });
    }
    // expose for dynamic content
    window.__initMediaGalleries = initMediaGalleries;
});

// パララックス“森”の初期化
function initForestParallax(reduceMotion){
    const forest = document.getElementById('forest');
    if (!forest) return;
    const canopy = forest.querySelector('.layer-canopy');
    const mid = forest.querySelector('.layer-mid');
    const ground = forest.querySelector('.layer-ground');
    let mouseX = 0, mouseY = 0, scrollY = window.scrollY;

    function onMouse(e){
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    }
    function onScroll(){ scrollY = window.scrollY; }

    if (!reduceMotion){
        window.addEventListener('mousemove', onMouse, { passive: true });
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    function raf(){
        const s = Math.min(1, scrollY / 800);
        const amp = document.body.classList.contains('mode-play') ? 1.4 : 1;
        const mx = reduceMotion ? 0 : mouseX;
        const my = reduceMotion ? 0 : mouseY;
        if (canopy) canopy.style.transform = `translate3d(${mx * 12 * amp}px, ${my * 12 * amp}px, 0) translateY(${s * 8 * amp}px)`;
        if (mid)    mid.style.transform    = `translate3d(${mx * 24 * amp}px, ${my * 18 * amp}px, 0) translateY(${s * 16 * amp}px)`;
        if (ground) ground.style.transform = `translate3d(${mx * 36 * amp}px, ${my * 24 * amp}px, 0) translateY(${s * 28 * amp}px)`;
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

// ===== Play Mode =====
function initPlayMode(reduceMotion){
    const btn = document.getElementById('mode-toggle');
    if (!btn) return;
    const saved = localStorage.getItem('mode');
    if (saved === 'play') enablePlay();
    updateBtn();
    btn.addEventListener('click', () => {
        if (document.body.classList.contains('mode-play')) {
            disablePlay();
        } else {
            enablePlay();
        }
        updateBtn();
    });

    function updateBtn(){
        const on = document.body.classList.contains('mode-play');
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        btn.textContent = on ? '研究' : 'あそび';
    }
    function enablePlay(){ document.body.classList.add('mode-play'); localStorage.setItem('mode','play'); }
    function disablePlay(){ document.body.classList.remove('mode-play'); localStorage.setItem('mode','lab'); }

    if (!reduceMotion){
        // seed container
        let seedLayer = document.getElementById('seed-layer');
        if (!seedLayer){
            seedLayer = document.createElement('div');
            seedLayer.id = 'seed-layer';
            document.body.appendChild(seedLayer);
        }
    }
}

let lastSeedTime = 0;
function maybeSpawnSeed(e){
    const now = performance.now();
    if (now - lastSeedTime < 60) return; // rate limit
    lastSeedTime = now;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const seed = document.createElement('div');
    seed.className = 'seed' + (Math.random() < 0.33 ? ' alt' : '');
    seed.style.left = e.clientX + 'px';
    seed.style.top = e.clientY + 'px';
    seed.style.transform += ` rotate(${Math.random()*180}deg)`;
    document.body.appendChild(seed);
    const driftX = (Math.random() - 0.5) * 40;
    const driftY = 30 + Math.random() * 40;
    const duration = 900 + Math.random() * 600;
    seed.animate([
        { transform: seed.style.transform, opacity: 0.85 },
        { transform: `translate(${driftX}px, ${driftY}px)` , opacity: 0 }
    ], { duration, easing: 'ease-out' });
    setTimeout(()=> seed.remove(), duration);
}

// ===== Specimen Drawer =====
function initSpecimenDrawer(){
    const toggle = document.getElementById('specimen-toggle');
    const drawer = document.getElementById('specimen-drawer');
    if (!toggle || !drawer) return;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) applyTheme(savedTheme);
    toggle.addEventListener('click', ()=> {
        drawer.classList.toggle('active');
        drawer.setAttribute('aria-hidden', drawer.classList.contains('active') ? 'false' : 'true');
    });
    drawer.addEventListener('click', (e)=>{
        const btn = e.target.closest('.chip');
        if (!btn) return;
        const theme = btn.getAttribute('data-theme');
        applyTheme(theme);
        localStorage.setItem('theme', theme);
    });
    function applyTheme(theme){
        document.body.classList.remove('theme-sakura','theme-indigo','theme-ezo','theme-default');
        if (theme) document.body.classList.add(`theme-${theme}`);
    }
}

// ===== Field Notes Overlay =====
function initFieldNotes(){
    const openBtn = document.getElementById('notes-open');
    const overlay = document.getElementById('notes-overlay');
    const closeBtn = document.getElementById('notes-close');
    const content = document.getElementById('notes-content');
    if (!openBtn || !overlay || !content) return;
    const notes = [
        '花は、咲くために何かを求めない。ただそこにある。',
        '土地の記憶を、布と手に宿らせる。',
        '技術よりも、生き方そのものを作品に。',
        '水と森の境界で、ひかりが呼吸する。',
        'あはひで出会う——人と自然の輪郭は、やわらぐ。'
    ];
    function render(){
        const pick = notes.sort(()=> Math.random()-0.5).slice(0,3)
            .map(t=> `<blockquote>${t}</blockquote>`).join('');
        content.innerHTML = pick;
    }
    function open(){ render(); overlay.classList.add('active'); overlay.setAttribute('aria-hidden','false'); }
    function close(){ overlay.classList.remove('active'); overlay.setAttribute('aria-hidden','true'); }
    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e)=> { if (e.target === overlay) close(); });
    document.addEventListener('keydown', (e)=> { if (e.key === 'Escape') close(); });
}

// ===== Showreel (hero) =====
function initShowreel(reduceMotion){
    const reel = document.querySelector('.showreel .reel');
    if (!reel) return;
    const slides = Array.from(reel.querySelectorAll('.slide'));
    if (slides.length === 0) return;
    let i = 0; let timer;
    function activate(idx){
        slides.forEach((s, n)=>{ s.classList.toggle('active', n===idx); });
    }
    function next(){ i = (i+1) % slides.length; activate(i); }
    activate(0);
    if (!reduceMotion){ timer = setInterval(next, 6000); }
    const spots = document.querySelector('.reel-spots');
    if (spots){
        spots.addEventListener('click', (e)=>{
            const btn = e.target.closest('.spot');
            if (!btn) return;
            const target = btn.getAttribute('data-target');
            if (target) document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
        });
    }
    const actions = document.querySelector('.reel-actions');
    if (actions){
        actions.addEventListener('click', (e)=>{
            const btn = e.target.closest('[data-goto]');
            if (!btn) return;
            const target = btn.getAttribute('data-goto');
            if (target) document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Header contrast when over hero
function initHeaderOnHero(){
    const hero = document.querySelector('.showreel');
    const header = document.getElementById('site-header');
    if (!hero || !header) return;
    function onScroll(){
        const bottom = hero.getBoundingClientRect().bottom;
        if (bottom > 60) header.classList.add('on-hero'); else header.classList.remove('on-hero');
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

// ===== Works Stack activation and nav =====
function initWorksStack(){
    const items = document.querySelectorAll('.works-stack .stack-item');
    if (!items.length) return;
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if (entry.isIntersecting) entry.target.classList.add('is-active');
            else entry.target.classList.remove('is-active');
        });
    }, { threshold: 0.55 });
    items.forEach(el=> observer.observe(el));

    // buttons to jump to cases
    document.querySelector('.works-stack').addEventListener('click', (e)=>{
        const caseBtn = e.target.closest('[data-case]');
        if (caseBtn){
            const sel = caseBtn.getAttribute('data-case');
            openCaseModal(sel);
            return;
        }
    });
}

// ===== Atlas filters and case modal =====
document.addEventListener('click', (e)=>{
    // Atlas filter chips
    const regionChip = e.target.closest('.chips.regions .chip');
    const tagChip = e.target.closest('.chips.methods .chip');
    if (regionChip || tagChip){
        if (regionChip){
            regionChip.parentElement.querySelectorAll('.chip').forEach(c=> c.classList.remove('active'));
            regionChip.classList.add('active');
        }
        applyAtlasFilter();
        return;
    }
    // Atlas items -> case or link
    const atlas = e.target.closest('.atlas-item');
    if (atlas){
        const caseSel = atlas.getAttribute('data-case');
        if (caseSel){ openCaseModal(caseSel); }
        else if (atlas.hasAttribute('href')) { /* normal link anchor */ }
        e.preventDefault();
    }
});

function applyAtlasFilter(){
    const activeRegionBtn = document.querySelector('.chips.regions .chip.active');
    const region = activeRegionBtn ? activeRegionBtn.getAttribute('data-filter-region') : 'all';
    const activeTag = document.querySelector('.chips.methods .chip.active');
    const tag = activeTag ? activeTag.getAttribute('data-filter-tag') : null;
    const items = document.querySelectorAll('.atlas-item');
    items.forEach(el=>{
        const r = el.getAttribute('data-region');
        const tags = (el.getAttribute('data-tags')||'').split(/\s+/);
        const regionOK = (region==='all' || region===r);
        const tagOK = (!tag || tags.includes(tag));
        el.style.display = (regionOK && tagOK) ? '' : 'none';
    });
}

// Toggle methods chip active state (single-select)
document.addEventListener('click', (e)=>{
    const m = e.target.closest('.chips.methods .chip');
    if (!m) return;
    const wrap = m.parentElement;
    if (m.classList.contains('active')) m.classList.remove('active');
    else { wrap.querySelectorAll('.chip').forEach(c=> c.classList.remove('active')); m.classList.add('active'); }
    applyAtlasFilter();
});

// Case modal
function openCaseModal(selector){
    const src = document.querySelector(selector);
    const overlay = document.getElementById('case-overlay');
    const content = document.getElementById('case-content');
    if (!src || !overlay || !content) return;
    // clone minimal safe HTML
    const clone = src.cloneNode(true);
    clone.classList.remove('case-hidden','compact');
    content.innerHTML = '';
    // optional: simplify structure
    content.appendChild(clone);
    // initialize any dynamic galleries inside the modal
    if (window.__initMediaGalleries) {
        try { window.__initMediaGalleries(); } catch(e) {}
    }
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden','false');
}

document.getElementById('case-close')?.addEventListener('click', closeCase);
document.getElementById('case-overlay')?.addEventListener('click', (e)=>{ if (e.target.id==='case-overlay') closeCase(); });
document.addEventListener('keydown', (e)=>{ if (e.key==='Escape') closeCase(); });
function closeCase(){
    const overlay = document.getElementById('case-overlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden','true');
}
