# 0059：螺旋矩阵 II（★）


> <u>**[力扣第 59 题](https://leetcode.cn/problems/spiral-matrix-ii/)**</u>

## 题目

<p>给你一个正整数 <code>n</code> ，生成一个包含 <code>1</code> 到 <code>n<sup>2</sup></code> 所有元素，且元素按顺时针顺序螺旋排列的 <code>n x n</code> 正方形矩阵 <code>matrix</code> 。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/spiraln.jpg" style="width: 242px; height: 242px;" />
<pre>
<strong>输入：</strong>n = 3
<strong>输出：</strong>[[1,2,3],[8,9,4],[7,6,5]]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>[[1]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= n <= 20</code></li>
</ul>


**相似问题：**
- [0054：螺旋矩阵](/leetcode/0054)
- [0885：螺旋矩阵 III（1678 分）](/leetcode/0885)
- [2326：螺旋矩阵 IV（1421 分）](/leetcode/2326)


## 分析 

 类似 {{< lc "0054" >}} ，模拟即可。

## 解答

```python
class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
        i,j,di,dj = 0,0,0,1
        res = [[0]*n for _ in range(n)]
        for x in range(1,n*n+1):
            res[i][j] = x
            if res[(i+di)%n][(j+dj)%n]:
                di,dj = dj,-di
            i,j = i+di,j+dj
        return res
```
43 ms

