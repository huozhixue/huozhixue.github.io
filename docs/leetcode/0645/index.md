# 0645：错误的集合


> <u>**[力扣第 645 题](https://leetcode.cn/problems/set-mismatch/)**</u>

## 题目

<p>集合 <code>s</code> 包含从 <code>1</code> 到 <code>n</code> 的整数。不幸的是，因为数据错误，导致集合里面某一个数字复制了成了集合里面的另外一个数字的值，导致集合 <strong>丢失了一个数字</strong> 并且 <strong>有一个数字重复</strong> 。</p>

<p>给定一个数组 <code>nums</code> 代表了集合 <code>S</code> 发生错误后的结果。</p>

<p>请你找出重复出现的整数，再找到丢失的整数，将它们以数组的形式返回。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,2,4]
<strong>输出：</strong>[2,3]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,1]
<strong>输出：</strong>[1,2]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 <= nums.length <= 10<sup>4</sup></code></li>
<li><code>1 <= nums[i] <= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [0287：寻找重复数](/leetcode/0287)


## 分析

去重后显然元素之和少的就是重复的数。而去重后的元素之和比 1 到 n 之和少的就是丢失的数字。

## 解答

```python
def findErrorNums(self, nums: List[int]) -> List[int]:
	s, n = sum(set(nums)), len(nums)
	return [sum(nums) - s, n*(n+1)//2 - s]
```

48 ms

