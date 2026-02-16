const packageData = {
  gold: {
    badge: "Najczęściej wybierany",
    title: "Gold Escape — 7 dni",
    text: "Idealny balans między relaksem i prestiżem: prywatny transfer, wyselekcjonowany hotel, 2 kolacje degustacyjne i concierge dostępny przez cały pobyt.",
    price: "od 12 900 zł / os.",
    formValue: "Gold Escape"
  },
  black: {
    badge: "Najwyższy poziom VIP",
    title: "Black Signature — 10 dni",
    text: "Ekskluzywna trasa dla wymagających: apartamenty premium, prywatny kierowca, indywidualny plan atrakcji oraz pełna opieka concierge.",
    price: "od 21 500 zł / os.",
    formValue: "Black Signature"
  },
  white: {
    badge: "Nowość sezonu",
    title: "White Horizon — 6 dni",
    text: "Kameralny wyjazd nastawiony na lekkość i regenerację: luksusowy resort, wellness premium i aktywności slow travel.",
    price: "od 11 400 zł / os.",
    formValue: "White Horizon"
  }
};

const testimonials = [
  {
    quote: "„To nie był wyjazd, to było doświadczenie luksusu. Każdy detal dopracowany perfekcyjnie.”",
    author: "— Karolina, Black Signature"
  },
  {
    quote: "„Rezerwacja przebiegła błyskawicznie, a na miejscu czuliśmy się zaopiekowani jak goście prywatnego klubu.”",
    author: "— Tomasz i Ewa, Gold Escape"
  },
  {
    quote: "„Najlepsze połączenie klasy, komfortu i emocji. Już planujemy kolejny termin.”",
    author: "— Michał, White Horizon"
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
      urgencyCounter.innerHTML = `<strong>Zostało ${seats} miejsc</strong> na najbliższy termin „Gold Escape”.`;
    }
  }, 9000);
}
