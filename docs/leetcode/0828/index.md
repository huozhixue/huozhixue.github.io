# 0828：统计子串中的唯一字符（2034 分）


> <u>**[力扣第 83 场周赛第 4 题](https://leetcode.cn/problems/count-unique-characters-of-all-substrings-of-a-given-string/)**</u>

## 题目

<p>我们定义了一个函数 <code>countUniqueChars(s)</code> 来统计字符串 <code>s</code> 中的唯一字符，并返回唯一字符的个数。</p>

<p>例如：<code>s = "LEETCODE"</code> ，则其中 <code>"L"</code>, <code>"T"</code>,<code>"C"</code>,<code>"O"</code>,<code>"D"</code> 都是唯一字符，因为它们只出现一次，所以 <code>countUniqueChars(s) = 5</code> 。</p>

<p>本题将会给你一个字符串 <code>s</code> ，我们需要返回 <code>countUniqueChars(t)</code> 的总和，其中 <code>t</code> 是 <code>s</code> 的子字符串。输入用例保证返回值为 32 位整数。</p>

<p>注意，某些子字符串可能是重复的，但你统计时也必须算上这些重复的子字符串（也就是说，你必须统计 <code>s</code> 的所有子字符串中的唯一字符）。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入: </strong>s = "ABC"
<strong>输出: </strong>10
<strong>解释:</strong> 所有可能的子串为："A","B","C","AB","BC" 和 "ABC"。
其中，每一个子串都由独特字符构成。
所以其长度总和为：1 + 1 + 1 + 2 + 2 + 3 = 10
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入: </strong>s = "ABA"
<strong>输出: </strong>8
<strong>解释: </strong>除了 countUniqueChars("ABA") = 1 之外，其余与示例 1 相同。
</pre>

<p><strong class="example">示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "LEETCODE"
<strong>输出：</strong>92
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
<li><code>s</code> 只包含大写英文字符</li>
</ul>


**相似问题：**
- [2262：字符串的总引力（2033 分）](/leetcode/2262)


## 分析

可以对每个字符统计其作为唯一字符的次数。

令 left[i] 代表 s[i] 上一次出现的位置，right[i] 代表 s[i] 下一次出现的位置。
显然对于 [left[i], right[i]] 范围内包含 s[i] 的子串，s[i] 都是唯一字符。
这样的子串个数即为 (i-left[i])*(right[i]-i)。

借助哈希表可以一趟得到所有的 left[i] 和 right[i]。

## 解答

```python
def uniqueLetterString(self, s: str) -> int:
    n = len(s)
    left, right = [-1]*n, [n]*n
    d = {}
    for i, char in enumerate(s):
        if char in d:
            j = d[char]
            left[i] = j
            right[j] = i
        d[char] = i
    res, mod = 0, 10**9+7
    for i in range(n):
        res += (i-left[i])*(right[i]-i)
        res %= mod
    return res
```
236 ms

