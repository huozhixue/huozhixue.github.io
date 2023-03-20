# 0267：回文排列 II（★★★）


## 题目

给定一个字符串 s ，返回 其重新排列组合后可能构成的所有回文字符串，并去除重复的组合 。

你可以按 任意顺序 返回答案。如果 s 不能形成任何回文排列时，则返回一个空列表。

 

示例 1：

	输入: s = "aabb"
	输出: ["abba", "baab"]

示例 2：

	输入: s = "abc"
	输出: []
	 

提示：
- 1 <= s.length <= 16
- s 仅由小写英文字母组成

## 分析

{{< lc "0266" >}} 升级版。

回文字符串的前一半和后一半对称，中间最多一个单独的字符。

因此，先通过计数器，拿到前一半和可能的中间字符，遍历前一半的所有排列并去重即可。


## 解答

```python
def generatePalindromes(self, s: str) -> List[str]:
    half, mid = '', ''
    for c, freq in Counter(s).items():
        half += c*(freq//2)
        mid += c*(freq%2)
    if len(mid)>1:
        return []
    return [''.join(sub)+mid+''.join(sub)[::-1] for sub in set(permutations(half))]
```
52 ms

