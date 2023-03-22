# 0324：摆动排序 II（★）


> <u>**[力扣第 324 题](https://leetcode.cn/problems/wiggle-sort-ii/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code>，将它重新排列成 <code>nums[0] < nums[1] > nums[2] < nums[3]...</code> 的顺序。</p>

<p>你可以假设所有输入数组都可以得到满足题目要求的结果。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,5,1,1,6,4]
<strong>输出：</strong>[1,6,1,5,1,4]
<strong>解释：</strong>[1,4,1,5,1,6] 同样是符合题目要求的结果，可以被判题程序接受。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,3,2,2,3,1]
<strong>输出：</strong>[2,3,1,3,1,2]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 5 * 10<sup>4</sup></code></li>
<li><code>0 <= nums[i] <= 5000</code></li>
<li>题目数据保证，对于给定的输入 <code>nums</code> ，总能产生满足题目要求的结果</li>
</ul>



<p><strong>进阶：</strong>你能用 O(n) 时间复杂度和 / 或原地 O(1) 额外空间来实现吗？</p>


## 分析

容易想到将较小的一半和较大的一半交叉放：
- 令 a=max(较小的一半数)，b=min(较大的一半)
- 假如 a<b，按顺序放就可以了
- 假如 a==b 时，按顺序放可能不行
	- 比如用例 [1，2，4，4，4，6] 按顺序放是 [1,4,2,4,4,6]
	- 直觉上来说，应该使 a、b 尽量远离。因此考虑令 a 尽量靠左放，b 尽量靠右放
	- 比如用例 [1，2，4，4，4，6] 可以放置为 [4,6,1,4,2,4] 即符合条件
	- 为了方便，较小/大的一半都逆序放即可

最后证明一下该方案不可行时，必然无解：
- 假设 n=len(nums) 为偶数
	- 该方案不可行，意味着某个数 x 出现了至少 n//2+1 次
	- 显然不管怎么排列都有两个 x 相邻，无解
- 假设 n 为奇数
	- 该方案不可行时意味着 nums[:-1] 中某个数 x 出现了至少 n//2+1 次
	- 此时 y = nums[-1] 是 nums 的最小值。
	- 为了使 x 都不相邻，只能将 x 都放在偶数位上。但此时 y 无处可放，无解
    

## 解答

```python
def wiggleSort(self, nums: List[int]) -> None:
    n = len(nums)
    nums.sort(reverse=True)
    nums[1::2], nums[::2] = nums[:n//2], nums[n//2:]
```
48 ms

