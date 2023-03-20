# 0269：火星词典（★★）


## 题目

现有一种使用英语字母的火星语言，这门语言的字母顺序与英语顺序不同。

给你一个字符串列表 words ，作为这门语言的词典，words 中的字符串已经 按这门新语言的字母顺序进行了排序 。

请你根据该词典还原出此语言中已知的字母顺序，并 按字母递增顺序 排列。若不存在合法字母顺序，返回 "" 。
若存在多种可能的合法字母顺序，返回其中 任意一种 顺序即可。

字符串 s 字典顺序小于 字符串 t 有两种情况：
- 在第一个不同字母处，如果 s 中的字母在这门外星语言的字母顺序中位于 t 中字母之前，
那么 s 的字典顺序小于 t 。
- 如果前面 min(s.length, t.length) 字母都相同，那么 s.length < t.length 时，s 的字典顺序也小于 t 。
 

示例 1：

	输入：words = ["wrt","wrf","er","ett","rftt"]
	输出："wertf"

示例 2：

	输入：words = ["z","x"]
	输出："zx"

示例 3：

	输入：words = ["z","x","z"]
	输出：""
	解释：不存在合法字母顺序，因此返回 "" 。
	 

提示：
- 1 <= words.length <= 100
- 1 <= words[i].length <= 100
- words[i] 仅由小写英文字母组成

## 分析

根据相邻单词的比较，可以得到一些字母的大小关系。

将字母看作顶点，大小关系看作有向边，即转为拓扑排序问题。

注意词典可能本身排序就错误，此时应该直接返回 ''。


## 解答

```python
def alienOrder(self, words: List[str]) -> str:
    nxt, indeg = defaultdict(list), defaultdict(int)
    for w1, w2 in pairwise(words):
        if w1 != w2 and w1.startswith(w2):
            return ''
        for a,b in zip(w1, w2):
            if a!=b:
                nxt[a].append(b)
                indeg[b] += 1
                break
    A = {c for w in words for c in w}
    Q = deque(u for u in A if indeg[u]==0)
    res = ''
    while Q:
        u = Q.popleft()
        res += u
        for v in nxt[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                Q.append(v)
    return res if len(res)==len(A) else ''
```
32 ms

