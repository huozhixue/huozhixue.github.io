# 0141：环形链表（★★）


## 题目

给定一个链表，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 
为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 
如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

如果链表中存在环，则返回 true 。 否则，返回 false 。

示例 1：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png)

	输入：head = [3,2,0,-4], pos = 1
	输出：true
	解释：链表中有一个环，其尾部连接到第二个节点。

示例 2：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test2.png)


	输入：head = [1,2], pos = 0
	输出：true
	解释：链表中有一个环，其尾部连接到第一个节点。

示例 3：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test3.png)

	输入：head = [1], pos = -1
	输出：false
	解释：链表中没有环。


提示：
- 链表中节点的数目范围是 [0, 10^4]
- -10^5 <= Node.val <= 10^5
- pos 为 -1 或者链表中的一个 有效索引 。

进阶： 你能用 O(1)（即，常量）内存解决此问题吗？

## 分析

### #1

最简单的就是哈希。

```python
def hasCycle(self, head: ListNode) -> bool:
    vis = set()
    while head:
        if head in vis:
            return True
        vis.add(head)
        head = head.next
    return False
```
48 ms

### #2

要求 O(1) 空间，本题有个经典的快慢指针解法：
- 初始快慢指针都指向表头
- 每轮快指针移动两步，慢指针移动一步
- 若链表无环，快指针先到达末尾，无法再移动
- 若链表有环，快慢指针将会在环中某节点相遇

## 解答

```python
def hasCycle(self, head: ListNode) -> bool:
	slow = fast = head
	while fast and fast.next:
		slow = slow.next
		fast = fast.next.next
		if slow == fast:
			return True
	return False
```
64 ms

