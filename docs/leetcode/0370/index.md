# 0370：区间加法（★）


> <u>**[力扣第 370 题](https://leetcode.cn/problems/range-addition/)**</u>

## 题目

<p>假设你有一个长度为 <em><strong>n</strong></em> 的数组，初始情况下所有的数字均为 <strong>0</strong>，你将会被给出 <em><strong>k</strong></em>​​​​​​<em>​</em> 个更新的操作。</p>

<p>其中，每个操作会被表示为一个三元组：<strong>[startIndex, endIndex, inc]</strong>，你需要将子数组 <strong>A[startIndex ... endIndex]</strong>（包括 startIndex 和 endIndex）增加 <strong>inc</strong>。</p>

<p>请你返回 <strong><em>k</em></strong> 次操作后的数组。</p>

<p><strong>示例:</strong></p>

<pre><strong>输入: </strong>length = 5, updates = [[1,3,2],[2,4,3],[0,2,-2]]
<strong>输出: </strong>[-2,0,3,5,3]
</pre>

<p><strong>解释:</strong></p>

<pre>初始状态:
[0,0,0,0,0]

进行了操作 [1,3,2] 后的状态:
[0,2,2,2,0]

进行了操作 [2,4,3] 后的状态:
[0,2,5,5,3]

进行了操作 [0,2,-2] 后的状态:
[-2,0,3,5,3]
</pre>


## 分析

针对区间修改，用差分数组。

## 解答

```python
def getModifiedArray(self, length: int, updates: List[List[int]]) -> List[int]:
	d = [0] * (length+1)
	for s, e, w in updates:
		d[s] += w
		d[e+1] -= w
	return list(accumulate(d[:-1]))
```

40 ms
