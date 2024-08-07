# 1030：距离顺序排列矩阵单元格（1585 分）


> <u>**[力扣第 133 场周赛第 2 题](https://leetcode.cn/problems/matrix-cells-in-distance-order/)**</u>

## 题目

<p>给定四个整数 <code>rows</code> ,   <code>cols</code> ,  <code>rCenter</code> 和 <code>cCenter</code> 。有一个 <code>rows x cols</code> 的矩阵，你在单元格上的坐标是 <code>(rCenter, cCenter)</code> 。</p>

<p>返回矩阵中的所有单元格的坐标，并按与<em> </em><code>(rCenter, cCenter)</code><em> </em>的 <strong>距离</strong> 从最小到最大的顺序排。你可以按 <strong>任何</strong> 满足此条件的顺序返回答案。</p>

<p>单元格<code>(r1, c1)</code> 和 <code>(r2, c2)</code> 之间的距离为<code>|r1 - r2| + |c1 - c2|</code>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>rows = 1, cols = 2, rCenter = 0, cCenter = 0
<strong>输出：</strong>[[0,0],[0,1]]
<strong>解释</strong>：从 (r0, c0) 到其他单元格的距离为：[0,1]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>rows = 2, cols = 2, rCenter = 0, cCenter = 1
<strong>输出：</strong>[[0,1],[0,0],[1,1],[1,0]]
<strong>解释</strong>：从 (r0, c0) 到其他单元格的距离为：[0,1,1,2]
[[0,1],[1,1],[0,0],[1,0]] 也会被视作正确答案。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>rows = 2, cols = 3, rCenter = 1, cCenter = 2
<strong>输出：</strong>[[1,2],[0,2],[1,1],[0,1],[1,0],[0,0]]
<strong>解释</strong>：从 (r0, c0) 到其他单元格的距离为：[0,1,1,2,2,3]
其他满足题目要求的答案也会被视为正确，例如 [[1,2],[1,1],[0,2],[1,0],[0,1],[0,0]]。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= rows, cols &lt;= 100</code></li>
<li><code>0 &lt;= rCenter &lt; rows</code></li>
<li><code>0 &lt;= cCenter &lt; cols</code></li>
</ul>


**相似问题：**
- [2194：Excel 表中某个范围内的单元格（1253 分）](/leetcode/2194)


## 分析

### #1

直接将所有坐标按距离排序即可。

```python
def allCellsDistOrder(self, rows: int, cols: int, rCenter: int, cCenter: int) -> List[List[int]]:
    return sorted(product(range(rows), range(cols)), key=lambda p: abs(p[0]-rCenter)+abs(p[1]-cCenter))
```

60 ms

### #2

距离的范围较小，可以用桶排序。

## 解答

```python
def allCellsDistOrder(self, rows: int, cols: int, rCenter: int, cCenter: int) -> List[List[int]]:
    bucket = defaultdict(list)
    for x, y in product(range(rows), range(cols)):
        bucket[abs(x-rCenter)+abs(y-cCenter)].append([x, y])
    res = []
    for dis in range(201):
        res.extend(bucket[dis])
    return res
```

52 ms
