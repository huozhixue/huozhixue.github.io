# 0618：学生地理信息报告（★★）


> <u>**[力扣第 618 题](https://leetcode.cn/problems/students-report-by-geography/)**</u>

## 题目

<p>表： <code>student</code> </p>

<pre>
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| name        | varchar |
| continent   | varchar |
+-------------+---------+
该表没有主键。它可能包含重复的行。
该表的每一行表示学生的名字和他们来自的大陆。
</pre>



<p>一所学校有来自亚洲、欧洲和美洲的学生。</p>

<p>写一个查询语句实现对大洲（continent）列的 <a href="https://zh.wikipedia.org/wiki/%E9%80%8F%E8%A7%86%E8%A1%A8" target="_blank">透视表</a> 操作，使得每个<code>学生</code>按照姓名的<strong>字母顺序</strong>依次排列在对应的大洲下面。输出的标题应依次为<code>美洲（America）、亚洲（Asia）和欧洲（Europe）。</code></p>

<p>测试用例的生成使得来自美国的学生人数不少于亚洲或欧洲的学生人数。</p>

<p>查询结果格式如下所示。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong>
Student table:
+--------+-----------+
| name   | continent |
+--------+-----------+
| Jane   | America   |
| Pascal | Europe    |
| Xi     | Asia      |
| Jack   | America   |
+--------+-----------+
<strong>输出:</strong>
+---------+------+--------+
| America | Asia | Europe |
+---------+------+--------+
| Jack    | Xi   | Pascal |
| Jane    | null | null   |
+---------+------+--------+</pre>



<p><strong>进阶：</strong>如果不能确定哪个大洲的学生数最多，你可以写出一个查询去生成上述学生报告吗？</p>


## 分析

将学生按大洲分组，得到每个学生的序号。再将学生按序号分组，每一组输出到每一行。

## 解答

```mysql
select
    max(case when continent = 'America' then name else null end) America,
    max(case when continent = 'Asia' then name else null end) Asia,
    max(case when continent = 'Europe' then name else null end) Europe
from
    (select 
        name, 
        continent, 
        row_number()over(partition by continent order by name) cur_rank
    from
        student)t 
group by cur_rank
```
152 ms
