// partials.js
// Shared header, footer, and floating contact bubble — injected on every page.

const BUSINESS = {
  phonePrimary: "+256704113590",
  phoneSecondary: "+256766617563",
  phoneDisplayPrimary: "(+256) 70 411 35 90",
  phoneDisplaySecondary: "(+256) 76 661 75 63",
  email: "jbinvestment61@gmail.com",
  whatsapp: "https://wa.me/256704113590",
  facebook: "https://facebook.com/SephocMotorsUganda",
  instagram: "https://instagram.com/sephocmotorsuganda",
  address: "Cadam Enterprises, Naguru — off Lugogo Bypass, Kampala, Uganda",
  hours: "Mon–Sat, 8:30am–6:00pm"
};

function renderHeader() {
  const el = document.getElementById("header-placeholder");
  if (!el) return;
  el.innerHTML = `
    <header class="site-header">
      <a href="index.html" class="logo">Sephoc Motors</a>
      <nav>
        <a href="index.html">Home</a>
        <a href="inventory.html">Inventory</a>
        <a href="contact.html">Contact</a>
      </nav>
    </header>
  `;
}

function renderFooter() {
  const el = document.getElementById("footer-placeholder");
  if (!el) return;

  const brands = ["Toyota", "Mercedes-Benz", "Subaru", "Mazda", "Land Rover", "BMW", "Volkswagen", "Volvo"];
  const brandLinks = brands.map(b =>
    `<li><a href="inventory.html?brand=${encodeURIComponent(b)}">${b}</a></li>`
  ).join("");

  el.innerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-col">
          <h4>Browse Cars</h4>
          <ul>${brandLinks}</ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="inventory.html">Full Inventory</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="tel:${BUSINESS.phonePrimary}">${BUSINESS.phoneDisplayPrimary}</a></li>
            <li><a href="tel:${BUSINESS.phoneSecondary}">${BUSINESS.phoneDisplaySecondary}</a></li>
            <li><a href="mailto:${BUSINESS.email}">${BUSINESS.email}</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Follow</h4>
          <ul>
            <li><a href="${BUSINESS.facebook}" target="_blank" rel="noopener">Facebook</a></li>
            <li><a href="${BUSINESS.instagram}" target="_blank" rel="noopener">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; ${new Date().getFullYear()} Sephoc Motors Uganda — ${BUSINESS.address}
      </div>
    </footer>
  `;
}

function renderFloatBubble() {
  const el = document.getElementById("float-bubble-placeholder");
  if (!el) return;

  el.innerHTML = `
    <div class="float-bubble-container">
      <button class="float-bubble-main" id="bubble-toggle" aria-label="Contact us">💬</button>
      <div class="float-bubble-options hidden" id="bubble-options">
        <a class="float-bubble-option whatsapp" href="${BUSINESS.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>
        <a class="float-bubble-option call" href="tel:${BUSINESS.phonePrimary}">Call</a>
        <a class="float-bubble-option sms" href="sms:${BUSINESS.phonePrimary}">SMS</a>
      </div>
    </div>
  `;

  document.getElementById("bubble-toggle").addEventListener("click", () => {
    document.getElementById("bubble-options").classList.toggle("hidden");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  renderFloatBubble();
});
