# 0990：等式方程的可满足性（1638 分）


> <u>**[力扣第 123 场周赛第 2 题](https://leetcode.cn/problems/satisfiability-of-equality-equations/)**</u>

## 题目

<p>给定一个由表示变量之间关系的字符串方程组成的数组，每个字符串方程 <code>equations[i]</code> 的长度为 <code>4</code>，并采用两种不同的形式之一：<code>&quot;a==b&quot;</code> 或 <code>&quot;a!=b&quot;</code>。在这里，a 和 b 是小写字母（不一定不同），表示单字母变量名。</p>

<p>只有当可以将整数分配给变量名，以便满足所有给定的方程时才返回 <code>true</code>，否则返回 <code>false</code>。 </p>



<ol>
</ol>

<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>[&quot;a==b&quot;,&quot;b!=a&quot;]
<strong>输出：</strong>false
<strong>解释：</strong>如果我们指定，a = 1 且 b = 1，那么可以满足第一个方程，但无法满足第二个方程。没有办法分配变量同时满足这两个方程。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>[&quot;b==a&quot;,&quot;a==b&quot;]
<strong>输出：</strong>true
<strong>解释：</strong>我们可以指定 a = 1 且 b = 1 以满足满足这两个方程。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>[&quot;a==b&quot;,&quot;b==c&quot;,&quot;a==c&quot;]
<strong>输出：</strong>true
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>[&quot;a==b&quot;,&quot;b!=c&quot;,&quot;c==a&quot;]
<strong>输出：</strong>false
</pre>

<p><strong>示例 5：</strong></p>

<pre><strong>输入：</strong>[&quot;c==c&quot;,&quot;b==d&quot;,&quot;x!=z&quot;]
<strong>输出：</strong>true
</pre>



<p><strong>提示：</strong></p>

<ol>
<li><code>1 &lt;= equations.length &lt;= 500</code></li>
<li><code>equations[i].length == 4</code></li>
<li><code>equations[i][0]</code> 和 <code>equations[i][3]</code> 是小写字母</li>
<li><code>equations[i][1]</code> 要么是 <code>&#39;=&#39;</code>，要么是 <code>&#39;!&#39;</code></li>
<li><code>equations[i][2]</code> 是 <code>&#39;=&#39;</code></li>
</ol>




## 分析

典型的并查集应用。先将所有等号两边的变量连通，然后再判断所有不等号两边的变量不连通即可。

## 解答

```python
def equationsPossible(self, equations: List[str]) -> bool:
    def find(i):
        if p.setdefault(i, i) != i:
            p[i] = find(p[i])
        return p[i]

    def union(i, j):
        p[find(i)] = find(j)

    p = {}
    for eq in equations:
        if eq[1:-1] == '==':
            union(eq[0], eq[-1])
    return all(find(eq[0]) != find(eq[-1]) for eq in equations if eq[1:-1]== '!=')
```
52 ms
