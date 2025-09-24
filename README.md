# 🍷 Pour

> Automatically pour websites into Firefox containers based on domain

[![License: GPL 3.0](https://img.shields.io/badge/License-GPL%203.0-yellow.svg)](https://opensource.org/license/gpl-3-0)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Firefox](https://img.shields.io/badge/Firefox-FF7139?logo=firefox&logoColor=white)](https://www.mozilla.org/firefox/)

Pour is a Firefox extension that automatically opens websites in specified Firefox containers based on domain mappings. Perfect for organizing your browsing with container tabs for work, personal, shopping, and more.

## ✨ Features

- **Automatic Container Routing**: Websites automatically open in their assigned containers
- **Domain-Based Mapping**: Map domains (e.g., `google.com`) to specific containers
- **Intuitive Popup UI**: Easy-to-use interface for managing mappings
- **Export/Import**: Backup and restore your container mappings
- **Firefox Native**: Built specifically for Firefox's contextual identities
- **Type-Safe**: Written in TypeScript with full type safety

## 🚀 Installation

### From Source (Development)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pour.git
   cd pour
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Build for Firefox**
   ```bash
   bun build:firefox
   ```

4. **Load in Firefox**
   - Open `about:debugging`
   - Click "This Firefox" → "Load Temporary Add-on"
   - Select the `dist-firefox/manifest.json` file

### From Firefox Add-ons

You can download the extension from Firefox Addons here - [Pour](https://addons.mozilla.org/en-US/firefox/addon/pour)

## 🎯 Usage

### Setting Up Container Mappings

1. **Open the extension popup** by clicking the Pour icon in your toolbar
2. **Add a mapping**:
   - Enter a domain (e.g., `github.com`)
   - Select a container from the dropdown
   - Click "Add"
3. **Automatic routing**: Websites from that domain will now automatically open in the assigned container

### Managing Mappings

- **View current mappings**: See all your domain-container associations
- **Remove mappings**: Click the × button next to any mapping
- **Export mappings**: Backup your configuration as JSON
- **Import mappings**: Restore from a JSON backup
- **Clear all**: Remove all mappings at once

### Example Use Cases

- **Work websites** → Work container
- **Shopping sites** → Shopping container
- **Social media** → Personal container
- **Banking** → Secure container

## 🛠️ Development

### Prerequisites

- Node.js 18+
- Firefox (for testing)
- Bun (optional, for faster development)

### Development Commands

```bash
# Start development server (Firefox)
npm run dev:firefox

# Build for production
npm run build
npm run build:firefox

# Type checking
npm run compile

# Package for distribution
npm run zip
npm run zip:firefox
```

### Project Structure

```
pour/
├── entrypoints/
│   ├── background.ts      # Service worker for tab management
│   ├── content.ts         # Content script (currently minimal)
│   └── popup/             # Extension popup UI
│       ├── App.tsx        # Main React component
│       ├── main.tsx       # React entry point
│       └── *.css          # Styles
├── lib/
│   ├── services/          # Business logic
│   │   ├── containers.ts  # Container management
│   │   └── storage.ts     # Data persistence
│   └── types.ts           # TypeScript definitions
├── public/                # Static assets
└── wxt.config.ts          # WXT configuration
```

### Architecture

- **WXT Framework**: Modern browser extension development
- **React 19**: UI framework with hooks
- **TypeScript**: Full type safety
- **Service Layer**: Clean separation of concerns
- **Firefox APIs**: Native contextual identities support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run type checking: `npm run compile`
5. Test in Firefox
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📄 License

This project is licensed under the GPV-3.0 License - see the [LICENSE](LICENSE) file for details.

## 🙏 Motivation

I don't use Firefox sync, but every time I set up a new PC, I want certain websites to open in certain containers. Pour solves this by providing a simple way to manage domain-to-container mappings that persist across installations.

## 🔧 Built With

- [WXT](https://wxt.dev/) - Web Extension Toolkit
- [React](https://reactjs.org/) - UI Framework
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Firefox WebExtensions API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions) - Browser Integration

---

**Pour** - Keep your browsing organized, one container at a time. 🍷
