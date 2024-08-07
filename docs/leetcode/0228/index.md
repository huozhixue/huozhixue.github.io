# 0228：汇总区间


> <u>**[力扣第 228 题](https://leetcode.cn/problems/summary-ranges/)**</u>

## 题目

<p>给定一个  <strong>无重复元素</strong> 的 <strong>有序</strong> 整数数组 <code>nums</code> 。</p>

<p>返回 <em><strong>恰好覆盖数组中所有数字</strong> 的 <strong>最小有序</strong> 区间范围列表 </em>。也就是说，<code>nums</code> 的每个元素都恰好被某个区间范围所覆盖，并且不存在属于某个范围但不属于 <code>nums</code> 的数字 <code>x</code> 。</p>

<p>列表中的每个区间范围 <code>[a,b]</code> 应该按如下格式输出：</p>

<ul>
<li><code>"a-&gt;b"</code> ，如果 <code>a != b</code></li>
<li><code>"a"</code> ，如果 <code>a == b</code></li>
</ul>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [0,1,2,4,5,7]
<strong>输出：</strong>["0-&gt;2","4-&gt;5","7"]
<strong>解释：</strong>区间范围是：
[0,2] --&gt; "0-&gt;2"
[4,5] --&gt; "4-&gt;5"
[7,7] --&gt; "7"
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [0,2,3,4,6,8,9]
<strong>输出：</strong>["0","2-&gt;4","6","8-&gt;9"]
<strong>解释：</strong>区间范围是：
[0,0] --&gt; "0"
[2,4] --&gt; "2-&gt;4"
[6,6] --&gt; "6"
[8,9] --&gt; "8-&gt;9"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= nums.length &lt;= 20</code></li>
<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
<li><code>nums</code> 中的所有值都 <strong>互不相同</strong></li>
<li><code>nums</code> 按升序排列</li>
</ul>


**相似问题：**
- [0163：缺失的区间](/leetcode/0163)
- [0352：将数据流变为多个不相交区间](/leetcode/0352)
- [2655：寻找最大长度的未覆盖区间](/leetcode/2655)


## 分析

遍历数组，记录连续区间的首尾即可。

## 解答
```python
class Solution:
    def summaryRanges(self, nums: List[int]) -> List[str]:
        res, i = [], 0
        for j,x in enumerate(nums):
            if j==len(nums)-1 or nums[j+1]>x+1:
                res.append(str(nums[i])+'->'+str(x) if j>i else str(x))
                i = j+1
        return res
```
32 ms
