# 0574：当选者（★）


> <u>**[力扣第 574 题](https://leetcode.cn/problems/winning-candidate/)**</u>

## 题目

<p>表: <code>Candidate</code></p>

<pre>
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| id          | int      |
| name        | varchar  |
+-------------+----------+
Id是该表的主键列。
该表的每一行都包含关于候选对象的id和名称的信息。</pre>



<p>表: <code>Vote</code></p>

<pre>
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| candidateId | int  |
+-------------+------+
Id是自动递增的主键。
candidateId是id来自Candidate表的外键。
该表的每一行决定了在选举中获得第i张选票的候选人。</pre>



<p>编写一个SQL查询来报告获胜候选人的名字(即获得最多选票的候选人)。</p>

<p>生成测试用例以确保 <strong>只有一个候选人赢得</strong>选举。</p>

<p>查询结果格式如下所示。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong>
Candidate table:
+----+------+
| id | name |
+----+------+
| 1  | A    |
| 2  | B    |
| 3  | C    |
| 4  | D    |
| 5  | E    |
+----+------+
Vote table:
+----+-------------+
| id | candidateId |
+----+-------------+
| 1  | 2           |
| 2  | 4           |
| 3  | 3           |
| 4  | 2           |
| 5  | 5           |
+----+-------------+
<strong>输出:</strong>
+------+
| name |
+------+
| B    |
+------+
<strong>解释:</strong>
候选人B有2票。候选人C、D、E各有1票。
获胜者是候选人B。</pre>


## 分析

连接后，按票数排序即可

## 解答

```mysql
select Name
from Candidate c inner join Vote v 
on c.id = v.CandidateId
group by c.Name
order by count(v.id) desc
limit 1
```
268 ms
