# 0395：至少有 K 个重复字符的最长子串（★）


> <u>**[力扣第 395 题](https://leetcode.cn/problems/longest-substring-with-at-least-k-repeating-characters/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> 和一个整数 <code>k</code> ，请你找出 <code>s</code> 中的最长子串， 要求该子串中的每一字符出现次数都不少于 <code>k</code> 。返回这一子串的长度。</p>

<p data-pm-slice="1 1 []">如果不存在这样的子字符串，则返回 0。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "aaabb", k = 3
<strong>输出：</strong>3
<strong>解释：</strong>最长子串为 "aaa" ，其中 'a' 重复了 3 次。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "ababbc", k = 2
<strong>输出：</strong>5
<strong>解释：</strong>最长子串为 "ababb" ，其中 'a' 重复了 2 次， 'b' 重复了 3 次。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>
<li><code>s</code> 仅由小写英文字母组成</li>
<li><code>1 &lt;= k &lt;= 10<sup>5</sup></code></li>
</ul>


**相似问题：**
- [2014：重复 K 次的最长子序列（2558 分）](/leetcode/2014)
- [2067：等计数子串的数量](/leetcode/2067)
- [2405：子字符串的最优划分（1355 分）](/leetcode/2405)
- [2958：最多 K 个重复元素的最长子数组（1535 分）](/leetcode/2958)
- [2982：找出出现至少三次的最长特殊子字符串 II（1772 分）](/leetcode/2982)
- [2981：找出出现至少三次的最长特殊子字符串 I（1505 分）](/leetcode/2981)


## 分析

- 若某字符 c 在 s 中出现的次数小于 k，显然子串就不能含有 c
- 将 s 按 c 分割，即转为递归子问题
- 字符最多 26 种，因此最多递归 26 次

## 解答

```python
class Solution:
    def longestSubstring(self, s: str, k: int) -> int:
        def dfs(s):
            A = [c for c,w in Counter(s).items() if w<k]
            if not A:
                return len(s)
            return max(dfs(t) for t in re.split('|'.join(A),s))
        return dfs(s)
```
55 ms


