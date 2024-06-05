# 0137：只出现一次的数字 II（★）


> <u>**[力扣第 137 题](https://leetcode.cn/problems/single-number-ii/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，除某个元素仅出现 <strong>一次</strong> 外，其余每个元素都恰出现 <strong>三次 。</strong>请你找出并返回那个只出现了一次的元素。</p>

<p>你必须设计并实现线性时间复杂度的算法且使用常数级空间来解决此问题。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,2,3,2]
<strong>输出：</strong>3
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [0,1,0,1,0,1,99]
<strong>输出：</strong>99
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
<li><code>nums</code> 中，除某个元素仅出现 <strong>一次</strong> 外，其余每个元素都恰出现 <strong>三次</strong></li>
</ul>


## 分析


要不用额外空间实现，有个非常巧妙的位运算方法：[逻辑电路角度详细分析该题思路](https://leetcode-cn.com/problems/single-number-ii/solution/luo-ji-dian-lu-jiao-du-xiang-xi-fen-xi-gai-ti-si-l/)。

## 解答

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        X, Y = 0, 0
        for Z in nums:
            Y = Y ^ Z & ~X
            X = X ^ Z & ~Y
        return Y
```
35 ms

