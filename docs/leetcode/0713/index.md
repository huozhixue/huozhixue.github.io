# 0713：乘积小于 K 的子数组（★）


> <u>**[力扣第 55 场双周赛第 3 题](https://leetcode.cn/problems/subarray-product-less-than-k/)**</u>

## 题目

给你一个整数数组 <code>nums</code> 和一个整数 <code>k</code> ，请你返回子数组内所有元素的乘积严格小于<em> </em><code>k</code> 的连续子数组的数目。


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [10,5,2,6], k = 100
<strong>输出：</strong>8
<strong>解释：</strong>8 个乘积小于 100 的子数组分别为：[10]、[5]、[2],、[6]、[10,5]、[5,2]、[2,6]、[5,2,6]。
需要注意的是 [10,5,2] 并不是乘积小于 100 的子数组。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3], k = 0
<strong>输出：</strong>0</pre>



<p><strong>提示: </strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>1 &lt;= nums[i] &lt;= 1000</code></li>
<li><code>0 &lt;= k &lt;= 10<sup>6</sup></code></li>
</ul>


## 分析

遍历每个位置 j 作为结尾，找符合条件的最长子数组 [i, j]，即找到 j-i+1 个。

发现遍历中 i 必然是不动或向右移的，因此是滑动窗口。

注意排除 k<=1 的特殊情况。


## 解答

```python
def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
    if k <= 1:
        return 0
    res, i, s = 0, 0, 1
    for j, num in enumerate(nums):
        s *= num
        while s >= k:
            s //= nums[i]
            i += 1
        res += j-i+1
    return res
```

200 ms

