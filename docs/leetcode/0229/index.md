# 0229：多数元素 II（★）


> <u>**[力扣第 229 题](https://leetcode.cn/problems/majority-element-ii/)**</u>

## 题目

<p>给定一个大小为 <em>n </em>的整数数组，找出其中所有出现超过 <code>⌊ n/3 ⌋</code> 次的元素。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [3,2,3]
<strong>输出：</strong>[3]</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1]
<strong>输出：</strong>[1]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2]
<strong>输出：</strong>[1,2]</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
</ul>



<p><strong>进阶：</strong>尝试设计时间复杂度为 O(n)、空间复杂度为 O(1)的算法解决此问题。</p>


**相似问题：**
- [0169：多数元素](/leetcode/0169)
- [1150：检查一个数是否在数组中占绝大多数（1249 分）](/leetcode/1150)
- [2404：出现最频繁的偶数元素（1259 分）](/leetcode/2404)


## 分析

{{< lc "0169" >}} 升级版，可以直接计数，也可以考虑摩尔投票法。
- 在 nums 中任意消除三个不同的数直到剩下两种数或一种数
- 假如 nums 中存在超过 ⌊ n/3 ⌋ 次的元素，那么该元素必然会留下来
- 因此检查最终留下来的数是否符合即可

> 这可以推广到求超过 ⌊ n/k ⌋ 次的元素。

## 解答

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        ct = defaultdict(int)
        for x in nums:
            ct[x] += 1
            if len(ct)==3:
                for x in list(ct):
                    ct[x] -= 1
                    if not ct[x]:
                        del ct[x]
        return [x for x in ct if nums.count(x)>len(nums)//3]
```
38 ms
