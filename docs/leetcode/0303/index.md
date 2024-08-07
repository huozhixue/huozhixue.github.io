# 0303：区域和检索 - 数组不可变


> <u>**[力扣第 303 题](https://leetcode.cn/problems/range-sum-query-immutable/)**</u>

## 题目

<p>给定一个整数数组  <code>nums</code>，处理以下类型的多个查询:</p>

<ol>
<li>计算索引 <code>left</code> 和 <code>right</code> （包含 <code>left</code> 和 <code>right</code>）之间的 <code>nums</code> 元素的 <strong>和</strong> ，其中 <code>left &lt;= right</code></li>
</ol>

<p>实现 <code>NumArray</code> 类：</p>

<ul>
<li><code>NumArray(int[] nums)</code> 使用数组 <code>nums</code> 初始化对象</li>
<li><code>int sumRange(int i, int j)</code> 返回数组 <code>nums</code> 中索引 <code>left</code> 和 <code>right</code> 之间的元素的 <strong>总和</strong> ，包含 <code>left</code> 和 <code>right</code> 两点（也就是 <code>nums[left] + nums[left + 1] + ... + nums[right]</code> )</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
<strong>输出：
</strong>[null, 1, -1, -3]

<strong>解释：</strong>
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return 1 ((-2) + 0 + 3)
numArray.sumRange(2, 5); // return -1 (3 + (-5) + 2 + (-1))
numArray.sumRange(0, 5); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
<li><code>-10<sup>5</sup> &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= i &lt;= j &lt; nums.length</code></li>
<li>最多调用 <code>10<sup>4</sup></code> 次 <code>sumRange</code><strong> </strong>方法</li>
</ul>


**相似问题：**
- [0304：二维区域和检索 - 矩阵不可变](/leetcode/0304)
- [0307：区域和检索 - 数组可修改](/leetcode/0307)
- [0325：和等于 k 的最长子数组长度](/leetcode/0325)


## 分析

典型的前缀和问题。

## 解答

```python
class NumArray:

    def __init__(self, nums: List[int]):
        self.P = list(accumulate([0]+nums))


    def sumRange(self, left: int, right: int) -> int:
        return self.P[right+1]-self.P[left]
```
51 ms

