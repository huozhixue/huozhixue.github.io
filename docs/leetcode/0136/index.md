# 0136：只出现一次的数字


> <u>**[力扣第 136 题](https://leetcode.cn/problems/single-number/)**</u>

## 题目

<p>给你一个 <strong>非空</strong> 整数数组 <code>nums</code> ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。</p>

<p>你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。</p>

<div class="original__bRMd">
<div>


<p><strong class="example">示例 1 ：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,2,1]
<strong>输出：</strong>1
</pre>

<p><strong class="example">示例 2 ：</strong></p>

<pre>
<strong>输入：</strong>nums = [4,1,2,1,2]
<strong>输出：</strong>4
</pre>

<p><strong class="example">示例 3 ：</strong></p>

<pre>
<strong>输入：</strong>nums = [1]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>-3 * 10<sup>4</sup> &lt;= nums[i] &lt;= 3 * 10<sup>4</sup></code></li>
<li>除了某个元素只出现一次以外，其余每个元素均出现两次。</li>
</ul>
</div>
</div>


**相似问题：**
- [0137：只出现一次的数字 II](/leetcode/0137)
- [0260：只出现一次的数字 III](/leetcode/0260)
- [0268：丢失的数字](/leetcode/0268)
- [0287：寻找重复数](/leetcode/0287)
- [0389：找不同](/leetcode/0389)
- [3158：求出出现两次数字的 XOR 值（1172 分）](/leetcode/3158)


## 分析


最简单的就是哈希表。要求不用额外空间实现，有个巧妙的位运算方法：
- 异或运算满足
	- 交换律和结合律
	- x^x=0
	- x^0=x
- 因此数组所有元素的异或结果即为所求

## 解答

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        return reduce(xor,nums)
```
40 ms

