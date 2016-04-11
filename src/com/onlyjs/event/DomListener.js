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

export default class DomListener {

    constructor(document, eventBus) {
        this.doc = document;
        this.ebus = eventBus;

        let self = this;
        this.ebus.register('refresh', (event)=> {
            self.refreshHandler(event);
        });
        this.ebus.register('bind', (event)=> {
            self.bindHandler(event);
        });
        this.ebus.register('unbind', (event)=> {
            self.unbindHandler(event);
        });
    }

    bindHandler(event) {
        let self = this;
        for (let [id, types] of event.data) {
            let node = this.doc.getElementById(id);
            for (let type of types) {
                node['on' + type] = ()=> {
                    self.ebus.send('active', id, type);
                };
            }
            console.log('bind: ' + node.id);
        }
    }

    unbindHandler(event) {
        let self = this;
        for (let [id, types] of event.data) {
            let node = this.doc.getElementById(id);
            for (let type of types) {
                node['on' + type] = undefined;
            }
            console.log('unbind: ' + node.id);
        }
    }

    refreshHandler(event) {
        let tag = event.target;
        let node = this.doc.getElementById(tag.get('id'));
        this.copyAttrsToDom(tag, node);
    }

    compareNode(tag, node) {
        for (let child of tag.children) {
            for (let item of node.children) {
                if (child.id == item.id) {
                    this.copyAttrsToDom(child, item);
                }

            }
        }
    }

    compareChildren(tags, nodes) {
        let added = [];
        let removed = [];
        let tagIds = [];
        let nodeIds = [];
        for (let tag of tags) {
            tagIds.push(tag.get('id'));
        }
        for (let node of nodes) {
            nodeIds.push(node.id);
        }

    }

    copyAttrsToDom(tag, node) {
        for (let attr in tag_dom_mapper) {
            let value = tag.get(attr);
            if (value === node[attr]) {
                continue;
            }
            if (typeof value == 'object') {
                let obj = node[tag_dom_mapper[attr]];
                for (let key in value) {
                    if (obj[key] !== value[key]) {
                        obj[key] = value[key];
                    }
                }
            } else {
                node[attr] = tag.get(attr);
            }
        }
    }

}