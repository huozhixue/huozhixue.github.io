# 0206：反转链表（★）


## 题目

给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。


示例 1：

![img](https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg)

    输入：head = [1,2,3,4,5]
    输出：[5,4,3,2,1]

示例 2：

![img](https://assets.leetcode.com/uploads/2021/02/19/rev1ex2.jpg)

    输入：head = [1,2]
    输出：[2,1]

示例 3：

    输入：head = []
    输出：[]
 

提示：
- 链表中节点的数目范围是 [0, 5000]
- -5000 <= Node.val <= 5000

进阶：链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？

## 分析

### #1

先考虑递归方法：
- 首先反转 head.next 后的链表，这是递归子问题
- 然后改变 head.next 和 head 之间的指向即可

```python
def reverseList(self, head: ListNode) -> ListNode:
	if not head or not head.next:
		return head
	newhead = self.reverseList(head.next)
	head.next.next = head
	head.next = None
	return newhead
```
48 ms

### #2

也可以用迭代法：
- 用 tail 维护已经反转部分的尾节点
- 初始新建哑节点，tail 指向 head
- tail 后面还剩节点时，将该节点去除并插入到哑结点后即可

## 解答

```python
def reverseList(self, head: ListNode) -> ListNode:
    dummy, tail = ListNode(next=head), head
    while tail and tail.next:
        tmp = tail.next
        tail.next = tmp.next
        tmp.next = dummy.next
        dummy.next = tmp
    return dummy.next
```
36 ms


