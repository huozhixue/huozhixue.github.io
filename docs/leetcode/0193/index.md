# 0193：有效电话号码


> <u>**[力扣第 193 题](https://leetcode.cn/problems/valid-phone-numbers/)**</u>

## 题目

<p>给定一个包含电话号码列表（一行一个电话号码）的文本文件 <code>file.txt</code>，写一个单行 bash 脚本输出所有有效的电话号码。</p>

<p>你可以假设一个有效的电话号码必须满足以下两种格式： (xxx) xxx-xxxx 或 xxx-xxx-xxxx。（x 表示一个数字）</p>

<p>你也可以假设每行前后没有多余的空格字符。</p>



<p><strong>示例：</strong></p>

<p>假设 <code>file.txt</code> 内容如下：</p>

<pre>
987-123-4567
123 456 7890
(123) 456-7890
</pre>

<p>你的脚本应当输出下列有效的电话号码：</p>

<pre>
987-123-4567
(123) 456-7890
</pre>




## 分析

正则匹配，需要用到的操作：

    grep -P         用 perl 模式的正则，能支持 \d
 
## 解答

```bash
grep -P '^(\d{3}-|\(\d{3}\) )\d{3}-\d{4}$' file.txt
```
8 ms



