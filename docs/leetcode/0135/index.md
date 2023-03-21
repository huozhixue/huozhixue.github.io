# 0135：分发糖果（★★）


> <u>**[力扣第 135 题](https://leetcode.cn/problems/candy/)**</u>

## 题目

<p><code>n</code> 个孩子站成一排。给你一个整数数组 <code>ratings</code> 表示每个孩子的评分。</p>

<p>你需要按照以下要求，给这些孩子分发糖果：</p>

<ul>
<li>每个孩子至少分配到 <code>1</code> 个糖果。</li>
<li>相邻两个孩子评分更高的孩子会获得更多的糖果。</li>
</ul>

<p>请你给每个孩子分发糖果，计算并返回需要准备的 <strong>最少糖果数目</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>ratings = [1,0,2]
<strong>输出：</strong>5
<strong>解释：</strong>你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>ratings = [1,2,2]
<strong>输出：</strong>4
<strong>解释：</strong>你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。
第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == ratings.length</code></li>
<li><code>1 &lt;= n &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>0 &lt;= ratings[i] &lt;= 2 * 10<sup>4</sup></code></li>
</ul>


## 分析

考虑每个孩子最少多少颗：
- 对于孩子 i，假如左侧的严格递减序列长度为 left[i]，那么 i 至少 left[i] 颗
- 同理，假如右侧的严格递减序列长度为 right[i]，那么 i 至少 right[i] 颗
- 孩子 i 发 max(left[i],right[i]) 颗即可
- left 和 right 数组可以一趟递推求出

## 解答

```python
def candy(self, ratings: List[int]) -> int:
    n = len(ratings)
    left, right = [1] * n, [1] * n
    for i in range(1, n):
        left[i] = left[i-1] + 1 if ratings[i] > ratings[i-1] else 1
    for i in range(n-2, -1, -1):
        right[i] = right[i+1] + 1 if ratings[i] > ratings[i+1] else 1
    return sum(max(l, r) for l, r in zip(left, right))
```
68 ms

