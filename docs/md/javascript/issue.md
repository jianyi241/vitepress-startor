# 一些Javascript相关问题

## 编码习惯
### url编写习惯
老生常谈的问题了，由于长久地编码习惯导致一看到url拼接参数就是 `? &` 直接拼，但是这会导致一些问题：
 - **编码问题**：中文字符和特殊字符会有编码问题，需要手动使用 `encodeURI` 手动进行编码
 - **布尔值和数字类型问题**：布尔值true/false和数字0可能被服务器误解
 - **空值和 `undefined` 处理问题**：`undefined` 被转换为字符串 `"undefined"`
 - **XSS攻击风险**：恶意脚本可能被注入到URL中
 
 规范书写方式：

 1. 使用URL构造函数
 ``` js
    const url = new URL('https://example.com/users');
    url.searchParams.set('name', '张三&李四');
    url.searchParams.set('email', 'user@example.com');
    window.location.href = url.toString()
```
更多使用方法可参考：[MDN URL](https://developer.mozilla.org/zh-CN/docs/Web/API/URL)

 2. 使用URLSearchParams
 ``` js
    const params = new URLSearchParams();
    params.append('name', '张三&李四');
    params.append('email', 'user@example.com');
    window.location.href = `https://example.com/users?${params.toString()}`;
 ```
更多使用方法可参考：[MDN URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)

 3. 使用encodeURIComponentL构造函数（仅适合简单场景使用）
 ``` js
    const name = "张三&李四";
    const email = "user@example.com";
    window.location.href = `https://api.example.com/users?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
```

更多使用方法可参考：[MDN encodeURIComponent()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

::: tip
支持情况：
 - **`URL`**：2015 年 7 月之后的浏览器版本都支持
 - **`URLSearchParams`**：2018 年 4 月之后的浏览器版本都支持
 - **`encodeURIComponent()`**：2015 年 7 月之后的浏览器版本都支持<br>
 :::

这三种都是标准的构建URL的方式，能极大的避免以上问题
 - 自动进行URL编码
 - 自动处理特殊字符
 - 清晰的参数管理
 - XSS攻击防护

<!-- 原因：字符串拼接方式出现编码问题
解决方法：改使用`URL`对象和`SearchParams`的方式来处理url参数
使用`URL`对象的优势：
 - URL 参数操作更安全 -->
