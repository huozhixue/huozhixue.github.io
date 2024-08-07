# 0833：字符串中的查找与替换（1460 分）


> <u>**[力扣第 84 场周赛第 2 题](https://leetcode.cn/problems/find-and-replace-in-string/)**</u>

## 题目

<p>你会得到一个字符串 <code>s</code> (索引从 0 开始)，你必须对它执行 <code>k</code> 个替换操作。替换操作以三个长度均为 <code>k</code> 的并行数组给出：<code>indices</code>, <code>sources</code>,  <code>targets</code>。</p>

<p>要完成第 <code>i</code> 个替换操作:</p>

<ol>
<li>检查 <strong>子字符串</strong>  <code>sources[i]</code> 是否出现在 <strong>原字符串</strong> <code>s</code> 的索引 <code>indices[i]</code> 处。</li>
<li>如果没有出现， <strong>什么也不做</strong> 。</li>
<li>如果出现，则用 <code>targets[i]</code> <strong>替换</strong> 该子字符串。</li>
</ol>

<p>例如，如果 <code>s = "abcd"</code> ， <code>indices[i] = 0</code> , <code>sources[i] = "ab"</code>， <code>targets[i] = "eee"</code> ，那么替换的结果将是 <code>"<u>eee</u>cd"</code> 。</p>

<p>所有替换操作必须 <strong>同时</strong> 发生，这意味着替换操作不应该影响彼此的索引。测试用例保证元素间<strong>不会重叠 </strong>。</p>

<ul>
<li>例如，一个 <code>s = "abc"</code> ，  <code>indices = [0,1]</code> ， <code>sources = ["ab"，"bc"]</code> 的测试用例将不会生成，因为 <code>"ab"</code> 和 <code>"bc"</code> 替换重叠。</li>
</ul>

<p><em>在对 <code>s</code> 执行所有替换操作后返回 <strong>结果字符串</strong> 。</em></p>

<p><strong>子字符串</strong> 是字符串中连续的字符序列。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/06/12/833-ex1.png" /></p>

<pre>
<strong>输入：</strong>s = "abcd", indices = [0,2], sources = ["a","cd"], targets = ["eee","ffff"]
<strong>输出：</strong>"eeebffff"
<strong>解释：
</strong>"a" 从 s 中的索引 0 开始，所以它被替换为 "eee"。
"cd" 从 s 中的索引 2 开始，所以它被替换为 "ffff"。
</pre>

<p><strong>示例 2：</strong><img src="https://assets.leetcode.com/uploads/2021/06/12/833-ex2-1.png" /></p>

<pre>
<strong>输入：</strong>s = "abcd", indices = [0,2], sources = ["ab","ec"], targets = ["eee","ffff"]
<strong>输出：</strong>"eeecd"
<strong>解释：
</strong>"ab" 从 s 中的索引 0 开始，所以它被替换为 "eee"。
"ec" 没有从<strong>原始的</strong> S 中的索引 2 开始，所以它没有被替换。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 1000</code></li>
<li><code>k == indices.length == sources.length == targets.length</code></li>
<li><code>1 &lt;= k &lt;= 100</code></li>
<li><code>0 &lt;= indices[i] &lt; s.length</code></li>
<li><code>1 &lt;= sources[i].length, targets[i].length &lt;= 50</code></li>
<li><code>s</code> 仅由小写英文字母组成</li>
<li><code>sources[i]</code> 和 <code>targets[i]</code> 仅由小写英文字母组成</li>
</ul>




## 分析

为了使替换操作互不干扰，考虑按索引逆序来替换。

## 解答

```python
def findReplaceString(self, s: str, indices: List[int], sources: List[str], targets: List[str]) -> str:
    s = list(s)
    for idx, x, y in sorted(zip(indices, sources, targets), reverse=True):
        if s[idx:idx+len(x)]==list(x):
            s[idx:idx+len(x)] = list(y)
    return ''.join(s)
```
36 ms

