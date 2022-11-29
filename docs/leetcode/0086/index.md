# 0086：分隔链表（★）


## 题目

给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，
使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。

你应当 保留 两个分区中每个节点的初始相对位置。


示例 1：

![img](https://assets.leetcode.com/uploads/2021/01/04/partition.jpg)
    
    输入：head = [1,4,3,2,5,2], x = 3
    输出：[1,2,2,4,3,5]

示例 2：

    输入：head = [2,1], x = 2
    输出：[1,2]
	
提示：
- 链表中节点的数目在范围 [0, 200] 内
- -100 <= Node.val <= 100
- -200 <= x <= 200
     
## 分析

遇到大于等于 x 的节点就先提出来，并按顺序链接，最后再跟到原链表的末尾即可。

## 解答

```python
def partition(self, head: ListNode, x: int) -> ListNode:
	dummy1 = p = ListNode(next=head)
	dummy2 = q = ListNode()
	while p.next:
		if p.next.val >= x:
			q.next = p.next
			p.next = p.next.next
			q = q.next
		else:
			p = p.next
	q.next = None
	p.next = dummy2.next
	return dummy1.next
```

40 ms
