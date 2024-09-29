# 0605：种花问题


> <u>**[力扣第 605 题](https://leetcode.cn/problems/can-place-flowers/)**</u>

## 题目

<p>假设有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花不能种植在相邻的地块上，它们会争夺水源，两者都会死去。</p>

<p>给你一个整数数组 <code>flowerbed</code> 表示花坛，由若干 <code>0</code> 和 <code>1</code> 组成，其中 <code>0</code> 表示没种植花，<code>1</code> 表示种植了花。另有一个数 <code>n</code><strong> </strong>，能否在不打破种植规则的情况下种入 <code>n</code><strong> </strong>朵花？能则返回 <code>true</code> ，不能则返回 <code>false</code> 。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>flowerbed = [1,0,0,0,1], n = 1
<strong>输出：</strong>true
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>flowerbed = [1,0,0,0,1], n = 2
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= flowerbed.length &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>flowerbed[i]</code> 为 <code>0</code> 或 <code>1</code></li>
<li><code>flowerbed</code> 中不存在相邻的两朵花</li>
<li><code>0 &lt;= n &lt;= flowerbed.length</code></li>
</ul>

**相似问题：**
- [0495：提莫攻击](/leetcode/0495)
- [0735：小行星碰撞](/leetcode/0735)


## 分析

遍历空地，贪心地在能种的地方种上花，判断总数是否>=n 即可。

## 解答


```python
class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
        A = flowerbed
        res = 0
        for i,a in enumerate(A):
            if a==0 and not (i and A[i-1]) and not (i+1<len(A) and A[i+1]):
                res += 1
                A[i] = 1
        return res>=n
```
49 ms
