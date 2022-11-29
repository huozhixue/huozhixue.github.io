# 0212：单词搜索 II（★★★）


## 题目

给定一个 m x n 二维字符网格 board 和一个单词（字符串）列表 words，
找出所有同时在二维网格和字典中出现的单词。

单词必须按照字母顺序，通过 相邻的单元格 内的字母构成，
其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。
同一个单元格内的字母在一个单词中不允许被重复使用。

示例 1：

![img](https://assets.leetcode.com/uploads/2020/11/07/search1.jpg)

	输入：board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
	输出：["eat","oath"]

示例 2：

![img](https://assets.leetcode.com/uploads/2020/11/07/search2.jpg)

	输入：board = [["a","b"],["c","d"]], words = ["abcb"]
	输出：[]

提示：
- m == board.length
- n == board[i].length
- 1 <= m, n <= 12
- board[i][j] 是一个小写英文字母
- 1 <= words.length <= 3 * 10^4
- 1 <= words[i].length <= 10
- words[i] 由小写英文字母组成
- words 中的所有字符串互不相同



## 分析

{{< lc "0079" >}} 的升级版，变成搜索多个单词。

单词数量太多，一个个搜会超时，考虑怎么同时搜索：
- 只要搜索路径是某一个单词的前缀，就可以继续搜索
- 否则，可以直接跳出
- 当搜索路径匹配某一个单词时，添加到结果中即可

于是想到用 trie 树，方便判断路径是否单词前缀或单词本身。

> 注意不同路径可能找到相同单词，结果要去重

## 解答


```python
def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
    def dfs(p, i, j):
        if '#' in p:
            res.add(p['#'])
        A = product(range(m),range(n)) if p==trie else [(i+1,j),(i,j+1),(i-1,j),(i,j-1)]
        for x, y in A:
            if 0 <=x<m and 0<=y<n and board[x][y] in p:
                c = board[x][y]
                board[x][y] = '0'
                dfs(p[c], x, y)
                board[x][y] = c

    m, n = len(board), len(board[0])
    T = lambda: defaultdict(T)
    trie = T()
    for word in words:
        reduce(dict.__getitem__, word, trie)['#'] = word
    res = set()
    dfs(trie, -1, -1)
    return list(res)
```
6156 ms

## *附加

针对本题有巧妙的优化：
- 找到单词的同时将 '#' 弹出，就不会搜索到相同单词，最后无需再去重
- 弹出 '#' 后，非 '#' 的叶子结点也可以弹出，无需再考虑

```python
def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
    def dfs(p, i, j):
        if '#' in p:
            res.append(p.pop('#'))
        A = product(range(m),range(n)) if p==trie else [(i+1,j),(i,j+1),(i-1,j),(i,j-1)]
        for x, y in A:
            if 0 <=x<m and 0<=y<n and board[x][y] in p:
                c = board[x][y]
                board[x][y] = '0'
                dfs(p[c], x, y)
                board[x][y] = c
                if not p[c]:
                    p.pop(c)

    m, n = len(board), len(board[0])
    T = lambda: defaultdict(T)
    trie = T()
    for word in words:
        reduce(dict.__getitem__, word, trie)['#'] = word
    res = []
    dfs(trie, -1, -1)
    return res
```
832 ms


