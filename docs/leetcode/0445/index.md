# 0445：两数相加 II（★）


> <u>**[力扣第 445 题](https://leetcode.cn/problems/add-two-numbers-ii/)**</u>

## 题目

<p>给你两个 <strong>非空 </strong>链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。</p>

<p>你可以假设除了数字 0 之外，这两个数字都不会以零开头。</p>



<p><strong>示例1：</strong></p>

<p><img alt="" src="https://pic.leetcode-cn.com/1626420025-fZfzMX-image.png" style="width: 302px; " /></p>

<pre>
<strong>输入：</strong>l1 = [7,2,4,3], l2 = [5,6,4]
<strong>输出：</strong>[7,8,0,7]
</pre>

<p><strong>示例2：</strong></p>

<pre>
<strong>输入：</strong>l1 = [2,4,3], l2 = [5,6,4]
<strong>输出：</strong>[8,0,7]
</pre>

<p><strong>示例3：</strong></p>

<pre>
<strong>输入：</strong>l1 = [0], l2 = [0]
<strong>输出：</strong>[0]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>链表的长度范围为<code> [1, 100]</code></li>
<li><code>0 &lt;= node.val &lt;= 9</code></li>
<li>输入数据保证链表代表的数字无前导 0</li>
</ul>



<p><strong>进阶：</strong>如果输入链表不能翻转该如何解决？</p>


**相似问题：**
- [0002：两数相加](/leetcode/0002)
- [1634：求两个多项式链表的和](/leetcode/1634)


## 分析

- 可以用 {{< lc "0206" >}} 反转链表，即转为问题 {{< lc "0002" >}}
- 更简单的是直接取出两个数相加
- 或着数太大时，取出两个数组，再模拟相加，类似 {{< lc "0415" >}} 

## 解答

```python
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        def get(l):
            a = 0
            while l:
                a = a*10+l.val
                l = l.next
            return a
        a = get(l1)+get(l2)
        dum = p = ListNode()
        for c in str(a):
            p.next = ListNode(int(c))
            p = p.next
        return dum.next
```

59 ms


