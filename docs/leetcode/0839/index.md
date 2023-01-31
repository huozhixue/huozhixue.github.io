# 0839：相似字符串组（★★）


> **第 85 场周赛第 4 题**

## 题目

如果交换字符串 X 中的两个不同位置的字母，使得它和字符串 Y 相等，那么称 X 和 Y 两个字符串相似。
如果这两个字符串本身是相等的，那它们也是相似的。

例如，"tars" 和 "rats" 是相似的 (交换 0 与 2 的位置)； "rats" 和 "arts" 也是相似的，
但是 "star" 不与 "tars"，"rats"，或 "arts" 相似。

总之，它们通过相似性形成了两个关联组：{"tars", "rats", "arts"} 和 {"star"}。
注意，"tars" 和 "arts" 是在同一组中，即使它们并不相似。形式上，对每个组而言，
要确定一个单词在组中，只需要这个词和该组中至少一个单词相似。

给你一个字符串列表 strs。列表中的每个字符串都是 strs 中其它所有字符串的一个字母异位词。
请问 strs 中有多少个相似字符串组？

提示：

- 1 <= strs.length <= 300
- 1 <= strs[i].length <= 300
- strs[i] 只包含小写字母。
- strs 中的所有单词都具有相同的长度，且是彼此的字母异位词。
 
示例 1：

    输入：strs = ["tars","rats","arts","star"]
    输出：2

示例 2：
    
    输入：strs = ["omv","ovm"]
    输出：1
     
 
## 分析

典型的并查集应用。将相似的字符串连通，分到一组，最后统计有多少组即可。

## 解答

```python
def numSimilarGroups(self, strs: List[str]) -> int:
    def find(i):
        if p[i] != i:
            p[i] = find(p[i])
        return p[i]

    def union(i, j):
        p[find(i)] = find(j)

    def is_sim(s1, s2):
        cnt = 0
        for x, y in zip(s1, s2):
            cnt += (x != y)
            if cnt > 2:
                return False
        return True

    n = len(strs)
    p = list(range(n))
    for i in range(n):
        for j in range(i+1, n):
            if is_sim(strs[i], strs[j]):
                union(i, j)
    return sum(p[i]==i for i in range(n))
```
276 ms

