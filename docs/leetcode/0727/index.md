# 0727：最小窗口子序列（★★）


> <u>**[力扣第 727 题](https://leetcode.cn/problems/minimum-window-subsequence/)**</u>

## 题目

<p>给定字符串 <code>S</code> and <code>T</code>，找出 <code>S</code> 中最短的（连续）<strong>子串</strong> <code>W</code> ，使得 <code>T</code> 是 <code>W</code> 的 <strong>子序列</strong> 。</p>

<p>如果 <code>S</code> 中没有窗口可以包含 <code>T</code> 中的所有字符，返回空字符串 <code>&quot;&quot;</code>。如果有不止一个最短长度的窗口，返回开始位置最靠左的那个。</p>

<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>
S = &quot;abcdebdde&quot;, T = &quot;bde&quot;
<strong>输出：</strong>&quot;bcde&quot;
<strong>解释：</strong>
&quot;bcde&quot; 是答案，因为它在相同长度的字符串 &quot;bdde&quot; 出现之前。
&quot;deb&quot; 不是一个更短的答案，因为在窗口中必须按顺序出现 T 中的元素。</pre>



<p><strong>注：</strong></p>

<ul>
<li>所有输入的字符串都只包含小写字母。All the strings in the input will only contain lowercase letters.</li>
<li><code>S</code> 长度的范围为 <code>[1, 20000]</code>。</li>
<li><code>T</code> 长度的范围为 <code>[1, 100]</code>。</li>
</ul>




## 分析

- 先预处理出 s1 每个位置 i 的下一个字符 c 的位置
- 遍历 s1 起点 i，依次找 s2 每个字符的下一个位置，即可找到 i 开头的最短子串

## 解答

```python
class Solution:
    def minWindow(self, s1: str, s2: str) -> str:
        m, n = len(s1), len(s2)
        A = [ord(c)-ord('a') for c in s1]
        B = [ord(c)-ord('a') for c in s2]
        f = [[m]*26 for _ in range(n+1)]
        for i in range(n-1,-1,-1):
            f[i] = f[i+1][i]
            f[i][A[i]] = i
        res = (0, inf)
        for i in range(m-n+1):
            if A[i]==B[0]:
                j = i
                for c in B[1:]:
                    j = f[j+1][c]
                    if j==m:
                        break
                else:
                    if j-i<res[1]-res[0]:
                        res = (i,j)
        return s1[res[0]:res[1]+1] if res[1]<inf else ''
```

