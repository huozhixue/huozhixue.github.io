# 0024：两两交换链表中的节点（★）


## 题目

给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

<!--more--> 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/10/03/swap_ex1.jpg)

	输入：head = [1,2,3,4]
	输出：[2,1,4,3]

示例 2：

	输入：head = []
	输出：[]
	
示例 3：

	输入：head = [1]
	输出：[1]
 

## 分析

按顺序依次交换两个相邻节点即可。

先建一个链表前的哑结点，并用指针 p 指向它。当 p 后面存在至少两个节点时，改变三个节点的指向以改变顺序，
再把 p 移动两步准备下一轮交换。如此循环即可。


## 解答

```python
def swapPairs(self, head: ListNode) -> ListNode:
	dummy = p = ListNode(next=head)
	while p.next and p.next.next:
		q = p.next.next
		p.next.next = q.next
		q.next = p.next
		p.next = q
		p = p.next.next
	return dummy.next
```

28 ms
