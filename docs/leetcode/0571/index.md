# 0571：给定数字的频率查询中位数（★★）


> <u>**[力扣第 571 题](https://leetcode.cn/problems/find-median-given-frequency-of-numbers/)**</u>

## 题目

<p><code>Numbers</code> 表：</p>

<pre>
+-------------+------+
| Column Name | Type |
+-------------+------+
| num         | int  |
| frequency   | int  |
+-------------+------+
num 是这张表的主键。这张表的每一行表示某个数字在该数据库中的出现频率。</pre>


<a href="https://baike.baidu.com/item/%E4%B8%AD%E4%BD%8D%E6%95%B0/3087401" target="_blank"><strong>中位数</strong></a> 是将数据样本中半数较高值和半数较低值分隔开的值。

<p>编写一个 SQL 查询，解压 <code>Numbers</code> 表，报告数据库中所有数字的 <strong>中位数</strong> 。结果四舍五入至 <strong>一位小数</strong> 。</p>

<p>查询结果如下例所示。</p>



<div class="top-view__1vxA">
<div class="original__bRMd">
<div>
<p><strong>示例：</strong></p>

<pre>
<strong>输入：</strong>
Numbers 表：
+-----+-----------+
| num | frequency |
+-----+-----------+
| 0   | 7         |
| 1   | 1         |
| 2   | 3         |
| 3   | 1         |
+-----+-----------+
<strong>输出：</strong>
+--------+
| median |
+--------+
| 0.0    |
+--------+
<strong>解释：</strong>
如果解压这个 Numbers 表，可以得到 [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 3] ，所以中位数是 (0 + 0) / 2 = 0 。
</pre>
</div>
</div>
</div>


## 分析

假设数组 A 的长度为 n，中位数是 x，那么要满足：
- A中 >=x 的个数 >=n//2
- A 中 <=x 的个数 >=n//2

## 解答

```mysql
select avg(num) as median
from
    (select num, sum(frequency) over(order by num asc) as asc_amount, 
                    sum(frequency) over(order by num desc) as desc_amount,
                    sum(frequency) over() as total_num
    from numbers) a
where asc_amount >= total_num/2 and desc_amount >= total_num / 2 
```
135 ms
