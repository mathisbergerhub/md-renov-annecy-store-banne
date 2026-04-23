const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add("is-visible"));
}

document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) {
      return;
    }

    document.querySelectorAll(".faq-item").forEach((other) => {
      if (other !== item) {
        other.open = false;
      }
    });
  });
});

const countdowns = document.querySelectorAll("[data-countdown]");

function formatCountdownValue(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown(element) {
  const target = element.getAttribute("data-countdown");

  if (!target) {
    return;
  }

  const targetDate = new Date(target);
  const now = new Date();
  const remaining = Math.max(0, targetDate.getTime() - now.getTime());

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);

  const daysNode = element.querySelector('[data-countdown-unit="days"]');
  const hoursNode = element.querySelector('[data-countdown-unit="hours"]');
  const minutesNode = element.querySelector('[data-countdown-unit="minutes"]');
  const labelNode = element.querySelector(".countdown__label");

  if (daysNode) {
    daysNode.textContent = formatCountdownValue(days);
  }

  if (hoursNode) {
    hoursNode.textContent = formatCountdownValue(hours);
  }

  if (minutesNode) {
    minutesNode.textContent = formatCountdownValue(minutes);
  }

  if (labelNode && remaining === 0) {
    labelNode.textContent = "Offre terminée";
  }
}

if (countdowns.length > 0) {
  countdowns.forEach(updateCountdown);
  window.setInterval(() => {
    countdowns.forEach(updateCountdown);
  }, 30000);
}
