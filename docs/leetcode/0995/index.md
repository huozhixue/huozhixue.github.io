# 0995：K 连续位的最小翻转次数（1835 分）


> <u>**[力扣第 124 场周赛第 3 题](https://leetcode.cn/problems/minimum-number-of-k-consecutive-bit-flips/)**</u>

## 题目

<p>给定一个二进制数组 <code>nums</code> 和一个整数 <code>k</code> 。</p>

<p><strong>k位翻转</strong> 就是从 <code>nums</code> 中选择一个长度为 <code>k</code> 的 <strong>子数组</strong> ，同时把子数组中的每一个 <code>0</code> 都改成 <code>1</code> ，把子数组中的每一个 <code>1</code> 都改成 <code>0</code> 。</p>

<p>返回数组中不存在 <code>0</code> 所需的最小 <strong>k位翻转</strong> 次数。如果不可能，则返回 <code>-1</code> 。</p>

<p><strong>子数组</strong> 是数组的 <strong>连续</strong> 部分。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [0,1,0], K = 1
<strong>输出：</strong>2
<strong>解释：</strong>先翻转 A[0]，然后翻转 A[2]。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,1,0], K = 2
<strong>输出：</strong>-1
<strong>解释：</strong>无论我们怎样翻转大小为 2 的子数组，我们都不能使数组变为 [1,1,1]。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [0,0,0,1,0,1,1,0], K = 3
<strong>输出：</strong>3
<strong>解释：</strong>
翻转 A[0],A[1],A[2]: A变成 [1,1,1,1,0,1,1,0]
翻转 A[4],A[5],A[6]: A变成 [1,1,1,1,1,0,0,0]
翻转 A[5],A[6],A[7]: A变成 [1,1,1,1,1,1,1,1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= k &lt;= nums.length</code></li>
</ul>


**相似问题：**
- [0319：灯泡开关](/leetcode/0319)
- [2167：移除所有载有违禁货物车厢所需的最少时间（2219 分）](/leetcode/2167)
- [2450：应用操作后不同二进制字符串的数量](/leetcode/2450)
- [3191：使二进制数组全部等于 1 的最少操作次数 I（1311 分）](/leetcode/3191)


## 分析

- 遍历 nums[i]，假如 nums[i] 为 0，必须翻转 nums[i:i+k-1]
- 每次都实际翻转太耗时，考虑只记录翻转的 i 的列表 Q
- 计算 Q 中有多少个 >i-k 的下标，即可知道 nums[i] 当前实际的值

## 解答


```python
class Solution:
    def minKBitFlips(self, nums: List[int], k: int) -> int:
        res, Q = 0, deque()
        for j,x in enumerate(nums):
            if Q and Q[0]==j-k:
                Q.popleft()
            if len(Q)%2^x==0:
                if j+k>len(nums):
                    return -1
                Q.append(j)
                res += 1
        return res
```
62 ms
