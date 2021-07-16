# 0126：单词接龙 II(★★★)


## 题目

给定两个单词（beginWord 和 endWord）和一个字典 wordList，找出所有从 beginWord 到 endWord 的最短转换序列。
转换需遵循如下规则：

- 每次转换只能改变一个字母。
- 转换后得到的单词必须是字典中的单词。

说明:

- 如果不存在这样的转换序列，返回一个空列表。
- 所有单词具有相同的长度。
- 所有单词只由小写字母组成。
- 字典中不存在重复的单词。
- 你可以假设 beginWord 和 endWord 是非空的，且二者不相同。


<!--more--> 

示例 1:

	输入:
	beginWord = "hit",
	endWord = "cog",
	wordList = ["hot","dot","dog","lot","log","cog"]

	输出:
	[
	  ["hit","hot","dot","dog","cog"],
	  ["hit","hot","lot","log","cog"]
	]

示例 2:

	输入:
	beginWord = "hit"
	endWord = "cog"
	wordList = ["hot","dot","dog","lot","log"]

	输出: []

	解释: endWord "cog" 不在字典中，所以不存在符合要求的转换序列。


## 分析

可以先用 0127 的代码找到最短序列长度 T，要求的就是从 beginWord 到 endWord 的长度为 T 的所有序列。

发现可以递归。用辅助函数 help(word, t) 表示从 word 到 endWord 的长度为 t 的所有序列。那么：

	help(word, t) = [[word]+path for w in nxt(word) for path in help(w, t-1)]
	其中 nxt(word) 是 word 能转换到的单词列表

	再考虑下边界情况 help(word, 1) = [[word]] if word == endWord else [] 。

## 解答

```python
def findLadders(self, beginWord: str, endWord: str, wordList: List[str]) -> List[List[str]]:
    def ladderLength():
        queue, vis = deque([(beginWord, 1)]), {beginWord}
        while queue:
            word, T = queue.popleft()
            for key in gen_key(word):
                for w in d[key]:
                    if w not in vis:
                        if w == endWord:
                            return T + 1
                        vis.add(w)
                        queue.append((w, T+1))
        return 1

    @lru_cache(None)
    def help(word, t):
        if t == 1:
            return [[word]] if word == endWord else []
        return [[word]+path for key in gen_key(word) for w in d[key] for path in help(w, t-1)]

    d = defaultdict(list)
    gen_key = lambda w: [w[:i] + '*' + w[i+1:] for i in range(len(w))]
    for word in wordList:
        for key in gen_key(word):
            d[key].append(word)
    T = ladderLength()
    return help(beginWord, T)
```

924 ms


