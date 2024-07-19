# 0183：从不订购的客户


> <u>**[力扣第 183 题](https://leetcode.cn/problems/customers-who-never-order/)**</u>

## 题目

<p><code>Customers</code> 表：</p>

<pre>
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
+-------------+---------+
在 SQL 中，id 是该表的主键。
该表的每一行都表示客户的 ID 和名称。</pre>

<p><code>Orders</code> 表：</p>

<pre>
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| customerId  | int  |
+-------------+------+
在 SQL 中，id 是该表的主键。
customerId 是 Customers 表中 ID 的外键( Pandas 中的连接键)。
该表的每一行都表示订单的 ID 和订购该订单的客户的 ID。</pre>



<p>找出所有从不点任何东西的顾客。</p>

<p>以 <strong>任意顺序</strong> 返回结果表。</p>

<p>结果格式如下所示。</p>



<p><strong>示例 1：</strong></p>

<pre>
<b>输入：</b>
Customers table:
+----+-------+
| id | name  |
+----+-------+
| 1  | Joe   |
| 2  | Henry |
| 3  | Sam   |
| 4  | Max   |
+----+-------+
Orders table:
+----+------------+
| id | customerId |
+----+------------+
| 1  | 3          |
| 2  | 1          |
+----+------------+
<b>输出：</b>
+-----------+
| Customers |
+-----------+
| Henry     |
| Max       |
+-----------+</pre>




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



