let flag = 0;
document.getElementById("sideButton").addEventListener("click", function () {
  if (flag == 0) {
    document.getElementById("sidebar").style.display = "none";
    flag = 1;
  } else {
    document.getElementById("sidebar").style.display = "block";
    flag = 0;
  }
});

document.getElementById("closingButton").addEventListener("click", function () {
  document.getElementById("sidebar").style.display = "none";
});

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");

  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* Handle form data */

const scriptURL =
  "https://script.google.com/macros/s/AKfycby64W2thF1oXDVDgUI9hcvhiqj0izTJ2h-XIxqKMEWXhyv-vEat1MilU__g1lwL0OXj/exec";

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop page refresh

  fetch(scriptURL, {
    method: "POST",
    body: new FormData(document.getElementById("contactForm")),
  })
    .then((response) => response.text())
    .then((result) => {
      alert("Form submitted successfully!");
    })
    .catch((error) => {
      alert("Error! " + error.message);
    });
});

const slides = document.querySelectorAll(".slide");
const buttons = document.querySelectorAll(".buttons button");
let current = 0;
let interval = null;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  buttons.forEach((btn, i) => {
    btn.classList.toggle("active-btn", i === index);
  });
  current = index;
}

function nextSlide() {
  let next = (current + 1) % slides.length;
  showSlide(next);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    showSlide(parseInt(button.getAttribute("data-index")));
    resetInterval();
  });
});

function startInterval() {
  interval = setInterval(nextSlide, 3000);
}

function resetInterval() {
  clearInterval(interval);
  startInterval();
}

// Start autoplay
startInterval();

function copyResumeSummary() {
  const summaryText =
    "I am a web developer with experience in building responsive, user-friendly websites and applications.";
  navigator.clipboard
    .writeText(summaryText)
    .then(() => {
      alert("Resume summary copied to clipboard!");
    })
    .catch((err) => {
      alert("Failed to copy text: " + err);
    });
}

function openPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

/* Our Blogger */

const track = document.querySelector(".slider-track");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const cards = document.querySelectorAll(".card");

let currentIndex = 0;

// Helper: get computed card width
function getCardWidth() {
  const card = cards[0];
  const style = window.getComputedStyle(card);
  const width = card.getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  return width + gap;
}

// Total number of moves allowed
function maxIndex() {
  if (window.innerWidth < 627) {
    return cards.length - 1;
  } else if (window.innerWidth < 1040) {
    return cards.length - 2;
  } else {
    return cards.length - 3;
  }
}

function updateSlider() {
  const offset = currentIndex * getCardWidth();
  track.style.transform = `translateX(-${offset}px)`;
}

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

nextButton.addEventListener("click", () => {
  if (currentIndex < maxIndex()) {
    currentIndex++;
    updateSlider();
  }
});

window.addEventListener("resize", updateSlider);

document.getElementById("emailForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop page refresh

  fetch(
    "https://script.google.com/macros/s/AKfycbzM1u5wvrd7t1YbB_9CQUY-gbYPgn-HC-2b_zw0IgVIW2kX7LgelNigx0-Fp08tr__HRw/exec",
    {
      method: "POST",
      body: new FormData(document.getElementById("emailForm")),
    }
  )
    .then((response) => response.text())
    .then((result) => {
      alert("Form submitted successfully!");
    })
    .catch((error) => {
      alert("Error! " + error.message);
    });
});

/* Code for Code Privacy */

// Disable right-click
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// Disable keyboard shortcuts for DevTools
document.onkeydown = function (e) {
  if (e.keyCode === 123) {
    return false;
  } // F12
  if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
    return false;
  } // Ctrl+Shift+I
  if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
    return false;
  } // Ctrl+Shift+J
  if (e.ctrlKey && e.keyCode === 85) {
    return false;
  } // Ctrl+U
  if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
    return false;
  } // Ctrl+Shift+C
};

// Prevent copy
document.addEventListener("copy", function (e) {
  e.preventDefault();
});

// Prevent text selection
document.addEventListener("selectstart", function (e) {
  e.preventDefault();
});

// Prevent drag
document.addEventListener("dragstart", function (e) {
  e.preventDefault();
});




function startSearch() {
  const searchTerm = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  if (!searchTerm) {
    alert("Please enter a search term.");
    return;
  }

  // Remove any old highlights
  document.querySelectorAll(".search-highlight").forEach((span) => {
    const text = span.textContent;
    span.replaceWith(document.createTextNode(text));
  });

  // Define the header to exclude
  const header = document.querySelector("header");

  let found = false;

  function walk(node) {
    if (node.nodeType === 3) {
      // text node
      const index = node.textContent.toLowerCase().indexOf(searchTerm);
      if (index !== -1) {
        const span = document.createElement("span");
        span.className = "search-highlight";
        span.textContent = node.textContent;
        node.parentNode.replaceChild(span, node);
        span.scrollIntoView({ behavior: "smooth", block: "center" });
        found = true;
        return;
      }
    } else if (node.nodeType === 1 && node !== header) {
      for (let child of node.childNodes) {
        if (!found) walk(child);
      }
    }
  }

  walk(document.body);

  if (!found) {
    alert("No match found on the page.");
  } else {
    closePopup();
  }
}

function openPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}



/* Function to sidebar search button */

function startSearchFromSideBar() {
  const searchTerm = document
    .getElementById("searchInputfromsidebar")
    .value.trim()
    .toLowerCase();
  if (!searchTerm) {
    alert("Please enter a search term.");
    return;
  }

  // Remove any old highlights
  document.querySelectorAll(".search-highlight").forEach((span) => {
    const text = span.textContent;
    span.replaceWith(document.createTextNode(text));
  });

  // Define the header and sidebar to exclude
  const header = document.querySelector("header");
  const sidebar = document.getElementById("sidebar");
  const popup = document.getElementById("popupfromsidebar");

  let found = false;

  function walk(node) {
    if (node.nodeType === 3) {
      // Text node
      const index = node.textContent.toLowerCase().indexOf(searchTerm);
      if (index !== -1) {
        const span = document.createElement("span");
        span.className = "search-highlight";
        span.textContent = node.textContent;
        node.parentNode.replaceChild(span, node);
        span.scrollIntoView({ behavior: "smooth", block: "center" });
        found = true;
        return;
      }
    } else if (
      node.nodeType === 1 &&
      node !== header &&
      node !== sidebar &&
      node !== popup &&
      !sidebar.contains(node) &&
      !popup.contains(node)
    ) {
      for (let child of node.childNodes) {
        if (!found) walk(child);
      }
    }
  }

  walk(document.body);

  if (!found) {
    alert("No match found on the page.");
  } else {
    closePopup();
  }
}


function openPopup() {
  document.getElementById("popupfromsidebar").style.display = "flex";
}

function closePopup() {
  document.getElementById("popupfromsidebar").style.display = "none";
}
