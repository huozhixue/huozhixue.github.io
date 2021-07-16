# 0096：不同的二叉搜索树（★★）


## 题目

给定一个整数 n，求以 1 ... n 为节点组成的二叉搜索树有多少种？

<!--more--> 


示例:

	输入: 3
	输出: 5
	解释:
	给定 n = 3, 一共有 5 种不同结构的二叉搜索树:

	   1         3     3      2      1
		\       /     /      / \      \
		 3     2     1      1   3      2
		/     /       \                 \
	   2     1         2                 3


## 分析

### #1

用 dp[n] 表示用 n 个不同节点组成的二叉搜索树的种数。遍历根节点，左右子树的种数即为递归子问题。

```python
@lru_cache(None)
def numTrees(self, n: int) -> int:
    return 1 if n == 0 else sum(self.numTrees(x)*self.numTrees(n-1-x) for x in range(n))
```

44 ms

### #2

这个递推式得到的 dp[n] 在数学上被称为卡塔兰数，有个更简单的表达式：

    dp[n] = (2n)!/(n!*(n+1)!)

## 解答

```python
def numTrees(self, n: int) -> int:
    return reduce(lambda x, i: x * (i + n) // i, range(1, n+1), 1) // (n + 1)
```

32 ms

