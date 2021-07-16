# 0208：实现 Trie (前缀树)（★★）


## 题目

实现一个 Trie (前缀树)，包含 insert, search, 和 startsWith 这三个操作。

<!--more--> 

示例:

	Trie trie = new Trie();

	trie.insert("apple");
	trie.search("apple");   // 返回 true
	trie.search("app");     // 返回 false
	trie.startsWith("app"); // 返回 true
	trie.insert("app");   
	trie.search("app");     // 返回 true

## 分析

### #1

初始化一个字典，插入时将没有的节点补齐，搜索时判断路径是否存在即可。

注意到 search 和 startsWith 的区别，一个是搜索插入过的单词，一个是搜索前缀路径。
因此插入单词时可以添加一个结尾标志 '#' 以作区分。

```python
class Trie:

    def __init__(self):
        self.trie = {}
        
    def insert(self, word: str) -> None:
        p = self.trie
        for char in word:
            if char not in p:
                p[char] = {}
            p = p[char]
        p['#'] = {}

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

116 ms

### #2

借助 python 内置函数，可以精简代码。

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

128 ms


