# 0214：最短回文串（★★）


> <u>**[力扣第 214 题](https://leetcode.cn/problems/shortest-palindrome/)**</u>

## 题目

<p>给定一个字符串 <em><strong>s</strong></em>，你可以通过在字符串前面添加字符将其转换为<span data-keyword="palindrome-string">回文串</span>。找到并返回可以用这种方式转换的最短回文串。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "aacecaaa"
<strong>输出：</strong>"aaacecaaa"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "abcd"
<strong>输出：</strong>"dcbabcd"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= s.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>s</code> 仅由小写英文字母组成</li>
</ul>


**相似问题：**
- [0005：最长回文子串](/leetcode/0005)
- [0028：找出字符串中第一个匹配项的下标](/leetcode/0028)
- [0336：回文对](/leetcode/0336)
- [2430：对字母串可执行的最大删除数（2101 分）](/leetcode/2430)


## 分析

- 问题等价于找到 s 最长的前缀回文子串 s[:i]，然后在前面添加 s[i:] 的反转即可
- 与回文相关，首先想到 Manacher 算法，O(N) 时间完成
## 解答

```python
class Solution:
    def shortestPalindrome(self, s: str) -> str:
        def manacher(s):
            n = len(s)
            A, B = [], [1]*n
            mid, r = 0, 0
            for i in range(n):
                a = min(A[2*mid-i], r-i) if r>i else 0
                while i-a and i+a<n-1 and s[i-a-1]==s[i+a+1]:
                    a += 1
                    B[i+a] = max(B[i+a],a*2+1)
                A.append(a)
                if i+a>r:
                    mid, r = i, i+a
            return B       # B[i]:i结尾的最大回文子串长度（奇数）
        B = manacher('#'+'#'.join(s)+'#')
        i = max(i for i,b in enumerate(B) if b==i+1)//2
        return s[i:][::-1]+s
```
171 ms



