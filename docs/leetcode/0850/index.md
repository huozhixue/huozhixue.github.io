# 0850：矩形面积 II（★★★）


> **第 88 场周赛第 4 题**

## 题目

我们给出了一个（轴对齐的）二维矩形列表 rectangles 。 对于 rectangle[i] = [x1, y1, x2, y2]，
其中（x1，y1）是矩形 i 左下角的坐标， (xi1, yi1) 是该矩形 左下角 的坐标， (xi2, yi2) 是该矩形 右上角 的坐标。

计算平面中所有 rectangles 所覆盖的 总面积 。任何被两个或多个矩形覆盖的区域应只计算 一次 。

返回 总面积 。因为答案可能太大，返回 10^9 + 7 的 模 。
 
示例 1：

![img](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/06/06/rectangle_area_ii_pic.png)

    输入：rectangles = [[0,0,2,2],[1,0,2,3],[1,0,3,1]]
    输出：6
    解释：如图所示，三个矩形覆盖了总面积为6的区域。
    从(1,1)到(2,2)，绿色矩形和红色矩形重叠。
    从(1,0)到(2,3)，三个矩形都重叠。

示例 2：

    输入：rectangles = [[0,0,1000000000,1000000000]]
    输出：49
    解释：答案是 1018 对 (109 + 7) 取模的结果， 即 49 。
     
提示：
- 1 <= rectangles.length <= 200
- rectanges[i].length = 4
- 0 <= xi1, yi1, xi2, yi2 <= 10^9
- 矩形叠加覆盖后的总面积不会超越 2^63 - 1 ，这意味着可以用一个 64 位有符号整数来保存面积结果。

 
## 分析

有点类似 {{< lc "0218" >}}，不过遍历坐标 x 时，要维护的不是高度集合，而是区间集合。

每一轮根据当前横坐标 cur_x 、上一轮横坐标 prev_x，上一轮区间集合覆盖的长度 prev_h，
即可计算出 cur_x 和 prev_x 之间覆盖的面积。然后更新 prev_x 和 prev_h 即可。

## 解答

```python
def rectangleArea(self, rectangles: List[List[int]]) -> int:
    def cal(A):
        res, end = 0, 0
        for s, e in A:
            res += max(end, e) - max(s, end)
            end = max(end, e)
        return res

    from sortedcontainers import SortedList
    d = defaultdict(list)
    for x1, y1, x2, y2 in rectangles:
        d[x1].append((y1, y2, 1))
        d[x2].append((y1, y2, 0))
    res, mod = 0, 10**9+7
    H, prev_x, prev_h = SortedList(), 0, 0
    for x in sorted(d):
        res = (res+(x-prev_x)*prev_h)%mod
        for y1, y2, flag in d[x]:
            if flag:
                H.add((y1, y2))
            else:
                H.remove((y1, y2))
        prev_x, prev_h = x, cal(H)
    return res
```
时间复杂度 O(N^2)，52 ms

