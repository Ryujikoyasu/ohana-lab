// script.js (更新版)
document.addEventListener('DOMContentLoaded', () => {

    const mainContent = document.getElementById('main-content');
    const cursor = document.querySelector('.cursor');
    const navTrigger = document.getElementById('nav-trigger');
    const navigation = document.getElementById('navigation');
    const navLinks = document.querySelectorAll('.nav-link');

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

    // エフェクトを初期化
    setTimeout(() => {
        createFloatingPetals();
        addRotatingFlowers();
        addLightParticles();
        addSwayingEffect();
    }, 1000);
});