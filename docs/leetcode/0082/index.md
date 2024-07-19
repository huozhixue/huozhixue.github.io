# 0082：删除排序链表中的重复元素 II（★）


> <u>**[力扣第 82 题](https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/)**</u>

## 题目

<p>给定一个已排序的链表的头 <code>head</code> ， <em>删除原始链表中所有重复数字的节点，只留下不同的数字</em> 。返回 <em>已排序的链表</em> 。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/04/linkedlist1.jpg" style="height: 142px; width: 500px;" />
<pre>
<strong>输入：</strong>head = [1,2,3,3,4,4,5]
<strong>输出：</strong>[1,2,5]
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/04/linkedlist2.jpg" style="height: 164px; width: 400px;" />
<pre>
<strong>输入：</strong>head = [1,1,1,2,3]
<strong>输出：</strong>[2,3]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>链表中节点数目在范围 <code>[0, 300]</code> 内</li>
<li><code>-100 &lt;= Node.val &lt;= 100</code></li>
<li>题目数据保证链表已经按升序 <strong>排列</strong></li>
</ul>


**相似问题：**
- [0083：删除排序链表中的重复元素](/leetcode/0083)
- [1836：从未排序的链表中移除重复元素](/leetcode/1836)


## 分析

{{< lc "0083" >}}  进阶版，后面两个节点值相等时，跳过所有等于该值的节点即可。

## 解答

```python
class Solution:
    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dum = p = ListNode(next=head)
        while p.next and p.next.next:
            if p.next.val==p.next.next.val:
                x = p.next.val
                while p.next and p.next.val==x:
                    p.next = p.next.next
            else:
                p = p.next
        return dum.next
```
36 ms
