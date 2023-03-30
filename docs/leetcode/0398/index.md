# 0398：随机数索引（★）


> <u>**[力扣第 398 题](https://leetcode.cn/problems/random-pick-index/)**</u>

## 题目

<p>给你一个可能含有 <strong>重复元素</strong> 的整数数组 <code>nums</code> ，请你随机输出给定的目标数字 <code>target</code> 的索引。你可以假设给定的数字一定存在于数组中。</p>

<p>实现 <code>Solution</code> 类：</p>

<ul>
<li><code>Solution(int[] nums)</code> 用数组 <code>nums</code> 初始化对象。</li>
<li><code>int pick(int target)</code> 从 <code>nums</code> 中选出一个满足 <code>nums[i] == target</code> 的随机索引 <code>i</code> 。如果存在多个有效的索引，则每个索引的返回概率应当相等。</li>
</ul>



<p><strong>示例：</strong></p>

<pre>
<strong>输入</strong>
["Solution", "pick", "pick", "pick"]
[[[1, 2, 3, 3, 3]], [3], [1], [3]]
<strong>输出</strong>
[null, 4, 0, 2]

<strong>解释</strong>
Solution solution = new Solution([1, 2, 3, 3, 3]);
solution.pick(3); // 随机返回索引 2, 3 或者 4 之一。每个索引的返回概率应该相等。
solution.pick(1); // 返回 0 。因为只有 nums[0] 等于 1 。
solution.pick(3); // 随机返回索引 2, 3 或者 4 之一。每个索引的返回概率应该相等。
</pre>



<div class="top-view__1vxA">
<div class="original__bRMd">
<div>
<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
<li><code>target</code> 是 <code>nums</code> 中的一个整数</li>
<li>最多调用 <code>pick</code> 函数 <code>10<sup>4</sup></code> 次</li>
</ul>
</div>
</div>
</div>

<div class="fullscreen-btn-layer__2kn7"> </div>


## 分析

### #1

最简单的就是用哈希表保存每个数对应的索引列表。

```python
class Solution:

    def __init__(self, nums: List[int]):
        self.d = defaultdict(list)
        for i, num in enumerate(nums):
            self.d[num].append(i)

    def pick(self, target: int) -> int:
        return random.choice(self.d[target])
```
148 ms

### #2

要求额外空间小，想到蓄水池抽样。遇到第 cnt 个等于 target 的数时，以 1/cnt 的概率将该数的索引赋值给 res。

## 解答

```python
class Solution:

    def __init__(self, nums: List[int]):
        self.nums = nums

    def pick(self, target: int) -> int:
        res, cnt = 0, 0
        for i, num in enumerate(self.nums):
            if num == target:
                cnt += 1
                if random.randint(1, cnt) == cnt:
                    res = i
        return res
```
112 ms


