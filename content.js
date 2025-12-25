let currentChatName = ""; 

function updateGeminiTabTitle() {
    // 1. Suche den aktiven Chat in der Sidebar
    const selectedConversation = document.querySelector('.conversation.selected');
    
    if (selectedConversation) {
        // 2. Finde das Element mit dem Titel-Text
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