# 0653：两数之和 IV - 输入 BST（★）


## 题目

给定一个二叉搜索树和一个目标结果，如果 BST 中存在两个元素且它们的和等于给定的目标结果，则返回 true。

 <!--more--> 

案例 1:

	输入: 
		5
	   / \
	  3   6
	 / \   \
	2   4   7

	Target = 9

	输出: True

案例 2:

	输入: 
		5
	   / \
	  3   6
	 / \   \
	2   4   7

	Target = 28

	输出: False


## 分析

类似 {{< lc "0001" >}}，边遍历边用哈希存储元素值，每轮查询前面是否有对应的数即可。

## 解答

```python
def findTarget(self, root: TreeNode, k: int) -> bool:
    stack, vis = [root], set()
    while stack:
        node = stack.pop()
        if node:
            if k - node.val in vis:
                return True
            vis.add(node.val)
            stack.extend([node.right, node.left])
    return False
```

64 ms
 

