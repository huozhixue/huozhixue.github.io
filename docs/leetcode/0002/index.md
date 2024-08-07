# 0002：两数相加（★）


> <u>**[力扣第 2 题](https://leetcode.cn/problems/add-two-numbers/)**</u>

## 题目

<p>给你两个 <strong>非空</strong> 的链表，表示两个非负的整数。它们每位数字都是按照 <strong>逆序</strong> 的方式存储的，并且每个节点只能存储 <strong>一位</strong> 数字。</p>

<p>请你将两个数相加，并以相同形式返回一个表示和的链表。</p>

<p>你可以假设除了数字 0 之外，这两个数都不会以 0 开头。</p>



<p><strong class="example">示例 1：</strong></p>
<img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/01/02/addtwonumber1.jpg" style="width: 483px; height: 342px;" />
<pre>
<strong>输入：</strong>l1 = [2,4,3], l2 = [5,6,4]
<strong>输出：</strong>[7,0,8]
<strong>解释：</strong>342 + 465 = 807.
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>l1 = [0], l2 = [0]
<strong>输出：</strong>[0]
</pre>

<p><strong class="example">示例 3：</strong></p>

<pre>
<strong>输入：</strong>l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
<strong>输出：</strong>[8,9,9,9,0,0,0,1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>每个链表中的节点数在范围 <code>[1, 100]</code> 内</li>
<li><code>0 &lt;= Node.val &lt;= 9</code></li>
<li>题目数据保证列表表示的数字不含前导零</li>
</ul>


**相似问题：**
- [0043：字符串相乘](/leetcode/0043)
- [0067：二进制求和](/leetcode/0067)
- [0371：两整数之和](/leetcode/0371)
- [0415：字符串相加](/leetcode/0415)
- [0445：两数相加 II](/leetcode/0445)
- [0989：数组形式的整数加法（1234 分）](/leetcode/0989)
- [1634：求两个多项式链表的和](/leetcode/1634)
- [2816：翻倍以链表形式表示的数字（1393 分）](/leetcode/2816)


## 分析

- 模拟加法，先算低位，再结合进位算高位。
- 注意边界条件，两个链表长度可能不一样，最后还可能再进一位

## 解答

```python
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = p = ListNode()
        c = 0
        while l1 or l2 or c:
            a = l1.val if l1 else 0
            b = l2.val if l2 else 0
            c,s = divmod(a+b+c,10)
            p.next = ListNode(s)
            p = p.next
            l1 = l1 and l1.next
            l2 = l2 and l2.next
        return dummy.next
```
48 ms




