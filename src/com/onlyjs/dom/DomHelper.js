import Tag from '../core/Tag';

const dom_tag_mapper = {
    'value': 'value',
    'width': 'width',
    'height': 'height',
    'clientHeight': 'clientHeight',
    'clientWidth': 'clientWidth',
    'scrollHeight': 'scrollHeight',
    'scrollWidth': 'scrollWidth',
    'scrollLeft': 'scrollLeft',
    'scrollTop': 'scrollTop',
    'offsetHeight': 'offsetHeight',
    'offsetWidth': 'offsetWidth',
    'offsetLeft': 'offsetLeft',
    'offsetTop': 'offsetTop'
};

const tag_dom_mapper = {
    'id': 'id',
    'name': 'name',
    'type': 'type',
    'value': 'value',
    'width': 'width',
    'height': 'height',
    'title': 'title',
    'lang': 'lang',
    'dir': 'dir',
    'class': 'className',
    'text': 'innerText'
};

export default class DomHelper {

    static createFragment(tag, doc) {
        let frag = doc.createDocumentFragment();
        if (tag instanceof Array) {
            for (let child of tag) {
                frag.appendChild(DomHelper.createElement(child, doc));
            }
        } else if (tag instanceof Tag) {
            frag.appendChild(DomHelper.createElement(tag, doc));
        }
        return frag;
    }

    static createElement(tag, doc) {
        if (!(tag instanceof Tag)) {
            return doc.createTextNode(tag.toString());
        }
        var node = doc.createElement(tag.name);
        DomHelper.copyAttrs(tag, node);
        if (tag.children && tag.children.length != 0) {
            for (let child of tag.children) {
                node.appendChild(DomHelper.createElement(child, doc));
            }
        }
        return node;
    }

    static copyAttrsToDom(tag, node) {
        for (let attr in tag_dom_mapper) {
            let value = tag.get(attr);
            if (typeof value == 'undefined') continue;

            let nodeAttr = tag_dom_mapper[attr];
            if (typeof value == 'object') {
                let obj = node[nodeAttr];
                for (let key in value) {
                    obj[key] = value[key];
                }
            } else {
                node[nodeAttr] = value;
            }
        }
    }

    static copyAttrsFromDom(node, tag) {
        for (let attr in dom_tag_mapper) {
            let value = node[attr];
            if (!value) continue;

            let tagAttr = dom_tag_mapper[attr];
            if (typeof value == 'object') {
                let obj = tag.get(tagAttr);
                for (let key in value) {
                    obj[key] = value[key];
                }
            } else {
                tag.set(tagAttr, value);
            }
        }
    }

    static findEquals(tags, nodes) {
        let equals = [];
        let hasFound = false;
        for (let i = 0; i < tags.length; i++) {
            let thisTime = false;
            let tagId = tags[i].get('id');
            for (let j = 0; j < nodes.length; j++) {
                if (tagId == nodes[j].id) {
                    equals.push(i, j);
                    thisTime = true;
                    break;
                }
            }
            if (hasFound && !thisTime) {
                break;
            }
            hasFound = thisTime;
        }
        return equals;
    }
}