import Tag from '../core/Tag'

export default class Link extends Tag {

    constructor(url) {
        super('link', true);
        this.set('type', 'text/css');
        this.set('rel', 'stylesheet');
        this.set('href', url || '');
    }

    href(val) {
        this.set('href', val);
        return this;
    }

    type(val) {
        this.set('type', val);
        return this;
    }

    rel(val) {
        this.set('rel', val);
        return this;
    }

    toString(formatted) {
        let attrStr = [''];
        for (let [key, val] of this.attrs) {
            attrStr.push([key, '="', val, '"'].join(''));
        }
        return `<${this.name}${attrStr.join(' ')}/>`;
    }
}