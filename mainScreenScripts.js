const input = document.querySelector("input");
const recentCalls = document.getElementById("recent-calls");

document.querySelector("button").addEventListener("click", () => {
    console.log("calling...", input.value);
    if (input.value !== "") {
    console.log("calling prior to passing message...", input.value);
        window.parent.postMessage(JSON.stringify({ action: "call", to: input.value }), "*");
    }
});

window.addEventListener("load", () => {
    window.parent.postMessage(JSON.stringify({ action: "get-logs" }), "*");
});

window.addEventListener("message", event => {
    try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        if (data.CallLog) {
            recentCalls.innerHTML = ""; // Clear existing logs
            data.CallLog.forEach(call => {
                const [contact, timestamp, status] = call;
                const callDate = new Date(timestamp);
                const today = new Date();
                const isToday = callDate.toDateString() === today.toDateString();
                const timeOrDate = isToday ? callDate.toLocaleTimeString([], { timeStyle: 'short' }) : callDate.toLocaleDateString();
                const iconSymbol = status.toLowerCase() === 'incoming' ? 'call_received' :
                                  status.toLowerCase() === 'outgoing' ? 'call_made' : 'call_missed';
                
                const li = document.createElement('li');
                li.className = "call-entry";
                li.innerHTML = `
                    <div class="call-details">
                        <div class="contact-name">${contact}</div>
                        <div class="call-time">${timeOrDate}</div>
                    </div>
                    <span class="call-icon material-symbols-outlined">${iconSymbol}</span>`;
                li.addEventListener('click', () => {
                    console.log("Re-calling...", contact);
                    window.parent.postMessage(JSON.stringify({ action: "call", to: contact }), "*");
                });
                recentCalls.appendChild(li);
            });
        }
    } catch (error) {
        console.error("Error parsing message data:", error);
    }
});
