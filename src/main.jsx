import React from 'react';
import { createRoot } from 'react-dom/client';
import AnimatedContent from './components/AnimatedContent.jsx';
import './reactbits.css';

// Official React Bits AnimatedContent component, mounted onto the existing storefront.
const revealTargets = [
  { selector: '.hero-copy', trigger: 'mount', distance: 34, blur: 4, tilt: 2 },
  { selector: '.hero-art', trigger: 'mount', distance: 42, blur: 5, tilt: 5, delay: 0.12 },
  { selector: '.intro-grid', distance: 38, blur: 4, stagger: 0.08 },
  { selector: '.values-strip', distance: 28, blur: 3, delay: 0.08 },
  { selector: '.products-heading', distance: 32, blur: 4 },
  { selector: '.product-card', distance: 44, blur: 5, tilt: 4, delay: 0.08 },
  { selector: '.promise-art', distance: 38, blur: 4, tilt: 4 },
  { selector: '.promise-copy', distance: 38, blur: 4, delay: 0.12 },
  { selector: '.closing .eyebrow', distance: 24, blur: 3 },
  { selector: '.closing h2', distance: 34, blur: 4, delay: 0.08 },
  { selector: '.closing .button', distance: 24, blur: 2, delay: 0.16 }
];

function mountReveal({selector, trigger='scroll', distance=32, blur=0, tilt=0, delay=0, stagger=0}) {
  document.querySelectorAll(selector).forEach((element) => {
    if (element.dataset.reactBitsMounted) return;
    element.dataset.reactBitsMounted = 'true';
    const savedMarkup = element.innerHTML;
    const mount = document.createElement('div');
    mount.className = 'rb-mount';
    element.replaceChildren(mount);
    createRoot(mount).render(
      <AnimatedContent
        className="rb-animated-inner"
        trigger={trigger}
        distance={distance}
        duration={0.95}
        ease="power3.out"
        initialOpacity={0}
        blur={blur}
        tilt={tilt}
        threshold={0.12}
        delay={delay}
        stagger={stagger}
        once
      >
        <div dangerouslySetInnerHTML={{__html: savedMarkup}} />
      </AnimatedContent>
    );
  });
}

function initSite() {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll('.product-card').forEach((card) => {
    const link = card.querySelector('.round-arrow');
    if (!link) return;
    const size = card.dataset.product || 'product';
    const message = encodeURIComponent(`Hello Pure Harvest Organics, I would like details and current pricing for the ${size} pack.`);
    link.href = 'https://wa.me/?text=' + message;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  revealTargets.forEach(mountReveal);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSite, {once:true});
} else {
  initSite();
}
