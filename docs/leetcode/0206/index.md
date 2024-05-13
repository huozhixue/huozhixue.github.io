# 0206：反转链表


> <u>**[力扣第 206 题](https://leetcode.cn/problems/reverse-linked-list/)**</u>

## 题目

给你单链表的头节点 <code>head</code> ，请你反转链表，并返回反转后的链表。
<div class="original__bRMd">
<div>


<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg" style="width: 542px; height: 222px;" />
<pre>
<strong>输入：</strong>head = [1,2,3,4,5]
<strong>输出：</strong>[5,4,3,2,1]
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/rev1ex2.jpg" style="width: 182px; height: 222px;" />
<pre>
<strong>输入：</strong>head = [1,2]
<strong>输出：</strong>[2,1]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>head = []
<strong>输出：</strong>[]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>链表中节点的数目范围是 <code>[0, 5000]</code></li>
<li><code>-5000 <= Node.val <= 5000</code></li>
</ul>



<p><strong>进阶：</strong>链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？</p>
</div>
</div>


## 分析

递归法很简单，也可以用迭代法：
- 新建哑节点 dum
- tail 维护已反转部分的尾节点，初始指向 head
- tail 后面还剩节点时，将该节点去除并插入到哑结点后即可

## 解答

```python
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dum=ListNode(next=head)
        tail = head
        while tail and tail.next:
            tmp = tail.next
            tail.next = tmp.next
            tmp.next = dum.next
            dum.next = tmp
        return dum.next
```
43 ms


