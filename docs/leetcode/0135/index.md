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

- 先考虑每个孩子最少多少颗
	- 对于孩子 i，假如左侧的严格递减序列长度为 a，那么 i 至少 a 颗
	- 同理，假如右侧的严格递增序列长度为 b，那么 i 至少 b 颗
	- i 至少 max(a,b) 颗
- 反过来，给每个孩子最少的颗数，可以证明该构造符合要求
- 所以，递推求出每个位置的严格递增/减序列即可

## 解答

```python
class Solution:
    def candy(self, ratings: List[int]) -> int:
        def gen(A):
            res = [1]
            for a,b in pairwise(A):
                res.append(res[-1]+1 if a<b else 1)
            return res
        L = gen(ratings)
        R = gen(ratings[::-1])[::-1]
        return sum(max(l,r) for l,r in zip(L,R))
```
66 ms

