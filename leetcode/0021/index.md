# 0021：合并两个有序链表（★）


## 题目

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

<!--more--> 

示例 1:

![img](https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg)

	输入：l1 = [1,2,4], l2 = [1,3,4]
	输出：[1,1,2,3,4,4]
	
示例 2：

	输入：l1 = [], l2 = []
	输出：[]
	
示例 3：

	输入：l1 = [], l2 = [0]
	输出：[0]


## 分析

与归并两个有序数组的思路一样，用双指针即可。
区别在于这里是拼接，所以不需要造一个新链表，只需要建一个哑结点即可。

## 解答

```python
def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
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
```

36 ms
