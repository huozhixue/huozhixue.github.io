# 0119：杨辉三角 II


> <u>**[力扣第 119 题](https://leetcode.cn/problems/pascals-triangle-ii/)**</u>

## 题目

<p>给定一个非负索引 <code>rowIndex</code>，返回「杨辉三角」的第 <code>rowIndex</code><em> </em>行。</p>

<p><small>在「杨辉三角」中，每个数是它左上方和右上方的数的和。</small></p>

<p><img alt="" src="https://pic.leetcode-cn.com/1626927345-DZmfxB-PascalTriangleAnimated2.gif" /></p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> rowIndex = 3
<strong>输出:</strong> [1,3,3,1]
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> rowIndex = 0
<strong>输出:</strong> [1]
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> rowIndex = 1
<strong>输出:</strong> [1,1]
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>0 <= rowIndex <= 33</code></li>
</ul>



<p><strong>进阶：</strong></p>

<p>你可以优化你的算法到 <code><em>O</em>(<i>rowIndex</i>)</code> 空间复杂度吗？</p>


## 分析

迭代时覆盖上一层即可节省空间。

## 解答

```python
def getRow(self, rowIndex: int) -> List[int]:
    res = [1]
    for _ in range(rowIndex):
        res = [1] + [a+b for a,b in pairwise(res)] + [1]
    return res
```
32 ms

## *附加

也可以利用数学知识，杨辉三角的第 k 行其实就是：

$$[ C_k^0, C_k^1, ..., C_k^k ]$$

```python
def getRow(self, rowIndex: int) -> List[int]:
	return [comb(rowIndex, i) for i in range(rowIndex+1)]
```
40 ms

