# 0198：打家劫舍（★）


> <u>**[力扣第 198 题](https://leetcode.cn/problems/house-robber/)**</u>

## 题目

<p>你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，<strong>如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警</strong>。</p>

<p>给定一个代表每个房屋存放金额的非负整数数组，计算你<strong> 不触动警报装置的情况下 </strong>，一夜之内能够偷窃到的最高金额。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>[1,2,3,1]
<strong>输出：</strong>4
<strong>解释：</strong>偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
偷窃到的最高金额 = 1 + 3 = 4 。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>[2,7,9,3,1]
<strong>输出：</strong>12
<strong>解释：</strong>偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
偷窃到的最高金额 = 2 + 9 + 1 = 12 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 100</code></li>
<li><code>0 <= nums[i] <= 400</code></li>
</ul>


**相似问题：**
- [0152：乘积最大子数组](/leetcode/0152)
- [0213：打家劫舍 II](/leetcode/0213)
- [0256：粉刷房子](/leetcode/0256)
- [0276：栅栏涂色](/leetcode/0276)
- [0337：打家劫舍 III](/leetcode/0337)
- [0600：不含连续1的非负整数](/leetcode/0600)
- [0656：成本最小路径](/leetcode/0656)
- [0740：删除并获得点数](/leetcode/0740)
- [2140：解决智力问题（1709 分）](/leetcode/2140)
- [2320：统计放置房子的方式数（1607 分）](/leetcode/2320)
- [2560：打家劫舍 IV（2081 分）](/leetcode/2560)
- [2611：老鼠和奶酪（1663 分）](/leetcode/2611)
- [2789：合并后数组中的最大元素（1484 分）](/leetcode/2789)


## 分析

- 经典 dp，按偷不偷最后一家即可递归
- 可以优化为两个变量
 
## 解答

```python
class Solution:
    def rob(self, nums: List[int]) -> int:
        a,b = 0,0
        for x in nums:
            a,b = b,max(a+x,b)
        return b
```
40 ms



