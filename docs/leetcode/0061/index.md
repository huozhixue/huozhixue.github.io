# 0061：旋转链表（★）


## 题目

给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。


示例 1：

![img](https://assets.leetcode.com/uploads/2020/11/13/rotate1.jpg)

	输入：head = [1,2,3,4,5], k = 2
	输出：[4,5,1,2,3]
	
示例 2：

![img](https://assets.leetcode.com/uploads/2020/11/13/roate2.jpg)

	输入：head = [0,1,2], k = 4
	输出：[2,0,1]
 
	
提示：

- 链表中节点的数目在范围 [0, 500] 内
- -100 <= Node.val <= 100
- 0 <= k <= 2 * 10^9

## 分析 

这个旋转操作其实相当于在某位置将链表断开，再将前半部分接到后半部分后面。

观察可知新的表尾是第 n - k % n （n 是链表长度）个元素，所以：
- 先找到表尾 tail 并计算出链表长度 n
- 若 k 是 n 的倍数直接返回，否则找到新表尾 newtail，是第 n - k % n 个元素
- 新表头 newhead=newtail.next，断开新表尾，再将 head 接到 tail 后面即可

## 解答

```python
def rotateRight(self, head: ListNode, k: int) -> ListNode:
	if not head:
		return head
	tail, n = head, 1
	while tail.next:
		tail = tail.next
		n += 1
	k %= n
	if not k:
		return head
	newtail = head
	for _ in range(n-k-1):
		newtail = newtail.next
	newhead = newtail.next
	tail.next = head
	newtail.next = None
	return newhead
```

40 ms

