# 0560：和为K的子数组（★★）


## 题目

给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数。


 <!--more--> 
 
示例 1 :

	输入:nums = [1,1,1], k = 2
	输出: 2 , [1,1] 与 [1,1] 为两种不同的情况。
	
## 分析

### #1

求任意子数组的和，容易想到前缀和。
得到前缀和数组 pre 后，就是找 i < j 使得 pre[j]-pre[i]==k。

查找定值容易想到哈希表，遍历时边存边查即可。

```python
def subarraySum(self, nums: List[int], k: int) -> int:
	pre = list(accumulate([0]+nums))
	res, ct = 0, Counter()
	for val in pre:
		res += ct[val-k]
		ct[val] += 1
	return res
```

116 ms

### #2

也可以合并为一趟解决。


## 解答

```python
def subarraySum(self, nums: List[int], k: int) -> int:
	res, pre, ct = 0, 0, Counter([0])
	for val in nums:
		pre += val
		res += ct[pre-k]
		ct[pre] += 1
	return res
```

116 ms

