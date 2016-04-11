import DomAdapter from '../com/onlyjs/dom/DomAdapter';
import LoginListener from './LoginListener';

class App {
    constructor(name, page, listener) {
        this.name = name;
        this.page = page;
        this.listener = listener;
    }

    instance(){
        this.page = new this.page();
        this.listener = new this.listener();
    }
}
export default class Runner {

    constructor(cfg) {
        this.apps = new Map();
        this.load(cfg);
    }

    load(cfg) {
        for (let name in cfg) {

        }
    }

    start(name, win) {
        let app = this.cfg[name];
        if (!app) {
            console.error('cannot find config for app: %s', name);
            return;
        }
        win.document.addEventListener('DOMContentLoaded', ()=> {
            let page = new app.page();
            new DomAdapter(page, new app.listener(page), win.document);
        }, false);
    }

    static config(cfg) {
        return new Runner(cfg);
    }

}