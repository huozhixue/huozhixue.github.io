# 0569：员工薪水中位数（★★）


> <u>**[力扣第 569 题](https://leetcode.cn/problems/median-employee-salary/)**</u>

## 题目

<p>表: <code>Employee</code></p>

<pre>
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| id           | int     |
| company      | varchar |
| salary       | int     |
+--------------+---------+
Id是该表的主键列。
该表的每一行表示公司和一名员工的工资。
</pre>



<p>写一个SQL查询，找出每个公司的工资中位数。</p>

<p>以 <strong>任意顺序</strong> 返回结果表。</p>

<p>查询结果格式如下所示。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong>
Employee 表:
+----+---------+--------+
| id | company | salary |
+----+---------+--------+
| 1  | A       | 2341   |
| 2  | A       | 341    |
| 3  | A       | 15     |
| 4  | A       | 15314  |
| 5  | A       | 451    |
| 6  | A       | 513    |
| 7  | B       | 15     |
| 8  | B       | 13     |
| 9  | B       | 1154   |
| 10 | B       | 1345   |
| 11 | B       | 1221   |
| 12 | B       | 234    |
| 13 | C       | 2345   |
| 14 | C       | 2645   |
| 15 | C       | 2645   |
| 16 | C       | 2652   |
| 17 | C       | 65     |
+----+---------+--------+
<strong>输出:</strong>
+----+---------+--------+
| id | company | salary |
+----+---------+--------+
| 5  | A       | 451    |
| 6  | A       | 513    |
| 12 | B       | 234    |
| 9  | B       | 1154   |
| 14 | C       | 2645   |
+----+---------+--------+
</pre>



<p><strong>进阶: </strong>你能在不使用任何内置函数或窗口函数的情况下解决它吗?</p>


## 分析

获得某公司的工资总数量、每个工资的排序编号，即可提取出符合的工资。

## 解答

```mysql
select Id,Company,Salary from 
  (
  select Id,Company,Salary,
  row_number() over(partition by Company order by Salary) as rnk,
  count(Salary) over(partition by Company) as cnt from Employee 
  ) t 
where rnk in (cnt/2,cnt/2+1,cnt/2+0.5)
```
