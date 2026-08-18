const cards = document.getElementById("destinationCards");
const modal = document.getElementById("destinationModal");
const closeModal = document.getElementById("closeModal");
const menuBtn = document.getElementById("menuBtn");
const navList = document.querySelector("nav ul");

let selectedDestination = null;

async function loadDestinations() {
  try {
    const response = await fetch("/api/destinations");
    if (!response.ok) throw new Error("Could not load destinations");
    const destinations = await response.json();

    cards.innerHTML = destinations.map(d => `
      <article class="card">
        <img src="${d.image}" alt="${d.name}">
        <h3>${d.name}</h3>
        <div class="category">${d.category}</div>
        <p>${d.shortDescription}</p>
        <button class="explore-btn" data-id="${d.id}">Explore</button>
      </article>
    `).join("");

    document.querySelectorAll(".explore-btn").forEach(button => {
      button.addEventListener("click", () => openDestination(button.dataset.id));
    });
  } catch (error) {
    cards.innerHTML = `<p class="loading">Unable to load destinations. Start the server and refresh.</p>`;
    console.error(error);
  }
}

async function openDestination(id) {
  try {
    const response = await fetch(`/api/destinations/${id}`);
    if (!response.ok) throw new Error("Destination not found");
    selectedDestination = await response.json();

    document.getElementById("modalImage").src = selectedDestination.image;
    document.getElementById("modalImage").alt = selectedDestination.name;
    document.getElementById("modalCategory").textContent = selectedDestination.category;
    document.getElementById("modalTitle").textContent = selectedDestination.name;
    document.getElementById("modalDescription").textContent = selectedDestination.description;
    document.getElementById("modalBestFor").textContent = selectedDestination.bestFor;

    modal.classList.remove("hidden");
  } catch (error) {
    alert("Could not load destination details.");
  }
}

closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.add("hidden");
});

document.getElementById("planTripBtn").addEventListener("click", async () => {
  if (!selectedDestination) return;
  const name = prompt(`Enter your name to plan a trip to ${selectedDestination.name}:`);
  if (!name) return;

  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name,
        destinationId: selectedDestination.id,
        destination: selectedDestination.name
      })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    alert(result.message);
    modal.classList.add("hidden");
  } catch (error) {
    alert("Booking request failed.");
  }
});

document.getElementById("contactForm").addEventListener("submit", async e => {
  e.preventDefault();
  const status = document.getElementById("contactStatus");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: document.getElementById("contactName").value,
        email: document.getElementById("contactEmail").value,
        message: document.getElementById("contactMessage").value
      })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    status.textContent = result.message;
    status.style.color = "green";
    e.target.reset();
  } catch (error) {
    status.textContent = error.message;
    status.style.color = "crimson";
  }
});

menuBtn.addEventListener("click", () => navList.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => navList.classList.remove("open")));

loadDestinations();
