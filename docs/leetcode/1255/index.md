# 1255：得分最高的单词集合（1881 分）


> <u>**[力扣第 162 场周赛第 4 题](https://leetcode.cn/problems/maximum-score-words-formed-by-letters/)**</u>

## 题目

<p>你将会得到一份单词表 <code>words</code>，一个字母表 <code>letters</code> （可能会有重复字母），以及每个字母对应的得分情况表 <code>score</code>。</p>

<p>请你帮忙计算玩家在单词拼写游戏中所能获得的「最高得分」：能够由 <code>letters</code> 里的字母拼写出的 <strong>任意</strong> 属于 <code>words</code> 单词子集中，分数最高的单词集合的得分。</p>

<p>单词拼写游戏的规则概述如下：</p>

<ul>
<li>玩家需要用字母表 <code>letters</code> 里的字母来拼写单词表 <code>words</code> 中的单词。</li>
<li>可以只使用字母表 <code>letters</code> 中的部分字母，但是每个字母最多被使用一次。</li>
<li>单词表 <code>words</code> 中每个单词只能计分（使用）一次。</li>
<li>根据字母得分情况表<code>score</code>，字母 <code>&#39;a&#39;</code>, <code>&#39;b&#39;</code>, <code>&#39;c&#39;</code>, ... , <code>&#39;z&#39;</code> 对应的得分分别为 <code>score[0]</code>, <code>score[1]</code>, ..., <code>score[25]</code>。</li>
<li>本场游戏的「得分」是指：玩家所拼写出的单词集合里包含的所有字母的得分之和。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>words = [&quot;dog&quot;,&quot;cat&quot;,&quot;dad&quot;,&quot;good&quot;], letters = [&quot;a&quot;,&quot;a&quot;,&quot;c&quot;,&quot;d&quot;,&quot;d&quot;,&quot;d&quot;,&quot;g&quot;,&quot;o&quot;,&quot;o&quot;], score = [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]
<strong>输出：</strong>23
<strong>解释：</strong>
字母得分为  a=1, c=9, d=5, g=3, o=2
使用给定的字母表 letters，我们可以拼写单词 &quot;dad&quot; (5+1+5)和 &quot;good&quot; (3+2+2+5)，得分为 23 。
而单词 &quot;dad&quot; 和 &quot;dog&quot; 只能得到 21 分。</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>words = [&quot;xxxz&quot;,&quot;ax&quot;,&quot;bx&quot;,&quot;cx&quot;], letters = [&quot;z&quot;,&quot;a&quot;,&quot;b&quot;,&quot;c&quot;,&quot;x&quot;,&quot;x&quot;,&quot;x&quot;], score = [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,10]
<strong>输出：</strong>27
<strong>解释：</strong>
字母得分为  a=4, b=4, c=4, x=5, z=10
使用给定的字母表 letters，我们可以组成单词 &quot;ax&quot; (4+5)， &quot;bx&quot; (4+5) 和 &quot;cx&quot; (4+5) ，总得分为 27 。
单词 &quot;xxxz&quot; 的得分仅为 25 。</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>words = [&quot;leetcode&quot;], letters = [&quot;l&quot;,&quot;e&quot;,&quot;t&quot;,&quot;c&quot;,&quot;o&quot;,&quot;d&quot;], score = [0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0]
<strong>输出：</strong>0
<strong>解释：</strong>
字母 &quot;e&quot; 在字母表 letters 中只出现了一次，所以无法组成单词表 words 中的单词。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= words.length &lt;= 14</code></li>
<li><code>1 &lt;= words[i].length &lt;= 15</code></li>
<li><code>1 &lt;= letters.length &lt;= 100</code></li>
<li><code>letters[i].length == 1</code></li>
<li><code>score.length == 26</code></li>
<li><code>0 &lt;= score[i] &lt;= 10</code></li>
<li><code>words[i]</code> 和 <code>letters[i]</code> 只包含小写的英文字母。</li>
</ul>


**相似问题：**
- [2151：基于陈述统计最多好人数（1979 分）](/leetcode/2151)


## 分析

按选不选第一个单词，即可递归

## 解答


```python
class Solution:
    def maxScoreWords(self, words: List[str], letters: List[str], score: List[int]) -> int:
        @cache
        def dfs(i,s):
            if i==len(words):
                return 0
            res = dfs(i+1,s)
            ct = Counter(words[i])
            if ct<=Counter(s):
                t = 0
                for c in ct:
                    s = s.replace(c,'',ct[c])
                    t += ct[c]*score[ord(c)-ord('a')]
                res = max(res,dfs(i+1,s)+t)
            return res
        return dfs(0,''.join(sorted(letters)))
```
35 ms
