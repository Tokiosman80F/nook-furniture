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
