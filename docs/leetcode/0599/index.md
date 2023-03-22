# 0599：两个列表的最小索引总和


> <u>**[力扣第 599 题](https://leetcode.cn/problems/minimum-index-sum-of-two-lists/)**</u>

## 题目

<p>假设 Andy 和 Doris 想在晚餐时选择一家餐厅，并且他们都有一个表示最喜爱餐厅的列表，每个餐厅的名字用字符串表示。</p>

<p>你需要帮助他们用<strong>最少的索引和</strong>找出他们<strong>共同喜爱的餐厅</strong>。 如果答案不止一个，则输出所有答案并且不考虑顺序。 你可以假设答案总是存在。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入: </strong>list1 = ["Shogun", "Tapioca Express", "Burger King", "KFC"]，list2 = ["Piatti", "The Grill at Torrey Pines", "Hungry Hunter Steakhouse", "Shogun"]
<strong>输出:</strong> ["Shogun"]
<strong>解释:</strong> 他们唯一共同喜爱的餐厅是“Shogun”。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong>list1 = ["Shogun", "Tapioca Express", "Burger King", "KFC"]，list2 = ["KFC", "Shogun", "Burger King"]
<strong>输出:</strong> ["Shogun"]
<strong>解释:</strong> 他们共同喜爱且具有最小索引和的餐厅是“Shogun”，它有最小的索引和1(0+1)。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= list1.length, list2.length &lt;= 1000</code></li>
<li><code>1 &lt;= list1[i].length, list2[i].length &lt;= 30</code> </li>
<li><code>list1[i]</code> 和 <code>list2[i]</code> 由空格<meta charset="UTF-8" /> <code>' '</code> 和英文字母组成。</li>
<li><code>list1</code> 的所有字符串都是 <strong>唯一</strong> 的。</li>
<li><code>list2</code> 中的所有字符串都是 <strong>唯一</strong> 的。</li>
</ul>


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

