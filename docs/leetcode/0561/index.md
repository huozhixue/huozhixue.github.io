# 0561：数组拆分


> <u>**[力扣第 561 题](https://leetcode.cn/problems/array-partition/)**</u>

## 题目

<p>给定长度为 <code>2n</code><strong> </strong>的整数数组 <code>nums</code> ，你的任务是将这些数分成 <code>n</code><strong> </strong>对, 例如 <code>(a<sub>1</sub>, b<sub>1</sub>), (a<sub>2</sub>, b<sub>2</sub>), ..., (a<sub>n</sub>, b<sub>n</sub>)</code> ，使得从 <code>1</code> 到 <code>n</code> 的 <code>min(a<sub>i</sub>, b<sub>i</sub>)</code> 总和最大。</p>

<p>返回该 <strong>最大总和</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,4,3,2]
<strong>输出：</strong>4
<strong>解释：</strong>所有可能的分法（忽略元素顺序）为：
1. (1, 4), (2, 3) -&gt; min(1, 4) + min(2, 3) = 1 + 2 = 3
2. (1, 3), (2, 4) -&gt; min(1, 3) + min(2, 4) = 1 + 2 = 3
3. (1, 2), (3, 4) -&gt; min(1, 2) + min(3, 4) = 1 + 3 = 4
所以最大总和为 4</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [6,2,6,5,1,2]
<strong>输出：</strong>9
<strong>解释：</strong>最优的分法为 (2, 1), (2, 5), (6, 6). min(2, 1) + min(2, 5) + min(6, 6) = 1 + 2 + 6 = 9
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>
<li><code>nums.length == 2 * n</code></li>
<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [1984：学生分数的最小差值（1306 分）](/leetcode/1984)
- [2144：打折购买糖果的最小开销（1260 分）](/leetcode/2144)
- [2155：分组得分最高的所有下标（1390 分）](/leetcode/2155)


## 分析

- 直觉来说应该把最小的两个数分在一起，剩下的依此类推
- 证明一下
	- 假设最小的两个数是 $a_i、a_j$ 并且没有分在一起，对应的两对是 $(a_i, x)、(a_j, y)$
	- 把这两对改为 $(a_i, a_j)、(x, y)$，总和从 $a_i+a_j$  变为 $min(a_i,a_j)+min(x,y)$，显然增大了
	- 因此最小的两个数必然分在一起，剩下的同理


## 解答

```python
class Solution:
    def arrayPairSum(self, nums: List[int]) -> int:
        return sum(sorted(nums)[::2])
```

61 ms

