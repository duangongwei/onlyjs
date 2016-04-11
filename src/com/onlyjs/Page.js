import Html from './tags/Html';
import Link from './tags/Link';
import Script from './tags/Script';
import Style from './tags/Style';
import Tag from './core/Tag';
import Stylesheet from './core/Stylesheet';

const default_doctype = '<!DOCTYPE html>';

const nicely = function (result) {
    return result.length == 0 ? null :
        result.length == 1 ? result[0] : result;
};

export default class Page {

    constructor(name, html, style) {
        this.name = name;
        this.html = html || new Html();
        this.style = style || new Stylesheet(name);
        this.doctype = default_doctype;
        this.cssUrls = new Array();
        this.jsUrls = new Array();
    }

    loaded() {

    }

    unloaded() {

    }

    find(keyword, parent) {
        if (keyword.charAt(0) == '#') {
            return this.findById(keyword.slice(1), parent);
        }
        if (keyword.charAt(0) == '.') {
            return this.findByClass(keyword.slice(1), parent);
        }
        return this.findByTag(keyword, parent);
    }

    findWith(callback, parent) {
        if (!parent || !parent.children) return;

        for (let child of parent.children) {
            if (!(child instanceof Tag)) {
                continue;
            }
            if (!callback(child)) {
                break;
            }
            this.findWith(callback, child);
        }
    }

    findById(id, parent) {
        let result = null;
        this.findWith((tag)=> {
            if (tag.get('id') === id) {
                result = tag;
                return false;
            }
            return true;
        }, parent || this.html.body);
        return result;
    }

    findByClass(clazz) {
        let result = [];
        this.findWith((tag)=> {
            if (tag.get('class').indexOf(clazz) != -1) {
                result.push(tag);
            }
            return true;
        }, parent || this.html.body);
        return nicely(result);
    }

    findByTag(name) {
        let result = [];
        this.findWith((tag)=> {
            if (tag.name == name) {
                result.push(tag);
            }
            return true;
        }, parent || this.html.body);
        return nicely(result);
    }

    addHead(tag) {
        this.html.head.append(tag);
        return this;
    }

    addBody(tag) {
        this.html.body.append(tag);
        return this;
    }

    addCSS(url) {
        if (url instanceof Array) {
            for (let item of url) {
                this.cssUrls.push(item);
            }
        } else {
            this.cssUrls.push(url);
        }
        return this;
    }

    addJS(url) {
        if (url instanceof Array) {
            for (let item of url) {
                this.jsUrls.push(item);
            }
        } else {
            this.jsUrls.push(url);
        }
        return this;
    }

    toString(formatted) {
        let root = new Html();
        root.attrs = this.html.attrs;
        root.head.attrs = this.html.head.attrs;
        root.head.append(this.html.head.children);
        root.body.attrs = this.html.body.attrs;
        root.body.append(this.html.body.children);

        for (let url of this.cssUrls) {
            root.head.append(new Link(url));
        }
        if (!this.style.isEmpty()) {
            root.head.append(new Style(this.style.toString(formatted)));
        }
        for (let url of this.jsUrls) {
            root.body.append(new Script(url));
        }
        return [this.doctype, root.toString(formatted)].join(formatted ? '\n' : '');
    }
}
