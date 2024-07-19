# 0092：反转链表 II（★）


> <u>**[力扣第 92 题](https://leetcode.cn/problems/reverse-linked-list-ii/)**</u>

## 题目

给你单链表的头指针 <code>head</code> 和两个整数 <code>left</code> 和 <code>right</code> ，其中 <code>left <= right</code> 。请你反转从位置 <code>left</code> 到位置 <code>right</code> 的链表节点，返回 <strong>反转后的链表</strong> 。


<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/rev2ex2.jpg" style="width: 542px; height: 222px;" />
<pre>
<strong>输入：</strong>head = [1,2,3,4,5], left = 2, right = 4
<strong>输出：</strong>[1,4,3,2,5]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>head = [5], left = 1, right = 1
<strong>输出：</strong>[5]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>链表中节点数目为 <code>n</code></li>
<li><code>1 <= n <= 500</code></li>
<li><code>-500 <= Node.val <= 500</code></li>
<li><code>1 <= left <= right <= n</code></li>
</ul>



<p><strong>进阶：</strong> 你可以使用一趟扫描完成反转吗？</p>


**相似问题：**
- [0206：反转链表](/leetcode/0206)


## 分析

 {{< lc "0206" >}} 进阶，表头从哑节点变为了第 left-1 个节点。

## 解答

```python
class Solution:
    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
        dum=p=ListNode(next=head)
        for _ in range(left-1):
            p = p.next
        tail = p.next
        for _ in range(right-left):
            head = tail.next
            tail.next = head.next
            head.next = p.next
            p.next = head
        return dum.next
```
41 ms


