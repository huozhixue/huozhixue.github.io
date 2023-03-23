# 0281：锯齿迭代器（★）


> <u>**[力扣第 281 题](https://leetcode.cn/problems/zigzag-iterator/)**</u>

## 题目

<p>给出两个一维的向量，请你实现一个迭代器，交替返回它们中间的元素。</p>

<p><strong>示例:</strong></p>

<pre><strong>输入:</strong>
v1 = [1,2]
v2 = [3,4,5,6]

<strong>输出:</strong> <code>[1,3,2,4,5,6]

<strong>解析:</strong></code> 通过连续调用 <em>next</em> 函数直到 <em>hasNext</em> 函数返回 <code>false，</code>
<em>next</em> 函数返回值的次序应依次为: <code>[1,3,2,4,5,6]。</code></pre>

<p><strong>拓展：</strong>假如给你 <code>k</code> 个一维向量呢？你的代码在这种情况下的扩展性又会如何呢?</p>

<p><strong>拓展声明：</strong><br>
&ldquo;锯齿&rdquo; 顺序对于 <code>k &gt; 2</code> 的情况定义可能会有些歧义。所以，假如你觉得 &ldquo;锯齿&rdquo; 这个表述不妥，也可以认为这是一种 &ldquo;循环&rdquo;。例如：</p>

<pre><strong>输入:</strong>
[1,2,3]
[4,5,6,7]
[8,9]

<strong>输出: </strong><code>[1,4,8,2,5,9,3,6,7]</code>.
</pre>


## 分析

每次取一对 v1、v2 的元素放入缓存即可。

## 解答

```python
class ZigzagIterator:
    def __init__(self, v1: List[int], v2: List[int]):
        self.v1 = v1
        self.v2 = v2
        self.i = 0
        self.cache = []
        
    def next(self) -> int:
        return self.cache.pop(0)

    def hasNext(self) -> bool:
        if not self.cache:
            if self.i<len(self.v1):
                self.cache.append(self.v1[self.i])
            if self.i<len(self.v2):
                self.cache.append(self.v2[self.i])
            self.i += 1
        return bool(self.cache)
```
52 ms



