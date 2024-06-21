# 0410：分割数组的最大值（★★）


> <u>**[力扣第 410 题](https://leetcode.cn/problems/split-array-largest-sum/)**</u>

## 题目

<p>给定一个非负整数数组 <code>nums</code> 和一个整数 <code>k</code> ，你需要将这个数组分成 <code>k</code><em> </em>个非空的连续子数组。</p>

<p>设计一个算法使得这 <code>k</code><em> </em>个子数组各自和的最大值最小。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [7,2,5,10,8], k = 2
<strong>输出：</strong>18
<strong>解释：</strong>
一共有四种方法将 nums 分割为 2 个子数组。
其中最好的方式是将其分为 [7,2,5] 和 [10,8] 。
因为此时这两个子数组各自的和的最大值为18，在所有情况中最小。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,4,5], k = 2
<strong>输出：</strong>9
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,4,4], k = 3
<strong>输出：</strong>4
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 1000</code></li>
<li><code>0 &lt;= nums[i] &lt;= 10<sup>6</sup></code></li>
<li><code>1 &lt;= k &lt;= min(50, nums.length)</code></li>
</ul>


## 分析

- 最大最小问题，首先想到用二分
- 假设最后的解是 x，代表能划分为 k 个和 <=x 的子数组
	- 显然对于 y>=x，也能划分为 k 个 和 <=y 的子数组 
	- 对于 y<x 则不成立，否则解应该是 y 了
- 因此，二分查找第一个满足划分的 x 即可
- 判断是否满足划分，贪心即可

## 解答


```python
class Solution:
    def splitArray(self, nums: List[int], k: int) -> int:
        def check(x):
            res,s=1,0
            for a in nums:
                s+=a
                if s>x:
                    s=a
                    res+=1
            return res<=k
        return bisect_left(range(sum(nums)),True,max(nums),key=check)
```
32 ms
