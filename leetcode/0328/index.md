# 0328：奇偶链表（★★）


## 题目

给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，
而不是节点的值的奇偶性。

请尝试使用原地算法完成。你的算法的空间复杂度应为 O(1)，时间复杂度应为 O(nodes)，nodes 为节点总数。


<!--more--> 

示例 1:

	输入: 1->2->3->4->5->NULL
	输出: 1->3->5->2->4->NULL

示例 2:

	输入: 2->1->3->5->6->4->7->NULL 
	输出: 2->3->6->7->1->5->4->NULL



## 分析

类似于 {{< lc "0086" >}} ，将奇数节点先提出来，按顺序链接，末尾再链接到原链表即可。

## 解答

```python
def oddEvenList(self, head: ListNode) -> ListNode:
	dummy1 = p = ListNode(next=head)
	dummy2 = q = ListNode()
	while p and p.next:
		q.next = p.next
		q = q.next
		p.next = p.next.next
		p = p.next
	q.next = dummy1.next
	return dummy2.next
```

48 ms

