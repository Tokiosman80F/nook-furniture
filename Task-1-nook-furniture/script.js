const track = document.getElementById("marqueeTrack");

track.innerHTML += track.innerHTML;

// counnter animation

const counters = document.querySelectorAll(".counter");

const animateCounter = (counter) => {
  const target = +counter.dataset.target;
  const speed = 80; // lower = faster

  const updateCount = () => {
    const current = +counter.innerText;
    const increment = Math.ceil(target / speed);

    if (current < target) {
      counter.innerText = current + increment;
      requestAnimationFrame(updateCount);
    } else {
      counter.innerText = target + "+";
    }
  };

  updateCount();
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => observer.observe(counter));

// tab
const tabs = document.querySelectorAll(".tab");
const items = document.querySelectorAll(".collection-item");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Toggle active tab
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const selectedCategory = tab.dataset.tab;

    // Filter items
    items.forEach((item) => {
      item.classList.toggle(
        "hidden",
        item.dataset.category !== selectedCategory
      );
    });
  });
});

// slider

const container = document.querySelector(".category-cards");
const cards = document.querySelectorAll(".category-card");
const leftBtn = document.querySelector('.nav-circle img[alt="Previous"]');
const rightBtn = document.querySelector('.nav-circle img[alt="Next"]');

const cardWidth = cards[0].offsetWidth + 24; // card width + gap

rightBtn.addEventListener("click", () => {
  container.scrollBy({
    left: cardWidth,
    behavior: "smooth",
  });
});

leftBtn.addEventListener("click", () => {
  container.scrollBy({
    left: -cardWidth,
    behavior: "smooth",
  });
});
