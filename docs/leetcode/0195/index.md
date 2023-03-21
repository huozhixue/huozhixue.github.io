# 0195：第十行


> <u>**[力扣第 195 题](https://leetcode.cn/problems/tenth-line/)**</u>

## 题目

<p>给定一个文本文件 <code>file.txt</code>，请只打印这个文件中的第十行。</p>

<p><strong>示例:</strong></p>

<p>假设 <code>file.txt</code> 有如下内容：</p>

<pre>Line 1
Line 2
Line 3
Line 4
Line 5
Line 6
Line 7
Line 8
Line 9
Line 10
</pre>

<p>你的脚本应当显示第十行：</p>

<pre>Line 10
</pre>

<p><strong>说明:</strong><br>
1. 如果文件少于十行，你应当输出什么？<br>
2. 至少有三种不同的解法，请尝试尽可能多的方法来解题。</p>


## 分析

需要用到的操作：

    sed -n '1p'         -n 定位到第 1 行，然后 p 打印
 
## 解答

```bash
sed -n '10p' file.txt
```
4 ms



