# 0066：加一


## 题目

给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

提示：

- 1 <= digits.length <= 100
- 0 <= digits[i] <= 9


<!--more--> 

示例 1：

	输入：digits = [1,2,3]
	输出：[1,2,4]
	解释：输入数组表示数字 123。
	
示例 2：

	输入：digits = [4,3,2,1]
	输出：[4,3,2,2]
	解释：输入数组表示数字 4321。
	
示例 3：

	输入：digits = [0]
	输出：[1]


## 分析

模拟进位加法即可，若最终还有进位，需要在数组最前面加一位。


## 解答

```python
def plusOne(self, digits: List[int]) -> List[int]:
	carry = 1
	for i in range(len(digits)-1, -1, -1):
		s = digits[i] + carry
		digits[i], carry = s%10, s//10
	if carry:
		digits = [carry] + digits
	return digits
```

36 ms
