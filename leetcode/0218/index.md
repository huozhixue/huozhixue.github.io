# 0218：天际线问题（★★★）


## 题目

城市的天际线是从远处观看该城市中所有建筑物形成的轮廓的外部轮廓。给你所有建筑物的位置和高度，请返回由这些建筑物形成的 天际线 。

每个建筑物的几何信息由数组 buildings 表示，其中三元组 buildings[i] = [lefti, righti, heighti] 表示：

- lefti 是第 i 座建筑物左边缘的 x 坐标。
- righti 是第 i 座建筑物右边缘的 x 坐标。
- heighti 是第 i 座建筑物的高度。

天际线 应该表示为由 “关键点” 组成的列表，格式 [[x1,y1],[x2,y2],...] ，并按 x 坐标 进行 排序 。
关键点是水平线段的左端点。列表中最后一个点是最右侧建筑物的终点，y 坐标始终为 0 ，仅用于标记天际线的终点。
此外，任何两个相邻建筑物之间的地面都应被视为天际线轮廓的一部分。

注意：输出天际线中不得有连续的相同高度的水平线。例如 [...[2 3], [4 5], [7 5], [11 5], [12 7]...] 是不正确的答案；
三条高度为 5 的线应该在最终输出中合并为一个：[...[2 3], [4 5], [12 7], ...]

提示：

- 1 <= buildings.length <= 10^4
- 0 <= lefti < righti <= 2^31 - 1
- 1 <= heighti <= 2^31 - 1
- buildings 按 lefti 非递减排序
 


<!--more--> 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/12/01/merged.jpg)


	输入：buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
	输出：[[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
	解释：
	图 A 显示输入的所有建筑物的位置和高度，
	图 B 显示由这些建筑物形成的天际线。图 B 中的红点表示输出列表中的关键点。

示例 2：

	输入：buildings = [[0,2,3],[2,5,3]]
	输出：[[0,3],[5,0]]



## 分析

### #1

显然只有边缘处才可能改变高度，考虑按顺序遍历所有边缘坐标 x，判断对应高度是否为关键点。
因为同一 x 可能对应多个点，为了方便，用字典来记录。

遍历过程中维护一个升序列表 H，表示当前还没有掠过的建筑物高度集合。
具体实现：对于坐标 x 的点，如果属于左边缘，就二分添加到 H，如果属于右边缘，
就二分找到位置从 H 中弹出。

显然当前的轮廓高度即为 H[-1]。如果当前的轮廓高度和上一个关键点高度不同，则是新的关键点，
添加到天际线列表即可。
	
```python
def getSkyline(self, buildings: List[List[int]]) -> List[List[int]]:
	res, H, d = [], [], defaultdict(list)
	for left, right, h in buildings:
		d[left].append((h, 0))
		d[right].append((h, 1))
	for x in sorted(d):
		for h, flag in d[x]:
			if flag == 0:
				insort_right(H, h)
			else:
				H.pop(bisect_left(H, h))
		cur_h = H[-1] if H else 0
		if not res or res[-1][1] != cur_h:
			res.append([x, cur_h])
	return res
```

96 ms

### #2

有个巧妙的想法是遍历到坐标 x 时，其实只关心 H 的最大值，剩下的过时的高度不影响，可以暂不处理。
当 H 的最大值是过时的高度时，再弹出直到 H 的最大值不是过时高度即可。

因此可以用大顶堆来维护 H，按 (高度取负, 右边缘坐标) 入堆。

## 解答

```python
def getSkyline(self, buildings: List[List[int]]) -> List[List[int]]:
	res, H, d = [], [], defaultdict(list)
	for left, right, h in buildings:
		d[left].append((h, right, 0))
		d[right].append((h, float('-inf'), 1))
	for x in sorted(d):
		for h, end, flag in d[x]:
			if flag == 0:
				heappush(H, (-h, end))
		while H and H[0][1] <= x:
			heappop(H)
		cur_h = -H[0][0] if H else 0
		if not res or res[-1][1] != cur_h:
			res.append([x, cur_h])
	return res
```

68 ms



