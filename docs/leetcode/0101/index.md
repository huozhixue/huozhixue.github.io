# 0101：对称二叉树（★）


## 题目

给你一个二叉树的根节点 root ， 检查它是否轴对称。

示例 1：

![img](https://assets.leetcode.com/uploads/2021/02/19/symtree1.jpg)

	输入：root = [1,2,2,3,4,4,3]
	输出：true

示例 2：

![img](https://assets.leetcode.com/uploads/2021/02/19/symtree2.jpg)

	输入：root = [1,2,2,null,3,null,3]
	输出：false
 

提示：
- 树中节点数目在范围 [1, 1000] 内
- -100 <= Node.val <= 100
 
进阶：你可以运用递归和迭代两种方法解决这个问题吗？

## 分析

### #1

{{< lc "0100" >}} 升级版，相当于判断左子树和右子树是否镜像对称。

令 dfs(p, q) 代表 p 和 q 是否镜像对称，即可递归。

```python
def isSymmetric(self, root: Optional[TreeNode]) -> bool:
    def dfs(p, q):
        if not p or not q:
            return not p and not q
        return p.val == q.val and dfs(p.left, q.right) and dfs(p.right, q.left)

    return dfs(root.left, root.right)
```
28 ms

### #2

也可以用迭代。与 {{< lc "0100" >}} 类似，只是要交叉比较，入栈顺序处理下即可。

## 解答

```python
def isSymmetric(self, root: TreeNode) -> bool:
	stack1, stack2 = [root], [root]
	while stack1:
		p, q = stack1.pop(), stack2.pop()
		if not p and not q:
			continue
		if not p or not q or p.val != q.val:
			return False
		stack1.extend([p.right, p.left])
		stack2.extend([q.left, q.right])
	return True
```
40 ms

