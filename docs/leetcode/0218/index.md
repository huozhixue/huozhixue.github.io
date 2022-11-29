# 0218：天际线问题（★★★）


## 题目

城市的 天际线 是从远处观看该城市中所有建筑物形成的轮廓的外部轮廓。
给你所有建筑物的位置和高度，请返回 由这些建筑物形成的 天际线 。

每个建筑物的几何信息由数组 buildings 表示，其中三元组 
buildings[i] = [lefti, righti, heighti] 表示：
- lefti 是第 i 座建筑物左边缘的 x 坐标。
- righti 是第 i 座建筑物右边缘的 x 坐标。
- heighti 是第 i 座建筑物的高度。

你可以假设所有的建筑都是完美的长方形，在高度为 0 的绝对平坦的表面上。

天际线 应该表示为由 “关键点” 组成的列表，格式 [[x1,y1],[x2,y2],...] ，
并按 x 坐标 进行 排序 。关键点是水平线段的左端点。列表中最后一个点是
最右侧建筑物的终点，y 坐标始终为 0 ，仅用于标记天际线的终点。
此外，任何两个相邻建筑物之间的地面都应被视为天际线轮廓的一部分。

注意：输出天际线中不得有连续的相同高度的水平线。例如 
[...[2 3], [4 5], [7 5], [11 5], [12 7]...] 是不正确的答案；
三条高度为 5 的线应该在最终输出中合并为一个：[...[2 3], [4 5], [12 7], ...]
 

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

提示：
- 1 <= buildings.length <= 10^4
- 0 <= lefti < righti <= 2^31 - 1
- 1 <= heighti <= 2^31 - 1
- buildings 按 lefti 非递减排序

## 分析

典型的扫描线问题：
- 显然只有边缘处才可能改变高度，考虑按顺序遍历所有边缘坐标 x
- 遍历 x 时，维护还没有掠过的建筑物高度集合 H，max(H) 就是对应的轮廓高度
- max(H) 和上一个关键点高度比较，即可判断高度是否改变

具体实现时，H 要进行插入、删除、取最大值的操作，考虑用有序集合 SortedList，
都能在 O(logN) 时间内完成。

## 解答
	
```python
def getSkyline(self, buildings: List[List[int]]) -> List[List[int]]:
    from sortedcontainers import SortedList
    d = defaultdict(list)
    for left, right, h in buildings:
        d[left].append((h, 1))
        d[right].append((h, 0))
    res, H = [], SortedList()
    for x in sorted(d):
        for h, flag in d[x]:
            H.add(h) if flag else H.remove(h)
        cur = H[-1] if H else 0
        if not res or res[-1][1] != cur:
            res.append([x, cur])
    return res
```
64 ms

