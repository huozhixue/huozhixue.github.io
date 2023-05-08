# 0681：最近时刻（★）


> <u>**[力扣第 681 题](https://leetcode.cn/problems/next-closest-time/)**</u>

## 题目

<p>给定一个形如<meta charset="UTF-8" /> <code>"HH:MM"</code> 表示的时刻<meta charset="UTF-8" /> <code>time</code> ，利用当前出现过的数字构造下一个距离当前时间最近的时刻。每个出现数字都可以被无限次使用。</p>

<p>你可以认为给定的字符串一定是合法的。例如，<meta charset="UTF-8" /> <code>"01:34"</code> 和 <meta charset="UTF-8" /> <code>"12:09"</code> 是合法的，<code>“1:34”</code> 和 <code>“12:9”</code> 是不合法的。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> "19:34"
<strong>输出:</strong> "19:39"
<strong>解释:</strong> 利用数字 <strong>1, 9, 3, 4</strong> 构造出来的最近时刻是 <strong>19:39</strong>，是 5 分钟之后。
结果不是 <strong>19:33</strong> 因为这个时刻是 23 小时 59 分钟之后。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> "23:59"
<strong>输出:</strong> "22:22"
<strong>解释:</strong> 利用数字 <strong>2, 3, 5, 9</strong> 构造出来的最近时刻是 <strong>22:22</strong>。
答案一定是第二天的某一时刻，所以选择可构造的最小时刻。
</pre>



<p><strong>提示：</strong></p>

<p><meta charset="UTF-8" /></p>

<ul>
<li><code>time.length == 5</code></li>
<li><code>time</code> 为有效时间，格式为 <code>"HH:MM"</code>.</li>
<li><code>0 &lt;= HH &lt; 24</code></li>
<li><code>0 &lt;= MM &lt; 60</code></li>
</ul>


## 分析

因为时刻总数只有60*24，所以可以暴力遍历每个时刻，判断是否合法。

## 解答

```python
def nextClosestTime(self, time: str) -> str:
	h, m = map(int, time.split(':'))
	cur = h*60+m
	while True:
		cur = (cur+1)%1440
		h, m = divmod(cur,60)
		t = '%02d:%02d'%(h,m)
		if set(t)<=set(time):
			return t
```
48 ms
