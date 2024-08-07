# 0041：缺失的第一个正数（★★）


> <u>**[力扣第 41 题](https://leetcode.cn/problems/first-missing-positive/)**</u>

## 题目

<p>给你一个未排序的整数数组 <code>nums</code> ，请你找出其中没有出现的最小的正整数。</p>
请你实现时间复杂度为 <code>O(n)</code> 并且只使用常数级别额外空间的解决方案。



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,0]
<strong>输出：</strong>3
<strong>解释：</strong>范围 [1,2] 中的数字都在数组中。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [3,4,-1,1]
<strong>输出：</strong>2
<strong>解释：</strong>1 在数组中，但 2 没有。</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [7,8,9,11,12]
<strong>输出：</strong>1
<strong>解释：</strong>最小的正数 1 没有出现。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
</ul>


**相似问题：**
- [0268：丢失的数字](/leetcode/0268)
- [0287：寻找重复数](/leetcode/0287)
- [0448：找到所有数组中消失的数字](/leetcode/0448)
- [0765：情侣牵手（1999 分）](/leetcode/0765)
- [2336：无限集中的最小数字（1375 分）](/leetcode/2336)
- [2554：从一个范围内选择最多整数 I（1333 分）](/leetcode/2554)
- [2598：执行操作后的最大 MEX（1845 分）](/leetcode/2598)
- [2557：从一个范围内选择最多整数 II](/leetcode/2557)
- [2996：大于等于顺序前缀和的最小缺失整数（1405 分）](/leetcode/2996)


## 分析 

- 最简单的，从小到大枚举正数，没出现就返回
- 不目要求 O(1) 空间，只能考虑交换或赋值
	- 于是想到把正数都放在对应的位置上，比如 1 放在第 1 位，3 放在第 3 位，
	那么再遍历就能发现缺的第一个正数了
	- 本题不能直接赋值，可能会覆盖掉有用信息，所以考虑交换
	- 如果交换过来还是范围内的正数，应该循环操作
	- 为了防止死循环，当要交换的两个数相等时就应跳出

## 解答

```python
class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        n = len(nums)
        for i,x in enumerate(nums):
            while 1<=x<=n and x!=nums[x-1]:
                nums[i],nums[x-1] = nums[x-1],nums[i]
                x = nums[i]
        for i,x in enumerate(nums):
            if x!=i+1:
                return i+1
        return n+1
```
84 ms
