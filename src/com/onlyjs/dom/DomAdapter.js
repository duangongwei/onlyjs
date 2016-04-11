import Link from '../tags/Link';
import Script from '../tags/Script';
import Event from '../core/Event';
import Tag from '../core/Tag';
import DomSyncer from './DomSyncer';
import DomHelper from './DomHelper';

export default class DomAdapter {

    constructor(document, page, listener) {
        this.doc = document;
        this.page = page;
        this.lsn = listener;

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
            DomSyncer.syncFromDom(self.doc, self.page);
            let event = new Event(e);
            let result = callback.apply(self.lsn, event);
            DomSyncer.syncToDom(self.page, self.doc);
        }
    }

    buildPage(page) {
        if (!page && !page.html) return;

        let head = this.createFragment(page.html.head.children);
        for (let item of page.cssUrls) {
            head.appendChild(this.createElement(new Link(item)));
        }
        this.doc.head.appendChild(head);

        let body = this.createFragment(page.html.body.children);
        for (let item of page.jsUrls) {
            body.appendChild(this.createElement(new Script(item)));
        }
        this.doc.body.appendChild(body);
    }

    createFragment(tag) {
        return DomHelper.createFragment(tag, this.doc);
    }

    createElement(tag) {
        return DomHelper.createElement(tag, this.doc);
    }
}