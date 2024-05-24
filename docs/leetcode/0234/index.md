# 0234：回文链表


> <u>**[力扣第 234 题](https://leetcode.cn/problems/palindrome-linked-list/)**</u>

## 题目

<p>给你一个单链表的头节点 <code>head</code> ，请你判断该链表是否为回文链表。如果是，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/03/pal1linked-list.jpg" style="width: 422px; height: 62px;" />
<pre>
<strong>输入：</strong>head = [1,2,2,1]
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/03/pal2linked-list.jpg" style="width: 182px; height: 62px;" />
<pre>
<strong>输入：</strong>head = [1,2]
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>链表中节点数目在范围<code>[1, 10<sup>5</sup>]</code> 内</li>
<li><code>0 &lt;= Node.val &lt;= 9</code></li>
</ul>



<p><strong>进阶：</strong>你能否用 <code>O(n)</code> 时间复杂度和 <code>O(1)</code> 空间复杂度解决此题？</p>


## 分析

### #1

用额外空间的话很简单。

```python
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        A,p = [],head
        while p:
            A.append(p.val)
            p=p.next
        return A[::-1]==A
```

282 ms

### #2

不用额外空间，类似 {{< lc "0143" >}}:
- 先用快慢节点找到中点位置，截断为两部分
- 将后半部分链表反转后和前半部分对比即可

## 解答

```python
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        def reverse(head):
            tail = head
            while tail and tail.next:
                tmp = tail.next
                tail.next = tmp.next
                tmp.next = head
                head = tmp
            return head

        slow = fast = ListNode(next=head)
        while fast and fast.next:
            slow, fast = slow.next, fast.next.next
        q = slow.next
        slow.next = None
        p, q = head, reverse(q)
        while q:
            if p.val!=q.val:
                return False
            p,q = p.next,q.next
        return True
```
275 ms
