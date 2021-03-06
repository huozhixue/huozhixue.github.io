# 0225：用队列实现栈


## 题目

请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通队列的全部四种操作（push、top、pop 和 empty）。

实现 MyStack 类：

- void push(int x) 将元素 x 压入栈顶。
- int pop() 移除并返回栈顶元素。
- int top() 返回栈顶元素。
- boolean empty() 如果栈是空的，返回 true ；否则，返回 false 。
 
每次调用 pop 和 top 都保证栈不为空 

注意：

- 你只能使用队列的基本操作 —— 也就是 push to back、peek/pop from front、size 和 is empty 这些操作。
- 你所使用的语言也许不支持队列。 你可以使用 list （列表）或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。

<!--more--> 

示例：

	输入：
	["MyStack", "push", "push", "top", "pop", "empty"]
	[[], [1], [2], [], [], []]
	输出：
	[null, null, null, 2, 2, false]

	解释：
	MyStack myStack = new MyStack();
	myStack.push(1);
	myStack.push(2);
	myStack.top(); // 返回 2
	myStack.pop(); // 返回 2
	myStack.empty(); // 返回 False

## 分析

### #1

python 一般直接用 list 作为栈。

```python
class MyStack:

    def __init__(self):
        self.stack = []

    def push(self, x: int) -> None:
        self.stack.append(x)

    def pop(self) -> int:
        return self.stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def empty(self) -> bool:
        return not self.stack
```

40 ms

### #2

要求用队列实现，那么 pop 时只能把前面所有元素都出队再加在末尾。

## 解答

```python
class MyStack:

    def __init__(self):
        self.queue = deque()

    def push(self, x: int) -> None:
        self.queue.append(x)

    def pop(self) -> int:
        for _ in range(len(self.queue)-1):
            self.queue.append(self.queue.popleft())
        return self.queue.popleft()

    def top(self) -> int:
        return self.queue[-1]

    def empty(self) -> bool:
        return not self.queue
```

44 ms
