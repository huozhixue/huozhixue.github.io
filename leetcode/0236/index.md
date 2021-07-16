# 0236：二叉树的最近公共祖先（★★）


## 题目

给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

所有节点的值都是唯一的。p、q 为不同节点且均存在于给定的二叉树中。

<!--more--> 
 
示例 1:

![img](https://assets.leetcode.com/uploads/2018/12/14/binarytree.png)

	输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
	输出：3
	解释：节点 5 和节点 1 的最近公共祖先是节点 3 。


示例 2:

![img](https://assets.leetcode.com/uploads/2018/12/14/binarytree.png)

	输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
	输出：5
	解释：节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。

示例 3：

	输入：root = [1,2], p = 1, q = 2
	输出：1


## 分析

### #1

与 {{< lc "0235" >}} 的区别在于只是二叉树，并不有序。

	如果 root 等于 p 或 q			结果就是 root
	如果 p、q 分别在 root 的左右子树		结果就是 root
	如果 p、q 都在 root 的左子树或右子树	转为递归子问题
	
令辅助函数 help(node)表示 node 中 p 或 q 的节点（都没有返回 None，都有就返回更浅的那个），即可递归。

## 解答

```python
def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
    def help(root):
        if not root or root in [p, q]:
            return root
        l, r = help(root.left), help(root.right)
        return root if l and r else (l or r)
    return help(root)
```
76 ms
