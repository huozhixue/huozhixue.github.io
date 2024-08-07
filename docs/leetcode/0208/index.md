# 0208：实现 Trie (前缀树)（★）


> <u>**[力扣第 208 题](https://leetcode.cn/problems/implement-trie-prefix-tree/)**</u>

## 题目

<p><strong><a href="https://baike.baidu.com/item/字典树/9825209?fr=aladdin" target="_blank">Trie</a></strong>（发音类似 "try"）或者说 <strong>前缀树</strong> 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补完和拼写检查。</p>

<p>请你实现 Trie 类：</p>

<ul>
<li><code>Trie()</code> 初始化前缀树对象。</li>
<li><code>void insert(String word)</code> 向前缀树中插入字符串 <code>word</code> 。</li>
<li><code>boolean search(String word)</code> 如果字符串 <code>word</code> 在前缀树中，返回 <code>true</code>（即，在检索之前已经插入）；否则，返回 <code>false</code> 。</li>
<li><code>boolean startsWith(String prefix)</code> 如果之前已经插入的字符串 <code>word</code> 的前缀之一为 <code>prefix</code> ，返回 <code>true</code> ；否则，返回 <code>false</code> 。</li>
</ul>



<p><strong>示例：</strong></p>

<pre>
<strong>输入</strong>
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
<strong>输出</strong>
[null, null, true, false, true, null, true]

<strong>解释</strong>
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // 返回 True
trie.search("app");     // 返回 False
trie.startsWith("app"); // 返回 True
trie.insert("app");
trie.search("app");     // 返回 True
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= word.length, prefix.length <= 2000</code></li>
<li><code>word</code> 和 <code>prefix</code> 仅由小写英文字母组成</li>
<li><code>insert</code>、<code>search</code> 和 <code>startsWith</code> 调用次数 <strong>总计</strong> 不超过 <code>3 * 10<sup>4</sup></code> 次</li>
</ul>


**相似问题：**
- [0211：添加与搜索单词 - 数据结构设计](/leetcode/0211)
- [0642：设计搜索自动补全系统](/leetcode/0642)
- [0648：单词替换](/leetcode/0648)
- [0676：实现一个魔法字典](/leetcode/0676)
- [2227：加密解密字符串（1944 分）](/leetcode/2227)
- [1804：实现 Trie （前缀树） II](/leetcode/1804)
- [3045：统计前后缀下标对 II（2327 分）](/leetcode/3045)
- [3042：统计前后缀下标对 I（1214 分）](/leetcode/3042)


## 分析

trie 树是一种经典的树结构，python 中用 defaultdict 实现比较方便。
- insert 时将没有的节点补齐即可
- 为了区分前缀和整个单词，insert 时添加结尾标志 "#"
- startsWith 时，判断 trie 中是否有该路径即可
- search 某个单词 w 等价于 startsWith(w+'#')


## 解答

```python
class Trie:

    def __init__(self):
        T = lambda:defaultdict(T)
        self.trie = T()

    def insert(self, word: str) -> None:
        p = self.trie
        for c in word:
            p = p[c]
        p['#'] = ''

    def search(self, word: str) -> bool:
        return self.startsWith(word+'#')

    def startsWith(self, prefix: str) -> bool:
        p = self.trie
        for c in prefix:
            if c not in p:
                return False
            p = p[c]
        return True
```
113 ms

## *附加

也可以写成节点类的形式。


```python
class Node:
    __slots__ = 'son'

    def __init__(self):
        self.son = {}

class Trie:

    def __init__(self):
        self.root = Node()

    def insert(self, word: str) -> None:
        p = self.root
        for c in word:
            if c not in p.son:
                p.son[c] = Node()
            p = p.son[c]
        p.son['#'] = None

    def search(self, word: str) -> bool:
        return self.startsWith(word+'#')

    def startsWith(self, prefix: str) -> bool:
        p = self.root
        for c in prefix:
            if c not in p.son:
                return False
            p = p.son[c]
        return True
```
104 ms
