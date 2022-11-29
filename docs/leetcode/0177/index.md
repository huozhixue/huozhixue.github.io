# 0177：第N高的薪水（★★）


## 题目

SQL架构

表: Employee

	+-------------+------+
	| Column Name | Type |
	+-------------+------+
	| id          | int  |
	| salary      | int  |
	+-------------+------+
	Id是该表的主键列。
	该表的每一行都包含有关员工工资的信息。
 

编写一个SQL查询来报告 Employee 表中第 n 高的工资。
如果没有第 n 个最高工资，查询应该报告为 null 。

查询结果格式如下所示。

 

示例 1:

	输入: 
	Employee table:
	+----+--------+
	| id | salary |
	+----+--------+
	| 1  | 100    |
	| 2  | 200    |
	| 3  | 300    |
	+----+--------+
	n = 2
	输出: 
	+------------------------+
	| getNthHighestSalary(2) |
	+------------------------+
	| 200                    |
	+------------------------+

示例 2:

	输入: 
	Employee 表:
	+----+--------+
	| id | salary |
	+----+--------+
	| 1  | 100    |
	+----+--------+
	n = 2
	输出: 
	+------------------------+
	| getNthHighestSalary(2) |
	+------------------------+
	| null                   |
	+------------------------+

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



