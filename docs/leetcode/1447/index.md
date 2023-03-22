# 1447：最简分数


> <u>**[力扣第 26 场双周赛第 2 题](https://leetcode.cn/problems/simplified-fractions/)**</u>

## 题目

<p>给你一个整数 <code>n</code> ，请你返回所有 0 到 1 之间（不包括 0 和 1）满足分母小于等于  <code>n</code> 的 <strong>最简 </strong>分数 。分数可以以 <strong>任意 </strong>顺序返回。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>n = 2
<strong>输出：</strong>[&quot;1/2&quot;]
<strong>解释：</strong>&quot;1/2&quot; 是唯一一个分母小于等于 2 的最简分数。</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>n = 3
<strong>输出：</strong>[&quot;1/2&quot;,&quot;1/3&quot;,&quot;2/3&quot;]
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>n = 4
<strong>输出：</strong>[&quot;1/2&quot;,&quot;1/3&quot;,&quot;1/4&quot;,&quot;2/3&quot;,&quot;3/4&quot;]
<strong>解释：</strong>&quot;2/4&quot; 不是最简分数，因为它可以化简为 &quot;1/2&quot; 。</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>n = 1
<strong>输出：</strong>[]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 100</code></li>
</ul>


## 分析

遍历所有 0<分子<分母<=n 的分数，判断是否是最简分数即可。


## 解答

```python
def simplifiedFractions(self, n: int) -> List[str]:
    return ['%d/%d'%(x,y) for y in range(2, n+1) for x in range(1, y) if gcd(x, y)==1]
```
72 ms


