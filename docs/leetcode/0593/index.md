# 0593：有效的正方形（★）


> <u>**[力扣第 593 题](https://leetcode.cn/problems/valid-square/)**</u>

## 题目

<p>给定2D空间中四个点的坐标 <code>p1</code>, <code>p2</code>, <code>p3</code> 和 <code>p4</code>，如果这四个点构成一个正方形，则返回 <code>true</code> 。</p>

<p>点的坐标 <code>p<sub>i</sub></code> 表示为 <code>[xi, yi]</code> 。 <code>输入没有任何顺序</code> 。</p>

<p>一个 <strong>有效的正方形</strong> 有四条等边和四个等角(90度角)。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,1]
<strong>输出:</strong> True
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入：</strong>p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,12]
<b>输出：</b>false
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<b>输入：</b>p1 = [1,0], p2 = [-1,0], p3 = [0,1], p4 = [0,-1]
<b>输出：</b>true
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>p1.length == p2.length == p3.length == p4.length == 2</code></li>
<li><code>-10<sup>4</sup> &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>4</sup></code></li>
</ul>




## 分析

- 最简单的是从边入手
- 正方形的四个点构成六条边，其中四边相等，两对角线相等，且对角线/边长=$\sqrt 2$
- 可以证明，符合条件的也必然是正方形

## 解答


```python
class Solution:
    def validSquare(self, p1: List[int], p2: List[int], p3: List[int], p4: List[int]) -> bool:
        def cal(a,b):
            return (a[0]-b[0])**2+(a[1]-b[1])**2
        ct = Counter(cal(a,b) for a,b in combinations([p1,p2,p3,p4],2))
        x,y = min(ct),max(ct)
        return y==x*2 and ct[x]==4 and ct[y]==2
```
41 ms
