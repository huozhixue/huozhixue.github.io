# 0208：实现 Trie (前缀树)（★★）


## 题目

实现一个 Trie (前缀树)，包含 insert, search, 和 startsWith 这三个操作。
Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。
这一数据结构有相当多的应用情景，例如自动补完和拼写检查。

请你实现 Trie 类：

- Trie() 初始化前缀树对象。
- void insert(String word) 向前缀树中插入字符串 word 。
- boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；
否则，返回 false 。
- boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，
返回 true ；否则，返回 false 。


示例：

    输入
    ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
    [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
    输出
    [null, null, true, false, true, null, true]
    
    解释
    Trie trie = new Trie();
    trie.insert("apple");
    trie.search("apple");   // 返回 True
    trie.search("app");     // 返回 False
    trie.startsWith("app"); // 返回 True
    trie.insert("app");
    trie.search("app");     // 返回 True
 
提示：
- 1 <= word.length, prefix.length <= 2000
- word 和 prefix 仅由小写英文字母组成
- insert、search 和 startsWith 调用次数 总计 不超过 3 * 10^4 次

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
        T = lambda: defaultdict(T)
        self.trie = T() 
        
    def insert(self, word: str) -> None:
        reduce(dict.__getitem__, word, self.trie)['#'] = {}

    def search(self, word: str) -> bool:
        return self.startsWith(word + '#')
        
    def startsWith(self, prefix: str) -> bool:
        p = self.trie
        for c in prefix:
            if c not in p:
                return False
            p = p[c]
        return True
```
112 ms


