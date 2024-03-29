# 0416：分割等和子集（★）


> <u>**[力扣第 416 题](https://leetcode.cn/problems/partition-equal-subset-sum/)**</u>

## 题目

<p>给你一个 <strong>只包含正整数 </strong>的 <strong>非空 </strong>数组 <code>nums</code> 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,5,11,5]
<strong>输出：</strong>true
<strong>解释：</strong>数组可以分割成 [1, 5, 5] 和 [11] 。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,5]
<strong>输出：</strong>false
<strong>解释：</strong>数组不能分割成两个元素和相等的子集。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 200</code></li>
<li><code>1 <= nums[i] <= 100</code></li>
</ul>


## 分析

### #1

令 s=sum(nums)。
- s 为奇数时显然无解
- s 为偶数时，问题等价于分割成子集和为 s//2

注意到 s//2 最大为 10^4，于是考虑递推 nums[:i] 能得到的所有子集和。

令 dp[i] 代表nums[:i] 能得到的所有 <=s//2 的子集和，那么

$$dp[i] = dp[i-1] \ | \ \\{x+nums[i-1] \\}_
{\substack{x \in dp[i-1] \\\ if \ x+nums[i-1]<=s//2} }$$
    
只要递推过程中找到 s//2 即为真。

```python
def canPartition(self, nums: List[int]) -> bool:
    s = sum(nums)
    if s%2:
        return False
    res = {0}
    for num in nums:
        for x in list(res):
            if x+num==s//2:
                return True
            if x+num<s//2:
                res.add(x+num)
    return False
```
380 ms

### #2

还有个巧妙的想法，可以将集合状态压缩为一个数 st，然后集合内所有数加上 num 得到的集合即是 st<<num。

这样显著优化了递推的时间。

## 解答

```python
def canPartition(self, nums: List[int]) -> bool:
	s = sum(nums)
	if s % 2:
		return False
	st = 1
	for num in nums:
		st |= st << num
		if st & (1 << (s//2)):
			return True
	return False
```
24 ms

