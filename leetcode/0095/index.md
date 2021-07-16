# 0095：不同的二叉搜索树 II（★★）


## 题目

给定一个整数 n，生成所有由 1 ... n 为节点所组成的 二叉搜索树 。

<!--more--> 

示例：

	输入：3
	输出：
	[
	  [1,null,3,2],
	  [3,2,null,1],
	  [3,1,null,null,2],
	  [2,1,3],
	  [1,null,2,null,3]
	]
	解释：
	以上的输出对应以下 5 种不同结构的二叉搜索树：

	   1         3     3      2      1
		\       /     /      / \      \
		 3     2     1      1   3      2
		/     /       \                 \
	   2     1         2                 3


## 分析

类似于 {{< lc "0096" >}} ，不过需要生成所有实际的树。

令辅助函数 help(i,j) 代表由 i 到 j 为节点组成的二叉搜索树，即可递归。

## 解答

```python
def generateTrees(self, n: int) -> List[TreeNode]:
    def help(i, j):
        if i > j:
            return [None]
        return [TreeNode(x, l, r) for x in range(i, j+1) for l, r in product(help(i, x-1), help(x+1, j))]
    return help(1, n)
```

60 ms


