# 0217：存在重复元素


## 题目

给定一个整数数组，判断是否存在重复元素。

如果存在一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 。

<!--more--> 

示例 1:

	输入: [1,2,3,1]
	输出: true

示例 2:

	输入: [1,2,3,4]
	输出: false

示例 3:

	输入: [1,1,1,3,3,4,3,2,4,2]
	输出: true



## 分析

典型的哈希应用，判断去重后长度是否减小即可。

## 解答

```python
def containsDuplicate(self, nums: List[int]) -> bool:
	return len(nums) != len(set(nums))
```

44 ms



