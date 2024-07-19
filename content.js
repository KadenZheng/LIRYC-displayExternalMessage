let displayElement;

function createDisplayElement() {
    displayElement = document.createElement("div");
    displayElement.style.position = "absolute";
    displayElement.style.top = "10px";
    displayElement.style.left = "10px";
    displayElement.style.maxWidth = "200px";
    displayElement.style.maxHeight = "50px";
    displayElement.style.overflow = "hidden";
    displayElement.style.textOverflow = "ellipsis";
    displayElement.style.whiteSpace = "nowrap";
    displayElement.style.color = "white";
    displayElement.style.zIndex = "9999";
    document.body.appendChild(displayElement);
}

function checkLocalStorage() {
    if (window.location.href !== "http://localhost/") {
        if (displayElement) {
            displayElement.remove();
            displayElement = null;
        }
        return;
    }

    const storedMessage = localStorage.getItem("EXTERNAL_MESSAGE");
    if (storedMessage) {
        if (!displayElement) {
            createDisplayElement();
        }

        try {
            const parsedData = JSON.parse(storedMessage);
            if (parsedData.customDataClient && Array.isArray(parsedData.customDataClient)) {
                const formattedData = parsedData.customDataClient.join(", ");
                displayElement.textContent = `customDataClient: ${formattedData}`;
            } else if (parsedData.heartRateClient) {
                const heartRate = parseFloat(parsedData.heartRateClient).toFixed(3);
                displayElement.textContent = `heartRateClient: ${heartRate}`;
            } else {
                displayElement.textContent = storedMessage;
            }
        } catch (error) {
            console.error("Error parsing stored message:", error);
            displayElement.textContent = storedMessage;
        }
    }
}

// Check localStorage initially
checkLocalStorage();

// Set up an interval to check localStorage periodically
setInterval(checkLocalStorage, 0.01); // Check every hundreth of a second
