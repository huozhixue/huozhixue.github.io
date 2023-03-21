# 0424：替换后的最长重复字符（★）


> <u>**[力扣第 9  场周赛第 3  题](https://leetcode.cn/problems/longest-repeating-character-replacement/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> 和一个整数 <code>k</code> 。你可以选择字符串中的任一字符，并将其更改为任何其他大写英文字符。该操作最多可执行 <code>k</code> 次。</p>

<p>在执行上述操作后，返回包含相同字母的最长子字符串的长度。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "ABAB", k = 2
<strong>输出：</strong>4
<strong>解释：</strong>用两个'A'替换为两个'B',反之亦然。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "AABABBA", k = 1
<strong>输出：</strong>4
<strong>解释：</strong>
将中间的一个'A'替换为'B',字符串变为 "AABBBBA"。
子串 "BBBB" 有最长重复字母, 答案为 4。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
<li><code>s</code> 仅由大写英文字母组成</li>
<li><code>0 &lt;= k &lt;= s.length</code></li>
</ul>


## 分析


遍历每个位置 j 作为结尾，找符合条件的最长子串 [i, j] 即可。

发现遍历中 i 必然是不动或向右移的，因此是滑动窗口。

为了判断是否符合条件，可以维护一个计数器，如果除了频数最大的字符以外的个数不超过 k，就符合。

## 解答

```python
def characterReplacement(self, s: str, k: int) -> int:
    res, i, ct = 0, 0, Counter()
    for j, char in enumerate(s):
        ct[char] += 1
        while j-i+1-max(ct.values())>k:
            ct[s[i]] -= 1
            i += 1
        res = max(res, j-i+1)
    return res
```
224 ms
