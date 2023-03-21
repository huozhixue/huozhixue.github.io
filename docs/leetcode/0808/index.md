# 0808：分汤（★）


> <u>**[力扣第 78 场周赛第 3 题](https://leetcode.cn/problems/soup-servings/)**</u>

## 题目

<p>有 <strong>A 和 B 两种类型 </strong>的汤。一开始每种类型的汤有 <code>n</code> 毫升。有四种分配操作：</p>

<ol>
<li>提供 <code>100ml</code> 的 <strong>汤A</strong> 和 <code>0ml</code> 的 <strong>汤B</strong> 。</li>
<li>提供 <code>75ml</code> 的 <strong>汤A</strong> 和 <code>25ml</code> 的 <strong>汤B</strong> 。</li>
<li>提供 <code>50ml</code> 的 <strong>汤A</strong> 和 <code>50ml</code> 的 <strong>汤B</strong> 。</li>
<li>提供 <code>25ml</code> 的 <strong>汤A</strong> 和 <code>75ml</code> 的 <strong>汤B</strong> 。</li>
</ol>

<p>当我们把汤分配给某人之后，汤就没有了。每个回合，我们将从四种概率同为 <code>0.25</code> 的操作中进行分配选择。如果汤的剩余量不足以完成某次操作，我们将尽可能分配。当两种类型的汤都分配完时，停止操作。</p>

<p><strong>注意 </strong>不存在先分配 <code>100</code> ml <strong>汤B</strong> 的操作。</p>

<p>需要返回的值： <strong>汤A </strong>先分配完的概率 +  <strong>汤A和汤B </strong>同时分配完的概率 / 2。返回值在正确答案 <code>10<sup>-5</sup></code> 的范围内将被认为是正确的。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> n = 50
<strong>输出:</strong> 0.62500
<strong>解释:</strong>如果我们选择前两个操作<strong>，</strong>A 首先将变为空。
对于第三个操作，A 和 B 会同时变为空。
对于第四个操作，B 首先将变为空。<strong>
</strong>所以 A 变为空的总概率加上 A 和 B 同时变为空的概率的一半是 0.25 *(1 + 1 + 0.5 + 0)= 0.625。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> n = 100
<strong>输出:</strong> 0.71875
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>0 &lt;= n &lt;= 10<sup>9</sup></code>​​​​​​​</li>
</ul>


## 分析

容易想到用递归，令 dfs(a, b) 代表初始汤 A、B 分别 a、b 毫升时对应的概率，即可递归。

问题在于 n 的范围较大，会超时。观察发现，当 n 够大时，结果会趋近于 1。

于是找到 n=5000 时，结果与 1 的差别不超过 10^-5，所以不需要计算 n>=5000 的情况。


## 解答

```python
def soupServings(self, n: int) -> float:
    @lru_cache(None)
    def dfs(a, b):
        if a==0 or b==0:
            return 0.5 if a==b==0 else int(a==0)
        return sum(dfs(max(0, a-(4-x)*25), max(0, b-x*25)) for x in range(4)) / 4
    return dfs(n, n) if n<5000 else 1.0
```
52 ms



