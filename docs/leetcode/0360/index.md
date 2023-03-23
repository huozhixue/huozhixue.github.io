# 0360：有序转化数组（★）


> <u>**[力扣第 360 题](https://leetcode.cn/problems/sort-transformed-array/)**</u>

## 题目

<p>给你一个已经<strong> 排好序</strong> 的整数数组 <code>nums</code> 和整数 <code>a</code> 、 <code>b</code> 、 <code>c</code> 。对于数组中的每一个元素 <code>nums[i]</code> ，计算函数值 <code>f(<em>x</em>) = <em>ax</em><sup>2</sup> + <em>bx</em> + c</code> ，请 <em>按升序返回数组</em> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入: </strong>nums = [-4,-2,2,4], a = 1, b = 3, c = 5
<strong>输出: </strong>[3,9,15,33]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入: </strong>nums = [-4,-2,2,4], a = -1, b = 3, c = 5
<strong>输出: </strong>[-23,-5,1,7]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 200</code></li>
<li><code>-100 &lt;= nums[i], a, b, c &lt;= 100</code></li>
<li><code>nums</code> 按照 <strong>升序排列</strong></li>
</ul>



<p><strong>进阶：</strong>你可以在时间复杂度为 <code>O(n)</code> 的情况下解决这个问题吗？</p>


## 分析


最简单的排序即可。

要求 O(N) 的话则需要考虑到抛物线的性质，分类讨论即可。


## 解答

```python
def sortTransformedArray(self, nums: List[int], a: int, b: int, c: int) -> List[int]:
    return sorted(a*x*x+b*x+c for x in nums)
```
24 ms

