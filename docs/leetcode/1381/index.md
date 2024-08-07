# 1381：设计一个支持增量操作的栈（1285 分）


> <u>**[力扣第 180 场周赛第 2 题](https://leetcode.cn/problems/design-a-stack-with-increment-operation/)**</u>

## 题目

<p>请你设计一个支持对其元素进行增量操作的栈。</p>

<p>实现自定义栈类 <code>CustomStack</code> ：</p>

<ul>
<li><code>CustomStack(int maxSize)</code>：用 <code>maxSize</code> 初始化对象，<code>maxSize</code> 是栈中最多能容纳的元素数量。</li>
<li><code>void push(int x)</code>：如果栈还未增长到 <code>maxSize</code> ，就将 <code>x</code> 添加到栈顶。</li>
<li><code>int pop()</code>：弹出栈顶元素，并返回栈顶的值，或栈为空时返回 <strong>-1</strong> 。</li>
<li><code>void inc(int k, int val)</code>：栈底的 <code>k</code> 个元素的值都增加 <code>val</code> 。如果栈中元素总数小于 <code>k</code> ，则栈中的所有元素都增加 <code>val</code> 。</li>
</ul>



<p><strong>示例：</strong></p>

<pre>
<strong>输入：</strong>
["CustomStack","push","push","pop","push","push","push","increment","increment","pop","pop","pop","pop"]
[[3],[1],[2],[],[2],[3],[4],[5,100],[2,100],[],[],[],[]]
<strong>输出：</strong>
[null,null,null,2,null,null,null,null,null,103,202,201,-1]
<strong>解释：</strong>
CustomStack stk = new CustomStack(3); // 栈是空的 []
stk.push(1);                          // 栈变为 [1]
stk.push(2);                          // 栈变为 [1, 2]
stk.pop();                            // 返回 2 --&gt; 返回栈顶值 2，栈变为 [1]
stk.push(2);                          // 栈变为 [1, 2]
stk.push(3);                          // 栈变为 [1, 2, 3]
stk.push(4);                          // 栈仍然是 [1, 2, 3]，不能添加其他元素使栈大小变为 4
stk.increment(5, 100);                // 栈变为 [101, 102, 103]
stk.increment(2, 100);                // 栈变为 [201, 202, 103]
stk.pop();                            // 返回 103 --&gt; 返回栈顶值 103，栈变为 [201, 202]
stk.pop();                            // 返回 202 --&gt; 返回栈顶值 202，栈变为 [201]
stk.pop();                            // 返回 201 --&gt; 返回栈顶值 201，栈变为 []
stk.pop();                            // 返回 -1 --&gt; 栈为空，返回 -1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= maxSize, x, k &lt;= 1000</code></li>
<li><code>0 &lt;= val &lt;= 100</code></li>
<li>每种方法 <code>increment</code>，<code>push</code> 以及 <code>pop</code> 分别最多调用 <code>1000</code> 次</li>
</ul>




## 分析

### #1

最简单的就是暴力操作即可。

```python
class CustomStack:

    def __init__(self, maxSize: int):
        self.size = maxSize
        self.stack = []

    def push(self, x: int) -> None:
        if len(self.stack) < self.size:
            self.stack.append(x)

    def pop(self) -> int:
        return self.stack.pop() if self.stack else -1

    def increment(self, k: int, val: int) -> None:
        for i in range(min(k, len(self.stack))):
            self.stack[i] += val
```

128 ms

### #2

有个巧妙的方法可以减少 increment 的时间。

入栈时添加一个变量 add 表示额外增加的值。increment 操作时将 stack[k-1] 的 add 增加 val，pop 操作时将 add 累加到 stack[-1] 中即可。


## 解答

```python
class CustomStack:

    def __init__(self, maxSize: int):
        self.size = maxSize
        self.stack = []

    def push(self, x: int) -> None:
        if len(self.stack) < self.size:
            self.stack.append([x, 0])

    def pop(self) -> int:
        if not self.stack:
            return -1
        res, add = self.stack.pop()
        if self.stack:
            self.stack[-1][1] += add
        return res + add

    def increment(self, k: int, val: int) -> None:
        k = min(k, len(self.stack))
        if k > 0:
            self.stack[k-1][1] += val
```

120 ms


