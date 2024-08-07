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


**相似问题：**
- [0225：用队列实现栈](/leetcode/0225)


## 分析

- 两个栈的话可以将一个栈的元素不断出栈保存到另一个栈中，相当于反序保存
- 为了均摊 O(1)，考虑只有当 pop/peek 且第二个栈为空时，才进行这个反序操作
## 解答

```python
class MyQueue:

    def __init__(self):
        self.sk1 = []
        self.sk2 = []

    def push(self, x: int) -> None:
        self.sk1.append(x)

    def pop(self) -> int:
        self.peek()
        return self.sk2.pop()

    def peek(self) -> int:
        if not self.sk2:
            while self.sk1:
                self.sk2.append(self.sk1.pop())
        return self.sk2[-1]

    def empty(self) -> bool:
        return bool(not self.sk2 and not self.sk1)
```
30 ms
