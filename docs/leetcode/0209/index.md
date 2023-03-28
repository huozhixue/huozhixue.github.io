# 0209：长度最小的子数组（★）


> <u>**[力扣第 209 题](https://leetcode.cn/problems/minimum-size-subarray-sum/)**</u>

## 题目

<p>给定一个含有 <code>n</code><strong> </strong>个正整数的数组和一个正整数 <code>target</code><strong> 。</strong></p>

<p>找出该数组中满足其和<strong> </strong><code>≥ target</code><strong> </strong>的长度最小的 <strong>连续子数组</strong> <code>[nums<sub>l</sub>, nums<sub>l+1</sub>, ..., nums<sub>r-1</sub>, nums<sub>r</sub>]</code> ，并返回其长度<strong>。</strong>如果不存在符合条件的子数组，返回 <code>0</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>target = 7, nums = [2,3,1,2,4,3]
<strong>输出：</strong>2
<strong>解释：</strong>子数组 <code>[4,3]</code> 是该条件下的长度最小的子数组。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>target = 4, nums = [1,4,4]
<strong>输出：</strong>1
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>target = 11, nums = [1,1,1,1,1,1,1,1]
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= target <= 10<sup>9</sup></code></li>
<li><code>1 <= nums.length <= 10<sup>5</sup></code></li>
<li><code>1 <= nums[i] <= 10<sup>5</sup></code></li>
</ul>



<p><strong>进阶：</strong></p>

<ul>
<li>如果你已经实现<em> </em><code>O(n)</code> 时间复杂度的解法, 请尝试设计一个 <code>O(n log(n))</code> 时间复杂度的解法。</li>
</ul>


## 分析

遍历每个位置 j 作为结尾，找符合条件的最短子串 [i, j] 即可。

发现遍历中 i 必然是不动或向右移的，因此是滑动窗口。

## 解答

```python
def minSubArrayLen(self, target: int, nums: List[int]) -> int:
    res, i, s = float('inf'), 0, 0
    for j, num in enumerate(nums):
        s += num
        while s >= target:
            res = min(res, j-i+1)
            s -= nums[i]
            i += 1
    return res if res < float('inf') else 0
```
36 ms

## *附加

有个巧妙的二分查找方法：
- 以答案 x 为界，长度小于 x 的子数组必然都不符合，长度 >= x 的子数组中必然有一个符合
- 因此可以二分查找第一个 y 使得存在长度 y 的子数组符合
- 判断是否存在长度 y 的子数组符合，可以用滑动窗口在 O(N) 内实现
- y 的取值范围是 [1,n]，所以最终的时间复杂度为 O(N log N)

```python
def minSubArrayLen(self, target: int, nums: List[int]) -> int:
    def check(x):
        s = 0
        for j, num in enumerate(nums):
            s += num
            if j >= x:
                s -= nums[j-x]
            if j >= x-1 and s >= target:
                return True
        return False

    self.__class__.__getitem__ = lambda self, x: check(x)
    return 0 if sum(nums)<target else bisect_left(self, True, 0, len(nums))
```
76 ms
