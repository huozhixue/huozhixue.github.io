# 0083：删除排序链表中的重复元素


> <u>**[力扣第 83 题](https://leetcode.cn/problems/remove-duplicates-from-sorted-list/)**</u>

## 题目

<p>给定一个已排序的链表的头<meta charset="UTF-8" /> <code>head</code> ， <em>删除所有重复的元素，使每个元素只出现一次</em> 。返回 <em>已排序的链表</em> 。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/04/list1.jpg" style="height: 160px; width: 200px;" />
<pre>
<strong>输入：</strong>head = [1,1,2]
<strong>输出：</strong>[1,2]
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/04/list2.jpg" style="height: 123px; width: 300px;" />
<pre>
<strong>输入：</strong>head = [1,1,2,3,3]
<strong>输出：</strong>[1,2,3]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>链表中节点数目在范围 <code>[0, 300]</code> 内</li>
<li><code>-100 &lt;= Node.val &lt;= 100</code></li>
<li>题目数据保证链表已经按升序 <strong>排列</strong></li>
</ul>


## 分析

遇到相邻的数相等时跳过即可。

## 解答

```python
def deleteDuplicates(self, head: ListNode) -> ListNode:
	p = head
	while p and p.next:
		if p.val == p.next.val:
			p.next = p.next.next
		else:
			p = p.next
	return head
```
44 ms
