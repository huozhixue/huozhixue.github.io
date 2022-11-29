# 0082：删除排序链表中的重复元素 II（★）


## 题目

给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表 。


示例 1：

![img](https://assets.leetcode.com/uploads/2021/01/04/linkedlist1.jpg)

    输入：head = [1,2,3,3,4,4,5]
    输出：[1,2,5]

示例 2：

![img](https://assets.leetcode.com/uploads/2021/01/04/linkedlist2.jpg)

    输入：head = [1,1,1,2,3]
    输出：[2,3]

提示：
- 链表中节点数目在范围 [0, 300] 内
- -100 <= Node.val <= 100
- 题目数据保证链表已经按升序 排列

## 分析

{{< lc "0083" >}}  进阶版，当后面两个节点的值相等时，跳过所有等于该值的节点即可。

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
