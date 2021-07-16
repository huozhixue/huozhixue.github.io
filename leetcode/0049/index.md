# 0049：字母异位词分组（★）


## 题目

给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

说明：

- 所有输入均为小写字母。
- 不考虑答案输出的顺序。
 
<!--more--> 

示例:

	输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
	输出:
	[
	  ["ate","eat","tea"],
	  ["nat","tan"],
	  ["bat"]
	]


## 分析 


显然字母异位词排序后相同，所以将排序后的字符串作为键存到哈希表即可。


## 解答

```python
def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
	d = defaultdict(list)
	for s in strs:
		key = ''.join(sorted(s))
		d[key].append(s)
	return list(d.values())
```

60 ms

