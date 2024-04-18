# 0061：旋转链表（★）


> <u>**[力扣第 61 题](https://leetcode.cn/problems/rotate-list/)**</u>

## 题目

<p>给你一个链表的头节点 <code>head</code> ，旋转链表，将链表每个节点向右移动 <code>k</code><em> </em>个位置。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/rotate1.jpg" style="width: 450px;" />
<pre>
<strong>输入：</strong>head = [1,2,3,4,5], k = 2
<strong>输出：</strong>[4,5,1,2,3]
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/roate2.jpg" style="width: 305px; height: 350px;" />
<pre>
<strong>输入：</strong>head = [0,1,2], k = 4
<strong>输出：</strong>[2,0,1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>链表中节点的数目在范围 <code>[0, 500]</code> 内</li>
<li><code>-100 &lt;= Node.val &lt;= 100</code></li>
<li><code>0 &lt;= k &lt;= 2 * 10<sup>9</sup></code></li>
</ul>


## 分析 

- 先找到表尾 tail 并计算出链表长度 n
- 找到新表尾 p，是第 n - k % n 个元素
- 从 p 断开，将前面部分接到 tail 后面即可

## 解答
```python
class Solution:
    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        if not head:
            return None
        dum = ListNode(next=head)
        tail,n = dum,0
        while tail.next:
            tail = tail.next
            n += 1
        p = dum
        for _ in range(n-k%n):
            p = p.next
        tail.next = dum.next
        dum.next = p.next
        p.next = None
        return dum.next
```

33 ms

