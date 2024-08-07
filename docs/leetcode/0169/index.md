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


**相似问题：**
- [0229：多数元素 II](/leetcode/0229)
- [1150：检查一个数是否在数组中占绝大多数（1249 分）](/leetcode/1150)
- [2404：出现最频繁的偶数元素（1259 分）](/leetcode/2404)
- [2780：合法分割的最小下标（1549 分）](/leetcode/2780)
- [3065：超过阈值的最少操作数 I（1149 分）](/leetcode/3065)


## 分析

要求空间 O(1)，有个经典的摩尔投票法 ：
- 在 nums 中任意消除两个不同的数直到剩下的数都相同
- 假如 nums 中存在多数元素，那么该元素必然会留下来
- 因此返回最终留下来的数即可
 
## 解答

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        res,w = None,0
        for x in nums:
            if w==0:
                res,w = x,1
            else:
                w += 1 if x==res else -1
        return res
```
39 ms


