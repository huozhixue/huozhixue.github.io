# 0036：有效的数独（★）


> <u>**[力扣第 36 题](https://leetcode.cn/problems/valid-sudoku/)**</u>

## 题目

<p>请你判断一个 <code>9 x 9</code> 的数独是否有效。只需要<strong> 根据以下规则</strong> ，验证已经填入的数字是否有效即可。</p>

<ol>
<li>数字 <code>1-9</code> 在每一行只能出现一次。</li>
<li>数字 <code>1-9</code> 在每一列只能出现一次。</li>
<li>数字 <code>1-9</code> 在每一个以粗实线分隔的 <code>3x3</code> 宫内只能出现一次。（请参考示例图）</li>
</ol>



<p><strong>注意：</strong></p>

<ul>
<li>一个有效的数独（部分已被填充）不一定是可解的。</li>
<li>只需要根据以上规则，验证已经填入的数字是否有效即可。</li>
<li>空白格用 <code>'.'</code> 表示。</li>
</ul>



<p><strong>示例 1：</strong></p>
<img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/04/12/250px-sudoku-by-l2g-20050714svg.png" style="height:250px; width:250px" />
<pre>
<strong>输入：</strong>board =
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>board =
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
<strong>输出：</strong>false
<strong>解释：</strong>除了第一行的第一个数字从<strong> 5</strong> 改为 <strong>8 </strong>以外，空格内其他数字均与 示例1 相同。 但由于位于左上角的 3x3 宫内有两个 8 存在, 因此这个数独是无效的。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>board.length == 9</code></li>
<li><code>board[i].length == 9</code></li>
<li><code>board[i][j]</code> 是一位数字（<code>1-9</code>）或者 <code>'.'</code></li>
</ul>


**相似问题：**
- [0037：解数独](/leetcode/0037)
- [2133：检查是否每一行每一列都包含全部整数（1264 分）](/leetcode/2133)


## 分析

遍历判断数字在所属的行、列、宫中是否出现过即可。宫的序号可以由 i//3*3+j//3 得到。

## 解答

```python
class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        R,C,B = ([[0]*10 for _ in range(9)] for _ in range(3))
        for i,row in enumerate(board):
            for j,x in enumerate(row):
                if x!='.':
                    x,k = int(x),i//3*3+j//3
                    if R[i][x] or C[j][x] or B[k][x]:
                        return False
                    R[i][x]=C[j][x]=B[k][x]=1
        return True
```
46 ms
