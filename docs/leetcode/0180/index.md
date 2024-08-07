# 0180：连续出现的数字（★）


> <u>**[力扣第 180 题](https://leetcode.cn/problems/consecutive-numbers/)**</u>

## 题目

<p>表：<code>Logs</code></p>

<pre>
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| num         | varchar |
+-------------+---------+
在 SQL 中，id 是该表的主键。
id 是一个自增列。</pre>



<p>找出所有至少连续出现三次的数字。</p>

<p>返回的结果表中的数据可以按 <strong>任意顺序</strong> 排列。</p>

<p>结果格式如下面的例子所示：</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入：</strong>
Logs 表：
+----+-----+
| id | num |
+----+-----+
| 1  | 1   |
| 2  | 1   |
| 3  | 1   |
| 4  | 2   |
| 5  | 1   |
| 6  | 2   |
| 7  | 2   |
+----+-----+
<strong>输出：</strong>
Result 表：
+-----------------+
| ConsecutiveNums |
+-----------------+
| 1               |
+-----------------+
<strong>解释：</strong>1 是唯一连续出现至少三次的数字。</pre>




## 分析

可以采用窗口函数 lag/lead。
 
## 解答

```sql
select distinct num as ConsecutiveNums 
from 
(
    select num, lag(num, 1, null) over (order by id) prev, 
            lead(num, 1, null) over (order by id) post
    from logs
) a
where a.num = a.prev
and a.num = a.post
```
536 ms



