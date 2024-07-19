# 0745：前缀和后缀搜索（★★）


> <u>**[力扣第 745 题](https://leetcode.cn/problems/prefix-and-suffix-search/)**</u>

## 题目

<p>设计一个包含一些单词的特殊词典，并能够通过前缀和后缀来检索单词。</p>

<p>实现 <code>WordFilter</code> 类：</p>

<ul>
<li><code>WordFilter(string[] words)</code> 使用词典中的单词 <code>words</code> 初始化对象。</li>
<li><code>f(string pref, string suff)</code> 返回词典中具有前缀 <code>pref</code> 和后缀 <code>suff</code> 的单词的下标。如果存在不止一个满足要求的下标，返回其中 <strong>最大的下标</strong> 。如果不存在这样的单词，返回 <code>-1</code> 。</li>
</ul>



<p><strong>示例：</strong></p>

<pre>
<strong>输入</strong>
["WordFilter", "f"]
[[["apple"]], ["a", "e"]]
<strong>输出</strong>
[null, 0]
<strong>解释</strong>
WordFilter wordFilter = new WordFilter(["apple"]);
wordFilter.f("a", "e"); // 返回 0 ，因为下标为 0 的单词：前缀 prefix = "a" 且 后缀 suffix = "e" 。
</pre>


<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= words.length &lt;= 10<sup>4</sup></code></li>
<li><code>1 &lt;= words[i].length &lt;= 7</code></li>
<li><code>1 &lt;= pref.length, suff.length &lt;= 7</code></li>
<li><code>words[i]</code>、<code>pref</code> 和 <code>suff</code> 仅由小写英文字母组成</li>
<li>最多对函数 <code>f</code> 执行 <code>10<sup>4</sup></code> 次调用</li>
</ul>


**相似问题：**
- [0211：添加与搜索单词 - 数据结构设计](/leetcode/0211)


## 分析

### #1 打表

可以先将所有可能的 <前缀、后缀> 组合都计算出结果，查询时直接返回即可。

```python
class WordFilter:

    def __init__(self, words: List[str]):
        self.d = defaultdict(lambda:-1)
        for i,w in enumerate(words):
            for j in range(1,len(w)+1):
                for k in range(len(w)):
                    key = (w[:j],w[k:])
                    self.d[key] = max(self.d[key],i)

    def f(self, pref: str, suff: str) -> int:
        return self.d[(pref,suff)]
```
2008 ms

### #2 字典树

也可以用前缀、后缀字典树分别保存单词的下标集合。

查询时，先找到前缀、后缀对应的下标集合，再找交集中最大的下标。

为了加速查找交集的最大下标，可以用状态压缩代替集合。

## 解答


```python
class WordFilter:

    def __init__(self, words: List[str]):
        T = lambda: defaultdict(T)
        self.t1, self.t2 = T(), T()
        for i,w in enumerate(words):
            p = self.t1
            for c in w:
                p = p[c]
                p['#'] = p.get('#',0)|1<<i
            p = self.t2
            for c in w[::-1]:
                p = p[c]
                p['#'] = p.get('#',0)|1<<i

    def f(self, pref: str, suff: str) -> int:
        p = self.t1
        for c in pref:
            if c not in p:
                return -1
            p = p[c]
        a = p['#']
        p = self.t2
        for c in suff[::-1]:
            if c not in p:
                return -1
            p = p[c]
        b = p['#']
        return (a&b).bit_length()-1
```
1000 ms
