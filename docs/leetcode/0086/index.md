# 0086：分隔链表（★）


> <u>**[力扣第 86 题](https://leetcode.cn/problems/partition-list/)**</u>

## 题目

<p>给你一个链表的头节点 <code>head</code> 和一个特定值<em> </em><code>x</code> ，请你对链表进行分隔，使得所有 <strong>小于</strong> <code>x</code> 的节点都出现在 <strong>大于或等于</strong> <code>x</code> 的节点之前。</p>

<p>你应当 <strong>保留</strong> 两个分区中每个节点的初始相对位置。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/04/partition.jpg" style="width: 662px; height: 222px;" />
<pre>
<strong>输入：</strong>head = [1,4,3,2,5,2], x = 3
<strong>输出</strong>：[1,2,2,4,3,5]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>head = [2,1], x = 2
<strong>输出</strong>：[1,2]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>链表中节点的数目在范围 <code>[0, 200]</code> 内</li>
<li><code>-100 <= Node.val <= 100</code></li>
<li><code>-200 <= x <= 200</code></li>
</ul>


## 分析

分别提到两个链表中，最后再拼接即可。

## 解答

```python
class Solution:
    def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:
        dum1,dum2 = ListNode(),ListNode()
        p,q = dum1,dum2
        while head:
            if head.val<x:
                p.next = head
                p = p.next
            else:
                q.next = head
                q = q.next
            head = head.next
        p.next = dum2.next
        q.next = None
        return dum1.next
```

48 ms
