# 0002：两数相加（★）


## 题目

你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，
并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例 1：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/01/02/addtwonumber1.jpg)

    输入：l1 = [2,4,3], l2 = [5,6,4]
    输出：[7,0,8]
    解释：342 + 465 = 807.

示例 2：

    输入：l1 = [0], l2 = [0]
    输出：[0]

示例 3：

    输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
    输出：[8,9,9,9,0,0,0,1]

提示：
- 每个链表中的节点数在范围 [1, 100] 内
- 0 <= Node.val <= 9
- 题目数据保证列表表示的数字不含前导零

## 分析

链表是逆序存储，所以取到的数字依次是个十百千位。很自然的想到普通人算加法的方式，先算低位，再结合进位算高位。

要注意边界条件，两个链表长度可能不一样，结果可能比两个链表都长，需要再添加新节点。

## 解答

```python
def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
    dummy = p = ListNode()
    carry = 0
    while l1 or l2:
        a = l1.val if l1 else 0
        b = l2.val if l2 else 0
        s = a + b + carry
        p.next = ListNode(s % 10)
        carry = s // 10
        p = p.next
        l1 = l1.next if l1 else l1
        l2 = l2.next if l2 else l2
    p.next = ListNode(carry) if carry else None
    return dummy.next
```
72 ms


