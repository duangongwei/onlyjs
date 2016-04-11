import Tag from '../core/Tag'
import Head from './Head';
import Body from './Body';

export default class Html extends Tag {

    constructor() {
        super('html', false);

        this.head = new Head();
        this.body = new Body();
        this.children.push(this.head);
        this.children.push(this.body);
    }

    xmlns(val) {
        this.set('xmlns', val);
        return this;
    }

    manifest(val) {
        this.set('manifest', val);
        return this;
    }

    toString(formatted) {
        let attrStr = [''];
        for (let [key, val] of this.attrs) {
            attrStr.push([key, '="', val, '"'].join(''));
        }
        let childStr = [];
        childStr.push(formatted ? '\n' : null);
        for (let child of this.children) {
            childStr.push(child.toString(formatted));
            childStr.push(formatted ? '\n' : null);
        }
        return `<${this.name}${attrStr.join(' ')}>${childStr.join('')}</${this.name}>`;
    }
}