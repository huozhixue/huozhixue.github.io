# 1019：链表中的下一个更大节点（1570 分）


> <u>**[力扣第 130 场周赛第 3 题](https://leetcode.cn/problems/next-greater-node-in-linked-list/)**</u>

## 题目

<p>给定一个长度为 <code>n</code> 的链表 <code>head</code></p>

<p>对于列表中的每个节点，查找下一个 <strong>更大节点</strong> 的值。也就是说，对于每个节点，找到它旁边的第一个节点的值，这个节点的值 <strong>严格大于</strong> 它的值。</p>

<p>返回一个整数数组 <code>answer</code> ，其中 <code>answer[i]</code> 是第 <code>i</code> 个节点( <strong>从1开始</strong> )的下一个更大的节点的值。如果第 <code>i</code> 个节点没有下一个更大的节点，设置 <code>answer[i] = 0</code> 。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/08/05/linkedlistnext1.jpg" /></p>

<pre>
<strong>输入：</strong>head = [2,1,5]
<strong>输出：</strong>[5,5,0]
</pre>

<p><strong>示例 2：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/08/05/linkedlistnext2.jpg" /></p>

<pre>
<strong>输入：</strong>head = [2,7,4,3,5]
<strong>输出：</strong>[7,0,5,5,0]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>链表中节点数为 <code>n</code></li>
<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>
<li><code>1 &lt;= Node.val &lt;= 10<sup>9</sup></code></li>
</ul>


## 分析

类似 {{< lc "0739"  >}} ，可以用单调栈解决。事先不知道链表长度，因此边遍历边维护结果数组即可。


## 解答

```python
def nextLargerNodes(self, head: ListNode) -> List[int]:
	res, stack, i = [], [], 0
	while head:
		while stack and stack[-1][1] < head.val:
			res[stack.pop()[0]] = head.val
		stack.append((i, head.val))
		res.append(0)
		head = head.next
		i += 1
	return res
```

324 ms
