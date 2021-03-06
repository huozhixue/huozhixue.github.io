# 0876：链表的中间结点（★）



## 题目

给定一个头结点为 head 的非空单链表，返回链表的中间结点。

如果有两个中间结点，则返回第二个中间结点。

提示：

- 给定链表的结点数介于 1 和 100 之间。

 <!--more--> 
 
示例 1：

	输入：[1,2,3,4,5]
	输出：此列表中的结点 3 (序列化形式：[3,4,5])
	返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
	注意，我们返回了一个 ListNode 类型的对象 ans，这样：
	ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.

示例 2：

	输入：[1,2,3,4,5,6]
	输出：此列表中的结点 4 (序列化形式：[4,5,6])
	由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。
 

 
## 分析

### #1

最简单的就是先遍历得到链表长度 n，然后从序号 n//2 的节点即为所求。

```python
def middleNode(self, head: ListNode) -> ListNode:
	n, p = 0, head
	while p:
		p = p.next
		n += 1
	for _ in range(n//2):
		head = head.next
	return head
```

40 ms

### #2

还有个巧妙的想法，可以用两个指针同时从 head 出发，每轮一个指针移动两步，另一个指针移动一步。
当快指针越界时，慢指针即为所求。

这就是链表中经典的快慢指针法。

## 解答

```python
def middleNode(self, head: ListNode) -> ListNode:
	slow = fast = head
	while fast and fast.next:
		slow, fast = slow.next, fast.next.next
	return slow
```

36 ms

