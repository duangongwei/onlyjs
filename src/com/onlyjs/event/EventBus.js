export default class EventBus {

    constructor() {
        this.events = new Map();
    }

    send(event) {
        let handlers = this.events.get(event.type);
        for (let handler of handlers) {
            if (!handler(event)) {
                break;
            }
        }
    }

    register(type, handler) {
        if (this.events.has(type)) {
            this.events.get(type).push(handler);
        } else {
            this.events.set(type, new Array(handler));
        }
    }

    unregister(type, handler) {
        if (!type || !this.events.has(type)) {
            return;
        }
        if (!handler) {
            this.events.delete(type);
            return;
        }
        let handlers = this.events.get(type);
        let idx = handlers.indexOf(handler);
        if (idx != -1) {
            handlers.splice(idx, 1);
        }
    }

    clear() {
        this.events.clear();
    }
}