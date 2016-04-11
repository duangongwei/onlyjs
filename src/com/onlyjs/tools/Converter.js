import fs from 'fs';
import path from 'path';
import Parser from './Parser';
import Helper from './Helper';

const encoding = {encoding: 'utf8'};
const import_onlyjs = {name: 'onlyjs', from: 'onlyjs'};
const page_superclass = 'onlyjs.Page';
const style_superclass = 'onlyjs.Stylesheet';

const PageTemplate = function (name, headTags, bodyTags, imports, superclass) {
    return `import ${imports.name} from '${imports.from}';

export default class ${name} extends ${superclass} {

    constructor() {
        super('${name}');
        this.html.head.add(this.initHead());
        this.html.body.add(this.initBody());
    }

    initHead() {
        return ${headTags};
    }

    initBody() {
        return ${bodyTags};
    }
}`;
};

const StyleTemplate = function (name, rules, imports, superclass) {
    return `import ${imports.name} from '${imports.from}';

export default class ${name} extends ${superclass} {

    constructor() {
        super('${name}');
        this.add(this.initRules());
    }

    initRules() {
        return ${rules};
    }
}`;
};

export default class Converter {

    static generateHtml(page, target, formatted) {
        let file = path.resolve(target, page.name + '.html');
        fs.writeFileSync(file, page.toString(formatted));
    }

    static generateCss(style, target, formatted) {
        let file = path.resolve(target, style.name + '.css');
        fs.writeFileSync(file, style.toString(formatted));
    }

    static css2js(file, target, imports, superclass) {
        let name = path.basename(file, '.css');
        let className = Helper.camelcase(name);
        let css = fs.readFileSync(file, encoding);
        let sheet = Parser.parseCss(file);
        target = target || path.dirname(file);
        fs.writeFileSync(path.resolve(target, name + '.js'),
            StyleTemplate(
                className,
                Helper.sheet2str(sheet),
                imports || import_onlyjs,
                superclass || style_superclass));
    }

    static html2js(file, target, imports, superclass) {
        let name = path.basename(file, '.html');
        let className = Helper.camelcase(name);
        let page = Parser.parseHtml(file);
        target = target || path.dirname(file);
        fs.writeFileSync(path.resolve(target, name + '.js'),
            PageTemplate(
                className,
                Helper.page2str(page),
                imports || import_onlyjs,
                superclass || page_superclass));
    }
}