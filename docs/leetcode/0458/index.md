# 0458：可怜的小猪（★★）


> <u>**[力扣第 458 题](https://leetcode.cn/problems/poor-pigs/)**</u>

## 题目

<p>有<code> buckets</code> 桶液体，其中 <strong>正好有一桶</strong> 含有毒药，其余装的都是水。它们从外观看起来都一样。为了弄清楚哪只水桶含有毒药，你可以喂一些猪喝，通过观察猪是否会死进行判断。不幸的是，你只有 <code>minutesToTest</code> 分钟时间来确定哪桶液体是有毒的。</p>

<p>喂猪的规则如下：</p>

<ol>
<li>选择若干活猪进行喂养</li>
<li>可以允许小猪同时饮用任意数量的桶中的水，并且该过程不需要时间。</li>
<li>小猪喝完水后，必须有 <code>minutesToDie</code> 分钟的冷却时间。在这段时间里，你只能观察，而不允许继续喂猪。</li>
<li>过了 <code>minutesToDie</code> 分钟后，所有喝到毒药的猪都会死去，其他所有猪都会活下来。</li>
<li>重复这一过程，直到时间用完。</li>
</ol>

<p>给你桶的数目 <code>buckets</code> ，<code>minutesToDie</code> 和 <code>minutesToTest</code> ，返回 <em>在规定时间内判断哪个桶有毒所需的 <strong>最小</strong> 猪数</em> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>buckets = 1000, minutesToDie = 15, minutesToTest = 60
<strong>输出：</strong>5
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>buckets = 4, minutesToDie = 15, minutesToTest = 15
<strong>输出：</strong>2
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>buckets = 4, minutesToDie = 15, minutesToTest = 30
<strong>输出：</strong>2
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= buckets &lt;= 1000</code></li>
<li><code>1 &lt;= minutesToDie &lt;= minutesToTest &lt;= 100</code></li>
</ul>


## 分析

先从简单情形入手，假设只有 1 轮：
- 每个小猪只有死/活两种状态，n 个小猪一共只有 $2^n$ 种状态，因此 n 个小猪最多只能判断$2^n$ 桶
- 接着考虑能否真正达到 $2^n$ 桶，状态相关容易想到二进制
- 将桶编号为 $[0,2^n)$，每个桶对应一个 n 位二进制
- 令第一只小猪喝二进制第一位为 0 的所有桶，第二只小猪喝二进制第二位为 0 的所有桶，依此类推
- 根据每个小猪的状态即可确定二进制每一位是 0 还是 1，即可确定唯一桶的编号

接着推广到 k 轮：
- 每个小猪有 k+1 种状态，即第 1 轮后死、。。。第 k 轮后死、最终活着
- n 个小猪最多判断 $(k+1)^n$ 桶
- 类似地，将桶编号对应一个 k 进制数，即可构造

> 一个坑：针对浮点数，不要直接取 log 后的 ceil，要再判断一下。

## 解答


```python
def poorPigs(self, buckets: int, minutesToDie: int, minutesToTest: int) -> int:
	k = minutesToTest//minutesToDie
	x = int(log(buckets, k+1))
	return x if pow(k+1,x)>=buckets else x+1
```
32 ms
