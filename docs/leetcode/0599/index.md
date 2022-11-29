# 0599：两个列表的最小索引总和（★）


> **第  场周赛第  题**

## 题目

假设Andy和Doris想在晚餐时选择一家餐厅，并且他们都有一个表示最喜爱餐厅的列表，每个餐厅的名字用字符串表示。

你需要帮助他们用最少的索引和找出他们共同喜爱的餐厅。 如果答案不止一个，则输出所有答案并且不考虑顺序。 
你可以假设总是存在一个答案。

提示:
- 两个列表的长度范围都在 [1, 1000]内。
- 两个列表中的字符串的长度将在[1，30]的范围内。
- 下标从0开始，到列表的长度减1。
- 两个列表都没有重复的元素。


示例 1:

	输入:
	["Shogun", "Tapioca Express", "Burger King", "KFC"]
	["Piatti", "The Grill at Torrey Pines", "Hungry Hunter Steakhouse", "Shogun"]
	输出: ["Shogun"]
	解释: 他们唯一共同喜爱的餐厅是“Shogun”。

示例 2:

	输入:
	["Shogun", "Tapioca Express", "Burger King", "KFC"]
	["KFC", "Shogun", "Burger King"]
	输出: ["Shogun"]
	解释: 他们共同喜爱且具有最小索引和的餐厅是“Shogun”，它有最小的索引和1(0+1)。

## 分析

遍历两个列表，找到公共的元素，根据索引和修改结果即可。

注意可以先用哈希表保存一个列表的元素及索引，然后遍历另一个列表，根据哈希表即可快速查询元素。
	
## 解答

```python
def findRestaurant(self, list1: List[str], list2: List[str]) -> List[str]:
	res, Min = [], 2000
	A = {item: i for i, item in enumerate(list1)}
	for i, item in enumerate(list2):
		s = i + A.get(item, 2001)
		if s == Min:
			res.append(item)
		elif s < Min:
			res, Min = [item], s
	return res
```
52 ms

