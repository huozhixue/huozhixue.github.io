# 0641：设计循环双端队列（★）


> <u>**[力扣第 641 题](https://leetcode.cn/problems/design-circular-deque/)**</u>

## 题目

<p>设计实现双端队列。</p>

<p>实现 <code>MyCircularDeque</code> 类:</p>

<ul>
<li><code>MyCircularDeque(int k)</code> ：构造函数,双端队列最大为 <code>k</code> 。</li>
<li><code>boolean insertFront()</code>：将一个元素添加到双端队列头部。 如果操作成功返回 <code>true</code> ，否则返回 <code>false</code> 。</li>
<li><code>boolean insertLast()</code> ：将一个元素添加到双端队列尾部。如果操作成功返回 <code>true</code> ，否则返回 <code>false</code> 。</li>
<li><code>boolean deleteFront()</code> ：从双端队列头部删除一个元素。 如果操作成功返回 <code>true</code> ，否则返回 <code>false</code> 。</li>
<li><code>boolean deleteLast()</code> ：从双端队列尾部删除一个元素。如果操作成功返回 <code>true</code> ，否则返回 <code>false</code> 。</li>
<li><code>int getFront()</code> )：从双端队列头部获得一个元素。如果双端队列为空，返回 <code>-1</code> 。</li>
<li><code>int getRear()</code> ：获得双端队列的最后一个元素。 如果双端队列为空，返回 <code>-1</code> 。</li>
<li><code>boolean isEmpty()</code> ：若双端队列为空，则返回 <code>true</code> ，否则返回 <code>false</code>  。</li>
<li><code>boolean isFull()</code> ：若双端队列满了，则返回 <code>true</code> ，否则返回 <code>false</code> 。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入</strong>
["MyCircularDeque", "insertLast", "insertLast", "insertFront", "insertFront", "getRear", "isFull", "deleteLast", "insertFront", "getFront"]
[[3], [1], [2], [3], [4], [], [], [], [4], []]
<strong>输出</strong>
[null, true, true, true, false, 2, true, true, true, 4]

<strong>解释</strong>
MyCircularDeque circularDeque = new MycircularDeque(3); // 设置容量大小为3
circularDeque.insertLast(1);			        // 返回 true
circularDeque.insertLast(2);			        // 返回 true
circularDeque.insertFront(3);			        // 返回 true
circularDeque.insertFront(4);			        // 已经满了，返回 false
circularDeque.getRear();  				// 返回 2
circularDeque.isFull();				        // 返回 true
circularDeque.deleteLast();			        // 返回 true
circularDeque.insertFront(4);			        // 返回 true
circularDeque.getFront();				// 返回 4
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= k &lt;= 1000</code></li>
<li><code>0 &lt;= value &lt;= 1000</code></li>
<li><code>insertFront</code>, <code>insertLast</code>, <code>deleteFront</code>, <code>deleteLast</code>, <code>getFront</code>, <code>getRear</code>, <code>isEmpty</code>, <code>isFull</code>  调用次数不大于 <code>2000</code> 次</li>
</ul>


## 分析

类似 {{< lc "0622" >}} ，增加 insertFront() 和 deleteLast() 即可。

## 解答

```python
class MyCircularDeque:

    def __init__(self, k: int):
        self.k = k
        self.A = [0] * k
        self.head = 0
        self.cnt = 0

    def insertFront(self, value: int) -> bool:
        if self.isFull():
            return False
        self.head = (self.head-1) % self.k
        self.A[self.head] = value
        self.cnt += 1
        return True

    def insertLast(self, value: int) -> bool:
        if self.isFull():
            return False
        self.A[(self.head+self.cnt) % self.k] = value
        self.cnt += 1
        return True

    def deleteFront(self) -> bool:
        if self.isEmpty():
            return False
        self.head = (self.head+1) % self.k
        self.cnt -= 1
        return True

    def deleteLast(self) -> bool:
        if self.isEmpty():
            return False
        self.cnt -= 1
        return True

    def getFront(self) -> int:
        return -1 if self.isEmpty() else self.A[self.head]

    def getRear(self) -> int:
        return -1 if self.isEmpty() else self.A[(self.head+self.cnt-1)%self.k]

    def isEmpty(self) -> bool:
        return self.cnt == 0

    def isFull(self) -> bool:
        return self.cnt == self.k
```

88 ms

