# 2183：统计可以被 K 整除的下标对数目（★★）


> <u>**[力扣第 281 场周赛第 4 题](https://leetcode.cn/problems/count-array-pairs-divisible-by-k/)**</u>

## 题目

<p>给你一个下标从 <strong>0</strong> 开始、长度为 <code>n</code> 的整数数组 <code>nums</code> 和一个整数 <code>k</code> ，返回满足下述条件的下标对 <code>(i, j)</code> 的数目：</p>

<ul>
<li><code>0 &lt;= i &lt; j &lt;= n - 1</code> 且</li>
<li><code>nums[i] * nums[j]</code> 能被 <code>k</code> 整除。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>nums = [1,2,3,4,5], k = 2
<strong>输出：</strong>7
<strong>解释：</strong>
共有 7 对下标的对应积可以被 2 整除：
(0, 1)、(0, 3)、(1, 2)、(1, 3)、(1, 4)、(2, 3) 和 (3, 4)
它们的积分别是 2、4、6、8、10、12 和 20 。
其他下标对，例如 (0, 2) 和 (2, 4) 的乘积分别是 3 和 15 ，都无法被 2 整除。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>nums = [1,2,3,4], k = 5
<strong>输出：</strong>0
<strong>解释：</strong>不存在对应积可以被 5 整除的下标对。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= nums[i], k &lt;= 10<sup>5</sup></code></li>
</ul>


## 分析

遍历所有下标对时间复杂度高。注意到 nums[i] 重要的是和 k 的公共因子，假如将 nums[i] 替换为 nums[i] 和 k 的最大公约数，
那么结果不会改变。

因此可以将 nums 替换后得到一个计数器 ct，注意到 k 的因子最多 $O(\sqrt k)$ 个，那么二重循环即可。

> 注意当 x 满足 x*x%k==0 时，对应的下标对是 ct[x] * (ct[x]-1)//2 个 



## 解答

```python
def countPairs(self, nums: List[int], k: int) -> int:
    ct = Counter(gcd(num, k) for num in nums)
    return sum(ct[x]*(ct[y]-(x==y)) for x in ct for y in ct if x*y%k==0)//2
```
116 ms
