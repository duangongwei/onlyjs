import Tag from '../core/Tag'

export default class Body extends Tag {

    constructor() {
        super('body', false);
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