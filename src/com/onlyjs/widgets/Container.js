import Tag from '../core/Tag';
import Helper from '../tools/Helper';

export default class Container extends Tag {

    constructor(id) {
        super('div');

        this.set('id', id || Helper.random());
        this.set('class', 'container');
    }

}