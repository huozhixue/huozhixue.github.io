# 2025：分割数组的最多方案数（2217 分）


> <u>**[力扣第 62 场双周赛第 4 题](https://leetcode.cn/problems/maximum-number-of-ways-to-partition-an-array/)**</u>

## 题目

<p>给你一个下标从 <strong>0</strong> 开始且长度为 <code>n</code> 的整数数组 <code>nums</code> 。<strong>分割</strong> 数组 <code>nums</code> 的方案数定义为符合以下两个条件的 <code>pivot</code> 数目：</p>

<ul>
<li><code>1 &lt;= pivot &lt; n</code></li>
<li><code>nums[0] + nums[1] + ... + nums[pivot - 1] == nums[pivot] + nums[pivot + 1] + ... + nums[n - 1]</code></li>
</ul>

<p>同时给你一个整数 <code>k</code> 。你可以将 <code>nums</code> 中 <strong>一个</strong> 元素变为 <code>k</code> 或 <strong>不改变</strong> 数组。</p>

<p>请你返回在 <strong>至多</strong> 改变一个元素的前提下，<strong>最多</strong> 有多少种方法 <strong>分割</strong> <code>nums</code> 使得上述两个条件都满足。</p>



<p><strong>示例 1：</strong></p>

<pre><b>输入：</b>nums = [2,-1,2], k = 3
<b>输出：</b>1
<b>解释：</b>一个最优的方案是将 nums[0] 改为 k 。数组变为 [<em><strong>3</strong></em>,-1,2] 。
有一种方法分割数组：
- pivot = 2 ，我们有分割 [3,-1 | 2]：3 + -1 == 2 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><b>输入：</b>nums = [0,0,0], k = 1
<b>输出：</b>2
<b>解释：</b>一个最优的方案是不改动数组。
有两种方法分割数组：
- pivot = 1 ，我们有分割 [0 | 0,0]：0 == 0 + 0 。
- pivot = 2 ，我们有分割 [0,0 | 0]: 0 + 0 == 0 。
</pre>

<p><strong>示例 3：</strong></p>

<pre><b>输入：</b>nums = [22,4,-25,-20,-15,15,-16,7,19,-10,0,-13,-14], k = -33
<b>输出：</b>4
<b>解释：</b>一个最优的方案是将 nums[2] 改为 k 。数组变为 [22,4,<em><strong>-33</strong></em>,-20,-15,15,-16,7,19,-10,0,-13,-14] 。
有四种方法分割数组。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == nums.length</code></li>
<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>-10<sup>5</sup> &lt;= k, nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>


**相似问题：**
- [0416：分割等和子集](/leetcode/0416)
- [0698：划分为k个相等的子集](/leetcode/0698)


## 分析

- 容易想到先求出前缀和数组 P
- 不修改的情况，即是求 P[:-1] 中多少个等于 P[-1]/2
- 将 nums[i] 修改为 k 的话，增加了 add=k-nums[i]，总和变为 P[-1]+add
	- 注意修改后 P[:i] 不变，P[i:] 都将增加 add
	- 因此要求 P[:i] 中 (P[-1]+add)/2 的个数，P[i:-1] 中 (P[-1]-add)/2 的个数
- 用两个计数器分别维护 P[:i]，P[i:-1] 的计数即可

## 解答


```python
class Solution:
    def waysToPartition(self, nums: List[int], k: int) -> int:
        P = list(accumulate(nums))
        L,R = defaultdict(int),Counter(P[:-1])
        s = P[-1] 
        res = R[s//2] if s%2==0 else 0
        for x,p in zip(nums,P):
            add = k-x
            if (s+add)%2==0:
                res = max(res,L[(s+add)//2]+R[(s-add)//2])
            L[p] += 1
            R[p] -= 1
        return res
```
783 ms
