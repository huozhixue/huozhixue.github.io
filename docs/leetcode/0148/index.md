# 0148：排序链表（★）


> <u>**[力扣第 148 题](https://leetcode.cn/problems/sort-list/)**</u>

## 题目

<p>给你链表的头结点 <code>head</code> ，请将其按 <strong>升序</strong> 排列并返回 <strong>排序后的链表</strong> 。</p>

<ul>
</ul>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/14/sort_list_1.jpg" style="width: 450px;" />
<pre>
<b>输入：</b>head = [4,2,1,3]
<b>输出：</b>[1,2,3,4]
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/14/sort_list_2.jpg" style="width: 550px;" />
<pre>
<b>输入：</b>head = [-1,5,3,4,0]
<b>输出：</b>[-1,0,3,4,5]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<b>输入：</b>head = []
<b>输出：</b>[]
</pre>



<p><b>提示：</b></p>

<ul>
<li>链表中节点的数目在范围 <code>[0, 5 * 10<sup>4</sup>]</code> 内</li>
<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>
</ul>



<p><b>进阶：</b>你可以在 <code>O(n log n)</code> 时间复杂度和常数级空间复杂度下，对链表进行排序吗？</p>


**相似问题：**
- [0021：合并两个有序链表](/leetcode/0021)
- [0075：颜色分类](/leetcode/0075)
- [0147：对链表进行插入排序](/leetcode/0147)
- [2046：给按照绝对值排序的链表排序](/leetcode/2046)


## 分析

- 要求 O(n log n) 时间复杂度和常数级空间复杂度，想到归并排序
- 用快慢指针找到中点，归并部分即问题 {{< lc "0021" >}} 

## 解答

```python
class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        def merge(a, b):
            dum=p=ListNode()
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
        
        if not head or not head.next:
            return head
        slow=fast=head
        while fast.next and fast.next.next:
            slow,fast = slow.next,fast.next.next
        a, b = head, slow.next
        slow.next = None
        return merge(self.sortList(a), self.sortList(b))
```
283 ms

