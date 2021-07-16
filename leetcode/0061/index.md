# 0061：旋转链表（★）


## 题目

给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。
 
<!--more--> 

示例 1:

	输入: 1->2->3->4->5->NULL, k = 2
	输出: 4->5->1->2->3->NULL
	解释:
	向右旋转 1 步: 5->1->2->3->4->NULL
	向右旋转 2 步: 4->5->1->2->3->NULL
	
示例 2:

	输入: 0->1->2->NULL, k = 4
	输出: 2->0->1->NULL
	解释:
	向右旋转 1 步: 2->0->1->NULL
	向右旋转 2 步: 1->2->0->NULL
	向右旋转 3 步: 0->1->2->NULL
	向右旋转 4 步: 2->0->1->NULL

## 分析 

这个旋转操作其实相当于在某位置将链表断开，再将前半部分接到后半部分后面。

观察可知新的表尾是第 n - k % n （n 是链表长度）个元素，所以整个过程是：

	先找到表尾 tail 并计算出链表长度 n
	
	若 k 整除 n 则返回，否则找到新表尾 newtail，是第 n - k % n 个元素
	
	新表头 newhead=newtail.next，断开新表尾，再将 head 接到 tail 后面即可

## 解答

```python
def rotateRight(self, head: ListNode, k: int) -> ListNode:
	if not head:
		return head
	tail, n = head, 1
	while tail.next:
		tail = tail.next
		n += 1
	k %= n
	if not k:
		return head
	newtail = head
	for _ in range(n-k-1):
		newtail = newtail.next
	newhead = newtail.next
	tail.next = head
	newtail.next = None
	return newhead
```

40 ms

