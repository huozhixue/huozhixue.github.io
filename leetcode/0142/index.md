# 0142：环形链表 II（★★）


## 题目

给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意，pos 仅仅是用于标识环的情况，并不会作为参数传递到函数中。

不允许修改给定的链表。

你是否可以使用 O(1) 空间解决此题？

<!--more--> 

示例 1：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png)

	输入：head = [3,2,0,-4], pos = 1
	输出：返回索引为 1 的链表节点
	解释：链表中有一个环，其尾部连接到第二个节点。

示例 2：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test2.png)


	输入：head = [1,2], pos = 0
	输出：返回索引为 0 的链表节点
	解释：链表中有一个环，其尾部连接到第一个节点。

示例 3：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test3.png)

	输入：head = [1], pos = -1
	输出：返回 null
	解释：链表中没有环。



## 分析

### #1

最简单的依然是哈希。

```python
def detectCycle(self, head: ListNode) -> ListNode:
	Set = set()
	while head:
		if head in Set:
			return head
		Set.add(head)
		head = head.next
	return None
```

68 ms

### #2

0141 的方法能用 O(1) 空间判断是否有环。考虑在此基础上得到入环的位置。

假如环的周长为 L。那么当慢节点达到入环位置 x 时，快节点走了 2*x 步，也就是在环上走了 x 步。
然后是个追及问题，快节点距离慢节点 L-x%L，要经过 L-x%L 轮追上慢节点。故最终相遇时慢节点在环上走了 L-x%L 步。

这里有个巧妙的想法，将慢节点放回起点，然后快慢节点每轮都只走一步，再经过 x 步即在入环的位置相遇了（L-x%L+x 显然是 L 的倍数）。


## 解答

```python
def detectCycle(self, head: ListNode) -> ListNode:
	slow = fast = head
	while fast and fast.next:
		slow, fast = slow.next, fast.next.next
		if slow == fast:
			break
	else:
		return None
	slow = head
	while slow != fast:
		slow, fast = slow.next, fast.next
	return slow
```

80 ms

