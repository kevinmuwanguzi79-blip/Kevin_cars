// main.js
// Homepage behaviour: brand ticker, Latest Arrivals grid, search, contact form.

const TICKER_BRANDS = ["SUV", "Toyota Alphard", "Range Rover", "Mercedes-Benz", "Subaru", "BMW", "Volvo", "Mazda", "Volkswagen"];

function renderTicker() {
  const track = document.getElementById("ticker-track");
  if (!track) return;
  const items = [...TICKER_BRANDS, ...TICKER_BRANDS] // duplicated for seamless loop
    .map(b => `<span>${b}</span>`).join("");
  track.innerHTML = items;
}

function carCardHTML(car) {
  const title = `${car.year} ${car.model}`;
  const meta = [car.transmission, car.fuel, car.mileageKm ? `${car.mileageKm.toLocaleString()} km` : null]
    .filter(Boolean).join(" · ");
  const soldBadge = car.sold ? `<span class="sold-badge">SOLD</span>` : "";
  return `
    <div class="car-card" data-id="${car.id}">
      <div class="car-card-img-wrap">
        ${soldBadge}
        <img class="car-card-img" src="${car.image}" alt="${title}" loading="lazy">
      </div>
      <div class="car-card-body">
        <p class="car-card-title">${title}</p>
        <p class="car-card-meta">${meta || "&nbsp;"}</p>
        <p class="car-card-price">${formatPrice(car.price)}</p>
      </div>
      <div class="car-card-actions">
        <a href="car-detail.html?id=${car.id}" class="btn btn-outline">Details</a>
        <a href="${enquireLink(car)}" target="_blank" rel="noopener" class="btn btn-primary">Enquire</a>
      </div>
    </div>
  `;
}

function enquireLink(car) {
  const text = encodeURIComponent(
    `Hi Sephoc Motors, I'm interested in the ${car.year} ${car.model} listed at ${formatPrice(car.price)}. Is it still available?`
  );
  return `https://wa.me/256704113590?text=${text}`;
}

function renderLatestArrivals() {
  const grid = document.getElementById("latest-arrivals-grid");
  if (!grid || typeof getLatestArrivals !== "function") return;
  const cars = getLatestArrivals();
  grid.innerHTML = cars.map(carCardHTML).join("");
}

function setupSearch() {
  const form = document.getElementById("model-search-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("model-search-input").value.trim();
    window.location.href = `inventory.html?q=${encodeURIComponent(q)}`;
  });
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  function getFormValues() {
    const name = document.getElementById("contact-name").value.trim();
    const phone = document.getElementById("contact-phone").value.trim();
    const message = document.getElementById("contact-message").value.trim();
    return { name, phone, message };
  }

  function buildMessageText() {
    const { name, phone, message } = getFormValues();
    return `Name: ${name}\nPhone: ${phone}\nMessage: ${message}`;
  }

  document.getElementById("btn-whatsapp")?.addEventListener("click", () => {
    const text = encodeURIComponent(buildMessageText());
    window.open(`https://wa.me/256704113590?text=${text}`, "_blank");
  });

  document.getElementById("btn-call")?.addEventListener("click", () => {
    window.location.href = "tel:+256704113590";
  });

  document.getElementById("btn-email")?.addEventListener("click", () => {
    const { name, message } = getFormValues();
    const subject = encodeURIComponent(`Enquiry from ${name || "website visitor"}`);
    const body = encodeURIComponent(buildMessageText());
    window.location.href = `mailto:jbinvestment61@gmail.com?subject=${subject}&body=${body}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTicker();
  renderLatestArrivals();
  setupSearch();
  setupContactForm();
});
