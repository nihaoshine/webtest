
const carouselData = [
    {
        image: 'https://source.unsplash.com/1920x1080/?movie',
        title: '猎罪图鉴 2',
        description: '《玫瑰的惋惜》豪门小妖vs约系玫瑰花 复仇开局',
        isVip: true
    },
    {
        image: 'https://picsum.photos/1920/1080?random=2',
        title: '东风奕派',
        description: '我是刑警',
        isVip: false
    },
    {
        image: 'https://picsum.photos/1920/1080?random=3',
        title: '我是刑警',
        description: '正义永不缺席',
        isVip: false
    },
    {
        image: 'https://picsum.photos/1920/1080?random=4',
        title: '帝王霸业',
        description: '权力的游戏',
        isVip: true
    },
    {
        image: 'https://picsum.photos/1920/1080?random=5',
        title: '志愿军：存亡之战',
        description: '致敬英雄',
        isVip: true
    },
];

const videoData = [
    {
        image: 'https://picsum.photos/300/169?random=1',
        title: '汪汪队立大功 第8季',
        episodes: '26集全',
        description: '狗狗救援队的精彩故事',
        isVip: false
    },
    {
        image: 'https://picsum.photos/300/169?random=2',
        title: '山海经奇 第二季',
        episodes: '8集全',
        description: '奇兽、奇人、奇事',
        isVip: true
    },
    {
        image: 'https://picsum.photos/300/169?random=3',
        title: '东方甄选',
        episodes: '12集全',
        description: '直播带货新时代',
        isVip: false
    },
    {
        image: 'https://picsum.photos/300/169?random=4',
        title: '我是刑警',
        episodes: '40集全',
        description: '正义永不缺席',
        isVip: true
    },
    {
        image: 'https://picsum.photos/300/169?random=5',
        title: '帝王霸业',
        episodes: '50集全',
        description: '权力的游戏',
        isVip: true
    },
];
// 添加用户数据存储
const users = [
    {
        username: 'admin',
        password: '123456',
        nickname: '管理员',
        points: 100
    },
    {
        username: 'test',
        password: 'test123',
        nickname: '测试用户',
        points: 50
    },
];

// 当前用户状态
let currentUser = null;

// 初始化函数
function init() {
    initCarousel();
    initVideoGrid();
    initLoginModal();
    initVolumeControl();
}

// 初始化轮播图
function initCarousel() {
    const container = document.querySelector('.carousel-container');
    const indicators = document.querySelector('.carousel-indicators');
    let currentIndex = 0;
    
    // 清空容器
    container.innerHTML = '';
    indicators.innerHTML = '';
    
    carouselData.forEach((item, index) => {
        // 创建轮播项
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        carouselItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}"
                onerror="this.src='https://picsum.photos/1920/1080?random=${index + 1}'">
            <div class="video-info-overlay">
                <h2 class="video-title">${item.title}</h2>
                <p class="video-desc">${item.description}</p>
                <div class="video-controls">
                    <button class="play-btn">
                        <i class="fas fa-play"></i>
                        立即播放
                    </button>
                    <button class="volume-btn">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                ${item.isVip ? '<span class="vip-badge">VIP</span>' : ''}
            </div>
        `;
        container.appendChild(carouselItem);

        // 创建指示器
        const indicator = document.createElement('span');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(currentIndex);
        });
        indicators.appendChild(indicator);
    });

    // 自动轮播
    let autoPlayTimer = setInterval(() => {
        currentIndex = (currentIndex + 1) % carouselData.length;
        updateCarousel(currentIndex);
    }, 6000);

    // 鼠标悬停暂停
    container.addEventListener('mouseenter', () => {
        clearInterval(autoPlayTimer);
    });

    // 鼠标离开继续
    container.addEventListener('mouseleave', () => {
        autoPlayTimer = setInterval(() => {
            currentIndex = (currentIndex + 1) % carouselData.length;
            updateCarousel(currentIndex);
        }, 6000);
    });

    // 添加按钮事件
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
        updateCarousel(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % carouselData.length;
        updateCarousel(currentIndex);
    });
}

// 更新轮播图显示
function updateCarousel(index) {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    
    items.forEach(item => {
        item.classList.remove('active');
        item.style.display = 'none';
    });
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    items[index].classList.add('active');
    items[index].style.display = 'block';
    indicators[index].classList.add('active');

    const nextIndex = (index + 1) % items.length;
    const nextImage = items[nextIndex].querySelector('img');
    if (nextImage) {
        const preloadImage = new Image();
        preloadImage.src = nextImage.src;
    }
}

// 初始化视频网格
function initVideoGrid() {
    const grid = document.querySelector('.video-grid');
    
    videoData.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <img src="${video.image}" alt="${video.title}">
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <div class="video-meta">${video.episodes}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 更新登录模态框初始化函数
function initLoginModal() {
    const modal = document.getElementById('loginModal');
    const loginBtn = document.querySelector('.login-btn');
    const closeBtn = document.querySelector('.close');
    const loginForm = document.getElementById('loginForm');
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    loginForm.insertBefore(errorMsg, loginForm.firstChild);

    // 检查是否已登录
    checkLoginStatus();

    loginBtn.addEventListener('click', () => {
        if (currentUser) {
            // 如果已登录，显示用户菜单
            showUserMenu();
        } else {
            modal.style.display = 'block';
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        errorMsg.textContent = '';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            errorMsg.textContent = '';
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = loginForm.querySelector('input[type="text"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            updateUIAfterLogin();
            modal.style.display = 'none';
            loginForm.reset();
            errorMsg.textContent = '';
        } else {
            errorMsg.textContent = '用户名或密码错误';
            errorMsg.style.color = 'red';
        }
    });
}

// 检查登录状态
function checkLoginStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIAfterLogin();
    }
}

// 更新登录后的UI
function updateUIAfterLogin() {
    const loginBtn = document.querySelector('.login-btn');
    const headerRight = document.querySelector('.header-right');
    
    // 更新登录按钮
    loginBtn.textContent = currentUser.nickname;
    loginBtn.classList.add('logged-in');

    // 更新积分显示
    const pointsDisplay = document.querySelector('.points');
    if (pointsDisplay) {
        pointsDisplay.textContent = `${currentUser.points}°`;
    }
}

// 显示用户菜单
function showUserMenu() {
    const userMenu = document.createElement('div');
    userMenu.className = 'user-menu';
    userMenu.innerHTML = `
        <div class="user-info">
            <div class="nickname">${currentUser.nickname}</div>
            <div class="points">${currentUser.points}°</div>
        </div>
        <div class="menu-items">
            <a href="#" class="menu-item">个人中心</a>
            <a href="#" class="menu-item">我的收藏</a>
            <a href="#" class="menu-item">观看历史</a>
            <a href="#" class="menu-item logout">退出登录</a>
        </div>
    `;

    document.body.appendChild(userMenu);

    // 添加退出登录功能
    userMenu.querySelector('.logout').addEventListener('click', (e) => {
        e.preventDefault();
        logout();
        userMenu.remove();
    });

    // 点击其他地方关闭菜单
    function closeMenu(e) {
        if (!userMenu.contains(e.target) && !document.querySelector('.login-btn').contains(e.target)) {
            userMenu.remove();
            document.removeEventListener('click', closeMenu);
        }
    }

    setTimeout(() => {
        document.addEventListener('click', closeMenu);
    }, 0);
}

// 退出登录
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.textContent = '登录';
    loginBtn.classList.remove('logged-in');
}

// 添加音量控制功能
function initVolumeControl() {
    const volumeBtn = document.querySelector('.volume-btn');
    let isMuted = false;

    volumeBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        volumeBtn.innerHTML = isMuted ? 
            '<i class="fas fa-volume-mute"></i>' : 
            '<i class="fas fa-volume-up"></i>';
        // 实际音量控制逻辑
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);


