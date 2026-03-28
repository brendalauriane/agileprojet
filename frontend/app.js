let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

// Charger au démarrage
window.onload = () => {
  tickets.forEach(addTicketToDOM);
};

// Sauvegarde auto
function save() {
  localStorage.setItem("tickets", JSON.stringify(tickets));
}

// Création ticket
function createTicket() {
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;

  if (!title || !desc) return;

  const ticket = {
    id: Date.now(),
    title,
    desc,
    column: "todo"
  };

  tickets.push(ticket);
  addTicketToDOM(ticket);
  save();

  title.value = "";
  desc.value = "";
}

// Ajouter au DOM
function addTicketToDOM(ticket) {
  const div = document.createElement("div");
  div.className = "ticket";
  div.draggable = true;
  div.id = ticket.id;

  div.innerHTML = `<strong>${ticket.title}</strong><br>${ticket.desc}`;

  // Drag events
  div.addEventListener("dragstart", e => {
    e.dataTransfer.setData("id", ticket.id);
  });

  document.getElementById(ticket.column).appendChild(div);
}

// Colonnes = zones de drop
document.querySelectorAll(".col").forEach(col => {
  col.addEventListener("dragover", e => e.preventDefault());

  col.addEventListener("drop", e => {
    const id = e.dataTransfer.getData("id");
    const ticketEl = document.getElementById(id);

    col.appendChild(ticketEl);

    // update data
    tickets = tickets.map(t =>
      t.id == id ? { ...t, column: col.id } : t
    );

    save();
  });
});

// 🤖 Suggestion IA simple
function suggestAI() {
  const desc = document.getElementById("desc").value.toLowerCase();

  let suggestion = "Nouvelle tâche";

  if (desc.includes("bug")) suggestion = "Corriger un bug";
  else if (desc.includes("login")) suggestion = "Améliorer le login";
  else if (desc.includes("api")) suggestion = "Optimiser API";
  else if (desc.includes("design")) suggestion = "Refonte UI";

  document.getElementById("title").value = suggestion;
}