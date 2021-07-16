# 0147：对链表进行插入排序（★★）


## 题目

对链表进行插入排序。

![img](https://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif)

插入排序的动画演示如上。从第一个元素开始，该链表可以被认为已经部分排序（用黑色表示）。
每次迭代时，从输入数据中移除一个元素（用红色表示），并原地将其插入到已排好序的链表中。

<!--more--> 

示例 1：

	输入: 4->2->1->3
	输出: 1->2->3->4
	
示例 2：

	输入: -1->5->3->4->0
	输出: -1->0->3->4->5



## 分析

维护两个指针 tail，cur 分别指向 已排序的结尾节点 和 当前要排序的节点。

若 cur.val >= tail.val，就无需插入了，否则要在前面找插入位置，改变几个节点的指向。

## 解答

```python
def insertionSortList(self, head: ListNode) -> ListNode:
	dummy = ListNode(float('-inf'), next=head)
	tail, cur = dummy, head
	while cur:
		if tail.val <= cur.val:
			tail = tail.next
		else:
			p = dummy
			while p.next.val <= cur.val:
				p = p.next
			tail.next = cur.next
			cur.next = p.next
			p.next = cur
		cur = tail.next
	return dummy.next
```

168 ms
