# 0391：完美矩形（★★★）



> **第 2 场周赛第 3 题**

## 题目

我们有 N 个与坐标轴对齐的矩形, 其中 N > 0, 判断它们是否能精确地覆盖一个矩形区域。

每个矩形用左下角的点和右上角的点的坐标来表示。例如， 一个单位正方形可以表示为 [1,1,2,2]。
 ( 左下角的点的坐标为 (1, 1) 以及右上角的点的坐标为 (2, 2) )。


示例 1:

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/rectangle_perfect.gif)

    rectangles = [
      [1,1,3,3],
      [3,1,4,2],
      [3,2,4,4],
      [1,3,2,4],
      [2,3,3,4]
    ]
    
    返回 true。5个矩形一起可以精确地覆盖一个矩形区域。
    
示例 2:

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/rectangle_separated.gif)

    rectangles = [
      [1,1,2,3],
      [1,3,2,4],
      [3,1,4,2],
      [3,2,4,4]
    ]
    
    返回 false。两个矩形之间有间隔，无法覆盖成一个矩形。
 
示例 3:

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/rectangle_hole.gif)

    rectangles = [
      [1,1,3,3],
      [3,1,4,2],
      [1,3,2,4],
      [3,2,4,4]
    ]
    
    返回 false。图形顶端留有间隔，无法覆盖成一个矩形。
 
示例 4:

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/rectangle_intersect.gif)

    rectangles = [
      [1,1,3,3],
      [3,1,4,2],
      [1,3,2,4],
      [2,2,4,4]
    ]
    
    返回 false。因为中间有相交区域，虽然形成了矩形，但不是精确覆盖。

## 分析

精确覆盖即代表没有重叠、没有间隙。考虑根据轮廓线来判断，类似 {{< lc "0218" >}}

遍历所有边缘坐标 x，维护还没掠过的高度区间集合，如果该集合精确覆盖一个区间且一直不变，即说明是完美矩形。

> 在边缘 x 处（除了第一个和最后一个 x），只需要判断新增的区间集合和弹出的区间集合是否等价即可。
>不需要真的维护整个区间集合。

## 解答

```python
def isRectangleCover(self, rectangles: List[List[int]]) -> bool:
    def merge(A):
        res = []
        for s, e in sorted(A):
            if not res or res[-1][1] < s:
                res.append([s, e])
            elif res[-1][1] == s:
                res[-1][1] = e
            else:
                return None
        return res

    d = defaultdict(list)
    for x1, y1, x2, y2 in rectangles:
        d[x1].append((y1, y2, 0))
        d[x2].append((y1, y2, 1))
    first, last = min(d), max(d)
    for x in d:
        A = merge((y1, y2) for y1, y2, flag in d[x] if flag == 0)
        B = merge((y1, y2) for y1, y2, flag in d[x] if flag == 1)
        if A is None or B is None:
            return False
        if x == first and len(A) != 1:
            return False
        if first < x < last and A != B:
            return False
    return True
```
时间复杂度 O(N*logN)，80 ms


