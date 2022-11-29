# 0167：两数之和 II - 输入有序数组（★）


## 题目

给你一个下标从 1 开始的整数数组 numbers ，该数组已按 非递减顺序排列  ，
请你从数组中找出满足相加之和等于目标数 target 的两个数。
如果设这两个数分别是 numbers[index1] 和 numbers[index2] ，
则 1 <= index1 < index2 <= numbers.length 。

以长度为 2 的整数数组 [index1, index2] 的形式返回这两个整数的下标 index1 和 index2。

你可以假设每个输入 只对应唯一的答案 ，而且你 不可以 重复使用相同的元素。

你所设计的解决方案必须只使用常量级的额外空间。


示例 1：

	输入：numbers = [2,7,11,15], target = 9
	输出：[1,2]
	解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。

示例 2：

	输入：numbers = [2,3,4], target = 6
	输出：[1,3]
	解释：2 与 4 之和等于目标数 6 。因此 index1 = 1, index2 = 3 。返回 [1, 3] 。

示例 3：

	输入：numbers = [-1,0], target = -1
	输出：[1,2]
	解释：-1 与 0 之和等于目标数 -1 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。
 

提示：
- 2 <= numbers.length <= 3 * 104
- -1000 <= numbers[i] <= 1000
- numbers 按 非递减顺序 排列
- -1000 <= target <= 1000
- 仅存在一个有效答案

## 分析

类似 {{< lc "0001" >}}，可以用哈希表。

数组有序，也可以用双指针来解决：
- 初始指针 i、j 分别指向 numbers 的首尾。
- 如果 numbers[i]+numbers[j]<target，则 numbers[i] 与任意 [i+1,j-1] 内的数相加更小，
故可以不再考虑 numbers[i]，缩小查找范围为 [i+1,j]。
- 同理，如果 numbers[i]+numbers[j]>target，可以缩小查找范围为 [i, j-1]。
- 循环操作直到找到结果即可
 
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

