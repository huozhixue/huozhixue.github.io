# 0037：解数独（★★）


> <u>**[力扣第 37 题](https://leetcode.cn/problems/sudoku-solver/)**</u>

## 题目

<p>编写一个程序，通过填充空格来解决数独问题。</p>

<p>数独的解法需<strong> 遵循如下规则</strong>：</p>

<ol>
<li>数字 <code>1-9</code> 在每一行只能出现一次。</li>
<li>数字 <code>1-9</code> 在每一列只能出现一次。</li>
<li>数字 <code>1-9</code> 在每一个以粗实线分隔的 <code>3x3</code> 宫内只能出现一次。（请参考示例图）</li>
</ol>

<p>数独部分空格内已填入了数字，空白格用 <code>'.'</code> 表示。</p>



<div class="top-view__1vxA">
<div class="original__bRMd">
<div>
<p><strong>示例 1：</strong></p>
<img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/04/12/250px-sudoku-by-l2g-20050714svg.png" style="height:250px; width:250px" />
<pre>
<strong>输入：</strong>board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
<strong>输出：</strong>[["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
<strong>解释：</strong>输入的数独如上图所示，唯一有效的解决方案如下所示：

<img src=" https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/04/12/250px-sudoku-by-l2g-20050714_solutionsvg.png" style="height:250px; width:250px" />
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>board.length == 9</code></li>
<li><code>board[i].length == 9</code></li>
<li><code>board[i][j]</code> 是一位数字或者 <code>'.'</code></li>
<li>题目数据 <strong>保证</strong> 输入数独仅有一个解</li>
</ul>
</div>
</div>
</div>


**相似问题：**
- [0036：有效的数独](/leetcode/0036)
- [0980：不同路径 III（1830 分）](/leetcode/0980)


## 分析

回溯法的典型应用。可以直接遍历空格位置，节省时间。

## 解答

```python
class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        R,C,B = ([[0]*10 for _ in range(9)] for _ in range(3))
        A = []
        for i in range(9):
            for j in range(9):
                k = i//3*3+j//3
                if board[i][j]=='.':
                    A.append((i,j,k))
                else:
                    x = int(board[i][j])
                    R[i][x]=C[j][x]=B[k][x]=1

        def dfs(w):
            if w==len(A):
                return True
            i,j,k = A[w]
            for x in range(1,10):
                if R[i][x]==C[j][x]==B[k][x]==0:
                    board[i][j]=str(x)
                    R[i][x]=C[j][x]=B[k][x]=1
                    if dfs(w+1):
                        return True
                    R[i][x]=C[j][x]=B[k][x]=0
            return False
        dfs(0)
```
77 ms
