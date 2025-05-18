# Operation Hydrate: Browser Extension

A simple browser extension that reminds you to drink water at regular intervals with fun memes and audio notifications.

## Features

- Set customizable hydration reminders (in minutes)
- Easy on/off toggle 
- Fun meme popup reminders
- Audio notification with each reminder
- Auto-restarts timer after each reminder

## Installation

1. Download or clone this repository
2. Open your browser's extension management page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Firefox: `about:addons`
3. Enable "Developer Mode"
4. Click "Load Unpacked" and select the extension directory

## Usage

1. Click on the extension icon in your browser toolbar
2. Set your preferred reminder interval (in minutes)
3. Toggle the reminder on/off as needed
4. When a reminder appears, click anywhere to dismiss it and restart the timer

## Files Overview

- `manifest.json` - Extension configuration
- `popup.html/js` - Settings popup interface and functionality
- `background.js` - Background service worker for timer management
- `reminder.html/js` - Water reminder popup and audio
- `styles/popup.css` - Styling for the extension
- `icon.png` - Extension icon
- `meme.png` - Water reminder meme image
- `charm.ogg` - Notification sound

## License

[MIT License](LICENSE)

## Credits

Created as part of Operation Hydrate: Stay hydrated, stay healthy! 