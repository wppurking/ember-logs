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

## 对 es6 transpiler 现在的使用情况?
现在 es6 transpiler 的使用还是挺有限的, 但现在所需要的也就是[ 22 个特性](https://babeljs.io/docs/learn-es6/#classes)中的 6 个重点特性, 其他的现在都无所谓, 重点特性如下

 * arrays: 用于闭包函数的简写方法, 使用 () => {} 来代替 function() {}
 * template string: 类似 ruby 中的 string interpolation. 使用 \`hello ${a}\` 代替 "hello " + a;
 * let + const: 代替 var 的 let , 变量当前语句\[块作用域\];  const, 和 let 类似但只读. (var 是函数级作用域)
 * promises: 非常重要的一个对象, 但简单到只有两个函数: then(onFulfilled, onRejected), catch(onRejected)
 * modules: 另外一个非常重要的模块化特性, ember-cli 中利用 [AMD](http://requirejs.org/docs/why.html) 来在 ES5 中实现.
 * enhanced object literals: 这个已经在 ember.js 中应用了. 简化在一个地方: 
   `
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
   `
   
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

## [x]ember.js 中 Component 数量大, 重绘制速度慢的问题?
这个问题与我实现 todo item 的功能操作有关, 当自己测试将 todo item 量添加到大概 50 个左右的时候, 每一次改变其中一个 todo item 的 component 的值的时候, 整个 {{#each}} 中的所有 component 都重新计算一次, 
现在还不清楚为什么整个 {{#each}} 中所有 component 都需要重算一次? 但如果后续还有如此的需求, 这样实现肯定是有性能问题的(需要观察正在进行中的新 Ember.js Dom Diff 渲染引擎会有多大改善)

## ember-cli server 中编译文件现在是全部重新编译, 项目越大文件越多会越慢?
这个暂时在使用 ember-cli 的时候没有办法解决, 不过好在 ember-cli 在来临的 v1.0.0 版本着手解决这个问题了, 见 [issue 2371](https://github.com/ember-cli/ember-cli/issues/2371), 所以这个什么都不用做, 等着 ember-cli 社区完成后对 ember-cli 更新即可.

## ember-cli 中在开发环境中不断出现的 Content Security Policy violation 提示还不知道如何解决?
TODO ember-cli 提示我有一些内容有安全问题, 但我现在还不知道如何解决.

## ember.js 处理 rails 过来的 Validation errors 问题?
TODO 还没解决, 现在仅仅是 logger 在 console 中, 还需要看需要如何使用 Ember.Error 或者 DS.Errors 来解决(应该是后者解决)

## ember.js 中通过 Ajax 请求超时后怎么办?
TODO 现在还没想好, 需要解决...

## SPA 应用中的实时交互问题及 ember.js + socket.io 的问题? 
TODO 有思路以及方向, 但还需要具体方案在以及 demo 去实践, 寻找坑填坑.
