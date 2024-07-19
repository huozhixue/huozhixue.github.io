# 0055：跳跃游戏（★）


> <u>**[力扣第 55 题](https://leetcode.cn/problems/jump-game/)**</u>

## 题目

<p>给你一个非负整数数组 <code>nums</code> ，你最初位于数组的 <strong>第一个下标</strong> 。数组中的每个元素代表你在该位置可以跳跃的最大长度。</p>

<p>判断你是否能够到达最后一个下标，如果可以，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,3,1,1,4]
<strong>输出：</strong>true
<strong>解释：</strong>可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [3,2,1,0,4]
<strong>输出：</strong>false
<strong>解释：</strong>无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
<li><code>0 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>


**相似问题：**
- [0045：跳跃游戏 II](/leetcode/0045)
- [1306：跳跃游戏 III（1396 分）](/leetcode/1306)
- [1871：跳跃游戏 VII（1896 分）](/leetcode/1871)
- [2297：跳跃游戏 VIII](/leetcode/2297)
- [2617：网格图中最少访问的格子数（2581 分）](/leetcode/2617)
- [2789：合并后数组中的最大元素（1484 分）](/leetcode/2789)


## 分析

类似 {{< lc "0045" >}} ，递推出最右边界即可。

## 解答

```python
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        s,e,n = 0,0,len(nums)
        while s<=e<n:
            s,e = e+1,max(i+nums[i] for i in range(s,e+1))
        return e>=n-1
```
81 ms
