# 0183：从不订购的客户


> <u>**[力扣第 183 题](https://leetcode.cn/problems/customers-who-never-order/)**</u>

## 题目

<p>某网站包含两个表，<code>Customers</code> 表和 <code>Orders</code> 表。编写一个 SQL 查询，找出所有从不订购任何东西的客户。</p>

<p><code>Customers</code> 表：</p>

<pre>+----+-------+
| Id | Name  |
+----+-------+
| 1  | Joe   |
| 2  | Henry |
| 3  | Sam   |
| 4  | Max   |
+----+-------+
</pre>

<p><code>Orders</code> 表：</p>

<pre>+----+------------+
| Id | CustomerId |
+----+------------+
| 1  | 3          |
| 2  | 1          |
+----+------------+
</pre>

<p>例如给定上述表格，你的查询应返回：</p>

<pre>+-----------+
| Customers |
+-----------+
| Henry     |
| Max       |
+-----------+
</pre>


## 分析

返回左连接没成功的即可。
 
## 解答

```sql
select a.Name as Customers 
from Customers a
left join Orders b 
on a.Id = b.CustomerId
where b.Id is null
```
520 ms



