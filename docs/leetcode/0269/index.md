# 0269：火星词典（★★）


> <u>**[力扣第 269 题](https://leetcode.cn/problems/alien-dictionary/)**</u>

## 题目

<p>现有一种使用英语字母的火星语言，这门语言的字母顺序与英语顺序不同。</p>

<p>给你一个字符串列表 <code>words</code> ，作为这门语言的词典，<code>words</code> 中的字符串已经 <strong>按这门新语言的字母顺序进行了排序</strong> 。</p>

<p>请你根据该词典还原出此语言中已知的字母顺序，并 <strong>按字母递增顺序</strong> 排列。若不存在合法字母顺序，返回 <code>""</code> 。若存在多种可能的合法字母顺序，返回其中 <strong>任意一种</strong> 顺序即可。</p>

<p>字符串 <code>s</code> <strong>字典顺序小于</strong> 字符串 <code>t</code> 有两种情况：</p>

<ul>
<li>在第一个不同字母处，如果 <code>s</code> 中的字母在这门外星语言的字母顺序中位于 <code>t</code> 中字母之前，那么 <code>s</code> 的字典顺序小于 <code>t</code> 。</li>
<li>如果前面 <code>min(s.length, t.length)</code> 字母都相同，那么 <code>s.length < t.length</code> 时，<code>s</code> 的字典顺序也小于 <code>t</code> 。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>words = ["wrt","wrf","er","ett","rftt"]
<strong>输出：</strong>"wertf"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>words = ["z","x"]
<strong>输出：</strong>"zx"
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>words = ["z","x","z"]
<strong>输出：</strong>""
<strong>解释：</strong>不存在合法字母顺序，因此返回 <code>"" 。</code>
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= words.length <= 100</code></li>
<li><code>1 <= words[i].length <= 100</code></li>
<li><code>words[i]</code> 仅由小写英文字母组成</li>
</ul>


## 分析

根据相邻单词的比较，可以得到一些字母的大小关系。

将字母看作顶点，大小关系看作有向边，即转为拓扑排序问题。

注意词典可能本身排序就错误，此时应该直接返回空字符串。


## 解答

```python
def alienOrder(self, words: List[str]) -> str:
    nxt, indeg = defaultdict(list), defaultdict(int)
    for w1, w2 in pairwise(words):
        if w1 != w2 and w1.startswith(w2):
            return ''
        for a,b in zip(w1, w2):
            if a!=b:
                nxt[a].append(b)
                indeg[b] += 1
                break
    A = {c for w in words for c in w}
    Q = deque(u for u in A if indeg[u]==0)
    res = ''
    while Q:
        u = Q.popleft()
        res += u
        for v in nxt[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                Q.append(v)
    return res if len(res)==len(A) else ''
```
32 ms

