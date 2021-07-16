# 0127：单词接龙(★★★)


## 题目

字典 wordList 中从单词 beginWord 和 endWord 的 转换序列 是一个按下述规格形成的序列：

- 序列中第一个单词是 beginWord 。
- 序列中最后一个单词是 endWord 。
- 每次转换只能改变一个字母。
- 转换过程中的中间单词必须是字典 wordList 中的单词。

给你两个单词 beginWord 和 endWord 和一个字典 wordList ，找到从 beginWord 到 endWord 的 最短转换序列 中的 单词数目 。
如果不存在这样的转换序列，返回 0。

- 1 <= beginWord.length <= 10
- 1 <= wordList.length <= 5000
- wordList[i].length == beginWord.length == endWord.length
- beginWord、endWord 和 wordList[i] 由小写英文字母组成
- beginWord != endWord
- wordList 中的所有字符串 互不相同

<!--more--> 

示例 1：

	输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
	输出：5
	解释：一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog", 返回它的长度 5。

示例 2：

	输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
	输出：0
	解释：endWord "cog" 不在字典中，所以无法进行转换。


## 分析

### #1

显然可以用 bfs，从 beginWord 开始，每一轮搜索能转换的单词，直到搜到 endWord 或没有能转换的单词。

```python
def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
	wordList, vis = set(wordList), {beginWord}
	queue = deque([(beginWord, 1)])
	while queue:
		word, T = queue.popleft()
		for w in wordList:
			if w not in vis and sum(x!=y for x, y in zip(word, w)) == 1:
				if w == endWord:
					return T+1
				vis.add(w)
				queue.append([w, T+1])
	return 0
```

超时了

### #2

每次搜索能转换的单词都要遍历 wordList，比较耗时。有个巧妙的想法，直接遍历单词 word 所以可能的转换方式，判断是否在 wordList 中即可。
所有可能的转换方式有 26 * len(word) 种，远小于 len(wordList) 。

```python
def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
	wordList, vis = set(wordList), {beginWord}
	queue = deque([(beginWord, 1)])
	while queue:
		word, T = queue.popleft()
		for i in range(len(word)):
			for j in range(ord('a'), ord('z')+1):
				w = word[:i] + chr(j) + word[i+1:]
				if w in wordList and w not in vis:
					if w == endWord:
						return T+1
					vis.add(w)
					queue.append([w, T+1])
	return 0
```

512 ms

### #3

还有个更巧妙的想法，将 word 的某一位改为 '*' 作为 word 的 key。例如 hit 的 key 为 '*it'、'h*t'、'hi*'。

在 wordList 中找到 key 相同的单词，即是能转换的单词。
于是提前将 wordList 的单词按 key 存在哈希表中，就可以进一步减少搜索范围到 len(word)。

```python
def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
	d = defaultdict(list)
	gen_key = lambda w: [w[:i] + '*' + w[i+1:] for i in range(len(w))]
	for word in wordList:
		for key in gen_key(word):
			d[key].append(word)
	queue, vis = deque([(beginWord, 1)]), {beginWord}
	while queue:
		word, T = queue.popleft()
		for key in gen_key(word):
			for w in d[key]:
				if w not in vis:
					if w == endWord:
						return T+1
					vis.add(w)
					queue.append([w, T+1])
	return 0
```

104 ms

### #4

bfs 过程中，如果每层节点越来越多，搜索也就越来越耗时。

可以用双向 bfs，从 beginWord 和 endWord 出发，向中间遍历。每轮从节点数少的一端移动。


## 解答

```python
def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
	if endWord not in wordList:
		return 0
	d = defaultdict(list)
	gen_key = lambda w: [w[:i] + '*' + w[i+1:] for i in range(len(w))]
	for word in wordList:
		for key in gen_key(word):
			d[key].append(word)
	T, vis1, vis2 = 1, {beginWord}, {endWord}
	queue1, queue2 = deque([beginWord]), deque([endWord])
	while queue1 and queue2:
		if len(queue1) > len(queue2):
			queue1, queue2 = queue2, queue1
			vis1, vis2 = vis2, vis1
		for _ in range(len(queue1)):
			word = queue1.popleft()
			for key in gen_key(word):
				for w in d[key]:
					if w not in vis1:
						if w in vis2:
							return T+1
						vis1.add(w)
						queue1.append(w)
		T += 1
	return 0
```

72 ms



