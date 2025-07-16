// script.js (更新版)
document.addEventListener('DOMContentLoaded', () => {

    const intro = document.getElementById('intro');
    const mainContent = document.getElementById('main-content');
    const cursor = document.querySelector('.cursor');
    const navTrigger = document.getElementById('nav-trigger');
    const navigation = document.getElementById('navigation');
    const navLinks = document.querySelectorAll('.nav-link');

    // --- かさね色目の定義 ---
    const kasaneColors = [
        { name: "撫子", front: "#e5a6c5", back: "#9e3d3f" },
        { name: "菖蒲", front: "#f2f2f2", back: "#aacf53" }, // 白背景を少し調整
        { name: "杜若", front: "#2792c3", back: "#002c43" },
        { name: "卯の花", front: "#f2f2f2", back: "#00a3af" }, // 白背景を少し調整
        { name: "蝉の羽", front: "#c3b8a5", back: "#165e83" },
        { name: "百合", front: "#f2f2f2", back: "#9d896c" }, // 白背景を少し調整
        { name: "橘", front: "#917347", back: "#fef263" },
        { name: "若苗", front: "#c7dc68", back: "#89c379" },
        { name: "常夏", front: "#c8385a", back: "#a22042" },
        { name: "氷", front: "#f2f2f2", back: "#e6e6e6" } // 白背景を少し調整
    ];

    // グリッドアイテムに色を適用
    const gridItems = document.querySelectorAll('.grid-item');
    if (gridItems.length > 0) {
        gridItems.forEach((item, index) => {
            const colorSet = kasaneColors[index % kasaneColors.length];
            item.style.backgroundColor = colorSet.front;
            // '裏色'をボーダーやホバーエフェクトのアクセントとして使用
            item.style.border = `2px solid ${colorSet.back}`;
            
            const overlay = item.querySelector('.item-overlay');
            if(overlay) {
                // オーバーレイのテキスト色を調整
                // 背景色に合わせて白か黒かを簡易的に判定
                const bgColor = colorSet.front.replace('#', '');
                const r = parseInt(bgColor.substr(0, 2), 16);
                const g = parseInt(bgColor.substr(2, 2), 16);
                const b = parseInt(bgColor.substr(4, 2), 16);
                const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                overlay.style.color = brightness > 125 ? '#000' : '#fff';
                overlay.style.background = `linear-gradient(to top, ${colorSet.front} 80%, transparent)`;
            }
        });
    }
    
    // Journalリストアイテムに色を適用
    const journalItems = document.querySelectorAll('.journal-item');
    if (journalItems.length > 0) {
        journalItems.forEach((item, index) => {
            const colorSet = kasaneColors[index % kasaneColors.length];
            item.style.backgroundColor = colorSet.front;
            item.style.borderLeft = `5px solid ${colorSet.back}`;
            item.addEventListener('mouseenter', () => {
                item.style.borderColor = colorSet.front;
            });
            item.addEventListener('mouseleave', () => {
                item.style.borderColor = colorSet.back;
            });
        });
    }


    // サイトへのエントリー処理
    function enterSite() {
        if (intro.style.opacity === '0') return;
        intro.style.opacity = '0';
        intro.style.pointerEvents = 'none';
        
        if(mainContent) {
            document.body.style.overflow = 'auto';
            mainContent.style.opacity = '1';
        }
        if(navTrigger) {
            navTrigger.style.opacity = '1';
        }
    }

    document.body.addEventListener('click', enterSite, { once: true });
    setTimeout(enterSite, 4000);

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
    
    if(navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if(link.getAttribute('href').startsWith('#')) {
                    navigation.classList.remove('active');
                }
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
