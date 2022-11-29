# 0753：破解保险箱（★★★）


> **第  场周赛第  题**

## 题目

有一个需要密码才能打开的保险箱。密码是 n 位数, 密码的每一位是 k 位序列 0, 1, ..., k-1 中的一个 。

你可以随意输入密码，保险箱会自动记住最后 n 位输入，如果匹配，则能够打开保险箱。

举个例子，假设密码是 "345"，你可以输入 "012345" 来打开它，只是你输入了 6 个字符.

请返回一个能打开保险箱的最短字符串。


示例1:

    输入: n = 1, k = 2
    输出: "01"
    说明: "10"也可以打开保险箱。
 

示例2:

    输入: n = 2, k = 2
    输出: "00110"
    说明: "01100", "10011", "11001" 也能打开保险箱。
     

提示：
- n 的范围是 [1, 4]。
- k 的范围是 [1, 10]。
- k^n 最大可能为 4096。


## 分析

本题有个非常巧妙的方法。将所有 n-1 位数作为顶点，如果 u 的后 n-2 位和 v 的前 n-2 位相同，就添加一条边 u 指向 v。

那么输入的字符串可以看作是有向图中的一条路径。字符串要覆盖所有密码，等价于图中的路径要经过所有边。
因此问题转化为求最短的经过所有边的路径。 

该图中所有顶点的入度和出度相同，因此是欧拉图。用 Hierholzer 算法求欧拉回路即可。注意 n==1 的特殊情况。

## 解答

```python
def crackSafe(self, n: int, k: int) -> str:
    def dfs(u):
        while nxt[u] < k:
            nxt[u] += 1
            dfs(u[1:]+str(nxt[u]-1))
        stack.append(u[-1])

    if n == 1:
        return ''.join(str(i) for i in range(k))
    stack, nxt = [], defaultdict(int)
    dfs('0'*(n-1))
    return ''.join(stack) + '0'*(n-2)
```
44 ms

## *附加

其实只要每次都选最大的后继顶点，就不会遇到死胡同。所以本题还可以直接构造。

```python
def crackSafe(self, n: int, k: int) -> str:
    if n == 1:
        return ''.join(str(i) for i in range(k))
    res, nxt = '0' * (n-1), defaultdict(lambda: k-1)
    for _ in range(k**n):
        u = res[1-n:]
        res += str(nxt[u])
        nxt[u] -= 1
    return res
```
40 ms
