# 1235：规划兼职工作（2022 分）


> <u>**[力扣第 159 场周赛第 4 题](https://leetcode.cn/problems/maximum-profit-in-job-scheduling/)**</u>

## 题目

<p>你打算利用空闲时间来做兼职工作赚些零花钱。</p>

<p>这里有 <code>n</code> 份兼职工作，每份工作预计从 <code>startTime[i]</code> 开始到 <code>endTime[i]</code> 结束，报酬为 <code>profit[i]</code>。</p>

<p>给你一份兼职工作表，包含开始时间 <code>startTime</code>，结束时间 <code>endTime</code> 和预计报酬 <code>profit</code> 三个数组，请你计算并返回可以获得的最大报酬。</p>

<p>注意，时间上出现重叠的 2 份工作不能同时进行。</p>

<p>如果你选择的工作在时间 <code>X</code> 结束，那么你可以立刻进行在时间 <code>X</code> 开始的下一份工作。</p>



<p><strong class="example">示例 1：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/10/19/sample1_1584.png" style="width: 300px;" /></strong></p>

<pre>
<strong>输入：</strong>startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]
<strong>输出：</strong>120
<strong>解释：
</strong>我们选出第 1 份和第 4 份工作，
时间范围是 [1-3]+[3-6]，共获得报酬 120 = 50 + 70。
</pre>

<p><strong class="example">示例 2：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/10/19/sample22_1584.png" style="height: 112px; width: 600px;" /> </strong></p>

<pre>
<strong>输入：</strong>startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]
<strong>输出：</strong>150
<strong>解释：
</strong>我们选择第 1，4，5 份工作。
共获得报酬 150 = 20 + 70 + 60。
</pre>

<p><strong class="example">示例 3：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/10/19/sample3_1584.png" style="height: 112px; width: 400px;" /></strong></p>

<pre>
<strong>输入：</strong>startTime = [1,1,1], endTime = [2,3,4], profit = [5,6,4]
<strong>输出：</strong>6
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= startTime.length == endTime.length == profit.length &lt;= 5 * 10^4</code></li>
<li><code>1 &lt;= startTime[i] &lt; endTime[i] &lt;= 10^9</code></li>
<li><code>1 &lt;= profit[i] &lt;= 10^4</code></li>
</ul>


**相似问题：**
- [2008：出租车的最大盈利（1871 分）](/leetcode/2008)
- [2054：两个最好的不重叠活动（1883 分）](/leetcode/2054)


## 分析

- 若选了第一个工作，那么接下来从开始时间 >= endTime[0] 的工作中选
- 因此先把工作按开始时间排序，二分查找到第一个满足的 j，即转为递归子问题

## 解答


```python
class Solution:
    def jobScheduling(self, startTime: List[int], endTime: List[int], profit: List[int]) -> int:
        A = sorted(zip(startTime,endTime,profit))
        n = len(A)
        f = [0]*(n+1)
        for i in range(n-1,-1,-1):
            j = bisect_left(A,(A[i][1],))
            f[i] = max(f[i+1],f[j]+A[i][2])
        return f[0]
```
178 ms
