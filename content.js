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
            const key = Object.keys(parsedData)[0]; // Get the first key of the object
            const value = parsedData[key];

            if (Array.isArray(value)) {
                const formattedData = value.join(", ");
                displayElement.textContent = `${key}: ${formattedData}`;
            } else if (typeof value === "number") {
                const formattedValue = parseFloat(value).toFixed(3);
                displayElement.textContent = `${key}: ${formattedValue}`;
            } else {
                displayElement.textContent = `${key}: ${value}`;
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
