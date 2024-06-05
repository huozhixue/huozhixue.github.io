# 1171：从链表中删去总和值为零的连续节点（1782 分）


> <u>**[力扣第 151 场周赛第 3 题](https://leetcode.cn/problems/remove-zero-sum-consecutive-nodes-from-linked-list/)**</u>

## 题目

<p>给你一个链表的头节点 <code>head</code>，请你编写代码，反复删去链表中由 <strong>总和</strong> 值为 <code>0</code> 的连续节点组成的序列，直到不存在这样的序列为止。</p>

<p>删除完毕后，请你返回最终结果链表的头节点。</p>



<p>你可以返回任何满足题目要求的答案。</p>

<p>（注意，下面示例中的所有序列，都是对 <code>ListNode</code> 对象序列化的表示。）</p>

<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>head = [1,2,-3,3,1]
<strong>输出：</strong>[3,1]
<strong>提示：</strong>答案 [1,2,1] 也是正确的。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>head = [1,2,3,-3,4]
<strong>输出：</strong>[1,2,4]
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>head = [1,2,3,-3,-2]
<strong>输出：</strong>[1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>给你的链表中可能有 <code>1</code> 到 <code>1000</code> 个节点。</li>
<li>对于链表中的每个节点，节点的值：<code>-1000 &lt;= node.val &lt;= 1000</code>.</li>
</ul>


## 分析

### #1

区间和为 0，容易想到转为找相等的前缀和。

遍历时，用哈希表 d 维护 {前缀和: 对应的节点}，若节点 p 处的前缀和 s 出现过，就将节点 d[s] 到节点 p 的部分删去即可。

> 注意删去节点时，要同步将哈希表中对应的前缀和也删去。

```python
def removeZeroSumSublists(self, head: ListNode) -> ListNode:
    dummy = p = ListNode(next=head)
    d, s = {}, 0
    while p:
        s += p.val
        if s in d:
            q, _s = d[s].next, s
            while q != p:
                _s += q.val
                del d[_s]
                q = q.next
            d[s].next = p.next
        else:
            d[s] = p
        p = p.next
    return dummy.next
```
40 ms

### #2

有个巧妙的想法是先一趟得到哈希表 d，保存 {前缀和: 对应的最后一个节点}。

然后再遍历节点 p，得到对应前缀和 s ，将节点 p 到节点 d[s] 的部分删去即可。

## 解答

```python
def removeZeroSumSublists(self, head: ListNode) -> ListNode:
    dummy = p = ListNode(next=head)
    d, s = {}, 0
    while p:
        s += p.val
        d[s] = p
        p = p.next
    p, s = dummy, 0
    while p:
        s += p.val
        p.next = d[s].next
        p = p.next
    return dummy.next
```
40 ms

