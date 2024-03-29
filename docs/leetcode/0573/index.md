# 0573：松鼠模拟（★）


> <u>**[力扣第 573 题](https://leetcode.cn/problems/squirrel-simulation/)**</u>

## 题目

<p>现在有一棵树，一只松鼠和一些坚果。位置由二维网格的单元格表示。你的目标是找到松鼠收集所有坚果的<strong>最小路程</strong>，且坚果是一颗接一颗地被放在树下。松鼠一次最多只能携带<strong>一颗</strong>坚果，松鼠可以向上，向下，向左和向右四个方向移动到相邻的单元格。移动次数表示路程。</p>

<p><strong>输入 1:</strong></p>

<pre><strong>输入:</strong>
高度 : 5
宽度 : 7
树的位置 : [2,2]
松鼠 : [4,4]
坚果 : [[3,0], [2,5]]
<strong>输出:</strong> 12
<strong>解释:</strong>
<img src="https://assets.leetcode.com/uploads/2018/10/22/squirrel_simulation.png" style="width: 40%;">​​​​​
</pre>

<p><strong>注意:</strong></p>

<ol>
<li>所有给定的位置不会重叠。</li>
<li>松鼠一次最多只能携带一颗坚果。</li>
<li>给定的坚果位置没有顺序。</li>
<li>高度和宽度是正整数。 3 &lt;= 高度 * 宽度 &lt;= 10,000。</li>
<li>给定的网格至少包含一颗坚果，唯一的一棵树和一只松鼠。</li>
</ol>


## 分析

先假设松鼠一开始在就在树的位置，最小路程就是曼哈顿距离之和。

然后要将第一步树到某坚果的路程替换为松鼠到某坚果的路程，找替换代价最小的即可。


## 解答

```python
def minDistance(self, height: int, width: int, tree: List[int], squirrel: List[int], nuts: List[List[int]]) -> int:
	def cal(p1, p2):
		return abs(p1[0]-p2[0])+abs(p1[1]-p2[1])
	res = 2*sum(cal(tree, p) for p in nuts)
	return res + min(cal(squirrel, p)-cal(tree, p) for p in nuts)
```
48 ms
