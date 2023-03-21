# 0155：最小栈（★）


> <u>**[力扣第 155 题](https://leetcode.cn/problems/min-stack/)**</u>

## 题目

<p>设计一个支持 <code>push</code> ，<code>pop</code> ，<code>top</code> 操作，并能在常数时间内检索到最小元素的栈。</p>

<p>实现 <code>MinStack</code> 类:</p>

<ul>
<li><code>MinStack()</code> 初始化堆栈对象。</li>
<li><code>void push(int val)</code> 将元素val推入堆栈。</li>
<li><code>void pop()</code> 删除堆栈顶部的元素。</li>
<li><code>int top()</code> 获取堆栈顶部的元素。</li>
<li><code>int getMin()</code> 获取堆栈中的最小元素。</li>
</ul>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入：</strong>
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

<strong>输出：</strong>
[null,null,null,null,-3,null,0,-2]

<strong>解释：</strong>
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --&gt; 返回 -3.
minStack.pop();
minStack.top();      --&gt; 返回 0.
minStack.getMin();   --&gt; 返回 -2.
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>-2<sup>31</sup> &lt;= val &lt;= 2<sup>31</sup> - 1</code></li>
<li><code>pop</code>、<code>top</code> 和 <code>getMin</code> 操作总是在 <strong>非空栈</strong> 上调用</li>
<li><code>push</code>, <code>pop</code>, <code>top</code>, and <code>getMin</code>最多被调用 <code>3 * 10<sup>4</sup></code> 次</li>
</ul>


## 分析

每次入栈的同时保存当前最小值即可。

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


