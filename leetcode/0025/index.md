# 0025：K 个一组翻转链表（★★★）


## 题目

给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。

k 是一个正整数，它的值小于或等于链表的长度。

如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。


<!--more--> 

示例：

	给你这个链表：1->2->3->4->5

	当 k = 2 时，应当返回: 2->1->4->3->5

	当 k = 3 时，应当返回: 3->2->1->4->5


 
## 分析

{{< lc "0092" >}} 中已有反转某段链表的方法，所以本题还要解决的问题是判断剩下的节点个数是否大于 k。

这里可以用快慢双指针，每次翻转前，先让快指针跑 k 步，如果到尾了就退出。

要注意的是翻转完以后位置变了，快指针要重新指定。


## 解答

```python
def reverseKGroup(self, head: ListNode, k: int) -> ListNode:
	dummy = slow = fast = ListNode(next=head)
	while True:
		for _ in range(k):
			fast = fast.next
			if not fast:
				return dummy.next
		tail = slow.next
		for _ in range(k-1):
			tmp = tail.next
			tail.next = tmp.next
			tmp.next = slow.next
			slow.next = tmp
		slow = fast = tail
```

44 ms
