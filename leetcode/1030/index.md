# 1030：距离顺序排列矩阵单元格（★）



## 题目

给出 R 行 C 列的矩阵，其中的单元格的整数坐标为 (r, c)，满足 0 <= r < R 且 0 <= c < C。

另外，我们在该矩阵中给出了一个坐标为 (r0, c0) 的单元格。

返回矩阵中的所有单元格的坐标，并按到 (r0, c0) 的距离从最小到最大的顺序排，
其中，两单元格(r1, c1) 和 (r2, c2) 之间的距离是曼哈顿距离，|r1 - r2| + |c1 - c2|。
（你可以按任何满足此条件的顺序返回答案。）
 
提示：

- 1 <= R <= 100
- 1 <= C <= 100
- 0 <= r0 < R
- 0 <= c0 < C

 <!--more--> 
 
示例 1：

    输入：R = 1, C = 2, r0 = 0, c0 = 0
    输出：[[0,0],[0,1]]
    解释：从 (r0, c0) 到其他单元格的距离为：[0,1]

示例 2：
    
    输入：R = 2, C = 2, r0 = 0, c0 = 1
    输出：[[0,1],[0,0],[1,1],[1,0]]
    解释：从 (r0, c0) 到其他单元格的距离为：[0,1,1,2]
    [[0,1],[1,1],[0,0],[1,0]] 也会被视作正确答案。

示例 3：

    输入：R = 2, C = 3, r0 = 1, c0 = 2
    输出：[[1,2],[0,2],[1,1],[0,1],[1,0],[0,0]]
    解释：从 (r0, c0) 到其他单元格的距离为：[0,1,1,2,2,3]
    其他满足题目要求的答案也会被视为正确，例如 [[1,2],[1,1],[0,2],[1,0],[0,1],[0,0]]。


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
