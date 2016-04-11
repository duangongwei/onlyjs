import Tag from '../core/Tag';
import Helper from '../tools/Helper';

export default class Col extends Tag {

    constructor(id, num) {
        super('div');

        this.set('id', id || Helper.random());
        this.set('class', 'col-md-' + num);
    }

}