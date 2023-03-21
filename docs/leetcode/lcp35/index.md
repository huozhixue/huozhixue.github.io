# LCP 35：电动车游城市（★★）


> <u>**[力扣杯 2021 春季战队赛第 5 题](https://leetcode.cn/problems/DFPeFJ/)**</u>

## 题目

小明的电动车电量充满时可行驶距离为 `cnt`，每行驶 1 单位距离消耗 1 单位电量，且花费 1 单位时间。小明想选择电动车作为代步工具。地图上共有 N 个景点，景点编号为 0 ~ N-1。他将地图信息以 `[城市 A 编号,城市 B 编号,两城市间距离]` 格式整理在在二维数组 `paths`，表示城市 A、B 间存在双向通路。初始状态，电动车电量为 0。每个城市都设有充电桩，`charge[i]` 表示第 i 个城市每充 1 单位电量需要花费的单位时间。请返回小明最少需要花费多少单位时间从起点城市 `start` 抵达终点城市 `end`。


**示例 1：**
>输入：`paths = [[1,3,3],[3,2,1],[2,1,3],[0,1,4],[3,0,5]], cnt = 6, start = 1, end = 0, charge = [2,10,4,1]`
>
>输出：`43`
>
>解释：最佳路线为：1->3->0。
>在城市 1 仅充 3 单位电至城市 3，然后在城市 3 充 5 单位电，行驶至城市 5。
>充电用时共 3\*10 + 5\*1= 35
>行驶用时 3 + 5 = 8，此时总用时最短 43。
![image.png](https://pic.leetcode-cn.com/1616125304-mzVxIV-image.png)




**示例 2：**
>输入：`paths = [[0,4,2],[4,3,5],[3,0,5],[0,1,5],[3,2,4],[1,2,8]], cnt = 8, start = 0, end = 2, charge = [4,1,1,3,2]`
>
>输出：`38`
>
>解释：最佳路线为：0->4->3->2。
>城市 0 充电 2 单位，行驶至城市 4 充电 8 单位，行驶至城市 3 充电 1 单位，最终行驶至城市 2。
>充电用时 4\*2+2\*8+3\*1 = 27
>行驶用时 2+5+4 = 11，总用时最短 38。

**提示：**
- `1 <= paths.length <= 200`
- `paths[i].length == 3`
- `2 <= charge.length == n <= 100`
- `0 <= path[i][0],path[i][1],start,end < n`
- `1 <= cnt <= 100`
- `1 <= path[i][2] <= cnt`
- `1 <= charge[i] <= 100`
- 题目保证所有城市相互可以到达


## 分析

将状态 (节点 u,电量 c) 看作顶点，那么对于通路 <u,v,w>，如果 c>=w，则 (u, c) 到 (v, c-w) 连有向边，权重为 w。
额外的，(u, c) 到 (u, c+1) 连一条有向边，权重为 charge[u]。

那么问题就转为在新图中求 (start, 0) 到 (end, 0) 的最短路，可以用 dijkstra 算法。

## 解答

```python
def electricCarPlan(self, paths: List[List[int]], cnt: int, start: int, end: int, charge: List[int]) -> int:
    nxt = defaultdict(list)
    for u, v, w in paths:
        nxt[u].append((v, w))
        nxt[v].append((u, w))
    d, pq = {}, [(0, start, 0)]
    while pq:
        w, u, c = heappop(pq)
        if (u, c) in d:
            continue
        if (u, c) == (end, 0):
            return w
        d[(u, c)] = w
        for v, w2 in nxt[u]:
            if c>=w2 and (v, c-w2) not in d:
                heappush(pq, (w+w2, v, c-w2))
        if c<cnt:
            heappush(pq, (w+charge[u], u, c+1))
```
108 ms


