# 0761：特殊的二进制序列（2292 分）


> <u>**[力扣第 761 题](https://leetcode.cn/problems/special-binary-string/)**</u>

## 题目

<p>特殊的二进制序列是具有以下两个性质的二进制序列：</p>

<ul>
<li>0 的数量与 1 的数量相等。</li>
<li>二进制序列的每一个前缀码中 1 的数量要大于等于 0 的数量。</li>
</ul>

<p>给定一个特殊的二进制序列 <code>S</code>，以字符串形式表示。定义一个<em>操作 </em>为首先选择 <code>S</code> 的两个连续且非空的特殊的子串，然后将它们交换。（两个子串为连续的当且仅当第一个子串的最后一个字符恰好为第二个子串的第一个字符的前一个字符。)</p>

<p>在任意次数的操作之后，交换后的字符串按照字典序排列的最大的结果是什么？</p>

<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> S = &quot;11011000&quot;
<strong>输出:</strong> &quot;11100100&quot;
<strong>解释:</strong>
将子串 &quot;10&quot; （在S[1]出现） 和 &quot;1100&quot; （在S[3]出现）进行交换。
这是在进行若干次操作后按字典序排列最大的结果。
</pre>

<p><strong>说明:</strong></p>

<ol>
<li><code>S</code> 的长度不超过 <code>50</code>。</li>
<li><code>S</code> 保证为一个满足上述定义的<em>特殊 </em>的二进制序列。</li>
</ol>


**相似问题：**
- [0678：有效的括号字符串](/leetcode/0678)
- [2533：好二进制字符串的数量](/leetcode/2533)


## 分析


- 先将 S 分割成尽量多的特殊子串（可以证明是恰好切割）
- 每个子串转为递归子问题，最后再将所有子串的结果排序拼接即可
- 将 1 看作左括号，0 看作右括号，更容易理解这个分割
- 可以用栈模拟递归过程

## 解答


```python
class Solution:
    def makeLargestSpecial(self, s: str) -> str:
        sk = [[]]
        for c in s:
            if c=='1':
                sk.append([])
            else:
                x = ''.join(sorted(sk.pop())[::-1])
                sk[-1].append('1'+x+'0')
        return ''.join(sorted(sk.pop())[::-1])
```
0 ms
