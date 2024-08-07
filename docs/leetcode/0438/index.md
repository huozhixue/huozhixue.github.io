# 0438：找到字符串中所有字母异位词（★）


> <u>**[力扣第 438 题](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)**</u>

## 题目

<p>给定两个字符串 <code>s</code> 和 <code>p</code>，找到 <code>s</code><strong> </strong>中所有 <code>p</code><strong> </strong>的 <strong>异位词 </strong>的子串，返回这些子串的起始索引。不考虑答案输出的顺序。</p>

<p><strong>异位词 </strong>指由相同字母重排列形成的字符串（包括相同的字符串）。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入: </strong>s = "cbaebabacd", p = "abc"
<strong>输出: </strong>[0,6]
<strong>解释:</strong>
起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
</pre>

<p><strong> 示例 2:</strong></p>

<pre>
<strong>输入: </strong>s = "abab", p = "ab"
<strong>输出: </strong>[0,1,2]
<strong>解释:</strong>
起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= s.length, p.length &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>s</code> 和 <code>p</code> 仅包含小写字母</li>
</ul>


**相似问题：**
- [0242：有效的字母异位词](/leetcode/0242)
- [0567：字符串的排列](/leetcode/0567)


## 分析


- 遍历每个窗口，判断是否符合即可
- 维护一个 Counter 判断子串是否符合
- 判断 Counter 是否符合有个省时的方法
    - 新加一个变量 valid 维护有用字符的个数
    - 移动 j 后，如果 ct[s[j]]=ct0[s[j]]，s[j] 就是有用的，valid 增 1
    - 移动 i 前，如果 ct[s[i]]=ct0[s[i]]，s[i] 就是有用的，valid 减 1
## 解答

```python
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        m = len(p)
        ct0,ct = Counter(p),defaultdict(int)
        valid = 0
        res = []
        for j,c in enumerate(s):
            ct[c] += 1
            if ct[c]==ct0[c]:
                valid += 1
            if j>=m:
                old = s[j-m]
                if ct[old]==ct0[old]:
                    valid -= 1
                ct[old] -= 1
            if valid==len(ct0):
                res.append(j-m+1)
        return res
```
72 ms
