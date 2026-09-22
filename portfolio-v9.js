/* Ekjot Singh portfolio v8. No framework, tracking, or external runtime dependency. */
'use strict';

const projects = {
  'ai-awards': {
    image: 'assets/projects/et-ai-awards-hd-v9.png', imageAlt: 'ET AI Awards 2026 website with a gold awards emblem, headline and nomination buttons', imageSource: 'https://economictimes.indiatimes.com/et-spotlight/et-ai-awards-2026', imageCaption: 'Website screenshot', imageWidth: 1920, imageHeight: 1080,
    accent: '#6452ce', wash: '#efecfc',
    title: 'ET AI Awards 2026', category: 'UX DESIGN · RESPONSIVE WEB',
    role: 'UX Designer', context: 'The Economic Times · ET-AI',
    intro: 'A microsite and landing experience for the ET Most Innovative AI Awards 2026, an initiative recognising innovation in artificial intelligence.',
    contributions: ['Designed the microsite experience in Figma, with a clean interface aligned to The Economic Times brand.', 'Created responsive layouts with a focus on usability across screen sizes.', 'Used Auto Layout, prototyping, and Figma plugins to develop and refine the interface.'],
    tags: ['Figma', 'Auto Layout', 'Prototyping', 'Iconify', 'Stark', 'Responsive design'],
    url: 'https://economictimes.indiatimes.com/et-spotlight/et-ai-awards-2026',
    note: 'Explore the live awards website for the full experience.'
  },
  'flexichains': {
    image: 'assets/projects/flexichains-login-hd-v8.png', imageAlt: 'Flexi Chain public login page beside a photograph of an aircraft over a shipping port', imageSource: 'https://flexichains.com/login', imageCaption: 'Public login screen', imageWidth: 1920, imageHeight: 1080,
    accent: '#237385', wash: '#e8f5f8',
    title: 'Flexichains', category: 'FRONTEND · ADMIN PLATFORM',
    role: 'Frontend Developer', context: 'Freight-forwarding management',
    intro: 'A React-based admin interface for managing shipments, clients, and freight operations, with integrated document generation.',
    contributions: ['Developed dynamic, responsive admin interfaces in React for operational workflows.', 'Implemented EJS templates for accurate, print-ready invoices and logistics documents.', 'Integrated document generation with the React interface to support data flow and automate PDF creation.'],
    tags: ['React', 'JavaScript', 'EJS', 'HTML', 'CSS', 'PDF generation'],
    url: 'https://flexichains.com/login',
    note: 'The preview shows the public login page. Access to the management platform requires an account.'
  },
  'et-partners': {
    image: 'assets/projects/et-partners-hd-v8.png', imageAlt: 'ET Partners website hero with The Economic Times headline and Partner with ET button', imageSource: 'https://economictimes.indiatimes.com/et-spotlight/et-partners', imageCaption: 'Website screenshot', imageWidth: 1920, imageHeight: 1080,
    accent: '#a83972', wash: '#fceaf3',
    title: 'ET Partner With Us', category: 'UX DESIGN · LANDING EXPERIENCE',
    role: 'UX Designer', context: 'The Economic Times · ET-AI',
    intro: 'A partnership page designed to make opportunities with The Economic Times clear and easy to explore.',
    contributions: ['Designed a user-first page layout that presents partnership opportunities clearly.', 'Used Figma wireframes and component libraries to structure and develop the experience.', 'Maintained consistency with the ET-AI design system, with attention to readability and conversion.'],
    tags: ['Figma', 'Wireframing', 'Component libraries', 'Content Reel', 'Autoflow', 'Responsive design'],
    url: 'https://economictimes.indiatimes.com/et-spotlight/et-partners',
    note: 'Explore the live partnership page for the full experience.'
  },
  'bhusandeswar': {
    image: 'assets/projects/bhusandeswar-temple-hd.png', imageAlt: 'Bhusandeswar Temple website with orange navigation and a photograph of the temple exterior', imageSource: 'https://bhusandeswar.com/', imageCaption: 'Website screenshot', imageWidth: 1920, imageHeight: 1080,
    accent: '#a14f36', wash: '#f9eee4',
    title: 'Bhusandeswar Temple', category: 'FRONTEND · CONTENT MANAGEMENT',
    role: 'Frontend Developer', context: 'Temple website & Laravel admin',
    intro: 'A responsive website for Bhusandeswar Temple, supported by a Laravel-based admin panel for managing content.',
    contributions: ['Developed the complete website frontend with responsive Laravel Blade pages.', 'Built reusable UI components to maintain consistency across modules.', 'Contributed to a user-friendly admin panel for content management.'],
    tags: ['Laravel Blade', 'HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
    url: 'https://bhusandeswar.com/',
    note: 'Explore the live temple website for the full experience.'
  },
  'sdlc': {
    image: 'assets/projects/sdlc-infotech-hd-v8.png', imageAlt: 'SDLC Infotech website showing its navigation and IT services hero', imageSource: 'https://sdlc.alobhaapps.com/', imageCaption: 'Website screenshot', imageWidth: 1920, imageHeight: 1080,
    accent: '#464ad1', wash: '#ededff',
    title: 'SDLC Infotech', category: 'FRONTEND · WORDPRESS',
    role: 'Frontend Developer', context: 'Responsive business website',
    intro: 'A WordPress website with custom page templates, dynamic blog layouts, and a consistent experience across devices.',
    contributions: ['Built custom WordPress page templates and dynamic blog layouts.', 'Implemented intuitive navigation and a mobile-first responsive interface.', 'Refined cross-browser compatibility to support desktop and mobile use.'],
    tags: ['WordPress', 'Elementor', 'JavaScript', 'Bootstrap', 'Custom themes & templates'],
    url: 'https://sdlc.alobhaapps.com/',
    note: 'Explore the live SDLC Infotech website for the full experience.'
  }
};

// Motion orchestration: one switch controls all continuous movement.
const root = document.documentElement;
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const motionButton = document.querySelector('#motion-toggle');
const motion = { paused: false, reduced: motionPreference.matches, hidden: document.hidden, modal: false };
const allowsMotion = () => !motion.paused && !motion.reduced;
const activeMotion = () => allowsMotion() && !motion.hidden && !motion.modal;
document.querySelector('#year').textContent = new Date().getFullYear();
motionButton.hidden = false;

// Automatic interface audio respects browser activation and the visitor's mute choice.
const soundButton = document.querySelector('#sound-toggle');
const volumeControl = document.querySelector('#sound-volume');
const volumeValue = document.querySelector('#volume-value');
const audioStatus = document.querySelector('#audio-status');
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
// Every fresh page load starts enabled at 100%; mute remains available for this visit.
const sound = { enabled: true, volume: 100, context: null, master: null, limiter: null, voices: new Set(), revision: 0, lastCue: -Infinity, pulseTimer: 0, welcomed: false, starting: false, autoplayAttempted: false, unavailable: !AudioContextClass };
const soundNotes = {
  tap: [[440, 0, .095, .22]],
  hover: [[740, 0, .045, .065]],
  step: [[440, 0, .12, .24], [660, .055, .16, .19]],
  auto: [[392, 0, .15, .15], [523.25, .07, .20, .13]],
  drift: [[329.63, 0, .18, .075], [493.88, .08, .22, .065]],
  open: [[392, 0, .18, .23], [587.33, .07, .24, .20]],
  close: [[392, 0, .13, .20], [293.66, .06, .16, .16]],
  confirm: [[523.25, 0, .20, .24], [659.25, .07, .22, .21], [783.99, .15, .26, .20]],
  welcome: [[261.63, 0, .26, .24], [392, .08, .28, .22], [523.25, .18, .32, .24], [783.99, .28, .30, .17]]
};
function updateSoundButton() {
  const running = sound.enabled && sound.context?.state === 'running';
  soundButton.disabled = sound.unavailable; volumeControl.disabled = sound.unavailable;
  soundButton.setAttribute('aria-pressed', String(running));
  soundButton.setAttribute('aria-label', sound.unavailable ? 'Sound is unavailable in this browser' : sound.enabled ? 'Mute interface sounds' : 'Enable interface sounds');
  soundButton.querySelector('.sound-label').textContent = sound.unavailable ? 'No audio' : !sound.enabled ? 'Sound off' : running ? 'Sound on' : 'Sound ready';
  soundButton.querySelector('use').setAttribute('href', sound.enabled ? '#volume-on' : '#volume-off');
  volumeControl.value = String(sound.volume);
  volumeValue.textContent = `${sound.volume}%`;
  audioStatus.textContent = sound.unavailable ? 'Your browser does not support audio here.' : !sound.enabled ? 'Muted for this visit.' : running ? 'Interaction sounds are on.' : 'Sound starts on your first click or tap.';
}
function stopSounds() {
  clearTimeout(sound.pulseTimer);
  soundButton.classList.remove('is-sounding');
  document.querySelector('.hero').classList.remove('is-resonating');
  if (!sound.context || !sound.master) return;
  sound.master.gain.cancelScheduledValues(sound.context.currentTime);
  sound.master.gain.setValueAtTime(0, sound.context.currentTime);
  sound.voices.forEach(voice => { try { voice.stop(); } catch { /* Already ended. */ } });
  sound.voices.clear();
}
function createAudio() {
  if (sound.context || sound.unavailable) return;
  sound.context = new AudioContextClass();
  sound.master = sound.context.createGain();
  sound.master.gain.value = 0;
  sound.limiter = sound.context.createDynamicsCompressor();
  sound.limiter.threshold.value = -6;
  sound.limiter.knee.value = 6;
  sound.limiter.ratio.value = 10;
  sound.limiter.attack.value = .004;
  sound.limiter.release.value = .10;
  sound.limiter.connect(sound.master);
  sound.master.connect(sound.context.destination);
  sound.context.addEventListener('statechange', () => { updateSoundButton(); if (sound.context.state === 'running') startSound(false); });
}
function playSound(cue = 'tap') {
  if (!sound.enabled || sound.volume <= 0 || sound.context?.state !== 'running' || document.hidden) return;
  const now = sound.context.currentTime;
  if (now - sound.lastCue < .075) return;
  sound.lastCue = now;
  sound.master.gain.cancelScheduledValues(now);
  sound.master.gain.setTargetAtTime(sound.volume / 100, now, .015);
  (soundNotes[cue] || soundNotes.tap).forEach(([frequency, delay, duration, level]) => {
    const voice = sound.context.createOscillator();
    const envelope = sound.context.createGain();
    const start = now + delay + .006;
    voice.type = 'sine';
    voice.frequency.setValueAtTime(frequency, start);
    voice.frequency.exponentialRampToValueAtTime(frequency * .992, start + duration);
    envelope.gain.setValueAtTime(0, start);
    envelope.gain.linearRampToValueAtTime(level, start + .009);
    envelope.gain.exponentialRampToValueAtTime(.0001, start + duration);
    voice.connect(envelope); envelope.connect(sound.limiter);
    sound.voices.add(voice);
    voice.onended = () => { voice.disconnect(); envelope.disconnect(); sound.voices.delete(voice); };
    voice.start(start); voice.stop(start + duration + .03);
  });
  soundButton.classList.add('is-sounding');
  document.querySelector('.hero').classList.add('is-resonating');
  clearTimeout(sound.pulseTimer);
  sound.pulseTimer = setTimeout(() => { soundButton.classList.remove('is-sounding'); document.querySelector('.hero').classList.remove('is-resonating'); }, 650);
}
async function startSound(fromGesture = false) {
  if (!sound.enabled || sound.unavailable || document.hidden || sound.starting) return;
  const revision = sound.revision;
  sound.starting = true;
  try {
    createAudio();
    // Request autoplay once without waiting on a policy-blocked promise. A later
    // trusted gesture can still resume this context, and welcome plays only once.
    if (!fromGesture && !sound.autoplayAttempted) {
      sound.autoplayAttempted = true;
      if (sound.context.state !== 'running') {
        sound.context.resume().then(() => startSound(false)).catch(() => updateSoundButton());
      }
    }
    if (fromGesture && sound.context.state !== 'running') await sound.context.resume();
    if (!sound.enabled || document.hidden || revision !== sound.revision) return;
    if (sound.context.state === 'running' && !sound.welcomed) {
      sound.welcomed = true;
      playSound('welcome');
    }
  } catch {
    sound.unavailable = true;
    sound.enabled = false;
    stopSounds();
  } finally {
    sound.starting = false;
    updateSoundButton();
  }
}
document.querySelector('.audio-controls').hidden = false;
soundButton.disabled = sound.unavailable;
volumeControl.disabled = sound.unavailable;
updateSoundButton();
soundButton.addEventListener('click', () => {
  sound.revision += 1;
  sound.enabled = !sound.enabled;
  if (!sound.enabled) stopSounds();
  else {
    if (sound.volume === 0) sound.volume = 100;
    sound.welcomed = false; sound.lastCue = -Infinity;
    startSound(true);
  }
  updateSoundButton();
});
volumeControl.addEventListener('input', () => {
  sound.volume = Math.max(0, Math.min(100, Number(volumeControl.value)));
  sound.revision += 1;
  sound.enabled = sound.volume > 0;
  if (!sound.enabled) stopSounds();
  else {
    if (sound.master) sound.master.gain.setTargetAtTime(sound.volume / 100, sound.context.currentTime, .015);
    startSound(true);
  }
  updateSoundButton();
});
volumeControl.addEventListener('change', () => playSound('tap'));
function unlockFromInteraction(event) {
  if (!event.isTrusted || event.target.closest?.('.audio-controls') || !sound.enabled) return;
  if (event.type === 'keydown' && (event.repeat || !['Enter', ' '].includes(event.key))) return;
  startSound(true);
}
document.addEventListener('click', unlockFromInteraction, true);
document.addEventListener('keydown', unlockFromInteraction, true);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    sound.revision += 1; stopSounds();
    if (sound.context?.state === 'running') sound.context.suspend().catch(() => {});
  } else startSound(false);
});
// Short interaction accents: throttled hover, keyboard focus, and deliberate clicks.
let lastHoverSound = 0;
document.addEventListener('pointerover', event => {
  if (event.pointerType === 'touch' || !finePointer.matches || !event.isTrusted) return;
  const target = event.target.closest('button, a, summary');
  if (!target || target.disabled || target.contains(event.relatedTarget) || target.closest('[inert], .audio-controls')) return;
  if (performance.now() - lastHoverSound < 180) return;
  lastHoverSound = performance.now(); playSound('hover');
});
document.addEventListener('focusin', event => {
  if (event.target.matches('input:not([type="range"]), textarea')) playSound('hover');
});
document.addEventListener('click', event => {
  const target = event.target.closest('button, a, summary');
  if (!target || target.disabled || target.closest('.audio-controls')) return;
  playSound('tap');
  if (!activeMotion()) return;
  const rect = target.getBoundingClientRect();
  const x = event.detail ? event.clientX : rect.left + rect.width / 2;
  const y = event.detail ? event.clientY : rect.top + rect.height / 2;
  const ring = document.createElement('span');
  ring.className = 'interaction-ring';
  ring.style.left = `${x}px`; ring.style.top = `${y}px`;
  document.body.append(ring);
  setTimeout(() => ring.remove(), 700);
});

// Menu, active navigation and a passive scroll progress indicator.
const header = document.querySelector('.site-header');
const readingProgress = document.querySelector('.reading-progress');
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  mobileNav.hidden = true;
}
menuButton.addEventListener('click', () => {
  playSound('tap');
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  mobileNav.hidden = open;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); }
});
document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
window.matchMedia('(min-width: 641px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
let scrollFrame = 0;
function updatePageProgress() {
  header.classList.toggle('scrolled', window.scrollY > 20);
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
  readingProgress.style.transform = `scaleX(${progress})`;
  scrollFrame = 0;
}
window.addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updatePageProgress); }, { passive: true });
window.addEventListener('resize', updatePageProgress, { passive: true });
updatePageProgress();

// Reveal once. Content stays visible without JavaScript or with motion disabled.
if ('IntersectionObserver' in window) {
  const reveals = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveals.unobserve(entry.target); }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(element => reveals.observe(element));
  document.querySelectorAll('.skill-group').forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${index * 110}ms`);
    reveals.observe(element);
  });
  root.classList.add('motion-ready');
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.desktop-nav a').forEach(link => {
        const active = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('main > section[id]').forEach(section => navObserver.observe(section));
}

// A rotating visual headline; the accessible headline remains stable.
const heroWord = document.querySelector('#hero-word');
const words = ['Delight.', 'Simplify.', 'Connect.', 'Deliver.'];
let wordIndex = 0;
let wordTimer = 0;
let wordSwapTimer = 0;
let heroInView = true;
function syncHeadline() {
  clearTimeout(wordTimer);
  clearTimeout(wordSwapTimer);
  heroWord.classList.remove('is-changing');
  if (!activeMotion() || !heroInView) return;
  wordTimer = setTimeout(() => {
    heroWord.classList.add('is-changing');
    wordSwapTimer = setTimeout(() => {
      wordIndex = (wordIndex + 1) % words.length;
      heroWord.textContent = words[wordIndex];
      playSound('drift');
      heroWord.classList.remove('is-changing');
      syncHeadline();
    }, 220);
  }, 5200);
}
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
    heroInView = entries[0].isIntersecting;
    syncHeadline();
  }, { threshold: .05 }).observe(document.querySelector('#home'));
}

// Accessible skills tabs: each lens connects directly to a real project.
function setTabPanels(tabs, panels, index, animate) {
  tabs.forEach((tab, position) => {
    const selected = position === index;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    panels[position].hidden = !selected;
    panels[position].classList.remove('is-entering');
  });
  if (animate && activeMotion()) panels[index].classList.add('is-entering');
}
function tabKeyIndex(event, index, length, orientation = 'horizontal') {
  const backward = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
  const forward = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
  if (event.key === 'Home') return 0;
  if (event.key === 'End') return length - 1;
  if (event.key === backward) return (index - 1 + length) % length;
  if (event.key === forward) return (index + 1) % length;
  return null;
}
const aboutTabList = document.querySelector('.about-tabs');
const aboutTabs = [...aboutTabList.querySelectorAll('[role="tab"]')];
const aboutPanels = aboutTabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
const studioCard = document.querySelector('.studio-card');
const proofButton = document.querySelector('#about-proof');
const proofImage = document.querySelector('#about-proof-image');
let aboutIndex = 0;
function setAboutTab(index, animate = true) {
  if (!Number.isInteger(index) || index < 0 || index >= aboutTabs.length) return;
  aboutIndex = index;
  setTabPanels(aboutTabs, aboutPanels, index, animate);
  const tab = aboutTabs[index];
  const project = projects[tab.dataset.proof];
  studioCard.dataset.mode = tab.dataset.aboutTab;
  document.querySelector('.studio-index').textContent = `${String(index + 1).padStart(2,'0')} / 03`;
  proofButton.dataset.openProject = tab.dataset.proof;
  proofButton.setAttribute('aria-label', `Explore ${project.title}`);
  proofImage.src = project.image; proofImage.alt = project.imageAlt;
  proofImage.width = project.imageWidth; proofImage.height = project.imageHeight;
  document.querySelector('#about-proof-title').textContent = project.title;
  document.querySelector('#proof-type').textContent = project.category.split(' · ')[0];
  if (animate) playSound('step');
}
aboutTabs.forEach((tab, index) => tab.addEventListener('click', () => setAboutTab(index)));
aboutTabList.addEventListener('keydown', event => {
  const index = aboutTabs.indexOf(event.target);
  if (index < 0) return;
  const next = tabKeyIndex(event, index, aboutTabs.length);
  if (next === null) return;
  event.preventDefault(); setAboutTab(next); aboutTabs[next].focus();
});
aboutTabList.hidden = false;
setAboutTab(0, false);

// Four chronological chapters, with a responsive rail and native keyboard tabs.
const journeyRail = document.querySelector('.journey-rail');
const journeyTabs = [...journeyRail.querySelectorAll('[role="tab"]')];
const journeyPanels = journeyTabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
const journeyPrevious = document.querySelector('#journey-prev');
const journeyNext = document.querySelector('#journey-next');
const journeyMedia = window.matchMedia('(max-width: 800px)');
let journeyIndex = journeyTabs.length - 1;
function setJourneyChapter(index, animate = true) {
  if (!Number.isInteger(index) || index < 0 || index >= journeyTabs.length) return;
  journeyIndex = index;
  setTabPanels(journeyTabs, journeyPanels, index, animate);
  journeyRail.style.setProperty('--journey-progress', String(index / (journeyTabs.length - 1)));
  document.querySelector('#journey-position').textContent = `${String(index + 1).padStart(2,'0')} / ${String(journeyTabs.length).padStart(2,'0')}`;
  journeyPrevious.disabled = index === 0;
  journeyNext.disabled = index === journeyTabs.length - 1;
  if (animate) playSound('step');
}
journeyTabs.forEach((tab,index) => tab.addEventListener('click', () => setJourneyChapter(index)));
journeyRail.addEventListener('keydown', event => {
  const index = journeyTabs.indexOf(event.target);
  if (index < 0) return;
  const next = tabKeyIndex(event, index, journeyTabs.length, journeyMedia.matches ? 'horizontal' : 'vertical');
  if (next === null) return;
  event.preventDefault(); setJourneyChapter(next); journeyTabs[next].focus();
});
journeyPrevious.addEventListener('click', () => {
  setJourneyChapter(Math.max(0, journeyIndex - 1));
  if (journeyPrevious.disabled) journeyTabs[journeyIndex].focus();
});
journeyNext.addEventListener('click', () => {
  setJourneyChapter(Math.min(journeyTabs.length - 1, journeyIndex + 1));
  if (journeyNext.disabled) journeyTabs[journeyIndex].focus();
});
function updateJourneyOrientation() { journeyRail.setAttribute('aria-orientation', journeyMedia.matches ? 'horizontal' : 'vertical'); }
journeyMedia.addEventListener('change', updateJourneyOrientation);
updateJourneyOrientation();
journeyRail.hidden = false;
document.querySelector('.journey-navigation').hidden = false;
setJourneyChapter(journeyIndex, false);

// Pointer depth leaves the actual photograph unchanged.
const portraitArea = document.querySelector('.hero-visual');
const portraitStage = document.querySelector('.portrait-stage');
let portraitFrame = 0;
portraitArea.addEventListener('pointermove', event => {
  if (!activeMotion() || !finePointer.matches) return;
  cancelAnimationFrame(portraitFrame);
  portraitFrame = requestAnimationFrame(() => {
    const rect = portraitArea.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    portraitStage.style.setProperty('--scene-x', `${x * 8}px`);
    portraitStage.style.setProperty('--scene-y', `${y * 8}px`);
    portraitStage.style.setProperty('--person-x', `${-x * 11}px`);
    portraitStage.style.setProperty('--person-y', `${-y * 8}px`);
  });
});
function resetDepth() {
  cancelAnimationFrame(portraitFrame);
  ['--scene-x', '--scene-y', '--person-x', '--person-y'].forEach(property => portraitStage.style.removeProperty(property));
  document.querySelectorAll('.project-preview').forEach(card => {
    ['--card-rx', '--card-ry', '--glow-x', '--glow-y'].forEach(property => card.style.removeProperty(property));
  });
  document.querySelectorAll('.magnetic').forEach(button => {
    button.style.removeProperty('--mag-x'); button.style.removeProperty('--mag-y');
  });
}
portraitArea.addEventListener('pointerleave', resetDepth);
document.querySelectorAll('.project-preview').forEach(card => {
  card.addEventListener('pointermove', event => {
    if (!activeMotion() || !finePointer.matches) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty('--card-rx', `${(.5 - y) * 4}deg`);
    card.style.setProperty('--card-ry', `${(x - .5) * 5}deg`);
    card.style.setProperty('--glow-x', `${x * 100}%`);
    card.style.setProperty('--glow-y', `${y * 100}%`);
  });
  card.addEventListener('pointerleave', () => {
    card.style.removeProperty('--card-rx'); card.style.removeProperty('--card-ry');
  });
});
document.querySelectorAll('.magnetic').forEach(button => {
  button.addEventListener('pointermove', event => {
    if (!activeMotion() || !finePointer.matches) return;
    const rect = button.getBoundingClientRect();
    button.style.setProperty('--mag-x', `${((event.clientX - rect.left) / rect.width - .5) * 9}px`);
    button.style.setProperty('--mag-y', `${((event.clientY - rect.top) / rect.height - .5) * 9}px`);
  });
  button.addEventListener('pointerleave', () => { button.style.removeProperty('--mag-x'); button.style.removeProperty('--mag-y'); });
});

// A pointer-responsive light field complements the unchanged portrait.
const hero = document.querySelector('.hero');
let lightFrame = 0;
hero.addEventListener('pointermove', event => {
  if (!activeMotion() || !finePointer.matches) return;
  cancelAnimationFrame(lightFrame);
  lightFrame = requestAnimationFrame(() => {
    if (!activeMotion()) return;
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty('--light-x', `${event.clientX - rect.left}px`);
    hero.style.setProperty('--light-y', `${event.clientY - rect.top}px`);
  });
});
hero.addEventListener('pointerleave', () => {
  cancelAnimationFrame(lightFrame);
  hero.style.removeProperty('--light-x'); hero.style.removeProperty('--light-y');
});
const soundSettings = document.querySelector('.audio-settings');
document.addEventListener('click', event => { if (!event.target.closest('.audio-controls')) soundSettings.open = false; });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && soundSettings.open) { soundSettings.open = false; soundSettings.querySelector('summary').focus(); } });

// Centered native scroll-snap. Inert buffers make either direction loop without
// duplicating controls in the keyboard order or changing the page scroll position.
const workSection = document.querySelector('#work');
const track = document.querySelector('#project-track');
const originalCards = [...track.querySelectorAll('.project-card')];
originalCards.forEach(card => { card.style.setProperty('--card-accent', projects[card.dataset.project].accent); card.style.setProperty('--card-wash', projects[card.dataset.project].wash); });
const previousButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const carouselButton = document.querySelector('#carousel-toggle');
const position = document.querySelector('.carousel-position');
const sliderProgress = document.querySelector('.slider-progress > span');
const pagination = document.querySelector('.carousel-pagination');
const carousel = { view: 'carousel', paused: false, hovered: false, focused: false, focusOverride: false, visible: !('IntersectionObserver' in window), index: 0, elapsed: 0, lastTime: 0, frame: 0, scrollFrame: 0, normalizing: false };
const SLIDE_DURATION = 6000;
const BUFFER = 2;
let settleTimer = 0;
let pointerOnTrack = false;
function cloneCard(card) {
  const clone = card.cloneNode(true);
  clone.classList.remove('reveal');
  clone.dataset.clone = 'true';
  clone.setAttribute('aria-hidden', 'true');
  clone.setAttribute('inert', '');
  clone.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
  clone.querySelectorAll('button, a, [tabindex]').forEach(element => element.setAttribute('tabindex', '-1'));
  return clone;
}
track.prepend(...originalCards.slice(-BUFFER).map(cloneCard));
track.append(...originalCards.slice(0,BUFFER).map(cloneCard));
const slides = [...track.querySelectorAll('.project-card')];
const dots = originalCards.map((card, index) => {
  card.setAttribute('role', 'group');
  card.setAttribute('aria-roledescription', 'slide');
  card.setAttribute('aria-label', `${index + 1} of ${originalCards.length}: ${projects[card.dataset.project].title}`);
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'carousel-dot';
  button.setAttribute('aria-label', `View ${projects[card.dataset.project].title}`);
  button.setAttribute('aria-controls', 'project-track');
  button.addEventListener('click', () => {
    pauseCarousel();
    playSound('step');
    track.scrollTo({ left: centeredPosition(index + BUFFER), behavior: allowsMotion() ? 'smooth' : 'instant' });
  });
  pagination.append(button);
  return button;
});
carouselButton.hidden = false;
// Layout offsets stay correct when inactive cards are visually scaled, at any width.
function centeredPosition(physicalIndex) {
  const card = slides[Math.min(slides.length - 1, Math.max(0, physicalIndex))];
  return Math.max(0, card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2);
}
function nearestSlide() {
  let nearest = 0;
  let distance = Infinity;
  slides.forEach((card, index) => {
    const candidate = Math.abs(track.scrollLeft - centeredPosition(index));
    if (candidate < distance) { nearest = index; distance = candidate; }
  });
  return nearest;
}
function logicalIndex(physicalIndex) { return ((physicalIndex - BUFFER) % originalCards.length + originalCards.length) % originalCards.length; }
function canAutoplay() { return carousel.view === 'carousel' && activeMotion() && !carousel.paused && !carousel.hovered && (!carousel.focused || carousel.focusOverride) && carousel.visible; }
function updateCarousel() {
  carousel.scrollFrame = 0;
  if (carousel.view === 'grid') return;
  carousel.index = logicalIndex(nearestSlide());
  const id = originalCards[carousel.index].dataset.project;
  if (workSection.dataset.activeProject !== id) {
    workSection.dataset.activeProject = id;
    workSection.style.setProperty('--work-accent', projects[id].accent);
    workSection.style.setProperty('--work-wash', projects[id].wash);
    slides.forEach(card => card.classList.toggle('is-active', card.dataset.project === id));
    dots.forEach((dot, index) => {
      if (index === carousel.index) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }
  previousButton.disabled = false;
  nextButton.disabled = false;
  const label = String(carousel.index + 1).padStart(2,'0') + ' — ' + String(originalCards.length).padStart(2,'0');
  if (position.textContent !== label) position.textContent = label;
}
function normalizeLoop() {
  if (carousel.view === 'grid' || carousel.normalizing || pointerOnTrack) return;
  const physical = nearestSlide();
  if (physical >= BUFFER && physical < BUFFER + originalCards.length) return;
  // Wait for native scrolling to settle before teleporting an identical frame.
  if (Math.abs(track.scrollLeft - centeredPosition(physical)) > 2) return;
  carousel.normalizing = true;
  track.classList.add('is-normalizing');
  track.scrollTo({ left: centeredPosition(logicalIndex(physical) + BUFFER), behavior: 'instant' });
  requestAnimationFrame(() => {
    track.classList.remove('is-normalizing');
    carousel.normalizing = false;
    updateCarousel();
  });
}
function pauseCarousel() {
  carousel.paused = true; carousel.elapsed = 0; syncCarousel();
}
function moveCarousel(direction, manual = false) {
  if (carousel.view === 'grid') return;
  if (!manual) playSound('auto');
  if (manual) { pauseCarousel(); playSound('step'); }
  const target = Math.min(slides.length - 1, Math.max(0, nearestSlide() + direction));
  track.scrollTo({ left: centeredPosition(target), behavior: allowsMotion() ? 'smooth' : 'instant' });
}
function carouselTick(time) {
  carousel.frame = 0;
  if (!canAutoplay()) { carousel.lastTime = 0; return; }
  if (carousel.lastTime) carousel.elapsed += Math.min(time - carousel.lastTime, 100);
  carousel.lastTime = time;
  sliderProgress.style.transform = `scaleX(${Math.min(carousel.elapsed / SLIDE_DURATION, 1)})`;
  if (carousel.elapsed >= SLIDE_DURATION) { carousel.elapsed = 0; moveCarousel(1); }
  carousel.frame = requestAnimationFrame(carouselTick);
}
function syncCarousel() {
  const autoEnabled = allowsMotion() && !carousel.paused;
  carouselButton.disabled = !allowsMotion();
  carouselButton.setAttribute('aria-pressed', String(autoEnabled));
  carouselButton.setAttribute('aria-label', autoEnabled ? 'Pause project carousel' : 'Play project carousel');
  carouselButton.querySelector('span').textContent = autoEnabled ? 'Pause slideshow' : 'Play slideshow';
  carouselButton.querySelector('use').setAttribute('href', autoEnabled ? '#pause' : '#play');
  carouselButton.title = motion.reduced ? 'Motion is disabled by your device preference' : !allowsMotion() ? 'Enable motion above to play the slideshow' : '';
  position.setAttribute('aria-live', autoEnabled ? 'off' : 'polite');
  if (canAutoplay()) {
    if (!carousel.frame) { carousel.lastTime = 0; carousel.frame = requestAnimationFrame(carouselTick); }
  } else {
    cancelAnimationFrame(carousel.frame); carousel.frame = 0; carousel.lastTime = 0;
  }
  if (carousel.paused || !allowsMotion()) sliderProgress.style.transform = 'scaleX(0)';
}
carouselButton.addEventListener('click', () => { playSound('tap'); carousel.paused = !carousel.paused; carousel.focusOverride = !carousel.paused; carousel.elapsed = 0; syncCarousel(); });
previousButton.addEventListener('click', () => moveCarousel(-1,true));
nextButton.addEventListener('click', () => moveCarousel(1,true));
track.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') { carousel.hovered = true; syncCarousel(); } });
track.addEventListener('pointerleave', () => { carousel.hovered = false; syncCarousel(); });
track.addEventListener('pointerdown', () => { pointerOnTrack = true; pauseCarousel(); }, { passive: true });
function releaseTrack() { pointerOnTrack = false; normalizeLoop(); }
window.addEventListener('pointerup', releaseTrack, { passive: true });
window.addEventListener('pointercancel', releaseTrack, { passive: true });
track.addEventListener('wheel', event => { if (Math.abs(event.deltaX) > 2 || event.shiftKey) pauseCarousel(); }, { passive: true });
workSection.addEventListener('focusin', event => {
  carousel.focused = true;
  if (!carouselButton.contains(event.target)) carousel.focusOverride = false;
  const index = originalCards.indexOf(event.target.closest('.project-card'));
  if (index >= 0 && carousel.view === 'carousel') {
    pauseCarousel();
    track.scrollTo({ left: centeredPosition(index + BUFFER), behavior: allowsMotion() ? 'smooth' : 'instant' });
  }
  syncCarousel();
});
workSection.addEventListener('focusout', () => queueMicrotask(() => {
  carousel.focused = workSection.contains(document.activeElement);
  if (!carousel.focused) carousel.focusOverride = false;
  syncCarousel();
}));
track.addEventListener('keydown', event => {
  if (event.target !== track || carousel.view === 'grid') return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); moveCarousel(event.key === 'ArrowRight' ? 1 : -1,true); }
  if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault(); pauseCarousel();
    playSound('step');
    const target = BUFFER + (event.key === 'Home' ? 0 : originalCards.length - 1);
    track.scrollTo({ left: centeredPosition(target), behavior: allowsMotion() ? 'smooth' : 'instant' });
  }
});
track.addEventListener('scroll', () => {
  if (carousel.view === 'grid') return;
  if (!carousel.scrollFrame) carousel.scrollFrame = requestAnimationFrame(updateCarousel);
  clearTimeout(settleTimer);
  settleTimer = setTimeout(normalizeLoop, 160);
}, { passive: true });
track.addEventListener('scrollend', normalizeLoop);
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
    carousel.visible = entries[0].isIntersecting;
    syncCarousel();
  }, { threshold: .3 }).observe(track);
}
let lastTrackWidth = 0;
function resizeCarousel() {
  if (carousel.view === 'grid') return;
  if (track.clientWidth === lastTrackWidth) return;
  lastTrackWidth = track.clientWidth;
  track.scrollTo({ left: centeredPosition(carousel.index + BUFFER), behavior: 'instant' });
  updateCarousel();
}
if ('ResizeObserver' in window) new ResizeObserver(resizeCarousel).observe(track);
else window.addEventListener('resize', resizeCarousel, { passive: true });
track.scrollTo({ left: centeredPosition(BUFFER), behavior: 'instant' });
track.classList.add('carousel-ready');
updateCarousel();

// Gallery view reuses the five original cards; loop buffers stay inert and hidden.
const viewSwitch = document.querySelector('.view-switch');
viewSwitch.hidden = false;
function setWorkView(view) {
  if (!['carousel', 'grid'].includes(view) || carousel.view === view) return;
  carousel.view = view; carousel.elapsed = 0;
  const grid = view === 'grid';
  workSection.dataset.view = view;
  track.classList.toggle('is-grid', grid);
  track.setAttribute('aria-label', grid ? 'All selected projects' : 'Selected projects; use arrows or pause to browse');
  track.setAttribute('tabindex', grid ? '-1' : '0');
  if (grid) track.removeAttribute('aria-roledescription');
  else track.setAttribute('aria-roledescription', 'carousel');
  originalCards.forEach(card => {
    if (grid) card.removeAttribute('aria-roledescription');
    else card.setAttribute('aria-roledescription', 'slide');
  });
  document.querySelector('.carousel-controls').hidden = grid;
  document.querySelector('.carousel-status').hidden = grid;
  document.querySelector('.slider-progress').hidden = grid;
  viewSwitch.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.workView === view)));
  clearTimeout(settleTimer);
  syncCarousel();
  playSound('step');
  if (!grid) {
    lastTrackWidth = 0;
    requestAnimationFrame(resizeCarousel);
  }
}
viewSwitch.querySelectorAll('button').forEach(button => button.addEventListener('click', () => setWorkView(button.dataset.workView)));

// Supplied screenshots are bundled locally. A missing image leaves a usable
// project card; cloned carousel images use the same fallback.
document.querySelectorAll('[data-project-image]').forEach(image => {
  const fallback = image.parentElement.querySelector('.source-unavailable');
  const showFallback = () => { image.hidden = true; fallback.hidden = false; };
  image.addEventListener('error', showFallback);
  image.addEventListener('load', () => { image.hidden = false; fallback.hidden = true; });
  if (image.complete && !image.naturalWidth) showFallback();
});

// Native modal focus handling; movement behind the modal pauses automatically.
const dialog = document.querySelector('#project-dialog');
let projectTrigger;
let activeProjectId;
function openProject(id, trigger) {
  const data = projects[id];
  if (!data) return;
  playSound('open');
  const opening = !dialog.open;
  if (opening) projectTrigger = trigger;
  activeProjectId = id;
  document.querySelector('#dialog-position').textContent = `${Object.keys(projects).indexOf(id) + 1} / ${Object.keys(projects).length}`;
  for (const field of ['title','category','role','context','intro','note']) document.querySelector('#dialog-' + field).textContent = data[field];
  document.querySelector('#dialog-contributions').replaceChildren(...data.contributions.map(text => {
    const item = document.createElement('li'); item.textContent = text; return item;
  }));
  document.querySelector('#dialog-tags').replaceChildren(...data.tags.map(text => {
    const tag = document.createElement('span'); tag.textContent = text; return tag;
  }));
  const visual = document.querySelector('#dialog-visual');
  const projectImage = document.querySelector('#dialog-image');
  visual.hidden = !data.image;
  projectImage.onerror = () => { visual.hidden = true; };
  if (data.image) {
    projectImage.alt = data.imageAlt;
    projectImage.width = data.imageWidth; projectImage.height = data.imageHeight;
    projectImage.style.setProperty('--image-width', `${data.imageWidth}px`);
    projectImage.src = data.image;
    document.querySelector('#dialog-visual-caption').textContent = data.imageCaption;
    document.querySelector('#dialog-image-source').href = data.imageSource;
  } else projectImage.removeAttribute('src');
  const link = document.querySelector('#dialog-link');
  link.href = data.url;
  link.firstChild.textContent = id === 'flexichains' ? 'Visit platform ' : 'Visit project ';
  motion.modal = true; applyMotion();
  if (opening) dialog.showModal();
  dialog.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  if (opening) dialog.querySelector('.dialog-close').focus({ preventScroll: true });
}
document.querySelectorAll('[data-open-project]').forEach(trigger => {
  if (!trigger.closest('[data-clone]')) trigger.addEventListener('click', () => openProject(trigger.dataset.openProject,trigger));
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
let backdropPointer = false;
dialog.addEventListener('pointerdown', event => { backdropPointer = event.target === dialog; });
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (backdropPointer && event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  backdropPointer = false;
});
dialog.addEventListener('close', () => {
  playSound('close');
  document.body.style.overflow = '';
  motion.modal = false; applyMotion();
  projectTrigger?.focus({ preventScroll: true });
});

// Move between projects without closing the details panel.
function stepProject(direction) {
  const ids = Object.keys(projects);
  const index = ids.indexOf(activeProjectId);
  openProject(ids[(index + direction + ids.length) % ids.length], projectTrigger);
}
document.querySelector('#dialog-prev').addEventListener('click', () => stepProject(-1));
document.querySelector('#dialog-next').addEventListener('click', () => stepProject(1));
dialog.addEventListener('keydown', event => {
  if (event.target.matches('input, textarea, select')) return;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault(); stepProject(event.key === 'ArrowLeft' ? -1 : 1);
  }
});

// Original-size inspection preserves the supplied pixels and allows native scrolling.
const imageDialog = document.querySelector('#image-dialog');
const fullImage = document.querySelector('#full-image');
const imageZoom = document.querySelector('#image-zoom');
const imageViewport = document.querySelector('.image-viewport');
function setImageZoom(original) {
  imageViewport.classList.toggle('is-original', original);
  imageZoom.setAttribute('aria-pressed', String(original));
  imageZoom.textContent = original ? 'Fit to screen' : 'Original size';
  imageViewport.scrollTop = 0; imageViewport.scrollLeft = 0;
}
document.querySelector('#inspect-screenshot').addEventListener('click', () => {
  const data = projects[activeProjectId];
  if (!data?.image) return;
  fullImage.src = data.image; fullImage.alt = data.imageAlt;
  fullImage.width = data.imageWidth; fullImage.height = data.imageHeight;
  fullImage.style.setProperty('--natural-width', `${data.imageWidth}px`);
  document.querySelector('#image-title').textContent = data.title;
  document.querySelector('#image-description').textContent = data.imageWidth > 320 ? 'Explore the screenshot at its original size.' : 'Thumbnail preview. Visit the live project for more detail.';
  imageZoom.hidden = data.imageWidth <= 320;
  setImageZoom(false);
  imageDialog.showModal();
  document.querySelector('#image-close').focus({ preventScroll: true });
  playSound('open');
});
imageZoom.addEventListener('click', () => { setImageZoom(imageZoom.getAttribute('aria-pressed') !== 'true'); playSound('step'); });
document.querySelector('#image-close').addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('close', () => { playSound('close'); document.querySelector('#inspect-screenshot').focus({ preventScroll: true }); });
imageDialog.addEventListener('click', event => { if (event.target === imageDialog) imageDialog.close(); });
fullImage.addEventListener('error', () => { if (imageDialog.open) imageDialog.close(); showToast('Screenshot unavailable. You can still visit the live project.'); });

// Global motion control, reduced-motion preference and page visibility.
function applyMotion() {
  const enabled = allowsMotion();
  root.classList.toggle('motion-enabled',enabled);
  root.classList.toggle('motion-paused',!enabled);
  root.classList.toggle('motion-reduced',motion.reduced);
  root.classList.toggle('motion-suspended',motion.hidden || motion.modal);
  motionButton.disabled = motion.reduced;
  motionButton.setAttribute('aria-pressed',String(enabled));
  motionButton.setAttribute('aria-label',motion.reduced ? 'Motion disabled by your device preference' : enabled ? 'Pause all motion' : 'Enable animations');
  motionButton.querySelector('span').textContent = enabled ? 'Motion on' : 'Motion off';
  motionButton.querySelector('use').setAttribute('href',enabled ? '#pause' : '#play');
  motionButton.title = motion.reduced ? 'Motion is disabled by your device accessibility preference' : '';
  if (!activeMotion()) resetDepth();
  syncHeadline(); syncCarousel();
}
motionButton.addEventListener('click', () => { playSound('tap'); motion.paused = !motion.paused; applyMotion(); });
motionPreference.addEventListener('change', event => { motion.reduced = event.matches; applyMotion(); });
document.addEventListener('visibilitychange', () => { motion.hidden = document.hidden; applyMotion(); });
applyMotion();

// Clipboard feedback and contact interactions.
let toastTimer;
function showToast(message) {
  const toast = document.querySelector('#toast'); clearTimeout(toastTimer);
  toast.textContent = message; toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'),4200);
}
document.querySelector('#copy-email').addEventListener('click', async () => {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText('1llekjotsingh@gmail.com'); playSound('confirm'); showToast('Email address copied. Let’s connect.');
  } catch { showToast('Email: 1llekjotsingh@gmail.com'); }
});
// The hosted form saves to the portfolio; downloaded copies prepare an email draft.
function initContactForm() {
  const form = document.querySelector('#contact-form');
  const field = name => form.elements.namedItem(name);
  const status = document.querySelector('#form-status');
  const submit = document.querySelector('#contact-submit');
  const submitLabel = document.querySelector('#submit-label');
  const success = document.querySelector('#form-success');
  const emailLink = document.querySelector('#form-email-fallback');
  // const offline = location.protocol === 'file:';
  const offline = true;
  const profiles = {
    'A role on our team': { subject: 'Role / opportunity', placeholder: 'e.g. Product Designer', preference: 'Work arrangement', options: ['Remote','Hybrid','On-site','Let’s discuss'], message: 'Tell me about the opportunity', hint: 'The team, the role, and what you’d like to build together…', submit: 'Send opportunity' },
    'A project': { subject: 'Project / idea', placeholder: 'e.g. A new product website', preference: 'Ideal timeline', options: ['As soon as possible','Within a month','1–3 months','Exploring ideas'], message: 'Tell me about your project', hint: 'What are you making, who is it for, and where could I help?', submit: 'Send project enquiry' },
    'Something else': { subject: 'What’s it about?', placeholder: 'e.g. A collaboration or a question', preference: '', options: [], message: 'Your message', hint: 'A question, a collaboration, or just a hello…', submit: 'Send message' },
  };
  const details = new Map();
  const touched = new Set();
  let selected = field('interest').value;
  let busy = false;
  let pendingId = '';
  let pendingPayload = '';
  const inputNames = ['name','email','company','subject','preference','message'];

  function validation(name) {
    const element = field(name);
    const value = element.value.trim();
    if (name === 'name' && !value) return 'Please enter your name.';
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address.';
    if (name === 'message' && value.length < 10) return 'Please add a little more detail (at least 10 characters).';
    const limits = { name: 100, email: 254, company: 150, subject: 150, message: 2000 };
    if (limits[name] && value.length > limits[name]) return `Please use no more than ${limits[name].toLocaleString()} characters.`;
    return '';
  }
  function showError(name, message) {
    const element = field(name);
    const error = document.querySelector(`#${name}-error`);
    if (!element || !error) return;
    if (message) element.setAttribute('aria-invalid','true');
    else element.removeAttribute('aria-invalid');
    error.textContent = message;
    error.hidden = !message;
  }
  function readValues() {
    return { name: field('name').value.trim(), email: field('email').value.trim(), company: field('company').value.trim(), interest: selected, subject: field('subject').value.trim(), preference: field('preference').disabled ? '' : field('preference').value, message: field('message').value.trim(), website: field('website').value };
  }
  function emailDraft(values) {
    const subject = `${values.interest} — ${values.name || 'Portfolio enquiry'}${values.company ? ' / ' + values.company : ''}`;
    const detail = [values.subject, values.preference].filter(Boolean).join(' · ');
    const body = `Hi Ekjot,\n\n${detail ? detail + '\n\n' : ''}${values.message}\n\n${values.name}\n${values.company ? values.company + '\n' : ''}${values.email}`;
    return `mailto:1llekjotsingh@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  function updateProgress() {
    const complete = ['name','email','message'].filter(name => !validation(name)).length;
    document.querySelector('#form-progress').value = complete;
    document.querySelector('#completion-count').textContent = `${complete} / 3`;
    document.querySelector('#completion-label').textContent = complete === 3 ? 'Ready when you are' : 'A few details to get started';
    const count = field('message').value.length;
    document.querySelector('#message-count').textContent = `${count.toLocaleString()} / 2,000`;
    emailLink.href = emailDraft(readValues());
  }
  function setProfile(remember = true) {
    if (remember) details.set(selected, { subject: field('subject').value, preference: field('preference').value });
    selected = field('interest').value;
    const profile = profiles[selected];
    const remembered = details.get(selected);
    document.querySelector('#subject-label').textContent = profile.subject;
    field('subject').placeholder = profile.placeholder;
    field('subject').value = remembered?.subject || '';
    document.querySelector('#preference-label').textContent = profile.preference;
    field('preference').replaceChildren(new Option('Choose an option',''), ...profile.options.map(value => new Option(value,value)));
    field('preference').value = remembered?.preference || '';
    field('preference').disabled = !profile.options.length;
    document.querySelector('#preference-field').hidden = !profile.options.length;
    document.querySelector('#enquiry-details').classList.toggle('single-detail', !profile.options.length);
    document.querySelector('#message-label').textContent = profile.message;
    field('message').placeholder = profile.hint;
    submitLabel.textContent = offline ? 'Create email draft' : profile.submit;
    showError('subject',''); showError('preference','');
    updateProgress();
  }
  if (offline) document.querySelector('#form-note').textContent = 'This downloaded copy opens your email app. Send the prepared draft there to contact Ekjot.';
  form.querySelectorAll('[name="interest"]').forEach(radio => radio.addEventListener('change', () => { setProfile(); playSound('step'); }));
  inputNames.forEach(name => {
    field(name).addEventListener('blur', () => { touched.add(name); showError(name,validation(name)); });
    field(name).addEventListener('input', () => { if (touched.has(name)) showError(name,validation(name)); updateProgress(); });
    field(name).addEventListener('change', updateProgress);
  });
  function setBusy(value) {
    busy = value;
    form.setAttribute('aria-busy', String(value));
    form.querySelectorAll('input,textarea,select,button').forEach(element => { element.disabled = value; });
    if (!value) field('preference').disabled = !profiles[selected].options.length;
    submitLabel.textContent = value ? 'Sending your message…' : (offline ? 'Create email draft' : profiles[selected].submit);
    submit.querySelector('.submit-spinner').hidden = !value;
    submit.querySelector('.icon').hidden = value;
  }
  function requestId() {
    if (crypto.randomUUID) return crypto.randomUUID();
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 15) | 64; bytes[8] = (bytes[8] & 63) | 128;
    return Array.from(bytes, (byte, i) => ([4,6,8,10].includes(i) ? '-' : '') + byte.toString(16).padStart(2,'0')).join('');
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy) return;
    let firstInvalid;
    inputNames.forEach(name => { const error = validation(name); touched.add(name); showError(name,error); if (error && !firstInvalid) firstInvalid = field(name); });
    status.classList.remove('is-error');
    if (firstInvalid) { status.textContent = 'Please check the highlighted fields.'; status.classList.add('is-error'); firstInvalid.focus(); return; }
    const values = readValues();
    if (offline) {
      window.location.href = emailDraft(values);
      status.textContent = 'Email draft prepared. Send it in your email app to finish. If it didn’t open, use the email link below.';
      playSound('confirm'); return;
    }
    const fingerprint = JSON.stringify(values);
    if (!pendingId || pendingPayload !== fingerprint) { pendingId = requestId(); pendingPayload = fingerprint; }
    setBusy(true); status.textContent = 'Sending your message…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: pendingId, ...values }), signal: controller.signal, credentials: 'same-origin' });
      let result;
      try { result = await response.json(); } catch { throw new Error('We couldn’t confirm your submission. Your message is still here—please retry or use email below.'); }
      if (!response.ok || result.ok !== true || result.id !== pendingId) {
        for (const [name,message] of Object.entries(result.errors || {})) if (typeof message === 'string') showError(name,message);
        if (response.status === 409) pendingId = '';
        throw new Error(result.error || 'Your message wasn’t saved. Please try again or use email below.');
      }
      form.hidden = true;
      success.hidden = false;
      document.querySelector('#success-message').textContent = `Thanks, ${values.name}. Your ${selected === 'A role on our team' ? 'opportunity' : selected === 'A project' ? 'project enquiry' : 'message'} has been saved for Ekjot to review. You’ve left ${values.email} as your reply address.`;
      document.querySelector('#submission-reference').textContent = `Reference: ${result.id}`;
      success.focus({ preventScroll: true });
      playSound('confirm');
    } catch (error) {
      status.textContent = error.name === 'AbortError' ? 'The connection timed out before we could confirm. Your message is still here—retrying won’t duplicate it.' : (error instanceof TypeError ? 'We couldn’t connect. Please check your connection and retry, or use the email link below.' : error.message);
      status.classList.add('is-error');
      status.focus({ preventScroll: true });
    } finally { clearTimeout(timeout); setBusy(false); }
  });
  document.querySelector('#new-message').addEventListener('click', () => {
    form.reset(); details.clear(); touched.clear(); pendingId = ''; pendingPayload = '';
    inputNames.forEach(name => showError(name,''));
    status.textContent = ''; status.classList.remove('is-error');
    success.hidden = true; form.hidden = false; setProfile(false); field('name').focus();
  });
  setProfile(false);
}
initContactForm();

// Try permitted autoplay; otherwise the first trusted interaction unlocks audio.
startSound(false);
