# 0285：二叉搜索树中的中序后继（★★）


## 题目

给定一棵二叉搜索树和其中的一个节点 p ，找到该节点在树中的中序后继。如果节点没有中序后继，请返回 null 。

节点 p 的后继是值比 p.val 大的节点中键值最小的节点。

 
示例 1：

![img](https://assets.leetcode.com/uploads/2019/01/23/285_example_1.PNG)

	输入：root = [2,1,3], p = 1
	输出：2
	解释：这里 1 的中序后继是 2。请注意 p 和返回值都应是 TreeNode 类型。

示例 2：

![img](https://assets.leetcode.com/uploads/2019/01/23/285_example_2.PNG)

	输入：root = [5,3,6,2,4,null,null,1], p = 6
	输出：null
	解释：因为给出的节点没有中序后继，所以答案就返回 null 了。
 

提示：
- 树中节点的数目在范围 [1, 10^4] 内。
- -10^5 <= Node.val <= 10^5
- 树中各节点的值均保证唯一。



## 分析

遍历并比较即可：
- 先比较 root 和 p
- 如果 root 比 p 大，后继要么是 root，要么在左子树中，继续遍历 root 的左子树
- 同理，如果 root 比 p 大，继续遍历 root 的右子树

## 解答

```python
def inorderSuccessor(self, root: 'TreeNode', p: 'TreeNode') -> 'TreeNode':
    res, q = None, root
    while q:
        if q.val>p.val:
            res = q if not res or q.val<res.val else res
            q = q.left
        else:
            q = q.right
    return res
```
68 ms
