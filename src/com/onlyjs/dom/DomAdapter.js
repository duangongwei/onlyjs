import Link from '../tags/Link';
import Script from '../tags/Script';
import Event from '../core/Event';
import Tag from '../core/Tag';
import DomSyncer from './DomSyncer';
import DomHelper from './DomHelper';

export default class DomAdapter {

    constructor(document, page, listener) {
        this.doc = document;
        this.switchPage(page, listener);
    }

    switchPage(page, listener) {
        this.destroyPage(this.page);
        this.unbindEvents(this.listener);

        this.buildPage(page);
        this.bindEvents(listener);
    }

    bindEvents(listener) {
        if (!listener && !listener.events) return;

        for (let [id, handlers] of listener.events) {
            let node = this.doc.getElementById(id);
            for (let [type, callbacks] of handlers) {
                for (let cb of callbacks) {
                    node['on' + type] = this.transformHandler(cb);
                }
            }
            console.log('bind: ' + node.id);
        }
        this.listener = listener;
    }

    unbindEvents(listener) {
        if (!listener && !listener.events) return;

        for (let [id, handlers] of listener.events) {
            let node = this.doc.getElementById(id);
            for (let [type, callbacks] of handlers) {
                for (let cb of callbacks) {
                    node['on' + type] = undefined;
                }
            }
            console.log('unbind: ' + node.id);
        }
    }

    transformHandler(callback) {
        let self = this;
        return (e)=> {
            DomSyncer.syncToPage(self.doc, self.page);
            let event = new Event(e);
            let result = callback.apply(self.listener, event);
            if (event.render()) {

            }
            DomSyncer.syncToDoc(self.page, self.doc);
        }
    }

    destroyPage(page) {
        this.doc.head.children.length = 0;
        this.doc.body.children.length = 0;
    }

    buildPage(page) {
        if (!page && !page.html) return;

        let head = this.createFragment(null);
        for (let child of page.html.head.children) {
            head.appendChild(this.createFragment(child));
        }
        for (let item of page.cssUrls) {
            head.appendChild(this.createElement(new Link(item)));
        }
        this.doc.head.appendChild(head);

        let body = this.createFragment(null);
        for (let child of page.html.body.children) {
            body.appendChild(this.createFragment(child));
        }
        for (let item of page.jsUrls) {
            body.appendChild(this.createElement(new Script(item)));
        }
        this.doc.body.appendChild(body);

        this.page = page;
    }

    createFragment(tag) {
        return DomHelper.createFragment(tag, this.doc);
    }

    createElement(tag) {
        return DomHelper.createElement(tag, this.doc);
    }
}