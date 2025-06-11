document.getElementById("chat-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const userInput = document.getElementById("user-input").value;
  const responseElement = document.getElementById("response");

  if (!userInput) {
    responseElement.innerText = "Voer een bericht in.";
    return;
  }

  try {
    const response = await fetch("https://chatfunctionindicatie2.azurewebsites.net/api/HttpTrigger1?code=yJKWV12ehMNPVvAfbi__9jRi0MTjoC7u8O6PdxEcn8bgAzFuUPLAjw==", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userInput })
    });

    if (!response.ok) {
      throw new Error(`HTTP fout: ${response.status}`);
    }

    const data = await response.text(); // gebruik text() in plaats van json()
    responseElement.innerText = data;
  } catch (error) {
    console.error("Fout bij het ophalen van de data:", error);
    responseElement.innerText = "Fout: " + error.message;
  }
});
