# 0023：合并K个升序链表（★★）


## 题目

给你一个链表数组，每个链表都已经按升序排列。

请你将所有链表合并到一个升序链表中，返回合并后的链表。


示例 1：

	输入：lists = [[1,4,5],[1,3,4],[2,6]]
	输出：[1,1,2,3,4,4,5,6]
	解释：链表数组如下：
	[
	  1->4->5,
	  1->3->4,
	  2->6
	]
	将它们合并到一个有序链表中得到。
	1->1->2->3->4->4->5->6
	
示例 2：

	输入：lists = []
	输出：[]
	
示例 3：

	输入：lists = [[]]
	输出：[]

提示：
- k == lists.length
- 0 <= k <= 10^4
- 0 <= lists[i].length <= 500
- -10^4 <= lists[i][j] <= 10^4
- lists[i] 按 升序 排列
- lists[i].length 的总和不超过 10^4

## 分析

### #1

本题类似于归并排序，可以用分治法。

```python
def mergeKLists(self, lists: List[ListNode]) -> ListNode:
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
	n = len(lists)
	if n < 2:
		return lists[0] if n else None
	left, right = self.mergeKLists(lists[:n//2]), self.mergeKLists(lists[n//2:])
	return merge(left, right)
```

80 ms

### #2

也可以维护一个堆，初始将每个链表的头节点的值入堆，然后每轮弹出最小数，
将对应的链表前进一步，并将新的值入堆。

## 解答

```python
def mergeKLists(self, lists: List[ListNode]) -> ListNode:
	pq = [(node.val, i) for i, node in enumerate(lists) if node]
	heapify(pq)
	dummy = p = ListNode(next=None)
	while pq:
		val, i = heappop(pq)
		p.next = ListNode(val)
		p = p.next
		if lists[i].next:
			lists[i] = lists[i].next
			heappush(pq, (lists[i].val, i))
	return dummy.next
```
84 ms
