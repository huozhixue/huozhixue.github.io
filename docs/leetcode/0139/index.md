# 0139：单词拆分（★）


> <u>**[力扣第 139 题](https://leetcode.cn/problems/word-break/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> 和一个字符串列表 <code>wordDict</code> 作为字典。如果可以利用字典中出现的一个或多个单词拼接出 <code>s</code> 则返回 <code>true</code>。</p>

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
<strong>解释:</strong> 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
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
<li><code>s</code> 和 <code>wordDict[i]</code> 仅由小写英文字母组成</li>
<li><code>wordDict</code> 中的所有字符串 <strong>互不相同</strong></li>
</ul>


**相似问题：**
- [0140：单词拆分 II](/leetcode/0140)
- [2707：字符串中的额外字符（1735 分）](/leetcode/2707)


## 分析

- 按最后一个单词长度递推即可
- 注意单词长度最多 20，可以剪枝

## 解答

```python
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        n = len(s)
        f = [1]+[0]*n
        vis = set(wordDict)
        for i in range(1,n+1):            
            for j in range(max(0,i-20),i):
                if s[j:i] in vis:
                    f[i] |= f[j]
        return f[-1]>0
```
31 ms

## *附加

也可以用字典树加速查找。

```python
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        T = lambda: defaultdict(T)
        trie = T()
        for w in wordDict:
            p = trie
            for c in w[::-1]:
                p = p[c]
            p['#'] = ''
        n = len(s)
        f = [1]+[0]*n
        for i in range(1,n+1):         
            p = trie
            for j in range(i-1,max(0,i-20)-1,-1):
                if s[j] not in p:
                    break   
                p = p[s[j]]
                if '#' in p:
                    f[i] |= f[j]
        return f[-1]>0
```
47 ms
