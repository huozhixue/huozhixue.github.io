# 3279：活塞占据的最大总区域（★★）


> <u>**[力扣第 3279 题](https://leetcode.cn/problems/maximum-total-area-occupied-by-pistons/)**</u>

## 题目

<p>一台旧车的引擎中有一些活塞，我们想要计算活塞 <strong>下方</strong> 的 <strong>最大</strong> 区域。</p>

<p>给定：</p>

<ul>
<li>一个整数 <code>height</code>，表示活塞 <strong>最大</strong> 可到达的高度。</li>
<li>一个整数数组 <code>positions</code>，其中 <code>positions[i]</code> 是活塞 <code>i</code> 的当前位置，等于其 <strong>下方</strong> 的当前区域。</li>
<li>一个字符串 <code>directions</code>，其中 <code>directions[i]</code> 是活塞 <code>i</code> 的当前移动方向，<code>'U'</code> 表示向上，<code>'D'</code> 表示向下。</li>
</ul>

<p>每一秒：</p>

<ul>
<li>每个活塞向它的当前方向移动 1 单位。即如果方向向上，<code>positions[i]</code> 增加 1。</li>
<li>如果一个活塞到达了其中一个终点，即 <code>positions[i] == 0</code> 或 <code>positions[i] == height</code>，它的方向将会改变。</li>
</ul>

<p>返回所有活塞下方的最大可能区域。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">height = 5, positions = [2,5], directions = "UD"</span></p>

<p><span class="example-io"><b>输出：</b>7</span></p>

<p><strong>解释：</strong></p>

<p>当前活塞的位置下方区域最大。</p>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">height = 6, positions = [0,0,6,3], directions = "UUDU"</span></p>

<p><span class="example-io"><b>输出：</b>15</span></p>

<p><strong>解释：</strong></p>

<p>三秒后，活塞将会位于 <code>[3, 3, 3, 6]</code>，此时下方区域最大。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= height &lt;= 10<sup>6</sup></code></li>
<li><code>1 &lt;= positions.length == directions.length &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= positions[i] &lt;= height</code></li>
<li><code>directions[i]</code> 为 <code>'U'</code> 或 <code>'D'</code>。</li>
</ul>




## 分析

- 运动以周期 height*2 循环，只需统计一个周期
- 维护每个时间点有多少往上、多少往下，即可维护面积的增量
- 每个活塞变向的时间是确定的，可以用差分

## 解答


```python
class Solution:
    def maxArea(self, height: int, positions: List[int], directions: str) -> int:
        d = defaultdict(int)
        for i,c in zip(positions,directions):
            if c=='U':
                d[0] += 1
                d[height-i] -= 2
                d[height*2-i] += 2
            else:
                d[0] -= 1
                d[i] += 2
                d[height+i] -= 2
        res = s = sum(positions)
        pre = 0
        diff = 0
        for x in sorted(d)+[height*2]:
            s += (x-pre)*diff
            res = max(res,s)
            diff += d[x]
            pre = x
        return res
```
934 ms
