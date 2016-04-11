import Tag from '../core/Tag'

export default class Style extends Tag {

    constructor(text) {
        super('style');
        this.set('type', 'text/css');
        this.text = text;
    }

    content(val) {
        this.text = val;
        return this;
    }

    toString(formatted) {
        let attrStr = [''];
        for (let [key, val] of this.attrs) {
            attrStr.push([key, '="', val, '"'].join(''));
        }
        let childStr = [];
        if (this.text) {
            childStr.push(formatted ? '\n' : null);
            childStr.push(this.text);
            childStr.push(formatted ? '\n' : null);
        }
        return `<${this.name}${attrStr.join(' ')}>${childStr.join('')}</${this.name}>`;
    }
}