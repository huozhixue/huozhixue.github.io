# 1330：翻转子数组得到最大的数组值（2481 分）


> <u>**[力扣第 18 场双周赛第 4 题](https://leetcode.cn/problems/reverse-subarray-to-maximize-array-value/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 。「数组值」定义为所有满足 <code>0 &lt;= i &lt; nums.length-1</code> 的 <code>|nums[i]-nums[i+1]|</code> 的和。</p>

<p>你可以选择给定数组的任意子数组，并将该子数组翻转。但你只能执行这个操作 <strong>一次</strong> 。</p>

<p>请你找到可行的最大 <strong>数组值 </strong>。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>nums = [2,3,1,5,4]
<strong>输出：</strong>10
<strong>解释：</strong>通过翻转子数组 [3,1,5] ，数组变成 [2,5,1,3,4] ，数组值为 10 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>nums = [2,4,9,24,2,1,10]
<strong>输出：</strong>68
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 3*10^4</code></li>
<li><code>-10^5 &lt;= nums[i] &lt;= 10^5</code></li>
</ul>




## 分析

- 假设翻转的是 [i,j] 区间，令 a=nums[i-1],b=nums[i],c=nums[j],nums[j+1]
	- 翻转前，贡献为 |a-b|+|c-d|
	- 翻转后，贡献为 |a-c|+|b-d|
	- 即是求贡献变化的最大值
- 绝对值问题可以试着数形结合
	- 将 abcd 看作数轴上的 4 个点，即是求线段长度 ac+bd-ab-cd 的最大值
	- 假如线段 ab 和 cd 有重叠部分
		- 若 c 在 ab 之间，那么 ab=ac+cb，ab+cd=ac+cb+cd>=ac+bd，翻转无用
		- 同理，若 d 在 ab 之间，ab+cd=bd+ad+cd>=bd+ac，翻转无用
	- 因此，只需要考虑 ab 和 cd 不重叠的情况
		- 若 ab 在前，贡献变化即是 (min(c,d)-max(a,b))*2
		- 若 cd 在前，即是 (min(a,b)-max(c,d))*2
	- 因此，只需遍历相邻元素 a、b，求出 min(a,b) 的最大值和 max(a,b) 的最小值即可
- 还有种特殊情况是 i=0 或 j=n-1，需要遍历计算贡献变化

## 解答


```python
class Solution:
    def maxValueAfterReverse(self, nums: List[int]) -> int:
        base,add = 0,0
        mi,ma = inf,-inf
        for a,b in pairwise(nums):
            w = abs(a-b)
            base += w
            add = max(add,abs(nums[0]-b)-w,abs(nums[-1]-a)-w)
            mi = min(mi,max(a,b))
            ma = max(ma,min(a,b))
        return base+max(add,(ma-mi)*2)
```
195 ms
