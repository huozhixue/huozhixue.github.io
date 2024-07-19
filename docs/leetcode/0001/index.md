# 0001：两数之和


> <u>**[力扣第 1 题](https://leetcode.cn/problems/two-sum/)**</u>

## 题目

<p>给定一个整数数组 <code>nums</code> 和一个整数目标值 <code>target</code>，请你在该数组中找出 <strong>和为目标值 </strong><em><code>target</code></em>  的那 <strong>两个</strong> 整数，并返回它们的数组下标。</p>

<p>你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。</p>

<p>你可以按任意顺序返回答案。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,7,11,15], target = 9
<strong>输出：</strong>[0,1]
<strong>解释：</strong>因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [3,2,4], target = 6
<strong>输出：</strong>[1,2]
</pre>

<p><strong class="example">示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [3,3], target = 6
<strong>输出：</strong>[0,1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
<li><strong>只会存在一个有效答案</strong></li>
</ul>



<p><strong>进阶：</strong>你可以想出一个时间复杂度小于 <code>O(n<sup>2</sup>)</code> 的算法吗？</p>


**相似问题：**
- [0015：三数之和](/leetcode/0015)
- [0018：四数之和](/leetcode/0018)
- [0167：两数之和 II - 输入有序数组](/leetcode/0167)
- [0170：两数之和 III - 数据结构设计](/leetcode/0170)
- [0560：和为 K 的子数组](/leetcode/0560)
- [0653：两数之和 IV - 输入二叉搜索树](/leetcode/0653)
- [1099：小于 K 的两数之和（1245 分）](/leetcode/1099)
- [1679：K 和数对的最大数目（1345 分）](/leetcode/1679)
- [1711：大餐计数（1797 分）](/leetcode/1711)
- [2006：差的绝对值为 K 的数对数目（1271 分）](/leetcode/2006)
- [2023：连接后等于目标字符串的字符串对（1341 分）](/leetcode/2023)
- [2200：找出数组中的所有 K 近邻下标（1266 分）](/leetcode/2200)
- [2351：第一个出现两次的字母（1155 分）](/leetcode/2351)
- [2354：优质数对的数目（2075 分）](/leetcode/2354)
- [2367：算术三元组的数目（1203 分）](/leetcode/2367)
- [2374：边积分最高的节点（1418 分）](/leetcode/2374)
- [2399：检查相同字母间的距离（1243 分）](/leetcode/2399)
- [2395：和相等的子数组（1249 分）](/leetcode/2395)
- [2441：与对应负数同时存在的最大正整数（1167 分）](/leetcode/2441)
- [2465：不同的平均值数目（1250 分）](/leetcode/2465)
- [2824：统计和小于目标的下标对数目（1165 分）](/leetcode/2824)


## 分析

边遍历边用哈希存储元素位置，每轮查询前面是否有对应的数即可。
 
## 解答

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        d = {}
        for i,x in enumerate(nums):
            if target-x in d:
                return [d[target-x],i]
            d[x] = i
```
30 ms
