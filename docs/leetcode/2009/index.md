# 2009：使数组连续的最少操作数（2084 分）


> <u>**[力扣第 61 场双周赛第 4 题](https://leetcode.cn/problems/minimum-number-of-operations-to-make-array-continuous/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 。每一次操作中，你可以将 <code>nums</code> 中 <strong>任意</strong> 一个元素替换成 <strong>任意 </strong>整数。</p>

<p>如果 <code>nums</code> 满足以下条件，那么它是 <strong>连续的</strong> ：</p>

<ul>
<li><code>nums</code> 中所有元素都是 <b>互不相同</b> 的。</li>
<li><code>nums</code> 中 <strong>最大</strong> 元素与 <strong>最小</strong> 元素的差等于 <code>nums.length - 1</code> 。</li>
</ul>

<p>比方说，<code>nums = [4, 2, 5, 3]</code> 是 <strong>连续的</strong> ，但是 <code>nums = [1, 2, 3, 5, 6]</code> <strong>不是连续的</strong> 。</p>

<p>请你返回使 <code>nums</code> <strong>连续</strong> 的 <strong>最少</strong> 操作次数。</p>



<p><strong>示例 1：</strong></p>

<pre><b>输入：</b>nums = [4,2,5,3]
<b>输出：</b>0
<b>解释：</b>nums 已经是连续的了。
</pre>

<p><strong>示例 2：</strong></p>

<pre><b>输入：</b>nums = [1,2,3,5,6]
<b>输出：</b>1
<b>解释：</b>一个可能的解是将最后一个元素变为 4 。
结果数组为 [1,2,3,5,4] ，是连续数组。
</pre>

<p><strong>示例 3：</strong></p>

<pre><b>输入：</b>nums = [1,10,100,1000]
<b>输出：</b>3
<b>解释：</b>一个可能的解是：
- 将第二个元素变为 2 。
- 将第三个元素变为 3 。
- 将第四个元素变为 4 。
结果数组为 [1,2,3,4] ，是连续数组。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
</ul>


**相似问题：**
- [0424：替换后的最长重复字符](/leetcode/0424)
- [0523：连续的子数组和](/leetcode/0523)
- [1040：移动石子直到连续 II（2455 分）](/leetcode/1040)
- [1611：使整数变为 0 的最少操作次数（2345 分）](/leetcode/1611)
- [1703：得到连续 K 个 1 的最少相邻交换次数（2466 分）](/leetcode/1703)


## 分析

- 连续数组显然就是排序后等差1的数组
- 问题等价于找 x，使得 nums 和 [x-n+1,x] 区间的重叠元素最多
- 这是典型的滑窗问题，用双指针即可
	- 注意 nums 要去重，因为相同元素只能算一次

## 解答
```python
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        n = len(nums)
        A = sorted(set(nums))
        res,i = 0,0
        for j,x in enumerate(A):
            while A[i]<=x-n:
                i += 1
            res = max(res,j-i+1)
        return n-res
```
154 ms

