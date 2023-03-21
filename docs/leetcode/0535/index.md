# 0535：TinyURL 的加密与解密（★）


> <u>**[力扣第 535 题](https://leetcode.cn/problems/encode-and-decode-tinyurl/)**</u>

## 题目

<p>TinyURL 是一种 URL 简化服务， 比如：当你输入一个 URL <code>https://leetcode.com/problems/design-tinyurl</code> 时，它将返回一个简化的URL <code>http://tinyurl.com/4e9iAk</code> 。请你设计一个类来加密与解密 TinyURL 。</p>

<p>加密和解密算法如何设计和运作是没有限制的，你只需要保证一个 URL 可以被加密成一个 TinyURL ，并且这个 TinyURL 可以用解密方法恢复成原本的 URL 。</p>

<p>实现 <code>Solution</code> 类：</p>

<div class="original__bRMd">
<div>
<ul>
<li><code>Solution()</code> 初始化 TinyURL 系统对象。</li>
<li><code>String encode(String longUrl)</code> 返回 <code>longUrl</code> 对应的 TinyURL 。</li>
<li><code>String decode(String shortUrl)</code> 返回 <code>shortUrl</code> 原本的 URL 。题目数据保证给定的 <code>shortUrl</code> 是由同一个系统对象加密的。</li>
</ul>



<p><strong>示例：</strong></p>

<pre>
<strong>输入：</strong>url = "https://leetcode.com/problems/design-tinyurl"
<strong>输出：</strong>"https://leetcode.com/problems/design-tinyurl"

<strong>解释：</strong>
Solution obj = new Solution();
string tiny = obj.encode(url); // 返回加密后得到的 TinyURL 。
string ans = obj.decode(tiny); // 返回解密后得到的原本的 URL 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= url.length &lt;= 10<sup>4</sup></code></li>
<li>题目数据保证 <code>url</code> 是一个有效的 URL</li>
</ul>
</div>
</div>


## 分析

### #1

转为唯一确定的 TinyURL，存在哈希表中即可。

最简单的就是计数，转为对应编号即可。

```python
class Codec:
    def __init__(self):
        self.t = 0
        self.d = {}

    def encode(self, longUrl: str) -> str:
        shortUrl = '//tinyurl.com/%d' % self.t
        self.d[shortUrl] = longUrl
        return shortUrl

    def decode(self, shortUrl: str) -> str:
        return self.d[shortUrl]
```

52 ms

### #2

python 有内置函数 hash()。本题数据规模很小，可以不考虑冲突。

## 解答

```python
class Codec:
    def __init__(self):
        self.d = {}

    def encode(self, longUrl: str) -> str:
        shortUrl = str(hash(longUrl))
        self.d[shortUrl] = longUrl
        return shortUrl

    def decode(self, shortUrl: str) -> str:
        return self.d[shortUrl]
```

40 ms
