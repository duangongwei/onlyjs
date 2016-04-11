const own_attrs = [
    'id', 'name', 'type', 'value', 'title',
    'width', 'height', 'class', 'style', 'lang', 'dir'
];

const isEmpty = function (obj) {
    for (let key in obj) {
        return false;
    }
    return true;
};

/**
 * 文本节点类：使用append()添加的字符串默认会转为Text
 */
class Text {
    constructor(value, layer) {
        this.value = value;
        this.layer = layer || 0;
    }

    set(value) {
        this.value = value;
    }

    get() {
        return this.value;
    }

    toString(formatted) {
        let indent = formatted ? '\t'.repeat(this.layer) : '';
        return [indent, this.value].join('');
    }
}

/**
 * 标签基类：可以自定义任何标签，只支持属性设置、添加子标签
 */
export default class Tag {

    constructor(name, single, layer) {
        this.name = name || 'tag';
        this.single = single || false;
        this.layer = layer || 0;
        this.attrs = new Map();
        this.children = new Array();
        this.set('style', {});
    }

    get id(){
        return this.get('id');
    }

    style(key, val) {
        if (typeof key == 'undefined') {
            return this.get('style');
        }
        let obj = this.get('style');
        if (typeof key === 'object') {
            for (let k in key) {
                obj[k] = key[k];
            }
        } else {
            obj[key] = val;
        }
        return this;
    }

    value(val) {
        return this._simply('value', val);
    }

    text(val) {
        return this._simply('text', val);
    }

    _simply(attr, val) {
        if (typeof val == 'undefined') {
            return this.get(attr);
        }
        return this.set(attr, val);
    }

    set(attr, val) {
        if (typeof attr === 'object') {
            for (let k in attr) {
                this.attrs.set(key, attr[key]);
            }
        } else {
            this.attrs.set(attr, val);
        }
        return this;
    }

    get(attr) {
        return this.attrs.get(attr);
    }

    delete(attr) {
        this.attrs.delete(attr);
        return this;
    }

    clear() {
        this.children.length = 0;
        return this;
    }

    addClass(val) {
        let arr = this.get('class').split(/\s+/);
        if (arr.indexOf(val) == -1) {
            arr.push(val);
        }
        this.set('class', arr.join(' '));
        return this;
    }

    delClass(val) {
        let arr = this.get('class').split(/\s+/);
        if (arr.indexOf(val) != -1) {
            arr.splice(arr.indexOf(val), 1);
            this.set('class', arr.join(' '));
        }
        return this;
    }

    append(tag) {
        if (tag instanceof Array) {
            for (let item of tag) {
                this.children.push(item);
            }
        } else {
            if (!(tag instanceof Tag)) {
                tag = new Text(tag);
            }
            this.children.push(tag);
        }
        return this;
    }

    toString(formatted) {
        let attrStr = [''];
        for (let [key, val] of this.attrs) {
            if (typeof val == 'undefined') {
                continue;
            }
            if (own_attrs.indexOf(key) == -1) {
                continue;
            }
            if (typeof val == 'object' && isEmpty(val)) {
                continue;
            }
            attrStr.push([key, '="', val, '"'].join(''));
        }
        let childStr = [];
        let lIndent = formatted ? '\t'.repeat(this.layer) : '';
        let rIndent = '';
        if (this.children.length != 0 && formatted) {
            childStr.push('\n');
            rIndent = '\t'.repeat(this.layer);
        }
        for (let child of this.children) {
            child.layer = this.layer + 1;
            childStr.push(child.toString(formatted));
            childStr.push(formatted ? '\n' : null);
        }
        return this.single ? `${lIndent}<${this.name}${attrStr.join(' ')}/>` :
            `${lIndent}<${this.name}${attrStr.join(' ')}>${childStr.join('')}${rIndent}</${this.name}>`;
    }
}