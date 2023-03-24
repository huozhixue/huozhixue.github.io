# 0015：三数之和（★）


> <u>**[力扣第 15 题](https://leetcode.cn/problems/3sum/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，判断是否存在三元组 <code>[nums[i], nums[j], nums[k]]</code> 满足 <code>i != j</code>、<code>i != k</code> 且 <code>j != k</code> ，同时还满足 <code>nums[i] + nums[j] + nums[k] == 0</code> 。请</p>

<p>你返回所有和为 <code>0</code> 且不重复的三元组。</p>

<p><strong>注意：</strong>答案中不可以包含重复的三元组。</p>





<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [-1,0,1,2,-1,-4]
<strong>输出：</strong>[[-1,-1,2],[-1,0,1]]
<strong>解释：</strong>
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
注意，输出的顺序和三元组的顺序并不重要。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [0,1,1]
<strong>输出：</strong>[]
<strong>解释：</strong>唯一可能的三元组和不为 0 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [0,0,0]
<strong>输出：</strong>[[0,0,0]]
<strong>解释：</strong>唯一可能的三元组和为 0 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>3 &lt;= nums.length &lt;= 3000</code></li>
<li><code>-10<sup>5</sup> &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>


## 分析

取不重复元组的问题，采用排序并跳过相同数字的通用方法即可。

然后类似 {{< lc "0001" >}} ，可以用哈希表优化最后一层的查找。

## 解答

```python
def threeSum(self, nums: List[int]) -> List[List[int]]:
    nums.sort()
    d = {num: i for i, num in enumerate(nums)}
    res, n = [], len(nums)
    for i in range(n - 2):
        if i and nums[i] == nums[i - 1]:
            continue
        for j in range(i + 1, n - 1):
            if j > i + 1 and nums[j] == nums[j - 1]:
                continue
            k = d.get(-nums[i] - nums[j], -1)
            if k > j:
                res.append([nums[i], nums[j], nums[k]])
    return res
```
时间 O(N^2)，852 ms
