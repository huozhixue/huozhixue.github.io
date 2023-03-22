# 0021：合并两个有序链表


> <u>**[力扣第 21 题](https://leetcode.cn/problems/merge-two-sorted-lists/)**</u>

## 题目

<p>将两个升序链表合并为一个新的 <strong>升序</strong> 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 </p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg" style="width: 662px; height: 302px;" />
<pre>
<strong>输入：</strong>l1 = [1,2,4], l2 = [1,3,4]
<strong>输出：</strong>[1,1,2,3,4,4]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>l1 = [], l2 = []
<strong>输出：</strong>[]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>l1 = [], l2 = [0]
<strong>输出：</strong>[0]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>两个链表的节点数目范围是 <code>[0, 50]</code></li>
<li><code>-100 <= Node.val <= 100</code></li>
<li><code>l1</code> 和 <code>l2</code> 均按 <strong>非递减顺序</strong> 排列</li>
</ul>


## 分析

与归并两个有序数组的思路一样，用双指针即可。

区别在于这里是拼接，所以不需要造一个新链表，只需要建一个哑结点即可。

## 解答

```python
def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    dummy = p = ListNode()
    while list1 and list2:
        if list1.val <= list2.val:
            p.next = list1
            list1 = list1.next
        else:
            p.next = list2
            list2 = list2.next
        p = p.next
    p.next = list1 if list1 else list2
    return dummy.next
```
36 ms
