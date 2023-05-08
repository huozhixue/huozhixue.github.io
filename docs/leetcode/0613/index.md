# 0613：直线上的最近距离


> <u>**[力扣第 613 题](https://leetcode.cn/problems/shortest-distance-in-a-line/)**</u>

## 题目

<p>表 <code>point</code> 保存了一些点在 x 轴上的坐标，这些坐标都是整数。</p>



<p>写一个查询语句，找到这些点中最近两个点之间的距离。</p>



<pre>| x   |
|-----|
| -1  |
| 0   |
| 2   |
</pre>



<p>最近距离显然是 &#39;1&#39; ，是点 &#39;-1&#39; 和 &#39;0&#39; 之间的距离。所以输出应该如下：</p>



<pre>| shortest|
|---------|
| 1       |
</pre>



<p><strong>注意：</strong>每个点都与其他点坐标不同，表 <code>table</code> 不会有重复坐标出现。</p>



<p><strong>进阶：</strong>如果这些点在 x 轴上从左到右都有一个编号，输出结果时需要输出最近点对的编号呢？</p>




## 分析

自连接并计算即可。

## 解答

```mysql
SELECT MIN(ABS(p1.x - p2.x)) AS shortest
FROM point AS p1, point AS p2
WHERE p1.x != p2.x;
```
163 ms
