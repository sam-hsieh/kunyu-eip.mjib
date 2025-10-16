/**
 * EIP 企業資訊入口網站 - 主要 JavaScript 檔案
 */

// 全域變數
let sidebarBackdrop = null;

// 當 DOM 載入完成後執行
document.addEventListener('DOMContentLoaded', function() {
    
    // 初始化主導航切換功能
    initMainNavToggle();
    
    // 設置初始狀態
    setInitialNavState();
    
    // 初始化工具提示 (Tooltips)
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // 初始化彈出框 (Popovers)
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // 主導航點擊事件
    const mainNavLinks = document.querySelectorAll('.navbar-nav .nav-link[data-nav]');
    mainNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // 移除所有 active 類別
            mainNavLinks.forEach(l => l.classList.remove('active'));
            // 添加 active 類別到點擊的項目
            this.classList.add('active');
            
            const navType = this.getAttribute('data-nav');
            console.log('切換主導航:', navType);
            
            // 這裡可以添加路由邏輯或內容切換
            handleMainNavigation(navType);
        });
    });

    // 側邊欄導航點擊事件
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-link[data-sidebar]');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // 移除所有 active 類別
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // 添加 active 類別到點擊的項目
            this.classList.add('active');
            
            const sidebarType = this.getAttribute('data-sidebar');
            console.log('切換側邊欄:', sidebarType);
            
            // 在行動裝置上點擊後關閉側邊欄
            if (window.innerWidth < 768) {
                closeSidebar();
            }
        });
    });

    // 統計卡片點擊動畫
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // 文件項目點擊事件
    const documentItems = document.querySelectorAll('.document-item');
    documentItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('點擊文件:', this.querySelector('.document-title').textContent);
        });
    });

    // 新聞項目點擊追蹤
    const newsLinks = document.querySelectorAll('.news-title');
    newsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('點擊新聞:', this.textContent);
        });
    });

    // 快速連結點擊事件
    const quickLinks = document.querySelectorAll('.quick-link-item');
    quickLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('點擊快速連結:', this.querySelector('small').textContent);
        });
    });

    // 建立側邊欄背景遮罩
    createSidebarBackdrop();
    
    // 載入完成通知
    console.log('EIP 系統已載入完成');
});

// 側邊欄切換功能
function toggleSidebar() {
    const sidebar = document.getElementById('sidebarMenu');
    const isVisible = sidebar.classList.contains('show');
    
    if (isVisible) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

// 開啟側邊欄
function openSidebar() {
    const sidebar = document.getElementById('sidebarMenu');
    sidebar.classList.add('show');
    
    if (window.innerWidth < 768 && sidebarBackdrop) {
        sidebarBackdrop.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// 關閉側邊欄
function closeSidebar() {
    const sidebar = document.getElementById('sidebarMenu');
    sidebar.classList.remove('show');
    
    if (sidebarBackdrop) {
        sidebarBackdrop.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// 建立側邊欄背景遮罩
function createSidebarBackdrop() {
    if (window.innerWidth < 768) {
        sidebarBackdrop = document.createElement('div');
        sidebarBackdrop.className = 'sidebar-backdrop';
        sidebarBackdrop.addEventListener('click', closeSidebar);
        document.body.appendChild(sidebarBackdrop);
    }
}

// 處理主導航切換
function handleMainNavigation(navType) {
    // 根據導航類型更新內容
    switch(navType) {
        case 'home':
            updatePageContent('首頁', '歡迎使用企業資訊入口網站系統');
            break;
        case 'email':
            updatePageContent('電子郵件', '電子郵件系統管理');
            break;
        case 'contacts':
            updatePageContent('通訊錄', '聯絡人管理系統');
            break;
        case 'cloud':
            updatePageContent('雲端硬碟', '檔案儲存與分享');
            break;
        case 'usage':
            updatePageContent('使用狀況', '系統使用統計分析');
            break;
        case 'student':
            updatePageContent('學員管理', '學員資料管理系統');
            break;
        default:
            console.log('未知的導航類型:', navType);
    }
}

// 更新頁面內容
function updatePageContent(title, description) {
    const pageTitle = document.querySelector('.main-content h2');
    const pageDescription = document.querySelector('.main-content p');
    
    if (pageTitle) pageTitle.textContent = title;
    if (pageDescription) pageDescription.textContent = description;
    
    // 更新麵包屑
    const breadcrumbActive = document.querySelector('.breadcrumb-item.active');
    if (breadcrumbActive) breadcrumbActive.textContent = title;
}

// 響應式處理
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebarMenu');
    const navToggler = document.querySelector('.brand-header .navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNav');
    
    if (window.innerWidth >= 768) {
        // 桌面模式：移除行動裝置的 show 類別
        sidebar.classList.remove('show');
        if (sidebarBackdrop) {
            sidebarBackdrop.classList.remove('show');
            document.body.style.overflow = '';
        }
    } else {
        // 行動裝置模式：確保有背景遮罩
        if (!sidebarBackdrop) {
            createSidebarBackdrop();
        }
    }
    
    // 處理主導航的響應式行為
    if (window.innerWidth >= 992) {
        // 大螢幕：確保導航可見，重置切換按鈕狀態
        if (navbarCollapse) {
            navbarCollapse.classList.add('show');
        }
        if (navToggler) {
            navToggler.setAttribute('aria-expanded', 'false');
            navToggler.classList.add('collapsed');
        }
        console.log('切換到大螢幕模式 - 顯示導航');
    } else {
        // 小螢幕：重置導航狀態為隱藏
        if (navbarCollapse) {
            navbarCollapse.classList.remove('show');
        }
        if (navToggler) {
            navToggler.setAttribute('aria-expanded', 'false');
            navToggler.classList.add('collapsed');
        }
        console.log('切換到小螢幕模式 - 隱藏導航');
    }
});

// ESC 鍵關閉側邊欄
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSidebar();
    }
});

// 通知功能
function showNotification(message, type = 'info') {
    console.log(`通知 (${type}): ${message}`);
}

// 搜尋功能
function initSearch() {
    console.log('搜尋功能已初始化');
}

// 設置初始導航狀態
function setInitialNavState() {
    const navToggler = document.querySelector('.brand-header .navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNav');
    
    if (navToggler && navbarCollapse) {
        if (window.innerWidth >= 992) {
            // 大螢幕：顯示導航
            navbarCollapse.classList.add('show');
            navToggler.setAttribute('aria-expanded', 'false');
            navToggler.classList.add('collapsed');
        } else {
            // 小螢幕：隱藏導航
            navbarCollapse.classList.remove('show');
            navToggler.setAttribute('aria-expanded', 'false');
            navToggler.classList.add('collapsed');
        }
        console.log('初始導航狀態設置完成:', window.innerWidth >= 992 ? '大螢幕模式' : '小螢幕模式');
    }
}

// 初始化主導航切換功能
function initMainNavToggle() {
    const navToggler = document.querySelector('.brand-header .navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNav');
    
    if (navToggler && navbarCollapse) {
        navToggler.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 使用 .show 類別來判斷當前狀態
            const isCurrentlyShown = navbarCollapse.classList.contains('show');
            
            console.log('當前狀態:', isCurrentlyShown ? '已展開' : '已收合');
            
            if (isCurrentlyShown) {
                // 關閉導航
                navbarCollapse.classList.remove('show');
                this.setAttribute('aria-expanded', 'false');
                this.classList.add('collapsed');
                console.log('→ 關閉導航');
            } else {
                // 打開導航
                navbarCollapse.classList.add('show');
                this.setAttribute('aria-expanded', 'true');
                this.classList.remove('collapsed');
                console.log('→ 打開導航');
            }
        });
        
        // 點擊導航項目後在行動裝置上自動關閉
        const navLinks = document.querySelectorAll('.navbar-main .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    navbarCollapse.classList.remove('show');
                    navToggler.setAttribute('aria-expanded', 'false');
                    navToggler.classList.add('collapsed');
                    console.log('點擊導航項目 → 關閉導航');
                }
            });
        });
    }
}