
(function() {
  // Create CSS
  const createChatStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      
      .n8n-chat-container {
        font-family: 'Inter', sans-serif;
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 380px;
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
      }
      
      .n8n-chat-container.closed {
        max-height: 0;
        opacity: 0;
        bottom: -10px;
        pointer-events: none;
      }
      
      .n8n-chat-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: #9b87f5;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        z-index: 1001;
        transition: transform 0.2s ease, background-color 0.2s ease;
      }
      
      .n8n-chat-button:hover {
        transform: scale(1.05);
        background: #8B77E5;
      }
      
      .n8n-chat-button svg {
        width: 28px;
        height: 28px;
        fill: white;
      }
      
      .n8n-chat-header {
        padding: 16px;
        background: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #f1f1f4;
      }
      
      .n8n-chat-header-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .n8n-chat-header-logo {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
      }
      
      .n8n-chat-header-text {
        display: flex;
        flex-direction: column;
      }
      
      .n8n-chat-header-title {
        font-weight: 600;
        font-size: 16px;
        color: #2d2d3a;
        margin: 0;
      }
      
      .n8n-chat-header-subtitle {
        font-size: 12px;
        color: #6e6e80;
        margin: 0;
      }
      
      .n8n-chat-messages {
        display: flex;
        flex-direction: column;
        padding: 16px;
        height: 400px;
        overflow-y: auto;
        background: #f9f9fc;
      }
      
      .n8n-message {
        display: flex;
        margin-bottom: 16px;
        animation: bounceIn 0.4s ease-out;
        max-width: 85%;
      }
      
      .n8n-message-user {
        margin-left: auto;
        justify-content: flex-end;
      }
      
      .n8n-message-bot {
        margin-right: auto;
        justify-content: flex-start;
      }
      
      .n8n-message-bubble {
        padding: 12px 16px;
        border-radius: 18px;
        font-size: 14px;
        line-height: 1.5;
      }
      
      .n8n-message-user .n8n-message-bubble {
        background: #9b87f5;
        color: white;
        border-top-right-radius: 4px;
      }
      
      .n8n-message-bot .n8n-message-bubble {
        background: #f1f1f4;
        color: #2d2d3a;
        border-top-left-radius: 4px;
      }
      
      .n8n-message-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin: 0 8px;
        object-fit: cover;
      }
      
      .n8n-chat-input-container {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 16px;
        background: white;
        border-top: 1px solid #f1f1f4;
      }
      
      .n8n-chat-input-wrapper {
        display: flex;
        align-items: center;
        flex: 1;
        background: #f1f1f4;
        border-radius: 24px;
        padding-right: 12px;
        overflow: hidden;
      }
      
      .n8n-chat-input {
        flex: 1;
        border: none;
        padding: 12px 16px;
        font-size: 14px;
        outline: none;
        background: transparent;
        font-family: inherit;
      }
      
      .n8n-chat-input-mic {
        color: #6e6e80;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .n8n-chat-send-button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #9b87f5;
        color: white;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }
      
      .n8n-chat-send-button:hover {
        background: #8B77E5;
      }
      
      .n8n-chat-send-button:disabled {
        background: #e0e0e0;
        cursor: not-allowed;
      }
      
      .n8n-typing-indicator {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 12px 16px;
        background: #f1f1f4;
        border-radius: 18px;
        border-top-left-radius: 4px;
        width: fit-content;
        margin-bottom: 16px;
      }
      
      .n8n-typing-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #6e6e80;
        opacity: 0.6;
      }
      
      .n8n-typing-dot-1 {
        animation: typingAnimation 1.4s infinite 0.2s;
      }
      
      .n8n-typing-dot-2 {
        animation: typingAnimation 1.4s infinite 0.4s;
      }
      
      .n8n-typing-dot-3 {
        animation: typingAnimation 1.4s infinite 0.6s;
      }
      
      @keyframes bounceIn {
        0% {
          opacity: 0;
          transform: scale(0.8);
        }
        70% {
          transform: scale(1.05);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes typingAnimation {
        0% {
          transform: translateY(0px);
        }
        28% {
          transform: translateY(-5px);
        }
        44% {
          transform: translateY(0px);
        }
      }
    `;
    document.head.appendChild(style);
  };

  // Create SVG Icons
  const icons = {
    chat: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.92.544 3.71 1.482 5.228L2.1 21.9l4.672-1.383A9.959 9.959 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 1.5c4.687 0 8.5 3.813 8.5 8.5 0 4.687-3.813 8.5-8.5 8.5a8.48 8.48 0 01-4.505-1.303l-.5-.313-.548.164-1.114.334.334-1.114.164-.548-.313-.5A8.48 8.48 0 013.5 12C3.5 7.313 7.313 3.5 12 3.5zM7 9a1 1 0 000 2h7a1 1 0 100-2H7zm0 4a1 1 0 000 2h3a1 1 0 100-2H7z"/></svg>',
    send: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>',
    mic: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>',
    close: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
  };

  // Create Chat Elements
  const createChatElements = (config) => {
    // Chat toggle button
    const chatButton = document.createElement('div');
    chatButton.className = 'n8n-chat-button';
    chatButton.innerHTML = icons.chat;
    document.body.appendChild(chatButton);

    // Chat container
    const chatContainer = document.createElement('div');
    chatContainer.className = 'n8n-chat-container closed';
    document.body.appendChild(chatContainer);

    // Chat header
    const chatHeader = document.createElement('div');
    chatHeader.className = 'n8n-chat-header';

    const headerInfo = document.createElement('div');
    headerInfo.className = 'n8n-chat-header-info';

    if (config.logoUrl) {
      const logo = document.createElement('img');
      logo.className = 'n8n-chat-header-logo';
      logo.src = config.logoUrl;
      logo.alt = config.title || 'Chat Logo';
      headerInfo.appendChild(logo);
    }

    const headerText = document.createElement('div');
    headerText.className = 'n8n-chat-header-text';

    const title = document.createElement('h1');
    title.className = 'n8n-chat-header-title';
    title.textContent = config.title || 'N8N Chat';
    headerText.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'n8n-chat-header-subtitle';
    subtitle.textContent = config.subtitle || 'Powered by n8n';
    headerText.appendChild(subtitle);

    headerInfo.appendChild(headerText);
    chatHeader.appendChild(headerInfo);
    chatContainer.appendChild(chatHeader);

    // Chat messages
    const messagesContainer = document.createElement('div');
    messagesContainer.className = 'n8n-chat-messages';
    chatContainer.appendChild(messagesContainer);

    // Chat input
    const inputContainer = document.createElement('div');
    inputContainer.className = 'n8n-chat-input-container';

    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'n8n-chat-input-wrapper';

    const input = document.createElement('input');
    input.className = 'n8n-chat-input';
    input.type = 'text';
    input.placeholder = config.placeholder || 'Type your message...';
    inputWrapper.appendChild(input);

    const micButton = document.createElement('button');
    micButton.className = 'n8n-chat-input-mic';
    micButton.innerHTML = icons.mic;
    inputWrapper.appendChild(micButton);

    inputContainer.appendChild(inputWrapper);

    const sendButton = document.createElement('button');
    sendButton.className = 'n8n-chat-send-button';
    sendButton.disabled = true;
    sendButton.innerHTML = icons.send;
    inputContainer.appendChild(sendButton);

    chatContainer.appendChild(inputContainer);

    // Add welcome message
    if (config.welcomeMessage) {
      addMessage(messagesContainer, config.welcomeMessage, false, config.botAvatar);
    }

    return {
      chatButton,
      chatContainer,
      input,
      sendButton,
      messagesContainer,
      micButton
    };
  };

  // Add a new message to the chat
  const addMessage = (container, text, isUser, avatarUrl) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'n8n-message n8n-message-user' : 'n8n-message n8n-message-bot';

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'n8n-message-bubble';
    bubbleDiv.textContent = text;
    
    if (avatarUrl) {
      const avatar = document.createElement('img');
      avatar.className = 'n8n-message-avatar';
      avatar.src = avatarUrl;
      avatar.alt = isUser ? 'User' : 'Bot';
      
      if (isUser) {
        messageDiv.appendChild(bubbleDiv);
        messageDiv.appendChild(avatar);
      } else {
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(bubbleDiv);
      }
    } else {
      messageDiv.appendChild(bubbleDiv);
    }

    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
    return messageDiv;
  };

  // Create typing indicator
  const createTypingIndicator = (container) => {
    const indicator = document.createElement('div');
    indicator.className = 'n8n-typing-indicator';
    
    for (let i = 1; i <= 3; i++) {
      const dot = document.createElement('div');
      dot.className = `n8n-typing-dot n8n-typing-dot-${i}`;
      indicator.appendChild(dot);
    }
    
    container.appendChild(indicator);
    container.scrollTop = container.scrollHeight;
    return indicator;
  };

  // Initialize chat
  const initChat = (config) => {
    createChatStyles();
    
    const {
      chatButton,
      chatContainer,
      input,
      sendButton,
      messagesContainer,
      micButton
    } = createChatElements(config);
    
    let isOpen = false;
    
    // Toggle chat open/closed
    chatButton.addEventListener('click', () => {
      isOpen = !isOpen;
      chatContainer.classList.toggle('closed', !isOpen);
      chatButton.innerHTML = isOpen ? icons.close : icons.chat;
      
      if (isOpen) {
        input.focus();
      }
    });
    
    // Enable/disable send button based on input
    input.addEventListener('input', () => {
      sendButton.disabled = input.value.trim() === '';
      
      // Hide mic button when typing
      micButton.style.display = input.value.trim() === '' ? 'flex' : 'none';
    });
    
    // Send message on Enter key
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim() !== '') {
        sendMessage();
      }
    });
    
    // Send message on button click
    sendButton.addEventListener('click', () => {
      if (input.value.trim() !== '') {
        sendMessage();
      }
    });
    
    // Function to send message
    const sendMessage = async () => {
      const messageText = input.value.trim();
      if (!messageText) return;
      
      // Add user message
      addMessage(messagesContainer, messageText, true, config.userAvatar);
      
      // Clear input
      input.value = '';
      sendButton.disabled = true;
      micButton.style.display = 'flex';
      
      // Show typing indicator
      const typingIndicator = createTypingIndicator(messagesContainer);
      
      try {
        // Send message to n8n webhook
        const response = await fetch(config.webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: messageText,
          }),
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Remove typing indicator
        setTimeout(() => {
          typingIndicator.remove();
          
          // Add bot response
          addMessage(
            messagesContainer, 
            data.message || "I'm sorry, I couldn't process that request.", 
            false, 
            config.botAvatar
          );
        }, 500);
        
      } catch (error) {
        console.error('Failed to send message:', error);
        
        // Remove typing indicator
        typingIndicator.remove();
        
        // Add error message
        addMessage(
          messagesContainer, 
          "Sorry, there was an error processing your request. Please try again.", 
          false, 
          config.botAvatar
        );
      }
    };
  };
  
  // Define global function to create chat
  window.createN8nModernChat = function(config) {
    if (!config || !config.webhookUrl) {
      console.error('N8N Chat: webhookUrl is required');
      return;
    }
    
    // Set default config values
    const chatConfig = {
      webhookUrl: config.webhookUrl,
      title: config.title || 'N8N Chat',
      subtitle: config.subtitle || 'Powered by n8n',
      logoUrl: config.logoUrl || 'https://n8n.io/favicon.ico',
      botAvatar: config.botAvatar || 'https://n8n.io/favicon.ico',
      userAvatar: config.userAvatar || '',
      placeholder: config.placeholder || 'Type a message...',
      welcomeMessage: config.welcomeMessage || 'Hi there! How can I help you today?'
    };
    
    // Initialize chat with config
    initChat(chatConfig);
  };
  
  // Auto-initialize if script has data attributes
  const script = document.currentScript;
  if (script) {
    const webhookUrl = script.getAttribute('data-webhook-url');
    if (webhookUrl) {
      window.createN8nModernChat({
        webhookUrl,
        title: script.getAttribute('data-title'),
        subtitle: script.getAttribute('data-subtitle'),
        logoUrl: script.getAttribute('data-logo-url'),
        botAvatar: script.getAttribute('data-bot-avatar'),
        userAvatar: script.getAttribute('data-user-avatar'),
        welcomeMessage: script.getAttribute('data-welcome-message'),
        placeholder: script.getAttribute('data-placeholder')
      });
    }
  }
})();