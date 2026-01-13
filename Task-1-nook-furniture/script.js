const logo = document.querySelector(".product__logo");
const badge = document.querySelector(".explore-now-badge");

let rotation = 0;

function animate() {
  rotation += 0.5; // Speed: higher number = faster

  // 1. Logo: Needs the translate(-50%, -50%) to stay centered
  if (logo) {
    logo.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
  }

  // 2. Badge: Just needs the rotation (it is positioned by top/right)
  if (badge) {
    badge.style.transform = `rotate(${rotation}deg)`;
  }

  requestAnimationFrame(animate);
}

// Start the loop
animate();

const container = document.querySelector(".category__container");
const prevBtn = document.querySelector(".category__scroll-button:first-child");
const nextBtn = document.querySelector(".category__scroll-button:last-child");

nextBtn.addEventListener("click", () => {
  // 1. Get the first card
  const firstCard = container.querySelector(".category__card");

  // 2. Smoothly scroll to the second card
  container.scrollTo({
    left: firstCard.offsetWidth + 24, // Card width + gap
    behavior: "smooth",
  });

  // 3. After the animation finish, move the first card to the end
  // and reset the scroll position instantly
  setTimeout(() => {
    container.appendChild(firstCard);
    container.scrollTo({ left: 0, behavior: "auto" });
  }, 400); // This timeout should match your CSS transition speed
});

prevBtn.addEventListener("click", () => {
  // 1. Get all cards and the last one
  const cards = container.querySelectorAll(".category__card");
  const lastCard = cards[cards.length - 1];

  // 2. Move last card to the front instantly
  container.prepend(lastCard);

  // 3. Temporarily offset the scroll so it doesn't "jump"
  container.scrollTo({ left: lastCard.offsetWidth + 24, behavior: "auto" });

  // 4. Smoothly scroll back to the new "first" card
  container.scrollTo({
    left: 0,
    behavior: "smooth",
  });
});

/*--------Marquee--------*/
const track = document.getElementById("marqueeTrack");

// 1. Clone the content to create the infinite loop effect
const trackContent = track.innerHTML;
track.innerHTML = trackContent + trackContent;

// 2. Set the speed (Duration in seconds)
// Higher number = Slower speed
const speed = 20;

// 3. Apply the animation via JS to ensure it stays dynamic
track.style.animation = `scroll ${speed}s linear infinite`;

// popular tab
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const products = document.querySelectorAll(".product-card");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // 1. Remove active class from all tabs and add to clicked tab
      tabs.forEach((t) => t.classList.remove("tab--active"));
      tab.classList.add("tab--active");

      const filter = tab.getAttribute("data-category");

      // 2. Filter Products
      products.forEach((product) => {
        // If "all" is needed, you could add a logic for it,
        // otherwise it matches the specific category
        if (product.getAttribute("data-category") === filter) {
          product.style.display = "flex";
          // Small timeout to trigger a fade-in animation
          setTimeout(() => {
            product.style.opacity = "1";
          }, 10);
        } else {
          product.style.opacity = "0";
          product.style.display = "none";
        }
      });
    });
  });
});

// counter

const counterBox = document.querySelector(".futura__counter-box");
const counters = document.querySelectorAll(".futura__counter-number");
const counterSpeed = 200; // Lower is faster

const startCounters = () => {
  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText.replace("+", ""); // Remove + for math

      // Calculate the increment
      const inc = target / counterSpeed;

      if (count < target) {
        // Round up and update the text
        counter.innerText = Math.ceil(count + inc) + "+";
        // Call function every 1ms for smoothness
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target + "+";
      }
    };
    updateCount();
  });
};

// Intersection Observer to trigger when visible
const observerOptions = {
  threshold: 0.5, // Trigger when 50% of the box is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      startCounters();
      observer.unobserve(entry.target); // Stop observing once animated
    }
  });
}, observerOptions);

observer.observe(counterBox);
