# 0076：最小覆盖子串（★★）


> <u>**[力扣第 76 题](https://leetcode.cn/problems/minimum-window-substring/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> 、一个字符串 <code>t</code> 。返回 <code>s</code> 中涵盖 <code>t</code> 所有字符的最小子串。如果 <code>s</code> 中不存在涵盖 <code>t</code> 所有字符的子串，则返回空字符串 <code>""</code> 。</p>



<p><strong>注意：</strong></p>

<ul>
<li>对于 <code>t</code> 中重复字符，我们寻找的子字符串中该字符数量必须不少于 <code>t</code> 中该字符数量。</li>
<li>如果 <code>s</code> 中存在这样的子串，我们保证它是唯一的答案。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "ADOBECODEBANC", t = "ABC"
<strong>输出：</strong>"BANC"
<strong>解释：</strong>最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "a", t = "a"
<strong>输出：</strong>"a"
<strong>解释：</strong>整个字符串 s 是最小覆盖子串。
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> s = "a", t = "aa"
<strong>输出:</strong> ""
<strong>解释:</strong> t 中两个字符 'a' 均应包含在 s 的子串中，
因此没有符合条件的子字符串，返回空字符串。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code><sup>m == s.length</sup></code></li>
<li><code><sup>n == t.length</sup></code></li>
<li><code>1 &lt;= m, n &lt;= 10<sup>5</sup></code></li>
<li><code>s</code> 和 <code>t</code> 由英文字母组成</li>
</ul>


<strong>进阶：</strong>你能设计一个在 <code>o(m+n)</code> 时间内解决此问题的算法吗？

## 分析

### #1

{{< lc "0209" >}} 升级版，遍历每个位置 j 作为结尾，找符合条件的最短子串 [i, j] 即可。

发现遍历中 i 必然是不动或向右移的，因此是滑动窗口，可以用 Counter 来判断是否符合。

```python
def minWindow(self, s: str, t: str) -> str:
    ct, ct2 = Counter(t), Counter()
    res, i = s+' ',  0
    for j, char in enumerate(s):
        ct2[char] += 1
        while not ct-ct2:
            res = res if len(res)<=(j-i+1) else s[i:j+1] 
            ct2[s[i]] -= 1
            i += 1
    return res if len(res) <= len(s) else ''
```
1040 ms

### #2

显然每次用 ct-ct2 来判断是否符合比较耗时。
有个巧妙的方法是新加一个变量 valid 维护有用字符的个数。
- 移动 j 时，如果 ct2[s[j]] < ct[s[j]]，s[j] 就是有用的，cnt 增 1
- 移动 i 时，如果 ct2[s[i]] > ct[s[i]]，s[i] 就是无用的，可以移动

## 解答

```python
def minWindow(self, s: str, t: str) -> str:
    ct, ct2 = Counter(t), Counter()
    res, i, valid = s+' ',  0, 0
    for j, char in enumerate(s):
        if ct2[char] < ct[char]:
            valid += 1
        ct2[char] += 1
        if valid == len(t):
            while ct2[s[i]]>ct[s[i]]:
                ct2[s[i]] -= 1
                i += 1
            res = res if len(res)<=(j-i+1) else s[i:j+1]
    return res if len(res) <= len(s) else ''
```
120 ms
