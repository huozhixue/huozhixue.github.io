# 0744：寻找比目标字母大的最小字母（★）


## 题目

给你一个排序后的字符列表 letters ，列表中只包含小写英文字母。另给出一个目标字母 target，请你寻找在这一有序列表里比目标字母大的最小字母。

在比较时，字母是依序循环出现的。举个例子：

如果目标字母 target = 'z' 并且字符列表为 letters = ['a', 'b']，则答案返回 'a'


 <!--more--> 
 
示例：

	输入:
	letters = ["c", "f", "j"]
	target = "a"
	输出: "c"

	输入:
	letters = ["c", "f", "j"]
	target = "c"
	输出: "f"

	输入:
	letters = ["c", "f", "j"]
	target = "d"
	输出: "f"

	输入:
	letters = ["c", "f", "j"]
	target = "g"
	输出: "j"

	输入:
	letters = ["c", "f", "j"]
	target = "j"
	输出: "c"

	输入:
	letters = ["c", "f", "j"]
	target = "k"
	输出: "c"



## 分析

### #1

遍历找到第一个比 target 大的字母即可。如果都比 target 小，那么按照循环应该返回 letters[0]。

```python
def nextGreatestLetter(self, letters: List[str], target: str) -> str:
	for letter in letters:
		if letter > target:
			return letter
	return letters[0]
```

124 ms

### #2

也可以二分查找从最右边将 target 插入 nums 的位置 i。如果 i == len(letters)，那么应该返回 letters[0]。

## 解答

```python
def nextGreatestLetter(self, letters: List[str], target: str) -> str:
	return letters[bisect_right(letters, target) % (len(letters))]
```

124 ms

