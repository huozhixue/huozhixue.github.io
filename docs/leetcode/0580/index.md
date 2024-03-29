# 0580：统计各专业学生人数（★）


> <u>**[力扣第 580 题](https://leetcode.cn/problems/count-student-number-in-departments/)**</u>

## 题目

<p>表: <code>Student</code></p>

<pre>
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| student_id   | int     |
| student_name | varchar |
| gender       | varchar |
| dept_id      | int     |
+--------------+---------+
Student_id是该表的主键。
dept_id是Department表中dept_id的外键。
该表的每一行都表示学生的姓名、性别和所属系的id。
</pre>



<p>表: <code>Department</code></p>

<pre>
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| dept_id     | int     |
| dept_name   | varchar |
+-------------+---------+
Dept_id是该表的主键。
该表的每一行包含一个部门的id和名称。</pre>



<p>编写一个SQL查询，为 <code>Department</code> 表中的所有部门(甚至是没有当前学生的部门)报告各自的部门名称和每个部门的学生人数。</p>

<p>按 <code>student_number</code> <strong>降序 </strong>返回结果表。如果是平局，则按 <code>dept_name</code> 的  <strong>字母顺序 </strong>排序。</p>

<p>查询结果格式如下所示。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong>
Student 表:
+------------+--------------+--------+---------+
| student_id | student_name | gender | dept_id |
+------------+--------------+--------+---------+
| 1          | Jack         | M      | 1       |
| 2          | Jane         | F      | 1       |
| 3          | Mark         | M      | 2       |
+------------+--------------+--------+---------+
Department 表:
+---------+-------------+
| dept_id | dept_name   |
+---------+-------------+
| 1       | Engineering |
| 2       | Science     |
| 3       | Law         |
+---------+-------------+
<strong>输出:</strong>
+-------------+----------------+
| dept_name   | student_number |
+-------------+----------------+
| Engineering | 2              |
| Science     | 1              |
| Law         | 0              |
+-------------+----------------+</pre>


## 分析

连接后分组统计即可。

## 解答

```mysql
select d.dept_name dept_name, count(student_id) student_number
from department d
left join student s
on d.dept_id = s.dept_id
group by d.dept_id 
order by student_number desc, dept_name 
```

479 ms
