# 1326：灌溉花园的最少水龙头数目（1885 分）


> <u>**[力扣第 172 场周赛第 4 题](https://leetcode.cn/problems/minimum-number-of-taps-to-open-to-water-a-garden/)**</u>

## 题目

<p>在 x 轴上有一个一维的花园。花园长度为 <code>n</code>，从点 <code>0</code> 开始，到点 <code>n</code> 结束。</p>

<p>花园里总共有 <code>n + 1</code> 个水龙头，分别位于 <code>[0, 1, ..., n]</code> 。</p>

<p>给你一个整数 <code>n</code> 和一个长度为 <code>n + 1</code> 的整数数组 <code>ranges</code> ，其中 <code>ranges[i]</code> （下标从 0 开始）表示：如果打开点 <code>i</code> 处的水龙头，可以灌溉的区域为 <code>[i -  ranges[i], i + ranges[i]]</code> 。</p>

<p>请你返回可以灌溉整个花园的 <strong>最少水龙头数目</strong> 。如果花园始终存在无法灌溉到的地方，请你返回 <strong>-1</strong> 。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/19/1685_example_1.png" /></p>

<pre>
<strong>输入：</strong>n = 5, ranges = [3,4,1,1,0,0]
<strong>输出：</strong>1
<strong>解释：
</strong>点 0 处的水龙头可以灌溉区间 [-3,3]
点 1 处的水龙头可以灌溉区间 [-3,5]
点 2 处的水龙头可以灌溉区间 [1,3]
点 3 处的水龙头可以灌溉区间 [2,4]
点 4 处的水龙头可以灌溉区间 [4,4]
点 5 处的水龙头可以灌溉区间 [5,5]
只需要打开点 1 处的水龙头即可灌溉整个花园 [0,5] 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 3, ranges = [0,0,0,0]
<strong>输出：</strong>-1
<strong>解释：</strong>即使打开所有水龙头，你也无法灌溉整个花园。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>
<li><code>ranges.length == n + 1</code></li>
<li><code>0 &lt;= ranges[i] &lt;= 100</code></li>
</ul>




## 分析

- 本质上是求用最少的区间覆盖的问题，类似于 {{< lc "0045" >}}
- 递推第 i 步能覆盖的新区间即可

## 解答


```python
class Solution:
    def minTaps(self, n: int, ranges: List[int]) -> int:
        A = list(range(n+1))
        for i,x in enumerate(ranges):
            j = max(0,i-x)
            A[j] = max(A[j],i+x)
        res,l,r = 0,0,0
        while l<=r<n:
            l,r = r+1,max(A[i] for i in range(l,r+1))
            res += 1
        return res if r>=n else -1
```
19 ms
