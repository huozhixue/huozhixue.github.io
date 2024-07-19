# 2915：和为目标值的最长子序列的长度（1658 分）


> <u>**[力扣第 116 场双周赛第 3 题](https://leetcode.cn/problems/length-of-the-longest-subsequence-that-sums-to-target/)**</u>

## 题目

<p>给你一个下标从 <strong>0</strong> 开始的整数数组 <code>nums</code> 和一个整数 <code>target</code> 。</p>

<p>返回和为 <code>target</code> 的 <code>nums</code> 子序列中，子序列 <strong>长度的最大值 </strong>。如果不存在和为 <code>target</code> 的子序列，返回 <code>-1</code> 。</p>

<p><strong>子序列</strong> 指的是从原数组中删除一些或者不删除任何元素后，剩余元素保持原来的顺序构成的数组。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<b>输入：</b>nums = [1,2,3,4,5], target = 9
<b>输出：</b>3
<b>解释：</b>总共有 3 个子序列的和为 9 ：[4,5] ，[1,3,5] 和 [2,3,4] 。最长的子序列是 [1,3,5] 和 [2,3,4] 。所以答案为 3 。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<b>输入：</b>nums = [4,1,3,2,1,5], target = 7
<b>输出：</b>4
<strong>解释：</strong>总共有 5 个子序列的和为 7 ：[4,3] ，[4,1,2] ，[4,2,1] ，[1,1,5] 和 [1,3,2,1] 。最长子序列为 [1,3,2,1] 。所以答案为 4 。
</pre>

<p><strong class="example">示例 3：</strong></p>

<pre>
<b>输入：</b>nums = [1,1,5,4,5], target = 3
<b>输出：</b>-1
<b>解释：</b>无法得到和为 3 的子序列。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 1000</code></li>
<li><code>1 &lt;= nums[i] &lt;= 1000</code></li>
<li><code>1 &lt;= target &lt;= 1000</code></li>
</ul>


**相似问题：**
- [0322：零钱兑换](/leetcode/0322)
- [0518：零钱兑换 II](/leetcode/0518)
- [3201：找出有效子序列的最大长度 I（1663 分）](/leetcode/3201)
- [3202：找出有效子序列的最大长度 II（1973 分）](/leetcode/3202)


## 分析

按选不选最后一个元素即可递推。可以将 dp 数组优化为一维。

## 解答


```python
class Solution:
    def lengthOfLongestSubsequence(self, nums: List[int], target: int) -> int:
        n = len(nums)
        f = [0]+[-inf]*target
        for x in nums:
            for j in range(target,x-1,-1):
                f[j] = max(f[j],1+f[j-x])
        return max(-1,f[-1])
```
2092 ms
