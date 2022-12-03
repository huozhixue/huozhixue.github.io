# 0116：填充每个节点的下一个右侧节点指针（★★）


## 题目

给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：

	struct Node {
	  int val;
	  Node *left;
	  Node *right;
	  Node *next;
	}

填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，
则将 next 指针设置为 NULL。

初始状态下，所有 next 指针都被设置为 NULL。


示例 1：

![img](https://assets.leetcode.com/uploads/2019/02/14/116_sample.png)

	输入：	root = [1,2,3,4,5,6,7]
	输出：	[1,#,2,3,#,4,5,6,7,#]
	解释：	给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，
	如图 B 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。


示例 2:

	输入：root = []
	输出：[]
	 

提示：
- 树中节点的数量在 [0, 212 - 1] 范围内
- -1000 <= node.val <= 1000

进阶：
- 你只能使用常量级额外空间。
- 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。


## 分析

### #1

最简单的就是层序遍历，每一层填充即可。

```python
def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
    Q = [root] if root else []
    while Q:
        for p, q in pairwise(Q):
            p.next = q
        Q = [child for p in Q for child in [p.left, p.right] if child]
    return root
```
56 ms

### #2

要求不用额外空间，有个巧妙的想法。

每层提前填充下一层的 next 指针，那么从每层最左边根据 next 指针就可以完成遍历，不需要存储其它节点。
	
## 解答

```python
def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
    cur = root
    while cur and cur.left:
        p = cur
        while p:
            p.left.next = p.right
            if p.next:
                p.right.next = p.next.left
            p = p.next
        cur = cur.left
    return root
```
60 ms
