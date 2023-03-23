# 0267：回文排列 II（★）


> <u>**[力扣第 267 题](https://leetcode.cn/problems/palindrome-permutation-ii/)**</u>

## 题目

<p>给定一个字符串 <code>s</code> ，返回 <em>其重新排列组合后可能构成的所有回文字符串，并去除重复的组合</em> 。</p>

<p>你可以按 <strong>任意顺序</strong> 返回答案。如果 <code>s</code> 不能形成任何回文排列时，则返回一个空列表。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入: </strong>s = <code>"aabb"</code>
<strong>输出: </strong><code>["abba", "baab"]</code></pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入: </strong>s = <code>"abc"</code>
<strong>输出: </strong><code>[]</code>
</pre>



<p><strong>提示：</strong></p>

<p><meta charset="UTF-8" /></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 16</code></li>
<li><code>s</code> 仅由小写英文字母组成</li>
</ul>


## 分析

{{< lc "0266" >}} 升级版。

回文字符串的前一半和后一半对称，中间最多一个单独的字符。

因此，先通过计数器，拿到前一半和可能的中间字符，遍历前一半的所有排列并去重即可。


## 解答

```python
def generatePalindromes(self, s: str) -> List[str]:
    half, mid = '', ''
    for c, freq in Counter(s).items():
        half += c*(freq//2)
        mid += c*(freq%2)
    if len(mid)>1:
        return []
    return [''.join(sub)+mid+''.join(sub)[::-1] for sub in set(permutations(half))]
```
52 ms

