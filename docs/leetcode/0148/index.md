# 0148：排序链表（★★）


## 题目

给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。


示例 1：

![img](https://assets.leetcode.com/uploads/2020/09/14/sort_list_1.jpg)

	输入：head = [4,2,1,3]
	输出：[1,2,3,4]
	
示例 2：

![img](https://assets.leetcode.com/uploads/2020/09/14/sort_list_2.jpg)

	输入：head = [-1,5,3,4,0]
	输出：[-1,0,3,4,5]
	
示例 3：

	输入：head = []
	输出：[]

提示：
- 链表中节点的数目在范围 [0, 5 * 10^4] 内
- -10^5 <= Node.val <= 10^5

进阶：你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？

## 分析

要求 O(n log n) 时间复杂度和常数级空间复杂度，马上想到快排和归并排序。

这里使用归并排序，用快慢指针找到中点，归并部分即问题 {{< lc "0021" >}} 。

## 解答

```python
def sortList(self, head: ListNode) -> ListNode:
	def merge(l1, l2):
		dummy = l3 = ListNode()
		while l1 and l2:
			if l1.val <= l2.val:
				l3.next = l1
				l1 = l1.next
			else:
				l3.next = l2
				l2 = l2.next
			l3 = l3.next
		l3.next = l1 if l1 else l2
		return dummy.next
	
	if not head or not head.next:
		return head
	slow = fast = head
	while fast.next and fast.next.next:
		slow = slow.next
		fast = fast.next.next
	l1, l2 = head, slow.next
	slow.next = None
	return merge(self.sortList(l1), self.sortList(l2))
```
408 ms

