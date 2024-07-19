# 1287：有序数组中出现次数超过25%的元素（1179 分）


> <u>**[力扣第 15 场双周赛第 1 题](https://leetcode.cn/problems/element-appearing-more-than-25-in-sorted-array/)**</u>

## 题目

<p>给你一个非递减的 <strong>有序 </strong>整数数组，已知这个数组中恰好有一个整数，它的出现次数超过数组元素总数的 25%。</p>

<p>请你找到并返回这个整数</p>



<p><strong>示例：</strong></p>

<pre>
<strong>输入：</strong>arr = [1,2,2,6,6,6,6,7,10]
<strong>输出：</strong>6
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= arr.length &lt;= 10^4</code></li>
<li><code>0 &lt;= arr[i] &lt;= 10^5</code></li>
</ul>




## 分析

题目明确有且仅有1个，因此返回频数最大的即可。

## 解答

```python
def findSpecialInteger(self, arr: List[int]) -> int:
	return Counter(arr).most_common(1)[0][0]
```
44 ms

