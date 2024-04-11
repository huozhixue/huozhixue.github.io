# 0016：最接近的三数之和（★）


> <u>**[力扣第 16 题](https://leetcode.cn/problems/3sum-closest/)**</u>

## 题目

<p>给你一个长度为 <code>n</code> 的整数数组 <code>nums</code><em> </em>和 一个目标值 <code>target</code>。请你从 <code>nums</code><em> </em>中选出三个整数，使它们的和与 <code>target</code> 最接近。</p>

<p>返回这三个数的和。</p>

<p>假定每组输入只存在恰好一个解。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [-1,2,1,-4], target = 1
<strong>输出：</strong>2
<strong>解释：</strong>与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [0,0,0], target = 1
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>3 &lt;= nums.length &lt;= 1000</code></li>
<li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>
<li><code>-10<sup>4</sup> &lt;= target &lt;= 10<sup>4</sup></code></li>
</ul>


## 分析

### #1

- 类似 {{< lc "0015" >}} ，可以先排序再取元组 <a, b, c>
- 但本题最后一个数 c 不能直接用哈希表获得
- 要查找一个最接近 target-a-b 的数，容易想到用二分查找

```python
class Solution:
    def threeSumClosest(self, nums: List[int], target: int) -> int:
        nums.sort()
        n = len(nums)
        res = inf
        for i in range(n-2):
            for j in range(i+1, n-1):
                t = target-nums[i]-nums[j]
                pos = bisect_left(nums, t, j+1, n-1)
                for k in [pos-1, pos]:
                    if k>j and abs(t-nums[k])<abs(target-res):
                        res = nums[i]+nums[j]+nums[k]
        return res
```
时间 $O(N^2 logN)$，1179 ms

### #2

还有个更优的双指针解法
- 排序后先固定 i，再寻找 j,k 使得三数之和最接近 target
- 初始指针 j、k 分别指向 i+1, n-1
	- 如果 nums[j]+nums[k]<target-nums[i]，则 nums[j] 与任意 [j+1,k-1] 内的数相加都更小，离 target 更远，故可以不再考虑 nums[j]，缩小查找范围为 [j+1,k]
	- 同理，如果 nums[j]+nums[k]<target-nums[i]，缩小查找范围为 [j, k-1]
- 循环操作直到 j、k 相遇，取过程中最接近的和即可
## 解答

```python
class Solution:
    def threeSumClosest(self, nums: List[int], target: int) -> int:
        nums.sort()
        n = len(nums)
        res = inf
        for i in range(n):
            j,k = i+1,n-1
            while j<k:
                s = nums[i]+nums[j]+nums[k]
                if s>target:
                    k -= 1
                else:
                    j += 1
                if abs(s-target)<abs(res-target):
                    res = s
        return res
```
时间 $O(N^2)$，404 ms
