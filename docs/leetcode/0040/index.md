# 0040：组合总和 II（★★）


## 题目

给定一个数组 candidates 和一个目标数 target ，
找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。

注意：解集不能包含重复的组合。 

 

示例 1:

    输入: candidates = [10,1,2,7,6,1,5], target = 8,
    输出:
    [
    [1,1,6],
    [1,2,5],
    [1,7],
    [2,6]
    ]

示例 2:

    输入: candidates = [2,5,2,1,2], target = 5,
    输出:
    [
    [1,2,2],
    [5]
    ]


提示:
- 1 <= candidates.length <= 100
- 1 <= candidates[i] <= 50
- 1 <= target <= 30


## 分析 

{{< lc "0090" >}} 升级版，添加了和的限制。

## 解答

```python
def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
    def dfs(i, s):
        if s >= target:
            if s == target:
                res.append(path[:])
            return
        for j in range(i, n):
            if j > i and candidates[j] == candidates[j - 1]:
                continue
            path.append(candidates[j])
            dfs(j + 1, s + candidates[j])
            path.pop()

    res, path, n = [], [], len(candidates)
    candidates.sort()
    dfs(0, 0)
    return res
```
64 ms
