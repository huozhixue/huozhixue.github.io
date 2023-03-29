# 0238：除自身以外数组的乘积（★）


> <u>**[力扣第 238 题](https://leetcode.cn/problems/product-of-array-except-self/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code>，返回 <em>数组 <code>answer</code> ，其中 <code>answer[i]</code> 等于 <code>nums</code> 中除 <code>nums[i]</code> 之外其余各元素的乘积</em> 。</p>

<p>题目数据 <strong>保证</strong> 数组 <code>nums</code>之中任意元素的全部前缀元素和后缀的乘积都在  <strong>32 位</strong> 整数范围内。</p>

<p>请<strong>不要使用除法，</strong>且在 <code>O(<em>n</em>)</code> 时间复杂度内完成此题。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> nums = <code>[1,2,3,4]</code>
<strong>输出:</strong> <code>[24,12,8,6]</code>
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums = [-1,1,0,-3,3]
<strong>输出:</strong> [0,0,9,0,0]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>-30 &lt;= nums[i] &lt;= 30</code></li>
<li><strong>保证</strong> 数组 <code>nums</code>之中任意元素的全部前缀元素和后缀的乘积都在  <strong>32 位</strong> 整数范围内</li>
</ul>



<p><strong>进阶：</strong>你可以在 <code>O(1)</code> 的额外空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组<strong>不被视为</strong>额外空间。）</p>


## 分析

### #1

要求不用除法，只能考虑 answer[i] 等于 nums[:i] 的连乘再乘以 nums[i+1:] 的连乘。

于是先遍历得到前缀乘和后缀乘，再相乘即可。

```python
def productExceptSelf(self, nums: List[int]) -> List[int]:
    pre = list(accumulate([1]+nums[:-1], mul))
    suf = list(accumulate([1]+nums[:0:-1], mul))[::-1]
    return [a*b for a,b in zip(pre, suf)]
```
48 ms

### #2

要求常数空间，可以用 answer 先保存前缀乘的信息，再遍历后缀乘并修改。

## 解答

```python
def productExceptSelf(self, nums: List[int]) -> List[int]:
    ans, n = [1], len(nums)
    for i in range(n-1):
        ans.append(nums[i]*ans[-1])
    suf = 1
    for i in range(n-1, -1, -1):
        ans[i] *= suf
        suf *= nums[i]
    return ans
```
52 ms
