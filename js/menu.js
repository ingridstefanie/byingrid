document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuLinks = document.querySelectorAll('.mobile-menu a');

  if (!toggleButton || !mobileMenu) return;

  function toggleIcon(isOpen) {
    const spans = toggleButton.querySelectorAll('span');
    if (spans.length < 3) return;

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

  function openMenu() {
  mobileMenu.classList.add('active');
  toggleButton.classList.add('open');
  toggleIcon(true);
  toggleButton.setAttribute('aria-expanded', 'true');
}

  function closeMenu() {
  mobileMenu.classList.remove('active');
  toggleButton.classList.remove('open');
  toggleIcon(false);
  toggleButton.setAttribute('aria-expanded', 'false');
}

  function toggleMenu() {
    const isActive = mobileMenu.classList.contains('active');
    if (isActive) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function isMobile() {
    return window.innerWidth < 768;
  }

  // Fecha ao clicar fora
  function handleClickOutside(event) {
    if (
      !mobileMenu.contains(event.target) &&
      !toggleButton.contains(event.target)
    ) {
      closeMenu();
    }
    toggleButton.classList.remove('open');
  }

  // Fecha ao clicar em um link
  menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenu();
  }
});


  // Comportamento no mobile: click
  toggleButton.addEventListener('click', (e) => {
    if (isMobile()) {
      e.stopPropagation();
      toggleMenu();
    }
    if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
    }
  });

  // Comportamento no desktop: hover
  toggleButton.addEventListener('mouseenter', () => {
    if (!isMobile() && toggleButton.offsetParent !== null) openMenu();
  });

  toggleButton.addEventListener('mouseleave', () => {
  if (!isMobile() && toggleButton.offsetParent !== null) {
    setTimeout(() => {
      if (!mobileMenu.matches(':hover')) closeMenu();
    }, 200);
  }
});

  mobileMenu.addEventListener('mouseleave', () => {
    if (!isMobile()) closeMenu();
  });

  document.addEventListener('click', handleClickOutside);

  // Atualiza o comportamento em resize (ex: redimensionamento de janela)
  window.addEventListener('resize', () => {
    closeMenu(); // Garante que o menu não fique aberto no modo errado
  });
});
