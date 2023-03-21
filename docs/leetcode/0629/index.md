# 0629：K个逆序对数组（★★）


> <u>**[力扣第 38 场双周赛第 2 题](https://leetcode.cn/problems/k-inverse-pairs-array/)**</u>

## 题目

<p>给出两个整数 <code>n</code> 和 <code>k</code>，找出所有包含从 <code>1</code> 到 <code>n</code> 的数字，且恰好拥有 <code>k</code> 个逆序对的不同的数组的个数。</p>

<p>逆序对的定义如下：对于数组的第<code>i</code>个和第 <code>j</code>个元素，如果满<code>i</code> &lt; <code>j</code>且 <code>a[i]</code> &gt; <code>a[j]</code>，则其为一个逆序对；否则不是。</p>

<p>由于答案可能很大，只需要返回 答案 mod 10<sup>9</sup> + 7 的值。</p>

<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> n = 3, k = 0
<strong>输出:</strong> 1
<strong>解释:</strong>
只有数组 [1,2,3] 包含了从1到3的整数并且正好拥有 0 个逆序对。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> n = 3, k = 1
<strong>输出:</strong> 2
<strong>解释:</strong>
数组 [1,3,2] 和 [2,1,3] 都有 1 个逆序对。
</pre>

<p><strong>说明:</strong></p>

<ol>
<li> <code>n</code> 的范围是 [1, 1000] 并且 <code>k</code> 的范围是 [0, 1000]。</li>
</ol>


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

