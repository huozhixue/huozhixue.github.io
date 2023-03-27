# 0118：杨辉三角


> <u>**[力扣第 118 题](https://leetcode.cn/problems/pascals-triangle/)**</u>

## 题目

<p>给定一个非负整数 <em><code>numRows</code>，</em>生成「杨辉三角」的前 <em><code>numRows</code> </em>行。</p>

<p><small>在「杨辉三角」中，每个数是它左上方和右上方的数的和。</small></p>

<p><img alt="" src="https://pic.leetcode-cn.com/1626927345-DZmfxB-PascalTriangleAnimated2.gif" /></p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> numRows = 5
<strong>输出:</strong> [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> numRows = 1
<strong>输出:</strong> [[1]]
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 <= numRows <= 30</code></li>
</ul>


## 分析

每层迭代即可。

## 解答

```python
def generate(self, numRows: int) -> List[List[int]]:
    res = [[1]]
    for _ in range(numRows-1):
        res.append([1]+[a+b for a,b in pairwise(res[-1])]+[1])
    return res
```
32 ms

