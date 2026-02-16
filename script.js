const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

if (form && note) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    note.textContent = "Dziękujemy! Twoje zapytanie zostało wysłane. Odezwiemy się w ciągu 24 godzin.";
    form.reset();
  });
}
