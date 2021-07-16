# 0106：从中序与后序遍历序列构造二叉树（★★）


## 题目

根据一棵树的中序遍历与后序遍历构造二叉树。

你可以假设树中没有重复的元素。

<!--more--> 

例如，给出

	中序遍历 inorder = [9,3,15,20,7]
	后序遍历 postorder = [9,15,7,20,3]
	返回如下的二叉树：

		3
	   / \
	  9  20
		/  \
	   15   7




## 分析

和 {{< lc "0105" >}} 类似。postorder 最后一个元素就是根节点，在 inorder 中找到根节点位置 i，
inorder[:i]、inorder[i+1:] 分别代表左子树和右子树。
对应的，postorder[:i], postorder[i:-1] 分别代表左子树和右子树。然后转为递归子问题。

## 解答

```python
def buildTree(self, inorder: List[int], postorder: List[int]) -> TreeNode:
	if not postorder:
		return None
	val = postorder[-1]
	i = inorder.index(val)
	return TreeNode(val, self.buildTree(inorder[:i], postorder[:i]), self.buildTree(inorder[i+1:], postorder[i:-1]))
```

180 ms

