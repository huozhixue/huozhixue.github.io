# 0083：删除排序链表中的重复元素


## 题目

给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

<!--more--> 

示例 1:

	输入: 1->1->2
	输出: 1->2
	
示例 2:

	输入: 1->1->2->3->3
	输出: 1->2->3



## 分析

遇到相邻的数相等时跳过即可。

## 解答

```python
def deleteDuplicates(self, head: ListNode) -> ListNode:
	p = head
	while p and p.next:
		if p.val == p.next.val:
			p.next = p.next.next
		else:
			p = p.next
	return head
```

44 ms
