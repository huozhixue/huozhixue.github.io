# 0378：有序矩阵中第 K 小的元素（★）


> <u>**[力扣第 378 题](https://leetcode.cn/problems/kth-smallest-element-in-a-sorted-matrix/)**</u>

## 题目

<p>给你一个 <code>n x n</code><em> </em>矩阵 <code>matrix</code> ，其中每行和每列元素均按升序排序，找到矩阵中第 <code>k</code> 小的元素。<br />
请注意，它是 <strong>排序后</strong> 的第 <code>k</code> 小元素，而不是第 <code>k</code> 个 <strong>不同</strong> 的元素。</p>

<p>你必须找到一个内存复杂度优于 <code>O(n<sup>2</sup>)</code> 的解决方案。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
<strong>输出：</strong>13
<strong>解释：</strong>矩阵中的元素为 [1,5,9,10,11,12,13,<strong>13</strong>,15]，第 8 小元素是 13
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>matrix = [[-5]], k = 1
<strong>输出：</strong>-5
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == matrix.length</code></li>
<li><code>n == matrix[i].length</code></li>
<li><code>1 &lt;= n &lt;= 300</code></li>
<li><code>-10<sup>9</sup> &lt;= matrix[i][j] &lt;= 10<sup>9</sup></code></li>
<li>题目数据 <strong>保证</strong> <code>matrix</code> 中的所有行和列都按 <strong>非递减顺序</strong> 排列</li>
<li><code>1 &lt;= k &lt;= n<sup>2</sup></code></li>
</ul>



<p><strong>进阶：</strong></p>

<ul>
<li>你能否用一个恒定的内存(即 <code>O(1)</code> 内存复杂度)来解决这个问题?</li>
<li>你能在 <code>O(n)</code> 的时间复杂度下解决这个问题吗?这个方法对于面试来说可能太超前了，但是你会发现阅读这篇文章（ <a href="http://www.cse.yorku.ca/~andy/pubs/X+Y.pdf" target="_blank">this paper</a> ）很有趣。</li>
</ul>


**相似问题：**
- [0373：查找和最小的 K 对数字](/leetcode/0373)
- [0668：乘法表中第k小的数](/leetcode/0668)
- [0719：找出第 K 小的数对距离](/leetcode/0719)
- [0786：第 K 个最小的质数分数（2168 分）](/leetcode/0786)


## 分析

- k 很大，考虑二分
- 令 check(x) 代表矩阵中 <=x 的元素个数是否 >=k
- 二分查找第一个满足 check(x) 为真的 x 即可
- 具体求 check(x)，每一行二分查找 x 的位置即可

## 解答

```python
class Solution:
    def kthSmallest(self, matrix: List[List[int]], k: int) -> int:
        def check(x):
            return sum(bisect_right(row,x-ma) for row in matrix)>=k
        ma = 10**9
        return bisect_left(range(ma*2),True,key=check)-ma
```
45 ms

