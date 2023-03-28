# 0147：对链表进行插入排序（★）


> <u>**[力扣第 147 题](https://leetcode.cn/problems/insertion-sort-list/)**</u>

## 题目

<p>给定单个链表的头<meta charset="UTF-8" /> <code>head</code> ，使用 <strong>插入排序</strong> 对链表进行排序，并返回 <em>排序后链表的头</em> 。</p>

<p><strong>插入排序</strong> 算法的步骤:</p>

<ol>
<li>插入排序是迭代的，每次只移动一个元素，直到所有元素可以形成一个有序的输出列表。</li>
<li>每次迭代中，插入排序只从输入数据中移除一个待排序的元素，找到它在序列中适当的位置，并将其插入。</li>
<li>重复直到所有输入数据插入完为止。</li>
</ol>

<p>下面是插入排序算法的一个图形示例。部分排序的列表(黑色)最初只包含列表中的第一个元素。每次迭代时，从输入数据中删除一个元素(红色)，并就地插入已排序的列表中。</p>

<p>对链表进行插入排序。</p>

<p><img alt="" src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif" /></p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/03/04/sort1linked-list.jpg" /></p>

<pre>
<strong>输入:</strong> head = [4,2,1,3]
<strong>输出:</strong> [1,2,3,4]</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/03/04/sort2linked-list.jpg" /></p>

<pre>
<strong>输入:</strong> head = [-1,5,3,4,0]
<strong>输出:</strong> [-1,0,3,4,5]</pre>



<p><strong>提示：</strong></p>

<p><meta charset="UTF-8" /></p>

<ul>
<li>列表中的节点数在 <code>[1, 5000]</code>范围内</li>
<li><code>-5000 &lt;= Node.val &lt;= 5000</code></li>
</ul>


## 分析

维护两个指针 tail，cur 分别指向 已排序的结尾节点 和 当前要排序的节点。

若 cur.val >= tail.val，就无需插入了，否则要在前面找插入位置 p，改变几个节点的指向。

## 解答

```python
def insertionSortList(self, head: ListNode) -> ListNode:
	dummy = ListNode(float('-inf'), next=head)
	tail, cur = dummy, head
	while cur:
		if tail.val <= cur.val:
			tail = tail.next
		else:
			p = dummy
			while p.next.val <= cur.val:
				p = p.next
			tail.next = cur.next
			cur.next = p.next
			p.next = cur
		cur = tail.next
	return dummy.next
```
168 ms
