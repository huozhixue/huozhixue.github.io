# 1402：做菜顺序（1679 分）


> <u>**[力扣第 23 场双周赛第 4 题](https://leetcode.cn/problems/reducing-dishes/)**</u>

## 题目

<p>一个厨师收集了他 <code>n</code> 道菜的满意程度 <code>satisfaction</code> ，这个厨师做出每道菜的时间都是 1 单位时间。</p>

<p>一道菜的 「 <strong>like-time 系数 </strong>」定义为烹饪这道菜结束的时间（包含之前每道菜所花费的时间）乘以这道菜的满意程度，也就是 <code>time[i]</code>*<code>satisfaction[i]</code> 。</p>

<p>返回厨师在准备了一定数量的菜肴后可以获得的最大 <strong>like-time 系数</strong> 总和。</p>

<p>你可以按 <strong>任意</strong> 顺序安排做菜的顺序，你也可以选择放弃做某些菜来获得更大的总和。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>satisfaction = [-1,-8,0,5,-9]
<strong>输出：</strong>14
<strong>解释：</strong>去掉第二道和最后一道菜，最大的 like-time 系数和为 (-1*1 + 0*2 + 5*3 = 14) 。每道菜都需要花费 1 单位时间完成。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>satisfaction = [4,3,2]
<strong>输出：</strong>20
<strong>解释：可以</strong>按照任意顺序做菜 (2*1 + 3*2 + 4*3 = 20)
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>satisfaction = [-1,-4,-5]
<strong>输出：</strong>0
<strong>解释：</strong>大家都不喜欢这些菜，所以不做任何菜就可以获得最大的 like-time 系数。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == satisfaction.length</code></li>
<li><code>1 &lt;= n &lt;= 500</code></li>
<li><code>-1000 &lt;= satisfaction[i] &lt;= 1000</code></li>
</ul>




## 分析

- 假如要选 k 道菜，显然应该选最大的 k 道，且按从小到大的顺序做（排序不等式）
- 因此先从大到小排序得到数组 A，遍历 k，求 f(k)=A[0]*k+A[1]*(k-1)+...+A[k-1]*1
- 注意到 f(k)=f(k-1)+sum(A[:k])
- 因此累加 A 为正的前缀和即可

## 解答


```python
class Solution:
    def maxSatisfaction(self, satisfaction: List[int]) -> int:
        A = sorted(satisfaction)[::-1]
        return sum(a for a in accumulate(A) if a>0)
```
0 ms

