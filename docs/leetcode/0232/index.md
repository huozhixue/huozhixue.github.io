# 0232：用栈实现队列


> <u>**[力扣第 232 题](https://leetcode.cn/problems/implement-queue-using-stacks/)**</u>

## 题目

<p>请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（<code>push</code>、<code>pop</code>、<code>peek</code>、<code>empty</code>）：</p>

<p>实现 <code>MyQueue</code> 类：</p>

<ul>
<li><code>void push(int x)</code> 将元素 x 推到队列的末尾</li>
<li><code>int pop()</code> 从队列的开头移除并返回元素</li>
<li><code>int peek()</code> 返回队列开头的元素</li>
<li><code>boolean empty()</code> 如果队列为空，返回 <code>true</code> ；否则，返回 <code>false</code></li>
</ul>

<p><strong>说明：</strong></p>

<ul>
<li>你 <strong>只能</strong> 使用标准的栈操作 —— 也就是只有 <code>push to top</code>, <code>peek/pop from top</code>, <code>size</code>, 和 <code>is empty</code> 操作是合法的。</li>
<li>你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
<strong>输出：</strong>
[null, null, null, 1, 1, false]

<strong>解释：</strong>
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false
</pre>

<ul>
</ul>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= x &lt;= 9</code></li>
<li>最多调用 <code>100</code> 次 <code>push</code>、<code>pop</code>、<code>peek</code> 和 <code>empty</code></li>
<li>假设所有操作都是有效的 （例如，一个空的队列不会调用 <code>pop</code> 或者 <code>peek</code> 操作）</li>
</ul>



<p><strong>进阶：</strong></p>

<ul>
<li>你能否实现每个操作均摊时间复杂度为 <code>O(1)</code> 的队列？换句话说，执行 <code>n</code> 个操作的总时间复杂度为 <code>O(n)</code> ，即使其中一个操作可能花费较长时间。</li>
</ul>


## 分析

python 一般直接用 deque 作为队列。本题要求用栈实现，pop 时只能先把后面所有元素都出栈。

这里有个巧妙的想法，将出栈的元素依次保存到另一个栈 stack2 中，相当于反序保存了，后面要 pop 时若 stack2 还有元素，直接弹出即可。

## 解答

```python
class MyQueue:

    def __init__(self):
        self.stack1 = []
        self.stack2 = []

    def push(self, x: int) -> None:
        self.stack1.append(x)

    def pop(self) -> int:
        if self.stack2:
            return self.stack2.pop()
        for _ in range(len(self.stack1)-1):
            self.stack2.append(self.stack1.pop())
        return self.stack1.pop()

    def peek(self) -> int:
        return self.stack2[-1] if self.stack2 else self.stack1[0]

    def empty(self) -> bool:
        return not self.stack1 and not self.stack2
```
36 ms
