const marquee = document.querySelector(".marquee");

// Duplicate content for infinite scroll
marquee.innerHTML += marquee.innerHTML;

let speed = 0.5; // pixels per frame
let x = 0;

function animateMarquee() {
  x -= speed;

  // reset scroll to start when fully scrolled
  if (x <= -marquee.scrollWidth / 2) {
    x = 0;
  }

  marquee.style.transform = `translateX(${x}px)`;
  requestAnimationFrame(animateMarquee);
}

animateMarquee();
