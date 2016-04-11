export default class Listener {

    constructor(page) {
        this.page = page;
        this.events = new Map();
    }

    trigger(event) {
        let handlers = this.events.get(event.target);
        if (!handlers || handlers.size == 0) {
            return;
        }
        let callbacks = handlers.get(event.type);
        if (!callbacks || callbacks.length == 0) {
            return;
        }
        for (let cb of callbacks) {
            cb.apply(this, [event]);
        }
    }

    register(id, type, callback) {
        if (this.events.has(id)) {
            let handlers = this.events.get(id);
            if (handlers.has(type)) {
                handlers.get(type).push(callback);
            } else {
                handlers.set(type, new Array(callback));
            }
        } else {
            let handlers = new Map();
            handlers.set(type, new Array(callback));
            this.events.set(id, handlers);
        }
    }

    unregister(id, type, callback) {
        if (!id || !this.events.has(id)) {
            return;
        }
        if (!type) {
            this.events.delete(id);
            return;
        }
        let handlers = this.events.get(id);
        if (!handlers.has(type)) {
            return;
        }
        if (!callback) {
            handlers.delete(type);
            return;
        }
        let callbacks = handlers.get(type);
        let idx = callbacks.indexOf(callback);
        if (idx != -1) {
            callbacks.splice(idx, 1);
        }
    }

    clear() {
        this.events.clear();
    }
}