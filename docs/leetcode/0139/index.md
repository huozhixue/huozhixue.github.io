# 0139：单词拆分（★）


> <u>**[力扣第 139 题](https://leetcode.cn/problems/word-break/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> 和一个字符串列表 <code>wordDict</code> 作为字典。请你判断是否可以利用字典中出现的单词拼接出 <code>s</code> 。</p>

<p><strong>注意：</strong>不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入:</strong> s = "leetcode", wordDict = ["leet", "code"]
<strong>输出:</strong> true
<strong>解释:</strong> 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入:</strong> s = "applepenapple", wordDict = ["apple", "pen"]
<strong>输出:</strong> true
<strong>解释:</strong> 返回 true 因为 <code>"</code>applepenapple<code>"</code> 可以由 <code>"</code>apple" "pen" "apple<code>" 拼接成</code>。
注意，你可以重复使用字典中的单词。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入:</strong> s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
<strong>输出:</strong> false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 300</code></li>
<li><code>1 &lt;= wordDict.length &lt;= 1000</code></li>
<li><code>1 &lt;= wordDict[i].length &lt;= 20</code></li>
<li><code>s</code> 和 <code>wordDict[i]</code> 仅有小写英文字母组成</li>
<li><code>wordDict</code> 中的所有字符串 <strong>互不相同</strong></li>
</ul>


## 分析

典型的单串 dp，按第一个单词长度即可递归。

## 解答

```python
def wordBreak(self, s: str, wordDict: List[str]) -> bool:
    @cache
    def dfs(s):
        return not s or any(s[:i+1] in W and dfs(s[i+1:]) for i in range(len(s)))

    W = set(wordDict)
    return dfs(s)
```
48 ms

