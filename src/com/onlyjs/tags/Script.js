import Tag from '../core/Tag'

export default class Script extends Tag {

    constructor(url) {
        super('script');
        this.set('type', 'text/javascript');
        this.set('src', url || '');
    }

    content(val) {
        this.text = val;
        return this;
    }

    src(val) {
        this.set('src', val);
        return this;
    }

    type(val) {
        this.set('type', val);
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