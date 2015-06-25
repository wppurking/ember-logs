# 目的
用于练习 Ember.js + Rails 的组合的 demo 应用及寻坑

# ember stack
ember.js 社区的变化太快了, 从 ember stack 大的方向来说, 已经从 ember.js 已经成长到了 [ember.js](https://github.com/emberjs/ember.js), [ember-data](https://github.com/emberjs/data), [ember-cli](https://github.com/ember-cli/ember-cli), [Liquid Fire](https://github.com/ef4/liquid-fire), [List View](https://github.com/emberjs/list-view) 5 个套间的统一版本发布.
从 ember.js 这一个项目看, 在其进入 ember.js 1.12 后变化越来越快, 新的 render enging 新的 component 语法, 新的 action 语法(嵌套), 以及即将到来的 routable component.  因为这些变化, 使得我记录在下面的没有办法那么快的更新, 同时我也只能记录与特性无关的思路性的内容. 开始拥抱 ember.js 吧, 从 ember.js-1.13 开始.

PS:
* [List View](http://talks.erikbryn.com/ember-list-view/), 用于处理大量 Dom 在页面便利的问题, 避免内存溢出.
* Liquid Fire, transition 的动画效果.


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

cors 在 rails 中的应用可以直接使用 [rack-cors](https://github.com/cyu/rack-cors), 然后具体使用例子可参考 ruby-china [#263](https://github.com/ruby-china/ruby-china/pull/263)


## [x]ember.js 与 rails api 交换数据的问题 (json-api)?
现在(2015.6.18) ember-data 已经随着 ember.js 的版本发布了 ember-data 1.13, 同时 json-api 的规范中的 API 也进入稳定的 1.0.  ember-data 也将特定针对 ActiveModelSerialzer 的 Adatper 挪进了 addon 不再进行内置提供. 鼓励大家直接使用 json-api adapter.
站在 rails 项目的角度, rails 5 将发 rails --api ([#19832](https://github.com/rails/rails/pull/19832)), [Active Model Serialzer](https://github.com/rails-api/active_model_serializers/) 也在 0.10 版本添加上了 JSONAPI Adapter 的支持.
所以 rails 和 ember-data 之间的数据交互问题, 已经直接通过 JSONAPI 的中间规范解决了.


## [x]SPA 应用第一次访问的初始化加载的问题?
现在 ember.js 正在着力开发 [FastBoot](https://github.com/tildeio/ember-cli-fastboot);  [INSIDE FASTBOOT(1)](http://emberjs.com/blog/2014/12/22/inside-fastboot-the-road-to-server-side-rendering.html), [INSIDE FASTBOOT(2)](http://emberjs.com/blog/2015/01/08/inside-fastboot-faking-the-dom-in-node.html) 这个可以解决这个问题(看看 Discourse 中首次 URL 访问的 Preload js 数据), 所以现在可以不用自己担心在这个方向, 因为整个社区的大方向是这样.
但现在需要一个过度方案, 现在的过度方案可以学的 Gmail 应用的首次访问的 js 加载进度条以及 js,css 文件访问 CDN 加速方案.
以下是这个方案比较有用的参考链接:
* [Experimentally verified: "Why client-side templating is wrong"](http://www.onebigfluke.com/2015/01/experimentally-verified-why-client-side.html?m=1)
* [You’re Missing the Point of Server-Side Rendered JavaScript Apps](http://tomdale.net/2015/02/youre-missing-the-point-of-server-side-rendered-javascript-apps/)
* [Ember 2.0 and the Indie Web with Yehuda Katz and Tom Dale](https://frontsidethepodcast.simplecast.fm/16)


如果实在想让抓取引擎抓取 JavaScript 渲染后的东西那么查看一下 [prerender.io](https://prerender.io) 利用 phantomjs 在你的应用与抓取服务器之间做了一个缓存代理.

## [x]ember.js 中 Component 数量大, 重绘制速度慢的问题?
这个问题与我实现 todo item 的功能操作有关, 当自己测试将 todo item 量添加到大概 50 个左右的时候, 每一次改变其中一个 todo item 的 component 的值的时候, 整个 {{#each}} 中的所有 component 都重新计算一次, 
现在还不清楚为什么整个 {{#each}} 中所有 component 都需要重算一次? 但如果后续还有如此的需求, 这样实现肯定是有性能问题的(需要观察正在进行中的新 Ember.js Dom Diff 渲染引擎会有多大改善)

Ember 1.13 引入的 [Glimmer Engine](https://github.com/emberjs/ember.js/pull/10501)已经有了变化, 原来添加一个新 todo 会重新渲染 50+ 个 todo item 而现在只渲染新增加的那一个, 速度改观非常明显, 这个问题 Ember 1.13 后已经不存在了.
* [isemberfastyet](https://www.isemberfastyet.com/)
* [dbmonster](https://dbmonster.firebaseapp.com/)

## [x]ember-cli server 中编译文件现在是全部重新编译, 项目越大文件越多会越慢?
这个暂时在使用 ember-cli 的时候没有办法解决, 不过好在 ember-cli 在来临的 v1.0.0 版本着手解决这个问题了, 见 [issue 2371](https://github.com/ember-cli/ember-cli/issues/2371), 所以这个什么都不用做, 等着 ember-cli 社区完成后对 ember-cli 更新即可.

## [x]如何通过 ember-cli 添加与 bootstrap 或者 sass 的集成?
* [Ember.js Example App w/ Twitter Bootstrap (SASS) and ember-cli](http://erikaybar.name/ember-js-bootstrap-sass-and-ember-cli-quick-start/)
* [Ember-cli, broccoli, bootstrap & sass](http://www.octolabs.com/blogs/octoblog/2014/05/08/ember-cli-broccoli-bootstrap-sass/)

1. 通过 bower 为 ember-cli 添加 bootstrap 指定版本的前端依赖.
2. 通过 npm 为 ember-cli 添加 node.js 需要用到的 broccoli-sass 依赖(使用 broccoli 进行编译)
3. 引入 bootstrap 
    
    ```javascript
    // Brocfile.js
    app.import('bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js');  
    
    ```
4. 将 app.css 变为 scss
    
    ```bash
    mv app/styles/<app>.css app/styles/<app>.scss
    ```
5. 在 <app>.scss 中 @import 需要的 scss 文件.

## [x]ember.js 处理 rails 过来的 Validation errors 问题?
ember.js 中使用 DS.Errors 来封装的 model 中的各项错误, 不愧是来自 jQuery, Rails 社区的 Yehuda Katz 将好东西直接拿过了, 与 Rails 中的 Errors 处理基本上一个模子. 借用了 JavaScript 原生的 Error class 然后封装成 DS.Errors, 当 DS.Model 进行 save/update 等方法执行错误后需要满足两个条件则会自动解析内容并且填充到 DS.Model.errors 中, 其就是 DS.Errors 实例.

1. 要求服务器端返回[ 422 错误](https://tools.ietf.org/html/rfc4918#section-11.2)
2. 返回的结果是 {attribute: [...message]}.
错误填充到 DS.Model.errors 然后在页面上可以 DS.Model.errors.username 获取展示错误以及通过 DS.Model.errors.messages 展示全部错误信息.

在 ember-data 中, 已经根据 JSONAPI 规范进行了处理, 详情见: [#3194](https://github.com/emberjs/data/pull/3194)

* 服务器响应 4xx , 5xx 错误
* 使用专门的 error Object 来封装错误


## [x]ember.js 与 rails 之间如何进行数据批量保存/更新?
现在刚刚熟悉 ember.js 的时候要编写批量保存的时候, 思路是想着在页面上为 checkbox 设置自己的 name 属性进行提交, 但实际上应该将提交的属性名字交由 ES.Model 去处理. 我没有在 Ember Data 中找到这样对批量更新的支持, 所以两种方式:

1. 将批量变为借用 Ember Data 的 Model 中每一个的 save. 
2. 通过 Ember Data 的 Model 收集数据, 然后 `ic-ajax` 进行自行提交, 但需要自行处理 DS.Model.isDrity 的问题
这两种方法各有优点, 暂时还没办法直接替代.


## [x]ember.js 中使用 jQuery 的 ajax 返回非标准的 Promise 如何解决?
在 ember.js 中, 很多情况都会需要使用到 Ember.$.ajax 请求去处理异步的 action 操作或者额外的处理, 但调用的是 jQuery 的 ajax 方法, 返回的是 jQuery Defer 对象. 这里会有两个问题:

1. 与 Ember.js 中整体使用的异步请求处理对象 Promise 不匹配.  具体体现在, `$.ajax()` 返回的 defer 对象无 finally 方法, 并且得使用 done, fail 来代替 Promise API 中的 then, catch.
2. 事件没有最优化进入整个 Ember 的 [run loop](http://guides.emberjs.com/v1.12.0/understanding-ember/run-loop/)

但其实, 如果使用 ember-cli 的话, 其生成的项目中已经内置了 [ember-cli-ic-ajax](https://github.com/rwjblue/ember-cli-ic-ajax), 要使用则在代码中 `import ajax from 'ic-ajax';` 即可使用 `ajax()` 方法代替原来的 `Ember.$.ajax()` 方法并且他们接收的参数是一样的.

## [x]使用 ember-data 如何处理分页的问题?
这个问题从 ruby-china 上的一个问题引发过来的, 开始自己还没想到这. 
找到的一个分页例子代码: [Pagination with Ember](http://hawkins.io/2013/07/pagination-with-ember/)

分页的问题有两个选择, 一个为本地分页, 一个为远程分页. 个人倾向: 远程分页.

#### 本地分页
这个需要利用 ember-data 将数据全部加载到前端的 identity map 缓存住. 但还需要考虑的一个问题是, 这里缓存的数据需要在什么时机与后端的数据进行同步? 进行分页后, 如果控制缓存中直接访问"第N页"?
可以参考 Gmail 这个应用, 他是拥有本地缓存分页的, 当你加载过数据后, 前后两页的数据是否缓存的, 但其没有仍然是没有给你明确的还有多少页, 只会提供 *下一页* 和 *上一页* 还有就是总数与当前页的数量, 他从用户使用的角度将传统的 1,2,3... page 的功能给省略了, 用户在当前页面处理数据并且自动帮用户加载数据.

#### 远程分页
这种方式与原有的结构结合比较容易, 分页的代码交给后端处理, 前端提供参数以及 URL 来访问不同的页面, 并且每一次的分页 URL 请求都将根据 model.id 来更新前端的 identity map 的缓存.
但这种效果肯定是没有本地分页的那个速度的.

从这两个问题我才理解为什么会有 [ember-restless](https://github.com/bustlelabs/ember-restless), 因为很多时候我真的不需要 identity map 这个特性, 即使我退一步每一次数据请求都是通过 Ajax, 即使请求的数据没有缓存. 通过 Ajax 化获取数据, 并将网络控制在一定范围内效果已经非常不错了. (虽然类似 Gmail 这样的应用, 前端的数据使用了缓存)

#### ember-data 对分页的态度
完整的讨论 [#1517](https://github.com/emberjs/data/pull/1517), 这个 pull request 还是没有被 merge, 因为 core team 对分页所可能出现的与服务器之间数据的创建和删除导致的页码不一致如何处理等还没有结论.

## [x]ember.js 中通过 Ajax 请求超时后怎么办?
这个学习 Gmail 的应用, 所有需要应对远程的请求, 先进行网络处理并带有非阻拦式的提示处理框, 成功后再对页面 UI 做响应处理. 其次出现网络问题, 在页面给予提示处理. (Ajax 体验类型的问题, 都可以参考 Gmail 这个 SPA Web App)

[现在代码中是尝试的先 UI 响应, 再网络处理, 失败则 rollback 的处理方法]

## [x]将 ember.js 与 rails 部署在不同的地区, 使他们响应时间延长所出现的问题?
当 ember.js ajax 到 api 的时间在 400ms 以上的时候用户有明显的感觉, 测试后最慢也要控制在 *300ms* 之内, 就算有延时用户也不会感觉迟缓. 
#### 响应时间过长的提速
1. api 后面的本身的计算问题: 这个问题除非后端出现 db 或者自己代码编写的问题会产生延迟, 如果在没有 view render 的情况下还有 300ms 的时间那么这个 api 则是有问题的.
2. ember.js 与 api 之间的物理网络问题, 这个是一定要想办法控制住的, api 的服务器一定需要尽可能的离客户比较近. 例如中国, 要控制服务器在全国 ping 值常规在 200ms 以内即可(例如到香港,或者国内阿里云), 链接到美国则需要控制机房地址.  

#### 响应间过长,需要避免重复提交
当响应时间变长的时候引发另外的一个问题, 对 action 触发的事件, 是需要做重复提交处理的, 现在观察 Gmail 的邮件搜索等等功能都没有做处理, 其并非创建这个不处理可以理解, 但最重要的是要避免重复创建提交(例如快速回车重复创建 task 是可能的), 这个则需要对所操作的 action 进行 rails 中的 disabled-with 处理. 

寻找到几个可行方法:
* Ember 1.13 中的 [`ember-routing-transitioning-classes`](https://github.com/emberjs/ember.js/pull/9919) 功能, 可以让 Link 随着 state 的变化有不同的 className 添加上.
* 模仿 [`Ember.LinkView`](http://emberjs.com/api/classes/Ember.LinkView.html#property_classNameBindings) 中的 `classNameBindings` 控制 button 或者 form 表单的提交.
* [Don't trigger action if its element is disabled](https://github.com/emberjs/ember.js/pull/2240) 这个 issue 中有说明.

#### 响应时间过长, 连接需要拥有超时控制
当响应时间变长的时候引发第三个问题, 对于网络链接时间要拥有一个时间控制, 当连接的时间超过某个时间需要对用户进行提示, 并且超过某个阀值后需要对网络做 cancel 或者重试, 类似 Gmail 中每个请求有 timeout, 同样每个请求有自动 retry 以及多次 retry 的间隔时间变长. 这个应该在 ember.js 所依赖的 jQuery 的 ajax 操作中处理.


## [x]在 ember.js 中如何使用第三方的需要全局变量的库文件?
因为 ember-cli 的 resolver 机制, 所有的库文件默认是不会污染 global 空间的, 这个对原来 Ember 定义 Controller, Router, Model 等等都是放在顶层空间非常不一样, 这种方法也成为 Ember 2.0 的处理方法.
但还是会有一下现在的 JavaScript 库文件没有使用这样的模块化, 需要使用到 global 空间, 那么 ember-cli 也提供了这种方法, 将需要放在 global 空间中的类名添加到 .jshintrc 中添加需要的全局常量 `{"predef": [..., "Ember", "$", "Cookies"]}` 详细解释在 [stackoverflow](http://stackoverflow.com/questions/24312362/ember-cli-fix-for-ember-is-not-defined) (写法上会有一点区别)

## [x]在 ember.js 中使用的 Promise
在 ember 中, 非常多的地方使用到 Promise, 那么理解 Promise 非常重要. 参看两个链接, 一个[中文](http://www.html-js.com/article/Learn-JavaScript-every-day-to-understand-what-JavaScript-Promises)一个[英文](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise).
[例子代码](http://jsbin.com/IkaS/1/edit?html,js,output)

#### 四个状态:
* pending: initial state, not fulfilled or rejected
* fulfilled: successful operation
* rejected: failed operation
* settled: the Promise is either fulfilled or rejected, but not pending.

#### 两个参数
* resolve: fulfilled 状态需要调用的方法
* reject: rejected 需要调用的方法

#### 两个方法
* then: Appends fulfillment and rejection handlers to the promise, and returns a new promise resolving to the return value of the called handler
* catch: Appends a rejection handler callback to the promise, and returns a new promise resolving to the return value of the callback if it is called, or to its original fulfillment value if the promise is instead fulfilled

## [x]ember-cli 前端如何处理权限以及验证的问题?
如果需要很多部分进行合作处理, 并且在参考了多个建立在 Ember 1.x 版本中的例子[ember-simple-auth](https://github.com/simplabs/ember-simple-auth) 以及 [torii](https://github.com/vestorly/torii). 下面是主要的思路:
1. 需要使用 Service 在多个不同的上下文 Context 中共享一些用户登陆的信息, 并且需要自己处理用户体验方面的功能.
2. 在 template 中需要使用到重复字段的时候, 需要使用到 Ember.Mixin. Ember 中专门用于共享页面上下文字段功能
3. 根据所需要的功能, 将 Ember.Mixin 引入到 Router(在 beforeModel 中拦截请求) , Controller(在各种 Controller 里面共享变量) 上, 为需要进行验证的 Route 与 Controller 添加特性.

#### [90%]注意几个点
1. 与前端登陆/登陆/用户/错误信息等的完整一套在 service 中全部处理.
2. 利用 mixin 将 service 中需要共享给 Router 与 Controller 的字段全部共享出去.
3. 思考, 在 Ember 2.1 中没有 Controller 了使用 [Routable Components](https://github.com/emberjs/rfcs/pull/38) 该如何处理?

## [70%]Ember 1.13 [Glimmer] 对 Component 中的 attrs 不同处理.
在新 Glimmer 引擎下, 传入 Component 的参数都被存储在默认不可变的 `attrs` 中, 如果 attrs 与 Component 中有同名的属性会优先使用 *不可变* 的 attrs 中的.
对于 [Glimmer] 的新功能详细介绍, 还需要等 Ember 官方更新一些文档后才能详细知晓.

现在还是建议使用 `{{my-component}}` 的形式, `angle bracket components` 还是等 Ember 1.13 更新了文档了解清楚后再使用. 因为使用后者还是有一些小问题, 例如 Component 中的 tagName 属性失效了. 
还有例如: 现在传入 Component 的 `model` todo, 会自动标记为 `mutable` 拥有 `update` 函数, 同时在 Component 中作为参数的 `todo` 和 `attrs.todo` 都可使用, 但不知道具体会有什么区别, 这个也需要等待文档更新(何时判断为传入 function 的参数? 何时判断为 attrs?).

## [x]ember-cli 中在开发环境中不断出现的 Content Security Policy violation 提示还不知道如何解决?
ember-cli 中的 [Content Security Policy](http://content-security-policy.com), 在 emberjs 中使用的是 [ember-cli content-security-policy addon](https://github.com/rwjblue/ember-cli-content-security-policy), 例如: 在 `enviroment.js` 文件中添加: 

```javascript
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' https://cdn.mxpnl.com", // Allow scripts from https://cdn.mxpnl.com
      'font-src': "'self' http://fonts.gstatic.com", // Allow fonts to be loaded from http://fonts.gstatic.com
      'connect-src': "'self' https://api.mixpanel.com http://custom-api.local", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
      'img-src': "'self' https://ruby-china.org https://*.upaiyun.com",
      'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com", // Allow inline styles and loaded CSS from http://fonts.googleapis.com
      'media-src': "'self'"
    }
```

## [x]开发中碰到 scroll 的状态在页面 transition 后记录, 但是我们希望他不被记录, 每次页面转换都是在最上面.
这个问题 emberjs 有官方解答 [RESETTING SCROLL ON ROUTE CHANGES](http://guides.emberjs.com/v1.10.0/cookbook/user_interface_and_interaction/resetting_scroll_on_route_changes/), 使用 mixin 进行解决.
作为我自己的使用来说, 因为 Ember.Route 中的 `activate` hook 只有在进入这个 Route 的时候才被调用而如果在同一个页面使用 `?page=2` 这样的参数 Link 访问是不会跳出(deactivate)再跳入的, 所以我更喜欢使用 `didTransition` 这个 action 来处理这个事情. 例如下面的 Mixin 代码 `scroll-rest.js`:

```javascript
export default Ember.Mixin.create({
  actions: {
    didTransition() {
      window.scrollTo(0, 0);
      console.log('mixin didTransition');
      return true;
    }
  }
});
```

## SPA 应用中的实时交互问题及 ember.js + socket.io 的问题? 
TODO 有思路以及方向, 但还需要具体方案在以及 demo 去实践, 寻找坑填坑.

## ember.js 应用如何使用 socket.io 与 rails 结合起来组成实时信息推送的问题?
TODO rails -> redis pub,  redis sub -> socket.io -> ember.js?

## 产品环境如何部署 ember-cli, socket.io, rails ?
TODO 难道使用 docker 将三个东西打包到一起进行更新?

