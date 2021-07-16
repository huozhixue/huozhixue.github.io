# 0381：O(1) 时间插入、删除和获取随机元素 - 允许重复（★★★）



## 题目

设计一个支持在平均 时间复杂度 O(1) 下， 执行以下操作的数据结构。

注意: 允许出现重复元素。

- insert(val)：向集合中插入元素 val。
- remove(val)：当 val 存在时，从集合中移除一个 val。
- getRandom：从现有集合中随机获取一个元素。每个元素被返回的概率应该与其在集合中的数量呈线性相关。


 <!--more--> 
 
示例:

	// 初始化一个空的集合。
	RandomizedCollection collection = new RandomizedCollection();

	// 向集合中插入 1 。返回 true 表示集合不包含 1 。
	collection.insert(1);

	// 向集合中插入另一个 1 。返回 false 表示集合包含 1 。集合现在包含 [1,1] 。
	collection.insert(1);

	// 向集合中插入 2 ，返回 true 。集合现在包含 [1,1,2] 。
	collection.insert(2);

	// getRandom 应当有 2/3 的概率返回 1 ，1/3 的概率返回 2 。
	collection.getRandom();

	// 从集合中删除 1 ，返回 true 。集合现在包含 [1,2] 。
	collection.remove(1);

	// getRandom 应有相同概率返回 1 和 2 。
	collection.getRandom();

## 分析

与 {{< lc "0380" >}} 相似，只是允许重复了。

那么可以用哈希表记录元素的所有位置。显然依然能在 O(1) 时间内判断元素是否存在，然后插入。
删除时，直接弹出一个位置 i，然后类似 {{< lc "0380" >}}，将数组末尾元素赋值到位置 i，再弹出末尾元素即可。

注意末尾元素和位置 i 的元素可能相同，要特别注意哈希表的同步更新。


## 解答

```python
class RandomizedCollection:

    def __init__(self):
        self.A = []
        self.d = defaultdict(set)

    def insert(self, val: int) -> bool:
        self.A.append(val)
        self.d[val].add(len(self.A)-1)
        return len(self.d[val]) == 1

    def remove(self, val: int) -> bool:
        if not self.d[val]:
            return False
        i = self.d[val].pop()
        self.A[i] = self.A[-1]
        self.d[self.A[i]].add(i)
        self.d[self.A[i]].remove(len(self.A)-1)
        self.A.pop()
        return True

    def getRandom(self) -> int:
        return random.choice(self.A)
```

104 ms

