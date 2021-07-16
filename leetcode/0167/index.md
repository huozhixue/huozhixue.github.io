# 0167：两数之和 II - 输入有序数组（★）


## 题目

给定一个已按照 升序排列  的整数数组 numbers ，请你从数组中找出两个数满足相加之和等于目标数 target 。

函数应该以长度为 2 的整数数组的形式返回这两个数的下标值。
numbers 的下标 从 1 开始计数 ，所以答案数组应当满足 1 <= answer[0] < answer[1] <= numbers.length 。

你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。

提示：

- 2 <= numbers.length <= 3 * 10^4
- -1000 <= numbers[i] <= 1000
- numbers 按 递增顺序 排列
- -1000 <= target <= 1000
- 仅存在一个有效答案


 <!--more--> 

示例 1：

    输入：numbers = [2,7,11,15], target = 9
    输出：[1,2]
    解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。

示例 2：

    输入：numbers = [2,3,4], target = 6
    输出：[1,3]

示例 3：

    输入：numbers = [-1,0], target = -1
    输出：[1,2]
 


## 分析

### #1

可以直接用 {{< lc "0001" >}} 的解法。

```python
def twoSum(self, nums: List[int], target: int) -> List[int]:
	d = {}
	for i, num in enumerate(nums):
		j = d.get(target - num)
		if j is not None:
			return [j, i]
		d[num] = i
```

40 ms

### #2

不过题目添加了 数组有序 的信息，可以用双指针来解决。

    初始指针 i、j 分别指向 numbers 的首尾。
    
    如果 numbers[i]+numbers[j]<target，则 numbers[i] 与任意 [i,j] 内的数相加都小于 target。
    故 numbers[i] 必然不在结果中，可以缩小查找范围为 [i+1,j]。

    同理，如果 numbers[i]+numbers[j]>target，可以缩小查找范围为 [i, j-1]。
    
    循环操作直到找到结果即可。
 
## 解答

```python
def twoSum(self, numbers: List[int], target: int) -> List[int]:
	i, j = 0, len(numbers) - 1
	while numbers[i] + numbers[j] != target:
		if numbers[i] + numbers[j] < target:
			i += 1
		else:
			j -= 1
	return [i+1, j+1]
```

40 ms

