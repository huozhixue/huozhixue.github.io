# 1291：顺次数（1373 分）


> <u>**[力扣第 167 场周赛第 2 题](https://leetcode.cn/problems/sequential-digits/)**</u>

## 题目

<p>我们定义「顺次数」为：每一位上的数字都比前一位上的数字大 <code>1</code> 的整数。</p>

<p>请你返回由 <code>[low, high]</code> 范围内所有顺次数组成的 <strong>有序</strong> 列表（从小到大排序）。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输出：</strong>low = 100, high = 300
<strong>输出：</strong>[123,234]
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输出：</strong>low = 1000, high = 13000
<strong>输出：</strong>[1234,2345,3456,4567,5678,6789,12345]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>10 &lt;= low &lt;= high &lt;= 10^9</code></li>
</ul>


## 分析

顺次数很少，所以直接遍历构造即可。

## 解答


```python
def sequentialDigits(self, low: int, high: int) -> List[int]:
	res = []
	for L in range(len(str(low)), len(str(high))+1):
		for i in range(1, 11-L):
			x = int(''.join(map(str, range(i, i+L))))
			if low<=x<=high:
				res.append(x)
	return res
```
28 ms
