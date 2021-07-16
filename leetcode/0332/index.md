# 0332：重新安排行程（★★）


## 题目

给定一个机票的字符串二维数组 [from, to]，子数组中的两个成员分别表示飞机出发和降落的机场地点，
对该行程进行重新规划排序。所有这些机票都属于一个从 JFK（肯尼迪国际机场）出发的先生，
所以该行程必须从 JFK 开始。

提示：

- 如果存在多种有效的行程，请你按字符自然排序返回最小的行程组合。
例如，行程 ["JFK", "LGA"] 与 ["JFK", "LGB"] 相比就更小，排序更靠前
- 所有的机场都用三个大写字母表示（机场代码）。
- 假定所有机票至少存在一种合理的行程。
- 所有的机票必须都用一次 且 只能用一次。


<!--more--> 

示例 1：
    
    输入：[["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]
    输出：["JFK", "MUC", "LHR", "SFO", "SJC"]

示例 2：

    输入：[["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
    输出：["JFK","ATL","JFK","SFO","ATL","SFO"]
    解释：另一种有效的行程是 ["JFK","SFO","ATL","JFK","ATL","SFO"]。但是它自然排序更大更靠后。



## 分析

### #1

可以暴力 dfs，每一层先取字符排序最小的后继顶点加入到路径中，如果路径长度达到要求，即是结果。
如果搜到底路径长度还不够，就返回上一层，取下一个后继顶点。

注意后继顶点列表中的维护。可以用二分查找节省时间。

```python
def findItinerary(self, tickets: List[List[str]]) -> List[str]:
    def dfs(path):
        if len(path) == len(tickets) + 1:
            res.extend(path)
            return
        u = path[-1]
        for v in nxt[u]:
            nxt[u].pop(bisect_left(nxt[u], v))
            dfs(path + [v])
            if res:
                return
            insort_left(nxt[u], v)

    nxt = defaultdict(list)
    for u, v in tickets:
        insort_left(nxt[u], v)
    res = []
    dfs(['JFK'])
    return res
```
48 ms

### #2

不过本题是经典的欧拉图问题，可以用精妙的 [Hierholzer 算法](https://zhuanlan.zhihu.com/p/108411618)。

## 解答

```python
def findItinerary(self, tickets: List[List[str]]) -> List[str]:
    def dfs(u):
        while nxt[u]:
            dfs(heappop(nxt[u]))
        res.append(u)

    nxt = defaultdict(list)
    for u, v in tickets:
        heappush(nxt[u], v)
    res = []
    dfs('JFK')
    return res[::-1]
```

32 ms

