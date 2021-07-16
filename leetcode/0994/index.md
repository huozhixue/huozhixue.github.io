# 0994：腐烂的橘子（★★）




## 题目

在给定的网格中，每个单元格可以有以下三个值之一：

- 值 0 代表空单元格；
- 值 1 代表新鲜橘子；
- 值 2 代表腐烂的橘子。

每分钟，任何与腐烂的橘子（在 4 个正方向上）相邻的新鲜橘子都会腐烂。

返回直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1。


 <!--more--> 
 
示例 1：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/02/16/oranges.png)

	输入：[[2,1,1],[1,1,0],[0,1,1]]
	输出：4
	
示例 2：

	输入：[[2,1,1],[0,1,1],[1,0,1]]
	输出：-1
	解释：左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个正向上。
	
示例 3：

	输入：[[0,2]]
	输出：0
	解释：因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。



## 分析

典型的广度优先搜索。模拟过程，每分钟保存腐烂橘子相邻的新鲜橘子，作为下一分钟的腐烂橘子，直到没有相邻的新鲜橘子为止。
最后再判断是否存在新鲜橘子即可。

为了方便，可以把橘子的腐烂时间也保存起来。

## 解答

```python
def orangesRotting(self, grid: List[List[int]]) -> int:
	m, n = len(grid), len(grid[0])
	queue = deque((i, j, 0) for i in range(m) for j in range(n) if grid[i][j]==2)
	t = 0
	while queue:
		i, j, t = queue.popleft()
		for x, y in [(i-1, j), (i+1, j), (i, j-1), (i, j+1)]:
			if 0<=x<m and 0<=y<n and grid[x][y] == 1:
				queue.append((x, y, t+1))
				grid[x][y] = 2
	return -1 if any(1 in row for row in grid) else t
```

44 ms
