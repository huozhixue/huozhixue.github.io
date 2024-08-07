# 0238：除自身以外数组的乘积（★）


> <u>**[力扣第 238 题](https://leetcode.cn/problems/product-of-array-except-self/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code>，返回 数组 <code>answer</code> ，其中 <code>answer[i]</code> 等于 <code>nums</code> 中除 <code>nums[i]</code> 之外其余各元素的乘积 。</p>

<p>题目数据 <strong>保证</strong> 数组 <code>nums</code>之中任意元素的全部前缀元素和后缀的乘积都在  <strong>32 位</strong> 整数范围内。</p>

<p>请 <strong>不要使用除法，</strong>且在 <code>O(n)</code> 时间复杂度内完成此题。</p>



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



<p><strong>进阶：</strong>你可以在 <code>O(1)</code> 的额外空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组 <strong>不被视为 </strong>额外空间。）</p>


**相似问题：**
- [0042：接雨水](/leetcode/0042)
- [0152：乘积最大子数组](/leetcode/0152)
- [0265：粉刷房子 II](/leetcode/0265)
- [2163：删除元素后和的最小差值（2225 分）](/leetcode/2163)
- [2906：构造乘积矩阵（2074 分）](/leetcode/2906)


## 分析

- 要求不用除法，只能求出前缀乘和后缀乘，再相乘。
- 要求常数空间，遍历时用变量维护前/后缀乘即可

## 解答

```python
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [1]*n
        s = 1
        for i in range(1,n):
            s *= nums[i-1]
            res[i] *= s
        s = 1
        for i in range(n-2,-1,-1):
            s *= nums[i+1]
            res[i] *= s
        return res
```
78 ms
