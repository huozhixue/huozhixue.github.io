# 0497：非重叠矩形中的随机点（★★）


> **第  场周赛第  题**

## 题目

给定一个由非重叠的轴对齐矩形的数组 rects ，其中 rects[i] = [ai, bi, xi, yi] 表示 (ai, bi) 
是第 i 个矩形的左下角点，(xi, yi) 是第 i 个矩形的右上角角点。
设计一个算法来挑选一个随机整数点内的空间所覆盖的一个给定的矩形。矩形周长上的一个点包含在矩形覆盖的空间中。

在一个给定的矩形覆盖的空间内任何整数点都有可能被返回。

请注意 ，整数点是具有整数坐标的点。

实现 Solution 类:
- Solution(int[][] rects) 用给定的矩形数组 rects 初始化对象。
- int[] pick() 返回一个随机的整数点 [u, v] 在给定的矩形所覆盖的空间内。
 

示例 1：

![img](https://assets.leetcode.com/uploads/2021/07/24/lc-pickrandomrec.jpg)

    输入: 
    ["Solution","pick","pick","pick","pick","pick"]
    [[[[-2,-2,-1,-1],[1,0,3,0]]],[],[],[],[],[]]
    输出: 
    [null,[-1,-2],[2,0],[-2,-1],[3,0],[-2,-2]
    
    解释：
    Solution solution = new Solution([[-2, -2, 1, 1], [2, 2, 4, 6]]);
    solution.pick(); // 返回 [1, -2]
    solution.pick(); // 返回 [1, -1]
    solution.pick(); // 返回 [-1, -2]
    solution.pick(); // 返回 [-2, -2]
    solution.pick(); // 返回 [0, 0]
 

提示：
- 1 <= rects.length <= 100
- rects[i].length == 4
- -10^9 <= ai < xi <= 10^9
- -10^9 <= bi < yi <= 10^9
- xi - ai <= 2000
- yi - bi <= 2000
- 所有的矩形不重叠。
- pick 最多被调用 10^4 次。


## 分析
  
类似 {{< lc "0528" >}} ，不过变成了二维。
矩阵内点的个数即是矩阵权重。

随机取到一个点后，先找出属于哪一个矩形，还可以得到在该矩形中排第几位，再按预定映射得到该矩形中的某一点。

## 解答

```python
class Solution:

    def __init__(self, rects: List[List[int]]):
        self.rects = rects
        self.pre = list(accumulate((x2-x1+1)*(y2-y1+1) for x1,y1,x2,y2 in rects))

    def pick(self) -> List[int]:
        rank = random.randint(1, self.pre[-1])
        i = bisect_left(self.pre, rank)
        rank -= self.pre[i-1] if i else 0
        x1, y1, x2, _ = self.rects[i]
        return [x1+(rank-1)%(x2-x1+1), y1+(rank-1)//(x2-x1+1)]
```
168 ms
