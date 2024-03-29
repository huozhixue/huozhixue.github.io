# 0603：连续空余座位


> <u>**[力扣第 603 题](https://leetcode.cn/problems/consecutive-available-seats/)**</u>

## 题目

<p>表: <code>Cinema</code></p>

<pre>
+-------------+------+
| Column Name | Type |
+-------------+------+
| seat_id     | int  |
| free        | bool |
+-------------+------+
Seat_id是该表的自动递增主键列。
该表的每一行表示第i个座位是否空闲。1表示空闲，0表示被占用。</pre>



<p>编写一个SQL查询来报告电影院所有连续可用的座位。</p>

<p>返回按 <code>seat_id</code> <strong>升序排序 </strong>的结果表。</p>

<p>测试用例的生成使得两个以上的座位连续可用。</p>

<p>查询结果格式如下所示。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong>
Cinema 表:
+---------+------+
| seat_id | free |
+---------+------+
| 1       | 1    |
| 2       | 0    |
| 3       | 1    |
| 4       | 1    |
| 5       | 1    |
+---------+------+
<strong>输出:</strong>
+---------+
| seat_id |
+---------+
| 3       |
| 4       |
| 5       |
+---------+</pre>


## 分析

当某座位空闲且前后存在空闲时即符合，可以用自连接。

## 解答

```mysql
select distinct a.seat_id
from cinema as a, cinema as b
where abs(b.seat_id-a.seat_id)=1 
and a.free=1 and b.free=1
order by a.seat_id
```

218 ms
