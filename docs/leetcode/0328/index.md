# 0328：奇偶链表（★）


> <u>**[力扣第 328 题](https://leetcode.cn/problems/odd-even-linked-list/)**</u>

## 题目

<p>给定单链表的头节点 <code>head</code> ，将所有索引为奇数的节点和索引为偶数的节点分别组合在一起，然后返回重新排序的列表。</p>

<p><strong>第一个</strong>节点的索引被认为是 <strong>奇数</strong> ， <strong>第二个</strong>节点的索引为 <strong>偶数</strong> ，以此类推。</p>

<p>请注意，偶数组和奇数组内部的相对顺序应该与输入时保持一致。</p>

<p>你必须在 <code>O(1)</code> 的额外空间复杂度和 <code>O(n)</code> 的时间复杂度下解决这个问题。</p>



<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/03/10/oddeven-linked-list.jpg" style="height: 123px; width: 300px;" /></p>

<pre>
<strong>输入: </strong>head = [1,2,3,4,5]
<strong>输出:</strong> [1,3,5,2,4]</pre>

<p><strong>示例 2:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/03/10/oddeven2-linked-list.jpg" style="height: 142px; width: 500px;" /></p>

<pre>
<strong>输入:</strong> head = [2,1,3,5,6,4,7]
<strong>输出:</strong> [2,3,6,7,1,5,4]</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>n == </code> 链表中的节点数</li>
<li><code>0 &lt;= n &lt;= 10<sup>4</sup></code></li>
<li><code>-10<sup>6</sup> &lt;= Node.val &lt;= 10<sup>6</sup></code></li>
</ul>


## 分析

类似于 {{< lc "0086" >}} ，将奇数节点先提出来，按顺序链接，末尾再链接到原链表即可。

## 解答

```python
def oddEvenList(self, head: ListNode) -> ListNode:
	dummy1 = p = ListNode(next=head)
	dummy2 = q = ListNode()
	while p and p.next:
		q.next = p.next
		q = q.next
		p.next = p.next.next
		p = p.next
	q.next = dummy1.next
	return dummy2.next
```
48 ms

