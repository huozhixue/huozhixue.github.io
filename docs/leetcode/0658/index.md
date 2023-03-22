# 0658：找到 K 个最接近的元素（★）


> <u>**[力扣第 658 题](https://leetcode.cn/problems/find-k-closest-elements/)**</u>

## 题目

<p>给定一个 <strong>排序好</strong> 的数组 <code>arr</code> ，两个整数 <code>k</code> 和 <code>x</code> ，从数组中找到最靠近 <code>x</code>（两数之差最小）的 <code>k</code> 个数。返回的结果必须要是按升序排好的。</p>

<p>整数 <code>a</code> 比整数 <code>b</code> 更接近 <code>x</code> 需要满足：</p>

<ul>
<li><code>|a - x| &lt; |b - x|</code> 或者</li>
<li><code>|a - x| == |b - x|</code> 且 <code>a &lt; b</code></li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>arr = [1,2,3,4,5], k = 4, x = 3
<strong>输出：</strong>[1,2,3,4]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>arr = [1,2,3,4,5], k = 4, x = -1
<strong>输出：</strong>[1,2,3,4]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= k &lt;= arr.length</code></li>
<li><code>1 &lt;= arr.length &lt;= 10<sup>4</sup></code><meta charset="UTF-8" /></li>
<li><code>arr</code> 按 <strong>升序</strong> 排列</li>
<li><code>-10<sup>4</sup> &lt;= arr[i], x &lt;= 10<sup>4</sup></code></li>
</ul>


## 分析

### #1

最简单的就是根据 key = abs(a-x) 排序，前 k 项即是所求。必须返回升序结果，所以最后再排下序。

```python
def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
	res = sorted(arr, key=lambda a: abs(a-x))
	return sorted(res[:k])
```

时间复杂度 O(N*log N)，60 ms

### #2

显然要找的 k 个数是连续的，因此可以用双指针来找头尾位置。

初始令 i、j 指针分别指向 arr 头尾。如果 len(arr) == k，返回 arr 即可。否则有：

	若 abs(arr[i]-x) <= abs(arr[j]-x)，那么 j 必然不在结果中，j -= 1
	若 abs(arr[i]-x) > abs(arr[j]-x)，那么 i 必然不在结果中，i += 1

循环操作直到 j-i+1 == k 为止。

```python
def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
	n = len(arr)
	i, j = 0, n-1
	while j-i+1 != k:
		if abs(arr[i]-x) <= abs(arr[j]-x):
			j -= 1
		else:
			i += 1
	return arr[i:j+1]
```

时间复杂度 O(N)，68 ms

### #3

当 n >> k 时，显然很多遍历是不必要的。设 x 有序插入 arr 的位置是 pos，那么结果必然在 [pos-k, pos+k] 范围内。

所以初始令 i、j 分别为 max(0, pos-k)，min(n-1, pos+k)，节省时间。
 

## 解答

```python
def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
	n, pos = len(arr), bisect_left(arr, x)
	i, j = max(0, pos-k), min(n-1, pos+k)
	while j-i+1 != k:
		if abs(arr[i]-x) <= abs(arr[j]-x):
			j -= 1
		else:
			i += 1
	return arr[i:j+1]
```

时间复杂度 O(log N + k)，48 ms
 

