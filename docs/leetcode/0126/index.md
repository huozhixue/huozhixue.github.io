# 0126：单词接龙 II（★★★）


## 题目

按字典 wordList 完成从单词 beginWord 到单词 endWord 转化，一个表示此过程的 转换序列 
是形式上像 beginWord -> s1 -> s2 -> ... -> sk 这样的单词序列，并满足：
- 每对相邻的单词之间仅有单个字母不同。
- 转换过程中的每个单词 si（1 <= i <= k）必须是字典 wordList 中的单词。
注意，beginWord 不必是字典 wordList 中的单词。
- sk == endWord

给你两个单词 beginWord 和 endWord ，以及一个字典 wordList 。
请你找出并返回所有从 beginWord 到 endWord 的 最短转换序列 ，
如果不存在这样的转换序列，返回一个空列表。
每个序列都应该以单词列表 [beginWord, s1, s2, ..., sk] 的形式返回。

 

示例 1：

	输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
	输出：[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
	解释：存在 2 种最短的转换序列：
	"hit" -> "hot" -> "dot" -> "dog" -> "cog"
	"hit" -> "hot" -> "lot" -> "log" -> "cog"

示例 2：

	输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
	输出：[]
	解释：endWord "cog" 不在字典 wordList 中，所以不存在符合要求的转换序列。
 

提示：
- 1 <= beginWord.length <= 5
- endWord.length == beginWord.length
- 1 <= wordList.length <= 5000
- wordList[i].length == beginWord.length
- beginWord、endWord 和 wordList[i] 由小写英文字母组成
- beginWord != endWord
- wordList 中的所有单词 互不相同


## 分析

{{< lc "0127" >}} 升级版。

要求所有序列，考虑从 bfs 的路径中倒推：
- bfs 的过程中得到 dis 字典，保存了经过的每个单词到 beginWord 的距离
- 假设单词 w 和 endWord 相邻且 dis[w]==dis[endWord]-1，那么可以经过 w 来组成最短路径
- 依此类推，找到 beginWord 时，即得到一条最短路径
- 用回溯法可以搜索到所有最短路径

特别注意 beginWord 可能在 wordList 中，也可能不在，因此构建字典 d 时，
要遍历 set(wordList)|{beginWord}。

## 解答

```python
def findLadders(self, beginWord: str, endWord: str, wordList: List[str]) -> List[List[str]]:
    d = defaultdict(list)
    for w in set(wordList)|{beginWord}:
        for i in range(len(w)):
            d[w[:i]+'.'+w[i+1:]].append(w)
    Q, dis = deque([beginWord]), {beginWord: 1}
    while Q:
        u = Q.popleft()
        if u == endWord:
            break
        for i in range(len(u)):
            for v in d[u[:i]+'.'+u[i+1:]]:
                if v not in dis:
                    dis[v] = dis[u]+1
                    Q.append(v)
    
    def dfs(u):
        if dis[u] == 1:
            return [[u]]
        res = []
        for i in range(len(u)):
            for v in d[u[:i]+'.'+u[i+1:]]:
                if v in dis and dis[v]==dis[u]-1:
                    res.extend(sub+[u] for sub in dfs(v))
        return res

    return [] if endWord not in dis else dfs(endWord)
```
44 ms

