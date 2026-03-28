const API = "http://127.0.0.1:8000";

async function createTicket() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("desc").value;

    if (!title || !description) {
        alert("Please fill in all fields");
        return;
    }

    try {
        await fetch(API + "/tickets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description })
        });

        document.getElementById("title").value = "";
        document.getElementById("desc").value = "";
        loadTickets();
    } catch (error) {
        console.error("Error creating ticket:", error);
        alert("Failed to create ticket");
    }
}

async function loadTickets() {
    try {
        const res = await fetch(API + "/tickets");
        const data = await res.json();

        document.getElementById("board").innerHTML = "";

        data.forEach(t => {
            const el = document.createElement("div");
            el.innerHTML = `
                <b>${escapeHtml(t.title)}</b>
                <p>${escapeHtml(t.description)}</p>
                <button onclick="analyze('${escapeHtml(t.title)}', '${escapeHtml(t.description)}')">IA</button>
            `;
            document.getElementById("board").appendChild(el);
        });
    } catch (error) {
        console.error("Error loading tickets:", error);
    }
}

async function analyze(title, description) {
    try {
        const res = await fetch(API + "/ai/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description })
        });

        const data = await res.json();
        alert(data.result);
    } catch (error) {
        console.error("Error analyzing ticket:", error);
        alert("Failed to analyze ticket");
    }
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}