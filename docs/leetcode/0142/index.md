# 0142：环形链表 II（★★★）


## 题目

给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 
为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置
（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，
仅仅是为了标识链表的实际情况。

不允许修改 链表。


示例 1：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png)

	输入：head = [3,2,0,-4], pos = 1
	输出：返回索引为 1 的链表节点
	解释：链表中有一个环，其尾部连接到第二个节点。

示例 2：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test2.png)


	输入：head = [1,2], pos = 0
	输出：返回索引为 0 的链表节点
	解释：链表中有一个环，其尾部连接到第一个节点。

示例 3：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test3.png)

	输入：head = [1], pos = -1
	输出：返回 null
	解释：链表中没有环。

提示：
- 链表中节点的数目范围在范围 [0, 10^4] 内
- -10^5 <= Node.val <= 10^5
- pos 的值为 -1 或者链表中的一个有效索引
 

进阶：你是否可以使用 O(1) 空间解决此题？


## 分析

{{< lc "0141" >}} 升级版，依然可以用快慢指针解决：
- 假如环的周长为 L，入环位置为 x
- 当慢节点达到 x 时，快节点走了 2*x 步，也就是说在环上走了 x 步
- 此时快节点距离慢节点 L-x%L，再经过 L-x%L 轮相遇
- 相遇时慢节点在环上走了 L-x%L 步
- 若慢节点再在换上走 x 步，即到达位置 x
- 于是有个巧妙的想法，令另一个慢节点从起点开始同步走，两个慢节点相遇位置即为位置 x


## 解答

```python
def detectCycle(self, head: ListNode) -> ListNode:
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow == fast:
            slow2 = head
            while slow != slow2:
                slow, slow2 = slow.next, slow2.next
            return slow
    return None
```
44 ms

