let currentChatName = ""; 

function updateGeminiTabTitle() {
    // 1. Conversation ID aus der aktuellen URL extrahieren
    // Supports: /app/[id] and /u/1/gem/[gemId]/[id]
    const match = window.location.pathname.match(/(?:\/app\/|\/gem\/[a-f0-9]+\/)([a-f0-9]+)/);
    if (!match) return;

    const conversationId = match[1];

    // 2. Sidebar-Link finden, dessen href die aktuelle Conversation ID enthält
    const selectedConversation = document.querySelector(`a[href*="/app/${conversationId}"]`);

    if (selectedConversation) {
        // 3. Finde das Element mit dem Titel-Text
        const titleElement = selectedConversation.querySelector('.conversation-title');
        
        if (titleElement) {
            // 3. Text extrahieren und säubern
            const newName = titleElement.innerText.split('\n')[0].trim();

            // 4. Nur ändern, wenn es ein echter Chat-Name ist (nicht "Chats" oder leer)
            if (newName && newName !== "Chats" && newName !== currentChatName) {
                currentChatName = newName;
                document.title = newName;
                console.log("Gemini Manager: Titel fixiert auf ->", newName);
            }
        }
    }
}

// Der Observer reagiert sofort, wenn du in der Sidebar einen anderen Chat wählst
const observer = new MutationObserver(() => {
    updateGeminiTabTitle();
});

// Wir überwachen den Body auf Änderungen
observer.observe(document.body, {
    childList: true, 
    subtree: true,
    characterData: true
});

// Initialer Aufruf beim Laden des Tabs
updateGeminiTabTitle();