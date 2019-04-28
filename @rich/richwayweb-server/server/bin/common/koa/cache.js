/**

 @Name：richwayui 项目的缓存设置
 @Author：g.zhou
 @License：MIT

 */

const KoaCacheControl = require(`koa-cache-control`);

module.exports = app => {
    try {
        app.use(KoaCacheControl({
            maxAge: 600,
            public: true
        }));

        _richwayKoaLog.logInfo(`Cache module is loaded to complete...`);
    } catch (err) {
        _richwayKoaLog.logErr(`Cache module is loaded to failed...`);
        _richwayKoaLog.logError(err);
    }
};


// 指令不区分大小写，并且具有可选参数，可以用令牌或者带引号的字符串语法。多个指令以逗号分隔。


// 缓存请求指令
// 客户端可以在HTTP请求中使用的标准 Cache-Control 指令。
// Cache-Control: max-age=<seconds>
// Cache-Control: max-stale[=<seconds>]
// Cache-Control: min-fresh=<seconds>
// Cache-control: no-cache
// Cache-control: no-store
// Cache-control: no-transform
// Cache-control: only-if-cached


// 缓存响应指令
// 服务器可以在响应中使用的标准 Cache-Control 指令。
// Cache-control: must-revalidate
// Cache-control: no-cache
// Cache-control: no-store
// Cache-control: no-transform
// Cache-control: public
// Cache-control: private
// Cache-control: proxy-revalidate
// Cache-Control: max-age=<seconds>
// Cache-control: s-maxage=<seconds>


// 拓展Cache-Control指令
// 拓展缓存指令不是HTTP缓存标准的一部分，使用前请注意检查 兼容性！
// Cache-control: immutable
// Cache-control: stale-while-revalidate=<seconds>
// Cache-control: stale-if-error=<seconds>


// 可缓存性
// public 表明响应可以被任何对象（包括：发送请求的客户端，代理服务器，等等）缓存。
// private 表明响应只能被单个用户缓存，不能作为共享缓存（即代理服务器不能缓存它）。
// no-cache 强制所有缓存了该响应的缓存用户，在使用已存储的缓存数据前，发送带验证器的请求到原始服务器
// only-if-cached 表明如果缓存存在，只使用缓存，无论原始服务器数据是否有更新。


// 到期
// max-age=<seconds> 设置缓存存储的最大周期，超过这个时间缓存被认为过期(单位秒)。与Expires相反，时间是相对于请求的时间。
// s-maxage=<seconds> 覆盖max-age 或者 Expires 头，但是仅适用于共享缓存(比如各个代理)，并且私有缓存中它被忽略。
// max-stale[=<seconds>] 表明客户端愿意接收一个已经过期的资源。 可选的设置一个时间(单位秒)，表示响应不能超过的过时时间。
// min-fresh=<seconds> 表示客户端希望在指定的时间内获取最新的响应。
// stale-while-revalidate=<seconds>
// stale-if-error=<seconds>


// 重新验证和重新加载
// must-revalidate 缓存必须在使用之前验证旧资源的状态，并且不可使用过期资源。
// proxy-revalidate 与must-revalidate作用相同，但它仅适用于共享缓存（例如代理），并被私有缓存忽略。
// immutable 表示响应正文不会随时间而改变。资源（如果未过期）在服务器上不发生改变，因此客户端不应发送重新验证请求头（例如If-None-Match或If-Modified-Since）来检查更新，即使用户显式地刷新页面。


// 其他
// no-store 缓存不应存储有关客户端请求或服务器响应的任何内容。
// no-transform 不得对资源进行转换或转变。Content-Encoding, Content-Range, Content-Type等HTTP头不能由代理修改。例如，非透明代理可以对图像格式进行转换，以便节省缓存空间或者减少缓慢链路上的流量。 no-transform指令不允许这样做。


// 示例
// 禁止缓存 发送如下指令可以关闭缓存。此外，可以参考Expires 和 Pragma 标题。
// Cache-Control: no-cache, no-store, must-revalidate

// 缓存静态资源 对于应用程序中不会改变的文件，你通常可以在发送响应头前添加积极缓存。这包括例如由应用程序提供的静态文件，例如图像，CSS文件和JavaScript文件。另请参阅Expires标题。
// Cache-Control:public, max-age=31536000


// 每个状态的详细说明如下：


// 1、Last-Modified
// 在浏览器第一次请求某一个URL时，服务器端的返回状态会是200，内容是你请求的资源，同时有一个Last-Modified的属性标记(HttpReponse Header)此文件在服务期端最后被修改的时间，格式类似这样：
// Last-Modified:Tue, 24 Feb 2009 08:01:04 GMT
// 客户端第二次请求此URL时，根据HTTP协议的规定，浏览器会向服务器传送If-Modified-Since报头(HttpRequest Header)，询问该时间之后文件是否有被修改过：
// If-Modified-Since:Tue, 24 Feb 2009 08:01:04 GMT
// 如果服务器端的资源没有变化，则自动返回HTTP304（NotChanged.）状态码，内容为空，这样就节省了传输数据量。当服务器端代码发生改变或者重启服务器时，则重新发出资源，返回和第一次请求时类似。从而保证不向客户端重复发出资源，也保证当服务器有变化时，客户端能够得到最新的资源。
// 注：如果If-Modified-Since的时间比服务器当前时间(当前的请求时间request_time)还晚，会认为是个非法请求

// 2、Etag工作原理
// HTTP协议规格说明定义ETag为“被请求变量的实体标记”（参见14.19）。简单点即服务器响应时给请求URL标记，并在HTTP响应头中将其传送到客户端，类似服务器端返回的格式：
// Etag:“5d8c72a5edda8d6a:3239″
// 客户端的查询更新格式是这样的：
// If-None-Match:“5d8c72a5edda8d6a:3239″
// 如果ETag没改变，则返回状态304。
// 即:在客户端发出请求后，HttpReponse Header中包含Etag:“5d8c72a5edda8d6a:3239″
// 标识，等于告诉Client端，你拿到的这个的资源有表示ID：5d8c72a5edda8d6a:3239。当下次需要发Request索要同一个URI的时候，浏览器同时发出一个If-None-Match报头(Http RequestHeader)此时包头中信息包含上次访问得到的Etag:“5d8c72a5edda8d6a:3239″标识。
// If-None-Match:“5d8c72a5edda8d6a:3239“
// ,这样，Client端等于Cache了两份，服务器端就会比对2者的etag。如果If-None-Match为False，不返回200，返回304(Not Modified) Response。

// 3、Expires
// 给出的日期/时间后，被响应认为是过时。如Expires:Thu, 02 Apr 2009 05:14:08 GMT
// 需和Last-Modified结合使用。用于控制请求文件的有效时间，当请求数据在有效期内时客户端浏览器从缓存请求数据而不是服务器端.当缓存中数据失效或过期，才决定从服务器更新数据。

// 4、Last-Modified和Expires
// Last-Modified标识能够节省一点带宽，但是还是逃不掉发一个HTTP请求出去，而且要和Expires一起用。而Expires标识却使得浏览器干脆连HTTP请求都不用发，比如当用户F5或者点击Refresh按钮的时候就算对于有Expires的URI，一样也会发一个HTTP请求出去，所以，Last-Modified还是要用的，而且要和Expires一起用。

// 5、Etag和Expires
// 如果服务器端同时设置了Etag和Expires时，Etag原理同样，即与Last-Modified/Etag对应的HttpRequestHeader:If-Modified-Since和If-None-Match。我们可以看到这两个Header的值和WebServer发出的Last-Modified,Etag值完全一样；在完全匹配If-Modified-Since和If-None-Match即检查完修改时间和Etag之后，服务器才能返回304.

// 6、Last-Modified和Etag
// 分布式系统里多台机器间文件的last-modified必须保持一致，以免负载均衡到不同机器导致比对失败
// 分布式系统尽量关闭掉Etag(每台机器生成的etag都会不一样)
// Last-Modified和ETags请求的http报头一起使用，服务器首先产生Last-Modified/Etag标记，服务器可在稍后使用它来判断页面是否已经被修改，来决定文件是否继续缓存
// 过程如下:
// 1.客户端请求一个页面（A）。
// 2.服务器返回页面A，并在给A加上一个Last-Modified/ETag。
// 3.客户端展现该页面，并将页面连同Last-Modified/ETag一起缓存。
// 4.客户再次请求页面A，并将上次请求时服务器返回的Last-Modified/ETag一起传递给服务器。
// 5.服务器检查该Last-Modified或ETag，并判断出该页面自上次客户端请求之后还未被修改，直接返回响应304和一个空的响应体。
// 注：
// 1、Last-Modified和Etag头都是由WebServer发出的HttpReponse Header，WebServer应该同时支持这两种头。
// 2、WebServer发送完Last-Modified/Etag头给客户端后，客户端会缓存这些头；
// 3、客户端再次发起相同页面的请求时，将分别发送与Last-Modified/Etag对应的HttpRequestHeader:If-Modified-Since和If-None-Match。我们可以看到这两个Header的值和WebServer发出的Last-Modified,Etag值完全一样；
// 4、通过上述值到服务器端检查，判断文件是否继续缓存；

// 7、关于 Cache-Control: max-age=秒 和 Expires
// Expires = 时间，HTTP 1.0 版本，缓存的载止时间，允许客户端在这个时间之前不去检查（发请求）
// max-age = 秒，HTTP 1.1版本，资源在本地缓存多少秒。
// 如果max-age和Expires同时存在，则被Cache-Control的max-age覆盖。
// Expires 的一个缺点就是，返回的到期时间是服务器端的时间，这样存在一个问题，如果客户端的时间与服务器的时间相差很大，那么误差就很大，所以在HTTP 1.1版开始，使用Cache-Control: max-age=秒替代。
// Expires =max-age +   “每次下载时的当前的request时间”
// 所以一旦重新下载的页面后，expires就重新计算一次，但last-modified不会变化

// Last-Modified和Expires针对浏览器，而ETag则与客户端无关，所以可适合REST架构中。两者都应用在浏览器端的区别是：Expires日期到达前，浏览器不会再发出新的请求，除非用户按浏览器的刷新，所以，Last-Modified和Expires基本是降低浏览器向服务器发出请求的次数，而ETag更侧重客户端和服务器之间联系。
// 先谈Last-Modified和Expires，最新的Tomcat 7 将ExpireFilter加入其容器中，这样，Java WEB也可以象Apache的Mod_expire模块一样对Http头部进行统一设置了，不过它只对响应文档类型进行统一设置判断，如text/html或text/image 或/css等等，如果想对个别URL输出的jsp进行定制就不行，urlrewrite据说是可以，但是要把URL在其配置文件再配置一下，麻烦，一旦jsp改动影响面大，还有一个问题就是web.xml配置了Tomcat 7容器的ExpireFilter，与容器耦合，移植性差(移植到Resin就不行了)。
