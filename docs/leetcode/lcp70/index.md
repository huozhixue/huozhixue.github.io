# LCP 70：沙地治理（★★）


> <u>**[力扣第 lcp 70 题](https://leetcode.cn/problems/XxZZjK/)**</u>

## 题目

在力扣城的沙漠分会场展示了一种沙柳树，这种沙柳树能够将沙地转化为坚实的绿地。
展示的区域为正三角形，这片区域可以拆分为若干个子区域，每个子区域都是边长为 `1` 的小三角形，其中第 `i` 行有 `2i - 1` 个小三角形。

初始情况下，区域中的所有位置都为沙地，你需要指定一些子区域种植沙柳树成为绿地，以达到转化整片区域为绿地的最终目的，规则如下：
- 若两个子区域共用一条边，则视为相邻；
>如下图所示，(1,1)和(2,2)相邻，(3,2)和(3,3)相邻；(2,2)和(3,3)不相邻，因为它们没有共用边。
- 若至少有两片绿地与同一片沙地相邻，则这片沙地也会转化为绿地
- 转化为绿地的区域会影响其相邻的沙地
![image.png](https://pic.leetcode-cn.com/1662692397-VlvErS-image.png)

现要将一片边长为 `size` 的沙地全部转化为绿地，请找到任意一种初始指定 **最少** 数量子区域种植沙柳的方案，并返回所有初始种植沙柳树的绿地坐标。

**示例 1：**
>输入：`size = 3`
>输出：`[[1,1],[2,1],[2,3],[3,1],[3,5]]`
>解释：如下图所示，一种方案为：
>指定所示的 5 个子区域为绿地。
>相邻至少两片绿地的 (2,2)，(3,2) 和 (3,4) 演变为绿地。
>相邻两片绿地的 (3,3) 演变为绿地。
![image.png](https://pic.leetcode-cn.com/1662692503-ncjywh-image.png){:width=500px}


**示例 2：**
>输入：`size = 2`
>输出：`[[1,1],[2,1],[2,3]]`
>解释：如下图所示：
>指定所示的 3 个子区域为绿地。
>相邻三片绿地的 (2,2) 演变为绿地。
![image.png](https://pic.leetcode-cn.com/1662692507-mgFXRj-image.png){:width=276px}



**提示：**
- `1 <= size <= 1000`



## 分析

### #1 贪心

- 遍历三角形 u，假如 u 相邻的三角形都还是沙地，将 u 变为绿地，并 bfs 更新所有三角形的状态
- 若最后还剩下沙地，任选一个即可

```python
class Solution:
    def sandyLandManagement(self, n: int) -> List[List[int]]:
        def nxt(u):
            i,j = u
            i2,j2 = (i+1,j+1) if j%2 else (i-1,j-1)
            return [(x,y) for x,y in [(i,j-1),(i,j+1),(i2,j2)] if 1<=x<=n and 1<=y<x*2]

        def bfs(u):
            sk = [u]
            while sk:
                u = sk.pop()
                for v in nxt(u):
                    if v in todo:
                        todo[v] += 1
                        if todo[v]==2:
                            todo.pop(v)
                            sk.append(v)

        todo = {(i,j):0 for i in range(1,n+1) for j in range(1,i*2)}
        res = []
        for i in range(1,n+1):
            for j in range(1,i*2):
                u = (i,j)
                if u not in todo:
                    continue
                if todo[u]==0:
                    todo.pop(u)
                    res.append([i,j])
                    bfs(u)
        if todo:
            i,j = list(todo.keys())[0]
            res.append([i,j])
        return res
```
2365 ms

### #2 构造

- 根据贪心出来的结果，可以发现规律并直接构造

## 解答

```python
class Solution:
    def sandyLandManagement(self, size: int) -> List[List[int]]:
        res = [[1,1]]
        for i in range(size,1,-1):
            r = (size-i)%4
            if r==0:
                res.extend([i,j*2+1] for j in range(i))
            elif r==1:
                res.append([i,2])
            elif r==2:
                res.extend([i,j*2+1] for j in range(1,i))
            else:
                res.append([i,1])
        return res
```
124 ms



