document.addEventListener('DOMContentLoaded', function () {
    const submenuToggles = document.querySelectorAll('#sidebarMenu .submenu-toggle');

    submenuToggles.forEach(function (toggle) {
        toggle.addEventListener('click', function () {
            // 切換當前元素的 active 狀態
            this.classList.toggle('submenu-active');

            // 找到當前元素的 submenu 並切換顯示/隱藏
            const submenu = this.querySelector('.submenu');
            if (submenu) {
                if (submenu.style.display === 'none' || submenu.style.display === '') {
                    submenu.style.display = 'block';
                } else {
                    submenu.style.display = 'none';
                }
            }

            // 移除其他同級元素的 active 狀態並隱藏其 submenu
            const siblings = Array.from(this.parentNode.children).filter(child =>
                child !== this && child.classList.contains('submenu-toggle')
            );

            siblings.forEach(function (sibling) {
                sibling.classList.remove('submenu-active');
                const siblingSubmenu = sibling.querySelector('.submenu');
                if (siblingSubmenu) {
                    siblingSubmenu.style.display = 'none';
                }
            });
        });
    });

    // 側邊欄收合功能
    const toggleSlidebar = document.querySelector('#toggleSlidebar');
    const sidebar = document.querySelector('#slidebar');
    const mainContent = document.querySelector('main');
    const toggleTopNav = document.querySelector('#toggleTopNav');
    const topNav = document.querySelector('#TopNav');
    // 定義移除側邊欄與頂部導航的函式
    const sidebarRemove = () => {
        sidebar.classList.remove('close-slidebar');
        toggleSlidebar.classList.remove('close-slidebar');
        mainContent.classList.remove('close-slidebar');
    }
    // 定義移除頂部導航的函式
    const topNavRemove = () => {
        topNav.classList.remove('open');
        toggleTopNav.classList.remove('open');
    }
    // #toggleSlidebar按下
    if (toggleSlidebar && sidebar && mainContent) {
        toggleSlidebar.addEventListener('click', function () {
            sidebar.classList.toggle('close-slidebar');
            toggleSlidebar.classList.toggle('close-slidebar');
            mainContent.classList.toggle('close-slidebar');
            topNavRemove()
        });
    }
    // #toggleTopNav按下

    if (toggleTopNav) {
        toggleTopNav.addEventListener('click', function () {
            if (topNav) {
                topNav.classList.toggle('open');
                toggleTopNav.classList.toggle('open');
                sidebarRemove()

            }
        });
    }
    // //當#TopNav .siteMainMenu>li click時toggle('show')，並讓其他同級元素移除'show'
    // const topNavItems = document.querySelectorAll('#TopNav .siteMainMenu>li');
    // topNavItems.forEach(function (item) {
    //     item.addEventListener('click', function () {
    //         item.classList.toggle('show');
    //         // 移除其他同級元素的'show'類別
    //         topNavItems.forEach(function (sibling) {
    //             if (sibling !== item) {
    //                 sibling.classList.remove('show');
    //             }
    //         });
    //     });
    // });
//#TopNav .siteMainMenu>li 有子選單的點擊行為（手機優化）
    if (window.matchMedia('(hover: none)').matches) {
        const menu = document.querySelector('#TopNav .siteMainMenu');

        // 綁定所有「有子選單」的主連結
        menu.querySelectorAll(':scope > li:has(> ul) > a').forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();           // 避免 "#" 捲動
                const li = a.parentElement;
                const isOpen = li.getAttribute('data-open') === 'true';

                // 關閉其他已開啟的
                menu.querySelectorAll(':scope > li[data-open]').forEach(s => {
                    if (s !== li) s.removeAttribute('data-open');
                });

                // 切換自己（再次點同一個可關閉）
                if (isOpen) {
                    li.removeAttribute('data-open');
                    a.blur();                   // 可選：移除 focus
                } else {
                    li.setAttribute('data-open', 'true');
                    a.focus();                  // 維持可及性
                }
            });
        });

        // 點擊空白處收起
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target)) {
                menu.querySelectorAll(':scope > li[data-open]').forEach(s => s.removeAttribute('data-open'));
                document.activeElement?.blur();
            }
        });
    }
});
