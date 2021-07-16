# 0105：从前序与中序遍历序列构造二叉树（★★）


## 题目

根据一棵树的前序遍历与中序遍历构造二叉树。

你可以假设树中没有重复的元素。

<!--more--> 

例如，给出

	前序遍历 preorder = [3,9,20,15,7]
	中序遍历 inorder = [9,3,15,20,7]
	返回如下的二叉树：

		3
	   / \
	  9  20
		/  \
	   15   7



## 分析

preorder 第一个元素就是根节点，那么在 inorder 中找到根节点位置 i，
则 inorder[:i]、inorder[i+1:] 分别代表左子树和右子树。

显然 preorder 和 inorder 中代表左子树的子数组长度相等，
因此 preorder[1:i+1] 是左子树，剩下的是右子树。
然后转为递归子问题。

## 解答

```python
def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
	if not preorder:
		return None
	val = preorder[0]
	i = inorder.index(val)
	return TreeNode(val, self.buildTree(preorder[1:i+1], inorder[:i]), self.buildTree(preorder[i+1:], inorder[i+1:]))
```

188 ms

