# 2786：访问数组中的位置使分数最大（1732 分）


> <u>**[力扣第 109 场双周赛第 3 题](https://leetcode.cn/problems/visit-array-positions-to-maximize-score/)**</u>

## 题目

<p>给你一个下标从 <strong>0</strong> 开始的整数数组 <code>nums</code> 和一个正整数 <code>x</code> 。</p>

<p>你 <strong>一开始</strong> 在数组的位置 <code>0</code> 处，你可以按照下述规则访问数组中的其他位置：</p>

<ul>
<li>如果你当前在位置 <code>i</code> ，那么你可以移动到满足 <code>i &lt; j</code> 的 <strong>任意</strong> 位置 <code>j</code> 。</li>
<li>对于你访问的位置 <code>i</code> ，你可以获得分数 <code>nums[i]</code> 。</li>
<li>如果你从位置 <code>i</code> 移动到位置 <code>j</code> 且 <code>nums[i]</code> 和 <code>nums[j]</code> 的 <strong>奇偶性</strong> 不同，那么你将失去分数 <code>x</code> 。</li>
</ul>

<p>请你返回你能得到的 <strong>最大</strong> 得分之和。</p>

<p><strong>注意</strong> ，你一开始的分数为 <code>nums[0]</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre><b>输入：</b>nums = [2,3,6,1,9,2], x = 5
<b>输出：</b>13
<b>解释：</b>我们可以按顺序访问数组中的位置：0 -&gt; 2 -&gt; 3 -&gt; 4 。
对应位置的值为 2 ，6 ，1 和 9 。因为 6 和 1 的奇偶性不同，所以下标从 2 -&gt; 3 让你失去 x = 5 分。
总得分为：2 + 6 + 1 + 9 - 5 = 13 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><b>输入：</b>nums = [2,4,6,8], x = 3
<b>输出：</b>20
<b>解释：</b>数组中的所有元素奇偶性都一样，所以我们可以将每个元素都访问一次，而且不会失去任何分数。
总得分为：2 + 4 + 6 + 8 = 20 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= nums[i], x &lt;= 10<sup>6</sup></code></li>
</ul>


**相似问题：**
- [0045：跳跃游戏 II](/leetcode/0045)
- [0877：石子游戏（1590 分）](/leetcode/0877)


## 分析

- 维护以奇/偶数结尾的最大分数即可
- 因为 nums[0] 必选，所以倒推更方便

## 解答


```python
class Solution:
    def maxScore(self, nums: List[int], x: int) -> int:
        f = [0,0]
        for a in nums[::-1]:
            f[a%2] = max(f[a%2],f[a%2^1]-x)+a
        return f[nums[0]%2]
```
190 ms
