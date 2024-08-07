# 0203：移除链表元素


> <u>**[力扣第 203 题](https://leetcode.cn/problems/remove-linked-list-elements/)**</u>

## 题目

给你一个链表的头节点 <code>head</code> 和一个整数 <code>val</code> ，请你删除链表中所有满足 <code>Node.val == val</code> 的节点，并返回 <strong>新的头节点</strong> 。


<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/06/removelinked-list.jpg" style="width: 500px; height: 142px;" />
<pre>
<strong>输入：</strong>head = [1,2,6,3,4,5,6], val = 6
<strong>输出：</strong>[1,2,3,4,5]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>head = [], val = 1
<strong>输出：</strong>[]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>head = [7,7,7,7], val = 7
<strong>输出：</strong>[]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>列表中的节点数目在范围 <code>[0, 10<sup>4</sup>]</code> 内</li>
<li><code>1 <= Node.val <= 50</code></li>
<li><code>0 <= val <= 50</code></li>
</ul>


**相似问题：**
- [0027：移除元素](/leetcode/0027)
- [0237：删除链表中的节点](/leetcode/0237)
- [2095：删除链表的中间节点（1324 分）](/leetcode/2095)
- [3217：从链表中移除在数组中存在的节点](/leetcode/3217)


## 分析

遍历删除即可。头节点也可能删除，所以建个哑结点。

## 解答

```python
class Solution:
    def removeElements(self, head: Optional[ListNode], val: int) -> Optional[ListNode]:
        dum=p=ListNode(next=head)
        while p.next:
            if p.next.val==val:
                p.next = p.next.next
            else:
                p = p.next
        return dum.next
```
76 ms






