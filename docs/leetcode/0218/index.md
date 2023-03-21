# 0218：天际线问题（★★）


> <u>**[力扣第 218 题](https://leetcode.cn/problems/the-skyline-problem/)**</u>

## 题目

<p>城市的 <strong>天际线</strong> 是从远处观看该城市中所有建筑物形成的轮廓的外部轮廓。给你所有建筑物的位置和高度，请返回 <em>由这些建筑物形成的<strong> 天际线</strong></em> 。</p>

<p>每个建筑物的几何信息由数组 <code>buildings</code> 表示，其中三元组 <code>buildings[i] = [lefti, righti, heighti]</code> 表示：</p>

<ul>
<li><code>left<sub>i</sub></code> 是第 <code>i</code> 座建筑物左边缘的 <code>x</code> 坐标。</li>
<li><code>right<sub>i</sub></code> 是第 <code>i</code> 座建筑物右边缘的 <code>x</code> 坐标。</li>
<li><code>height<sub>i</sub></code> 是第 <code>i</code> 座建筑物的高度。</li>
</ul>

<p>你可以假设所有的建筑都是完美的长方形，在高度为 <code>0</code> 的绝对平坦的表面上。</p>

<p><strong>天际线</strong> 应该表示为由 “关键点” 组成的列表，格式 <code>[[x<sub>1</sub>,y<sub>1</sub>],[x<sub>2</sub>,y<sub>2</sub>],...]</code> ，并按 <strong>x 坐标 </strong>进行 <strong>排序</strong> 。<strong>关键点是水平线段的左端点</strong>。列表中最后一个点是最右侧建筑物的终点，<code>y</code> 坐标始终为 <code>0</code> ，仅用于标记天际线的终点。此外，任何两个相邻建筑物之间的地面都应被视为天际线轮廓的一部分。</p>

<p><strong>注意：</strong>输出天际线中不得有连续的相同高度的水平线。例如 <code>[...[2 3], [4 5], [7 5], [11 5], [12 7]...]</code> 是不正确的答案；三条高度为 5 的线应该在最终输出中合并为一个：<code>[...[2 3], [4 5], [12 7], ...]</code></p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/01/merged.jpg" style="height: 331px; width: 800px;" />
<pre>
<strong>输入：</strong>buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
<strong>输出：</strong>[[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
<strong>解释：</strong>
图 A<strong> </strong>显示输入的所有建筑物的位置和高度，
图 B 显示由这些建筑物形成的天际线。图 B 中的红点表示输出列表中的关键点。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>buildings = [[0,2,3],[2,5,3]]
<strong>输出：</strong>[[0,3],[5,0]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= buildings.length &lt;= 10<sup>4</sup></code></li>
<li><code>0 &lt;= left<sub>i</sub> &lt; right<sub>i</sub> &lt;= 2<sup>31</sup> - 1</code></li>
<li><code>1 &lt;= height<sub>i</sub> &lt;= 2<sup>31</sup> - 1</code></li>
<li><code>buildings</code> 按 <code>left<sub>i</sub></code> 非递减排序</li>
</ul>


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

