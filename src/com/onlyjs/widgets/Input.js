import Tag from '../core/Tag';
import Helper from '../tools/Helper';

export default class Input extends Tag {

    constructor(id, type) {
        super('input', true);

        this.set('id', id || Helper.random());
        this.set('name', this.get('id'));
        this.set('type', type || 'text');
        this.set('class', 'form-control');
    }

    value(val) {
        this.set('value', val);
        return this;
    }

    holder(val) {
        this.set('placeholder', val);
        return this;
    }

}