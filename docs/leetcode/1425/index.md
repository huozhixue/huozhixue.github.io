# 1425：带限制的子序列和（2032 分）


> <u>**[力扣第 186 场周赛第 4 题](https://leetcode.cn/problems/constrained-subsequence-sum/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 和一个整数 <code>k</code> ，请你返回 <strong>非空</strong> 子序列元素和的最大值，子序列需要满足：子序列中每两个 <strong>相邻</strong> 的整数 <code>nums[i]</code> 和 <code>nums[j]</code> ，它们在原数组中的下标 <code>i</code> 和 <code>j</code> 满足 <code>i &lt; j</code> 且 <code>j - i &lt;= k</code> 。</p>

<p>数组的子序列定义为：将数组中的若干个数字删除（可以删除 0 个数字），剩下的数字按照原本的顺序排布。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>nums = [10,2,-10,5,20], k = 2
<strong>输出：</strong>37
<strong>解释：</strong>子序列为 [10, 2, 5, 20] 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>nums = [-1,-2,-3], k = 1
<strong>输出：</strong>-1
<strong>解释：</strong>子序列必须是非空的，所以我们选择最大的数字。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>nums = [10,-2,-10,-5,20], k = 2
<strong>输出：</strong>23
<strong>解释：</strong>子序列为 [10, -2, -5, 20] 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= k &lt;= nums.length &lt;= 10^5</code></li>
<li><code>-10^4 &lt;= nums[i] &lt;= 10^4</code></li>
</ul>


**相似问题：**
- [2862：完全子集的最大元素和（2291 分）](/leetcode/2862)


## 分析

- 容易写出递推式
    f[j] = max(f[j-k:j]+[0])+nums[j]
- 求滑动窗口的最值，可以用单调队列优化

## 解答

```python
class Solution:
    def constrainedSubsetSum(self, nums: List[int], k: int) -> int:
        n = len(nums)
        f = [-inf]*n
        Q = deque()
        for j,a in enumerate(nums):
            if Q and Q[0][0]<j-k:
                Q.popleft()
            f[j] = a+Q[0][1] if Q and Q[0][1]>0 else a
            while Q and Q[-1][1]<=f[j]:
                Q.pop()
            Q.append((j,f[j]))
        return max(f)
```
307 ms


