# 0025：K 个一组翻转链表（★★）


> <u>**[力扣第 25 题](https://leetcode.cn/problems/reverse-nodes-in-k-group/)**</u>

## 题目

<p>给你链表的头节点 <code>head</code> ，每 <code>k</code><em> </em>个节点一组进行翻转，请你返回修改后的链表。</p>

<p><code>k</code> 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 <code>k</code><em> </em>的整数倍，那么请将最后剩余的节点保持原有顺序。</p>

<p>你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/reverse_ex1.jpg" style="width: 542px; height: 222px;" />
<pre>
<strong>输入：</strong>head = [1,2,3,4,5], k = 2
<strong>输出：</strong>[2,1,4,3,5]
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/reverse_ex2.jpg" style="width: 542px; height: 222px;" /></p>

<pre>
<strong>输入：</strong>head = [1,2,3,4,5], k = 3
<strong>输出：</strong>[3,2,1,4,5]
</pre>


<strong>提示：</strong>

<ul>
<li>链表中的节点数目为 <code>n</code></li>
<li><code>1 &lt;= k &lt;= n &lt;= 5000</code></li>
<li><code>0 &lt;= Node.val &lt;= 1000</code></li>
</ul>



<p><strong>进阶：</strong>你可以设计一个只用 <code>O(1)</code> 额外内存空间的算法解决此问题吗？</p>

<ul>
</ul>


## 分析

{{< lc "0024" >}} 的升级版。
- 链表前新建一个哑节点，指针 p 初始指向哑节点
- 当 p 后面存在 k 个节点时，将这一段翻转
- 将 p 移动 k 步准备下一轮翻转，如此循环即可

反转某段链表的方法可以参考 {{< lc "0092" >}}。

## 解答

```python
class Solution:
    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        dummy = p = ListNode(next=head)
        while True:
            fast = p
            for _ in range(k):
                fast = fast.next
                if not fast:
                    return dummy.next
            tail = p.next
            for _ in range(k-1):
                tmp = tail.next
                tail.next = tmp.next
                tmp.next = p.next
                p.next = tmp
            p = tail
```
64 ms

## *附加

链表题最简单粗暴的做法是转为数组，处理后再转回来。

```python
class Solution:
    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        A = []
        while head:
            A.append(head.val)
            head = head.next
        n = len(A)
        for i in range(k,n+1,k):
            A[i-k:i] = A[i-k:i][::-1]
        dummy = p = ListNode()
        for a in A:
            p.next = ListNode(a)
            p = p.next
        return dummy.next
```
56 ms
