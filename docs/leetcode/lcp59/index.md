# LCP 59：搭桥过河（★★）


> <u>**[力扣第 lcp 59 题](https://leetcode.cn/problems/NfY1m5/)**</u>

## 题目

欢迎各位勇者来到力扣城，本次试炼主题为「搭桥过河」。

勇者面前有一段长度为 `num` 的河流，河流可以划分为若干河道。每条河道上恰有一块浮木，`wood[i]` 记录了第 `i` 条河道上的浮木初始的覆盖范围。

- 当且仅当浮木与相邻河道的浮木覆盖范围有重叠时，勇者才可以在两条浮木间移动
- 勇者 **仅能在岸上** 通过花费一点「自然之力」，使任意一条浮木沿着河流移动一个单位距离

请问勇者跨越这条河流，最少需要花费多少「自然之力」。


**示例 1：**
> 输入： `num = 10, wood = [[1,2],[4,7],[8,9]]`
> 输出： `3`
> 解释：如下图所示，
> 将 [1,2] 浮木移动至 [3,4]，花费 2「自然之力」，
> 将 [8,9] 浮木移动至 [7,8]，花费 1「自然之力」，
> 此时勇者可以顺着 [3,4]->[4,7]->[7,8] 跨越河流，
> 因此，勇者最少需要花费 3 点「自然之力」跨越这条河流
![wood (2).gif](https://pic.leetcode.cn/1648196478-ophADL-wood%20\(2\).gif){:width=650px}


**示例 2：**
> 输入： `num = 10, wood = [[1,5],[1,1],[10,10],[6,7],[7,8]]`
> 输出： `10`
> 解释：
> 将 [1,5] 浮木移动至 [2,6]，花费 1「自然之力」，
> 将 [1,1] 浮木移动至 [6,6]，花费 5「自然之力」，
> 将 [10,10] 浮木移动至 [6,6]，花费 4「自然之力」，
> 此时勇者可以顺着 [2,6]->[6,6]->[6,6]->[6,7]->[7,8] 跨越河流，
> 因此，勇者最少需要花费 10 点「自然之力」跨越这条河流


**示例 3：**
> 输入： `num = 5, wood = [[1,2],[2,4]]`
> 输出： `0`
> 解释：勇者不需要移动浮木，仍可以跨越这条河流

**提示:**
- `1 <= num <= 10^9`
- `1 <= wood.length <= 10^5`
- `wood[i].length == 2`
- `1 <= wood[i][0] <= wood[i][1] <= num`





## 分析

- slope trick 题，参照 [Slope trick explained](https://codeforces.com/blog/entry/77298)、[slope trick (1) 解説編](https://maspypy.com/slope-trick-1-%E8%A7%A3%E8%AA%AC%E7%B7%A8)
- 题解：[AtCoder NarrowRectangles](https://www.cnblogs.com/wyzwyz/p/14038855.html)

## 解答

```python []
class Solution:
    def buildBridge(self, num: int, wood: List[List[int]]) -> int:
        a = wood[0][0]
        L,R = [-a],[a]
        dl,dr = 0,0
        res = 0
        for a,b in pairwise(wood):
            dl -= b[1]-b[0]
            dr += a[1]-a[0]
            x = b[0]
            res += max(0,-L[0]+dl-x)
            heappush(L,dl-x)
            heappush(R,-heappop(L)+dl-dr)
            res += max(0,x-R[0]-dr)
            heappush(R,x-dr)
            heappush(L,-(heappop(R)+dr-dl))
        return res
```
1879 ms



