# 0086：分隔链表（★）


## 题目

给你一个链表和一个特定值 x ，请你对链表进行分隔，使得所有小于 x 的节点都出现在大于或等于 x 的节点之前。

你应当保留两个分区中每个节点的初始相对位置。


<!--more--> 


示例：

	输入：head = 1->4->3->2->5->2, x = 3
	输出：1->2->2->4->3->5




## 分析


遇到大于等于 x 的节点就先提出来，并按顺序链接，最后再跟到原链表的末尾即可。


## 解答

```python
def partition(self, head: ListNode, x: int) -> ListNode:
	dummy1 = p = ListNode(next=head)
	dummy2 = q = ListNode()
	while p.next:
		if p.next.val >= x:
			q.next = p.next
			p.next = p.next.next
			q = q.next
		else:
			p = p.next
	q.next = None
	p.next = dummy2.next
	return dummy1.next
```

40 ms
