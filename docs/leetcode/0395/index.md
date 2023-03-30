# 0395：至少有 K 个重复字符的最长子串（★★）


> <u>**[力扣第 395 题](https://leetcode.cn/problems/longest-substring-with-at-least-k-repeating-characters/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> 和一个整数 <code>k</code> ，请你找出 <code>s</code> 中的最长子串， 要求该子串中的每一字符出现次数都不少于 <code>k</code> 。返回这一子串的长度。</p>



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
<li><code>1 <= s.length <= 10<sup>4</sup></code></li>
<li><code>s</code> 仅由小写英文字母组成</li>
<li><code>1 <= k <= 10<sup>5</sup></code></li>
</ul>


## 分析

若某字符 char 在 s 中出现的次数小于 k，显然子串就不能含有 char。
所以可以将 s 按 char 分割，转为递归子问题。

## 解答

```python
def longestSubstring(self, s: str, k: int) -> int:
    def dfs(s):
        A = [c for c, freq in Counter(s).items() if freq < k]
        return len(s) if not A else max(dfs(sub) for sub in re.split('|'.join(A), s))
    return dfs(s)
```
56 ms


