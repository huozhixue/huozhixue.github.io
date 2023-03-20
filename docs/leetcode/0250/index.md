# 0250：统计同值子树（★）


## 题目

给定一个二叉树，统计该二叉树数值相同的子树个数。

同值子树是指该子树的所有节点都拥有相同的数值。

示例：

	输入: root = [5,1,5,5,5,null,5]

				  5
				 / \
				1   5
			   / \   \
			  5   5   5

	输出: 4




## 分析

可以递归判断每个子树是否是同值子树，递归过程中统计即可。

## 解答

```python
def countUnivalSubtrees(self, root: Optional[TreeNode]) -> int:
    def dfs(node):
        if not node:
            return True
        flag = True
        if node.left:
            flag &= dfs(node.left) and node.left.val==node.val
        if node.right:
            flag &= dfs(node.right) and node.right.val==node.val
        self.res += flag
        return flag
    
    self.res = 0
    dfs(root)
    return self.res
```
36 ms
