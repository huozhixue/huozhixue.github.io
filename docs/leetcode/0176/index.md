# 0176：第二高的薪水（★★）


## 题目

SQL架构

Employee 表：

	+-------------+------+
	| Column Name | Type |
	+-------------+------+
	| id          | int  |
	| salary      | int  |
	+-------------+------+
	id 是这个表的主键。
	表的每一行包含员工的工资信息。
 

编写一个 SQL 查询，获取并返回 Employee 表中第二高的薪水 。
如果不存在第二高的薪水，查询应该返回 null 。

查询结果如下例所示。

 

示例 1：

	输入：
	Employee 表：
	+----+--------+
	| id | salary |
	+----+--------+
	| 1  | 100    |
	| 2  | 200    |
	| 3  | 300    |
	+----+--------+
	输出：
	+---------------------+
	| SecondHighestSalary |
	+---------------------+
	| 200                 |
	+---------------------+

示例 2：

	输入：
	Employee 表：
	+----+--------+
	| id | salary |
	+----+--------+
	| 1  | 100    |
	+----+--------+
	输出：
	+---------------------+
	| SecondHighestSalary |
	+---------------------+
	| null                |
	+---------------------+

## 分析

按 salary 排序即可。注意：
- 要去掉重复值，用 distinct
- 没有时要返回 null，所以外面再套一层
 
## 解答

```sql
select
(
    select distinct salary
    from Employee
    order by salary desc
    limit 1 offset 1
)
as SecondHighestSalary 
```
233 ms



