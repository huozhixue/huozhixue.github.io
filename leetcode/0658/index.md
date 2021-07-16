# 0658：找到 K 个最接近的元素（★★）


## 题目

给定一个排序好的数组 arr ，两个整数 k 和 x ，从数组中找到最靠近 x（两数之差最小）的 k 个数。返回的结果必须要是按升序排好的。

整数 a 比整数 b 更接近 x 需要满足：

- |a - x| < |b - x| 或者
- |a - x| == |b - x| 且 a < b

1 <= k <= arr.length

 <!--more--> 

示例 1：

	输入：arr = [1,2,3,4,5], k = 4, x = 3
	输出：[1,2,3,4]

示例 2：

	输入：arr = [1,2,3,4,5], k = 4, x = -1
	输出：[1,2,3,4]

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
 

