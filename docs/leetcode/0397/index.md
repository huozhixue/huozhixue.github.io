# 0397：整数替换（★）


> <u>**[力扣第 397 题](https://leetcode.cn/problems/integer-replacement/)**</u>

## 题目

<p>给定一个正整数 <code>n</code> ，你可以做如下操作：</p>

<ol>
<li>如果 <code>n</code><em> </em>是偶数，则用 <code>n / 2</code>替换 <code>n</code><em> </em>。</li>
<li>如果 <code>n</code><em> </em>是奇数，则可以用 <code>n + 1</code>或<code>n - 1</code>替换 <code>n</code> 。</li>
</ol>

<p>返回 <code>n</code><em> </em>变为 <code>1</code> 所需的 <em>最小替换次数</em> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 8
<strong>输出：</strong>3
<strong>解释：</strong>8 -&gt; 4 -&gt; 2 -&gt; 1
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 7
<strong>输出：</strong>4
<strong>解释：</strong>7 -&gt; 8 -&gt; 4 -&gt; 2 -&gt; 1
或 7 -&gt; 6 -&gt; 3 -&gt; 2 -&gt; 1
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 4
<strong>输出：</strong>2
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>
</ul>


## 分析

显然递归即可。

## 解答

```python
def integerReplacement(self, n: int) -> int:
    @lru_cache(None)
    def dfs(n):
        if n == 1:
            return 0
        if n % 2 == 0:
            return 1 + dfs(n//2)
        return 1+min(dfs(n+1), dfs(n-1))
    return dfs(n)
```
24 ms


