# 0648：单词替换（★★）


## 题目

在英语中，我们有一个叫做 词根(root)的概念，它可以跟着其他一些词组成另一个较长的单词——我们称这个词为 继承词(successor)。例如，词根an，跟随着单词 other(其他)，可以形成新的单词 another(另一个)。

现在，给定一个由许多词根组成的词典和一个句子。你需要将句子中的所有继承词用词根替换掉。如果继承词有许多可以形成它的词根，则用最短的词根替换它。

你需要输出替换之后的句子。

sentence 中单词之间由一个空格隔开。sentence 没有前导或尾随空格。


 <!--more--> 
 
示例 1：

	输入：dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
	输出："the cat was rat by the bat"

示例 2：

	输入：dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"
	输出："a a b c"

示例 3：

	输入：dictionary = ["a", "aa", "aaa", "aaaa"], sentence = "a aa a aaaa aaa aaa aaa aaaaaa bbb baba ababa"
	输出："a a a a a a a a bbb baba a"

示例 4：

	输入：dictionary = ["catt","cat","bat","rat"], sentence = "the cattle was rattled by the battery"
	输出："the cat was rat by the bat"

示例 5：

	输入：dictionary = ["ac","ab"], sentence = "it is abnormal that this solution is accepted"
	输出："it is ab that this solution is ac"

 
## 分析

容易想到用前缀树，先将词根插入，再对句子的每个单词搜索最短词根。

插入词根时在末尾标记并保存词根，方便后面的操作。

## 解答

```python
def replaceWords(self, dictionary: List[str], sentence: str) -> str:
	def replace(word):
		p = trie
		for char in word:
			if '#' in p or char not in p:
				break
			p = p[char]
		return p.get('#', word)

	T = lambda: defaultdict(T)
	trie = T()
	for word in dictionary:
		reduce(dict.__getitem__, word, trie)['#'] = word
	return ' '.join(map(replace, sentence.split()))
```

72 ms

