# 0211：添加与搜索单词 - 数据结构设计（★★）


## 题目

请你设计一个数据结构，支持 添加新单词 和 查找字符串是否与任何先前添加的字符串匹配 。

实现词典类 WordDictionary ：

- WordDictionary() 初始化词典对象
- void addWord(word) 将 word 添加到数据结构中，之后可以对它进行匹配
- bool search(word) 如果数据结构中存在字符串与 word 匹配，则返回 true ；否则，返回  false 。word 中可能包含一些 '.' ，每个 . 都可以表示任何一个字母。

ddWord 中的 word 由小写英文字母组成。search 中的 word 由 '.' 或小写英文字母组成。

 <!--more--> 

示例：

	输入：
	["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
	[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
	输出：
	[null,null,null,null,false,true,true,true]

	解释：
	WordDictionary wordDictionary = new WordDictionary();
	wordDictionary.addWord("bad");
	wordDictionary.addWord("dad");
	wordDictionary.addWord("mad");
	wordDictionary.search("pad"); // return False
	wordDictionary.search("bad"); // return True
	wordDictionary.search(".ad"); // return True
	wordDictionary.search("b.."); // return True



## 分析

### #1

如果 search 不含 '.' ，那么就和 0208 完全一样。

匹配 search 时，遇到 '.'，要考虑 '.' 表示每个字母的情况下是否匹配，可以用递归。

```python
class WordDictionary:

    def __init__(self):
        T = lambda: defaultdict(T)
        self.trie = T() 

    def addWord(self, word: str) -> None:
        reduce(dict.__getitem__, word, self.trie)['#'] = {}

    def search(self, word: str) -> bool:
        return self.startsWith(self.trie, word + '#')

    def startsWith(self, trie: dict, prefix: str) -> bool:
        for i, char in enumerate(prefix):
            if char == '.':
                return any(self.startsWith(t, prefix[i+1:]) for t in trie.values())
            if char not in trie:
                return False
            trie = trie[char]
        return True
```

344 ms

### #2

因为本题不需要判断前缀，所以也可以直接用哈希表。按长度分类存储，以节省时间。
 
## 解答

```python
class WordDictionary:

    def __init__(self):
        self.d = defaultdict(set)

    def addWord(self, word: str) -> None:
        self.d[len(word)].add(word)

    def search(self, word: str) -> bool:
        return any(self.isMatch(word, cand) for cand in self.d[len(word)])

    def isMatch(self, word, cand):
        return all(w in [c, '.'] for w, c in zip(word, cand))
```

136 ms



