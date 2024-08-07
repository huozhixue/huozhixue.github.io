# 0030：串联所有单词的子串（★★）


> <u>**[力扣第 30 题](https://leetcode.cn/problems/substring-with-concatenation-of-all-words/)**</u>

## 题目

<p>给定一个字符串 <code>s</code><strong> </strong>和一个字符串数组 <code>words</code><strong>。</strong> <code>words</code> 中所有字符串 <strong>长度相同</strong>。</p>

<p> <code>s</code><strong> </strong>中的 <strong>串联子串</strong> 是指一个包含  <code>words</code> 中所有字符串以任意顺序排列连接起来的子串。</p>

<ul>
<li>例如，如果 <code>words = ["ab","cd","ef"]</code>， 那么 <code>"abcdef"</code>， <code>"abefcd"</code>，<code>"cdabef"</code>， <code>"cdefab"</code>，<code>"efabcd"</code>， 和 <code>"efcdab"</code> 都是串联子串。 <code>"acdbef"</code> 不是串联子串，因为他不是任何 <code>words</code> 排列的连接。</li>
</ul>

<p>返回所有串联子串在 <code>s</code><strong> </strong>中的开始索引。你可以以 <strong>任意顺序</strong> 返回答案。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "barfoothefoobarman", words = ["foo","bar"]
<strong>输出：</strong><code>[0,9]</code>
<strong>解释：</strong>因为 words.length == 2 同时 words[i].length == 3，连接的子字符串的长度必须为 6。
子串 "barfoo" 开始位置是 0。它是 words 中以 ["bar","foo"] 顺序排列的连接。
子串 "foobar" 开始位置是 9。它是 words 中以 ["foo","bar"] 顺序排列的连接。
输出顺序无关紧要。返回 [9,0] 也是可以的。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
<code><strong>输出：</strong>[]</code>
<strong>解释：</strong>因为<strong> </strong>words.length == 4 并且 words[i].length == 4，所以串联子串的长度必须为 16。
s 中没有子串长度为 16 并且等于 words 的任何顺序排列的连接。
所以我们返回一个空数组。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
<strong>输出：</strong>[6,9,12]
<strong>解释：</strong>因为 words.length == 3 并且 words[i].length == 3，所以串联子串的长度必须为 9。
子串 "foobarthe" 开始位置是 6。它是 words 中以 ["foo","bar","the"] 顺序排列的连接。
子串 "barthefoo" 开始位置是 9。它是 words 中以 ["bar","the","foo"] 顺序排列的连接。
子串 "thefoobar" 开始位置是 12。它是 words 中以 ["the","foo","bar"] 顺序排列的连接。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>
<li><code>1 &lt;= words.length &lt;= 5000</code></li>
<li><code>1 &lt;= words[i].length &lt;= 30</code></li>
<li><code>words[i]</code> 和 <code>s</code> 由小写英文字母组成</li>
</ul>


**相似问题：**
- [0076：最小覆盖子串](/leetcode/0076)


## 分析

- {{< lc "0438" >}} 的升级版
- 遍历 words 总长度的子串，用 Counter 判断是否符合即可
- 设每个单词的长度 n， 则子串 [i,j] 的 Counter 可以由子串 [i-n, j-n] 递推得到
- 判断 Counter 是否符合有个省时的方法
	- 新加一个变量 valid 维护有用字符的个数
	- 移动 j 后，如果 ct[s[j]]=ct0[s[j]]，s[j] 就是有用的，valid 增 1
	- 移动 i 前，如果 ct[s[i]]=ct0[s[i]]，s[i] 就是有用的，valid 减 1
## 解答

```python
class Solution:
    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        m,n = len(words),len(words[0])
        ct0 = Counter(words)
        res = []
        for i in range(n):
            ct, valid = Counter(), 0
            for j in range(i,len(s),n):
                new = s[j:j+n]
                ct[new] += 1
                if ct[new]==ct0[new]:
                    valid += 1
                if j>=m*n:
                    old = s[j-m*n:j-m*n+n]
                    if ct[old]==ct0[old]:
                        valid -= 1
                    ct[old] -= 1
                if valid==len(ct0):
                    res.append(j-m*n+n)
        return res
```
79 ms
