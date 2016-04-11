import Tag from '../core/Tag';
import Helper from '../tools/Helper';

export default class Alert extends Tag {

    constructor(id, text) {
        super('div');

        this.set('id', id || Helper.random());
        this.set('class', 'alert');
        this.append(text);
    }

    text(val) {
        this.set('text', val);
        return this;
    }

    type(val) {
        this.delClass('alert-' + this._type)
            .addClass('alert-' + val);
        this._type = val;
        return this;
    }

    show() {
        return this.delClass('hide');
    }

    hide() {
        return this.addClass('hide');
    }
}