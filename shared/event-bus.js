// Global event bus for cross-app communication
const eventBus = new EventTarget();

// Helper methods for easier event handling
export const emit = (eventName, detail) => {
  eventBus.dispatchEvent(new CustomEvent(eventName, { detail }));
};

export const on = (eventName, callback) => {
  eventBus.addEventListener(eventName, callback);
};

export const off = (eventName, callback) => {
  eventBus.removeEventListener(eventName, callback);
};

export default eventBus;
