import Tag from '../core/Tag'

export default class Meta extends Tag {

    constructor() {
        super('meta', true);
    }

    equiv(val) {
        this.set('http-equiv', val);
        return this;
    }

    name(val) {
        this.set('name', val);
        return this;
    }

    content(val) {
        this.set('content', val);
        return this;
    }

    charset(val) {
        this.set('charset', val);
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