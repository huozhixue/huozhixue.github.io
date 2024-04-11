# 0024：两两交换链表中的节点（★）


> <u>**[力扣第 24 题](https://leetcode.cn/problems/swap-nodes-in-pairs/)**</u>

## 题目

<p>给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/swap_ex1.jpg" style="width: 422px; height: 222px;" />
<pre>
<strong>输入：</strong>head = [1,2,3,4]
<strong>输出：</strong>[2,1,4,3]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>head = []
<strong>输出：</strong>[]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>head = [1]
<strong>输出：</strong>[1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>链表中节点的数目在范围 <code>[0, 100]</code> 内</li>
<li><code>0 &lt;= Node.val &lt;= 100</code></li>
</ul>


## 分析

头部新建哑节点，模拟即可。

## 解答

```python
class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dum=p=ListNode(next=head)
        while p.next and p.next.next:
            a,b = p.next,p.next.next
            p.next = b
            a.next = b.next
            b.next = a
            p = a
        return dum.next
```
37 ms
