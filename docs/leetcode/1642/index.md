# 1642：可以到达的最远建筑（1962 分）


> <u>**[力扣第 213 场周赛第 3 题](https://leetcode.cn/problems/furthest-building-you-can-reach/)**</u>

## 题目

<p>给你一个整数数组 <code>heights</code> ，表示建筑物的高度。另有一些砖块 <code>bricks</code> 和梯子 <code>ladders</code> 。</p>

<p>你从建筑物 <code>0</code> 开始旅程，不断向后面的建筑物移动，期间可能会用到砖块或梯子。</p>

<p>当从建筑物 <code>i</code> 移动到建筑物 <code>i+1</code>（下标<strong> 从 0 开始 </strong>）时：</p>

<ul>
<li>如果当前建筑物的高度 <strong>大于或等于</strong> 下一建筑物的高度，则不需要梯子或砖块</li>
<li>如果当前建筑的高度 <strong>小于</strong> 下一个建筑的高度，您可以使用 <strong>一架梯子</strong> 或 <strong><code>(h[i+1] - h[i])</code> 个砖块</strong></li>
</ul>
如果以最佳方式使用给定的梯子和砖块，返回你可以到达的最远建筑物的下标（下标<strong> 从 0 开始 </strong>）。



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/10/31/q4.gif" style="width: 562px; height: 561px;" />
<pre>
<strong>输入：</strong>heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1
<strong>输出：</strong>4
<strong>解释：</strong>从建筑物 0 出发，你可以按此方案完成旅程：
- 不使用砖块或梯子到达建筑物 1 ，因为 4 >= 2
- 使用 5 个砖块到达建筑物 2 。你必须使用砖块或梯子，因为 2 < 7
- 不使用砖块或梯子到达建筑物 3 ，因为 7 >= 6
- 使用唯一的梯子到达建筑物 4 。你必须使用砖块或梯子，因为 6 < 9
无法越过建筑物 4 ，因为没有更多砖块或梯子。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>heights = [4,12,2,7,3,18,20,3,19], bricks = 10, ladders = 2
<strong>输出：</strong>7
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>heights = [14,3,19,3], bricks = 17, ladders = 0
<strong>输出：</strong>3
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= heights.length <= 10<sup>5</sup></code></li>
<li><code>1 <= heights[i] <= 10<sup>6</sup></code></li>
<li><code>0 <= bricks <= 10<sup>9</sup></code></li>
<li><code>0 <= ladders <= heights.length</code></li>
</ul>


## 分析

显然应该用梯子解决最大的高度差，剩下的用砖块。因此遍历位置 i，记录所有需要攀爬的高度差，去掉 ladders 个最大值，
判断剩下的能否用砖块解决。若无法解决，就返回位置 i-1 即可。

可以用堆来维护 ladders 个最大值来节省时间。

## 解答

```python
def furthestBuilding(self, heights: List[int], bricks: int, ladders: int) -> int:
	n, pq = len(heights), []
	for i in range(1, n):
		if heights[i] - heights[i-1] > 0:
			heappush(pq, heights[i] - heights[i-1])
			if len(pq) > ladders:
				bricks -= heappop(pq)
				if bricks < 0:
					return i-1
	return n - 1
```

176 ms


