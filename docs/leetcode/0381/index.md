# 0381：O(1) 时间插入、删除和获取随机元素 - 允许重复（★★）


> <u>**[力扣第 381 题](https://leetcode.cn/problems/insert-delete-getrandom-o1-duplicates-allowed/)**</u>

## 题目

<p><code>RandomizedCollection</code> 是一种包含数字集合(可能是重复的)的数据结构。它应该支持插入和删除特定元素，以及删除随机元素。</p>

<p>实现 <code>RandomizedCollection</code> 类:</p>

<ul>
<li><code>RandomizedCollection()</code>初始化空的 <code>RandomizedCollection</code> 对象。</li>
<li><code>bool insert(int val)</code> 将一个 <code>val</code> 项插入到集合中，即使该项已经存在。如果该项不存在，则返回 <code>true</code> ，否则返回 <code>false</code> 。</li>
<li><code>bool remove(int val)</code> 如果存在，从集合中移除一个 <code>val</code> 项。如果该项存在，则返回 <code>true</code> ，否则返回 <code>false</code> 。注意，如果 <code>val</code> 在集合中出现多次，我们只删除其中一个。</li>
<li><code>int getRandom()</code> 从当前的多个元素集合中返回一个随机元素。每个元素被返回的概率与集合中包含的相同值的数量 <strong>线性相关</strong> 。</li>
</ul>

<p>您必须实现类的函数，使每个函数的 <strong>平均</strong> 时间复杂度为 <code>O(1)</code> 。</p>

<p><strong>注意：</strong>生成测试用例时，只有在 <code>RandomizedCollection</code> 中 <strong>至少有一项</strong> 时，才会调用 <code>getRandom</code> 。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入</strong>
["RandomizedCollection", "insert", "insert", "insert", "getRandom", "remove", "getRandom"]
[[], [1], [1], [2], [], [1], []]
<strong>输出</strong>
[null, true, false, true, 2, true, 1]

<strong>解释</strong>
RandomizedCollection collection = new RandomizedCollection();// 初始化一个空的集合。
collection.insert(1);   // 返回 true，因为集合不包含 1。
// 将 1 插入到集合中。
collection.insert(1);   // 返回 false，因为集合包含 1。
// 将另一个 1 插入到集合中。集合现在包含 [1,1]。
collection.insert(2);   // 返回 true，因为集合不包含 2。
// 将 2 插入到集合中。集合现在包含 [1,1,2]。
collection.getRandom(); // getRandom 应当:
// 有 2/3 的概率返回 1,
// 1/3 的概率返回 2。
collection.remove(1);   // 返回 true，因为集合包含 1。
// 从集合中移除 1。集合现在包含 [1,2]。
collection.getRandom(); // getRandom 应该返回 1 或 2，两者的可能性相同。</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>-2<sup>31</sup> &lt;= val &lt;= 2<sup>31</sup> - 1</code></li>
<li><code>insert</code>, <code>remove</code> 和 <code>getRandom</code> 最多 <strong>总共</strong> 被调用 <code>2 * 10<sup>5</sup></code> 次</li>
<li>当调用 <code>getRandom</code> 时，数据结构中 <strong>至少有一个</strong> 元素</li>
</ul>


**相似问题：**
- [0380：O(1) 时间插入、删除和获取随机元素](/leetcode/0380)


## 分析

- {{< lc "0380" >}} 进阶版，允许元素重复了
- 考虑用哈希表记录元素的所有下标
- 注意过程中下标列表不一定保持有序，因此用 defaultdict(set) 而不是 defaultdict(list)

## 解答

```python
class RandomizedCollection:

    def __init__(self):
        self.A = []
        self.d = defaultdict(set)

    def insert(self, val: int) -> bool:
        res = not self.d[val]
        self.d[val].add(len(self.A))
        self.A.append(val)
        return res

    def remove(self, val: int) -> bool:
        if not self.d[val]:
            return False
        i = self.d[val].pop()
        last = self.A[-1]
        self.A[i] = last
        self.A.pop()
        self.d[last].add(i)
        self.d[last].remove(len(self.A))
        return True

        
    def getRandom(self) -> int:
        return random.choice(self.A)
```
325 ms

