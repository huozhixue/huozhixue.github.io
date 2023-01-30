# 0705：设计哈希集合（★）




## 题目

不使用任何内建的哈希表库设计一个哈希集合（HashSet）。

实现 MyHashSet 类：

- void add(key) 向哈希集合中插入值 key 。
- bool contains(key) 返回哈希集合中是否存在这个值 key 。
- void remove(key) 将给定值 key 从哈希集合中删除。如果哈希集合中没有这个值，什么也不做。

你可以不使用内建的哈希集合库解决此问题吗？

提示：
- 0 <= key <= 10^6
- 最多调用 10^4 次 add、remove 和 contains 。
 
示例：

	输入：
	["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
	[[], [1], [2], [1], [3], [2], [2], [2], [2]]
	输出：
	[null, null, null, true, false, null, true, null, false]

	解释：
	MyHashSet myHashSet = new MyHashSet();
	myHashSet.add(1);      // set = [1]
	myHashSet.add(2);      // set = [1, 2]
	myHashSet.contains(1); // 返回 True
	myHashSet.contains(3); // 返回 False ，（未找到）
	myHashSet.add(2);      // set = [1, 2]
	myHashSet.contains(2); // 返回 True
	myHashSet.remove(2);   // set = [1]
	myHashSet.contains(2); // 返回 False ，（已移除）
 
## 分析

### #1

key 的范围较小，可以直接用一个数组一一对应。

```python
class MyHashSet:

    def __init__(self):
        self.A = [False] * (10**6+1)

    def add(self, key: int) -> None:
        self.A[key] = True

    def remove(self, key: int) -> None:
        self.A[key] = False

    def contains(self, key: int) -> bool:
        return self.A[key]
```

268 ms

### #2

一般哈希表会用更小的空间来存储，这时要考虑冲突的情况。最简单的就是拉链法。

## 解答

```python
class MyHashSet:

    def __init__(self):
        self.size = 1009
        self.A = [[] for _ in range(self.size)]

    def add(self, key: int) -> None:
        if not self.contains(key):
            self.A[key%self.size].append(key)

    def remove(self, key: int) -> None:
        if self.contains(key):
            self.A[key%self.size].remove(key)

    def contains(self, key: int) -> bool:
        return key in self.A[key%self.size]
```
140 ms

