# 0786：第 K 个最小的素数分数（★★）


## 题目

给你一个按递增顺序排序的数组 arr 和一个整数 k 。数组 arr 由 1 和若干 素数  组成，且其中所有整数互不相同。

对于每对满足 0 < i < j < arr.length 的 i 和 j ，可以得到分数 arr[i] / arr[j] 。

那么第 k 个最小的分数是多少呢?  以长度为 2 的整数数组返回你的答案, 这里 answer[0] == arr[i] 且 answer[1] == arr[j] 。

提示：

- 2 <= arr.length <= 1000
- 1 <= arr[i] <= 3 * 10^4
- arr[0] == 1
- arr[i] 是一个 素数 ，i > 0
- arr 中的所有数字 互不相同 ，且按 严格递增 排序
- 1 <= k <= arr.length * (arr.length - 1) / 2


 <!--more--> 
 
示例 1：

	输入：arr = [1,2,3,5], k = 3
	输出：[2,5]
	解释：已构造好的分数,排序后如下所示: 
	1/5, 1/3, 2/5, 1/2, 3/5, 2/3
	很明显第三个最小的分数是 2/5

示例 2：

	输入：arr = [1,7], k = 1
	输出：[1,7]
	 

## 分析

### #1

显然固定 i，分数随 j 增大而递减。所以按 i 将分数分为 n-1 个列表，反向归并排序取第 k 项即可。
类似 {{< lc "0378" >}}。

```python
def kthSmallestPrimeFraction(self, arr: List[int], k: int) -> List[int]:
	n = len(arr)
	pq = [(arr[i]/arr[-1], i, n-1) for i in range(min(n-1, k))]
	for _ in range(k-1):
		_, i, j = heappop(pq)
		if j-1 > i:
			heappush(pq, (arr[i]/arr[j-1], i, j-1))
	return [arr[pq[0][1]], arr[pq[0][2]]]
```

940 ms


### #2

类似 {{< lc "0378" >}}，也可以用二分查找。

## 解答

```python

```




