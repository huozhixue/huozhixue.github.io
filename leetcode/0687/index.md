# 0687： 最长同值路径（★★）


## 题目

给定一个二叉树，找到最长的路径，这个路径中的每个节点具有相同值。 这条路径可以经过也可以不经过根节点。

注意：两个节点之间的路径长度由它们之间的边数表示。


 <!--more--> 
 
示例 1:

	输入:

				  5
				 / \
				4   5
			   / \   \
			  1   1   5
	输出:

	2
	
示例 2:

	输入:

				  1
				 / \
				4   5
			   / \   \
			  4   4   5
	输出:

	2

 
## 分析

类似 {{< lc "0543" >}} 用辅助函数 help(node) 同时返回 node 的最长同值路径，
向上的终点为 node 的最长同值路径。即可递归。

## 解答

```python
def longestUnivaluePath(self, root: TreeNode) -> int:
    def help(root):
        if not root:
            return 0, 0
        l0, l1 = help(root.left)
        r0, r1 = help(root.right)
        l1 = l1 + 1 if root.left and root.left.val == root.val else 0
        r1 = r1 + 1 if root.right and root.right.val == root.val else 0
        return max(l0, r0, l1+r1), max(l1, r1)
    return help(root)[0]
```

384 ms

