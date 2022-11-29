# 1171：从链表中删去总和值为零的连续节点（★★）


> **第 151 场周赛第 3 题**

## 题目

给你一个链表的头节点 head，请你编写代码，反复删去链表中由 总和 值为 0 的连续节点组成的序列，
直到不存在这样的序列为止。

删除完毕后，请你返回最终结果链表的头节点。

你可以返回任何满足题目要求的答案。

（注意，下面示例中的所有序列，都是对 ListNode 对象序列化的表示。）

提示：
- 给你的链表中可能有 1 到 1000 个节点。
- 对于链表中的每个节点，节点的值：-1000 <= node.val <= 1000.


示例 1：

    输入：head = [1,2,-3,3,1]
    输出：[3,1]
    提示：答案 [1,2,1] 也是正确的。

示例 2：

    输入：head = [1,2,3,-3,4]
    输出：[1,2,4]

示例 3：
    
    输入：head = [1,2,3,-3,-2]
    输出：[1]
 

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

