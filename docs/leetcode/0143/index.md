# 0143：重排链表（★）


> <u>**[力扣第 143 题](https://leetcode.cn/problems/reorder-list/)**</u>

## 题目

<p>给定一个单链表 <code>L</code><em> </em>的头节点 <code>head</code> ，单链表 <code>L</code> 表示为：</p>

<pre>
L<sub>0</sub> → L<sub>1</sub> → … → L<sub>n - 1</sub> → L<sub>n</sub>
</pre>

<p>请将其重新排列后变为：</p>

<pre>
L<sub>0</sub> → L<sub>n</sub> → L<sub>1</sub> → L<sub>n - 1</sub> → L<sub>2</sub> → L<sub>n - 2</sub> → …</pre>

<p>不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://pic.leetcode-cn.com/1626420311-PkUiGI-image.png" style="width: 240px; " /></p>

<pre>
<strong>输入：</strong>head = [1,2,3,4]
<strong>输出：</strong>[1,4,2,3]</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://pic.leetcode-cn.com/1626420320-YUiulT-image.png" style="width: 320px; " /></p>

<pre>
<strong>输入：</strong>head = [1,2,3,4,5]
<strong>输出：</strong>[1,5,2,4,3]</pre>



<p><strong>提示：</strong></p>

<ul>
<li>链表的长度范围为 <code>[1, 5 * 10<sup>4</sup>]</code></li>
<li><code>1 &lt;= node.val &lt;= 1000</code></li>
</ul>


## 分析

先用快慢节点找到中点位置，截断为两部分，将后半部分链表反转后依次插入前半部分中即可。

反转链表即是问题 {{< lc "0206" >}} 。

## 解答

```python
def reorderList(self, head: ListNode) -> None:
	def reverse(head):
		tail = head
		while tail and tail.next:
			tmp = tail.next
			tail.next = tmp.next
			tmp.next = head
			head = tmp
		return head

	slow = fast = ListNode(next=head)
	while fast and fast.next:
		slow, fast = slow.next, fast.next.next
	q = slow.next
	slow.next = None
	p, q = head, reverse(q)
	while q:
		tmp = p.next
		p.next = q
		q = q.next
		p.next.next = tmp
		p = tmp
```
88 ms

