# 0025：K 个一组翻转链表（★★★）


## 题目

给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。

k 是一个正整数，它的值小于或等于链表的长度。

如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/10/03/reverse_ex1.jpg)

    输入：head = [1,2,3,4,5], k = 2
    输出：[2,1,4,3,5]

示例 2：

![img](https://assets.leetcode.com/uploads/2020/10/03/reverse_ex2.jpg)
    
    输入：head = [1,2,3,4,5], k = 3
    输出：[3,2,1,4,5]

提示：
- 链表中的节点数目为 n
- 1 <= k <= n <= 5000
- 0 <= Node.val <= 1000

进阶：你可以设计一个只用 O(1) 额外内存空间的算法解决此问题吗？


## 分析

{{< lc "0024" >}} 的升级版。
- 链表前新建一个哑节点，指针 p 初始指向哑节点
- 当 p 后面存在 k 个节点时，将这一段翻转
- 将 p 移动 k 步准备下一轮翻转，如此循环即可

反转某段链表的方法可以参考 {{< lc "0092" >}}。

## 解答

```python
def reverseKGroup(self, head: ListNode, k: int) -> ListNode:
    dummy = p = ListNode(next=head)
    while True:
        fast = p
        for _ in range(k):
            fast = fast.next
            if not fast:
                return dummy.next
        tail = p.next
        for _ in range(k - 1):
            tmp = tail.next
            tail.next = tmp.next
            tmp.next = p.next
            p.next = tmp
        p = tail
```
44 ms
