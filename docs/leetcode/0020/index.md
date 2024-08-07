# 0020：有效的括号


> <u>**[力扣第 20 题](https://leetcode.cn/problems/valid-parentheses/)**</u>

## 题目

<p>给定一个只包括 <code>'('</code>，<code>')'</code>，<code>'{'</code>，<code>'}'</code>，<code>'['</code>，<code>']'</code> 的字符串 <code>s</code> ，判断字符串是否有效。</p>

<p>有效字符串需满足：</p>

<ol>
<li>左括号必须用相同类型的右括号闭合。</li>
<li>左括号必须以正确的顺序闭合。</li>
<li>每个右括号都有一个对应的相同类型的左括号。</li>
</ol>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "()"
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "()[]{}"
<strong>输出：</strong>true
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "(]"
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>
<li><code>s</code> 仅由括号 <code>'()[]{}'</code> 组成</li>
</ul>


**相似问题：**
- [0022：括号生成](/leetcode/0022)
- [0032：最长有效括号](/leetcode/0032)
- [0301：删除无效的括号](/leetcode/0301)
- [1003：检查替换后的词是否有效（1426 分）](/leetcode/1003)
- [2116：判断一个括号字符串是否有效（2037 分）](/leetcode/2116)
- [2337：移动片段得到字符串（1693 分）](/leetcode/2337)


## 分析

- 栈的典型应用，左括号入栈，右括号出栈
- 若栈顶不匹配或最终栈不空即返回 False

## 解答

```python
class Solution:
    def isValid(self, s: str) -> bool:
        d = dict(zip(')}]','({['))
        sk = []
        for c in s:
            if c not in d:
                sk.append(c)
            elif not sk or sk.pop()!=d[c]:
                return False
        return not sk
```
时间 O(N)，32 ms
