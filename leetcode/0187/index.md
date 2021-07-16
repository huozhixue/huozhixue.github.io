# 0187：重复的DNA序列（★★）


## 题目

所有 DNA 都由一系列缩写为 'A'，'C'，'G' 和 'T' 的核苷酸组成，例如："ACGAATTCCG"。
在研究 DNA 时，识别 DNA 中的重复序列有时会对研究非常有帮助。

编写一个函数来找出所有目标子串，目标子串的长度为 10，且在 DNA 字符串 s 中出现次数超过一次。

提示：

- 0 <= s.length <= 10^5
- s[i] 为 'A'、'C'、'G' 或 'T'

<!--more--> 


示例 1：

	输入：s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
	输出：["AAAAACCCCC","CCCCCAAAAA"]

示例 2：

	输入：s = "AAAAAAAAAAAAA"
	输出：["AAAAAAAAAA"]
 


## 分析

最简单的就是依次遍历子串，用哈希表判断是否出现过即可。	

## 解答

```python
def findRepeatedDnaSequences(self, s: str) -> List[str]:
	ct = Counter(s[i:i+10] for i in range(len(s)-9))
	return [k for k, v in ct.items() if v > 1]
```

68 ms


