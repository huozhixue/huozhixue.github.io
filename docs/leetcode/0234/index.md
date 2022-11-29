# 0234：回文链表（★★）


## 题目

给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。
如果是，返回 true ；否则，返回 false 。

示例 1：

![img](https://assets.leetcode.com/uploads/2021/03/03/pal1linked-list.jpg)

    输入：head = [1,2,2,1]
    输出：true

示例 2：

![img](https://assets.leetcode.com/uploads/2021/03/03/pal2linked-list.jpg)
    
    输入：head = [1,2]
    输出：false


提示：
- 链表中节点数目在范围[1, 10^5] 内
- 0 <= Node.val <= 9

进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？

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

找中点可以用快慢指针，而反转链表即是 {{< lc "0206" >}} 。

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
