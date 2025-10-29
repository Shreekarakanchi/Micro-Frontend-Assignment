# Micro-Frontend Architecture - Assignment Project

A production-ready micro-frontend system using React 18, Webpack 5 Module Federation, and Tailwind CSS.

## 📋 Project Overview

This project implements a micro-frontend architecture with three applications:

- **Host Application** (Port 3000) - Manages the design system and orchestrates micro-frontends
- **Chat Application** (Port 3001) - Standalone chat functionality
- **Email Application** (Port 3002) - Standalone email functionality

## 🏗️ Architecture

```
HOST (3000) - Design System Manager
    ├─► CHAT (3001) - Exposes ./ChatApp
    └─► EMAIL (3002) - Exposes ./EmailApp
         └─► Event Bus (Communication)
```

**Communication Flow:**
- Host → Chat: `open-chat` event
- Chat → Email: `email-send` event  
- Email → Chat: `open-chat` event

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.x
- npm >= 8.x

### Installation & Running

```bash
# Install dependencies
cd chat && npm install
cd ../email && npm install
cd ../host && npm install

# Start apps (3 separate terminals)
# Terminal 1
cd chat && npm start

# Terminal 2  
cd email && npm start

# Terminal 3
cd host && npm start
```

Visit: **http://localhost:3000**

## 🎨 Design System

The Host manages a centralized design system consumed by all micro-frontends:

**Shared Components:**
- `Button.jsx` - Reusable UI component
- `event-bus.js` - Cross-app communication utility

**Design Tokens (Tailwind):**
```javascript
colors: {
  chat: { light: '#dbeafe', DEFAULT: '#3b82f6' },   // Blue theme
  email: { light: '#d1fae5', DEFAULT: '#10b981' },  // Green theme
}
```

**Responsive Design:**
- Mobile: < 768px (stacked layout)
- Desktop: > 1024px (side-by-side)

## 🔧 Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| Webpack | 5.89.0 | Module Federation |
| Tailwind CSS | 3.3.5 | Design System |

## ⚙️ Module Federation Config

**Host (Consumer):**
```javascript
remotes: {
  chat: 'chat@http://localhost:3001/remoteEntry.js',
  email: 'email@http://localhost:3002/remoteEntry.js',
}
```

**Chat/Email (Providers):**
```javascript
exposes: {
  './ChatApp': './src/ChatApp',  // or EmailApp
}
```

**Lazy Loading:**
```javascript
const ChatApp = lazy(() => import('chat/ChatApp'));
```

## 💬 Communication Between Apps

**Event Bus Implementation:**
```javascript
// Emit event
emit('open-chat', { message: 'Hello' });

// Listen for event
on('open-chat', (event) => {
  console.log(event.detail.message);
});
```

All apps share `window.__MICRO_FRONTEND_EVENT_BUS__` for loose coupling.

## 📈 Scalability

**Adding a New Micro-Frontend:**

1. **Create app folder** with webpack config:
```javascript
new ModuleFederationPlugin({
  name: 'notifications',
  exposes: { './NotificationApp': './src/NotificationApp' }
})
```

2. **Register in Host:**
```javascript
remotes: {
  notifications: 'notifications@http://localhost:3003/remoteEntry.js'
}
```

3. **Lazy load:**
```javascript
const NotificationApp = lazy(() => import('notifications/NotificationApp'));
```

**Benefits:**
- Independent development & deployment
- Technology flexibility
- Team autonomy
- Performance optimization (code splitting)

## 🏛️ Key Architectural Decisions

### 1. Webpack Module Federation
**Choice:** Webpack 5 Module Federation  
**Why:** Native webpack integration, runtime loading, shared dependencies  
**Trade-off:** More complex setup vs Single-SPA's framework approach

### 2. Event Bus Communication
**Choice:** Custom EventTarget-based bus  
**Why:** Loose coupling, framework agnostic, simple  
**Trade-off:** No state persistence vs Redux complexity

### 3. Tailwind CSS
**Choice:** Utility-first CSS framework  
**Why:** Consistent styling, small bundles, rapid development  
**Trade-off:** Learning curve vs CSS-in-JS runtime overhead

### 4. Monorepo Structure
**Choice:** Single repository  
**Why:** Easier development, shared configs, atomic commits  
**Trade-off:** Less team independence vs polyrepo complexity (can split for production)

### 5. Bootstrap Pattern
**Choice:** Async bootstrap files (`import('./index.js')`)  
**Why:** Required for Module Federation shared module initialization  
**Trade-off:** Extra file (negligible) vs "Shared module not available" errors

## 🐛 Troubleshooting

**"Shared module is not available" error:**
- Ensure all apps use bootstrap pattern: `entry: './src/bootstrap.js'`

**Blank page:**
- Check all 3 apps are running
- Hard refresh: Ctrl+Shift+R

**Port conflict:**
```powershell
# Find process on port
netstat -ano | findstr :3000
# Kill process (replace PID)
taskkill /PID <PID> /F
```

## ✅ Assignment Checklist

- ✅ **Micro-Frontend Architecture** - Webpack 5 Module Federation
- ✅ **Design System** - Tailwind config managed by Host
- ✅ **Shared Components** - Button, event-bus consumed by all apps
- ✅ **Communication** - Event bus for cross-app messaging
- ✅ **Scalability** - Clear patterns for adding micro-frontends
- ✅ **Documentation** - Setup, architecture decisions, trade-offs

## 📁 Project Structure

```
micro-frontend/
├── host/           # Port 3000 - Design system manager
├── chat/           # Port 3001 - Chat micro-frontend
├── email/          # Port 3002 - Email micro-frontend
└── shared/         # Shared components & utilities
```

## 📚 Additional Resources

- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [React 18 Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Built with React 18, Webpack 5 Module Federation, and Tailwind CSS**

🎉 Ready to run! Start all three apps and visit `http://localhost:3000`


<img width="1903" height="906" alt="image" src="https://github.com/user-attachments/assets/33a20250-3949-4b49-b543-936da85bef12" />

<img width="1902" height="910" alt="image" src="https://github.com/user-attachments/assets/e1a69fe8-2721-494e-915f-05b33d1c325b" />

<img width="1919" height="906" alt="image" src="https://github.com/user-attachments/assets/c4ac2bfd-1bd5-4ede-a0a8-0f8a891ce382" />

<img width="1919" height="900" alt="image" src="https://github.com/user-attachments/assets/6c379862-1b32-4c17-a4ba-3723d49fd09e" />





