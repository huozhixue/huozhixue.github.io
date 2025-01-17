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

- 可以用贡献法，统计每个字符作为唯一字符的次数
- 对字符 s[i]，找到上/下一次出现的位置 l、r，次数即为 (i-l)*(r-i)
- 找上/下一次出现的位置，用哈希表即可

## 解答

```python
class Solution:
    def uniqueLetterString(self, s: str) -> int:
        d = defaultdict(list)
        for i,c in enumerate(s):
            d[c].append(i)
        res, n = 0, len(s)
        for A in d.values():
            A = [-1]+A+[n]
            for i in range(1,len(A)-1):
                res += (A[i]-A[i-1])*(A[i+1]-A[i])
        return res
```
141 ms

