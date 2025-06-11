
async function sendMessage() {
    const input = document.getElementById("messageInput");
    const chatbox = document.getElementById("chatbox");
    const message = input.value;

    chatbox.innerHTML += "<div><b>Jij:</b> " + message + "</div>";

    try {
        const response = await fetch("https://chatfunctionindicatie2.azurewebsites.net/api/HttpTrigger1?code=yJKWV12ehMNPVvAfbi__9jRi0MTjoC7u8O6PdxEcn8bgAzFuUPLAjw==", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.text();
        chatbox.innerHTML += "<div><b>Bot:</b> " + data + "</div>";
    } catch (error) {
        chatbox.innerHTML += "<div style='color:red;'>Fout: " + error.message + "</div>";
    }

    input.value = "";
}
