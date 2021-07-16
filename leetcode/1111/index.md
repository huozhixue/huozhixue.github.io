# 1111：有效括号的嵌套深度（★★）




## 题目

有效括号字符串 定义：对于每个左括号，都能找到与之对应的右括号，反之亦然。

嵌套深度 depth 定义：即有效括号字符串嵌套的层数，depth(A) 表示有效括号字符串 A 的嵌套深度。

有效括号字符串类型与对应的嵌套深度计算方法如下图所示：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/04/01/1111.png)

给你一个「有效括号字符串」 seq，请你将其分成两个不相交的有效括号字符串，A 和 B，并使这两个字符串的深度最小。

- 不相交：每个 seq[i] 只能分给 A 和 B 二者中的一个，不能既属于 A 也属于 B 。
- A 或 B 中的元素在原字符串中可以不连续。
- A.length + B.length = seq.length
- 深度最小：max(depth(A), depth(B)) 的可能取值最小。 

划分方案用一个长度为 seq.length 的答案数组 answer 表示，编码规则如下：

- answer[i] = 0，seq[i] 分给 A 。
- answer[i] = 1，seq[i] 分给 B 。

如果存在多个满足要求的答案，只需返回其中任意 一个 即可。


 <!--more--> 
 
示例 1：

	输入：seq = "(()())"
	输出：[0,1,1,1,1,0]
	
示例 2：

	输入：seq = "()(())()"
	输出：[0,0,0,1,1,0,1,1]
	解释：本示例答案不唯一。
	按此输出 A = "()()", B = "()()", max(depth(A), depth(B)) = 1，它们的深度最小。
	像 [1,1,1,0,0,1,1,1]，也是正确结果，其中 A = "()()()", B = "()", max(depth(A), depth(B)) = 1 。 


## 分析

### #1

从 1614 中可知，令 diff 代表当前左右括号个数之差，即可求出当前的嵌套深度。

为了使拆分后的深度最小，可以将嵌套深度为偶数的都给 A，为奇数的都给 B，从而尽量接近最大深度的一半。

```python
def maxDepthAfterSplit(self, seq: str) -> List[int]:
	res, diff = [], 0
	for char in seq:
		if char == '(':
			diff += 1
			res.append(diff%2)
		else:
			res.append(diff%2)
			diff -= 1
	return res
```

60 ms

### #2

观察可知，将 diff-=1 改成 diff+=1 不会影响答案。所以 diff 就可以直接用位置 i 代替，简化代码。


## 解答

```python
def maxDepthAfterSplit(self, seq: str) -> List[int]:
	return [1-i%2 if char=='(' else i%2 for i,char in enumerate(seq)]
```

60 ms

