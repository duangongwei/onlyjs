# OnlyJS
A framework let you only use javascript to develop Web application.

Based on the newest features of ES6 (modules, classes, inheritance, etc.), references to the Java Swing front-end development mode, to unify the web development to JavaScript (similar to Swing using pure Java), so that developers do not need to write HTML, CSS, and to operate on the DOM too, all functions can be implemented through the interaction between JavaScript objects, all the JS code you written can run out of browser (that is, the code can run in a variety of terminal).

### 核心思想
基于ES6最新特性（模块化、类、继承等），参考Java Swing前端开发模式，将Web开发统一到Javascript上（类似Swing的纯Java开发），让开发人员可以`不用编写HTML、CSS，也不用操作DOM`，一切功能都通过JS对象之间的交互来实现，所有JS代码都可以脱离浏览器运行（一套代码可以运行在多种终端）。

### 关键特性
* 纯JS开发，不用写一行html代码（css也可以用JS来写），真正的用面向对象思维去开发Web应用；
* 前端代码全部用JS类（ES6特性）封装，继承和重用变得如此Easy；
* 所有Html标签全部映射为JS组件，组件自身就是可编程的，不用再定义模板；
* 纯组件化开发模式，组件的扩展和复用更加简便，开发页面就像搭积木；
* 采用虚拟DOM技术，不用再手工操作DOM元素，编写的代码可以脱离浏览器运行，让前端测试更简单；
* 强大的代码转换工具，可以将html、css、Java代码转换为JS，同时支持将Swing开发的视图转换为Web页面；

### 架构图
![OnlyJS Architecture ](./assets/img/onlyjs_arch.png)

### 开发模式
* **传统Web开发**： 
一个页面 = html文件(文档结构) + css文件(显示样式) + js文件(控制逻辑、数据处理)；
* **使用OnlyJS开发**：
一个页面 = Page.js(组件化开发) + Stylesheet.js(分组样式) + Listener.js(用户交互) + Service.js(业务逻辑)；

### 样例代码：
1）创建一个登录页面：LoginPage.js (基于Bootstrap定制的组件库)
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
2）创建页面内部样式表：LoginStyle.js
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
3）创建一个页面事件监听器：LoginListener.js
```
import Listener from '../com/onlyjs/Listener';

export default class LoginListener extends Listener {

    constructor(page) {
        super();

        this.page = page;
        this.register('loginBtn', 'click', this.login);
    }

    login(event) {
        let username = this.page.find('#username').value();
        let password = this.page.find('#password').value();
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
