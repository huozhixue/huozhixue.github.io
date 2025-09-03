# 3009：折线图上的最大交点数量（★★）


> <u>**[力扣第 3009 题](https://leetcode.cn/problems/maximum-number-of-intersections-on-the-chart/)**</u>

## 题目

<p>有一条由 <code>n</code> 个点连接而成的折线图。给定一个 <strong>下标从 1 开始 </strong>的整数数组 <code>y</code>，第 <code>k</code> 个点的坐标是 <code>(k, y[k])</code>。图中没有水平线，即没有两个相邻的点有相同的 y 坐标。</p>

<p>假设在图中任意画一条无限长的水平线。请返回这条水平线与折线相交的最多交点数。</p>



<p><strong class="example">示例 1：</strong></p>
<strong><a href="https://assets.leetcode.com/static_assets/others/20231208-020549.jpeg"><img alt="" src="https://assets.leetcode.com/static_assets/others/20231208-020549.jpeg" style="padding: 10px; background: rgb(255, 255, 255); border-radius: 0.5rem; height: 217px; width: 600px;" /></a></strong>

<pre>
<b>输入：</b>y = [1,2,1,2,1,3,2]
<b>输出：</b>5
<b>解释：</b>如上图所示，水平线 y = 1.5 与折线相交了 5 次（用红叉表示）。水平线 y = 2 与折线相交了 4 次（用红叉表示）。可以证明没有其他水平线可以与折线有超过 5 个点相交。因此，答案是 5。
</pre>

<p><strong class="example">示例 2：</strong></p>
<strong><img alt="" src="https://assets.leetcode.com/static_assets/others/20231208-020557.jpeg" style="padding: 10px; background: rgb(255, 255, 255); border-radius: 0.5rem; width: 400px; height: 404px;" /></strong>

<pre>
<b>输入：</b>y = [2,1,3,4,5]
<b>输出：</b>2
<b>解释：</b>如上图所示，水平线 y=1.5 与折线相交了 2 次（用红叉表示）。水平线 y=2 与折线相交了 2 次（用红叉表示）。可以证明没有其他水平线可以与折线有超过 2 个点相交。因此，答案是 2。
</pre>



<p><b>提示：</b></p>

<ul>
<li><code>2 &lt;= y.length &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= y[i] &lt;= 10<sup>9</sup></code></li>
<li>对于范围 <code>[1, n - 1]</code> 内的所有 <code>i</code>，都有 <code>y[i] != y[i + 1]</code></li>
</ul>




## 分析

- 由于最优的线可能在两点之间，不为整数，考虑将所有 y 坐标乘 2，保证最优线为整数
- 然后可以用差分，从 y1 到 y2 的折线，等同于将区间 [y1,y2] 加 1
- 注意不能重复统计，比如连续的 y1,y2,y3 的折线，y2 不能加两次

## 解答


```python
class Solution:
    def maxIntersectionCount(self, y: List[int]) -> int:
        d = defaultdict(int)
        y = [a*2 for a in y]
        d[y[0]] += 1
        d[y[0]+1] -= 1
        for a,b in pairwise(y):
            a,b = (a+1,b) if a<b else (b,a-1)
            d[a] += 1
            d[b+1] -= 1
        res,s = 0,0
        for x in sorted(d): 
            s += d[x]
            res = max(res,s)
        return res
```
579 ms
