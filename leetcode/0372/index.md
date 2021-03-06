# 0372：超级次方（★★）



## 题目

你的任务是计算 ab 对 1337 取模，a 是一个正整数，b 是一个非常大的正整数且会以数组形式给出。

 <!--more--> 
 
示例 1：

	输入：a = 2, b = [3]
	输出：8
	
示例 2：

	输入：a = 2, b = [1,0]
	输出：1024
	
示例 3：

	输入：a = 1, b = [4,3,3,8,5,2]
	输出：1
	
示例 4：

	输入：a = 2147483647, b = [2,0,0]
	输出：1198

 
## 分析

由于 b 很大，考虑能否根据数组形式递推。
令 dp[i] = superPow(a, b[:i])，$n_i$ 表示 b[:i] 对应的数，那么：

$$n_{i+1}=n_i*10+b[i]$$

$$a^{n_{i+1}}=(a^{n_i})^{10}*a^{b[i]}$$

$$dp[i+1] = dp[i]^{10} * a^{b[i]} \ mod \ 1337$$


## 解答

```python
def superPow(self, a: int, b: List[int]) -> int:
    return reduce(lambda x, y: pow(x, 10, 1337) * pow(a, y, 1337) % 1337, b, 1)
```

80 ms

