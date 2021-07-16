# 0503：下一个更大元素 II（★★）


## 题目

给定一个循环数组（最后一个元素的下一个元素是数组的第一个元素），输出每个元素的下一个更大元素。
数字 x 的下一个更大的元素是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。
如果不存在，则输出 -1。

 <!--more--> 
 
示例 1:

	输入: [1,2,1]
	输出: [2,-1,2]
	解释: 第一个 1 的下一个更大的数是 2；
	数字 2 找不到下一个更大的数； 
	第二个 1 的下一个最大的数需要循环搜索，结果也是 2。


## 分析

### #1
  
类似 0739 ，只不过可以循环搜索了。因此要遍历两趟。

```python
def nextGreaterElements(self, nums: List[int]) -> List[int]:
	n = len(nums)
	res, stack = [-1]*n, []
	for i in range(n):
		while stack and nums[stack[-1]] < nums[i]:
			res[stack.pop()] = nums[i]
		stack.append(i)
	for i in range(n-1):
		while stack and nums[stack[-1]] < nums[i]:
			res[stack.pop()] = nums[i]
		stack.append(i)
	return res
```

212 ms

### #2

可以利用模运算简化代码。

## 解答

```python
def nextGreaterElements(self, nums: List[int]) -> List[int]:
	n = len(nums)
	res, stack = [-1]*n, []
	for i in range(2*n-1):
		i %= n
		while stack and nums[stack[-1]] < nums[i]:
			res[stack.pop()] = nums[i]
		stack.append(i)
	return res
```

220 ms
