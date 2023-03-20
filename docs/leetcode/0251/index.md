# 0251：展开二维向量（★）


## 题目

请设计并实现一个能够展开二维向量的迭代器。该迭代器需要支持 next 和 hasNext 两种操作。


示例：

	Vector2D iterator = new Vector2D([[1,2],[3],[4]]);

	iterator.next(); // 返回 1
	iterator.next(); // 返回 2
	iterator.next(); // 返回 3
	iterator.hasNext(); // 返回 true
	iterator.hasNext(); // 返回 true
	iterator.next(); // 返回 4
	iterator.hasNext(); // 返回 false
	 

注意：
- 请记得 重置 在 Vector2D 中声明的类变量（静态变量），因为类变量会 在多个测试用例中保持不变，
影响判题准确。请 查阅 这里。
- 你可以假定 next() 的调用总是合法的，即当 next() 被调用时，二维向量总是存在至少一个后续元素。
 


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
