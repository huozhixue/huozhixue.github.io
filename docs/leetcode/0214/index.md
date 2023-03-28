# 0214：最短回文串（★★）


> <u>**[力扣第 214 题](https://leetcode.cn/problems/shortest-palindrome/)**</u>

## 题目

<p>给定一个字符串 <em><strong>s</strong></em>，你可以通过在字符串前面添加字符将其转换为回文串。找到并返回可以用这种方式转换的最短回文串。</p>



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
<li><code>0 <= s.length <= 5 * 10<sup>4</sup></code></li>
<li><code>s</code> 仅由小写英文字母组成</li>
</ul>


## 分析

观察可知问题等价于找到 s 最长的前缀回文子串 s[:i]，然后在前面添加 s[i:][::-1] 即可。

与回文相关，首先想到 Manacher 算法。Manacher 算法能在 O(N) 时间内得到每个位置 i 的臂长，
那么找最后一个 i 满足其臂长等于 i 即可。

## 解答

```python
def shortestPalindrome(self, s: str) -> str:
    def expand(l, r):
        while l > 0 and r < len(ss) - 1 and ss[l - 1] == ss[r + 1]:
            l -= 1
            r += 1
        return (r - l) // 2

    pos, ss = 0, '#' + '#'.join(s) + '#'
    A, center, right = [], 0, 0
    for i in range(len(ss)//2+1):
        min_arm = min(A[2*center-i], right-i) if right > i else 0
        cur_arm = expand(i - min_arm, i + min_arm)
        A.append(cur_arm)
        if i + cur_arm > right:
            center, right = i, i + cur_arm
        if cur_arm == i:
            pos = i
    return s[pos:][::-1] + s
```
时间复杂度 O(N)，64 ms

## *附加

还有个很巧妙的 KMP 解法。

若 s[:i] 是回文子串，那么 s[::-1][-i:] 也是回文子串，ss[::-1][-i:] 和 s[:i] 相同。

因此将 s 作为模式串在 s[::-1] 中用 KMP 匹配，最终匹配到的 s[:j] 即为最长的前缀回文子串。

```python
def shortestPalindrome(self, s: str) -> str:
    nxt, j, n = [-1], -1, len(s)
    for i in range(n):
        while j >= 0 and s[i] != s[j]:
            j = nxt[j]
        j += 1
        nxt.append(j)
    t, j = s[::-1], 0
    for i in range(n):
        while j >= 0 and t[i] != s[j]:
            j = nxt[j]
        j += 1
    return s[j:][::-1] + s
```
48 ms


