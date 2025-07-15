// === GSAP + ScrollTrigger + Locomotive Scroll Setup ===
gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("[data-scroll-container]", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0, left: 0, width: window.innerWidth, height: window.innerHeight
    };
  },
  pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

// === Loader: Typewriter + Slide Up ===
function typeWriterEffect(text, element, speed, callback) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

window.addEventListener('load', function () {
  const loader = document.getElementById("loader");
  const typeElem = document.querySelector(".typewriter-text");
  const text = "WELCOME ....";

  typeElem.textContent = "";
  typeWriterEffect(text, typeElem, 80, () => {
    gsap.to(loader, {
      y: "-100%",
      duration: 1.2,
      delay: 0.4,
      ease: "power4.inOut",
      onComplete: () => loader.style.display = "none"
    });
  });
});

// === Flicker Neon ===
gsap.to(".hero-text h1", {
  textShadow: "0 0 5px #fff, 0 0 20px #000",
  repeat: -1,
  yoyo: true,
  duration: 0.3,
  ease: "sine.inOut"
});

// === Scroll-triggered Animations ===
gsap.from(".hero-text h1", {
  y: 50, opacity: 0, duration: 1, delay: 0.3, ease: "power4.out",
  scrollTrigger: { trigger: ".hero-text h1", scroller: "[data-scroll-container]", start: "top 80%" }
});
gsap.from(".hero-text p", {
  y: 30, opacity: 0, duration: 1, delay: 0.6, ease: "power2.out",
  scrollTrigger: { trigger: ".hero-text p", scroller: "[data-scroll-container]", start: "top 80%" }
});
gsap.from(".hero-img img", {
  scale: 0.8, opacity: 0, duration: 1, delay: 0.5, ease: "back.out(1.7)",
  scrollTrigger: { trigger: ".hero-img", scroller: "[data-scroll-container]", start: "top 80%" }
});
gsap.from(".project-card", {
  opacity: 0, y: 50, duration: 0.8, stagger: 0.2, ease: "power3.out",
  scrollTrigger: { trigger: ".project-card", scroller: "[data-scroll-container]", start: "top 90%" }
});
gsap.from("header nav a", {
  opacity: 0, y: -20, stagger: 0.1, delay: 0.3, duration: 0.6, ease: "power2.out"
});
gsap.from(".about-content", {
  opacity: 0, y: 40, duration: 1.2, ease: "expo.out",
  scrollTrigger: { trigger: ".about-content", scroller: "[data-scroll-container]", start: "top 90%" }
});

// === Minicircle Follower ===
let timeout, xprev = 0, yprev = 0;
window.addEventListener("mousemove", function (e) {
  clearTimeout(timeout);
  let scrollY = locoScroll.scroll.instance.scroll.y;

  const xscale = gsap.utils.clamp(0.8, 1.2, Math.abs(e.clientX - xprev) / 20);
  const yscale = gsap.utils.clamp(0.8, 1.2, Math.abs(e.clientY - yprev) / 20);
  xprev = e.clientX; yprev = e.clientY;

  const minicircle = document.querySelector("#minicircle");
  minicircle.style.transform = `translate(${e.clientX}px, ${e.clientY + scrollY}px) scale(${xscale}, ${yscale})`;

  timeout = setTimeout(() => {
    minicircle.style.transform = `translate(${e.clientX}px, ${e.clientY + scrollY}px) scale(1, 1)`;
  }, 100);
});

// === Scroll to Project Section on Button Click ===
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(".project-card");
    if (target) locoScroll.scrollTo(target);
  });
});

// === Project View Buttons ===
document.querySelectorAll('.view-project-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const link = this.getAttribute('data-link');
    if (link) window.open(link, '_blank');
  });
});

// === PAGE TRANSITION: TV Flicker on Link Click ===
document.querySelectorAll("a[href]").forEach(link => {
  const href = link.getAttribute("href");
  if (!href || href.startsWith("#") || href === "javascript:void(0)") return;

  link.addEventListener("click", function (e) {
    e.preventDefault();
    const flicker = document.getElementById("shutdown-flicker");
    if (flicker) {
      flicker.style.display = "block";
      flicker.classList.remove("reset");
      setTimeout(() => {
        window.location.href = href;
      }, 400); // Match animation duration
    } else {
      window.location.href = href;
    }
  });
});
