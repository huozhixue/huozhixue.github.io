# 0943：最短超级串（2185 分）


> <u>**[力扣第 111 场周赛第 4 题](https://leetcode.cn/problems/find-the-shortest-superstring/)**</u>

## 题目

<p>给定一个字符串数组 <code>words</code>，找到以 <code>words</code> 中每个字符串作为子字符串的最短字符串。如果有多个有效最短字符串满足题目条件，返回其中 <strong>任意一个</strong> 即可。</p>

<p>我们可以假设 <code>words</code> 中没有字符串是 <code>words</code> 中另一个字符串的子字符串。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>words = ["alex","loves","leetcode"]
<strong>输出：</strong>"alexlovesleetcode"
<strong>解释：</strong>"alex"，"loves"，"leetcode" 的所有排列都会被接受。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>words = ["catg","ctaagt","gcta","ttca","atgcatc"]
<strong>输出：</strong>"gctaagttcatgcatc"</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= words.length <= 12</code></li>
<li><code>1 <= words[i].length <= 20</code></li>
<li><code>words[i]</code> 由小写英文字母组成</li>
<li><code>words</code> 中的所有字符串 <strong>互不相同</strong></li>
</ul>


**相似问题：**
- [2397：被列覆盖的最多行数（1718 分）](/leetcode/2397)
- [3149：找出分数最低的排列（2641 分）](/leetcode/3149)


## 分析

## 解答



