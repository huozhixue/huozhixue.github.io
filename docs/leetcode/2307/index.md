# 2307：检查方程中的矛盾之处（★★）


> <u>**[力扣第 2307 题](https://leetcode.cn/problems/check-for-contradictions-in-equations/)**</u>

## 题目

<p>给你一个由字符串二维数组 <code>equations</code> 和实数数组  <code>values</code> ，其中 <code>equations[i] = [A<sub>i</sub>, B<sub>i</sub>]</code>，<code>values[i]</code> 表示 <code>A<sub>i</sub> / B<sub>i</sub> = values[i]</code>.。</p>

<p>确定方程中是否存在矛盾。<em>如果存在矛盾则返回 <code>true</code>，否则返回 <code>false</code></em>。</p>

<p><b>注意</b>:</p>

<ul>
<li>当检查两个数字是否相等时，检查它们的 <strong>绝对差值 </strong>是否小于 <code>10<sup>-5</sup></code>.</li>
<li>生成的测试用例没有针对精度的用例，即使用 <code>double</code> 就足以解决问题。</li>
</ul>



<p><strong class="example">示例 1:</strong></p>

<pre>
<strong>输入:</strong> equations = [["a","b"],["b","c"],["a","c"]], values = [3,0.5,1.5]
<strong>输出:</strong> false
<strong>解释:
</strong>给定的方程为: a / b = 3, b / c = 0.5, a / c = 1.5
方程中没有矛盾。满足所有方程的一个可能的分配是:
a = 3, b = 1 和 c = 2.
</pre>

<p><strong class="example">示例 2:</strong></p>

<pre>
<strong>输入:</strong> equations = [["le","et"],["le","code"],["code","et"]], values = [2,5,0.5]
<strong>输出:</strong> true
<strong>解释:</strong>
给定的方程为: le / et = 2, le / code = 5, code / et = 0.5
根据前两个方程，我们得到 code / et = 0.4.
因为第三个方程是 code / et = 0.5, 所以矛盾。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= equations.length &lt;= 100</code></li>
<li><code>equations[i].length == 2</code></li>
<li><code>1 &lt;= A<sub>i</sub>.length, B<sub>i</sub>.length &lt;= 5</code></li>
<li><code>A<sub>i</sub></code>, <code>B<sub>i</sub></code> 由小写英文字母组成。</li>
<li><code>equations.length == values.length</code></li>
<li><code>0.0 &lt; values[i] &lt;= 10.0</code></li>
<li><code>values[i]</code> 小数点后最多 2 位。</li>
</ul>


**相似问题：**
- [0399：除法求值](/leetcode/0399)


## 分析

- 遍历每个连通块，dfs 并赋值，看是否有矛盾即可

## 解答

```python
eps = 1e-5
class Solution:
    def checkContradictions(self, equations: List[List[str]], values: List[float]) -> bool:
        g = defaultdict(list)
        for (u,v),w in zip(equations,values):
            g[u].append((v,1/w))
            g[v].append((u,w))
        d = {}
        for u in g:
            if u not in d:
                d[u] = 1
                sk = [u]
                while sk:
                    u = sk.pop()
                    for v,w in g[u]:
                        if v not in d:
                            d[v] = d[u]*w
                            sk.append(v)
                        elif abs(d[v]-d[u]*w)>eps:
                            return True
        return False
```
0 ms
