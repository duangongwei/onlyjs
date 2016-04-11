import Tag from '../core/Tag';
import Helper from '../tools/Helper';

export default class Form extends Tag {

    constructor(id, action, method) {
        super('form');

        this.set('id', id || Helper.random());
        this.set('name', this.get('id'));
        this.set('action', action || '#');
        this.set('method', method || 'POST');
    }

    action(val){
        this.set('action', val);
        return this;
    }

    method(val){
        this.set('method', val);
        return this;
    }

    target(val){
        this.set('target', val);
        return this;
    }
}