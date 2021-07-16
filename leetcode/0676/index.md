# 0676：实现一个魔法字典（★★）


## 题目

设计一个使用单词列表进行初始化的数据结构，单词列表中的单词 互不相同 。 
如果给出一个单词，请判定能否只将这个单词中一个字母换成另一个字母，使得所形成的新单词存在于你构建的字典中。

实现 MagicDictionary 类：

- MagicDictionary() 初始化对象
- void buildDict(String[] dictionary) 使用字符串数组 dictionary 设定该数据结构，dictionary 中的字符串互不相同
- bool search(String searchWord) 给定一个字符串 searchWord ，判定能否只将字符串中 一个 字母换成另一个字母，
使得所形成的新字符串能够与字典中的任一字符串匹配。如果可以，返回 true ；否则，返回 false 。

提示：

- 1 <= dictionary.length <= 100
- 1 <= dictionary[i].length <= 100
- dictionary[i] 仅由小写英文字母组成
- dictionary 中的所有字符串 互不相同
- 1 <= searchWord.length <= 100
- searchWord 仅由小写英文字母组成
- buildDict 仅在 search 之前调用一次
- 最多调用 100 次 search

<!--more--> 
 
示例：

	输入
	["MagicDictionary", "buildDict", "search", "search", "search", "search"]
	[[], [["hello", "leetcode"]], ["hello"], ["hhllo"], ["hell"], ["leetcoded"]]
	输出
	[null, null, false, true, false, false]

	解释
	MagicDictionary magicDictionary = new MagicDictionary();
	magicDictionary.buildDict(["hello", "leetcode"]);
	magicDictionary.search("hello"); // 返回 False
	magicDictionary.search("hhllo"); // 将第二个 'h' 替换为 'e' 可以匹配 "hello" ，所以返回 True
	magicDictionary.search("hell"); // 返回 False
	magicDictionary.search("leetcoded"); // 返回 False


	 
## 分析

### #1

dictionary 的规模很小。因此最简单的就是按长度存在哈希表中，查询时遍历所有长度相同的单词判断即可。

```python
class MagicDictionary:

    def __init__(self):
        self.d = defaultdict(list)

    def buildDict(self, dictionary: List[str]) -> None:
        for word in dictionary:
            self.d[len(word)].append(word)

    def search(self, searchWord: str) -> bool:
        return any(sum(a!=b for a,b in zip(word, searchWord))==1 for word in self.d[len(searchWord)])
```

184 ms

### #2

当 dictionary 的规模较大时，有个更巧妙的方法。

可以将 word 的某一位改为 '*' 作为 word 的 key。例如 hit 的 key 为 '*it'、'h*t'、'hi*'。

那么先将 dictionary 按 key 存在哈希表中，查询时找与 word 不同但 key 相同的单词即可。


## 解答

```python
class MagicDictionary:

    def __init__(self):
        self.d = defaultdict(list)

    def buildDict(self, dictionary: List[str]) -> None:
        for word in dictionary:
            for i in range(len(word)):
                key = word[:i] + '*' + word[i+1:]
                self.d[key].append(word)

    def search(self, searchWord: str) -> bool:
        for i in range(len(searchWord)):
            key = searchWord[:i] + '*' + searchWord[i+1:]
            for word in self.d[key]:
                if word != searchWord:
                    return True
        return False
```

264 ms
