# 0237：删除链表中的节点（★）


> <u>**[力扣第 237 题](https://leetcode.cn/problems/delete-node-in-a-linked-list/)**</u>

## 题目

<p>有一个单链表的 <code>head</code>，我们想删除它其中的一个节点 <code>node</code>。</p>

<p>给你一个需要删除的节点 <code>node</code> 。你将 <strong>无法访问</strong> 第一个节点  <code>head</code>。</p>

<p>链表的所有值都是 <b>唯一的</b>，并且保证给定的节点 <code>node</code> 不是链表中的最后一个节点。</p>

<p>删除给定的节点。注意，删除节点并不是指从内存中删除它。这里的意思是：</p>

<ul>
<li>给定节点的值不应该存在于链表中。</li>
<li>链表中的节点数应该减少 1。</li>
<li><code>node</code> 前面的所有值顺序相同。</li>
<li><code>node</code> 后面的所有值顺序相同。</li>
</ul>

<p><strong>自定义测试：</strong></p>

<ul>
<li>对于输入，你应该提供整个链表 <code>head</code> 和要给出的节点 <code>node</code>。<code>node</code> 不应该是链表的最后一个节点，而应该是链表中的一个实际节点。</li>
<li>我们将构建链表，并将节点传递给你的函数。</li>
<li>输出将是调用你函数后的整个链表。</li>
</ul>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/01/node1.jpg" style="height: 286px; width: 400px;" />
<pre>
<strong>输入：</strong>head = [4,5,1,9], node = 5
<strong>输出：</strong>[4,1,9]
<strong>解释：</strong>指定链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -&gt; 1 -&gt; 9
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/01/node2.jpg" style="height: 315px; width: 400px;" />
<pre>
<strong>输入：</strong>head = [4,5,1,9], node = 1
<strong>输出：</strong>[4,5,9]
<strong>解释：</strong>指定链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -&gt; 5 -&gt; 9</pre>



<p><strong>提示：</strong></p>

<ul>
<li>链表中节点的数目范围是 <code>[2, 1000]</code></li>
<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>
<li>链表中每个节点的值都是 <strong>唯一</strong> 的</li>
<li>需要删除的节点 <code>node</code> 是 <strong>链表中的节点</strong> ，且 <strong>不是末尾节点</strong></li>
</ul>


**相似问题：**
- [0203：移除链表元素](/leetcode/0203)
- [2487：从链表中移除节点（1454 分）](/leetcode/2487)
- [3217：从链表中移除在数组中存在的节点](/leetcode/3217)


## 分析

要求原地操作，节点为非末尾节点。因此赋值为下一个节点，删除下一个节点即可。

## 解答

```python
class Solution:
    def deleteNode(self, node):
        """
        :type node: ListNode
        :rtype: void Do not return anything, modify node in-place instead.
        """
        node.val = node.next.val
        node.next = node.next.next
```
38 ms
