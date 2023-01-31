# 1192. 查找集群内的「关键连接」（★★★）


> **第 154 场周赛第 4 题**

## 题目

力扣数据中心有 n 台服务器，分别按从 0 到 n-1 的方式进行了编号。它们之间以「服务器到服务器」
点对点的形式相互连接组成了一个内部集群，其中连接 connections 是无向的。
从形式上讲，connections[i] = [a, b] 表示服务器 a 和 b 之间形成连接。
任何服务器都可以直接或者间接地通过网络到达任何其他服务器。

「关键连接」 是在该集群中的重要连接，也就是说，假如我们将它移除，便会导致某些服务器无法访问其他服务器。

请你以任意顺序返回该集群内的所有 「关键连接」。

 
示例 1：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/original_images/critical-connections-in-a-network.png)

    输入：n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
    输出：[[1,3]]
    解释：[[3,1]] 也是正确的。

示例 2:
    
    输入：n = 2, connections = [[0,1]]
    输出：[[0,1]]
 

提示：
- 1 <= n <= 10^5
- n-1 <= connections.length <= 10^5
- connections[i][0] != connections[i][1]
- 不存在重复的连接

 
## 分析

[tarjan](https://zhuanlan.zhihu.com/p/101923309) 算法模版题，求无向图的桥。

## 解答

```python
def criticalConnections(self, n: int, connections: List[List[int]]) -> List[List[int]]:
    def tarjan(p, fa):
        dfn[p] = low[p] = self.t = self.t+1
        for q in nxt[p]:
            if q not in dfn:
                tarjan(q, p)
                low[p] = min(low[p], low[q])
                if low[q] > dfn[p]:
                    bridge.append([p, q])
            elif q != fa:
                low[p] = min(low[p], dfn[q])
    
    nxt = defaultdict(list)
    for a, b in connections:
        nxt[a].append(b)
        nxt[b].append(a)
    bridge, dfn, low, self.t = [], {}, {}, 0
    tarjan(0, None)
    return bridge
```
620 ms

