/**
 * 定义一条样式规则
 */
class Rule {
    constructor(name, obj) {
        this.name = name;
        this.obj = obj;
    }

    toString(formatted, layer) {
        let str = [];
        if (typeof this.obj == 'undefined') {
            str.push(this.name, ';');
            return str.join('');
        }
        str.push(formatted ? '\t'.repeat(layer) : null);
        str.push(this.name, ' {');
        str.push(formatted ? '\n' : null);
        for (let key in this.obj) {
            str.push(formatted ? '\t'.repeat(layer + 1) : null);
            str.push(key);
            str.push(formatted ? ': ' : ':');
            str.push(this.obj[key], ';');
            str.push(formatted ? '\n' : null);
        }
        str.push(formatted ? '\t'.repeat(layer) : null);
        str.push('}');
        return str.join('');
    }
}

/**
 * 样式表基类：可以对样式编程，继承并操作父类样式
 */
export default class Stylesheet {

    constructor(name) {
        this.name = name;
        this._idx = new Map();
        this.rules = new Array();
    }

    isEmpty() {
        return this._idx.size == 0;
    }

    add(name, obj) {
        if (name instanceof Array) {
            for (let i = 0; i < name.length; i += 2) {
                this._idx.set(name[i], this.rules.length);
                this.rules.push(new Rule(name[i], name[i + 1]));
            }
        } else {
            this._idx.set(name, this.rules.length);
            this.rules.push(new Rule(name, obj));
        }
        return this;
    }

    get(name) {
        return this._idx.has(name) ?
            this.rules[this._idx.get(name)].obj : null;
    }

    delete(name) {
        this.rules[this._idx.get(name)] = false;
        this._idx.delete(name);
        return this;
    }

    toString(formatted) {
        let str = [];
        let outerFlag = true;
        for (let rule of this.rules) {
            if (rule === false) {
                continue;
            }
            if (outerFlag) {
                outerFlag = false;
            } else {
                str.push(formatted ? '\n\n' : null);
            }
            if (rule.obj instanceof Array) {
                str.push(rule.name, ' {');
                for (let i = 0; i < rule.obj.length; i += 2) {
                    str.push(formatted ? '\n' : null);
                    let item = new Rule(rule.obj[i], rule.obj[i + 1]);
                    str.push(item.toString(formatted, 1));
                    str.push(formatted ? '\n' : null);
                }
                str.push('}');
            } else {
                str.push(rule.toString(formatted, 0));
            }
        }
        return str.join('');
    }

}