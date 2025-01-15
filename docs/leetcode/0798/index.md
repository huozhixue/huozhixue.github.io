# 0798：得分最高的最小轮调（2129 分）


> <u>**[力扣第 798 题](https://leetcode.cn/problems/smallest-rotation-with-highest-score/)**</u>

## 题目

<p>给你一个数组 <code>nums</code>，我们可以将它按一个非负整数 <code>k</code> 进行轮调，这样可以使数组变为 <code>[nums[k], nums[k + 1], ... nums[nums.length - 1], nums[0], nums[1], ..., nums[k-1]]</code> 的形式。此后，任何值小于或等于其索引的项都可以记作一分。</p>

<ul>
<li>例如，数组为 <code>nums = [2,4,1,3,0]</code>，我们按 <code>k = 2</code> 进行轮调后，它将变成 <code>[1,3,0,2,4]</code>。这将记为 <code>3</code> 分，因为 <code>1 &gt; 0</code> [不计分]、<code>3 &gt; 1</code> [不计分]、<code>0 &lt;= 2</code> [计 1 分]、<code>2 &lt;= 3</code> [计 1 分]，<code>4 &lt;= 4</code> [计 1 分]。</li>
</ul>

<p>在所有可能的轮调中，返回我们所能得到的最高分数对应的轮调下标 <code>k</code> 。如果有多个答案，返回满足条件的最小的下标 <code>k</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,3,1,4,0]
<strong>输出：</strong>3
<strong>解释：</strong>
下面列出了每个 k 的得分：
k = 0,  nums = [2,3,1,4,0],    score 2
k = 1,  nums = [3,1,4,0,2],    score 3
k = 2,  nums = [1,4,0,2,3],    score 3
k = 3,  nums = [4,0,2,3,1],    score 4
k = 4,  nums = [0,2,3,1,4],    score 3
所以我们应当选择 k = 3，得分最高。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,3,0,2,4]
<strong>输出：</strong>0
<strong>解释：</strong>
nums 无论怎么变化总是有 3 分。
所以我们将选择最小的 k，即 0。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= nums[i] &lt; nums.length</code></li>
</ul>




## 分析

- 考虑第 i 个元素 x=nums[i]
	- 随着 k 增大，x 的下标从 i 递减为 0，再从 n-1 递减为 i+1
	- 当 x 处于下标 [0,x] 时计分，[x+1,n-1] 时不计分
	- 考虑计分对应的 k 是什么
	- 若 x<=i
		- 则 x 的下标从 i 递减为 x 计分，从 x-1 递减为 0 不计分，从 n-1 递减为 i+1 都计分
		- 相对应的 k 从 0 到 i-x 计分，从 i-x+1 到 i 不计分，从 i+1 到 n-1 计分
	- 若 x>i
		- 则 x 的下标从 i 递减为 0 不计分，从 n-1 递减为 x 计分，从 x-1 递减为 0 不计分
		- 相对应的 k 从 0 到 i 不计分，从 i+1 到 n+i-x 计分，从 n+i-x+1 到 n-1 不计分
- 这种区间计分是典型的差分问题
- 遍历每个元素，修改差分数组，再求前缀和即得每个 k 对应的分数

## 解答


```python
class Solution:
    def bestRotation(self, nums: List[int]) -> int:
        n = len(nums)
        d = [0]*(n+1)
        for i,x in enumerate(nums):
            if x<=i:
                d[0] += 1
                d[i-x+1] -= 1
            d[i+1] += 1
            j = n+i-x+1 if x>i else n
            d[j] -= 1
        A = list(accumulate(d))
        return A.index(max(A))      
```
96 ms
