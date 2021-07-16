# 1441：用栈操作构建数组（★）




## 题目

给你一个目标数组 target 和一个整数 n。每次迭代，需要从  list = {1,2,3..., n} 中依序读取一个数字。

请使用下述操作来构建目标数组 target ：

- Push：从 list 中读取一个新元素， 并将其推入数组中。
- Pop：删除数组中的最后一个元素。
- 如果目标数组构建完成，就停止读取更多元素。

题目数据保证目标数组严格递增，并且只包含 1 到 n 之间的数字。

请返回构建目标数组所用的操作序列。

题目数据保证答案是唯一的。

 
<!--more--> 

示例 1：

	输入：target = [1,3], n = 3
	输出：["Push","Push","Pop","Push"]
	解释： 
	读取 1 并自动推入数组 -> [1]
	读取 2 并自动推入数组，然后删除它 -> [1]
	读取 3 并自动推入数组 -> [1,3]

示例 2：

	输入：target = [1,2,3], n = 3
	输出：["Push","Push","Push"]

示例 3：

	输入：target = [1,2], n = 4
	输出：["Push","Push"]
	解释：只需要读取前 2 个数字就可以停止。

示例 4：

	输入：target = [2,3,4], n = 4
	输出：["Push","Pop","Push","Push","Push"]

## 分析

显然 target 中存在的数经过了 Push 操作，而中间空缺的数都经过了 Push 和 Pop 操作。
比如示例 1 中 1 和 3 之间的空缺 2，必然是加入又马上删除了。

因此用 pre 记录上一个数，遍历 target，先添加 target-pre-1 次 Push 和 Pop，再添加 1 次 Push 即可。


## 解答

```python
def buildArray(self, target: List[int], n: int) -> List[str]:
	res, pre = [], 0
	for num in target:
		res.extend(['Push', 'Pop']*(num-pre-1) + ['Push'])
		pre = num
	return res
```

28 ms


