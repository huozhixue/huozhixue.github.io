# 0535：TinyURL 的加密与解密


## 题目

TinyURL是一种URL简化服务， 比如：当你输入一个URL https://leetcode.com/problems/design-tinyurl 时，
它将返回一个简化的URL http://tinyurl.com/4e9iAk.

要求：设计一个 TinyURL 的加密 encode 和解密 decode 的方法。你的加密和解密算法如何设计和运作是没有限制的，
你只需要保证一个URL可以被加密成一个TinyURL，并且这个TinyURL可以用解密方法恢复成原本的URL。

 <!--more--> 
 
	
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
        shortUrl = 'http://tinyurl.com/%d' % self.t
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
