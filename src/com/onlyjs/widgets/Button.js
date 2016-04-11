import Tag from '../core/Tag';
import Helper from '../tools/Helper';

export default class Button extends Tag {

    constructor(id, type, text) {
        super('button');

        this.set('id', id || Helper.random());
        this.set('name', this.get('id'));
        this.set('type', type || 'button');
        this.set('class', 'btn btn-default');
        this.append(text);
    }

    text(val) {
        this.set('text', val);
        return this;
    }

}