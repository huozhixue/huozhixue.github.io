# 0622：设计循环队列（★）


> <u>**[力扣第 622 题](https://leetcode.cn/problems/design-circular-queue/)**</u>

## 题目

<p>设计你的循环队列实现。 循环队列是一种线性数据结构，其操作表现基于 FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。它也被称为&ldquo;环形缓冲器&rdquo;。</p>

<p>循环队列的一个好处是我们可以利用这个队列之前用过的空间。在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，即使在队列前面仍有空间。但是使用循环队列，我们能使用这些空间去存储新的值。</p>

<p>你的实现应该支持如下操作：</p>

<ul>
<li><code>MyCircularQueue(k)</code>: 构造器，设置队列长度为 k 。</li>
<li><code>Front</code>: 从队首获取元素。如果队列为空，返回 -1 。</li>
<li><code>Rear</code>: 获取队尾元素。如果队列为空，返回 -1 。</li>
<li><code>enQueue(value)</code>: 向循环队列插入一个元素。如果成功插入则返回真。</li>
<li><code>deQueue()</code>: 从循环队列中删除一个元素。如果成功删除则返回真。</li>
<li><code>isEmpty()</code>: 检查循环队列是否为空。</li>
<li><code>isFull()</code>: 检查循环队列是否已满。</li>
</ul>



<p><strong>示例：</strong></p>

<pre>MyCircularQueue circularQueue = new MyCircularQueue(3); // 设置长度为 3
circularQueue.enQueue(1);  // 返回 true
circularQueue.enQueue(2);  // 返回 true
circularQueue.enQueue(3);  // 返回 true
circularQueue.enQueue(4);  // 返回 false，队列已满
circularQueue.Rear();  // 返回 3
circularQueue.isFull();  // 返回 true
circularQueue.deQueue();  // 返回 true
circularQueue.enQueue(4);  // 返回 true
circularQueue.Rear();  // 返回 4</pre>



<p><strong>提示：</strong></p>

<ul>
<li>所有的值都在 0 至 1000 的范围内；</li>
<li>操作数将在 1 至 1000 的范围内；</li>
<li>请不要使用内置的队列库。</li>
</ul>


## 分析

循环队列用数组实现即可。注意一个长为 k 的循环队列，当队列为空或已满时，队首队尾的指针相同，无法区分。
因此考虑用 k+1 长的数组实现，或者维护队首和队列长度，需要时计算出队尾位置。

## 解答

```python
class MyCircularQueue:

    def __init__(self, k: int):
        self.k = k
        self.A = [0] * k
        self.head = 0
        self.cnt = 0

    def enQueue(self, value: int) -> bool:
        if self.isFull():
            return False
        self.A[(self.head+self.cnt)%self.k] = value
        self.cnt += 1
        return True

    def deQueue(self) -> bool:
        if self.isEmpty():
            return False
        self.head = (self.head+1) % self.k
        self.cnt -= 1
        return True

    def Front(self) -> int:
        return -1 if self.isEmpty() else self.A[self.head]

    def Rear(self) -> int:
        return -1 if self.isEmpty() else self.A[(self.head+self.cnt-1)%self.k]

    def isEmpty(self) -> bool:
        return self.cnt == 0

    def isFull(self) -> bool:
        return self.cnt == self.k
```

72 ms

