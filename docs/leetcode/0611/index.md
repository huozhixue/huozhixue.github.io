# 0611：有效三角形的个数（★）


> <u>**[力扣第 611 题](https://leetcode.cn/problems/valid-triangle-number/)**</u>

## 题目

<p>给定一个包含非负整数的数组 <code>nums</code> ，返回其中可以组成三角形三条边的三元组个数。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> nums = [2,2,3,4]
<strong>输出:</strong> 3
<strong>解释:</strong>有效的组合是:
2,3,4 (使用第一个 2)
2,3,4 (使用第二个 2)
2,2,3
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums = [4,2,3,4]
<strong>输出:</strong> 4</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 1000</code></li>
<li><code>0 &lt;= nums[i] &lt;= 1000</code></li>
</ul>


**相似问题：**
- [0259：较小的三数之和](/leetcode/0259)
- [2971：找到最大周长的多边形（1521 分）](/leetcode/2971)


## 分析

- 只要 a、b、c 满足 0<a<=b<=c<a+b，即可组成三角形
- 因此将 nums 排序，并固定最长边为 nums[k]，即转为求两数之和大于某值的个数，可以用双指针解决

## 解答


```python
class Solution:
    def triangleNumber(self, nums: List[int]) -> int:
        nums.sort()
        n = len(nums)
        res = 0
        for k in range(2,n):
            i,j = 0,k-1
            while i<j:
                if nums[i]+nums[j]<=nums[k]:
                    i += 1
                else:
                    res += j-i
                    j -= 1
        return res
```
556 ms
