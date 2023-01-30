# 0676：实现一个魔法字典（★★）


> **第 49 场双周赛第 2 题**

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

因为单词的长度较短且只含小写字母，所以可以遍历所有能转换得到的单词，判断是否在字典中即可。

还有个巧妙的想法，可以将单词的某一位改为 '.' 作为单词的 key。
例如 hit 的 key 为 '.it'、'h.t'、'hi.'。

那么先将字典中的单词按所有的 key 存在哈希表中，查询时找 key 相同且不同的单词即可。

## 解答

```python
class MagicDictionary:

    def __init__(self):
        self.d = defaultdict(set)

    def buildDict(self, dictionary: List[str]) -> None:
        for word in dictionary:
            for i in range(len(word)):
                key = word[:i] + '.' + word[i+1:]
                self.d[key].add(word)

    def search(self, searchWord: str) -> bool:
        for i in range(len(searchWord)):
            key = searchWord[:i] + '.' + searchWord[i+1:]
            if key in self.d and (len(self.d[key]) > 1 or searchWord not in self.d[key]):
                return True
        return False
```
192 ms
