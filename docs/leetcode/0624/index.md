# 0624：数组列表中的最大距离（★）


> <u>**[力扣第 624 题](https://leetcode.cn/problems/maximum-distance-in-arrays/)**</u>

## 题目

<p>给定 <code>m</code> 个数组，每个数组都已经按照升序排好序了。现在你需要从两个不同的数组中选择两个整数（每个数组选一个）并且计算它们的距离。两个整数 <code>a</code> 和 <code>b</code> 之间的距离定义为它们差的绝对值 <code>|a-b|</code> 。你的任务就是去找到最大距离</p>

<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>
[[1,2,3],
[4,5],
[1,2,3]]
<strong>输出：</strong> 4
<strong>解释：</strong>
一种得到答案 4 的方法是从第一个数组或者第三个数组中选择 1，同时从第二个数组中选择 5 。
</pre>



<p><strong>注意：</strong></p>

<ol>
<li>每个给定数组至少会有 1 个数字。列表中至少有两个非空数组。</li>
<li><strong>所有</strong> <code>m</code> 个数组中的数字总数目在范围 [2, 10000] 内。</li>
<li><code>m</code> 个数组中所有整数的范围在 [-10000, 10000] 内。</li>
</ol>




## 分析

## 解答

```python
    def maxDistance(self, arrays: List[List[int]]) -> int:
        res, Min, Max = 0, float('inf'), float('-inf')
        for A in arrays:
            res, Min, Max = max(res, Max-A[0], A[-1]-Min), min(Min, A[0]), max(Max, A[-1])
        return res
```
160 ms
