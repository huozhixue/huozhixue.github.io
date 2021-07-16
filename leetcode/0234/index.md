# 0234：回文链表（★★）


## 题目

请判断一个链表是否为回文链表。

你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？

<!--more--> 

示例 1:

	输入: 1->2
	输出: false
	
示例 2:

	输入: 1->2->2->1
	输出: true

## 分析

### #1

用额外空间的话很简单。

```python
def isPalindrome(self, head: ListNode) -> bool:
	tmp = []
	while head:
		tmp.append(head.val)
		head = head.next
	return tmp == tmp[::-1]
```

780 ms

### #2

不用额外空间，考虑将链表均分为两部分，反转其中一部分，再遍历判断两部分的节点值序列是否相同。

找中点可以用快慢指针，而反转链表可以直接调用 {{< lc "0206" >}} 的代码。

## 解答

```python
def isPalindrome(self, head: ListNode) -> bool:
	def reverseList(head):
		tail = head
		while tail and tail.next:
			tmp = tail.next
			tail.next = tmp.next
			tmp.next = head
			head = tmp
		return head

	dummy = slow = fast = ListNode(next=head)
	while fast and fast.next:
		slow, fast = slow.next, fast.next.next
	head2 = reverseList(slow.next)
	while head2:
		if head.val != head2.val:
			return False
		head, head2 = head.next, head2.next
	return True
```

708 ms
