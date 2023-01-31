# 2001：可互换矩形的组数（★）


> **第 258 场周赛第 2 题**

## 题目

用一个下标从 0 开始的二维整数数组 rectangles 来表示 n 个矩形，其中
 rectangles[i] = [widthi, heighti] 表示第 i 个矩形的宽度和高度。

如果两个矩形 i 和 j（i < j）的宽高比相同，则认为这两个矩形 可互换 。
更规范的说法是，两个矩形满足 widthi/heighti == widthj/heightj（使用实数除法而非整数除法）
，则认为这两个矩形 可互换 。

计算并返回 rectangles 中有多少对 可互换 矩形。

提示：
- n == rectangles.length
- 1 <= n <= 10^5
- rectangles[i].length == 2
- 1 <= widthi, heighti <= 10^5

示例 1：

    输入：rectangles = [[4,8],[3,6],[10,20],[15,30]]
    输出：6
    解释：下面按下标（从 0 开始）列出可互换矩形的配对情况：
    - 矩形 0 和矩形 1 ：4/8 == 3/6
    - 矩形 0 和矩形 2 ：4/8 == 10/20
    - 矩形 0 和矩形 3 ：4/8 == 15/30
    - 矩形 1 和矩形 2 ：3/6 == 10/20
    - 矩形 1 和矩形 3 ：3/6 == 15/30
    - 矩形 2 和矩形 3 ：10/20 == 15/30

示例 2：

    输入：rectangles = [[4,5],[7,8]]
    输出：0
    解释：不存在成对的可互换矩形。
 
## 分析

统计每个宽高比对应的矩形个数 x，其中任意两个矩形可互换，即有 x*(x-1)//2 对。

> 为了避免精度问题，可以用最简分数的形式来代表宽高比。可以用除以最大公约数的方法，
>也可以直接调用 fractions.Fraction

## 解答

```python
def interchangeableRectangles(self, rectangles: List[List[int]]) -> int:
    ct = Counter()
    for w, h in rectangles:
        g = gcd(w, h)
        ct[(w//g, h//g)]+=1
    return sum(v*(v-1)//2 for v in ct.values())
```
460 ms

