# 1504：统计全 1 子矩形（1845 分）


> <u>**[力扣第 196 场周赛第 3 题](https://leetcode.cn/problems/count-submatrices-with-all-ones/)**</u>

## 题目

<p>给你一个 <code>m x n</code> 的二进制矩阵 <code>mat</code> ，请你返回有多少个 <strong>子矩形</strong> 的元素全部都是 1 。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/10/27/ones1-grid.jpg" /></p>

<pre>
<strong>输入：</strong>mat = [[1,0,1],[1,1,0],[1,1,0]]
<strong>输出：</strong>13
<strong>解释：
</strong>有 <strong>6</strong> 个 1x1 的矩形。
有 <strong>2</strong> 个 1x2 的矩形。
有 <strong>3</strong> 个 2x1 的矩形。
有 <strong>1</strong> 个 2x2 的矩形。
有 <strong>1</strong> 个 3x1 的矩形。
矩形数目总共 = 6 + 2 + 3 + 1 + 1 = <strong>13</strong> 。
</pre>

<p><strong>示例 2：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/10/27/ones2-grid.jpg" /></p>

<pre>
<strong>输入：</strong>mat = [[0,1,1,0],[0,1,1,1],[1,1,1,0]]
<strong>输出：</strong>24
<strong>解释：</strong>
有 <strong>8</strong> 个 1x1 的子矩形。
有 <strong>5</strong> 个 1x2 的子矩形。
有 <strong>2</strong> 个 1x3 的子矩形。
有 <strong>4</strong> 个 2x1 的子矩形。
有 <strong>2</strong> 个 2x2 的子矩形。
有 <strong>2</strong> 个 3x1 的子矩形。
有 <strong>1</strong> 个 3x2 的子矩形。
矩形数目总共 = 8 + 5 + 2 + 4 + 2 + 2 + 1 = <strong>24</strong><strong> 。</strong>

</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= m, n &lt;= 150</code></li>
<li><code>mat[i][j]</code> 仅包含 <code>0</code> 或 <code>1</code></li>
</ul>


**相似问题：**
- [3212：统计 X 和 Y 频数相等的子矩阵数量（1672 分）](/leetcode/3212)


## 分析

- 类似 {{< lc  "0085" >}}，可以遍历每一行作为底，转为柱形图，用单调栈求解
- 假设柱子 j 上一个更小的柱子为 i，那么以 j 为右边界的矩形
	- 要么左边界<=i，即对应了以 i 为右边界的矩形
	- 要么左边界在 i 和 j 之间，高度都可以取到柱子 j 的高度
- 因此维护单调栈的同时用 dp 递推即可
## 解答


```python
class Solution:
    def numSubmat(self, mat: List[List[int]]) -> int:
        m, n = len(mat), len(mat[0])
        res, H = 0, [0]*n
        for i in range(m):
            H = [a+1 if b else 0 for a,b in zip(H,mat[i])]
            sk = []
            f = [0]*n
            for j,x in enumerate(H):
                while sk and H[sk[-1]]>=x:
                    sk.pop()
                i = sk[-1] if sk else -1
                f[j] = f[i]+(j-i)*x
                res += f[j]
                sk.append(j)
        return res
```
35 ms
