# 0170：两数之和 III - 数据结构设计


> <u>**[力扣第 170 题](https://leetcode.cn/problems/two-sum-iii-data-structure-design/)**</u>

## 题目

<p>设计一个接收整数流的数据结构，该数据结构支持检查是否存在两数之和等于特定值。</p>

<p>实现 <code>TwoSum</code> 类：</p>

<ul>
<li><code>TwoSum()</code> 使用空数组初始化 <code>TwoSum</code> 对象</li>
<li><code>void add(int number)</code> 向数据结构添加一个数 <code>number</code></li>
<li><code>boolean find(int value)</code> 寻找数据结构中是否存在一对整数，使得两数之和与给定的值相等。如果存在，返回 <code>true</code> ；否则，返回 <code>false</code> 。</li>
</ul>



<p><strong>示例：</strong></p>

<pre>
<strong>输入：</strong>
["TwoSum", "add", "add", "add", "find", "find"]
[[], [1], [3], [5], [4], [7]]
<strong>输出：</strong>
[null, null, null, null, true, false]

<strong>解释：</strong>
TwoSum twoSum = new TwoSum();
twoSum.add(1);   // [] --&gt; [1]
twoSum.add(3);   // [1] --&gt; [1,3]
twoSum.add(5);   // [1,3] --&gt; [1,3,5]
twoSum.find(4);  // 1 + 3 = 4，返回 true
twoSum.find(7);  // 没有两个整数加起来等于 7 ，返回 false</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>-10<sup>5</sup> &lt;= number &lt;= 10<sup>5</sup></code></li>
<li><code>-2<sup>31</sup> &lt;= value &lt;= 2<sup>31</sup> - 1</code></li>
<li>最多调用 <code>10<sup>4</sup></code> 次 <code>add</code> 和 <code>find</code></li>
</ul>


## 分析

### #1

最简单的是维护计数器 ct，查找 value 时遍历 x，看 value-x 是否在 ct 中即可。

注意当 x==value-x 的特殊情况，要满足 ct[x]>=2 才可以。

```python
class TwoSum:

    def __init__(self):
        self.ct = Counter()

    def add(self, number: int) -> None:
        self.ct[number] += 1

    def find(self, value: int) -> bool:
        return any(self.ct.get(value-x, 0)>=1+int(x==value-x) for x in self.ct)
```
时间复杂度 O(N^2)，612 ms

### #2

由于数据较弱，所以 O(N^2) 能过。

用状态压缩的方法则可以保证能过：
- 用 st 维护数的集合，st2 维护两数之和的集合
- 为了避免负数，add 时 num 加上 10^5，find 时 value 加上 10^5*2

## 解答

```python
class TwoSum:

    def __init__(self):
        self.st = 0
        self.st2 = 0

    def add(self, number: int) -> None:
        x = number + 10**5
        self.st2 |= self.st<<x
        self.st |= 1<<x

    def find(self, value: int) -> bool:
        x = value+10**5*2
        return 0<=x<=10**5*4 and self.st2&(1<<x)>0
```
280 ms


