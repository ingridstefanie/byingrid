document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuLinks = document.querySelectorAll('.mobile-menu a');

  // Ícone "X" animado
  function toggleIcon(isOpen) {
    const spans = toggleButton.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translateY(9px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  }

  // Alternar visibilidade do menu
  function toggleMenu() {
    const isActive = mobileMenu.classList.contains('active');
    mobileMenu.classList.toggle('active');
    toggleIcon(!isActive);
  }

  // Fecha o menu ao clicar fora
  function handleClickOutside(event) {
    if (
      !mobileMenu.contains(event.target) &&
      !toggleButton.contains(event.target)
    ) {
      if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        toggleIcon(false);
      }
    }
  }

  // Fecha o menu ao clicar em um link
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      toggleIcon(false);
    });
  });

  // Adiciona os eventos
  toggleButton.addEventListener('click', toggleMenu);
  document.addEventListener('click', handleClickOutside);
});
