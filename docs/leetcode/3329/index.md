# 3329：字符至少出现 K 次的子字符串 II（★★）


> <u>**[力扣第 3329 题](https://leetcode.cn/problems/count-substrings-with-k-frequency-characters-ii/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> 和一个整数 <code>k</code>，在 <code>s</code> 的所有 <span data-keyword="substring-nonempty">子字符串</span> 中，请你统计并返回 <strong>至少有一个 </strong>字符 <strong>至少出现</strong> <code>k</code> 次的子字符串总数。</p>



<p><strong>示例 1：</strong></p>
<div class="example-block">

<p><strong>输入：</strong> s = "abacb", k = 2</p>

<p><strong>输出：</strong> 4</p>

<p><strong>解释：</strong></p>

<p>符合条件的子字符串如下：</p>

<ul>
<li><code>"aba"</code>（字符 <code>'a'</code> 出现 2 次）。</li>
<li><code>"abac"</code>（字符 <code>'a'</code> 出现 2 次）。</li>
<li><code>"abacb"</code>（字符 <code>'a'</code> 出现 2 次）。</li>
<li><code>"bacb"</code>（字符 <code>'b'</code> 出现 2 次）。</li>
</ul>
</div>

<p><strong>示例 2：</strong></p>
<div class="example-block">

<p><strong>输入：</strong> s = "abcde", k = 1</p>

<p><strong>输出：</strong> 15</p>

<p><strong>解释：</strong></p>

<p>所有子字符串都有效，因为每个字符至少出现一次。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 3 * 10<sup>5</sup></code></li>
<li><code>1 &lt;= k &lt;= s.length</code></li>
<li><code>s</code> 仅由小写英文字母组成。</li>
</ul>






## 分析

- 滑动窗口，维护最短的符合的窗口即可

## 解答


```python
class Solution:
    def numberOfSubstrings(self, s: str, k: int) -> int:
        d = defaultdict(list)
        res = 0
        i = 0
        for j,c in enumerate(s):
            d[c].append(j)
            if len(d[c])>=k:
                i = max(i,d[c][-k]+1)
            res += i
        return res
```
576 ms
