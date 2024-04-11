# 0023：合并 K 个升序链表（★★）


> <u>**[力扣第 23 题](https://leetcode.cn/problems/merge-k-sorted-lists/)**</u>

## 题目

<p>给你一个链表数组，每个链表都已经按升序排列。</p>

<p>请你将所有链表合并到一个升序链表中，返回合并后的链表。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>lists = [[1,4,5],[1,3,4],[2,6]]
<strong>输出：</strong>[1,1,2,3,4,4,5,6]
<strong>解释：</strong>链表数组如下：
[
1-&gt;4-&gt;5,
1-&gt;3-&gt;4,
2-&gt;6
]
将它们合并到一个有序链表中得到。
1-&gt;1-&gt;2-&gt;3-&gt;4-&gt;4-&gt;5-&gt;6
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>lists = []
<strong>输出：</strong>[]
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>lists = [[]]
<strong>输出：</strong>[]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>k == lists.length</code></li>
<li><code>0 &lt;= k &lt;= 10^4</code></li>
<li><code>0 &lt;= lists[i].length &lt;= 500</code></li>
<li><code>-10^4 &lt;= lists[i][j] &lt;= 10^4</code></li>
<li><code>lists[i]</code> 按 <strong>升序</strong> 排列</li>
<li><code>lists[i].length</code> 的总和不超过 <code>10^4</code></li>
</ul>


## 分析

### #1

本题类似于归并排序，可以用分治法，归并过程即 {{< lc "0021" >}}

```python
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        n = len(lists)
        if n<2:
            return lists[0] if lists else None
        a, b = self.mergeKLists(lists[:n//2]), self.mergeKLists(lists[n//2:])
        dum = p = ListNode()
        while a and b:
            if a.val<=b.val:
                p.next = a
                a = a.next
            else:
                p.next = b
                b = b.next
            p = p.next
        p.next = a or b
        return dum.next
```

53 ms

### #2

还可以用堆进行多路归并，堆里维护每个链表的头节点值和链表下标即可。
## 解答

```python
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        pq = sorted((a.val,i) for i,a in enumerate(lists) if a)
        dum = p = ListNode()
        while pq:
            _,i = heappop(pq)
            p.next = lists[i]
            p = p.next
            lists[i] = lists[i].next
            if lists[i] :
                heappush(pq,(lists[i] .val,i))
        return dum.next
```
55 ms

