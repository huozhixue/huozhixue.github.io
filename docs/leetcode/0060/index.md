# 0060：排列序列（★★）


## 题目

给出集合 [1,2,3,...,n]，其所有元素共有 n! 种排列。

按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：
    
    "123"
    "132"
    "213"
    "231"
    "312"
    "321"

给定 n 和 k，返回第 k 个排列。


示例 1：

    输入：n = 3, k = 3
    输出："213"

示例 2：

    输入：n = 4, k = 9
    输出："2314"

示例 3：

    输入：n = 3, k = 1
    输出："123"

提示：
- 1 <= n <= 9
- 1 <= k <= n!

## 分析 

### #1

可以直接调包得到所有排列，返回第 k 个排列。

```python
def getPermutation(self, n: int, k: int) -> str:
	res = list(permutations(range(1, n+1)))[k-1]
	return ''.join(map(str, res))
```

1908 ms

### #2

也可以递推：
- 为了方便，令 x = k-1 使得从 0 开始
- 由排列组合知识可知，首位固定时有 (n-1)! 种情况，那么第 x 个排列的首位即为第 x//(n-1)! 个元素
- 确定首位元素后，转为求剩下元素的第 x%(n-1)! 个排列，后面依此类推
- 为了方便，维护还剩下的元素的有序数组 A，每次弹出即可
 
## 解答

```python
def getPermutation(self, n: int, k: int) -> str:
    res, A, x = '', list(range(1, n+1)), k-1
    for j in range(n):
        fac = factorial(n-1-j)
        res += str(A.pop(x//fac))
        x %= fac
    return res
```
32 ms

