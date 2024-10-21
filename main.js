const sendBtn = document.getElementById("send-btn");
const messageInput = document.getElementById("message-input");
const chatBody = document.getElementById("chat-body");
const chatList = document.getElementById("chat-list");
const chatTitle = document.getElementById("chat-title");
const newChatBtn = document.getElementById("new-chat-btn");

let chats = [];
let currentChat = null;

newChatBtn.addEventListener("click", () => {
  const chatName = prompt("Enter chat name:");
  if (chatName) {
    const chat = { name: chatName, messages: [] };
    chats.push(chat);
    renderChatList();
  }
});

function renderChatList() {
  chatList.innerHTML = "";
  chats.forEach((chat, index) => {
    const li = document.createElement("li");
    li.textContent = chat.name;
    li.classList.add("chat-item");
    li.addEventListener("click", () => openChat(index));
    chatList.appendChild(li);
  });
}

function openChat(index) {
  currentChat = chats[index];
  chatTitle.textContent = currentChat.name;
  renderMessages();
}

function renderMessages() {
  chatBody.innerHTML = "";
  currentChat.messages.forEach((msg, index) => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.textContent = msg.content;

    const actions = document.createElement("div");
    actions.classList.add("actions");
    actions.innerHTML = `
      <span class="edit">Edit</span> | 
      <span class="delete">Delete</span>
    `;
    messageDiv.appendChild(actions);

    actions.querySelector(".edit").addEventListener("click", () => {
      const newContent = prompt("Edit your message:", msg.content);
      if (newContent) {
        msg.content = newContent;
        renderMessages();
      }
    });

    actions.querySelector(".delete").addEventListener("click", () => {
      currentChat.messages.splice(index, 1);
      renderMessages();
    });

    chatBody.appendChild(messageDiv);
  });
}

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const content = messageInput.value.trim();
  if (content && currentChat) {
    currentChat.messages.push({ content });
    messageInput.value = "";
    renderMessages();
  }
}
