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

- 新建一个链表前的哑节点，指针 p 初始指向哑节点
- 当 p 后面存在至少两个节点时，改变 p 和两个节点的指向来交换节点
- 再把 p 移动两步准备下一轮交换，如此循环即可


## 解答

```python
def swapPairs(self, head: ListNode) -> ListNode:
    dummy = p = ListNode(next=head)
    while p.next and p.next.next:
        q = p.next
        p.next = p.next.next
        q.next = q.next.next
        p.next.next = q
        p = q
    return dummy.next
```
28 ms
