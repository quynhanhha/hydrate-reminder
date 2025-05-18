// No need for initialization - user will set their interval

// Listen for messages from popup and reminder
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // Handle timer restart
  if (msg.type === "RESTART_TIMER") {
    chrome.storage.sync.get(['interval', 'timerActive'], (result) => {
      const { interval, timerActive } = result;
      console.log("Setting timer with interval:", interval, "Active:", timerActive);
      
      // Check if timer should be active
      if (timerActive === false) {
        console.log("Timer is set to inactive, not starting");
        chrome.alarms.clearAll();
        sendResponse({ success: true, active: false });
        return;
      }
      
      if (!interval || isNaN(interval)) {
        console.error("Invalid interval value:", interval);
        sendResponse({ success: false });
        return;
      }
      
      // Clear any existing alarms first
      chrome.alarms.clearAll(() => {
        // Create a new alarm with exact timing
        chrome.alarms.create('hydrate', { 
          delayInMinutes: parseFloat(interval) 
        });
        console.log("Hydration reminder will appear in", interval, "minutes");
        
        // Send response that timer was restarted successfully
        sendResponse({ success: true, active: true });
      });
    });
    
    // Required for asynchronous sendResponse
    return true;
  }
  
  // Handle stop timer request
  else if (msg.type === "STOP_TIMER") {
    console.log("Stopping hydration timer");
    // First update the storage to mark timer as inactive
    chrome.storage.sync.set({ timerActive: false }, () => {
      // Then clear all alarms
      chrome.alarms.clearAll(() => {
        console.log("All alarms cleared and timer marked as inactive");
        sendResponse({ success: true });
      });
    });
    return true;
  }
});
  
  // Listen for alarm events
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("Alarm fired:", alarm.name);
  
  if (alarm.name === 'hydrate') {
    // Double-check that timer is still active before showing popup
    chrome.storage.sync.get('timerActive', ({ timerActive }) => {
      if (timerActive === false) {
        console.log("Timer is inactive, skipping reminder");
        chrome.alarms.clearAll();
        return;
      }
      
      console.log("Opening hydration reminder popup");
      chrome.windows.create({
        url: "reminder.html",
        type: "popup",
        width: 300,
        height: 300,
        focused: true
      });
    });
  }
});  