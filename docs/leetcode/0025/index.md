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


**相似问题：**
- [0024：两两交换链表中的节点](/leetcode/0024)
- [1721：交换链表中的节点（1386 分）](/leetcode/1721)
- [2074：反转偶数长度组的节点（1685 分）](/leetcode/2074)


## 分析

{{< lc "0024" >}} 升级版
- p 一开始指向哑节点
- 先判断 p 后面是否存在 k 个节点，可以让快指针从 p 开始走 k 步来判断
- 然后进行反转，可以参考 {{< lc "0092" >}}
- 更新 p 的位置，继续循环直到快指针到空

## 解答


```python
class Solution:
    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        dum=p=ListNode(next=head)
        while True:
            fast = p
            for _ in range(k):
                fast = fast.next
                if not fast:
                    return dum.next
            tail = p.next
            for _ in range(k-1):
                head = tail.next
                tail.next = head.next
                head.next = p.next
                p.next = head
            p = tail
```
50 ms
