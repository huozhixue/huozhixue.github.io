# 0225：用队列实现栈


> <u>**[力扣第 225 题](https://leetcode.cn/problems/implement-stack-using-queues/)**</u>

## 题目

<p>请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作（<code>push</code>、<code>top</code>、<code>pop</code> 和 <code>empty</code>）。</p>

<p>实现 <code>MyStack</code> 类：</p>

<ul>
<li><code>void push(int x)</code> 将元素 x 压入栈顶。</li>
<li><code>int pop()</code> 移除并返回栈顶元素。</li>
<li><code>int top()</code> 返回栈顶元素。</li>
<li><code>boolean empty()</code> 如果栈是空的，返回 <code>true</code> ；否则，返回 <code>false</code> 。</li>
</ul>



<p><strong>注意：</strong></p>

<ul>
<li>你只能使用队列的标准操作 —— 也就是 <code>push to back</code>、<code>peek/pop from front</code>、<code>size</code> 和 <code>is empty</code> 这些操作。</li>
<li>你所使用的语言也许不支持队列。 你可以使用 list （列表）或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。</li>
</ul>



<p><strong>示例：</strong></p>

<pre>
<strong>输入：</strong>
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
<strong>输出：</strong>
[null, null, null, 2, 2, false]

<strong>解释：</strong>
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // 返回 2
myStack.pop(); // 返回 2
myStack.empty(); // 返回 False
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= x &lt;= 9</code></li>
<li>最多调用<code>100</code> 次 <code>push</code>、<code>pop</code>、<code>top</code> 和 <code>empty</code></li>
<li>每次调用 <code>pop</code> 和 <code>top</code> 都保证栈不为空</li>
</ul>



<p><strong>进阶：</strong>你能否仅用一个队列来实现栈。</p>


**相似问题：**
- [0232：用栈实现队列](/leetcode/0232)


## 分析


要求队列实现， push 时加入元素，再把前面所有元素弹出加到后面即可。

## 解答

```python
class MyStack:

    def __init__(self):
        self.q = deque()

    def push(self, x: int) -> None:
        self.q.append(x)
        for _ in range(len(self.q)-1):
            self.q.append(self.q.popleft())

    def pop(self) -> int:
        return self.q.popleft()

    def top(self) -> int:
        return self.q[0]

    def empty(self) -> bool:
        return not self.q
```
34 ms
