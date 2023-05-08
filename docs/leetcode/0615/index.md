# 0615：平均工资：部门与公司比较（★★）


> <u>**[力扣第 615 题](https://leetcode.cn/problems/average-salary-departments-vs-company/)**</u>

## 题目

<p>给如下两个表，写一个查询语句，求出在每一个工资发放日，每个部门的平均工资与公司的平均工资的比较结果 （高 / 低 / 相同）。</p>



<p>表： <code>salary</code></p>

<pre>| id | employee_id | amount | pay_date   |
|----|-------------|--------|------------|
| 1  | 1           | 9000   | 2017-03-31 |
| 2  | 2           | 6000   | 2017-03-31 |
| 3  | 3           | 10000  | 2017-03-31 |
| 4  | 1           | 7000   | 2017-02-28 |
| 5  | 2           | 6000   | 2017-02-28 |
| 6  | 3           | 8000   | 2017-02-28 |
</pre>



<p><strong>employee_id</strong> 字段是表 <code>employee</code> 中 <strong>employee_id</strong> 字段的外键。</p>



<pre>| employee_id | department_id |
|-------------|---------------|
| 1           | 1             |
| 2           | 2             |
| 3           | 2             |
</pre>



<p>对于如上样例数据，结果为：</p>



<pre>| pay_month | department_id | comparison  |
|-----------|---------------|-------------|
| 2017-03   | 1             | higher      |
| 2017-03   | 2             | lower       |
| 2017-02   | 1             | same        |
| 2017-02   | 2             | same        |
</pre>



<p><strong>解释</strong></p>



<p>在三月，公司的平均工资是 (9000+6000+10000)/3 = 8333.33...</p>



<p>由于部门 &#39;1&#39; 里只有一个 <strong>employee_id</strong> 为 &#39;1&#39; 的员工，所以部门 &#39;1&#39; 的平均工资就是此人的工资 9000 。因为 9000 &gt; 8333.33 ，所以比较结果是 &#39;higher&#39;。</p>



<p>第二个部门的平均工资为 <strong>employee_id</strong> 为 &#39;2&#39; 和 &#39;3&#39; 两个人的平均工资，为 (6000+10000)/2=8000 。因为 8000 &lt; 8333.33 ，所以比较结果是 &#39;lower&#39; 。</p>



<p>在二月用同样的公式求平均工资并比较，比较结果为 &#39;same&#39; ，因为部门 &#39;1&#39; 和部门 &#39;2&#39; 的平均工资与公司的平均工资相同，都是 7000 。</p>




## 分析

先分别得到公司和每个部门的平均工资，再比较

## 解答

```mysql
with company_avg_sal as (
    select date_format(pay_date, '%Y-%m') pay_month, avg(amount) avg_salary from salary
    group by date_format(pay_date, '%Y-%m')
),
dep_avg_sal as (
    select date_format(pay_date, '%Y-%m') pay_month, 
    department_id, avg(amount) avg_salary
    from salary s join employee e on s.employee_id = e.employee_id
    group by date_format(pay_date, '%Y-%m'), department_id
)
select d.pay_month, d.department_id, 
      case when d.avg_salary > c.avg_salary then 'higher'
      when d.avg_salary = c.avg_salary then 'same'
      when d.avg_salary < c.avg_salary then 'lower'
      end as comparison  
from dep_avg_sal d join company_avg_sal c on d.pay_month = c.pay_month;
```
200 ms
