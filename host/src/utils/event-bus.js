// Global event bus for cross-app communication
// Use window object to ensure singleton across all micro-frontends
if (!window.__MICRO_FRONTEND_EVENT_BUS__) {
  window.__MICRO_FRONTEND_EVENT_BUS__ = new EventTarget();
}

const eventBus = window.__MICRO_FRONTEND_EVENT_BUS__;

// Helper methods for easier event handling
export const emit = (eventName, detail) => {
  console.log(`[EventBus] Emitting: ${eventName}`, detail);
  eventBus.dispatchEvent(new CustomEvent(eventName, { detail }));
};

export const on = (eventName, callback) => {
  console.log(`[EventBus] Listening for: ${eventName}`);
  eventBus.addEventListener(eventName, callback);
};

export const off = (eventName, callback) => {
  eventBus.removeEventListener(eventName, callback);
};

export default eventBus;
