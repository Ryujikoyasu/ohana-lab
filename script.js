// script.js (更新版)
document.addEventListener('DOMContentLoaded', () => {

    const mainContent = document.getElementById('main-content');
    const cursor = document.querySelector('.cursor');
    const navTrigger = document.getElementById('nav-trigger');
    const navigation = document.getElementById('navigation');
    const navLinks = document.querySelectorAll('.nav-link');
    const siteHeader = document.getElementById('site-header');
    const notesOverlay = document.getElementById('notes-overlay');

    // ページ読み込み時の初期化
    if(navTrigger) {
        navTrigger.style.opacity = '1';
    }

    // カスタムカーソルの追従
    window.addEventListener('mousemove', e => {
        cursor.style.top = e.clientY + 'px';
        cursor.style.left = e.clientX + 'px';
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
            // falling/particle effects disabled for a cleaner hero
            // createFloatingPetals();
            // addRotatingFlowers();
            // addLightParticles();
            // addSwayingEffect();
        }
        initMediaGalleries();
        initForestParallax(reduceMotion);
        initFieldNotes();
        initShowreel(reduceMotion);
        initHeaderOnHero();
        initWorksStack();
        initOhanaBackground(reduceMotion);
    }, 600);

    // メディアギャラリーの初期化（サムネクリックでメイン切替）
    function initMediaGalleries() {
        const galleries = document.querySelectorAll('[data-gallery]');
        galleries.forEach(gallery => {
            const mainImg = gallery.querySelector('img.gallery-main');
            let mainVideo = gallery.querySelector('video.gallery-main-video');
            const mainPlaceholder = gallery.querySelector('.gallery-main-placeholder');
            const thumbs = gallery.querySelectorAll('.gallery-thumb');

            // 最初の有効サムネをメインに適用
            let initialized = false;
            thumbs.forEach((thumb, idx) => {
                const src = thumb.getAttribute('data-src');
                const vsrc = thumb.getAttribute('data-video');
                // サムネ画像が用意されていれば img を入れる
                if (src) {
                    // プレースホルダーがあれば外す
                    const ph = thumb.querySelector('.placeholder-image');
                    if (ph) ph.remove();
                    // 既存のimgがあれば差し替え、なければ追加（重複防止）
                    let thumbImg = thumb.querySelector('img');
                    if (!thumbImg){
                        thumbImg = document.createElement('img');
                        thumbImg.alt = `ギャラリー サムネイル ${idx+1}`;
                        thumb.appendChild(thumbImg);
                    }
                    thumbImg.src = src;
                } else if (vsrc) {
                    // 動画サムネは簡易なビデオアイコン風のプレースホルダーに
                    let badge = thumb.querySelector('.placeholder-image');
                    if (!badge){
                        badge = document.createElement('div');
                        badge.className = 'placeholder-image';
                        const p = document.createElement('p'); p.textContent = '▶'; badge.appendChild(p);
                        thumb.appendChild(badge);
                    }
                }
                thumb.addEventListener('click', () => {
                    thumbs.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                    const showImage = !!src && !vsrc;
                    if (showImage && mainImg){
                        // 画像表示
                        if (mainVideo){ try { mainVideo.pause(); } catch(e){} mainVideo.style.display = 'none'; }
                        mainImg.style.opacity = '0';
                        const nextSrc = src;
                        // 画像のロード完了後にフェードイン
                        const onload = () => {
                            mainImg.style.display = 'block';
                            mainImg.style.opacity = '1';
                            mainImg.removeEventListener('load', onload);
                        };
                        mainImg.addEventListener('load', onload);
                        mainImg.src = nextSrc;
                        if (mainPlaceholder) mainPlaceholder.style.display = 'none';
                    } else if (vsrc){
                        // 動画表示
                        if (!mainVideo){
                            mainVideo = document.createElement('video');
                            mainVideo.className = 'gallery-main-video';
                            mainVideo.setAttribute('playsinline','');
                            mainVideo.setAttribute('muted','');
                            mainVideo.setAttribute('loop','');
                            mainVideo.controls = true;
                            // 挿入（mainImgの直前に）
                            if (mainImg && mainImg.parentNode){
                                mainImg.parentNode.insertBefore(mainVideo, mainImg);
                            } else {
                                gallery.querySelector('.main-media')?.appendChild(mainVideo);
                            }
                        }
                        if (mainImg){ mainImg.style.display = 'none'; }
                        if (mainPlaceholder) mainPlaceholder.style.display = 'none';
                        try { mainVideo.pause(); } catch(e){}
                        mainVideo.src = vsrc;
                        mainVideo.style.display = 'block';
                        try { mainVideo.play(); } catch(e){}
                    }
                });
                // 初期選択
                if (!initialized && (src || vsrc)) {
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
    const videos = slides.map(s=> s.querySelector('video'));
    let i = 0; let timer;
    function activate(idx){
        slides.forEach((s, n)=>{
            const isActive = (n===idx);
            s.classList.toggle('active', isActive);
            const v = videos[n];
            if (v){
                if (isActive){ v.muted = true; v.play().catch(()=>{}); }
                else { v.pause(); }
            }
        });
    }
    function next(){ i = (i+1) % slides.length; activate(i); }
    activate(0);
    if (!reduceMotion){ timer = setInterval(next, 6000); }
    document.addEventListener('visibilitychange', ()=>{
        if (document.hidden){ videos.forEach(v=> v && v.pause()); }
        else { videos[i]?.play().catch(()=>{}); }
    });
    const spots = document.querySelector('.reel-spots');
    if (spots){
        spots.addEventListener('click', (e)=>{
            const btn = e.target.closest('.spot');
            if (!btn) return;
            const target = btn.getAttribute('data-target');
            if (!target) return;
            smoothGoto(target);
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
    // Add gentle ripple under cursor
    if (!reduceMotion){
        // ripple effect disabled for a cleaner hero (no white circles)
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
            const el = entry.target;
            const v = el.querySelector('.stack-bg video');
            if (entry.isIntersecting){
                el.classList.add('is-active');
                if (v){ v.muted = true; v.play().catch(()=>{}); }
            } else {
                el.classList.remove('is-active');
                if (v){ v.pause(); }
            }
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

// Smooth goto helper
function smoothGoto(hash){
    if (!hash) return;
    const panel = document.querySelector(`.works-stack .stack-item[data-target="${hash}"]`);
    if (panel) { panel.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    const el = document.querySelector(hash);
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    const works = document.querySelector('#works');
    if (works){
        works.scrollIntoView({ behavior: 'smooth' });
        setTimeout(()=>{
            const p = document.querySelector(`.works-stack .stack-item[data-target="${hash}"]`);
            if (p) p.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 350);
    }
}

// OHANA background: petals + fireflies + soft light (有機/無機の混在)
function initOhanaBackground(reduceMotion){
    const canvas = document.getElementById('ohana-bg');
    const mountains = document.querySelector('#bg-visuals .mountains');
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext('2d');
    let dpr = Math.max(1, window.devicePixelRatio || 1);
    let W=0, H=0;
    const petals = [];
    const fireflies = [];
    const washes = [];
    let t0 = performance.now();
    let stopped = false;
    function isDark(){ return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; }
    function resize(){
        W = window.innerWidth; H = window.innerHeight;
        canvas.width = Math.floor(W * dpr);
        canvas.height = Math.floor(H * dpr);
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx.setTransform(dpr,0,0,dpr,0,0);
        petals.length = 0; fireflies.length = 0; washes.length = 0;
        // layered color washes (重ね色)
        const kasaneLight = [
            'rgba(228,161,193,0.08)', /* 桜 */
            'rgba(125,157,133,0.07)', /* 常磐 */
            'rgba(247,231,206,0.07)', /* 練色 */
            'rgba(164, 188, 206, 0.06)' /* 薄藍 */
        ];
        const pal = kasaneLight; // 明るさ重視（常にライトパレット）
        const washCount = 4; // 少なめで軽量化
        for (let i=0;i<washCount;i++){
            washes.push({
                x: (0.2 + 0.6*Math.random())*W,
                y: (0.2 + 0.6*Math.random())*H,
                r: Math.max(W,H) * (0.38 + Math.random()*0.42),
                col: pal[i % pal.length],
                dx: (Math.random()*2-1) * 0.05,
                dy: (Math.random()*2-1) * 0.05
            });
        }
        // 背景を軽く・クリーンに：花びら/ホタルは生成しない
        const petalCount = 0;
        const flyCount = 0;
    }
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', ()=>{
        if (mountains){
            const y = Math.min(20, window.scrollY*0.04);
            mountains.style.transform = `translateY(${y}px)`;
        }
    }, { passive: true });
    document.addEventListener('visibilitychange', ()=>{ stopped = document.hidden; });

    function drawPetal(p){
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        const col = isDark()? 'rgba(255,158,191,0.28)' : 'rgba(228,161,193,0.26)';
        ctx.fillStyle = col;
        ctx.beginPath();
        // rotated ellipse-like petal
        const w = p.r*1.2, h = p.r*0.7;
        for (let i=0;i<2;i++){
            ctx.ellipse(0,0,w,h, i?Math.PI/6:-Math.PI/6, 0, Math.PI*2);
        }
        ctx.fill();
        ctx.restore();
    }
    function drawFirefly(f){
        const flick = (Math.sin(f.flicker)+1)/2; // 0-1
        const alpha = 0.08 + flick*0.18;
        const r = 1.6 + flick*2.0;
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, r*4);
        grad.addColorStop(0, `rgba(255,240,210,${alpha})`);
        grad.addColorStop(1, 'rgba(255,240,210,0)');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(f.x, f.y, r*3, 0, Math.PI*2); ctx.fill();
    }
    function frame(now){
        const dt = Math.min(32, now - t0); t0 = now;
        ctx.clearRect(0,0,W,H);
        // kasane color washes (lighter blend)
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        for (const w of washes){
            w.x += w.dx; w.y += w.dy;
            if (w.x < -w.r) w.x = W+w.r; if (w.x > W+w.r) w.x = -w.r;
            if (w.y < -w.r) w.y = H+w.r; if (w.y > H+w.r) w.y = -w.r;
            const grad = ctx.createRadialGradient(w.x,w.y,0, w.x,w.y,w.r);
            grad.addColorStop(0, w.col);
            grad.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = grad;
            ctx.beginPath(); ctx.arc(w.x,w.y,w.r,0,Math.PI*2); ctx.fill();
        }
        ctx.restore();

        // petals/fireflies disabled
        if (!stopped) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

// ===== Atlas filters =====
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
    // Atlas items: allow normal navigation when href is present
    const atlas = e.target.closest('.atlas-item');
    if (atlas){
        const caseSel = atlas.getAttribute('data-case');
        if (caseSel){
            // legacy: modal opening (not used now)
            e.preventDefault();
            if (typeof openCaseModal === 'function') openCaseModal(caseSel);
        }
        // else: follow the href normally
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

// Case modal code removed (individual pages now in use)

// Atlas videos: play on hover (desktop) and pause when out of view
document.addEventListener('DOMContentLoaded', ()=>{
  const atlasVids = Array.from(document.querySelectorAll('.atlas-item video'));
  if (!atlasVids.length) return;
  const mql = window.matchMedia('(hover: hover)');
  if (mql.matches){
    atlasVids.forEach(v=>{
      const wrap = v.closest('.atlas-item');
      wrap.addEventListener('mouseenter', ()=>{ v.muted = true; v.play().catch(()=>{}); });
      wrap.addEventListener('mouseleave', ()=>{ v.pause(); v.currentTime = 0; });
    });
  }
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(({isIntersecting, target})=>{
      const vid = target;
      if (!isIntersecting){ vid.pause(); }
    });
  }, { threshold: 0.25 });
  atlasVids.forEach(v=> obs.observe(v));
});
