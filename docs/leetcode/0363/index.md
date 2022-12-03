# 0363：矩形区域不超过 K 的最大数值和（★★★）


## 题目

给你一个 m x n 的矩阵 matrix 和一个整数 k ，
找出并返回矩阵内部矩形区域的不超过 k 的最大数值和。

题目数据保证总会存在一个数值和不超过 k 的矩形区域。


示例 1：

![img](https://assets.leetcode.com/uploads/2021/03/18/sum-grid.jpg)

    输入：matrix = [[1,0,1],[0,-2,3]], k = 2
    输出：2
    解释：蓝色边框圈出来的矩形区域 [[0, 1], [-2, 3]] 的数值和是 2，
    且 2 是不超过 k 的最大数字（k = 2）。

示例 2：

    输入：matrix = [[2,2,-1]], k = 3
    输出：3
 
 提示：
- m == matrix.length
- n == matrix[i].length
- 1 <= m, n <= 100
- -100 <= matrix[i][j] <= 100
- -10^5 <= k <= 10^5

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
