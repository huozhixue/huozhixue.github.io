# 0092：反转链表 II（★★）


## 题目

给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。
请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。

示例 1：

![img](https://assets.leetcode.com/uploads/2021/02/19/rev2ex2.jpg)

    输入：head = [1,2,3,4,5], left = 2, right = 4
    输出：[1,4,3,2,5]

示例 2：

    输入：head = [5], left = 1, right = 1
    输出：[5]

提示：
- 链表中节点数目为 n
- 1 <= n <= 500
- -500 <= Node.val <= 500
- 1 <= left <= right <= n
  

## 分析

类似 {{< lc "0206" >}} ，只不过表头从哑节点变为了第 left-1 个节点。

## 解答

```python
def reverseBetween(self, head: ListNode, left: int, right: int) -> ListNode:
    dummy = p = ListNode(next=head)
    for _ in range(left-1):
        p = p.next
    tail = p.next
    for _ in range(right-left):
        tmp = tail.next
        tail.next = tmp.next
        tmp.next = p.next
        p.next = tmp
    return dummy.next
```
40 ms


