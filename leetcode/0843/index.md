# 0843：猜猜这个单词（★★★）



## 题目

这个问题是 LeetCode 平台新增的交互式问题 。

我们给出了一个由一些独特的单词组成的单词列表，每个单词都是 6 个字母长，并且这个列表中的一个单词将被选作秘密。

你可以调用 master.guess(word) 来猜单词。你所猜的单词应当是存在于原列表并且由 6 个小写字母组成的类型字符串。

此函数将会返回一个整型数字，表示你的猜测与秘密单词的准确匹配（值和位置同时匹配）的数目。此外，如果你的猜测不在给定的单词列表中，它将返回 -1。

对于每个测试用例，你有 10 次机会来猜出这个单词。当所有调用都结束时，如果您对 master.guess 的调用不超过 10 次，并且至少有一次猜到秘密，那么您将通过该测试用例。

除了下面示例给出的测试用例外，还会有 5 个额外的测试用例，每个单词列表中将会有 100 个单词。这些测试用例中的每个单词的字母都是从 'a' 到 'z' 中随机选取的，并且保证给定单词列表中的每个单词都是唯一的。


 <!--more--> 
 
示例 1:

	输入: secret = "acckzz", wordlist = ["acckzz","ccbazz","eiowzz","abcczz"]

	解释:

	master.guess("aaaaaa") 返回 -1, 因为 "aaaaaa" 不在 wordlist 中.
	master.guess("acckzz") 返回 6, 因为 "acckzz" 就是秘密，6个字母完全匹配。
	master.guess("ccbazz") 返回 3, 因为 "ccbazz" 有 3 个匹配项。
	master.guess("eiowzz") 返回 2, 因为 "eiowzz" 有 2 个匹配项。
	master.guess("abcczz") 返回 4, 因为 "abcczz" 有 4 个匹配项。

	我们调用了 5 次master.guess，其中一次猜到了秘密，所以我们通过了这个测试用例。

 
## 分析

### #1

可以发现任何方法都不能保证在 10 次内一定猜出来，比如 ['aaaaaa', 'bbbbbb', ... 'zzzzzz'] 26 个单词的列表，必须要猜 26 次才能保证猜中。

因此只考虑 num=guess(word) 是有用信息的情况。那么可以通过 num 缩小查找范围 words。

比如示例 1 中，若选择了单词 word='ccbazz'，那么可以根据 num=guess(word)=3，更新 words 为与该单词匹配 num 项的单词列表 ['acckzz']。依此类推，直到猜中。

```python
def findSecretWord(self, wordlist: List[str], master: 'Master') -> None:
	words = wordlist
	for _ in range(10):
		A = random.choice(words)
		num = master.guess(A)
		if num == 6:
			return
		words = [B for B in words if sum(a==b for a,b in zip(A, B))==num]
```

40 ms

### #2

现在每次随机选单词，有时能 AC 有时不能。考虑能否去掉随机。

显然希望每一步得到的 words 范围更小，也就是选择 word 后更新得到的 words 长度最小。但 num 是未知的，所以只能遍历 num=range(6) 考虑最坏情形。

为了节省时间，可以先把与每个 word 匹配 num 项的单词集合保存在字典 d 中。于是 words 的更新简化为 words &= d[word][num]。


## 解答

```python
def findSecretWord(self, wordlist: List[str], master: 'Master') -> None:
	d, n = defaultdict(lambda: defaultdict(set)), len(wordlist)
	for i in range(n):
		for j in range(i+1, n):
			A, B = wordlist[i], wordlist[j]
			num = sum(a==b for a,b in zip(A, B))
			d[A][num].add(B)
			d[B][num].add(A)

	words = set(wordlist)
	for _ in range(10):
		A = min(words, key=lambda x: max(len(d[x][num] & words) for num in range(6)))
		num = master.guess(A)
		if num == 6:
			return
		words &= d[A][num]
```

76 ms

