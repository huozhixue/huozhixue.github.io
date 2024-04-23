# 0092：反转链表 II（★）


> <u>**[力扣第 92 题](https://leetcode.cn/problems/reverse-linked-list-ii/)**</u>

## 题目

给你单链表的头指针 `head` 和两个整数 `left` 和 `right` ，其中 `left <= right` 。请你反转从位置 `left` 到位置 `right` 的链表节点，返回 **反转后的链表** 。

**示例 1：**

![](https://assets.leetcode.com/uploads/2021/02/19/rev2ex2.jpg)

**输入：**head = [1,2,3,4,5], left = 2, right = 4
**输出：**[1,4,3,2,5]

**示例 2：**

**输入：**head = [5], left = 1, right = 1
**输出：**[5]

**提示：**

- 链表中节点数目为 `n`
- `1 <= n <= 500`
- `-500 <= Node.val <= 500`
- `1 <= left <= right <= n`

**进阶：** 你可以使用一趟扫描完成反转吗？


## 分析

 {{< lc "0206" >}} 进阶，表头从哑节点变为了第 left-1 个节点。

## 解答

```python
class Solution:
    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
        dum=p=ListNode(next=head)
        for _ in range(left-1):
            p = p.next
        tail = p.next
        for _ in range(right-left):
            head = tail.next
            tail.next = head.next
            head.next = p.next
            p.next = head
        return dum.next
```
41 ms


