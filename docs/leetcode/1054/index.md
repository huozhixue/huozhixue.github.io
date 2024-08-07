# 1054：距离相等的条形码（1701 分）


> <u>**[力扣第 138 场周赛第 4 题](https://leetcode.cn/problems/distant-barcodes/)**</u>

## 题目

<p>在一个仓库里，有一排条形码，其中第 <code>i</code> 个条形码为 <code>barcodes[i]</code>。</p>

<p>请你重新排列这些条形码，使其中任意两个相邻的条形码不能相等。 你可以返回任何满足该要求的答案，此题保证存在答案。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>barcodes = [1,1,1,2,2,2]
<strong>输出：</strong>[2,1,2,1,2,1]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>barcodes = [1,1,1,1,2,2,3,3]
<strong>输出：</strong>[1,3,1,3,2,1,2,1]</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= barcodes.length &lt;= 10000</code></li>
<li><code>1 &lt;= barcodes[i] &lt;= 10000</code></li>
</ul>




## 分析

与 {{< lc "0767" >}} 非常相似，贪心即可。


## 解答

```python
def rearrangeBarcodes(self, barcodes: List[int]) -> List[int]:
	n, ct = len(barcodes), Counter(barcodes)
	res, cur = [0] * n, 1
	for num, freq in ct.items():
		if freq == (n+1) // 2 and not res[0]:
			res[0::2] = [num] * freq
		else:
			for _ in range(freq):
				res[cur] = num
				cur = cur + 2 if cur + 2 < n else 0
	return res
```

96 ms

