# 0206：反转链表（★）


## 题目

反转一个单链表。

你可以迭代或递归地反转链表。你能否用两种方法解决这道题？

<!--more--> 

示例:

	输入: 1->2->3->4->5->NULL
	输出: 5->4->3->2->1->NULL



## 分析

### #1

先用递归，设 tmp=head.next，反转 tmp 之后的链表即是递归子问题

反转了 tmp 之后的链表，tmp 变成了末尾，然后再将 tmp 的 next 指向 head，head 的 next 指向 None 即可

反转 tmp 之后链表的过程，head 的 next 不变，一直指向 tmp，所以也可以不存储 tmp  

```python
def reverseList(self, head: ListNode) -> ListNode:
	if not head or not head.next:
		return head
	newhead = self.reverseList(head.next)
	head.next.next = head
	head.next = None
	return newhead
```

48 ms


### #2

然后是通用性更强的迭代方法。遍历到第 n 位时，前 n-1 位已经反转，那么应该让第 n-1 位的 next 指向第 n+1 位，第 n 位的 next 指向第 1 位

所以用两个指针 head、tail 动态保存第 1 位和第 n-1 位即可


## 解答

```python
def reverseList(self, head: ListNode) -> ListNode:
	tail = head
	while tail and tail.next:
		tmp = tail.next
		tail.next = tmp.next
		tmp.next = head
		head = tmp
	return head
```

40 ms


