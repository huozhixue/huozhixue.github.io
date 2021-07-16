# 0143：重排链表（★★）


## 题目

给定一个单链表 L：L0→L1→…→Ln-1→Ln ，
将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

<!--more--> 

示例 1:

	给定链表 1->2->3->4, 重新排列为 1->4->2->3.

示例 2:

	给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.

## 分析

先用快慢节点找到中点位置，截断为两部分，将后半部分链表反转后依次插入前半部分中即可。

反转链表可以调用 {{< lc "0206" >}} 的代码。


## 解答

```python
def reorderList(self, head: ListNode) -> None:
	"""
	Do not return anything, modify head in-place instead.
	"""
	def reverse(head):
		tail = head
		while tail and tail.next:
			tmp = tail.next
			tail.next = tmp.next
			tmp.next = head
			head = tmp
		return head

	slow = fast = ListNode(next=head)
	while fast and fast.next:
		slow, fast = slow.next, fast.next.next
	q = slow.next
	slow.next = None
	p, q = head, reverse(q)
	while q:
		tmp = p.next
		p.next = q
		q = q.next
		p.next.next = tmp
		p = tmp
```

88 ms

