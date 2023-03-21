# 0177：第N高的薪水（★）


> <u>**[力扣第 177 题](https://leetcode.cn/problems/nth-highest-salary/)**</u>

## 题目

<p>表: <code>Employee</code></p>

<pre>
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| salary      | int  |
+-------------+------+
Id是该表的主键列。
该表的每一行都包含有关员工工资的信息。
</pre>



<p>编写一个SQL查询来报告 <code>Employee</code> 表中第 <code>n</code> 高的工资。如果没有第 <code>n</code> 个最高工资，查询应该报告为 <code>null</code> 。</p>

<p>查询结果格式如下所示。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong>
Employee table:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+
n = 2
<strong>输出:</strong>
+------------------------+
| getNthHighestSalary(2) |
+------------------------+
| 200                    |
+------------------------+
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong>
Employee 表:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
+----+--------+
n = 2
<strong>输出:</strong>
+------------------------+
| getNthHighestSalary(2) |
+------------------------+
| null                   |
+------------------------+</pre>


## 分析

{{< lc "0176" >}} 升级版，注意查找中不能运算 N-1，所以提前减 1。
 
## 解答

```sql
CREATE FUNCTION getNthHighestSalary ( N INT ) RETURNS INT 
BEGIN
    SET N = N - 1;
    RETURN (
        # Write your MySQL query statement below.
        SELECT DISTINCT salary
        FROM Employee
        ORDER BY salary DESC
        LIMIT 1 OFFSET N
    );
END
```
372 ms



