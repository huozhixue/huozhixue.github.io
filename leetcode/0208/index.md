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
 
提示：

- 1 <= word.length, prefix.length <= 2000
- word 和 prefix 仅由小写英文字母组成
- insert、search 和 startsWith 调用次数 总计 不超过 3 * 104 次

<!--more--> 

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
 

## 分析

python 中可以用 defaultdict 来实现。

插入时将没有的节点补齐，搜索前缀时判断路径是否存在即可。

注意 search 是搜索插入过的单词，要排除掉作为其它单词前缀的情况。
有个巧妙的方法是每次插入单词时，添加一个结尾标志 '#' 。


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
        for char in prefix:
            if char not in p:
                return False
            p = p[char]
        return True
```

112 ms


