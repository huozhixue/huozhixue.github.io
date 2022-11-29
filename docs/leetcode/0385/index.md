# 0385：迷你语法分析器（★★★）


## 题目

给定一个字符串 s 表示一个整数嵌套列表，实现一个解析它的语法分析器并返回解析的结果 NestedInteger 。

列表中的每个元素只可能是整数或整数嵌套列表


示例 1：

	输入：s = "324",
	输出：324
	解释：你应该返回一个 NestedInteger 对象，其中只包含整数值 324。

示例 2：

	输入：s = "[123,[456,[789]]]",
	输出：[123,[456,[789]]]
	解释：返回一个 NestedInteger 对象包含一个有两个元素的嵌套列表：
	1. 一个 integer 包含值 123
	2. 一个包含两个元素的嵌套列表：
		i.  一个 integer 包含值 456
		ii. 一个包含一个元素的嵌套列表
			 a. 一个 integer 包含值 789
	 

提示：
- 1 <= s.length <= 5 * 10^4
- s 由数字、方括号 "[]"、负号 '-' 、逗号 ','组成
- 用例保证 s 是可解析的 NestedInteger
- 输入中的所有值的范围是 [-10^6, 10^6]
 
## 分析

显然 s 的对象由子串递归地组成。可以用栈模拟这个过程，一趟解决。

> 特别注意数字前可能有负号。

## 解答

```python
def deserialize(self, s: str) -> NestedInteger:
    stack = [NestedInteger()]
    for left, num, right in re.findall(r'(\[)|(-?\d+)|(\])', s):
        if left:
            stack.append(NestedInteger())
        elif num:
            stack[-1].add(NestedInteger(int(num)))
        else:
            x = stack.pop()
            stack[-1].add(x)
    return stack[0].getList()[0]
```
40 ms



