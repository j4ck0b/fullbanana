const packageData = {
  gold: {
    badge: "Najczęściej wybierany",
    title: "South Escape — 7 dni",
    text: "Teneryfa w wersji klasy premium: prywatny transfer, resort 5★ na południu wyspy i concierge dostępny przez cały pobyt.",
    price: "od 10 900 zł / os.",
    formValue: "South Escape"
  },
  black: {
    badge: "Najwyższy poziom VIP",
    title: "Teide Signature — 8 dni",
    text: "Północ i Teide w formule elite: prywatny kierowca, kameralne punkty widokowe i pełna opieka concierge.",
    price: "od 13 800 zł / os.",
    formValue: "Teide Signature"
  },
  white: {
    badge: "Nowość sezonu",
    title: "VIP Yacht — 6 dni",
    text: "Teneryfa od strony oceanu: prywatny rejs, beach club premium i hotel butikowy z widokiem na zachód słońca.",
    price: "od 12 600 zł / os.",
    formValue: "VIP Yacht"
  }
};

const testimonials = [
  {
    quote: "„To nie był wyjazd, to było doświadczenie luksusu. Każdy detal dopracowany perfekcyjnie.”",
    author: "— Karolina, Teide Signature"
  },
  {
    quote: "„Rezerwacja przebiegła błyskawicznie, a na miejscu czuliśmy się zaopiekowani jak goście prywatnego klubu.”",
    author: "— Tomasz i Ewa, South Escape"
  },
  {
    quote: "„Najlepsze połączenie klasy, komfortu i emocji. Już planujemy kolejny termin.”",
    author: "— Michał, VIP Yacht"
  }
];

const packageCard = {
  badge: document.getElementById("packageBadge"),
  title: document.getElementById("packageTitle"),
  text: document.getElementById("packageText"),
  price: document.getElementById("packagePrice")
};

const tabs = document.querySelectorAll(".tab");
const packageInput = document.getElementById("packageInput");

const quoteBox = document.getElementById("quoteBox");
const quoteButtons = document.querySelectorAll(".quote-btn");

const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

const urgencyCounter = document.getElementById("urgencyCounter");


const tripFilters = document.querySelectorAll(".trip-filter");
const tripCards = document.querySelectorAll(".trip-card");
const tripBookButtons = document.querySelectorAll(".trip-book");

function filterTrips(region) {
  tripCards.forEach((card) => {
    const show = region === "all" || card.dataset.region === region;
    card.classList.toggle("is-hidden", !show);
  });

  tripFilters.forEach((button) => {
    const active = button.dataset.region === region;
    button.classList.toggle("is-active", active);
  });
}

tripFilters.forEach((button) => {
  button.addEventListener("click", () => filterTrips(button.dataset.region));
});

tripBookButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (packageInput) {
      const tripName = button.dataset.trip;
      const exists = Array.from(packageInput.options).some((opt) => opt.value === tripName);
      if (!exists) {
        const option = document.createElement("option");
        option.value = tripName;
        option.textContent = tripName;
        packageInput.appendChild(option);
      }
      packageInput.value = tripName;
    }
    const contact = document.getElementById("kontakt");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});


function setPackage(name) {
  const data = packageData[name];
  if (!data) return;

  packageCard.badge.textContent = data.badge;
  packageCard.title.textContent = data.title;
  packageCard.text.textContent = data.text;
  packageCard.price.textContent = data.price;

  if (packageInput) {
    packageInput.value = data.formValue;
  }

  tabs.forEach((tab) => {
    const active = tab.dataset.package === name;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", active ? "true" : "false");
  });
}

function setQuote(index) {
  const item = testimonials[index];
  if (!item || !quoteBox) return;
  quoteBox.innerHTML = `${item.quote}<cite>${item.author}</cite>`;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setPackage(tab.dataset.package);
  });
});

quoteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setQuote(Number(button.dataset.quote));
  });
});

if (form && note) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedPackage = packageInput?.value || "wybrany pakiet";
    note.textContent = `Dziękujemy! Rezerwacja VIP dla pakietu „${selectedPackage}” została przyjęta. Skontaktujemy się w ciągu 24h.`;
    form.reset();
  });
}

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

let seats = 5;
if (urgencyCounter) {
  setInterval(() => {
    if (seats > 2) {
      seats -= 1;
      urgencyCounter.innerHTML = `<strong>Zostało ${seats} miejsc</strong> na najbliższy termin „South Escape”.`;
    }
  }, 9000);
}
