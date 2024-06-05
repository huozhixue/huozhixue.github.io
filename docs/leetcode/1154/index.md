# 1154：一年中的第几天（1199 分）


> <u>**[力扣第 149 场周赛第 1 题](https://leetcode.cn/problems/day-of-the-year/)**</u>

## 题目

<p>给你一个字符串 <code>date</code> ，按 <code>YYYY-MM-DD</code> 格式表示一个 <a href="https://baike.baidu.com/item/公元/17855" target="_blank">现行公元纪年法</a> 日期。返回该日期是当年的第几天。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>date = "2019-01-09"
<strong>输出：</strong>9
<strong>解释：</strong>给定日期是2019年的第九天。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>date = "2019-02-10"
<strong>输出：</strong>41
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>date.length == 10</code></li>
<li><code>date[4] == date[7] == '-'</code>，其他的 <code>date[i]</code> 都是数字</li>
<li><code>date</code> 表示的范围从 1900 年 1 月 1 日至 2019 年 12 月 31 日</li>
</ul>


## 分析

可以直接调库，time或者datetime。

## 解答


```python
def dayOfYear(self, date: str) -> int:
	import datetime
	y, m, d = map(int, date.split('-'))
	return (datetime.date(y, m, d)-datetime.date(y, 1, 1)).days+1
```

48 ms
