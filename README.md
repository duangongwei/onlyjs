# OnlyJS
A web development framework using only javascript

Based on the newest features of ES6 (modules, classes, inheritance, etc.), references to the Java Swing front-end development mode, to unify the web development to JavaScript (similar to Swing using pure Java), so that developers not need to write HTML, CSS, also they do not operate on the DOM, all functions are through the interaction between JavaScript objects.

## 核心思想
基于ES6最新特性（模块化、类、继承等），参考Java Swing前端开发模式，将Web开发统一到Javascript上（类似Swing的纯Java开发），让开发人员可以不用编写html、css，也不用操作DOM，一切功能都通过JS对象之间的交互来实现。

* 传统Web开发： 一个页面 = html文件(文档结构) + css文件(显示样式) + js文件(控制逻辑、数据处理)；
* 使用OnlyJS开发：
一个页面 = Page.js(组件化开发) + Stylesheet.js(分组样式) + Listener.js(用户交互) + Service.js(业务逻辑)；

样例代码：
* 创建一个登录页面：js/LoginPage.js (基于Bootstrap定制的组件库)
```
import Page from '../com/onlyjs/Page';
import Meta from '../com/onlyjs/tags/Meta';
import Input from '../theme/bootstrap/widgets/Input';
import Button from '../theme/bootstrap/widgets/Button';
import Form from '../theme/bootstrap/widgets/Form';
import Label from '../theme/bootstrap/widgets/Label';
import Group from '../theme/bootstrap/widgets/Group';
import Container from '../theme/bootstrap/widgets/Container';
import Alert from '../theme/bootstrap/widgets/Alert';
 
export default class LoginPage extends Page {

    constructor() {
        super('login');

        this.addHead(new Meta().charset('utf-8'))
            .addBody(this.loginPanel())
            .addCSS(['lib/bootstrap/css/bootstrap.css'])
            .addJS(['lib/jquery/jquery.js',
                'lib/bootstrap/js/bootstrap.js']);
    }

    loginPanel() {
        return new Container().style('width', '500px')
            .append(this.loginForm());
    }

    loginForm() {
        let userGrp = new Group()
            .append(new Label('userLabel', 'Username: '))
            .append(new Input('username', 'text'));
        let passGrp = new Group()
            .append(new Label('passLabel', 'Password: '))
            .append(new Input('password', 'password'));

        return new Form('loginForm')
            .append(new Alert('message').hide())
            .append(userGrp)
            .append(passGrp)
            .append(new Button('loginBtn', 'button', 'Sign in'));
    }
}
```
* 创建页面内部样式表：js/LoginStyle.js
```
import Stylesheet from '../com/onlyjs/Stylesheet';

export default class LoginStyle extends Stylesheet {

    constructor() {
        super('login');

        this.add(this.global())
            .add(this.loginForm());
    }

    global() {
        return [
            'body', {
                margin: '0px auto',
                padding: '0',
                'font-size': '14px'
            },
            'a', {
                color: '#aabbcc'
            },
            'a:link', {
                color: '#bbaacc'
            },
            'a:visited', {
                color: '$ccaabb'
            }
        ];
    }
 
    loginForm() {
        return [
            'form', {
                margin: '0',
                padding: '0'
            },
            'form input', {
                width: '260px'
            },
            'form .btn', {
                'background-color': 'green'
            }
        ]
    }
}
```
* 创建一个页面事件监听器：js/LoginListener.js
```
import Listener from '../com/onlyjs/Listener';

export default class LoginListener extends Listener {

    constructor(page) {
        super();

        this.page = page;
        this.register('loginBtn', 'click', this.login);
    }

    login(event) {
        let username = this.page.find('#username').get('value');
        let password = this.page.find('#password').get('value');
        let message = this.page.find('#message');
        if (username == 'admin' && password == 'admin') {
            message.type('success').text('Login successful.').show();
        } else {
            let text = 'Login failed, username or password is wrong.';
            message.type('danger').text(text).show();
        }
    }
}
```
