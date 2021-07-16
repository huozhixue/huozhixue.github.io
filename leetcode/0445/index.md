# 0445：两数相加 II


## 题目

给你两个 非空 链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。

你可以假设除了数字 0 之外，这两个数字都不会以零开头。

如果输入链表不能修改该如何处理？换句话说，你不能对列表中的节点进行翻转。

 <!--more--> 
 
示例：

	输入：(7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
	输出：7 -> 8 -> 0 -> 7


## 分析

### #1

最简单的想法就是先拿到两个数，相加后，再按位添加到新链表中。

```python
def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
	x, y = 0, 0
	while l1:
		x = x*10+l1.val
		l1 = l1.next
	while l2:
		l2 = l2*10+l2.val
		l2 = l2.next
	dummy = p = ListNode()
	for char in str(x+y):
		p.next = ListNode(int(char))
		p = p.next
	return dummy.next
```

80 ms

### #2

为了防止数太大，也可以用数组存储两个数，再模拟进位加法，类似 {{< lc "0415" >}} 。

## 解答

```python
def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
	A, B = [], []
	while l1:
		A.append(l1.val)
		l1 = l1.next
	while l2:
		B.append(l2.val)
		l2 = l2.next
	head, carry = None, 0
	while A or B or carry:
		x = A.pop() if A else 0
		y = B.pop() if B else 0
		s = x+y+carry
		head = ListNode(s%10, next=head)
		carry = s//10
	return head
```

80 ms


