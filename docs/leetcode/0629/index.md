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


**相似问题：**
- [3193：统计逆序对的数目（2266 分）](/leetcode/3193)


## 分析

### #1
- 先考虑 n 放哪，假如 n 放到位置 i，包含 n 的逆序对有 n-i-1，转为子问题：1 到 n-1 的排列中恰好 k-(n-i-1) 个逆序对的个数
- n 产生的逆序对个数范围为 [0,n-1]
- 令 f(i,j) 代表 1 到 i 的排列中恰好 j 个逆序对的个数，即可递推：
    f(i,j) = sum(f(i-1,j-a) for a in range(i) if a<=j)
- 显然递推式可以用前缀和优化
- 还可以用滚动数组将 f 优化为一维数组

```python
class Solution:
    def kInversePairs(self, n: int, k: int) -> int:
        mod = 10**9+7
        f = [1]+[0]*k
        for i in range(2,n+1):
            g = list(accumulate(f))
            for j in range(k+1):
                f[j] = g[j]-(g[j-i] if j>=i else 0)
                f[j] %= mod
        return f[-1]
```
303 ms

### #2

还可以只用 f 数组，注意遍历顺序即可。
## 解答

```python
class Solution:
    def kInversePairs(self, n: int, k: int) -> int:
        mod = 10**9+7
        f = [1]+[0]*k
        for i in range(2,n+1):
            for j in range(1,k+1):
                f[j] = (f[j]+f[j-1])%mod
            for j in range(k,i-1,-1):
                f[j] = (f[j]-f[j-i])%mod
        return f[-1]
```
251 ms

