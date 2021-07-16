# 0082：删除排序链表中的重复元素 II（★）


## 题目

给定一个排序链表，删除所有含有重复数字的节点，只保留原始链表中 没有重复出现 的数字。

<!--more--> 

示例 1:

	输入: 1->2->3->3->4->4->5
	输出: 1->2->5
	
示例 2:

	输入: 1->1->1->2->3
	输出: 2->3



## 分析

{{< lc "0083" >}}  的进阶版。当后面两个节点的值相等时，跳过所有等于该值的节点即可。
表头可能也要跳过，因此新建个哑结点。

## 解答

```python
def deleteDuplicates(self, head: ListNode) -> ListNode:
	dummy = p = ListNode(next=head)
	while p.next and p.next.next:
		if p.next.val == p.next.next.val:
			val = p.next.val
			p.next = p.next.next.next
			while p.next and p.next.val == val:
				p.next = p.next.next
		else:
			p = p.next
	return dummy.next
```

36 ms
