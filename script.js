
async function sendMessage() {
    const input = document.getElementById("messageInput");
    const chatbox = document.getElementById("chatbox");
    const message = input.value.trim();

    if (!message) return;

    // Voeg gebruikersbericht toe
    const userMsg = document.createElement("div");
    userMsg.innerHTML = `<b>Jij:</b> ${escapeHtml(message)}`;
    chatbox.appendChild(userMsg);

    try {
        const response = await fetch("https://chatfunctionindicatie2.azurewebsites.net/api/HttpTrigger1?code=yJKWV12ehMNPVvAfbi__9jRi0MTjoC7u8O6PdxEcn8bgAzFuUPLAjw==", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.text();

        const botMsg = document.createElement("div");
        botMsg.innerHTML = `<b>Bot:</b> ${escapeHtml(data)}`;
        chatbox.appendChild(botMsg);
    } catch (error) {
        const errMsg = document.createElement("div");
        errMsg.style.color = "red";
        errMsg.textContent = "Fout: " + error.message;
        chatbox.appendChild(errMsg);
    }

    input.value = "";
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Voeg deze helper toe bovenaan of onderaan je script:
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
