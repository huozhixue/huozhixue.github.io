# 0639：解码方法 II（★★）


> <u>**[力扣第 639 题](https://leetcode.cn/problems/decode-ways-ii/)**</u>

## 题目

<p>一条包含字母 <code>A-Z</code> 的消息通过以下的方式进行了 <strong>编码</strong> ：</p>

<pre>
'A' -&gt; "1"
'B' -&gt; "2"
...
'Z' -&gt; "26"</pre>

<p>要 <strong>解码</strong> 一条已编码的消息，所有的数字都必须分组，然后按原来的编码方案反向映射回字母（可能存在多种方式）。例如，<code>"11106"</code> 可以映射为：</p>

<ul>
<li><code>"AAJF"</code> 对应分组 <code>(1 1 10 6)</code></li>
<li><code>"KJF"</code> 对应分组 <code>(11 10 6)</code></li>
</ul>

<p>注意，像 <code>(1 11 06)</code> 这样的分组是无效的，因为 <code>"06"</code> 不可以映射为 <code>'F'</code> ，因为 <code>"6"</code> 与 <code>"06"</code> 不同。</p>

<p><strong>除了</strong> 上面描述的数字字母映射方案，编码消息中可能包含 <code>'*'</code> 字符，可以表示从 <code>'1'</code> 到 <code>'9'</code> 的任一数字（不包括 <code>'0'</code>）。例如，编码字符串 <code>"1*"</code> 可以表示 <code>"11"</code>、<code>"12"</code>、<code>"13"</code>、<code>"14"</code>、<code>"15"</code>、<code>"16"</code>、<code>"17"</code>、<code>"18"</code> 或 <code>"19"</code> 中的任意一条消息。对 <code>"1*"</code> 进行解码，相当于解码该字符串可以表示的任何编码消息。</p>

<p>给你一个字符串 <code>s</code> ，由数字和 <code>'*'</code> 字符组成，返回 <strong>解码</strong> 该字符串的方法 <strong>数目</strong> 。</p>

<p>由于答案数目可能非常大，返回 <code>10<sup>9</sup> + 7</code> 的 <b>模</b> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "*"
<strong>输出：</strong>9
<strong>解释：</strong>这一条编码消息可以表示 "1"、"2"、"3"、"4"、"5"、"6"、"7"、"8" 或 "9" 中的任意一条。
可以分别解码成字符串 "A"、"B"、"C"、"D"、"E"、"F"、"G"、"H" 和 "I" 。
因此，"*" 总共有 9 种解码方法。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "1*"
<strong>输出：</strong>18
<strong>解释：</strong>这一条编码消息可以表示 "11"、"12"、"13"、"14"、"15"、"16"、"17"、"18" 或 "19" 中的任意一条。
每种消息都可以由 2 种方法解码（例如，"11" 可以解码成 "AA" 或 "K"）。
因此，"1*" 共有 9 * 2 = 18 种解码方法。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "2*"
<strong>输出：</strong>15
<strong>解释：</strong>这一条编码消息可以表示 "21"、"22"、"23"、"24"、"25"、"26"、"27"、"28" 或 "29" 中的任意一条。
"21"、"22"、"23"、"24"、"25" 和 "26" 由 2 种解码方法，但 "27"、"28" 和 "29" 仅有 1 种解码方法。
因此，"2*" 共有 (6 * 2) + (3 * 1) = 12 + 3 = 15 种解码方法。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
<li><code>s[i]</code> 是 <code>0 - 9</code> 中的一位数字或字符 <code>'*'</code></li>
</ul>


**相似问题：**
- [0091：解码方法](/leetcode/0091)
- [1977：划分数字的方案数（2817 分）](/leetcode/1977)
- [2147：分隔长廊的方案数（1914 分）](/leetcode/2147)


## 分析

- 和 {{< lc "0091" >}} 的区别在于存在 '*' 字符，递推式的系数会不同
- 注意到包含 '*' 的单/双字符，所对应的系数是固定的，比如 ' **' 必然对应系数 15
- 因此考虑用哈希表保存对应系数，再递推即可

## 解答

```python
class Solution:
    def numDecodings(self, s: str) -> int:
        mod = 10**9+7
        d1 = {'*': 9, '0': 0}
        d2 = {'**': 15, '1*':9, '2*':6}
        for i in range(10):
            d2['*'+str(i)] = 2 if i<=6 else 1
        for i in range(10, 27):
            d2[str(i)] = 1
        a, b = 0, 1
        for i in range(len(s)):
            a,b = b,b*d1.get(s[i],1)+a*d2.get(s[i-1:i+1],0)
            b %= mod
        return b
```
243 ms

