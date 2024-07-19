# 0074：搜索二维矩阵（★）


> <u>**[力扣第 74 题](https://leetcode.cn/problems/search-a-2d-matrix/)**</u>

## 题目

<p>给你一个满足下述两条属性的 <code>m x n</code> 整数矩阵：</p>

<ul>
<li>每行中的整数从左到右按非严格递增顺序排列。</li>
<li>每行的第一个整数大于前一行的最后一个整数。</li>
</ul>

<p>给你一个整数 <code>target</code> ，如果 <code>target</code> 在矩阵中，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/05/mat.jpg" style="width: 322px; height: 242px;" />
<pre>
<strong>输入：</strong>matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/11/25/mat2.jpg" style="width: 322px; height: 242px;" />
<pre>
<strong>输入：</strong>matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == matrix.length</code></li>
<li><code>n == matrix[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 100</code></li>
<li><code>-10<sup>4</sup> &lt;= matrix[i][j], target &lt;= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [0240：搜索二维矩阵 II](/leetcode/0240)
- [2468：根据限制分割消息（2381 分）](/leetcode/2468)


## 分析



先二分查找定位是哪一行，再在该行中二分查找即可。

## 解答

```python
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        i = bisect_right(matrix,target,key=lambda x:x[0])-1
        j = bisect_right(matrix[max(0,i)],target)-1
        return matrix[max(0,i)][max(0,j)]==target
```
时间复杂度 O(log(M*N))，40 ms

