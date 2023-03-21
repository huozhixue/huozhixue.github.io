# 0140：单词拆分 II（★★）


> <u>**[力扣第 140 题](https://leetcode.cn/problems/word-break-ii/)**</u>

## 题目

<p>给定一个字符串 <code>s</code> 和一个字符串字典<meta charset="UTF-8" /> <code>wordDict</code> ，在字符串<meta charset="UTF-8" /> <code>s</code> 中增加空格来构建一个句子，使得句子中所有的单词都在词典中。<strong>以任意顺序</strong> 返回所有这些可能的句子。</p>

<p><strong>注意：</strong>词典中的同一个单词可能在分段中被重复使用多次。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入:</strong>s = "<code>catsanddog</code>", wordDict = <code>["cat","cats","and","sand","dog"]</code>
<strong>输出:</strong><code>["cats and dog","cat sand dog"]</code>
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入:</strong>s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]
<strong>输出:</strong>["pine apple pen apple","pineapple pen apple","pine applepen apple"]
<strong>解释:</strong> 注意你可以重复使用字典中的单词。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入:</strong>s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
<strong>输出:</strong>[]
</pre>



<p><strong>提示：</strong></p>

<p><meta charset="UTF-8" /></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 20</code></li>
<li><code>1 &lt;= wordDict.length &lt;= 1000</code></li>
<li><code>1 &lt;= wordDict[i].length &lt;= 10</code></li>
<li><code>s</code> 和 <code>wordDict[i]</code> 仅有小写英文字母组成</li>
<li><code>wordDict</code> 中所有字符串都 <strong>不同</strong></li>
</ul>


## 分析

{{< lc "0139" >}} 升级版，改下递归的返回值即可。

## 解答

```python
def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
    @lru_cache(None)
    def dfs(s):
        if not s:
            return [[]]
        res = []
        for i in range(len(s)):
            if s[:i+1] in W:
                res.extend([s[:i+1]]+sub for sub in dfs(s[i+1:]))
        return res

    W = set(wordDict)
    return [' '.join(sub) for sub in dfs(s)]
```
32 ms

