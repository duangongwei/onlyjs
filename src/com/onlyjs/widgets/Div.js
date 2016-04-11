import Tag from '../core/Tag';
import Helper from '../tools/Helper';

export default class Div extends Tag {

    constructor(id, clazz) {
        super('div');

        this.set('id', id || Helper.random());
        this.set('class', clazz);
    }

}