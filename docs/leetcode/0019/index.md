# 0019：删除链表的倒数第 N 个结点（★）


> <u>**[力扣第 19 题](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)**</u>

## 题目

<p>给你一个链表，删除链表的倒数第 <code>n</code><em> </em>个结点，并且返回链表的头结点。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg" style="width: 542px; height: 222px;" />
<pre>
<strong>输入：</strong>head = [1,2,3,4,5], n = 2
<strong>输出：</strong>[1,2,3,5]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>head = [1], n = 1
<strong>输出：</strong>[]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>head = [1,2], n = 1
<strong>输出：</strong>[1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>链表中结点的数目为 <code>sz</code></li>
<li><code>1 &lt;= sz &lt;= 30</code></li>
<li><code>0 &lt;= Node.val &lt;= 100</code></li>
<li><code>1 &lt;= n &lt;= sz</code></li>
</ul>



<p><strong>进阶：</strong>你能尝试使用一趟扫描实现吗？</p>


## 分析

- 可以直接遍历得到总结点数，再定位倒数第 `n` 个结点，删除即可
- 要求一趟扫描，可以用经典的快慢指针解法：
	- 一开始快慢指针都指向哑结点
	- 快指针先走 n+1 步
	- 两个指针同时走直到快指针到空
	- 这时慢指针指向的就是倒数第 n+1 个结点

## 解答

```python
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dum=slow=fast=ListNode(next=head)
        for _ in range(n+1):
            fast = fast.next
        while fast:
            slow,fast = slow.next,fast.next
        slow.next = slow.next.next
        return dum.next
```
时间 O(N)，42 ms
