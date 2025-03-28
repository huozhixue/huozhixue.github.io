# 1250：检查「好数组」（1983 分）


> <u>**[力扣第 161 场周赛第 4 题](https://leetcode.cn/problems/check-if-it-is-a-good-array/)**</u>

## 题目

<p>给你一个正整数数组 <code>nums</code>，你需要从中任选一些子集，然后将子集中每一个数乘以一个 <strong>任意整数</strong>，并求出他们的和。</p>

<p>假如该和结果为 <code>1</code>，那么原数组就是一个「<strong>好数组</strong>」，则返回 <code>True</code>；否则请返回 <code>False</code>。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>nums = [12,5,7,23]
<strong>输出：</strong>true
<strong>解释：</strong>挑选数字 5 和 7。
5*3 + 7*(-2) = 1
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>nums = [29,6,10]
<strong>输出：</strong>true
<strong>解释：</strong>挑选数字 29, 6 和 10。
29*1 + 6*(-3) + 10*(-1) = 1
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>nums = [3,6]
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10^5</code></li>
<li><code>1 &lt;= nums[i] &lt;= 10^9</code></li>
</ul>




## 分析

- 根据裴蜀定理，n 个数的最大公约数为 1，即可线性叠加得到 1
- 因此，判断 nums 的最大公约数是否为 1 即可

## 解答

```python
class Solution:
    def isGoodArray(self, nums: List[int]) -> bool:
        return reduce(gcd,nums)==1
```
7 ms

