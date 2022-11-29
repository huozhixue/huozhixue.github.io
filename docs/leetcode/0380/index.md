# 0380：常数时间插入、删除和获取随机元素（★★）



## 题目

实现RandomizedSet 类：
- RandomizedSet() 初始化 RandomizedSet 对象
- bool insert(int val) 当元素 val 不存在时，向集合中插入该项，并返回 true ；否则，返回 false 。
- bool remove(int val) 当元素 val 存在时，从集合中移除该项，并返回 true ；否则，返回 false 。
- int getRandom() 随机返回现有集合中的一项（测试用例保证调用此方法时集合中至少存在一个元素）。
每个元素应该有 相同的概率 被返回。

你必须实现类的所有函数，并满足每个函数的 平均 时间复杂度为 O(1) 。

 

示例：

	输入
	["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
	[[], [1], [2], [2], [], [1], [2], []]
	输出
	[null, true, false, true, 2, true, false, 2]

	解释
	RandomizedSet randomizedSet = new RandomizedSet();
	randomizedSet.insert(1); // 向集合中插入 1 。返回 true 表示 1 被成功地插入。
	randomizedSet.remove(2); // 返回 false ，表示集合中不存在 2 。
	randomizedSet.insert(2); // 向集合中插入 2 。返回 true 。集合现在包含 [1,2] 。
	randomizedSet.getRandom(); // getRandom 应随机返回 1 或 2 。
	randomizedSet.remove(1); // 从集合中移除 1 ，返回 true 。集合现在包含 [2] 。
	randomizedSet.insert(2); // 2 已在集合中，所以返回 false 。
	randomizedSet.getRandom(); // 由于 2 是集合中唯一的数字，getRandom 总是返回 2 。
	 

提示：
- -2^31 <= val <= 2^31 - 1
- 最多调用 insert、remove 和 getRandom 函数 2 * 10^5 次
- 在调用 getRandom 方法时，数据结构中 至少存在一个 元素。



## 分析

如果用哈希表，可以 O(1) 时间内判断元素是否存在，并添加/移除元素，
但不能 O(1) 时间返回随机项。

如果用数组，可以 O(1) 时间内返回随机项，但不能 O(1) 时间判断元素是否存在。

有个巧妙的方法是结合数组和哈希表：
- 用数组维护元素集合，哈希表维护每个元素和在数组中的位置
- insert 时，用哈希表判断元素是否存在，若不存在，更新到数组末尾和哈希表中
- remove 时，用哈希表判断元素是否存在，若存在，弹出元素，更新数组和哈希表
	- 要 O(1) 时间弹出数组某个位置的元素，有个巧妙的方法
	- 将数组该位置的元素和末尾元素互换，再从末尾弹出即可
	- 特别注意同步更新哈希表

## 解答

```python
class RandomizedSet:

    def __init__(self):
        self.A = []
        self.d = {}

    def insert(self, val: int) -> bool:
        if val in self.d:
            return False
        self.A.append(val)
        self.d[val] = len(self.A)-1
        return True

    def remove(self, val: int) -> bool:
        if val not in self.d:
            return False
        i, last = self.d[val], self.A[-1]
        self.A[i] = last
        self.A.pop()
        self.d[last] = i
        del self.d[val]
        return True

    def getRandom(self) -> int:
        return random.choice(self.A)
```
360 ms

