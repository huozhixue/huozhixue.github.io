# 0512：游戏玩法分析 II


> <u>**[力扣第 512 题](https://leetcode.cn/problems/game-play-analysis-ii/)**</u>

## 题目

<p>Table: <code>Activity</code></p>

<pre>
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| player_id    | int     |
| device_id    | int     |
| event_date   | date    |
| games_played | int     |
+--------------+---------+
(player_id, event_date) 是这个表的两个主键
这个表显示的是某些游戏玩家的游戏活动情况
每一行是在某天使用某个设备登出之前登录并玩多个游戏（可能为0）的玩家的记录
</pre>

<p>请编写一个 SQL 查询，描述每一个玩家首次登陆的设备名称</p>

<p>查询结果格式在以下示例中：</p>

<pre>
Activity table:
+-----------+-----------+------------+--------------+
| player_id | device_id | event_date | games_played |
+-----------+-----------+------------+--------------+
| 1         | 2         | 2016-03-01 | 5            |
| 1         | 2         | 2016-05-02 | 6            |
| 2         | 3         | 2017-06-25 | 1            |
| 3         | 1         | 2016-03-02 | 0            |
| 3         | 4         | 2018-07-03 | 5            |
+-----------+-----------+------------+--------------+

Result table:
+-----------+-----------+
| player_id | device_id |
+-----------+-----------+
| 1         | 2         |
| 2         | 3         |
| 3         | 1         |
+-----------+-----------+</pre>


## 分析

使用 where in 子查询。

## 解答

```mysql
select player_id, device_id
from activity
where (player_id, event_date) in 
  (select player_id, min(event_date)
  from activity
  group by player_id)
```
346 ms
