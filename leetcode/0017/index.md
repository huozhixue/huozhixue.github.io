# 0017：电话号码的字母组合（★）


## 题目

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。


![img](https://assets.leetcode-cn.com/aliyun-lc-upload/original_images/17_telephone_keypad.png)

<!--more--> 

示例:

	输入："23"
	输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].


## 分析

遍历 digits，每一步在上一步的基础上添加可能表示的字母。

这其实对应了一个树结构，可以用 dfs，也可以用按层迭代的方法得到结果。

## 解答

```python
def letterCombinations(self, digits: str) -> List[str]:
	d = dict(zip('23456789', ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']))
	res = ['']
	for digit in digits:
		res = [s+char for s in res for char in d[digit]]
	return res if digits else []
```

28 ms
