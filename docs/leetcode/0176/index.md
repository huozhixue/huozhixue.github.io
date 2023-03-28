# 0176：第二高的薪水（★）


> <u>**[力扣第 176 题](https://leetcode.cn/problems/second-highest-salary/)**</u>

## 题目

<code>Employee</code> 表：
<div class="original__bRMd">
<div>
<pre>
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| salary      | int  |
+-------------+------+
id 是这个表的主键。
表的每一行包含员工的工资信息。
</pre>



<p>编写一个 SQL 查询，获取并返回 <code>Employee</code> 表中第二高的薪水 。如果不存在第二高的薪水，查询应该返回 <code>null</code> 。</p>

<p>查询结果如下例所示。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>
Employee 表：
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+
<strong>输出：</strong>
+---------------------+
| SecondHighestSalary |
+---------------------+
| 200                 |
+---------------------+
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>
Employee 表：
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
+----+--------+
<strong>输出：</strong>
+---------------------+
| SecondHighestSalary |
+---------------------+
| null                |
+---------------------+
</pre>
</div>
</div>


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



