# 1420：生成数组（2175 分）


> <u>**[力扣第 185 场周赛第 4 题](https://leetcode.cn/problems/build-array-where-you-can-find-the-maximum-exactly-k-comparisons/)**</u>

## 题目

<p>给定三个整数 <code>n</code>、<code>m</code> 和 <code>k</code> 。考虑使用下图描述的算法找出正整数数组中最大的元素。</p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/04/19/e.png" style="height: 372px; width: 424px;" /></p>

<p>请你构建一个具有以下属性的数组 <code>arr</code> ：</p>

<ul>
<li><code>arr</code> 中包含确切的 <code>n</code> 个整数。</li>
<li><code>1 &lt;= arr[i] &lt;= m</code> 其中 <code>(0 &lt;= i &lt; n)</code> 。</li>
<li>将上面提到的算法应用于 <code>arr</code> 之后，<code>search_cost</code> 的值等于 <code>k</code> 。</li>
</ul>

<p>返回在满足上述条件的情况下构建数组 <code>arr</code> 的 <em>方法数量</em> ，由于答案可能会很大，所以 <strong>必须</strong> 对 <code>10^9 + 7</code> 取余。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 2, m = 3, k = 1
<strong>输出：</strong>6
<strong>解释：</strong>可能的数组分别为 [1, 1], [2, 1], [2, 2], [3, 1], [3, 2] [3, 3]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 5, m = 2, k = 3
<strong>输出：</strong>0
<strong>解释：</strong>没有数组可以满足上述条件
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 9, m = 1, k = 1
<strong>输出：</strong>1
<strong>解释：</strong>唯一可能的数组是 [1, 1, 1, 1, 1, 1, 1, 1, 1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 50</code></li>
<li><code>1 &lt;= m &lt;= 100</code></li>
<li><code>0 &lt;= k &lt;= n</code></li>
</ul>




## 分析

- 遍历时更新更大的数时才会增加 k
- 因此考虑最后一个数取 m
	- 假如 k 增加了，转为求 (n-1,m-1,k-1) 的递归子问题
	- 假如 k 未增加，转为求 n-1 个数，最大值为 m（注意必须取到），成本 k 的子问题
- 为了递归，令 f(n,m,k) 代表所求的数量，g(n,m,k) 代表上述第二种情况的数量，则有
	- f(n,m,k)=g(n,m,k)+f(n,m-1,k)
	- g(n,m,k)=f(n-1,m-1,k-1)+g(n-1,m,k)*m

## 解答


```python
mod = 10**9+7
f = [[[0]*51 for _ in range(101)] for _ in range(51)]
g = [[[0]*51 for _ in range(101)] for _ in range(51)]
for j in range(101):
    f[0][j][0] = 1
for i in range(1,51):
    for j in range(1,101):
        for k in range(1,51):
            g[i][j][k] = (f[i-1][j-1][k-1]+g[i-1][j][k]*j)%mod
            f[i][j][k] = (f[i][j-1][k]+g[i][j][k])%mod

class Solution:
    def numOfArrays(self, n: int, m: int, k: int) -> int:
        return f[n][m][k]
```
0 ms
