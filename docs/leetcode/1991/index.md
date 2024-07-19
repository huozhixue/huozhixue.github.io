# 1991：找到数组的中间位置（1302 分）


> <u>**[力扣第 60 场双周赛第 1 题](https://leetcode.cn/problems/find-the-middle-index-in-array/)**</u>

## 题目

<p>给你一个下标从 <strong>0</strong> 开始的整数数组 <code>nums</code> ，请你找到 <strong>最左边</strong> 的中间位置 <code>middleIndex</code> （也就是所有可能中间位置下标最小的一个）。</p>

<p>中间位置 <code>middleIndex</code> 是满足 <code>nums[0] + nums[1] + ... + nums[middleIndex-1] == nums[middleIndex+1] + nums[middleIndex+2] + ... + nums[nums.length-1]</code> 的数组下标。</p>

<p>如果 <code>middleIndex == 0</code> ，左边部分的和定义为 <code>0</code> 。类似的，如果 <code>middleIndex == nums.length - 1</code> ，右边部分的和定义为 <code>0</code> 。</p>

<p>请你返回满足上述条件 <strong>最左边</strong> 的<em> </em><code>middleIndex</code> ，如果不存在这样的中间位置，请你返回 <code>-1</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<b>输入：</b>nums = [2,3,-1,<em><strong>8</strong></em>,4]
<b>输出：</b>3
<strong>解释：</strong>
下标 3 之前的数字和为：2 + 3 + -1 = 4
下标 3 之后的数字和为：4 = 4
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<b>输入：</b>nums = [1,-1,<em><strong>4</strong></em>]
<b>输出：</b>2
<strong>解释：</strong>
下标 2 之前的数字和为：1 + -1 = 0
下标 2 之后的数字和为：0
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<b>输入：</b>nums = [2,5]
<b>输出：</b>-1
<b>解释：</b>
不存在符合要求的 middleIndex 。
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<b>输入：</b>nums = [<em><strong>1</strong></em>]
<b>输出：</b>0
<strong>解释：</strong>
下标 0 之前的数字和为：0
下标 0 之后的数字和为：0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 100</code></li>
<li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>
</ul>



<p><strong>注意：</strong>本题与主站 724 题相同：<a href="https://leetcode-cn.com/problems/find-pivot-index/" target="_blank">https://leetcode-cn.com/problems/find-pivot-index/</a></p>


**相似问题：**
- [0724：寻找数组的中心下标](/leetcode/0724)
- [1013：将数组分成和相等的三个部分（1378 分）](/leetcode/1013)
- [2270：分割数组的方案数（1334 分）](/leetcode/2270)
- [2219：数组的最大总分](/leetcode/2219)
- [2574：左右元素和的差值（1206 分）](/leetcode/2574)


## 分析

遍历找到第一个满足 sum(nums[:i])*2+nums[i] == sum(nums) 的 i 即可。

## 解答

```python
def findMiddleIndex(self, nums: List[int]) -> int:
    s, cur = sum(nums), 0
    for i, num in enumerate(nums):
        if cur == s-num-cur:
            return i
        cur += num
    return -1
```
40 ms

