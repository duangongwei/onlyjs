const seed = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const default_size = 6;
const default_prefix = 'ojs_';

const rule2str = function (rule, str, layer) {
    str.push('\t'.repeat(layer));
    str.push('"', rule.name, '", {\n');
    let flag = true;
    for (let key in rule.obj) {
        if (flag) {
            flag = false;
        } else {
            str.push(',\n');
        }
        str.push('\t'.repeat(layer + 1));
        str.push('"', key, '": ');
        str.push('"', rule.obj[key], '"');
    }
    str.push('\n', '\t'.repeat(layer));
    str.push('}');
};

export default class Helper {

    static random(size, prefix, suffix) {
        let str = [prefix || default_prefix];
        size = size || default_size;
        for (let i = 0; i < size; i++) {
            str.push(seed.charAt(Math.floor(Math.random() * seed.length)));
        }
        str.push(suffix);
        return str.join('');
    }

    static camelcase(str) {
        return str
            .replace(/^[_.\- ]+/, '')
            .toLowerCase()
            .replace(/[_.\- ]+(\w|$)/g, function (m, p1) {
                return p1.toUpperCase();
            });
    };

    static serializeStyle(name, style) {
        let str = [name, '{'];
        for (let key in style) {
            str.push(key, ':', style[key], ';');
        }
        str.push('}');
        return str.join('');
    }

    static serializeTag(tag) {
        if (!tag.hasOwnProperty('name') || !tag.hasOwnProperty('attrs')) {
            return tag.toString();
        }
        let attrStr = [''];
        if (tag.attrs && tag.attrs.length != 0) {
            for (let [key, val] of tag.attrs) {
                attrStr.push([key, '="', val, '"'].join(''));
            }
        }
        let childStr = [];
        if (tag.children && tag.children.length != 0) {
            for (let child of tag.children) {
                childStr.push(Helper.serializeTag(child));
            }
        }
        return tag.single ? `<${tag.name}${attrStr.join(' ')}/>` :
            `<${tag.name}${attrStr.join(' ')}>${childStr.join('')}</${tag.name}>`;
    }

    static sheet2str(sheet) {
        let str = ['[\n'];
        let outer = true;
        for (let rule of sheet.rules) {
            if (outer) {
                outer = false;
            } else {
                str.push(',\n');
            }
            if (typeof rule.obj == 'undefined') {
                str.push('\t'.repeat(3));
                str.push('"', rule.name, '", {}');
                continue;
            }
            if (!(rule.obj instanceof Array)) {
                rule2str(rule, str, 3);
                continue;
            }
            str.push('\t'.repeat(3));
            str.push('"', rule.name, '", [\n');
            let inner = true;
            for (let item of rule.obj) {
                if (inner) {
                    inner = false;
                } else {
                    str.push(',\n');
                }
                if (item instanceof Array) {
                    item = {name: item[0], obj: item[1]};
                }
                rule2str(item, str, 4);
            }
            str.push('\n', '\t'.repeat(3));
            str.push(']');
        }
        str.push('\n', '\t'.repeat(2));
        str.push(']');
        return str.join('');
    };

    static page2str(page) {

    };

}