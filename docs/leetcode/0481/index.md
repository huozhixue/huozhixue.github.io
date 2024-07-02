# 0481：神奇字符串（★）


> <u>**[力扣第 481 题](https://leetcode.cn/problems/magical-string/)**</u>

## 题目

<p>神奇字符串 <code>s</code> 仅由 <code>'1'</code> 和 <code>'2'</code> 组成，并需要遵守下面的规则：</p>

<ul>
<li>神奇字符串 s 的神奇之处在于，串联字符串中 <code>'1'</code> 和 <code>'2'</code> 的连续出现次数可以生成该字符串。</li>
</ul>

<p><code>s</code> 的前几个元素是 <code>s = "1221121221221121122……"</code> 。如果将 <code>s</code> 中连续的若干 <code>1</code> 和 <code>2</code> 进行分组，可以得到 <code>"1 22 11 2 1 22 1 22 11 2 11 22 ......"</code> 。每组中 <code>1</code> 或者 <code>2</code> 的出现次数分别是 <code>"1 2 2 1 1 2 1 2 2 1 2 2 ......"</code> 。上面的出现次数正是 <code>s</code> 自身。</p>

<p>给你一个整数 <code>n</code> ，返回在神奇字符串 <code>s</code> 的前 <code>n</code> 个数字中 <code>1</code> 的数目。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 6
<strong>输出：</strong>3
<strong>解释：</strong>神奇字符串 s 的前 6 个元素是 “<code>122112</code>”，它包含三个 1，因此返回 3 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
</ul>


## 分析

模拟即可，后面交替添加一组 1/2，个数即由 s 前面的元素决定。

## 解答


```python
class Solution:
    def magicalString(self, n: int) -> int:
        A, i = [1, 2, 2], 2
        while len(A)<n:
            A.extend([3-A[-1]]*A[i])
            i += 1
        return A[:n].count(1)
```
100 ms
