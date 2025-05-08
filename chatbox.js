// chatbox.js
document.addEventListener("DOMContentLoaded", function () {
    // Buat elemen toggle button dan chatbox
    const toggleBtn = document.createElement("button");
    toggleBtn.id = "chatbox-toggle-btn";
    toggleBtn.innerHTML = "💬";
    document.body.appendChild(toggleBtn);
  
    const chatboxHTML = `
      <div id="chatbox-container" style="display: none;">
        <div id="chatbox-header">
          Bantuan
          <button id="chatbox-close-btn">&times;</button>
        </div>
        <div id="chatbox-messages">
          <div class="message bot">Hai! Ada yang bisa kami bantu?</div>
        </div>
        <div id="chatbox-input-container">
          <input id="chatbox-input" type="text" placeholder="Tulis pesan..." />
          <button id="chatbox-send-btn">Kirim</button>
        </div>
      </div>
    `;
  
    const wrapper = document.createElement("div");
    wrapper.innerHTML = chatboxHTML;
    document.body.appendChild(wrapper);
  
    // Elemen penting
    const chatbox = document.getElementById("chatbox-container");
    const messages = document.getElementById("chatbox-messages");
    const input = document.getElementById("chatbox-input");
    const sendBtn = document.getElementById("chatbox-send-btn");
    const closeBtn = document.getElementById("chatbox-close-btn");
  
    // Fungsi kirim pesan
    function sendMessage() {
      const text = input.value.trim();
      if (!text) return;
  
      const userMsg = document.createElement("div");
      userMsg.className = "message user";
      userMsg.textContent = text;
      messages.appendChild(userMsg);
      messages.scrollTop = messages.scrollHeight;
      input.value = "";
  
      setTimeout(() => {
        const botMsg = document.createElement("div");
        botMsg.className = "message bot";
        botMsg.textContent = "Terima kasih atas pesan Anda!";
        messages.appendChild(botMsg);
        messages.scrollTop = messages.scrollHeight;
      }, 500);
    }
  
    // Event listeners
    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  
    // Tombol close
    closeBtn.addEventListener("click", () => {
      chatbox.style.display = "none";
    });
  
    // Tombol toggle
    toggleBtn.addEventListener("click", () => {
      chatbox.style.display =
        chatbox.style.display === "none" ? "flex" : "none";
    });
  });