# 0692：前K个高频单词（★）


## 题目

给一非空的单词列表，返回前 k 个出现次数最多的单词。

返回的答案应该按单词出现频率由高到低排序。如果不同的单词有相同出现频率，按字母顺序排序。

注意：

- 假定 k 总为有效值， 1 ≤ k ≤ 集合元素数。
- 输入的单词均由小写字母组成。

尝试以 O(n log k) 时间复杂度和 O(n) 空间复杂度解决。 

 <!--more--> 
 
示例 1：

	输入: ["i", "love", "leetcode", "i", "love", "coding"], k = 2
	输出: ["i", "love"]
	解析: "i" 和 "love" 为出现次数最多的两个单词，均为2次。
		注意，按字母顺序 "i" 在 "love" 之前。
 

示例 2：

	输入: ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4
	输出: ["the", "is", "sunny", "day"]
	解析: "the", "is", "sunny" 和 "day" 是出现次数最多的四个单词，
		出现次数依次为 4, 3, 2 和 1 次。

 
## 分析

Counter 计数后，用 sort 或者 heapq.nsmallest 即可。

## 解答

```python
def topKFrequent(self, words: List[str], k: int) -> List[str]:
	ct = Counter(words)
	return nsmallest(k, ct, key=lambda x: (-ct[x], x))
```

72 ms

