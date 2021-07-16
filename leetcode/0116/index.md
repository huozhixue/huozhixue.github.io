# 0116：填充每个节点的下一个右侧节点指针（★★）


## 题目

给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：

	struct Node {
	  int val;
	  Node *left;
	  Node *right;
	  Node *next;
	}

填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

初始状态下，所有 next 指针都被设置为 NULL。

你只能使用常量级额外空间。使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。



<!--more--> 

示例：

![img](https://assets.leetcode.com/uploads/2019/02/14/116_sample.png)

	输入：	root = [1,2,3,4,5,6,7]
	输出：	[1,#,2,3,#,4,5,6,7,#]
	解释：	给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。
			序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。



## 分析

### #1

最简单的就是层序遍历，每一层填充即可。

```python
def connect(self, root: 'Node') -> 'Node':
	if not root:
		return root
	level = [root]
	while level:
		for i in range(len(level)-1):
			level[i].next = level[i+1]
		level = [child for node in level for child in [node.left, node.right] if child]
	return root
```

72 ms

### #2

要求不用额外空间，有个巧妙的想法。如果遍历到某层时已有 next 指针，就可以通过 next 遍历，不需要额外空间。

因此考虑每层提前填充下一层的 next 指针： 

	node.left.next = node.right
	
	node.right.next = node.next.left
	

## 解答

```python
def connect(self, root: 'Node') -> 'Node':
	level = root
	while level and level.left:
		cur = level
		while cur:
			cur.left.next = cur.right
			if cur.next:
				cur.right.next = cur.next.left
			cur = cur.next
		level = level.left
	return root
```

68 ms

