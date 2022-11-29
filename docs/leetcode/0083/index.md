# 0083：删除排序链表中的重复元素


## 题目

给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。
 

示例 1：

![img](https://assets.leetcode.com/uploads/2021/01/04/list1.jpg)
    
    输入：head = [1,1,2]
    输出：[1,2]

示例 2：

![img](https://assets.leetcode.com/uploads/2021/01/04/list2.jpg)

    输入：head = [1,1,2,3,3]
    输出：[1,2,3]
	
提示：
- 链表中节点数目在范围 [0, 300] 内
- -100 <= Node.val <= 100
- 题目数据保证链表已经按升序排列
 
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
