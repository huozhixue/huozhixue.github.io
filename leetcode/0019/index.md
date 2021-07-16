# 0019：删除链表的倒数第 N 个结点（★）


## 题目

给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

进阶：你能尝试使用一趟扫描实现吗？

<!--more--> 

示例 1：
![img](https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg)

	输入：head = [1,2,3,4,5], n = 2
	输出：[1,2,3,5]
	
示例 2：

	输入：head = [1], n = 1
	输出：[]
	
示例 3：

	输入：head = [1,2], n = 1
	输出：[1]

## 分析

可以用经典的快慢指针解法。

一开始快慢指针都指向哑结点，让快指针先走 n 步，再让两个指针一起走直到快指针到尾部。
这时慢指针指向的就是倒数第 n+1 个结点，以方便删除操作。

## 解答

```python
def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
	dummy = slow = fast = ListNode(next=head)
	for _ in range(n):
		fast = fast.next
	while fast.next:
		slow = slow.next
		fast = fast.next
	slow.next = slow.next.next
	return dummy.next
```

时间复杂度 O(N)，36 ms
