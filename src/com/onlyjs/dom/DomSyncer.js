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

export default class DomSyncer {

    static syncFromDom(doc, page) {
        page.findWith((tag)=> {
            if (!tag.get('id')) return true;

            let node = doc.getElementById(tag.get('id'));
            for (let attr in dom_tag_mapper) {
                let value = node[attr];
                if (!value) {
                    continue;
                }
                if (typeof value == 'object') {
                    let obj = tag.get(dom_tag_mapper[attr]);
                    for (let key in value) {
                        obj[key] = value[key];
                    }
                } else {
                    tag.set(dom_tag_mapper[attr], value);
                }
            }
            console.log('sync from dom: ' + tag);
            return true;
        }, page.html.body);
    }

    static syncToDom(page, doc) {
        page.findWith((tag)=> {
            if (!tag.get('id')) return true;

            let node = doc.getElementById(tag.get('id'));
            for (let attr in tag_dom_mapper) {
                let value = tag.get(attr);
                if (typeof value == 'undefined') {
                    continue;
                }
                if (typeof value == 'object') {
                    let obj = node[tag_dom_mapper[attr]];
                    for (let key in value) {
                        obj[key] = value[key];
                    }
                } else {
                    node[tag_dom_mapper[attr]] = value;
                }
            }
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