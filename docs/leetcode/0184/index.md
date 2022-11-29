# 0184：部门工资最高的员工（★★）


## 题目

SQL架构

表： Employee

	+--------------+---------+
	| 列名          | 类型    |
	+--------------+---------+
	| id           | int     |
	| name         | varchar |
	| salary       | int     |
	| departmentId | int     |
	+--------------+---------+
	id是此表的主键列。
	departmentId是Department表中ID的外键。
	此表的每一行都表示员工的ID、姓名和工资。它还包含他们所在部门的ID。
 

表： Department

	+-------------+---------+
	| 列名         | 类型    |
	+-------------+---------+
	| id          | int     |
	| name        | varchar |
	+-------------+---------+
	id是此表的主键列。
	此表的每一行都表示一个部门的ID及其名称。
	 

编写SQL查询以查找每个部门中薪资最高的员工。
按 任意顺序 返回结果表。
查询结果格式如下例所示。

 

示例 1:

	输入：
	Employee 表:
	+----+-------+--------+--------------+
	| id | name  | salary | departmentId |
	+----+-------+--------+--------------+
	| 1  | Joe   | 70000  | 1            |
	| 2  | Jim   | 90000  | 1            |
	| 3  | Henry | 80000  | 2            |
	| 4  | Sam   | 60000  | 2            |
	| 5  | Max   | 90000  | 1            |
	+----+-------+--------+--------------+
	Department 表:
	+----+-------+
	| id | name  |
	+----+-------+
	| 1  | IT    |
	| 2  | Sales |
	+----+-------+
	输出：
	+------------+----------+--------+
	| Department | Employee | Salary |
	+------------+----------+--------+
	| IT         | Jim      | 90000  |
	| Sales      | Henry    | 80000  |
	| IT         | Max      | 90000  |
	+------------+----------+--------+
	解释：Max 和 Jim 在 IT 部门的工资都是最高的，Henry 在销售部的工资最高。

## 分析

先按部门分组得到每个组的最大工资，并作为临时表，
然后与 Employee、Department 按部门 id 连接并判断员工工资是否为最大工资即可。
 
## 解答

```sql
select b.name as Department, a.name as Employee, a.salary as Salary
from Employee a
left join Department b
on a.departmentId = b.id
inner join (
    select departmentId, max(salary) salary
    from Employee
    group by departmentId
) c
on a.departmentId = c.departmentId
and a.salary = c.salary
```
681 ms



