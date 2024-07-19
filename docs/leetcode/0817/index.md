# 0817：链表组件（1428 分）


> <u>**[力扣第 817 题](https://leetcode.cn/problems/linked-list-components/)**</u>

## 题目

<p>给定链表头结点 <code>head</code>，该链表上的每个结点都有一个 <strong>唯一的整型值</strong> 。同时给定列表 <code>nums</code>，该列表是上述链表中整型值的一个子集。</p>

<p>返回列表 <code>nums</code> 中组件的个数，这里对组件的定义为：链表中一段最长连续结点的值（该值必须在列表 <code>nums</code> 中）构成的集合。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/07/22/lc-linkedlistcom1.jpg" /></p>

<pre>
<strong>输入:</strong> head = [0,1,2,3], nums = [0,1,3]
<strong>输出:</strong> 2
<strong>解释:</strong> 链表中,0 和 1 是相连接的，且 nums 中不包含 2，所以 [0, 1] 是 nums 的一个组件，同理 [3] 也是一个组件，故返回 2。</pre>

<p><strong>示例 2：</strong></p>

<p><strong> </strong><img src="https://assets.leetcode.com/uploads/2021/07/22/lc-linkedlistcom2.jpg" /></p>

<pre>
<strong>输入:</strong> head = [0,1,2,3,4], nums = [0,3,1,4]
<strong>输出:</strong> 2
<strong>解释:</strong> 链表中，0 和 1 是相连接的，3 和 4 是相连接的，所以 [0, 1] 和 [3, 4] 是两个组件，故返回 2。</pre>



<p><strong>提示：</strong></p>

<ul>
<li>链表中节点数为<code>n</code></li>
<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>
<li><code>0 &lt;= Node.val &lt; n</code></li>
<li><code>Node.val</code> 中所有值 <strong>不同</strong></li>
<li><code>1 &lt;= nums.length &lt;= n</code></li>
<li><code>0 &lt;= nums[i] &lt; n</code></li>
<li><code>nums</code> 中所有值 <strong>不同</strong></li>
</ul>


**相似问题：**
- [2181：合并零之间的节点（1333 分）](/leetcode/2181)


## 分析

遍历链表，计数连续的段数即可，这里连续的定义是相邻节点都在 G 中。


## 解答

```python
def numComponents(self, head: ListNode, nums: List[int]) -> int:
	cnt, nums = 0, set(nums)
	while head:
		if head.val in nums:
			cnt += 1
			while head.next and head.next.val in nums:
				head = head.next
		head = head.next
	return cnt
```

96 ms

