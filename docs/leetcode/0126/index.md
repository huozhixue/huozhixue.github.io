# 0126：单词接龙 II（★★）


> <u>**[力扣第 126 题](https://leetcode.cn/problems/word-ladder-ii/)**</u>

## 题目

<p>按字典 <code>wordList</code> 完成从单词 <code>beginWord</code> 到单词 <code>endWord</code> 转化，一个表示此过程的 <strong>转换序列</strong> 是形式上像 <code>beginWord -&gt; s<sub>1</sub> -&gt; s<sub>2</sub> -&gt; ... -&gt; s<sub>k</sub></code> 这样的单词序列，并满足：</p>

<div class="original__bRMd">
<div>
<ul>
<li>每对相邻的单词之间仅有单个字母不同。</li>
<li>转换过程中的每个单词 <code>s<sub>i</sub></code>（<code>1 &lt;= i &lt;= k</code>）必须是字典 <code>wordList</code> 中的单词。注意，<code>beginWord</code> 不必是字典 <code>wordList</code> 中的单词。</li>
<li><code>s<sub>k</sub> == endWord</code></li>
</ul>

<p>给你两个单词 <code>beginWord</code> 和 <code>endWord</code> ，以及一个字典 <code>wordList</code> 。请你找出并返回所有从 <code>beginWord</code> 到 <code>endWord</code> 的 <strong>最短转换序列</strong> ，如果不存在这样的转换序列，返回一个空列表。每个序列都应该以单词列表<em> </em><code>[beginWord, s<sub>1</sub>, s<sub>2</sub>, ..., s<sub>k</sub>]</code> 的形式返回。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
<strong>输出：</strong>[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
<strong>解释：</strong>存在 2 种最短的转换序列：
"hit" -&gt; "hot" -&gt; "dot" -&gt; "dog" -&gt; "cog"
"hit" -&gt; "hot" -&gt; "lot" -&gt; "log" -&gt; "cog"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
<strong>输出：</strong>[]
<strong>解释：</strong>endWord "cog" 不在字典 wordList 中，所以不存在符合要求的转换序列。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= beginWord.length &lt;= 5</code></li>
<li><code>endWord.length == beginWord.length</code></li>
<li><code>1 &lt;= wordList.length &lt;= 500</code></li>
<li><code>wordList[i].length == beginWord.length</code></li>
<li><code>beginWord</code>、<code>endWord</code> 和 <code>wordList[i]</code> 由小写英文字母组成</li>
<li><code>beginWord != endWord</code></li>
<li><code>wordList</code> 中的所有单词 <strong>互不相同</strong></li>
</ul>
</div>
</div>


## 分析

{{< lc "0127" >}} 升级版。

要求所有序列，考虑从 bfs 的路径中倒推：
- bfs 的过程中得到 dis 字典，保存了经过的每个单词到 beginWord 的距离
- 假设单词 w 和 endWord 相邻且 dis[w]==dis[endWord]-1，那么可以经过 w 来组成最短路径
- 依此类推，找到 beginWord 时，即得到一条最短路径
- 用回溯法可以搜索到所有最短路径

特别注意 beginWord 可能在 wordList 中，也可能不在，因此构建字典 d 时，
要遍历 set(wordList)|{beginWord}。

## 解答

```python
def findLadders(self, beginWord: str, endWord: str, wordList: List[str]) -> List[List[str]]:
    d = defaultdict(list)
    for w in set(wordList)|{beginWord}:
        for i in range(len(w)):
            d[w[:i]+'.'+w[i+1:]].append(w)
    Q, dis = deque([beginWord]), {beginWord: 1}
    while Q:
        u = Q.popleft()
        if u == endWord:
            break
        for i in range(len(u)):
            for v in d[u[:i]+'.'+u[i+1:]]:
                if v not in dis:
                    dis[v] = dis[u]+1
                    Q.append(v)
    
    def dfs(u):
        if dis[u] == 1:
            return [[u]]
        res = []
        for i in range(len(u)):
            for v in d[u[:i]+'.'+u[i+1:]]:
                if v in dis and dis[v]==dis[u]-1:
                    res.extend(sub+[u] for sub in dfs(v))
        return res

    return [] if endWord not in dis else dfs(endWord)
```
44 ms

