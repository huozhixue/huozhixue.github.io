# 0345：反转字符串中的元音字母


> <u>**[力扣第 345 题](https://leetcode.cn/problems/reverse-vowels-of-a-string/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> ，仅反转字符串中的所有元音字母，并返回结果字符串。</p>

<p>元音字母包括 <code>'a'</code>、<code>'e'</code>、<code>'i'</code>、<code>'o'</code>、<code>'u'</code>，且可能以大小写两种形式出现不止一次。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "hello"
<strong>输出：</strong>"holle"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "leetcode"
<strong>输出：</strong>"leotcede"</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 3 * 10<sup>5</sup></code></li>
<li><code>s</code> 由 <strong>可打印的 ASCII</strong> 字符组成</li>
</ul>


## 分析

{{< lc "0344" >}} 升级版，指针移动时跳过非元音字母即可。

## 解答

```python
def reverseVowels(self, s: str) -> str:
    s = list(s)
    i, j = 0, len(s) -1
    while i < j:
        if s[i].lower() not in 'aeiou':
            i += 1
        elif s[j].lower() not in 'aeiou':
            j -= 1
        else:
            s[i], s[j] = s[j], s[i]
            i += 1
            j -= 1
    return ''.join(s)
```
68 ms

