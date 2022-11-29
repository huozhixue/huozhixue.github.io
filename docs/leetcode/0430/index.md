# 0430：扁平化多级双向链表（★★）


> **第  场周赛第  题**

## 题目

多级双向链表中，除了指向下一个节点和前一个节点指针之外，它还有一个子链表指针，可能指向单独的双向链表。
这些子列表也可能会有一个或多个自己的子项，依此类推，生成多级数据结构，如下面的示例所示。

给你位于列表第一级的头节点，请你扁平化列表，使所有结点出现在单级双链表中。


示例 1：

	输入：head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
	输出：[1,2,3,7,8,11,12,9,10,4,5,6]
	解释：

	输入的多级列表如下图所示：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/multilevellinkedlist.png)

	扁平化后的链表如下图：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/multilevellinkedlistflattened.png)

示例 2：

	输入：head = [1,2,null,3]
	输出：[1,3,2]
	解释：

	输入的多级列表如下图所示：

	  1---2---NULL
	  |
	  3---NULL
	  
示例 3：

	输入：head = []
	输出：[]

## 分析

### #1

先考虑递归。有子链表时，调用递归程序将子链表扁平化，然后改变当前节点、子链表头尾节点、下一个节点的指针即可。

递归程序应该返回扁平化后的尾节点。

```python
def flatten(self, head: 'Node') -> 'Node':
	def help(p):
		while p and (p.next or p.child):
			if p.child:
				t = help(p.child)
				t.next = p.next
				if t.next:
					t.next.prev = t
				p.next = p.child
				p.next.prev = p
				p.child = None
				p = t
			else:
				p = p.next
		return p
	help(head)
	return head
```

44 ms

### #2

也可以用迭代的方法。按 [p.next, p.child] 的顺序将节点入栈，每次出栈时改变当前节点和上一个节点的指针即可。

## 解答

```python
def flatten(self, head: 'Node') -> 'Node':
	stack, prev = [head], None
	while stack:
		node = stack.pop()
		if node:
			if prev:
				prev.next = node
			node.prev = prev
			stack.extend([node.next,node.child])
			node.child = None
			prev = node
	return head
```
48 ms

