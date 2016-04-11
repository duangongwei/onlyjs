import Tag from '../core/Tag';

export default class DomHelper {

    static createFragment(tag, doc) {
        let frag = doc.createDocumentFragment();
        if (!(tag instanceof Tag)) {
            return frag;
        }
        let node = DomHelper.createElement(tag, doc);
        frag.appendChild(node);
        for (let child of tag.children) {
            if (child.children && child.children.length != 0) {
                node.appendChild(DomHelper.createFragment(child, doc));
            } else {
                node.appendChild(DomHelper.createElement(child, doc));
            }
        }
        return frag;
    }

    static createElement(tag, doc) {
        if (!(tag instanceof Tag)) {
            return doc.createTextNode(tag.toString());
        }
        var node = doc.createElement(tag.name);
        for (let [attr, value] of tag.attrs) {
            if (!value) {
                continue;
            }
            if (typeof value == 'object') {
                let obj = node[attr];
                for (let key in value) {
                    obj[key] = value[key];
                }
            } else {
                node.setAttribute(attr, value);
            }
        }
        return node;
    }
}