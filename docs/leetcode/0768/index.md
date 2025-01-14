# 0768：最多能完成排序的块 II（1787 分）


> <u>**[力扣第 768 题](https://leetcode.cn/problems/max-chunks-to-make-sorted-ii/)**</u>

## 题目

<p>给你一个整数数组 <code>arr</code> 。</p>

<p>将 <code>arr</code> 分割成若干 <strong>块</strong> ，并将这些块分别进行排序。之后再连接起来，使得连接的结果和按升序排序后的原数组相同。</p>

<p>返回能将数组分成的最多块数？</p>


<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>arr = [5,4,3,2,1]
<strong>输出：</strong>1
<strong>解释：</strong>
将数组分成2块或者更多块，都无法得到所需的结果。
例如，分成 [5, 4], [3, 2, 1] 的结果是 [4, 5, 1, 2, 3]，这不是有序的数组。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>arr = [2,1,3,4,4]
<strong>输出：</strong>4
<strong>解释：</strong>
可以把它分成两块，例如 [2, 1], [3, 4, 4]。
然而，分成 [2, 1], [3], [4], [4] 可以得到最多的块数。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= arr.length &lt;= 2000</code></li>
<li><code>0 &lt;= arr[i] &lt;= 10<sup>8</sup></code></li>
</ul>


**相似问题：**
- [0769：最多能完成排序的块（1566 分）](/leetcode/0769)


## 分析

对于下标 i，只要 max(arr[:i+1])<=min(arr[i+1:])，即可成为分割点。

## 解答


```python
class Solution:
    def maxChunksToSorted(self, arr: List[int]) -> int:
        A = accumulate(arr[:-1],max)
        B = list(accumulate(arr[::-1],min))[::-1][1:]
        return sum(a<=b for a,b in zip(A,B))+1
```
7 ms
