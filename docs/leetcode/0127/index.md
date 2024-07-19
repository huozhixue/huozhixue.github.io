# 0127：单词接龙（★★）


> <u>**[力扣第 127 题](https://leetcode.cn/problems/word-ladder/)**</u>

## 题目

<p>字典 <code>wordList</code> 中从单词 <code>beginWord</code><em> </em>到 <code>endWord</code> 的 <strong>转换序列 </strong>是一个按下述规格形成的序列<meta charset="UTF-8" /> <code>beginWord -&gt; s<sub>1</sub> -&gt; s<sub>2</sub> -&gt; ... -&gt; s<sub>k</sub></code>：</p>

<ul>
<li>每一对相邻的单词只差一个字母。</li>
<li><meta charset="UTF-8" /> 对于 <code>1 &lt;= i &lt;= k</code> 时，每个<meta charset="UTF-8" /> <code>s<sub>i</sub></code> 都在<meta charset="UTF-8" /> <code>wordList</code> 中。注意， <code>beginWord</code><em> </em>不需要在<meta charset="UTF-8" /> <code>wordList</code> 中。<meta charset="UTF-8" /></li>
<li><code>s<sub>k</sub> == endWord</code></li>
</ul>

<p>给你两个单词<em> </em><code>beginWord</code><em> </em>和 <code>endWord</code> 和一个字典 <code>wordList</code> ，返回 <em>从 <code>beginWord</code> 到 <code>endWord</code> 的 <strong>最短转换序列</strong> 中的 <strong>单词数目</strong></em> 。如果不存在这样的转换序列，返回 <code>0</code> 。</p>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
<strong>输出：</strong>5
<strong>解释：</strong>一个最短转换序列是 "hit" -&gt; "hot" -&gt; "dot" -&gt; "dog" -&gt; "cog", 返回它的长度 5。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
<strong>输出：</strong>0
<strong>解释：</strong>endWord "cog" 不在字典中，所以无法进行转换。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= beginWord.length &lt;= 10</code></li>
<li><code>endWord.length == beginWord.length</code></li>
<li><code>1 &lt;= wordList.length &lt;= 5000</code></li>
<li><code>wordList[i].length == beginWord.length</code></li>
<li><code>beginWord</code>、<code>endWord</code> 和 <code>wordList[i]</code> 由小写英文字母组成</li>
<li><code>beginWord != endWord</code></li>
<li><code>wordList</code> 中的所有字符串 <strong>互不相同</strong></li>
</ul>


**相似问题：**
- [0126：单词接龙 II](/leetcode/0126)
- [0433：最小基因变化](/leetcode/0433)
- [2452：距离字典两次编辑以内的单词（1459 分）](/leetcode/2452)


## 分析

- 找最短容易想到用 bfs，每轮搜索能转换的单词即可
- 搜索可以用 {{< lc "0676" >}} 的方法加速
	- 将单词的某一位改为 '.' 作为单词的 key
	- 每个单词按所有的 key 存在哈希表中
	- 搜索时，取所有 key 对应的列表即可

## 解答

```python
class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        d = defaultdict(list)
        for w in wordList:
            for i in range(len(w)):
                d[w[:i]+'*'+w[i+1:]].append(w)
        Q,vis = deque([(beginWord,1)]), {beginWord}
        while Q:
            u,w = Q.popleft()
            if u==endWord:
                return w
            for i in range(len(u)):
                for v in d[u[:i]+'*'+u[i+1:]]:
                    if v not in vis:
                        Q.append((v,w+1))
                        vis.add(v)
        return 0
```
119 ms



