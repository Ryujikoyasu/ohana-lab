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
});