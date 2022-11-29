# 0147：对链表进行插入排序（★★）


## 题目

给定单个链表的头 head ，使用 插入排序 对链表进行排序，并返回 排序后链表的头 。

插入排序 算法的步骤:
1. 插入排序是迭代的，每次只移动一个元素，直到所有元素可以形成一个有序的输出列表。
2. 每次迭代中，插入排序只从输入数据中移除一个待排序的元素，找到它在序列中适当的位置，并将其插入。
3. 重复直到所有输入数据插入完为止。

下面是插入排序算法的一个图形示例。部分排序的列表(黑色)最初只包含列表中的第一个元素。
每次迭代时，从输入数据中删除一个元素(红色)，并就地插入已排序的列表中。

对链表进行插入排序。

![img](https://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif)


示例 1：

![img](https://assets.leetcode.com/uploads/2021/03/04/sort1linked-list.jpg)

	输入: head = [4,2,1,3]
	输出: [1,2,3,4]

示例 2：

![img](https://assets.leetcode.com/uploads/2021/03/04/sort2linked-list.jpg)

	输入: head = [-1,5,3,4,0]
	输出: [-1,0,3,4,5]
 

提示：
- 列表中的节点数在 [1, 5000]范围内
- -5000 <= Node.val <= 5000


## 分析

维护两个指针 tail，cur 分别指向 已排序的结尾节点 和 当前要排序的节点。

若 cur.val >= tail.val，就无需插入了，否则要在前面找插入位置 p，改变几个节点的指向。

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
