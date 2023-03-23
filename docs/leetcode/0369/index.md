# 0369：给单链表加一（★）


> <u>**[力扣第 369 题](https://leetcode.cn/problems/plus-one-linked-list/)**</u>

## 题目

<p>给定一个用<strong>链表</strong>表示的非负整数， 然后将这个整数 <em>再加上 1</em> 。</p>

<p>这些数字的存储是这样的：最高位有效的数字位于链表的首位<meta charset="UTF-8" /> <code>head</code> 。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入: </strong>head = [1,2,3]
<strong>输出: </strong>[1,2,4]
</pre>

<p><meta charset="UTF-8" /></p>

<p><strong>示例</strong><strong> 2:</strong></p>

<pre>
<strong>输入: </strong>head = [0]
<strong>输出: </strong>[1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>链表中的节点数在<meta charset="UTF-8" /> <code>[1, 100]</code> 的范围内。</li>
<li><code>0 &lt;= Node.val &lt;= 9</code></li>
<li>由链表表示的数字不包含前导零，除了零本身。</li>
</ul>


## 分析

## 解答

```python
def plusOne(self, head: ListNode) -> ListNode:
	def help(node):
		if not node:
			return 1
		s = node.val + help(node.next)
		node.val = s % 10
		return s // 10
	
	carry = help(head)
	return ListNode(1, next=head) if carry else head
```
28 ms
