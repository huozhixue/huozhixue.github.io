# 0384：打乱数组（★）


> <u>**[力扣第 384 题](https://leetcode.cn/problems/shuffle-an-array/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，设计算法来打乱一个没有重复元素的数组。打乱后，数组的所有排列应该是 <strong>等可能</strong> 的。</p>

<p>实现 <code>Solution</code> class:</p>

<ul>
<li><code>Solution(int[] nums)</code> 使用整数数组 <code>nums</code> 初始化对象</li>
<li><code>int[] reset()</code> 重设数组到它的初始状态并返回</li>
<li><code>int[] shuffle()</code> 返回数组随机打乱后的结果</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入</strong>
["Solution", "shuffle", "reset", "shuffle"]
[[[1, 2, 3]], [], [], []]
<strong>输出</strong>
[null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]

<strong>解释</strong>
Solution solution = new Solution([1, 2, 3]);
solution.shuffle();    // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。例如，返回 [3, 1, 2]
solution.reset();      // 重设数组到它的初始状态 [1, 2, 3] 。返回 [1, 2, 3]
solution.shuffle();    // 随机返回数组 [1, 2, 3] 打乱后的结果。例如，返回 [1, 3, 2]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 50</code></li>
<li><code>-10<sup>6</sup> &lt;= nums[i] &lt;= 10<sup>6</sup></code></li>
<li><code>nums</code> 中的所有元素都是 <strong>唯一的</strong></li>
<li>最多可以调用 <code>10<sup>4</sup></code> 次 <code>reset</code> 和 <code>shuffle</code></li>
</ul>


## 分析

### #1

最简单的就是调包 random.shuffle()。

```python
class Solution:

    def __init__(self, nums: List[int]):
        self.nums = nums
        self.A = nums[:]

    def reset(self) -> List[int]:
        return self.nums

    def shuffle(self) -> List[int]:
        random.shuffle(self.A)
        return self.A
```
192 ms

### #2

经典的洗牌方法就是第 i 轮随机取 [i, n) 的一个索引 j，将 A[i]、A[j] 互换。

## 解答

```python
class Solution:

    def __init__(self, nums: List[int]):
        self.nums = nums
        self.A = nums[:]

    def reset(self) -> List[int]:
        return self.nums

    def shuffle(self) -> List[int]:
        for i in range(len(self.A)):
            j = random.randint(i, len(self.A)-1)
            self.A[i], self.A[j] = self.A[j], self.A[i]
        return self.A
```
228 ms

