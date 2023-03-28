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


## 分析

### #1

最简单的就是哈希表。

```python
def singleNumber(self, nums: List[int]) -> int:
    return [x for x,freq in Counter(nums).items() if freq==1].pop()
```

40 ms

### #2

要求不用额外空间实现，有个非常巧妙的思路，利用了异或运算的特性。
- 满足交换律和结合律
- x^x=0
- x^0=x

可以推出：题目所给数组的所有元素的异或结果即为所求。

## 解答

```python
def singleNumber(self, nums: List[int]) -> int:
    return reduce(xor, nums)
```
40 ms

