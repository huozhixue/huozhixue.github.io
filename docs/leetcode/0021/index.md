# 0021：合并两个有序链表（★）


## 题目

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 


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

提示：
- 两个链表的节点数目范围是 [0, 50]
- -100 <= Node.val <= 100
- l1 和 l2 均按 非递减顺序 排列

## 分析

与归并两个有序数组的思路一样，用双指针即可。

区别在于这里是拼接，所以不需要造一个新链表，只需要建一个哑结点即可。

## 解答

```python
def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    dummy = p = ListNode()
    while list1 and list2:
        if list1.val <= list2.val:
            p.next = list1
            list1 = list1.next
        else:
            p.next = list2
            list2 = list2.next
        p = p.next
    p.next = list1 if list1 else list2
    return dummy.next
```
36 ms
