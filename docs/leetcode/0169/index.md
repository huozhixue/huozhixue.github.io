# 0169：多数元素


> <u>**[力扣第 169 题](https://leetcode.cn/problems/majority-element/)**</u>

## 题目

<p>给定一个大小为 <code>n</code><em> </em>的数组 <code>nums</code> ，返回其中的多数元素。多数元素是指在数组中出现次数 <strong>大于</strong> <code>⌊ n/2 ⌋</code> 的元素。</p>

<p>你可以假设数组是非空的，并且给定的数组总是存在多数元素。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [3,2,3]
<strong>输出：</strong>3</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,2,1,1,1,2,2]
<strong>输出：</strong>2
</pre>


<strong>提示：</strong>

<ul>
<li><code>n == nums.length</code></li>
<li><code>1 &lt;= n &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
</ul>



<p><strong>进阶：</strong>尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。</p>


## 分析

### #1

时间复杂度 O(N) 很简单，直接计数即可。

```python
def majorityElement(self, nums: List[int]) -> int:
	ct = Counter(nums)
	return max(ct, key=ct.get)
```

### #2

要求空间复杂度 O(1)，有个经典的摩尔投票法 ：
- 在 nums 中任意消除两个不同的数直到剩下的数都相同
- 假如 nums 中存在多数元素，那么该元素必然会留下来
- 因此返回最终留下来的数即可
 
## 解答

```python
def majorityElement(self, nums: List[int]) -> int:
    cand, cnt = None, 0
    for num in nums:
        cand = cand if cnt else num
        cnt += 1 if num == cand else -1
    return cand
```
56 ms


