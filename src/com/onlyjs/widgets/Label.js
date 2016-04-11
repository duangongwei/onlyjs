import Tag from '../core/Tag';
import Helper from '../tools/Helper';

export default class Label extends Tag {

    constructor(id, text, forId) {
        super('label');

        this.set('id', id || Helper.random());
        this.set('name', this.get('id'));
        this.set('for', forId);
        this.append(text);
    }

    text(val) {
        this.set('text', val);
        return this;
    }

}