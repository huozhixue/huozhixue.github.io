# 0850：矩形面积 II（★★★）



## 题目

我们给出了一个（轴对齐的）矩形列表 rectangles 。 
对于 rectangle[i] = [x1, y1, x2, y2]，其中（x1，y1）是矩形 i 左下角的坐标，
（x2，y2）是该矩形右上角的坐标。

找出平面中所有矩形叠加覆盖后的总面积。 由于答案可能太大，请返回它对 10 ^ 9 + 7 取模的结果。

提示：

- 1 <= rectangles.length <= 200
- rectanges[i].length = 4
- 0 <= rectangles[i][j] <= 10^9
- 矩形叠加覆盖后的总面积不会超越 2^63 - 1 ，这意味着可以用一个 64 位有符号整数来保存面积结果。


 <!--more--> 
 
示例 1：

![img](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/06/06/rectangle_area_ii_pic.png)

    输入：[[0,0,2,2],[1,0,2,3],[1,0,3,1]]
    输出：6
    解释：如图所示。

示例 2：

    输入：[[0,0,1000000000,1000000000]]
    输出：49
    解释：答案是 10^18 对 (10^9 + 7) 取模的结果， 即 (10^9)^2 → (-7)^2 = 49 。

 
## 分析

### #1

有点类似 {{< lc "0218" >}}，不过遍历坐标 x 时，要维护的不是高度集合，而是区间集合。

每一轮根据当前横坐标 cur_x 、上一轮横坐标 prev_x，上一轮区间集合覆盖的长度 prev_h，
即可计算出 cur_x 和 prev_x 之间覆盖的面积。然后更新 prev_x 和 prev_h 即可。

时间复杂度 O(N^2)，本题数据规模较小，因此可以通过。

```python
def rectangleArea(self, rectangles: List[List[int]]) -> int:
    def calsum(A):
        res, end = 0, 0
        for s, e in A:
            res += max(end, e) - max(s, end)
            end = max(end, e)
        return res

    d = defaultdict(list)
    for x1, y1, x2, y2 in rectangles:
        d[x1].append((y1, y2, 0))
        d[x2].append((y1, y2, 1))
    res, prev, A = 0, (0, 0), []
    for x in sorted(d):
        for y1, y2, flag in d[x]:
            if flag == 0:
                insort_right(A, (y1, y2))
            else:
                A.pop(bisect_left(A, (y1, y2)))
        res += prev[1] * (x-prev[0])
        prev = (x, calsum(A))
    return res % (10**9+7)
```

52 ms

### #2


## 解答

```python

```

