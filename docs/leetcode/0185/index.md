# 0185：部门工资前三高的所有员工（★★）


> <u>**[力扣第 185 题](https://leetcode.cn/problems/department-top-three-salaries/)**</u>

## 题目

<p>表: <code>Employee</code></p>

<pre>
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| id           | int     |
| name         | varchar |
| salary       | int     |
| departmentId | int     |
+--------------+---------+
Id是该表的主键列。
departmentId是Department表中ID的外键。
该表的每一行都表示员工的ID、姓名和工资。它还包含了他们部门的ID。
</pre>



<p>表: <code>Department</code></p>

<pre>
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
+-------------+---------+
Id是该表的主键列。
该表的每一行表示部门ID和部门名。
</pre>



<p>公司的主管们感兴趣的是公司每个部门中谁赚的钱最多。一个部门的 <strong>高收入者</strong> 是指一个员工的工资在该部门的 <strong>不同</strong> 工资中 <strong>排名前三</strong> 。</p>

<p>编写一个SQL查询，找出每个部门中 <strong>收入高的员工</strong> 。</p>

<p>以 <strong>任意顺序</strong> 返回结果表。</p>

<p>查询结果格式如下所示。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong>
Employee 表:
+----+-------+--------+--------------+
| id | name  | salary | departmentId |
+----+-------+--------+--------------+
| 1  | Joe   | 85000  | 1            |
| 2  | Henry | 80000  | 2            |
| 3  | Sam   | 60000  | 2            |
| 4  | Max   | 90000  | 1            |
| 5  | Janet | 69000  | 1            |
| 6  | Randy | 85000  | 1            |
| 7  | Will  | 70000  | 1            |
+----+-------+--------+--------------+
Department  表:
+----+-------+
| id | name  |
+----+-------+
| 1  | IT    |
| 2  | Sales |
+----+-------+
<strong>输出:</strong>
+------------+----------+--------+
| Department | Employee | Salary |
+------------+----------+--------+
| IT         | Max      | 90000  |
| IT         | Joe      | 85000  |
| IT         | Randy    | 85000  |
| IT         | Will     | 70000  |
| Sales      | Henry    | 80000  |
| Sales      | Sam      | 60000  |
+------------+----------+--------+
<strong>解释:
</strong>在IT部门:
- Max的工资最高
- 兰迪和乔都赚取第二高的独特的薪水
- 威尔的薪水是第三高的

在销售部:
- 亨利的工资最高
- 山姆的薪水第二高
- 没有第三高的工资，因为只有两名员工</pre>


## 分析

{{< lc "0184" >}} 升级版。

可以将每个员工和比自己工资高的连接，将连接数小于 3 的员工返回即可。

 
## 解答

```sql
select b.name as Department, a.name as Employee, a.salary as Salary
from Employee a
left join Department b
on a.departmentId = b.id
left join Employee c
on a.departmentId = c.departmentId
and a.salary < c.salary
group by a.id
having count(distinct c.salary)<3
```
881 ms



