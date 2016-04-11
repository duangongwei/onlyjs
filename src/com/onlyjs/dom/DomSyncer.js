import DomHelper from './DomHelper';

export default class DomSyncer {

    static synChildren(tag, node, doc) {
        let tagChildren = tag.children;
        let nodeChildren = node.childNodes;
        if (!tagChildren && !nodeChildren) {
            return;
        }
        if (!tagChildren && nodeChildren) {
            for (let i in nodeChildren) {
                node.removeChild(nodeChildren[i]);
            }
            return;
        }
        if (tagChildren && !nodeChildren) {
            node.appendChild(DomHelper.createFragment(tagChildren, doc));
            return;
        }
        let equals = DomHelper.findEquals(tagChildren, nodeChildren);
        if (equals.length == 0) {
            for (let i in nodeChildren) {
                node.removeChild(nodeChildren[i]);
            }
            return;
        }
        if (equals.length == 2) {
            for (let i in nodeChildren) {
                if (i != equals[1]) {
                    node.removeChild(nodeChildren[i]);
                }
            }
            tagChildren.splice(equals[0], 1);
            node.appendChild(DomHelper.createFragment(tagChildren, doc));
            return;
        }
        let begin = equals[1], end = equals[equals.length - 1];
        for (let i = 0; i < begin; i++) {
            node.removeChild(nodeChildren[i]);
        }
        for (let i = end + 1; i < nodeChildren.length; i++) {
            node.removeChild(nodeChildren[i]);
        }
        begin = equals[0], end = equals[equals.length - 2];
        node.appendChild(DomHelper.createFragment(
            tagChildren.slice(0, begin)), doc);
        node.appendChild(DomHelper.createFragment(
            tagChildren.slice(end + 1, tagChildren.length)), doc);
    }

    static syncFromDom(doc, page) {
        page.findWith((tag)=> {
            if (!tag.get('id')) return true;

            let node = doc.getElementById(tag.get('id'));
            DomHelper.copyAttrsFromDom(node, tag);
            console.log('sync from dom: ' + tag);
            return true;
        }, page.html.body);
    }

    static syncToDom(page, doc) {
        page.findWith((tag)=> {
            if (!tag.get('id')) return true;

            let node = doc.getElementById(tag.get('id'));
            DomHelper.copyAttrsToDom(tag, node);
            console.log('sync to dom: ' + tag);
            return true;
        }, page.html.body);
    }

    static findWith(callback, parent) {
        if (!parent || !parent.children) return;

        let children = parent.childNodes;
        for (let i in children) {
            if (!callback(children[i])) {
                break;
            }
            DomSyncer.findWith(callback, children[i]);
        }
    }
}