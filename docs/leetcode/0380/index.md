# 0380：O(1) 时间插入、删除和获取随机元素（★）


> <u>**[力扣第 380 题](https://leetcode.cn/problems/insert-delete-getrandom-o1/)**</u>

## 题目

<p>实现<code>RandomizedSet</code> 类：</p>

<div class="original__bRMd">
<div>
<ul>
<li><code>RandomizedSet()</code> 初始化 <code>RandomizedSet</code> 对象</li>
<li><code>bool insert(int val)</code> 当元素 <code>val</code> 不存在时，向集合中插入该项，并返回 <code>true</code> ；否则，返回 <code>false</code> 。</li>
<li><code>bool remove(int val)</code> 当元素 <code>val</code> 存在时，从集合中移除该项，并返回 <code>true</code> ；否则，返回 <code>false</code> 。</li>
<li><code>int getRandom()</code> 随机返回现有集合中的一项（测试用例保证调用此方法时集合中至少存在一个元素）。每个元素应该有 <strong>相同的概率</strong> 被返回。</li>
</ul>

<p>你必须实现类的所有函数，并满足每个函数的 <strong>平均</strong> 时间复杂度为 <code>O(1)</code> 。</p>



<p><strong>示例：</strong></p>

<pre>
<strong>输入</strong>
["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
[[], [1], [2], [2], [], [1], [2], []]
<strong>输出</strong>
[null, true, false, true, 2, true, false, 2]

<strong>解释</strong>
RandomizedSet randomizedSet = new RandomizedSet();
randomizedSet.insert(1); // 向集合中插入 1 。返回 true 表示 1 被成功地插入。
randomizedSet.remove(2); // 返回 false ，表示集合中不存在 2 。
randomizedSet.insert(2); // 向集合中插入 2 。返回 true 。集合现在包含 [1,2] 。
randomizedSet.getRandom(); // getRandom 应随机返回 1 或 2 。
randomizedSet.remove(1); // 从集合中移除 1 ，返回 true 。集合现在包含 [2] 。
randomizedSet.insert(2); // 2 已在集合中，所以返回 false 。
randomizedSet.getRandom(); // 由于 2 是集合中唯一的数字，getRandom 总是返回 2 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>-2<sup>31</sup> &lt;= val &lt;= 2<sup>31</sup> - 1</code></li>
<li>最多调用 <code>insert</code>、<code>remove</code> 和 <code>getRandom</code> 函数 <code>2 * </code><code>10<sup>5</sup></code> 次</li>
<li>在调用 <code>getRandom</code> 方法时，数据结构中 <strong>至少存在一个</strong> 元素。</li>
</ul>
</div>
</div>


**相似问题：**
- [0381：O(1) 时间插入、删除和获取随机元素 - 允许重复](/leetcode/0381)


## 分析

- O(1) 时间 insert/remove，对应的是哈希表
- O(1) 时间随机，对应的是数组（注意  set 的 pop 不是随机的，所以不能用 set）
- 考虑如何结合数组和哈希表：
	- 数组维护元素集合，哈希表维护每个元素下标
	- insert 时，加到数组末尾和哈希表中
	- remove 时，有个巧妙的方法
		- 先用哈希表找到下标
		- 将数组末尾元素赋值到该下标，再弹出末尾元素
		- 注意同步更新哈希表

## 解答

```python
class RandomizedSet:

    def __init__(self):
        self.d = {}
        self.A = []

    def insert(self, val: int) -> bool:
        if val in self.d:
            return False
        self.d[val] = len(self.A)
        self.A.append(val)
        return True

    def remove(self, val: int) -> bool:
        if val not in self.d:
            return False
        i = self.d[val]
        last = self.A[-1]
        self.A[i] = last
        self.A.pop()
        self.d[last] = i
        self.d.pop(val)
        return True

    def getRandom(self) -> int:
        return random.choice(self.A)
```
286 ms

