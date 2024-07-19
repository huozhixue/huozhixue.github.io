# 0197：上升的温度


> <u>**[力扣第 197 题](https://leetcode.cn/problems/rising-temperature/)**</u>

## 题目

<div class="original__bRMd">
<div>
<p>表： <code>Weather</code></p>

<pre>
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| recordDate    | date    |
| temperature   | int     |
+---------------+---------+
id 是该表具有唯一值的列。
没有具有相同 recordDate 的不同行。
该表包含特定日期的温度信息</pre>



<p>编写解决方案，找出与之前（昨天的）日期相比温度更高的所有日期的 <code>id</code> 。</p>

<p>返回结果 <strong>无顺序要求</strong> 。</p>

<p>结果格式如下例子所示。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>
Weather 表：
+----+------------+-------------+
| id | recordDate | Temperature |
+----+------------+-------------+
| 1  | 2015-01-01 | 10          |
| 2  | 2015-01-02 | 25          |
| 3  | 2015-01-03 | 20          |
| 4  | 2015-01-04 | 30          |
+----+------------+-------------+
<strong>输出：</strong>
+----+
| id |
+----+
| 2  |
| 4  |
+----+
<strong>解释：</strong>
2015-01-02 的温度比前一天高（10 -&gt; 25）
2015-01-04 的温度比前一天高（20 -&gt; 30）</pre>
</div>
</div>




## 分析

自连接并按条件选取即可。时间比较可以用 datediff。

 
## 解答

```sql
select a.id as id
from weather a
inner join weather b
on datediff(a.recordDate , b.recordDate )=1
and a.Temperature>b.Temperature
```
480 ms



