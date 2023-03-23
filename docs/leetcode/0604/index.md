# 0604：迭代压缩字符串


> <u>**[力扣第 604 题](https://leetcode.cn/problems/design-compressed-string-iterator/)**</u>

## 题目

<p>设计并实现一个迭代压缩字符串的数据结构。给定的压缩字符串的形式是，每个字母后面紧跟一个正整数，表示该字母在原始未压缩字符串中出现的次数。</p>

<p>设计一个数据结构，它支持如下两种操作： <code>next</code> 和 <code>hasNext</code>。</p>

<ul>
<li><code>next()</code> - 如果原始字符串中仍有未压缩字符，则返回<strong>下一个字符</strong>，否则返回<strong>空格</strong>。</li>
<li><code>hasNext()</code> - 如果原始字符串中存在未压缩的的字母，则返回true，否则返回<code>false</code>。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>
["StringIterator", "next", "next", "next", "next", "next", "next", "hasNext", "next", "hasNext"]
[["L1e2t1C1o1d1e1"], [], [], [], [], [], [], [], [], []]
<b>输出：</b>
[null, "L", "e", "e", "t", "C", "o", true, "d", true]

<strong>解释：</strong>
StringIterator stringIterator = new StringIterator("L1e2t1C1o1d1e1");
stringIterator.next(); // 返回 "L"
stringIterator.next(); // 返回 "e"
stringIterator.next(); // 返回 "e"
stringIterator.next(); // 返回 "t"
stringIterator.next(); // 返回 "C"
stringIterator.next(); // 返回 "o"
stringIterator.hasNext(); // 返回 True
stringIterator.next(); // 返回 "d"
stringIterator.hasNext(); // 返回 True</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= compressedString.length &lt;= 1000</code></li>
<li><code>compressedString</code> 由小写字母、大写字母和数字组成。</li>
<li>在 <code>compressedString</code> 中，单个字符的重复次数在 <code>[1,10 ^9]</code> 范围内。</li>
<li><code>next</code> 和 <code>hasNext</code> 的操作数最多为 <code>100</code> 。</li>
</ul>


## 分析

正则提取出 <字符，个数> 对放在队列中，模拟取出即可。

## 解答

```python
class StringIterator:

    def __init__(self, compressedString: str):
        self.Q = deque((x, int(w)) for x,w in re.findall('(\w)(\d+)', compressedString))

    def next(self) -> str:
        if not self.Q:
            return ' '
        x, w = self.Q.popleft()
        if w-1:
            self.Q.appendleft((x, w-1))
        return x

    def hasNext(self) -> bool:
        return bool(self.Q)
```

44 ms
