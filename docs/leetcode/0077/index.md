# 0077：组合（★）


## 题目

给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。

你可以按 任何顺序 返回答案。

示例 1：

    输入：n = 4, k = 2
    输出：
    [
      [2,4],
      [3,4],
      [2,3],
      [1,2],
      [1,3],
      [1,4],
    ]

示例 2：

    输入：n = 1, k = 1
    输出：[[1]]
	
提示：
- 1 <= n <= 20
- 1 <= k <= n
     
## 分析

### #1

可以直接调库。

```python
def combine(self, n: int, k: int) -> List[List[int]]:
	return list(combinations(range(1, n+1), k))
```

44 ms

### #2

{{< lc "0078" >}} 升级版，添加了个数的限制。

## 解答

```python
def combine(self, n: int, k: int) -> List[List[int]]:
    def dfs(i):
        if n + 1 - i + len(path) < k:
            return
        if len(path) == k:
            res.append(path[:])
            return
        for j in range(i, n + 1):
            path.append(j)
            dfs(j+1)
            path.pop()

    res, path = [], []
    dfs(1)
    return res
```
44 ms
