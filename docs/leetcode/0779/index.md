# 0779：第K个语法符号（★）


> <u>**[力扣第 70 场双周赛第 1 题](https://leetcode.cn/problems/k-th-symbol-in-grammar/)**</u>

## 题目

<p>我们构建了一个包含 <code>n</code> 行( <strong>索引从 1  开始 </strong>)的表。首先在第一行我们写上一个 <code>0</code>。接下来的每一行，将前一行中的<code>0</code>替换为<code>01</code>，<code>1</code>替换为<code>10</code>。</p>

<ul>
<li>例如，对于 <code>n = 3</code> ，第 <code>1</code> 行是 <code>0</code> ，第 <code>2</code> 行是 <code>01</code> ，第3行是 <code>0110</code> 。</li>
</ul>

<p>给定行数 <code>n</code> 和序数 <code>k</code>，返回第 <code>n</code> 行中第 <code>k</code> 个字符。（ <code>k</code> <strong>从索引 1 开始</strong>）</p>

<p><br />
<strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> n = 1, k = 1
<strong>输出:</strong> 0
<strong>解释: </strong>第一行：<u>0</u>
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> n = 2, k = 1
<strong>输出:</strong> 0
<strong>解释:</strong>
第一行: 0
第二行: <u>0</u>1
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> n = 2, k = 2
<strong>输出:</strong> 1
<strong>解释:</strong>
第一行: 0
第二行: 0<u>1</u>
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 30</code></li>
<li><code>1 &lt;= k &lt;= 2<sup>n - 1</sup></code></li>
</ul>


## 分析

### #1

为了方便，令 x = k - 1 使得从 0 开始。

第 n 行的第 x 位由第 n-1 行的第 x//2 位生成。如果 x 是偶数，则该字符与原字符相同，否则是原字符取反。

因此考虑递归。最简单的子问题是 n = 1 时，显然为 0。

```python
def kthGrammar(self, n: int, k: int) -> int:
    def help(n, x): 
        return 0 if n == 1 else help(n - 1, x // 2) ^ (x % 2)
    return help(n, k - 1)
```

16 ms

### #2

因为异或运算满足结合律。所以递归过程等价于将 x 的二进制的每一位异或。

因此根据 x 的二进制的 1 的个数即可得到结果。


## 解答

```python
def kthGrammar(self, n: int, k: int) -> int:
    return bin(k-1).count('1') % 2
```

24 ms


