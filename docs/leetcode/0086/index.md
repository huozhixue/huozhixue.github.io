# 0086：分隔链表（★）


> <u>**[力扣第 86 题](https://leetcode.cn/problems/partition-list/)**</u>

## 题目

<p>给你一个链表的头节点 <code>head</code> 和一个特定值<em> </em><code>x</code> ，请你对链表进行分隔，使得所有 <strong>小于</strong> <code>x</code> 的节点都出现在 <strong>大于或等于</strong> <code>x</code> 的节点之前。</p>

<p>你应当 <strong>保留</strong> 两个分区中每个节点的初始相对位置。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/04/partition.jpg" style="width: 662px; height: 222px;" />
<pre>
<strong>输入：</strong>head = [1,4,3,2,5,2], x = 3
<strong>输出</strong>：[1,2,2,4,3,5]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>head = [2,1], x = 2
<strong>输出</strong>：[1,2]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>链表中节点的数目在范围 <code>[0, 200]</code> 内</li>
<li><code>-100 <= Node.val <= 100</code></li>
<li><code>-200 <= x <= 200</code></li>
</ul>


## 分析

遇到大于等于 x 的节点就先提出来，并按顺序链接，最后再跟到原链表的末尾即可。

## 解答

```python
def partition(self, head: ListNode, x: int) -> ListNode:
	dummy1 = p = ListNode(next=head)
	dummy2 = q = ListNode()
	while p.next:
		if p.next.val >= x:
			q.next = p.next
			p.next = p.next.next
			q = q.next
		else:
			p = p.next
	q.next = None
	p.next = dummy2.next
	return dummy1.next
```

40 ms
