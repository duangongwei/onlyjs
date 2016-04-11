const own_attrs = [
    'type', 'keyCode', 'button',
    'altKey', 'ctrlKey', 'shiftKey', 'metaKey',
    'clientX', 'clientY', 'offsetX', 'offsetY'
];

export default class Event {

    constructor(domEvt) {
        this.target = domEvt.target.id;
        this._origin = domEvt;
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
        this._origin.stopPropagation();
    }
}