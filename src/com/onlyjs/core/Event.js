const own_attrs = [
    'type', 'keyCode', 'altKey', 'ctrlKey', 'shiftKey', 'metaKey',
    'clientX', 'clientY', 'offsetX', 'offsetY', 'button'
];

export default class Event {

    constructor(domEvt, tag) {
        this.target = tag;
        for (let key in own_attrs) {
            this[key] = domEvt[key];
        }
    }

    _simply(attr, val) {
        if (typeof val == 'undefined') {
            return this.get(attr);
        }
        return this.set(attr, val);
    }

    render(page) {
        return this._simply('redirect', val);
    }

    redirect(url) {
        return this._simply('redirect', url);
    }

    result(data) {
        return this._simply('result', data);
    }

    stopPropagation() {
        this.set('propagation', false);
    }
}