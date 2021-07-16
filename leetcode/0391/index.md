# 0391：完美矩形（★★★）


第 2 场周赛第 3 题

## 题目

我们有 N 个与坐标轴对齐的矩形, 其中 N > 0, 判断它们是否能精确地覆盖一个矩形区域。

每个矩形用左下角的点和右上角的点的坐标来表示。例如， 一个单位正方形可以表示为 [1,1,2,2]。
 ( 左下角的点的坐标为 (1, 1) 以及右上角的点的坐标为 (2, 2) )。


 <!--more--> 


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

### #1

类似 {{< lc "0218" >}}，不过遍历坐标 x 时，要维护的不是高度集合，而是区间集合。

显然精确覆盖等价于每轮（除了最后一轮外）的区间集合内满足：区间互不覆盖、能合并为一个大区间、大区间恒定。

```python
def isRectangleCover(self, rectangles: List[List[int]]) -> bool:
    d = defaultdict(list)
    for x1, y1, x2, y2 in rectangles:
        d[x1].append((y1, y2, 0))
        d[x2].append((y1, y2, 1))
    A, prev = [], None
    for x in sorted(d)[:-1]:
        for y1, y2, flag in d[x]:
            if flag == 0:
                insort_right(A, (y1, y2))
            else:
                A.pop(bisect_left(A, (y1, y2)))
        if not A or any(A[i][1] != A[i+1][0] for i in range(len(A)-1)):
            return False
        prev = prev if prev else (A[0][0], A[-1][1])
        if (A[0][0], A[-1][1]) != prev:
            return False
    return True
```
2488 ms

### #2

还可以进一步优化。
发现对于中间轮（第一轮和最后一轮以外），只要添加的区间集合和弹出的区间集合满足条件即可，不需要维护总的区间集合。

## 解答

```python
def isRectangleCover(self, rectangles: List[List[int]]) -> bool:
    def merge(A):
        res = []
        for s, e in A:
            if res and res[-1][1] == s:
                res[-1][1] = e
            else:
                res.append([s, e])
        return res

    d = defaultdict(lambda: defaultdict(list))
    for x1, y1, x2, y2 in rectangles:
        insort_right(d[x1][0], (y1, y2))
        insort_right(d[x2][1], (y1, y2))
    for i, x in enumerate(sorted(d)[:-1]):
        A, B = d[x][0], d[x][1]
        if i == 0:
            if any(A[i][1] != A[i+1][0] for i in range(len(A)-1)):
                return False
        elif any(A[i][1] > A[i+1][0] for i in range(len(A)-1)) or merge(A) != merge(B):
            return False
    return True
```

116 ms


