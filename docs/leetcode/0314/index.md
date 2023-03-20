# 0314：二叉树的垂直遍历（★★）


## 题目

给你一个二叉树的根结点，返回其结点按 垂直方向（从上到下，逐列）遍历的结果。

如果两个结点在同一行和列，那么顺序则为 从左到右。

示例 1：

![img](https://assets.leetcode.com/uploads/2021/01/28/vtree1.jpg)

	输入：root = [3,9,20,null,null,15,7]
	输出：[[9],[3,15],[20],[7]]

示例 2：

![img](https://assets.leetcode.com/uploads/2021/01/28/vtree2-1.jpg)

	输入：root = [3,9,8,4,0,1,7]
	输出：[[4],[9],[3,0,1],[8],[7]]

示例 3：

![img](https://assets.leetcode.com/uploads/2021/01/28/vtree2.jpg)

	输入：root = [3,9,8,4,0,1,7,null,null,null,2,5]
	输出：[[4],[9,5],[3,0,1],[8,2],[7]]
 

提示：
- 树中结点的数目在范围 [0, 100] 内
- -100 <= Node.val <= 100


## 分析

中序遍历并按坐标存到哈希表中，最后再按排序后的坐标输出即可。

## 解答

```python
def verticalOrder(self, root: TreeNode) -> List[List[int]]:
    d = defaultdict(lambda: defaultdict(list))
    stack = [(root, 0, 0)]
    while stack:
        node, x, y = stack.pop()
        if node:
            d[x][y].append(node.val)
            stack.extend([(node.right, x+1, y+1), (node.left, x-1,y+1)])
    return [[val for y in sorted(d[x]) for val in d[x][y]] for x in sorted(d)]
```
32 ms



