# 0249：最短单词距离（★）


## 题目

给定一个字符串，对该字符串可以进行 “移位” 的操作，也就是将字符串中每个字母都变为
其在字母表中后续的字母，比如："abc" -> "bcd"。这样，我们可以持续进行 “移位” 操作，从而生成如下移位序列：

	"abc" -> "bcd" -> ... -> "xyz"

给定一个包含仅小写字母字符串的列表，将该列表中所有满足 “移位” 操作规律的组合进行分组并返回。


示例：

	输入：["abc", "bcd", "acef", "xyz", "az", "ba", "a", "z"]
	输出：
	[
	  ["abc","bcd","xyz"],
	  ["az","ba"],
	  ["acef"],
	  ["a","z"]
	]
	解释：可以认为字母表首尾相接，所以 'z' 的后续为 'a'，所以 ["az","ba"] 也满足 “移位” 操作规律。

## 分析

典型的哈希表，按特征分组。

这里共同的特征是相邻字母的偏移量相同，因此转为字符串作为键值即可。

## 解答

```python
def groupStrings(self, strings: List[str]) -> List[List[str]]:
    d = defaultdict(list)
    for w in strings:
        key = ''.join(chr((ord(b)-ord(a))%26) for a,b in pairwise(w))
        d[key].append(w)
    return list(d.values())
```
40 ms
