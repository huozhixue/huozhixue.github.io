# 0095：不同的二叉搜索树 II（★★）


## 题目

给你一个整数 n ，请你生成并返回所有由 n 个节点组成且节点值从 1 到 n 互不相同的不同 二叉搜索树 。
可以按 任意顺序 返回答案。


示例 1：


    输入：n = 3
    输出：[[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]

示例 2：

    输入：n = 1
    输出：[[1]]

提示： 1 <= n <= 8

## 分析

类似于 {{< lc "0096" >}} ，不过需要生成所有实际的树。

令 dfs(i,j) 代表节点值 [i,j] 组成的不同二叉搜索树，即可递归。

## 解答

```python
def generateTrees(self, n: int) -> List[TreeNode]:
    def dfs(i, j):
        if i > j:
            return [None]
        res = []
        for k in range(i, j+1):
            for l in dfs(i, k-1):
                for r in dfs(k+1, j):
                    res.append(TreeNode(k, l, r))
        return res
    return dfs(1, n)
```
56 ms


