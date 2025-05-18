// Load saved settings when popup opens
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['interval', 'timerActive'], (result) => {
    const intervalInput = document.getElementById('interval');
    const toggleInput = document.getElementById('active-toggle');
    
    // If an interval was previously set, fill the input with that value
    if (result.interval) {
      intervalInput.value = result.interval;
    }
    
    // Set the toggle to match the active state (default to checked/true if not set)
    toggleInput.checked = result.timerActive === undefined ? true : result.timerActive;
    
    // Auto-save and apply interval changes
    intervalInput.addEventListener('change', () => {
      const mins = parseInt(intervalInput.value);
      if (!isNaN(mins) && mins > 0) {
        chrome.storage.sync.set({ interval: mins }, () => {
          console.log("Auto-saved interval:", mins);
          
          // If timer is active, restart with new interval
          if (toggleInput.checked) {
            chrome.runtime.sendMessage({ type: "RESTART_TIMER" }, (response) => {
              console.log("Timer restarted with new interval:", response);
            });
          }
        });
      }
    });
    
    // Add listener to the toggle to immediately apply changes
    toggleInput.addEventListener('change', (e) => {
      const isActive = e.target.checked;
      const currentInterval = parseInt(intervalInput.value);
      
      // Validate interval
      if (isActive && (!currentInterval || isNaN(currentInterval) || currentInterval <= 0)) {
        alert("Please enter a valid interval greater than 0");
        e.target.checked = false;
        return;
      }
      
      // Save the active state immediately
      chrome.storage.sync.set({ timerActive: isActive }, () => {
        console.log("Immediately updated timer active state:", isActive);
        
        // Send appropriate message based on toggle state
        if (isActive) {
          // For activation, immediately start timer with current interval
          chrome.runtime.sendMessage({ type: "RESTART_TIMER" }, (response) => {
            console.log("Timer immediately started:", response);
          });
        } else {
          // For deactivation, immediately stop the timer
          chrome.runtime.sendMessage({ type: "STOP_TIMER" }, (response) => {
            console.log("Timer immediately stopped:", response);
          });
        }
      });
    });
  });
});