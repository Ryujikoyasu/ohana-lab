// script.js (更新版)
document.addEventListener('DOMContentLoaded', () => {

    const intro = document.getElementById('intro');
    const mainContent = document.getElementById('main-content');
    const cursor = document.querySelector('.cursor');
    const navTrigger = document.getElementById('nav-trigger');
    const navigation = document.getElementById('navigation');
    const navLinks = document.querySelectorAll('.nav-link');

    // サイトへのエントリー処理
    function enterSite() {
        if (intro.style.opacity === '0') return; // 既に実行済みの場合は何もしない
        intro.style.opacity = '0';
        intro.style.pointerEvents = 'none';
        
        // メインコンテンツがあるページのみ適用
        if(mainContent) {
            document.body.style.overflow = 'auto';
            mainContent.style.opacity = '1';
        }
        if(navTrigger) {
            navTrigger.style.opacity = '1';
        }
    }

    // イントロ画面をクリックまたは3秒経過でエントリー
    document.body.addEventListener('click', enterSite, { once: true });
    setTimeout(enterSite, 4000); // 4秒後に強制エントリー

    // カスタムカーソルの追従
    window.addEventListener('mousemove', e => {
        cursor.style.top = e.clientY + 'px';
        cursor.style.left = e.clientX + 'px';
    });

    // ホバーエフェクト
    document.querySelectorAll('a, button, .grid-item, #nav-trigger, input, audio').forEach(el => {
        el.addEventListener('mouseover', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'rgba(136, 201, 179, 0.3)'; // 薄浅葱に合わせる
        });
        el.addEventListener('mouseout', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
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
        const petalsContainer = document.createElement('div');
        petalsContainer.className = 'floating-petals';
        document.body.appendChild(petalsContainer);

        function createPetal() {
            const petal = document.createElement('div');
            petal.className = 'petal';
            
            // ランダムな位置とアニメーション遅延を設定
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDelay = Math.random() * 8 + 's';
            petal.style.animationDuration = (8 + Math.random() * 8) + 's';
            
            // ランダムなサイズ
            const size = 6 + Math.random() * 6;
            petal.style.width = size + 'px';
            petal.style.height = size + 'px';
            
            petalsContainer.appendChild(petal);
            
            // アニメーション完了後に削除
            setTimeout(() => {
                if (petal.parentNode) {
                    petal.parentNode.removeChild(petal);
                }
            }, 16000);
        }

        // 定期的に花びらを生成
        setInterval(createPetal, 800);
        
        // 初期花びらを生成
        for (let i = 0; i < 5; i++) {
            setTimeout(createPetal, i * 1000);
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

    // エフェクトを初期化（サイト表示後）
    setTimeout(() => {
        createFloatingPetals();
        addRotatingFlowers();
        addLightParticles();
        addSwayingEffect();
    }, 5000);
});