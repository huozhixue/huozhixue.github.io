# 0554：砖墙（★）


> <u>**[力扣第 554 题](https://leetcode.cn/problems/brick-wall/)**</u>

## 题目

<p>你的面前有一堵矩形的、由 <code>n</code> 行砖块组成的砖墙。这些砖块高度相同（也就是一个单位高）但是宽度不同。每一行砖块的宽度之和相等。</p>

<p>你现在要画一条 <strong>自顶向下 </strong>的、穿过 <strong>最少 </strong>砖块的垂线。如果你画的线只是从砖块的边缘经过，就不算穿过这块砖。<strong>你不能沿着墙的两个垂直边缘之一画线，这样显然是没有穿过一块砖的。</strong></p>

<p>给你一个二维数组 <code>wall</code> ，该数组包含这堵墙的相关信息。其中，<code>wall[i]</code> 是一个代表从左至右每块砖的宽度的数组。你需要找出怎样画才能使这条线 <strong>穿过的砖块数量最少</strong> ，并且返回 <strong>穿过的砖块数量</strong> 。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/24/cutwall-grid.jpg" style="width: 493px; height: 577px;" />
<pre>
<strong>输入：</strong>wall = [[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]]
<strong>输出：</strong>2
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>wall = [[1],[1],[1]]
<strong>输出：</strong>3
</pre>


<p><strong>提示：</strong></p>

<ul>
<li><code>n == wall.length</code></li>
<li><code>1 <= n <= 10<sup>4</sup></code></li>
<li><code>1 <= wall[i].length <= 10<sup>4</sup></code></li>
<li><code>1 <= sum(wall[i].length) <= 2 * 10<sup>4</sup></code></li>
<li>对于每一行 <code>i</code> ，<code>sum(wall[i])</code> 是相同的</li>
<li><code>1 <= wall[i][j] <= 2<sup>31</sup> - 1</code></li>
</ul>


**相似问题：**
- [2184：建造坚实的砖墙的方法数](/leetcode/2184)


## 分析

- 显然找一条穿过边缘最多的垂线（除了墙边）即可，用哈希计数
## 解答

```python
class Solution:
    def leastBricks(self, wall: List[List[int]]) -> int:
        d = defaultdict(int)
        for row in wall:
            s = 0
            for x in row[:-1]:
                s += x
                d[s] += 1
        return len(wall)-max(d.values(),default=0)
```
64 ms

