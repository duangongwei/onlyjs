import fs from 'fs';
import cheerio from 'cheerio';
import parse5 from 'parse5';
import postcss from 'postcss';
import stylelint from 'stylelint';
import safe from 'postcss-safe-parser';
import reporter from 'postcss-reporter';
import breporter from 'postcss-browser-reporter';

import Stylesheet from '../core/Stylesheet';

const encoding = {encoding: 'utf8'};

const escape = function (str) {
    return str
        .replace(/[\r\n]/g, '')
        .replace(/\\/g, '\\\\')
        .replace(/["']/g, '\\"');
};

const parseRule = function (rule) {
    console.log(rule.name || rule.selector);
    let name = '';
    if (rule.type == 'atrule') {
        name = ['@', rule.name, ' ', rule.params].join('');
    } else if (rule.selector) {
        name = rule.selector;
    }
    if (typeof rule.nodes == 'undefined') {
        return [escape(name), undefined];
    }
    let obj = {};
    for (let pair of rule.nodes) {
        if (pair.type != 'decl' || !pair.value) {
            continue;
        }
        if (pair.important) {
            pair.value += ' !important';
        }
        obj[escape(pair.prop)] = escape(pair.value);
    }
    return [escape(name), obj];
};

const parseStylesheet = function (result) {
    let sheet = new Stylesheet();
    for (let rule of result.nodes) {
        if (rule.type == 'comment') {
            continue;
        }
        if (rule.type == 'rule') {
            sheet.add(parseRule(rule));
            continue;
        }
        if (rule.type == 'atrule') {
            let name = ['@', rule.name, ' ', rule.params];
            if (typeof rule.nodes == 'undefined') {
                sheet.add(escape(name.join('')));
                continue;
            }
            if (!rule.params) {
                sheet.add(parseRule(rule));
                continue;
            }
            let children = [];
            for (let item of rule.nodes) {
                if (item.type != 'comment') {
                    children.push(parseRule(item));
                }
            }
            sheet.add(name.join(''), children);
        }
    }
    return sheet;
};

export default class Parser {

    static parseHtml(file) {
        return cheerio.load(fs.readFileSync(file, encoding));
    }

    static parseHtml2(file) {
        return parse5.parse(fs.readFileSync(file, encoding));
    }

    static parseCss(file) {
        let source = fs.readFileSync(file, encoding);
        let result = postcss().process(source, {parser: safe});
        return parseStylesheet(result.root);
    }
}
