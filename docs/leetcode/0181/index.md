# 0181：超过经理收入的员工


> <u>**[力扣第 181 题](https://leetcode.cn/problems/employees-earning-more-than-their-managers/)**</u>

## 题目

<p>表：<code>Employee</code> </p>

<pre>
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| salary      | int     |
| managerId   | int     |
+-------------+---------+
id 是该表的主键（具有唯一值的列）。
该表的每一行都表示雇员的ID、姓名、工资和经理的ID。
</pre>



<p>编写解决方案，找出收入比经理高的员工。</p>

<p>以 <strong>任意顺序</strong> 返回结果表。</p>

<p>结果格式如下所示。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong>
Employee 表:
+----+-------+--------+-----------+
| id | name  | salary | managerId |
+----+-------+--------+-----------+
| 1  | Joe   | 70000  | 3         |
| 2  | Henry | 80000  | 4         |
| 3  | Sam   | 60000  | Null      |
| 4  | Max   | 90000  | Null      |
+----+-------+--------+-----------+
<strong>输出:</strong>
+----------+
| Employee |
+----------+
| Joe      |
+----------+
<strong>解释:</strong> Joe 是唯一挣得比经理多的雇员。</pre>




## 分析

自连接并判断即可。
 
## 解答

```sql
select a.name as Employee
from Employee a
inner join Employee b
on a.managerId = b.id  
and a.salary > b.salary
```
375 ms



