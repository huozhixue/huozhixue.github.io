# 0192：统计词频（★）


> <u>**[力扣第 192 题](https://leetcode.cn/problems/word-frequency/)**</u>

## 题目

<p>写一个 bash 脚本以统计一个文本文件 <code>words.txt</code> 中每个单词出现的<span data-keyword="frequency-textfile">频率</span>。</p>

<p>为了简单起见，你可以假设：</p>

<ul>
<li><code>words.txt</code>只包括小写字母和 <code>' '</code> 。</li>
<li>每个单词只由小写字母组成。</li>
<li>单词间由一个或多个空格字符分隔。</li>
</ul>

<p><strong>示例:</strong></p>

<p>假设 <code>words.txt</code> 内容如下：</p>

<pre>
the day is sunny the the
the sunny is is
</pre>

<p>你的脚本应当输出（以词频降序排列）：</p>

<pre>
the 4
is 3
sunny 2
day 1
</pre>

<p><strong>说明:</strong></p>

<ul>
<li>不要担心词频相同的单词的排序问题，每个单词出现的频率都是唯一的。</li>
<li>你可以使用一行 <a href="http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO-4.html">Unix pipes</a> 实现吗？</li>
</ul>


## 分析

需要用到的操作：

    cat             浏览文件
    tr -s           替换字符串
    sort            排序
    uniq -c         输出 
    sort -r         反向排序
    awk             格式化输出， $1、$2 取元素
 
## 解答

```bash
cat words.txt | tr -s ' ' '\n' | sort | uniq -c | sort -r | awk '{print $2" "$1}'
```
8 ms



