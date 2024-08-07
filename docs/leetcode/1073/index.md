# 1073：负二进制数相加（1806 分）


> <u>**[力扣第 139 场周赛第 3 题](https://leetcode.cn/problems/adding-two-negabinary-numbers/)**</u>

## 题目

<p>给出基数为 <strong>-2</strong> 的两个数 <code>arr1</code> 和 <code>arr2</code>，返回两数相加的结果。</p>

<p>数字以 <em>数组形式</em><strong> </strong>给出：数组由若干 0 和 1 组成，按最高有效位到最低有效位的顺序排列。例如，<code>arr = [1,1,0,1]</code> 表示数字 <code>(-2)^3 + (-2)^2 + (-2)^0 = -3</code>。<em>数组形式</em> 中的数字 <code>arr</code> 也同样不含前导零：即 <code>arr == [0]</code> 或 <code>arr[0] == 1</code>。</p>

<p>返回相同表示形式的 <code>arr1</code> 和 <code>arr2</code> 相加的结果。两数的表示形式为：不含前导零、由若干 0 和 1 组成的数组。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>arr1 = [1,1,1,1,1], arr2 = [1,0,1]
<strong>输出：</strong>[1,0,0,0,0]
<strong>解释：</strong>arr1 表示 11，arr2 表示 5，输出表示 16 。
</pre>

<p><meta charset="UTF-8" /></p>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>arr1 = [0], arr2 = [0]
<strong>输出：</strong>[0]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>arr1 = [0], arr2 = [1]
<strong>输出：</strong>[1]
</pre>



<p><strong>提示：</strong></p>
<meta charset="UTF-8" />

<ul>
<li><code>1 &lt;= arr1.length, arr2.length &lt;= 1000</code></li>
<li><code>arr1[i]</code> 和 <code>arr2[i]</code> 都是 <code>0</code> 或 <code>1</code></li>
<li><code>arr1</code> 和 <code>arr2</code> 都没有前导0</li>
</ul>




## 分析

模拟进位加法即可，因为是负进制，所以进位数 carry 要取反。

最后注意要去掉前导0。

## 解答


```python
def addNegabinary(self, arr1: List[int], arr2: List[int]) -> List[int]:
	res, carry = [], 0
	while arr1 or arr2 or carry:
		a, b = arr1.pop() if arr1 else 0, arr2.pop() if arr2 else 0
		carry, r = divmod(a+b-carry, 2)
		res.append(r)
	while len(res)>1 and res[-1]==0:
		res.pop()
	return res[::-1]
```
36 ms
