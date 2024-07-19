# 0219：存在重复元素 II


> <u>**[力扣第 219 题](https://leetcode.cn/problems/contains-duplicate-ii/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 和一个整数 <code>k</code> ，判断数组中是否存在两个 <strong>不同的索引</strong><em> </em><code>i</code> 和<em> </em><code>j</code> ，满足 <code>nums[i] == nums[j]</code> 且 <code>abs(i - j) &lt;= k</code> 。如果存在，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,1], k<em> </em>= 3
<strong>输出：</strong>true</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,0,1,1], k<em> </em>=<em> </em>1
<strong>输出：</strong>true</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,1,2,3], k<em> </em>=<em> </em>2
<strong>输出：</strong>false</pre>





<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
<li><code>0 &lt;= k &lt;= 10<sup>5</sup></code></li>
</ul>


**相似问题：**
- [0217：存在重复元素](/leetcode/0217)
- [0220：存在重复元素 III](/leetcode/0220)


## 分析

典型的哈希表，边遍历边存储元素位置，并判断上一个位置是否在范围内即可。

## 解答

```python
class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        d = {}
        for i,x in enumerate(nums):
            if i-d.get(x,-inf)<=k:
                return True
            d[x] = i
        return False
```
76 ms


