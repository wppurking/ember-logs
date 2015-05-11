# 目的
用于练习 Ember.js + Rails 的组合的 demo 应用及寻坑

# Tech stack(import point):

* ember-cli : ember.js 开发的工具集 (类似 rails 的 generate)
 - ember.js : 核心 ember.js 前端开发框架
 - ember-data : ember.js 中独立的前端与后端数据交互, 数据缓存等等的问题的库
 - foundation 5 : 响应式优先的前端 Sass 编写的库文件.
 - es6 transpiler : es6 特性提前使用
 - sass : 前端 css 的预处理编译器
 - npm : node.js 后端 JavaScript 包依赖管理工具. (主要 ember-cli 自己使用)
 - bower : JavaScript 前端包管理工具, ember-cli 中开发人员重点使用. (例如 foundation 5 利用 bower 将依赖下载回来)
* rails : 后端开发框架
 - active_model_serializers : rails 中用于处理数据 json 序列化问题的 gem
 
 
# 记录:

## [x]对 es6 transpiler 现在的使用情况?
现在 es6 transpiler 的使用还是挺有限的, 但现在所需要的也就是[ 22 个特性](https://babeljs.io/docs/learn-es6/#classes)中的 6 个重点特性, 其他的现在都无所谓, 重点特性如下

 * arrays: 用于闭包函数的简写方法, 使用 () => {} 来代替 function() {}
 * template string: 类似 ruby 中的 string interpolation. 使用 \`hello ${a}\` 代替 "hello " + a;
 * let + const: 代替 var 的 let , 变量当前语句\[块作用域\];  const, 和 let 类似但只读. (var 是函数级作用域)
 * promises: 非常重要的一个对象, 但简单到只有两个函数: then(onFulfilled, onRejected), catch(onRejected)
 * modules: 另外一个非常重要的模块化特性, ember-cli 中利用 [AMD](http://requirejs.org/docs/why.html) 来在 ES5 中实现.
 * enhanced object literals: 这个已经在 ember.js 中应用了. 简化在一个地方: 
   
   ```javascript
   b = {
     a: function {
      console.log('a');
     }
     // 被替换成.
     // - 在 Ember.js 中定义 property() 则无法也不要用这种写法
     // - 在 router.js 文件中, export default Router.map() 无法享受这样写法, 原因不知
     b() {
       console.log('b');
     }
   }
   ```
   
## [x]ember.js 与 rails api 之间的 [cors](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) 问题?
这个问题其实就是在浏览器中运行的 JavaScript 的跨域安全问题, 如果一定需要部署一个 API 服务器给 Ember.js 进行跨域独立进行, 则需要服务器返回一系列的 Header 头信息和应对处理 Options 代替 HTTP Verb 中的 GET/PUT 请求.
所以自己为了简便, 以及实际情况 Ember.js 与 rails api 并不会在两个域名下, 所以开发环境使用 ember-cli 提供的 `ember server --proxy http://localhost:3000` 解决了(ember-cli 已经想到这个事情了)

## [x]ember.js 与 rails api 交换数据的问题?
在 rails 中用于与 ember.js 交换数据的 gem 最佳使用 active_model_serializers, 因为 DS.ActiveModelAdapter 原生支持(内部关系就是好), 其用于将 ruby 领域里面喜欢使用的 underscored 代码编写方式替换成 JavaScript 中的 camelCasing 形式

## [x]ember.js 与 rails api 和 json-api 的问题?
现在 ember.js 中的 DS.ActiveModelAdapter 还并不是 json-api:format, 现在还是在 rails 中比较常见的生成方法. 看着 json-api:format 的确是有点难搞, 但 ember.js 为了统一与外部 json api 的交互, 他们起草的这个规范的确有必要,
不过 active_model_serializers 0.9 系列也已经开始支持 json-api:format 了, 所以也不用担心. 在现在这个时机, 使用 active_model_serializers 0.8-stable 分支和 DS.ActiveModelAdapter 足够.

## [x]SPA 应用第一次访问的初始化加载的问题?
现在 ember.js 正在着力开发 [FastBoot](https://github.com/tildeio/ember-cli-fastboot) [INSIDE FASTBOOT(1)](http://emberjs.com/blog/2014/12/22/inside-fastboot-the-road-to-server-side-rendering.html) [INSIDE FASTBOOT(2)](http://emberjs.com/blog/2015/01/08/inside-fastboot-faking-the-dom-in-node.html) 这个可以解决这个问题(看看 Discourse 中首次 URL 访问的 Preload js 数据), 所以现在可以不用自己担心在这个方向, 因为整个社区的大方向是这样.
但现在需要一个过度方案, 现在的过度方案可以学的 Gmail 应用的首次访问的 js 加载进度条以及 js,css 文件访问 CDN 加速方案.
以下是这个方案比较有用的参考链接:
[Experimentally verified: "Why client-side templating is wrong"](http://www.onebigfluke.com/2015/01/experimentally-verified-why-client-side.html?m=1)
[You’re Missing the Point of Server-Side Rendered JavaScript Apps](http://tomdale.net/2015/02/youre-missing-the-point-of-server-side-rendered-javascript-apps/)
[Ember 2.0 and the Indie Web with Yehuda Katz and Tom Dale](https://frontsidethepodcast.simplecast.fm/16)


## [x]ember.js 中 Component 数量大, 重绘制速度慢的问题?
这个问题与我实现 todo item 的功能操作有关, 当自己测试将 todo item 量添加到大概 50 个左右的时候, 每一次改变其中一个 todo item 的 component 的值的时候, 整个 {{#each}} 中的所有 component 都重新计算一次, 
现在还不清楚为什么整个 {{#each}} 中所有 component 都需要重算一次? 但如果后续还有如此的需求, 这样实现肯定是有性能问题的(需要观察正在进行中的新 Ember.js Dom Diff 渲染引擎会有多大改善)
[Glimmer Engine](https://github.com/emberjs/ember.js/pull/10501)果然是非常快[isemberfastyet](https://www.isemberfastyet.com/) [dbmonster](https://dbmonster.firebaseapp.com/)

## [x]ember-cli server 中编译文件现在是全部重新编译, 项目越大文件越多会越慢?
这个暂时在使用 ember-cli 的时候没有办法解决, 不过好在 ember-cli 在来临的 v1.0.0 版本着手解决这个问题了, 见 [issue 2371](https://github.com/ember-cli/ember-cli/issues/2371), 所以这个什么都不用做, 等着 ember-cli 社区完成后对 ember-cli 更新即可.

## [x]ember.js 处理 rails 过来的 Validation errors 问题?
ember.js 中使用 DS.Errors 来封装的 model 中的各项错误, 不愧是来自 jQuery, Rails 社区的 Yehuda Katz 将好东西直接拿过了, 与 Rails 中的 Errors 处理基本上一个模子. 借用了 js 原生的 Error class 然后封装成 DS.Errors, 当 DS.Model 进行 save/update 等方法执行错误后需要满足两个条件则会自动解析内容并且填充到 DS.Model.errors 中, 其就是 DS.Errors 实例.
第一: 要求服务器端返回[ 422 错误](https://tools.ietf.org/html/rfc4918#section-11.2), 第二: 返回的结果是 {attribute: [...message]}. 错误填充到 DS.Model.errors 然后在页面上可以 DS.Model.errors.username 获取展示错误以及通过 DS.Model.errors.messages 展示全部错误信息.

## [x]ember.js 与 rails 之间如何进行数据批量保存/更新?
现在刚刚熟悉 ember.js 的时候要编写批量保存的时候, 思路是想着在页面上为 checkbox 设置自己的 name 属性进行提交, 但实际上应该将提交的属性名字交由 ES.Model 去处理. 我没有在 Ember Data 中找到这样对批量更新的支持, 所以两种方式:
第一种, 将批量变为借用 Ember Data 的 Model 中每一个的 save. 第二种通过 Ember Data 的 Model 收集数据, 然后 Ember.$.ajax 进行自行提交, 但需要自行处理 DS.Model.isDrity 的问题.

## 使用 ember-data 如何处理分页的问题?
这个问题从 ruby-china 上的一个问题引发过来的, 开始自己还没想到这. 
找到的一个分页例子代码: [Pagination with Ember](http://hawkins.io/2013/07/pagination-with-ember/)

## [x]ember.js 中通过 Ajax 请求超时后怎么办?
这个学习 Gmail 的应用, 所有需要应对远程的请求, 先进行网络处理并带有非阻拦式的提示处理框, 当成功后页面 UI 做响应处理. 其次出现网络问题, 在页面给予提示处理. (Ajax 体验类型的问题, 都可以参考 Gmail 这个 SPA Web App)
[现在代码中是尝试的先 UI 响应, 再网络处理, 失败则 rollback 的处理方法]

## [x]将 ember.js 与 rails 部署在不同的地区, 使他们响应时间延长所出现的问题?
当 ember.js ajax 到 api 的时间在 400ms 以上的时候用户有明显的感觉, 最优的应该是控制在 200~300ms 之间, 就算有延时用户也感觉很迅速. 这个问题分两块思考, 第一是 api 后面的本身的计算问题: 这个问题除非后端出现 db 或者自己代码编写的问题会产生延迟, 如果在没有 view render 的情况下还有 300ms 的时间那么这个 api 则是有问题的.
第二是 ember.js 与 api 之间的物理网络问题, 这个是一定要想办法控制住的, api 的服务器一定需要尽可能的离客户比较近. 例如中国, 要控制服务器在全国 ping 值常规在 200ms 以内即可(例如到香港,或者国内阿里云), 链接到美国则需要控制机房地址.  

当响应时间变长的时候引发另外的一个问题, 对 action 触发的事件, 是需要做重复提交处理的, 现在检查 Gmail 的邮件搜索等等功能都没有做处理因为其并非创建处理, 这个不处理可以理解, 但最重要的是要避免重复创建提交(例如快速回车重复创建 task 是可能的), 这个则需要对所操作的 action 进行 rails 中的 disabled-with 处理. 
当响应时间变长的时候引发第三个问题, 对于网络链接时间要拥有一个时间控制, 当连接的时间超过某个时间需要对用户进行提示, 并且超过某个阀值后需要对网络做 cancel 或者重试, 类似 Gmail 中每个请求有 timeout, 同样每个请求有自动 retry 以及多次 retry 的间隔时间变长. 这个应该在 ember.js 所依赖的 jQuery 的 ajax 操作中处理.


## [x]在 ember.js 中如何使用第三方的需要全局变量的库文件?
因为 ember-cli 的 resolver 机制, 所有的库文件默认是不会污染 global 空间的, 这个对原来 Ember 定义 Controller, Router, Model 等等都是放在顶层空间非常不一样, 这种方法也成为 Ember 2.0 的处理方法.
但还是会有一下现在的 JavaScript 库文件没有使用这样的模块化, 需要使用到 global 空间, 那么 ember-cli 也提供了这种方法, 将需要放在 global 空间中的类名添加到 .jshintrc 中并且设置为 true `{"predef": [..., "Ember", "$", "Cookies"]}` 详细解释在 [stackoverflow](http://stackoverflow.com/questions/24312362/ember-cli-fix-for-ember-is-not-defined)

## [x]在 ember.js 中使用的 Promise
在 ember 中, 非常多的地方使用到 Promise, 那么理解 Promise 非常重要. 参看两个链接, 一个[中文](http://www.html-js.com/article/Learn-JavaScript-every-day-to-understand-what-JavaScript-Promises)一个[英文](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise).
[例子代码](http://jsbin.com/IkaS/1/edit?html,js,output)

### 四个状态:
* pending: initial state, not fulfilled or rejected
* fulfilled: successful operation
* rejected: failed operation
* settled: the Promise is either fulfilled or rejected, but not pending.

### 两个参数
* resolve: fulfilled 状态需要调用的方法
* reject: rejected 需要调用的方法

### 两个方法
* then: Appends fulfillment and rejection handlers to the promise, and returns a new promise resolving to the return value of the called handler
* catch: Appends a rejection handler callback to the promise, and returns a new promise resolving to the return value of the callback if it is called, or to its original fulfillment value if the promise is instead fulfilled

## ember-cli 前端如何处理权限以及验证的问题?
如果需要很多部分进行合作处理, 并且在参考了多个建立在 Ember 1.x 版本中的例子[ember-simple-auth](https://github.com/simplabs/ember-simple-auth) 以及 [torii](https://github.com/vestorly/torii). 下面是主要的思路:
1. 需要使用 Service 在多个不同的上下文 Context 中共享一些用户登陆的信息, 并且需要自己处理用户体验方面的功能.
2. 在 template 中需要使用到重复字段的时候, 需要使用到 Ember.Mixin. Ember 中专门用于共享页面上下文字段功能
3. 根据所需要的功能, 将 Ember.Mixin 引入到 Router(在 beforeModel 中拦截请求) , Controller(在各种 Controller 里面共享变量) 上, 为需要进行验证的 Route 与 Controller 添加特性.

## SPA 应用中的实时交互问题及 ember.js + socket.io 的问题? 
TODO 有思路以及方向, 但还需要具体方案在以及 demo 去实践, 寻找坑填坑.

## ember.js 应用如何使用 socket.io 与 rails 结合起来组成实时信息推送的问题?
TODO rails -> redis pub,  redis sub -> socket.io -> ember.js?

## ember-cli 中在开发环境中不断出现的 Content Security Policy violation 提示还不知道如何解决?
TODO ember-cli 提示我有一些内容有安全问题, 但我现在还不知道如何解决.

## 产品环境如何部署 ember-cli, socket.io, rails ?
TODO 难道使用 docker 将三个东西打包到一起进行更新?
