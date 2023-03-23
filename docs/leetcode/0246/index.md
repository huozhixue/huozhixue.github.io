# 0246：中心对称数


> <u>**[力扣第 246 题](https://leetcode.cn/problems/strobogrammatic-number/)**</u>

## 题目

<p>中心对称数是指一个数字在旋转了 180 度之后看起来依旧相同的数字（或者上下颠倒地看）。</p>

<p>请写一个函数来判断该数字是否是中心对称数，其输入将会以一个字符串的形式来表达数字。</p>



<p><strong>示例 1:</strong></p>

<pre><strong>输入:</strong> num = &quot;69&quot;
<strong>输出:</strong> true
</pre>

<p><strong>示例 2:</strong></p>

<pre><strong>输入:</strong> num = &quot;88&quot;
<strong>输出:</strong> true</pre>

<p><strong>示例 3:</strong></p>

<pre><strong>输入:</strong> num = &quot;962&quot;
<strong>输出:</strong> false</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>num = &quot;1&quot;
<strong>输出：</strong>true
</pre>


## 分析

只有 '01689' 才能旋转，可以得到旋转的对应关系，模拟即可。

## 解答

```python
def isStrobogrammatic(self, num: str) -> bool:
    d = dict(zip('01689', '01986'))
    return ''.join(d.get(c, '') for c in num)[::-1]==num
```
32 ms
