# 0523：连续的子数组和（★）


> <u>**[力扣第 523 题](https://leetcode.cn/problems/continuous-subarray-sum/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 和一个整数 <code>k</code> ，如果 <code>nums</code> 有一个 <strong>好的子数组</strong> 返回 <code>true</code> ，否则返回 <code>false</code>：</p>

<p>一个 <strong>好的子数组</strong> 是：</p>

<ul>
<li>长度 <strong>至少为 2</strong> ，且</li>
<li>子数组元素总和为 <code>k</code> 的倍数。</li>
</ul>

<p><strong>注意</strong>：</p>

<ul>
<li><strong>子数组</strong> 是数组中 <strong>连续</strong> 的部分。</li>
<li>如果存在一个整数 <code>n</code> ，令整数 <code>x</code> 符合 <code>x = n * k</code> ，则称 <code>x</code> 是 <code>k</code> 的一个倍数。<code>0</code> <strong>始终</strong> 视为 <code>k</code> 的一个倍数。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [23<u>,2,4</u>,6,7], k = 6
<strong>输出：</strong>true
<strong>解释：</strong>[2,4] 是一个大小为 2 的子数组，并且和为 6 。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [<u>23,2,6,4,7</u>], k = 6
<strong>输出：</strong>true
<strong>解释：</strong>[23, 2, 6, 4, 7] 是大小为 5 的子数组，并且和为 42 。
42 是 6 的倍数，因为 42 = 7 * 6 且 7 是一个整数。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [23,2,6,4,7], k = 13
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
<li><code>0 &lt;= sum(nums[i]) &lt;= 2<sup>31</sup> - 1</code></li>
<li><code>1 &lt;= k &lt;= 2<sup>31</sup> - 1</code></li>
</ul>


**相似问题：**
- [0560：和为 K 的子数组](/leetcode/0560)
- [2009：使数组连续的最少操作数（2084 分）](/leetcode/2009)
- [2121：相同元素的间隔之和（1760 分）](/leetcode/2121)
- [2772：使数组中的所有元素都等于零（2029 分）](/leetcode/2772)


## 分析

- 子数组和容易想到前缀和
- 问题即是找两个前缀关于 k 同余，用哈希表即可

## 解答

```python
class Solution:
    def checkSubarraySum(self, nums: List[int], k: int) -> bool:
        d = {0:-1}
        s = 0
        for i,x in enumerate(nums):
            s = (s+x)%k
            if s in d and d[s]+2<=i:
                return True
            d.setdefault(s,i)
        return False
```
88 ms

