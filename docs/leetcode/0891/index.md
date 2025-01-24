# 0891：子序列宽度之和（2182 分）


> <u>**[力扣第 98 场周赛第 4 题](https://leetcode.cn/problems/sum-of-subsequence-widths/)**</u>

## 题目

<p>一个序列的 <strong>宽度</strong> 定义为该序列中最大元素和最小元素的差值。</p>

<p>给你一个整数数组 <code>nums</code> ，返回 <code>nums</code> 的所有非空 <strong>子序列</strong> 的 <strong>宽度之和</strong> 。由于答案可能非常大，请返回对 <code>10<sup>9</sup> + 7</code> <strong>取余</strong> 后的结果。</p>

<p><strong>子序列</strong> 定义为从一个数组里删除一些（或者不删除）元素，但不改变剩下元素的顺序得到的数组。例如，<code>[3,6,2,7]</code> 就是数组 <code>[0,3,1,6,2,2,7]</code> 的一个子序列。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,1,3]
<strong>输出：</strong>6
<strong>解释：</strong>子序列为 [1], [2], [3], [2,1], [2,3], [1,3], [2,1,3] 。
相应的宽度是 0, 0, 0, 1, 1, 2, 2 。
宽度之和是 6 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [2]
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>




## 分析

### #1

- 典型的贡献法
- 将 nums 排序，对于第 i 个数 x=nums[i]
	- x 作为最大数的序列有 2^i 个，贡献 x * 2^i 
	- x 作为最小数的序列有 2^(n-1-i) 个，贡献 -x * 2^(n-1-i)

```python
class Solution:
    def sumSubseqWidths(self, nums: List[int]) -> int:
        mod = 10**9+7
        nums.sort()
        n = len(nums)
        res = 0
        for i,x in enumerate(nums):
            res += x*pow(2,i,mod)
            res -= x*pow(2,n-1-i,mod)
            res %= mod
        return res
```
578 ms


### #2

可以预处理所有的 pow(2,i,mod)，节省时间
## 解答


```python
mod = 10**9+7
ma = 10**5
p = [1]*ma
for i in range(1,ma):
    p[i] = p[i-1]*2%mod
class Solution:
    def sumSubseqWidths(self, nums: List[int]) -> int:
        nums.sort()
        n = len(nums)
        res = 0
        for i,x in enumerate(nums):
            res += x*(p[i]-p[n-1-i])
            res %= mod
        return res
```
139 ms
