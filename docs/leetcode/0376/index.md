# 0376：摆动序列（★）


> <u>**[力扣第 376 题](https://leetcode.cn/problems/wiggle-subsequence/)**</u>

## 题目

<p>如果连续数字之间的差严格地在正数和负数之间交替，则数字序列称为<strong> 摆动序列 。</strong>第一个差（如果存在的话）可能是正数或负数。仅有一个元素或者含两个不等元素的序列也视作摆动序列。</p>

<ul>
<li>
<p>例如， <code>[1, 7, 4, 9, 2, 5]</code> 是一个 <strong>摆动序列</strong> ，因为差值 <code>(6, -3, 5, -7, 3)</code> 是正负交替出现的。</p>
</li>
<li>相反，<code>[1, 4, 7, 2, 5]</code> 和 <code>[1, 7, 4, 5, 5]</code> 不是摆动序列，第一个序列是因为它的前两个差值都是正数，第二个序列是因为它的最后一个差值为零。</li>
</ul>

<p><strong>子序列</strong> 可以通过从原始序列中删除一些（也可以不删除）元素来获得，剩下的元素保持其原始顺序。</p>

<p>给你一个整数数组 <code>nums</code> ，返回 <code>nums</code> 中作为 <strong>摆动序列 </strong>的 <strong>最长子序列的长度</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,7,4,9,2,5]
<strong>输出：</strong>6
<strong>解释：</strong>整个序列均为摆动序列，各元素之间的差值为 (6, -3, 5, -7, 3) 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,17,5,10,13,15,10,5,16,8]
<strong>输出：</strong>7
<strong>解释：</strong>这个序列包含几个长度为 7 摆动序列。
其中一个是 [1, 17, 10, 13, 10, 16, 8] ，各元素之间的差值为 (16, -7, 3, -3, 6, -8) 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,4,5,6,7,8,9]
<strong>输出：</strong>2
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 1000</code></li>
<li><code>0 <= nums[i] <= 1000</code></li>
</ul>



<p><strong>进阶：</strong>你能否用 <code>O(n)</code><em> </em>时间复杂度完成此题?</p>


**相似问题：**
- [2149：按符号重排数组（1235 分）](/leetcode/2149)


## 分析

### #1

- 按结尾元素即可递推
- 令 U[i],D[i] 代表以位置 i 结尾且最后一个差值为正/负的最大长度

    
```python
class Solution:
    def wiggleMaxLength(self, nums: List[int]) -> int:
        n = len(nums)
        U = [1]+[0]*(n-1)
        D = [1]+[0]*(n-1)
        for i in range(1,n):
            U[i] = 1+max([D[j] for j in range(i) if nums[j]<nums[i]],default=0)
            D[i] = 1+max([U[j] for j in range(i) if nums[j]>nums[i]],default=0)
        return max(max(U),max(D))
```
91 ms

### #2

- 考虑优化，可以比较 U[i] 和 U[i-1] 的递推式
- U[i] 只比 U[i-1] 多了 j=i-1 的遍历
- 因此， U[i]=max(U[i-1],1+D[i-1] if nums[i-1]<nums[i] else -inf)
- D 同理
- U/D 由相邻项即可递推，而且递增，所以直接优化为 u,d 两个参数

```python
class Solution:
    def wiggleMaxLength(self, nums: List[int]) -> int:
        u,d = 1,1
        for a,b in pairwise(nums):
            u,d = (max(u,d+1),d) if a<b else (u,max(u+1,d)) if a>b else (u,d)
        return max(u,d)
```
37 ms

### #3

还可以用贪心的思路：
- 显然相邻重复的点只留一个即可，其它可以去掉
- 假设存在 nums[i-1]<nums[i]<nums[i+1]
	- 任意包含 nums[i] 的摆动序列都可以将 nums[i] 替换为 nums[i-1] 或 nums[i+1]，依然是摆动序列
	- 所以可以去掉这样的 nums[i]
- 同理，当 nums[i-1]>nums[i]>nums[i+1] 时，也可以去掉 nums[i]
- 因此只需要考虑拐点，计数即可

## 解答

```python
class Solution:
    def wiggleMaxLength(self, nums: List[int]) -> int:
        A = [a for a,_ in groupby(nums)]
        n = len(A)
        return sum(i in [0, n-1] or (A[i]-A[i-1])*(A[i]-A[i+1])>0 for i in range(n))
```
38 ms


