# 2941：子数组的最大 GCD-Sum（★★）


> <u>**[力扣第 2941 题](https://leetcode.cn/problems/maximum-gcd-sum-of-a-subarray/)**</u>

## 题目

<p>给定一个整数数组 <code>nums</code> 和一个整数 <code>k</code>.</p>

<p>数组 <code>a</code> 的 <strong>gcd-sum</strong> 计算方法如下：</p>

<ul>
<li>设 <code>s</code> 为 <code>a</code> 的所有元素的和。</li>
<li>设 <code>g</code> 为 <code>a</code> 的所有元素的 <strong>最大公约数</strong>。</li>
<li><code>a</code> 的 gcd-sum 等于 <code>s * g</code>.</li>
</ul>

<p>返回 <em><code>nums</code> 的至少包含 <code>k</code> 个元素的子数组的 <strong>最大 gcd-sum</strong>。</em></p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<b>输入：</b>nums = [2,1,4,4,4,2], k = 2
<b>输出：</b>48
<b>解释：</b>我们选择子数组 [4,4,4]，该数组的 gcd-sum 为 4 * (4 + 4 + 4) = 48。
可以证明我们无法选择任何其他 gcd-sum 大于 48 的子数组。</pre>

<p><b>示例 2：</b></p>

<pre>
<b>输入：</b>nums = [7,3,9,4], k = 1
<b>输出：</b>81
<b>解释：</b>我们选择子数组 [9]，该数组的 gcd-sum 为 9 * 9 = 81。
可以证明我们无法选择任何其他 gcd-sum 大于 81 的子数组。</pre>



<p><b>提示：</b></p>

<ul>
<li><code>n == nums.length</code></li>
<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= nums[i] &lt;= 10<sup>6</sup></code></li>
<li><code>1 &lt;= k &lt;= n</code></li>
</ul>




## 分析

- 典型的 log trick：固定子数组右端点，最多对应 log 段 gcd 值不同的子数组

## 解答


```python
class Solution:
    def maxGcdSum(self, nums: List[int], k: int) -> int:
        p = list(accumulate([0]+nums))
        res = 0
        sk = []
        for j,x in enumerate(nums):
            tmp,sk = sk,[[j,x]]
            for i,y in tmp:
                if gcd(x,y)<x:
                    x = gcd(x,y)
                    sk.append([i,x])
                else:
                    sk[-1][0] = i
            for i,y in sk:
                if j-i+1>=k:
                    res = max(res,y*(p[j+1]-p[i]))
        return res
```
1085 ms
