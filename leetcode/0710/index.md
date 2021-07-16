# 0710：黑名单中的随机数（★★★）


## 题目

给定一个包含 [0，n) 中不重复整数的黑名单 blacklist ，写一个函数从 [0, n) 中返回一个不在 blacklist 中的随机整数。

对它进行优化使其尽量少调用系统方法 Math.random() 。

提示:

- 1 <= n <= 1000000000
- 0 <= blacklist.length < min(100000, N)
- [0, n) 不包含 n ，详细参见 interval notation 。

 <!--more--> 
 
示例 1：

	输入：
	["Solution","pick","pick","pick"]
	[[1,[]],[],[],[]]
	输出：[null,0,0,0]

示例 2：

	输入：
	["Solution","pick","pick","pick"]
	[[2,[]],[],[],[]]
	输出：[null,1,1,1]

示例 3：

	输入：
	["Solution","pick","pick","pick"]
	[[3,[1]],[],[],[]]
	输出：[null,0,0,2]

示例 4：

	输入： 
	["Solution","pick","pick","pick"]
	[[4,[2]],[],[],[]]
	输出：[null,1,3,1]


## 分析

n 很大，直接存储白名单会超时。只能考虑先随机白名单的序号，然后在 [0, n) 中找对应序号的数。

白名单共 m = n-len(blacklist) 个，所以应该先在 [0, m) 范围随机序号。

有个巧妙的想法是如果随机出的序号 i 不在黑名单中，返回即可。
如果 i 在黑名单中，则映射到 [m, n) 范围内剩下的白名单数。

因此只需要保证 [0, m) 中的黑名单数一一对应到 [m, n) 的白名单数即可。


## 解答

```python
class Solution:

    def __init__(self, n: int, blacklist: List[int]):
        m = n - len(blacklist)
        B = [i for i in blacklist if i < m]
        A = set(range(m, n)) - set(blacklist)
        self.m = m
        self.d = dict(zip(B, A))

    def pick(self) -> int:
        i = random.randrange(0, self.m)
        return self.d.get(i, i)
```

328 ms

