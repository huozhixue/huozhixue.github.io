# 0394：字符串解码（★）


> <u>**[力扣第 394 题](https://leetcode.cn/problems/decode-string/)**</u>

## 题目

<p>给定一个经过编码的字符串，返回它解码后的字符串。</p>

<p>编码规则为: <code>k[encoded_string]</code>，表示其中方括号内部的 <code>encoded_string</code> 正好重复 <code>k</code> 次。注意 <code>k</code> 保证为正整数。</p>

<p>你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。</p>

<p>此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 <code>k</code> ，例如不会出现像 <code>3a</code> 或 <code>2[4]</code> 的输入。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "3[a]2[bc]"
<strong>输出：</strong>"aaabcbc"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "3[a2[c]]"
<strong>输出：</strong>"accaccacc"
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "2[abc]3[cd]ef"
<strong>输出：</strong>"abcabccdcdcdef"
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>s = "abc3[cd]xyz"
<strong>输出：</strong>"abccdcdcdxyz"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 30</code></li>
<li><meta charset="UTF-8" /><code>s</code> 由小写英文字母、数字和方括号<meta charset="UTF-8" /> <code>'[]'</code> 组成</li>
<li><code>s</code> 保证是一个 <strong>有效</strong> 的输入。</li>
<li><code>s</code> 中所有整数的取值范围为<meta charset="UTF-8" /> <code>[1, 300]</code> </li>
</ul>


**相似问题：**
- [0471：编码最短长度的字符串](/leetcode/0471)
- [0726：原子的数量](/leetcode/0726)
- [1087：花括号展开（1480 分）](/leetcode/1087)


## 分析

用栈模拟递归即可。

## 解答

```python
class Solution:
    def decodeString(self, s: str) -> str:
        sk = [[]]
        for x,op in re.findall('(\d+|[a-z]+)|([\[\]])',s):
            if x:
                sk[-1].append(x)
            elif op=='[':
                sk.append([])
            else:
                a = ''.join(sk.pop())
                sk[-1][-1] = a*int(sk[-1][-1])
        return ''.join(sk[0])
```
32 ms


