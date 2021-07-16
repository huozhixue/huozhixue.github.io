# 0501：二叉搜索树中的众数（★）


## 题目

给定一个有相同值的二叉搜索树（BST），找出 BST 中的所有众数（出现频率最高的元素）。

假定 BST 有如下定义：

- 结点左子树中所含结点的值小于等于当前结点的值
- 结点右子树中所含结点的值大于等于当前结点的值
- 左子树和右子树都是二叉搜索树

提示：如果众数超过1个，不需考虑输出顺序

进阶：你可以不使用额外的空间吗？

 <!--more--> 
 
例如：

	给定 BST [1,null,2,2],

	   1
		\
		 2
		/
	   2
	返回[2].



## 分析

最简单的就是遍历得到数组，再求众数。

要求不用额外空间，可以按中序遍历，相同元素必然相邻，因此维护当前元素的频次，更新结果即可。

## 解答

```python
def findMode(self, root: TreeNode) -> List[int]:
	res, maxcnt = [], 0
	stack, pre, cnt = [root], None, 0
	while stack:
		node = stack.pop()
		if isinstance(node, int):
			cnt, pre = cnt*(node==pre)+1, node
			if cnt >= maxcnt:
				res, maxcnt = res*(cnt==maxcnt)+[node], cnt
		elif node:
			stack.extend([node.right, node.val, node.left])
	return res
```

76 ms
