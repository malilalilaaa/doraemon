document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const primaryNav = document.getElementById("primaryNav");

  hamburgerBtn.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("nav--open");
    hamburgerBtn.classList.toggle("is-open", isOpen);
    hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("nav--open");
      hamburgerBtn.classList.remove("is-open");
      hamburgerBtn.setAttribute("aria-expanded", "false");
    });
  });

  const roles = [
    "a 22nd-century robot cat.",
    "Nobita's loyal best friend.",
    "a gadget specialist.",
    "a beginner web developer (just like you!).",
  ];

  const typedEl = document.getElementById("typedRole");
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentWord = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typedEl.textContent = currentWord.slice(0, charIndex);

    let speed = isDeleting ? 35 : 70;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 1400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeLoop, speed);
  }

  typeLoop();

  // Gadget Cards
  const gadgetCards = document.querySelectorAll(".gadget-card");

  gadgetCards.forEach((card) => {
    card.addEventListener("click", () => {
      const fact = card.dataset.fact;
      const description = card.querySelector("p");

      description.textContent = fact;
      card.classList.add("is-revealed");
    });
  });

  // Counter Animation
  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 900;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);

      el.textContent = Math.floor(progress * target);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  // Scroll Reveal
  const revealTargets = document.querySelectorAll(
    ".about, .skills, .projects, .contact"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  const statNumbers = document.querySelectorAll(".stat__num");
  let statsAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");

          if (
            entry.target.classList.contains("about") &&
            !statsAnimated
          ) {
            statsAnimated = true;
            statNumbers.forEach(animateCount);
          }
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  revealTargets.forEach((el) => observer.observe(el));

  // Contact Form
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      status.textContent =
        "Please fill out every field before sending.";
      status.className = "form-status error";
      return;
    }

    if (!emailPattern.test(email)) {
      status.textContent =
        "That email address doesn't look right.";
      status.className = "form-status error";
      return;
    }

    status.textContent = `Thanks, ${name}! Your message has been "sent" (this demo doesn't connect to a real server yet).`;
    status.className = "form-status success";

    form.reset();
  });

  // Footer Year
  document.getElementById("year").textContent =
    new Date().getFullYear();
});