# 0424：替换后的最长重复字符（★）


> <u>**[力扣第 424 题](https://leetcode.cn/problems/longest-repeating-character-replacement/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> 和一个整数 <code>k</code> 。你可以选择字符串中的任一字符，并将其更改为任何其他大写英文字符。该操作最多可执行 <code>k</code> 次。</p>

<p>在执行上述操作后，返回 <em>包含相同字母的最长子字符串的长度。</em></p>



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
可能存在其他的方法来得到同样的结果。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
<li><code>s</code> 仅由大写英文字母组成</li>
<li><code>0 &lt;= k &lt;= s.length</code></li>
</ul>


## 分析


典型的滑动窗口问题。

维护一个计数器，如果除了频数最大的字符以外的个数大于 k，就移动左端点。

## 解答

```python
def characterReplacement(self, s: str, k: int) -> int:
    res, i, ct = 0, 0, Counter()
    for j, c in enumerate(s):
        ct[c] += 1
        while j-i+1-max(ct.values())>k:
            ct[s[i]] -= 1
            i += 1
        res = max(res, j-i+1)
    return res
```
时间$O(26*N)$，196 ms


