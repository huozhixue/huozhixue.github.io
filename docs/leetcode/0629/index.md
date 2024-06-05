# 0629：K 个逆序对数组（★★）


> <u>**[力扣第 629 题](https://leetcode.cn/problems/k-inverse-pairs-array/)**</u>

## 题目

<p>对于一个整数数组 <code>nums</code>，<strong>逆序对</strong>是一对满足 <code>0 &lt;= i &lt; j &lt; nums.length</code> 且 <code>nums[i] &gt; nums[j]</code>的整数对 <code>[i, j]</code> 。</p>

<p>给你两个整数 <code>n</code> 和 <code>k</code>，找出所有包含从 <code>1</code> 到 <code>n</code> 的数字，且恰好拥有 <code>k</code> 个 <strong>逆序对</strong> 的不同的数组的个数。由于答案可能很大，只需要返回对 <code>10<sup>9</sup> + 7</code> 取余的结果。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 3, k = 0
<strong>输出：</strong>1
<strong>解释：</strong>
只有数组 [1,2,3] 包含了从1到3的整数并且正好拥有 0 个逆序对。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 3, k = 1
<strong>输出：</strong>2
<strong>解释：</strong>
数组 [1,3,2] 和 [2,1,3] 都有 1 个逆序对。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 1000</code></li>
<li><code>0 &lt;= k &lt;= 1000</code></li>
</ul>


## 分析

假设 n 放到位置 idx，那么包含 n 的逆序对有 n-idx-1，然后转为了子问题：1 到 n-1 的排列中恰好 k-(n-idx-1) 个逆序对的个数。

因此令 dp[i][j] 代表 1 到 i 的排列中恰好 j 个逆序对的个数，即可递推：

    dp[i][j] = sum(dp[i-1][j-cnt] for cnt in range(i) if j-cnt>=0)
    
但这个时间复杂度会超时。

观察发现递推式中其实是 dp[i-1] 的连续区间的和，于是想到用前缀和。
事先保存 dp[i-1] 的前缀和数组 pre，递推式变为：

    dp[i][j] = pre[j+1]-pre[max(0, j-i+1)]
    
还可以用滚动数组将 dp 优化为一维数组。

## 解答

```python
def kInversePairs(self, n: int, k: int) -> int:
    dp, mod = [1]+[0]*k, 10**9+7
    for i in range(1, n+1):
        pre = list(accumulate([0]+dp, lambda x,y:(x+y)%mod))
        dp = [pre[j+1]-pre[max(0, j-i+1)] for j in range(k+1)]
    return dp[-1]%mod
```
548 ms

