# 1390：四因数（1478 分）


> <u>**[力扣第 181 场周赛第 2 题](https://leetcode.cn/problems/four-divisors/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code>，请你返回该数组中恰有四个因数的这些整数的各因数之和。如果数组中不存在满足题意的整数，则返回 <code>0</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [21,4,7]
<strong>输出：</strong>32
<strong>解释：</strong>
21 有 4 个因数：1, 3, 7, 21
4 有 3 个因数：1, 2, 4
7 有 2 个因数：1, 7
答案仅为 21 的所有因数的和。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums = [21,21]
<strong>输出:</strong> 64
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> nums = [1,2,3,4,5]
<strong>输出:</strong> 0</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>




## 分析

预处理每个数的因子个数/和即可

## 解答


```python []
N = 10**5+1
f = [0]*N
g = [0]*N
for i in range(1,N):
    for j in range(i,N,i):
        f[j] += 1
        g[j] += i

class Solution:
    def sumFourDivisors(self, nums: List[int]) -> int:
        return sum(g[x] for x in nums if f[x]==4)
```
1 ms
