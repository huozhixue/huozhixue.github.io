# 0614：二级关注者（★）


> <u>**[力扣第 614 题](https://leetcode.cn/problems/second-degree-follower/)**</u>

## 题目

<p>在 facebook 中，表 <code>follow</code> 会有 2 个字段： <strong>followee</strong>, <strong>follower</strong> ，分别表示被关注者和关注者。</p>

<p>请写一个 sql 查询语句，对每一个关注者，查询关注他的关注者的数目。</p>

<p>比方说：</p>

<pre>+-------------+------------+
| followee    | follower   |
+-------------+------------+
|     A       |     B      |
|     B       |     C      |
|     B       |     D      |
|     D       |     E      |
+-------------+------------+
</pre>

<p>应该输出：</p>

<pre>+-------------+------------+
| follower    | num        |
+-------------+------------+
|     B       |  2         |
|     D       |  1         |
+-------------+------------+
</pre>

<p><strong>解释：</strong></p>

<p>B 和 D 都在在 <strong>follower</strong> 字段中出现，作为被关注者，B 被 C 和 D 关注，D 被 E 关注。A 不在 <strong>follower</strong> 字段内，所以A不在输出列表中。</p>



<p><strong>注意：</strong></p>

<ul>
<li>被关注者永远不会被他 / 她自己关注。</li>
<li>将结果按照字典序返回。</li>
</ul>




## 分析

先提取出 follower，然后再查询其作为 followee 的数量

## 解答

```mysql
select  followee follower,count(*) num
from follow
where followee in (select distinct follower from follow)
group by followee 
order by followee
```
254 ms
