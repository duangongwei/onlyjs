import Tag from '../core/Tag';

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

    static copyAttrs(tag, node) {
        for (let [attr, value] of tag.attrs) {
            if (!value) continue;

            if (typeof value == 'object') {
                let obj = node[attr];
                for (let key in value) {
                    obj[key] = value[key];
                }
            } else {
                node.setAttribute(attr, value);
            }
        }
    }
}