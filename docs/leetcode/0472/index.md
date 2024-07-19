# 0472：连接词（★★）


> <u>**[力扣第 472 题](https://leetcode.cn/problems/concatenated-words/)**</u>
## 题目

<p>给你一个 <strong>不含重复 </strong>单词的字符串数组 <code>words</code> ，请你找出并返回 <code>words</code> 中的所有 <strong>连接词</strong> 。</p>

<p><strong>连接词</strong> 定义为：一个完全由给定数组中的至少两个较短单词（不一定是不同的两个单词）组成的字符串。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
<strong>输出：</strong>["catsdogcats","dogcatsdog","ratcatdogcat"]
<strong>解释：</strong>"catsdogcats" 由 "cats", "dog" 和 "cats" 组成;
"dogcatsdog" 由 "dog", "cats" 和 "dog" 组成;
"ratcatdogcat" 由 "rat", "cat", "dog" 和 "cat" 组成。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>words = ["cat","dog","catdog"]
<strong>输出：</strong>["catdog"]</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= words.length &lt;= 10<sup>4</sup></code></li>
<li><code>1 &lt;= words[i].length &lt;= 30</code></li>
<li><code>words[i]</code> 仅由小写英文字母组成。 </li>
<li><code>words</code> 中的所有字符串都是 <strong>唯一</strong> 的。</li>
<li><code>1 &lt;= sum(words[i].length) &lt;= 10<sup>5</sup></code></li>
</ul>


**相似问题：**
- [0140：单词拆分 II](/leetcode/0140)


## 分析


类似 {{< lc "0139" >}}，按第一个单词长度递归即可。

## 解答


```python
class Solution:
    def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:
        @cache
        def dfs(w):
            for i in range(1, len(w)):
                if w[:i] in vis and (w[i:] in vis or dfs(w[i:])):
                    return True
            return False
        vis = set(words)
        return [w for w in words if dfs(w)]
```
148 ms
