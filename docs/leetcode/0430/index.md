# 0430：扁平化多级双向链表（★）


> <u>**[力扣第 430 题](https://leetcode.cn/problems/flatten-a-multilevel-doubly-linked-list/)**</u>

## 题目

<p>你会得到一个双链表，其中包含的节点有一个下一个指针、一个前一个指针和一个额外的 <strong>子指针</strong> 。这个子指针可能指向一个单独的双向链表，也包含这些特殊的节点。这些子列表可以有一个或多个自己的子列表，以此类推，以生成如下面的示例所示的 <strong>多层数据结构</strong> 。</p>

<p>给定链表的头节点 <font color="#c7254e"><font face="Menlo, Monaco, Consolas, Courier New, monospace"><span style="font-size:12.6px"><span style="background-color:#f9f2f4">head</span></span></font></font> ，将链表 <strong>扁平化</strong> ，以便所有节点都出现在单层双链表中。让 <code>curr</code> 是一个带有子列表的节点。子列表中的节点应该出现在<strong>扁平化列表</strong>中的 <code>curr</code> <strong>之后</strong> 和 <code>curr.next</code> <strong>之前</strong> 。</p>

<p>返回 <em>扁平列表的 <code>head</code> 。列表中的节点必须将其 <strong>所有</strong> 子指针设置为 <code>null</code> 。</em></p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/11/09/flatten11.jpg" style="height:339px; width:700px" /></p>

<pre>
<strong>输入：</strong>head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
<strong>输出：</strong>[1,2,3,7,8,11,12,9,10,4,5,6]
<strong>解释：</strong>输入的多级列表如上图所示。
扁平化后的链表如下图：
<img src="https://assets.leetcode.com/uploads/2021/11/09/flatten12.jpg" style="height:69px; width:1000px" />
</pre>

<p><strong>示例 2：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/11/09/flatten2.1jpg" style="height:200px; width:200px" /></p>

<pre>
<strong>输入：</strong>head = [1,2,null,3]
<strong>输出：</strong>[1,3,2]
<strong>解释：</strong>输入的多级列表如上图所示。
扁平化后的链表如下图：
<img src="https://assets.leetcode.com/uploads/2021/11/24/list.jpg" style="height:87px; width:300px" />
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>head = []
<strong>输出：</strong>[]
<strong>说明：</strong>输入中可能存在空列表。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>节点数目不超过 <code>1000</code></li>
<li><code>1 &lt;= Node.val &lt;= 10<sup>5</sup></code></li>
</ul>



<p><strong>如何表示测试用例中的多级链表？</strong></p>

<p>以 <strong>示例 1</strong> 为例：</p>

<pre>
1---2---3---4---5---6--NULL
|
7---8---9---10--NULL
|
11--12--NULL</pre>

<p>序列化其中的每一级之后：</p>

<pre>
[1,2,3,4,5,6,null]
[7,8,9,10,null]
[11,12,null]
</pre>

<p>为了将每一级都序列化到一起，我们需要每一级中添加值为 null 的元素，以表示没有节点连接到上一级的上级节点。</p>

<pre>
[1,2,3,4,5,6,null]
[null,null,7,8,9,10,null]
[null,11,12,null]
</pre>

<p>合并所有序列化结果，并去除末尾的 null 。</p>

<pre>
[1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
</pre>

<ul>
</ul>


## 分析

### #1

先考虑递归。有子链表时，调用递归程序将子链表扁平化，然后改变当前节点、子链表头尾节点、下一个节点的指针即可。

递归程序应该返回扁平化后的尾节点。

```python
def flatten(self, head: 'Node') -> 'Node':
	def help(p):
		while p and (p.next or p.child):
			if p.child:
				t = help(p.child)
				t.next = p.next
				if t.next:
					t.next.prev = t
				p.next = p.child
				p.next.prev = p
				p.child = None
				p = t
			else:
				p = p.next
		return p
	help(head)
	return head
```

44 ms

### #2

也可以用迭代的方法。按 [p.next, p.child] 的顺序将节点入栈，每次出栈时改变当前节点和上一个节点的指针即可。

## 解答

```python
def flatten(self, head: 'Node') -> 'Node':
	stack, prev = [head], None
	while stack:
		node = stack.pop()
		if node:
			if prev:
				prev.next = node
			node.prev = prev
			stack.extend([node.next,node.child])
			node.child = None
			prev = node
	return head
```
48 ms

