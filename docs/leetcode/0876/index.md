# 0876：链表的中间结点（1231 分）


> <u>**[力扣第 95 场周赛第 1 题](https://leetcode.cn/problems/middle-of-the-linked-list/)**</u>

## 题目

<p>给你单链表的头结点 <code>head</code> ，请你找出并返回链表的中间结点。</p>

<p>如果有两个中间结点，则返回第二个中间结点。</p>



<p><strong class="example">示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/23/lc-midlist1.jpg" style="width: 544px; height: 65px;" />
<pre>
<strong>输入：</strong>head = [1,2,3,4,5]
<strong>输出：</strong>[3,4,5]
<strong>解释：</strong>链表只有一个中间结点，值为 3 。
</pre>

<p><strong class="example">示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/23/lc-midlist2.jpg" style="width: 664px; height: 65px;" />
<pre>
<strong>输入：</strong>head = [1,2,3,4,5,6]
<strong>输出：</strong>[4,5,6]
<strong>解释：</strong>该链表有两个中间结点，值分别为 3 和 4 ，返回第二个结点。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>链表的结点数范围是 <code>[1, 100]</code></li>
<li><code>1 &lt;= Node.val &lt;= 100</code></li>
</ul>


## 分析

### #1

最简单的就是先遍历得到链表长度 n，然后从序号 n//2 的节点即为所求。

```python
def middleNode(self, head: ListNode) -> ListNode:
	n, p = 0, head
	while p:
		p = p.next
		n += 1
	for _ in range(n//2):
		head = head.next
	return head
```
40 ms

### #2

还有个巧妙的想法，可以用两个指针同时从 head 出发，每轮一个指针移动两步，另一个指针移动一步。
当快指针越界时，慢指针即为所求。

这就是链表中经典的快慢指针法。

## 解答

```python
def middleNode(self, head: ListNode) -> ListNode:
	slow = fast = head
	while fast and fast.next:
		slow, fast = slow.next, fast.next.next
	return slow
```
36 ms

