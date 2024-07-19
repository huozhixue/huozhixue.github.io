# 0330：按要求补齐数组（★★）


> <u>**[力扣第 330 题](https://leetcode.cn/problems/patching-array/)**</u>

## 题目

<p>给定一个已排序的正整数数组 <code>nums</code> <em>，</em>和一个正整数 <code>n</code><em> 。</em>从 <code>[1, n]</code> 区间内选取任意个数字补充到 nums 中，使得 <code>[1, n]</code> 区间内的任何数字都可以用 nums 中某几个数字的和来表示。</p>

<p>请返回 <em>满足上述要求的最少需要补充的数字个数</em> 。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入: </strong>nums = <code>[1,3]</code>, n = <code>6</code>
<strong>输出: </strong>1
<strong>解释:</strong>
根据 nums 里现有的组合 <code>[1], [3], [1,3]</code>，可以得出 <code>1, 3, 4</code>。
现在如果我们将 <code>2</code> 添加到 nums 中， 组合变为: <code>[1], [2], [3], [1,3], [2,3], [1,2,3]</code>。
其和可以表示数字 <code>1, 2, 3, 4, 5, 6</code>，能够覆盖 <code>[1, 6]</code> 区间里所有的数。
所以我们最少需要添加一个数字。</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入: </strong>nums = <code>[1,5,10]</code>, n = <code>20</code>
<strong>输出:</strong> 2
<strong>解释: </strong>我们需要添加 <code>[2,4]</code>。
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入: </strong>nums = <code>[1,2,2]</code>, n = <code>5</code>
<strong>输出:</strong> 0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 1000</code></li>
<li><code>1 &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
<li><code>nums</code> 按 <strong>升序排列</strong></li>
<li><code>1 &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>
</ul>


**相似问题：**
- [1798：你能构造出连续值的最大数目（1931 分）](/leetcode/1798)


## 分析

- 假设当前能表示的区间是 [1,s]
- 如果 nums[i]<=s+1，插入 nums[i]，s 变为 s+nums[i]
- 否则，必须要补充 s+1，更新 s 为 s+s+1
- 循环直到 s>=n 为止

## 解答

```python
class Solution:
    def minPatches(self, nums: List[int], n: int) -> int:
        res = 0
        s,i = 0,0
        while s<n:
            if i<len(nums) and nums[i]<=s+1:
                s += nums[i]
                i += 1
            else:
                s += s+1
                res += 1
        return res
```
42 ms

