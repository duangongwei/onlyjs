/**
 * DOM上下文对象，提供操作浏览器内置对象的常用API
 */
export default class DomContext {

    constructor(window, screen) {
        this._win = window;
        this._scr = screen;
        this._doc = window.document;
        this._loc = window.location;
        this._hist = window.history;
        this._nav = window.navigator;
    }

    open(url, name, features, replace) {
        return this._win.open(url, name, features, replace);
    }

    close() {
        this._win.close();
    }

    focus() {
        this._win.focus();
    }

    redirect(url) {
        this._loc.href = url;
    }

    reload(force) {
        this._loc.reload(force);
    }

    replace(url) {
        this._loc.replace(url);
    }

    back() {
        this._hist.back();
    }

    forward() {
        this._hist.forward();
    }

    go(number) {
        this._hist.go(number);
    }

    window() {
        return {
            name: this._win.name,
            status: this._win.status,
            closed: this._win.closed,
            innerHeight: this._win.innerHeight,
            innerWidth: this._win.innerWidth,
            outerHeight: this._win.outerHeight,
            outerWidth: this._win.outerWidth,
            pageXOffset: this._win.pageXOffset,
            pageYOffset: this._win.pageYOffset,
            screenLeft: this._win.screenLeft,
            screenTop: this._win.screenTop,
            screenX: this._win.scrollX,
            screenY: this._win.scrollY,
        }
    }

    location() {
        return {
            hash: this._loc.hash,
            host: this._loc.host,
            hostname: this._loc.hostname,
            href: this._loc.href,
            pathname: this._loc.pathname,
            port: this._loc.port,
            protocol: this._loc.protocol,
            search: this._loc.search
        };
    }

    document() {
        return {
            cookie: this._doc.cookie,
            domain: this._doc.domain,
            title: this._doc.title,
            referrer: this._doc.referrer,
            url: this._doc.URL,
            lastModified: this._doc.lastModified
        }
    }

    navigator() {
        return {
            userAgent: this._nav.userAgent,
            platform: this._nav.platform,
            appName: this._nav.appName,
            appCodeName: this._nav.appCodeName,
            appVersion: this._nav.appVersion,
            systemLanguage: this._nav.systemLanguage
        };
    }

    screen() {
        return {
            width: this._scr.width,
            height: this._scr.height,
            availHeight: this._scr.availHeight,
            availWidth: this._scr.availWidth,
            updateInterval: this._scr.updateInterval,
            pixelDepth: this._scr.pixelDepth,
            deviceXDPI: this._scr.deviceXDPI,
            deviceYDPI: this._scr.deviceYDPI,
            logicalXDPI: this._scr.logicalXDPI,
            logicalYDPI: this._scr.logicalYDPI
        };
    }

}