# 0363：矩形区域不超过 K 的最大数值和（★★）


> <u>**[力扣第 363 题](https://leetcode.cn/problems/max-sum-of-rectangle-no-larger-than-k/)**</u>

## 题目

<p>给你一个 <code>m x n</code> 的矩阵 <code>matrix</code> 和一个整数 <code>k</code> ，找出并返回矩阵内部矩形区域的不超过 <code>k</code> 的最大数值和。</p>

<p>题目数据保证总会存在一个数值和不超过 <code>k</code> 的矩形区域。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/18/sum-grid.jpg" style="width: 255px; height: 176px;" />
<pre>
<strong>输入：</strong>matrix = [[1,0,1],[0,-2,3]], k = 2
<strong>输出：</strong>2
<strong>解释：</strong>蓝色边框圈出来的矩形区域 <code>[[0, 1], [-2, 3]]</code> 的数值和是 2，且 2 是不超过 k 的最大数字（k = 2）。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>matrix = [[2,2,-1]], k = 3
<strong>输出：</strong>3
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == matrix.length</code></li>
<li><code>n == matrix[i].length</code></li>
<li><code>1 <= m, n <= 100</code></li>
<li><code>-100 <= matrix[i][j] <= 100</code></li>
<li><code>-10<sup>5</sup> <= k <= 10<sup>5</sup></code></li>
</ul>



<p><strong>进阶：</strong>如果行数远大于列数，该如何设计解决方案？</p>


## 分析

矩形区域的个数是 $O(M^2N^2)$ 级别，光遍历就会超时了。因此要考虑不完全遍历的方法：
- 左右边界固定为 <y1,y2> 时，求出每一行 [y1,y2] 的区间和，得到数组 A
- 问题转为求 A 中不超过 k 的最大区间和，可以用前缀和+有序集合解决
- 预先保存每一行的前缀和，即可快速求出每一行 [y1,y2] 的区间和

## 解答

```python
def maxSumSubmatrix(self, matrix: List[List[int]], k: int) -> int:
    from sortedcontainers import SortedList
    res, m, n = float('-inf'), len(matrix), len(matrix[0])
    P = [list(accumulate([0]+row)) for row in matrix]
    for y1 in range(n):
        for y2 in range(y1, n):
            A = [row[y2+1]-row[y1] for row in P]
            sl = SortedList([0])
            for x in accumulate(A):
                pos = sl.bisect_left(x-k)
                if pos<len(sl):
                    res = max(res, x-sl[pos])
                sl.add(x)
    return res
```
时间复杂度 $O(N^2MlogM)$，4684 ms

