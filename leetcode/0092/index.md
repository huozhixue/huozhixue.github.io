# 0092：反转链表 II（★★）


## 题目

反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

说明:
1 ≤ m ≤ n ≤ 链表长度。

<!--more--> 

示例:

	输入: 1->2->3->4->5->NULL, m = 2, n = 4
	输出: 1->4->3->2->5->NULL


## 分析

基于 {{< lc "0206" >}} 中反转链表的迭代方法，从第 m 位开始迭代反转 n-m 次，再将第 m-1 位的 next 指向新的第 m 位即可。

必须有个指针 p 指向第 m-1 位，所以将原本的 head 改为 p.next。


## 解答

```python
def reverseBetween(self, head: ListNode, m: int, n: int) -> ListNode:
	dummy = p = ListNode(next=head)
	for _ in range(m-1):
		p = p.next
	tail = p.next
	for _ in range(n-m):
		tmp = tail.next
		tail.next = tmp.next
		tmp.next = p.next
		p.next = tmp
	return dummy.next
```

36 ms


