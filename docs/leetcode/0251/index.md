# 0251：展开二维向量（★）


> <u>**[力扣第 251 题](https://leetcode.cn/problems/flatten-2d-vector/)**</u>

## 题目

<p>请设计并实现一个能够展开二维向量的迭代器。该迭代器需要支持 <code>next</code> 和 <code>hasNext</code> 两种操作。</p>



<p><strong>示例：</strong></p>

<pre>
Vector2D iterator = new Vector2D([[1,2],[3],[4]]);

iterator.next(); // 返回 1
iterator.next(); // 返回 2
iterator.next(); // 返回 3
iterator.hasNext(); // 返回 true
iterator.hasNext(); // 返回 true
iterator.next(); // 返回 4
iterator.hasNext(); // 返回 false
</pre>



<p><strong>注意：</strong></p>

<ol>
<li>请记得 <strong>重置 </strong>在 Vector2D 中声明的类变量（静态变量），因为类变量会 <strong>在多个测试用例中保持不变</strong>，影响判题准确。请 <a href="https://support.leetcode-cn.com/hc/kb/section/1071534/" target="_blank">查阅</a> 这里。</li>
<li>你可以假定 <code>next()</code> 的调用总是合法的，即当 <code>next()</code> 被调用时，二维向量总是存在至少一个后续元素。</li>
</ol>



<p><strong>进阶：</strong>尝试在代码中仅使用 <a href="http://www.cplusplus.com/reference/iterator/iterator/">C++ 提供的迭代器</a> 或 <a href="https://docs.oracle.com/javase/7/docs/api/java/util/Iterator.html">Java 提供的迭代器</a>。</p>


## 分析

### #1

最简单的就是展开为队列，每次队首弹出即可。

```python
class Vector2D:

    def __init__(self, vec: List[List[int]]):
        self.Q = deque(x for sub in vec for x in sub)

    def next(self) -> int:
        return self.Q.popleft()

    def hasNext(self) -> bool:
        return bool(self.Q)
```
68 ms

### #2

还可以直接在二维数组上迭代，记录当前元素的二维下标即可。

为了方便，可以让 hasNext 将二维下标移到下一个有效元素，next 先调用 hasNext 即可。

## 解答

```python
class Vector2D:

    def __init__(self, vec: List[List[int]]):
        self.vec = vec
        self.i = 0
        self.j = 0

    def next(self) -> int:
        self.hasNext()
        res = self.vec[self.i][self.j]
        self.j += 1
        return res

    def hasNext(self) -> bool:
        while self.i<len(self.vec) and self.j == len(self.vec[self.i]):
            self.i += 1
            self.j = 0
        return self.i<len(self.vec)
```
80 ms
