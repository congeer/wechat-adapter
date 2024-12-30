# wechat-adapter

A WeChat Mini Game adapter that provides web-like APIs for the WeChat Mini Game environment. This adapter helps bridge the gap between web applications and WeChat Mini Games by implementing common web APIs.

## Features

- Web API compatibility layer for WeChat Mini Games
- Implements common web interfaces:
  - DOM Elements and Events
  - XMLHttpRequest and Fetch API
  - WebSocket support
  - Canvas and multimedia (Audio/Video) support
  - LocalStorage
  - Performance API
  - Navigator API
  - Window and Document objects

## Installation

```bash
npm install wechat-adapter
```

## Usage

Import the adapter at the entry point of your WeChat Mini Game:

```javascript
import 'wechat-adapter';
```

The adapter will automatically inject the necessary APIs into the global scope. It handles both the WeChat DevTools environment and the actual mobile runtime environment appropriately.

## API Components

The adapter includes implementations for:

- `EventTarget` - DOM event handling
- `TouchEvent` - Touch interaction events
- `WebSocket` - WebSocket client implementation
- `XMLHttpRequest` - HTTP request API
- `fetch` - Modern HTTP request API
- `localStorage` - Data persistence
- `canvas` - Canvas rendering context
- `audio/video` - Multimedia support
- `window` - Global window object with web-like APIs
- `document` - Document object model
- `navigator` - Browser-like navigator information
- `performance` - Performance measurement APIs

## Environment Detection

The adapter automatically detects whether it's running in the WeChat DevTools or on a mobile device and adjusts its behavior accordingly to provide the most appropriate implementation.

## License

MIT @ [Congeer](https://github.com/congeer)
