# 0810：黑板异或游戏（★★★）



## 题目

黑板上写着一个非负整数数组 nums[i] 。Alice 和 Bob 轮流从黑板上擦掉一个数字，Alice 先手。如果擦除一个数字后，剩余的所有数字按位异或运算得出的结果等于 0 的话，当前玩家游戏失败。 (另外，如果只剩一个数字，按位异或运算得到它本身；如果无数字剩余，按位异或运算结果为 0。）

换种说法就是，轮到某个玩家时，如果当前黑板上所有数字按位异或运算结果等于 0，这个玩家获胜。

假设两个玩家每步都使用最优解，当且仅当 Alice 获胜时返回 true。

 <!--more--> 
 
示例：

	输入: nums = [1, 1, 2]
	输出: false
	解释: 
	Alice 有两个选择: 擦掉数字 1 或 2。
	如果擦掉 1, 数组变成 [1, 2]。剩余数字按位异或得到 1 XOR 2 = 3。那么 Bob 可以擦掉任意数字，因为 Alice 会成为擦掉最后一个数字的人，她总是会输。
	如果 Alice 擦掉 2，那么数组变成[1, 1]。剩余数字按位异或得到 1 XOR 1 = 0。Alice 仍然会输掉游戏。

## 分析

先考虑最终状态，设 f(nums) 代表 nums 所有数字的异或结果，最后一轮没擦之前的数字列表是 A。
那么胜利条件是 f(A)==0。失败条件则是任选一数字，剩下的异或运算为 0，等价于：

	all(f(A+[a])==0 for a in A)
	
	此时必然有 	f(A*len(A)+[a for a in A]) == 0
	即			f(A*(len(A)+1)) == 0
	
	len(A) 为奇数时式子成立，可能满足失败条件
	len(A) 为偶数时左侧 = f(A)，若 f(A)==0 直接就胜利了，若 f(A)!=0 也不满足失败条件。
	
	因此 len(A) 为偶数时，不可能是最后的失败状态。
	
那么当 len(nums) 为偶数时，显然每次轮到 Alice 还没擦数字前 len(A) 为偶数，必然不是失败状态。
要么 Alice 中途获胜，要么最后 Bob 擦完最后一个数字失败。Alice 必胜。

反过来，当 len(nums) 为奇数时，只要一开始没有获胜，不管 Alice 选什么都转化为上述情形，
只是轮到 Bob 有必胜策略了。


## 解答

```python
def xorGame(self, nums: List[int]) -> bool:
	return len(nums)%2==0 or reduce(lambda x,y: x^y, nums)==0
```

80 ms

