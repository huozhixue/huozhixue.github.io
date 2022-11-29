# 0203：移除链表元素


## 题目

给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。
 

示例 1：

![img](https://assets.leetcode.com/uploads/2021/03/06/removelinked-list.jpg)

	输入：head = [1,2,6,3,4,5,6], val = 6
	输出：[1,2,3,4,5]

示例 2：

	输入：head = [], val = 1
	输出：[]

示例 3：

	输入：head = [7,7,7,7], val = 7
	输出：[]


提示：
- 列表中的节点数目在范围 [0, 10^4] 内
- 1 <= Node.val <= 50
- 0 <= val <= 50
 


## 分析

遍历删除即可。头节点也可能删除，所以要建个哑结点。

## 解答

```python
def removeElements(self, head: ListNode, val: int) -> ListNode:
	dummy = p = ListNode(next=head)
	while p.next:
		if p.next.val == val:
			p.next = p.next.next
		else:
			p = p.next
	return dummy.next
```
76 ms






