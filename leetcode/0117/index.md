# 0117：填充每个节点的下一个右侧节点指针 II（★★）


## 题目

给定一个二叉树：

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

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/02/15/117_sample.png)

	输入：	root = [1,2,3,4,5,null,7]
	输出：	[1,#,2,3,#,4,5,7,#]
	解释：	给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。
			序列化输出按层序遍历顺序（由 next 指针连接），'#' 表示每层的末尾。



## 分析

### #1

层序遍历的代码和 {{< lc "0116" >}} 相同。

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

60 ms

### #2

要求不用额外空间，依然可以用 {{< lc "0116" >}} 的方法，区别在于不是完美二叉树。

可以添加哑节点和记录前置节点，方便操作。
	

## 解答

```python
def connect(self, root: 'Node') -> 'Node':
	level = root
	while level:
		dummy = pre = Node()
		cur = level
		while cur:
			if cur.left:
				pre.next = cur.left
				pre = cur.left
			if cur.right:
				pre.next = cur.right
				pre = cur.right
			cur = cur.next
		level = dummy.next
	return root
```

52 ms

