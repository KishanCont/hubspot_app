import confetti from "canvas-confetti";

export const runFireworks = () => {
  var duration = 5 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
};

export function generateSlug(text) {
  return text
    .toString()
    .normalize("NFD")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\w\-]+/g, "");
}

export function decodeSlug(slug) {
  return slug
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/([a-z0-9]+)/gi, (match, word) => {
      // Decode unicode characters (if any)
      return word.normalize("NFC");
    });
}

export function removeId(text) {
  const split = text.trim().split(" ");
  return split.slice(0, split.length - 1).join(" ");
}

export const getId = (text) => {
  const split = text.trim().split(" ");
  return split[split.length - 1];
};
