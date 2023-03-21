# 0843：猜猜这个单词（★★）


> <u>**[力扣第 86 场周赛第 4 题](https://leetcode.cn/problems/guess-the-word/)**</u>

## 题目

<p>给你一个由 <strong>不同</strong> 字符串组成的单词列表 <code>words</code> ，其中 <code>words[i]</code> 长度均为 <code>6</code> 。<code>words</code> 中的一个单词将被选作秘密单词 <code>secret</code> 。</p>

<p>另给你一个辅助对象 <code>Master</code> ，你可以调用 <code>Master.guess(word)</code> 来猜单词，其中参数 <code>word</code> 长度为 6 且必须是 <code>words</code> 中的字符串。</p>

<p><code>Master.guess(word)</code> 将会返回如下结果：</p>

<ul>
<li>如果 <code>word</code> 不是 <code>words</code> 中的字符串，返回 <code>-1</code> ，或者</li>
<li>一个整数，表示你所猜测的单词 <code>word</code> 与 <strong>秘密单词</strong> <code>secret</code> 的准确匹配（值和位置同时匹配）的数目。</li>
</ul>

<p>每组测试用例都会包含一个参数 <code>allowedGuesses</code> ，其中 <code>allowedGuesses</code> 是你可以调用 <code>Master.guess(word)</code> 的最大次数。</p>

<p>对于每组测试用例，在不超过允许猜测的次数的前提下，你应该调用 <code>Master.guess</code> 来猜出秘密单词。最终，你将会得到以下结果：</p>

<ul>
<li>如果你调用 <code>Master.guess</code> 的次数大于 <code>allowedGuesses</code> 所限定的次数或者你没有用 <code>Master.guess</code> 猜到秘密单词，则得到 <strong><code>"Either you took too many guesses, or you did not find the secret word."</code> 。</strong></li>
<li>如果你调用 <code>Master.guess</code> 猜到秘密单词，且调用 <code>Master.guess</code> 的次数小于或等于 <code>allowedGuesses</code> ，则得到 <strong><code>"You guessed the secret word correctly."</code> 。</strong></li>
</ul>

<p>生成的测试用例保证你可以利用某种合理的策略（而不是暴力）猜到秘密单词。</p>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>secret = "acckzz", words = ["acckzz","ccbazz","eiowzz","abcczz"], allowedGuesses = 10
<strong>输出：</strong>You guessed the secret word correctly.
<strong>解释：</strong>
master.guess("aaaaaa") 返回 -1 ，因为 "aaaaaa" 不在 words 中。
master.guess("acckzz") 返回 6 ，因为 "acckzz" 是秘密单词 secret ，共有 6 个字母匹配。
master.guess("ccbazz") 返回 3 ，因为 "ccbazz" 共有 3 个字母匹配。
master.guess("eiowzz") 返回 2 ，因为 "eiowzz" 共有 2 个字母匹配。
master.guess("abcczz") 返回 4 ，因为 "abcczz" 共有 4 个字母匹配。
一共调用 5 次 master.guess ，其中一个为秘密单词，所以通过测试用例。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>secret = "hamada", words = ["hamada","khaled"], allowedGuesses = 10
<strong>输出：</strong>You guessed the secret word correctly.
<strong>解释：</strong>共有 2 个单词，且其中一个为秘密单词，可以通过测试用例。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= words.length &lt;= 100</code></li>
<li><code>words[i].length == 6</code></li>
<li><code>words[i]</code> 仅由小写英文字母组成</li>
<li><code>words</code> 中所有字符串 <strong>互不相同</strong></li>
<li><code>secret</code> 存在于 <code>words</code> 中</li>
<li><code>10 &lt;= allowedGuesses &lt;= 30</code></li>
</ul>


## 分析

### #1

可以发现任何方法都不能保证在 10 次内一定猜出来，比如 ['aaaaaa', 'bbbbbb', ... 'zzzzzz'] 26 个单词的列表，
必须要猜 26 次才能保证猜中。

因此只考虑 match=guess(word) 是有用信息的情况。那么可以通过 match 缩小查找范围 words。

比如示例 1 中，若选择了单词 word='ccbazz'，那么可以根据 guess(word)=3，
更新 words 为与该单词匹配 3 项的单词列表 ['acckzz']。依此类推，直到猜中。

```python
def findSecretWord(self, wordlist: List[str], master: 'Master') -> None:
    words = wordlist
    for _ in range(10):
        A = random.choice(words)
        match = master.guess(A)
        if match == 6:
            return
        words = [B for B in words if sum(a==b for a,b in zip(A, B))==match]
```
40 ms

### #2

现在每次随机选单词，有时能 AC 有时不能。考虑能否去掉随机。

显然希望每一步得到的 words 范围更小，也就是选择 A 后更新得到的 words 长度最小。
但 match 是未知的，所以只能遍历 match 考虑最坏情形。


## 解答

```python
def findSecretWord(self, wordlist: List[str], master: 'Master') -> None:
    def cal(A):
        return max(sum(sum(a==b for a,b in zip(A, B))==i for B in words) for i in range(6))

    words = set(wordlist)
    for _ in range(10):
        A = min(words, key=cal)
        match = master.guess(A)
        if match == 6:
            return
        words = [B for B in words if sum(a==b for a,b in zip(A, B))==match]
```
452 ms

