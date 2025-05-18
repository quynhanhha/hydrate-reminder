document.addEventListener('click', () => {
    // First send message to restart timer (BEFORE closing the window)
    chrome.runtime.sendMessage({ type: "RESTART_TIMER" }, (response) => {
      console.log("Timer restart message sent");
      // Then close the popup after message is sent
      window.close();
    });
  });
  