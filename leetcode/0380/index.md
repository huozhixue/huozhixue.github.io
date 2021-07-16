# 0380：常数时间插入、删除和获取随机元素（★★）



## 题目

设计一个支持在平均 时间复杂度 O(1) 下，执行以下操作的数据结构。

- insert(val)：当元素 val 不存在时，向集合中插入该项。
- remove(val)：元素 val 存在时，从集合中移除该项。
- getRandom：随机返回现有集合中的一项。每个元素应该有相同的概率被返回。

 <!--more--> 
 
示例 :

	// 初始化一个空的集合。
	RandomizedSet randomSet = new RandomizedSet();

	// 向集合中插入 1 。返回 true 表示 1 被成功地插入。
	randomSet.insert(1);

	// 返回 false ，表示集合中不存在 2 。
	randomSet.remove(2);

	// 向集合中插入 2 。返回 true 。集合现在包含 [1,2] 。
	randomSet.insert(2);

	// getRandom 应随机返回 1 或 2 。
	randomSet.getRandom();

	// 从集合中移除 1 ，返回 true 。集合现在包含 [2] 。
	randomSet.remove(1);

	// 2 已在集合中，所以返回 false 。
	randomSet.insert(2);

	// 由于 2 是集合中唯一的数字，getRandom 总是返回 2 。
	randomSet.getRandom();

## 分析

如果存在哈希表中，可以 O(1) 时间内插入、删除元素，但不能返回随机项。

存在数组中，则可以 O(1) 时间内返回随机项，但不能插入元素、删除元素。

有个巧妙的方法是存在数组中，并用哈希表记录元素位置。
那么 O(1) 时间内即可判断元素是否存在，然后插入。
而删除时，找到元素位置 i，将数组末尾元素赋值到位置 i，再弹出末尾元素即可，注意同步更新哈希表。

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
        i = self.d[val]
        self.A[i] = self.A[-1]
        self.d[self.A[i]] = i
        self.A.pop()
        del self.d[val]
        return True

    def getRandom(self) -> int:
        return choice(self.A)
```

100 ms

