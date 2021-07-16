# 0155：最小栈（★）


## 题目

设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

- push(x) —— 将元素 x 推入栈中。
- pop() —— 删除栈顶的元素。
- top() —— 获取栈顶元素。
- getMin() —— 检索栈中的最小元素。


<!--more--> 

示例:

	输入：
	["MinStack","push","push","push","getMin","pop","top","getMin"]
	[[],[-2],[0],[-3],[],[],[],[]]

	输出：
	[null,null,null,null,-3,null,0,-2]

	解释：
	MinStack minStack = new MinStack();
	minStack.push(-2);
	minStack.push(0);
	minStack.push(-3);
	minStack.getMin();   --> 返回 -3.
	minStack.pop();
	minStack.top();      --> 返回 0.
	minStack.getMin();   --> 返回 -2.

## 分析

数组 A 的前缀最小值 min(A[:i]) 可以递推得到。同理，入栈元素时也保存当前栈中的最小元素，可以递推得到。

## 解答

```python
class MinStack:

    def __init__(self):
        self.stack = []

    def push(self, val: int) -> None:
        Min = min(self.stack[-1][1], val) if self.stack else val
        self.stack.append((val, Min))

    def pop(self) -> None:
        self.stack.pop()

    def top(self) -> int:
        return self.stack[-1][0]

    def getMin(self) -> int:
        return self.stack[-1][1]
```

76 ms


