# 0127：单词接龙（★★★）


## 题目


字典 wordList 中从单词 beginWord 和 endWord 的 转换序列 是一个按下述规格形成的序列 
beginWord -> s1 -> s2 -> ... -> sk：
- 每一对相邻的单词只差一个字母。
- 对于 1 <= i <= k 时，每个 si 都在 wordList 中。注意， beginWord 不需要在 wordList 中。
- sk == endWord

给你两个单词 beginWord 和 endWord 和一个字典 wordList ，返回 从 beginWord 到 endWord 的 
最短转换序列 中的 单词数目 。如果不存在这样的转换序列，返回 0 。

 
示例 1：

	输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
	输出：5
	解释：一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog", 返回它的长度 5。

示例 2：

	输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
	输出：0
	解释：endWord "cog" 不在字典中，所以无法进行转换。
 

提示：
- 1 <= beginWord.length <= 10
- endWord.length == beginWord.length
- 1 <= wordList.length <= 5000
- wordList[i].length == beginWord.length
- beginWord、endWord 和 wordList[i] 由小写英文字母组成
- beginWord != endWord
- wordList 中的所有字符串 互不相同



## 分析

显然可以用 bfs，从 beginWord 开始，每一轮搜索能转换的单词，直到搜到 endWord 或没有能转换的单词。

搜索过程类似 {{< lc "0676" >}}：
- 将单词的某一位改为 '.' 作为单词的 key
- 每个单词按所有的 key 存在哈希表中
- 搜索时，取所有 key 对应的列表即可

## 解答

```python
def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
    d = defaultdict(list)
    for w in wordList:
        for i in range(len(w)):
            d[w[:i]+'.'+w[i+1:]].append(w)
    Q, dis = deque([beginWord]), {beginWord: 1}
    while Q:
        u = Q.popleft()
        if u == endWord:
            return dis[u]
        for i in range(len(u)):
            for v in d[u[:i]+'.'+u[i+1:]]:
                if v not in dis:
                    dis[v] = dis[u]+1
                    Q.append(v)
    return 0
```
84 ms



