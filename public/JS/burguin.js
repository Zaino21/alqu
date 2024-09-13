document.addEventListener('DOMContentLoaded', function() {
    const openMenuButton = document.querySelector('.open-menu');
    const closeMenuButton = document.querySelector('.close-menu');
    const jogarBtn = document.querySelector('#jogar-btn2')
    const sideMenu = document.querySelector('.side-menu');
    const overlay = document.querySelector('.overlay');


    openMenuButton.addEventListener('click', function() {
        sideMenu.classList.add('open');
        overlay.classList.add('show');
        closeMenuButton.style.display = 'block'; 
    });

    jogarBtn.addEventListener('click', function() {
        sideMenu.classList.remove('open');
        overlay.classList.remove('show');
        openMenuButton.style.display = 'block'; 
        closeMenuButton.style.display = 'none'; 
    });


    function closeMenu() {
        sideMenu.classList.remove('open');
        overlay.classList.remove('show');
        openMenuButton.style.display = 'block'; 
        closeMenuButton.style.display = 'none'; 
    }

    closeMenuButton.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);


    function updateMenuButtonVisibility() {
        if (window.innerWidth >= 769) {
            openMenuButton.style.display = 'none'; 
            closeMenuButton.style.display = 'none'; 
            sideMenu.classList.remove('open');
            overlay.classList.remove('show'); 
        } else if (sideMenu.classList.contains('open')) {
            openMenuButton.style.display = 'none';
            closeMenuButton.style.display = 'block';
        } else {
            openMenuButton.style.display = 'block';
            closeMenuButton.style.display = 'none';
        }
    }


    window.addEventListener('resize', updateMenuButtonVisibility);


    updateMenuButtonVisibility();
});
