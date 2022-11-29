# 0187：重复的DNA序列（★★）


## 题目

DNA序列 由一系列核苷酸组成，缩写为 'A', 'C', 'G' 和 'T'.。
- 例如，"ACGAATTCCG" 是一个 DNA序列 。

在研究 DNA 时，识别 DNA 中的重复序列非常有用。

给定一个表示 DNA序列 的字符串 s ，返回所有在 DNA 分子中出现不止一次的 长度为 10 的序列(子字符串)。
你可以按 任意顺序 返回答案。


示例 1：

    输入：s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
    输出：["AAAAACCCCC","CCCCCAAAAA"]

示例 2：

    输入：s = "AAAAAAAAAAAAA"
    输出：["AAAAAAAAAA"]
     
提示：
- 0 <= s.length <= 10^5
- s[i]=='A'、'C'、'G' or 'T'

## 分析

### #1

最简单的就是依次遍历子串，用哈希表判断是否出现过即可。	

```python
def findRepeatedDnaSequences(self, s: str) -> List[str]:
    ct = Counter(s[i:i + 10] for i in range(len(s) - 9))
    return [sub for sub, freq in ct.items() if freq > 1]
```
60 ms

### #2

当子串长度较大时，朴素哈希比较耗时。更为通用的方法是滚动哈希。

## 解答

```python
def findRepeatedDnaSequences(self, s: str) -> List[str]:
    d = dict(zip('ACGT', range(4)))
    base, L = 5, 10
    w, bL = 0, base**L
    res, ct = [], Counter()
    for j, char in enumerate(s):
        w = w * base + d[char]
        if j >= L:
            w -= d[s[j-L]] * bL
        if j >= L-1:
            ct[w] += 1
            if ct[w] == 2:
                res.append(s[j-L+1:j+1])
    return res
```
88 ms


