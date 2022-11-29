# 0085：最大矩形（★★★）


## 题目

给定一个仅包含 0 和 1 、大小为 rows x cols 的二维二进制矩阵，找出只包含 1 的最大矩形，
并返回其面积。


示例 1：

![img](https://assets.leetcode.com/uploads/2020/09/14/maximal.jpg)

    输入：matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],
    ["1","0","0","1","0"]]
    输出：6
    解释：最大矩形如上图所示。

示例 2：

    输入：matrix = []
    输出：0

示例 3：

    输入：matrix = [["0"]]
    输出：0

示例 4：

    输入：matrix = [["1"]]
    输出：1

示例 5：

    输入：matrix = [["0","0"]]
    输出：0

提示：
- rows == matrix.length
- cols == matrix[0].length
- 0 <= row, cols <= 200
- matrix[i][j] 为 '0' 或 '1'

## 分析

固定矩形的底在第 i 行，求出每列的高度 H[i][j]，即转为问题 {{< lc "0084" >}}。

注意 H[i][j] 可以由 H[i-1][j] 递推得到，故总的时间复杂度 O(M*N)。

## 解答

```python
def maximalRectangle(self, matrix: List[List[str]]) -> int:
    def cal(H):
        res, stack = 0, []
        for j, y in enumerate(H+[0]):
            while stack and stack[-1][1] >= y:
                i, x = stack.pop()
                left = stack[-1][0] if stack else -1
                res = max(res, x*(j-left-1))
            stack.append((j, y))
        return res

    m, n = len(matrix), len(matrix[0])
    res, H = 0, [0] * n
    for i in range(m):
        for j in range(n):
            H[j] = H[j] + 1 if matrix[i][j] == '1' else 0
        res = max(res, cal(H))
    return res
```
124 ms
