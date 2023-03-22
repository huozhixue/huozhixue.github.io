# 0055：跳跃游戏（★）


> <u>**[力扣第 55 题](https://leetcode.cn/problems/jump-game/)**</u>

## 题目

<p>给定一个非负整数数组 <code>nums</code> ，你最初位于数组的 <strong>第一个下标</strong> 。</p>

<p>数组中的每个元素代表你在该位置可以跳跃的最大长度。</p>

<p>判断你是否能够到达最后一个下标。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,3,1,1,4]
<strong>输出：</strong>true
<strong>解释：</strong>可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [3,2,1,0,4]
<strong>输出：</strong>false
<strong>解释：</strong>无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 3 * 10<sup>4</sup></code></li>
<li><code>0 <= nums[i] <= 10<sup>5</sup></code></li>
</ul>


## 分析

和 {{< lc "0045" >}} 类似，考虑跳不了的特殊情况即可。

## 解答

```python
def canJump(self, nums: List[int]) -> bool:
    s, e = 0, 1
    while s < e < len(nums):
        s, e = e, max(i + nums[i] for i in range(s, e)) + 1
    return e >= len(nums)
```
92 ms
