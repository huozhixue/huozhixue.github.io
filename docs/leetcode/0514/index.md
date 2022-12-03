# 0514：自由之路（★★）


## 题目

电子游戏“辐射4”中，任务 “通向自由” 要求玩家到达名为 “Freedom Trail Ring” 的金属表盘，
并使用表盘拼写特定关键词才能开门。

给定一个字符串 ring ，表示刻在外环上的编码；给定另一个字符串 key ，表示需要拼写的关键词。
您需要算出能够拼写关键词中所有字符的最少步数。

最初，ring 的第一个字符与 12:00 方向对齐。您需要顺时针或逆时针旋转 ring 以使 key 的一个字符
在 12:00 方向对齐，然后按下中心按钮，以此逐个拼写完 key 中的所有字符。

旋转 ring 拼出 key 字符 key[i] 的阶段中：
- 您可以将 ring 顺时针或逆时针旋转 一个位置 ，计为1步。旋转的最终目的是将字符串 ring 的一个字符
与 12:00 方向对齐，并且这个字符必须等于字符 key[i] 。
- 如果字符 key[i] 已经对齐到12:00方向，您需要按下中心按钮进行拼写，这也将算作 1 步。
按完之后，您可以开始拼写 key 的下一个字符（下一阶段）, 直至完成所有拼写。
 

示例 1：

![img](https://assets.leetcode.com/uploads/2018/10/22/ring.jpg)

 
    输入: ring = "godding", key = "gd"
    输出: 4
    解释:
     对于 key 的第一个字符 'g'，已经在正确的位置, 我们只需要1步来拼写这个字符。 
     对于 key 的第二个字符 'd'，我们需要逆时针旋转 ring "godding" 2步使它变成 "ddinggo"。
     当然, 我们还需要1步进行拼写。
     因此最终的输出是 4。
示例 2:

    输入: ring = "godding", key = "godding"
    输出: 13
 

提示：
- 1 <= ring.length, key.length <= 100
- ring 和 key 只包含小写英文字母
- 保证 字符串 key 一定可以由字符串  ring 旋转拼出

     

## 分析

先按顺/逆时针找到第一个 key[0] 后，可以转为递归子问题。

那么令 dfs(i, j) 代表当 ring[i] 对齐北方时，拼写 key[j:] 的最少步数，即可递推。

要找与 ring[i] 最近的 key[j] 位置，考虑保存 ring 中每个字符的位置列表（递增的），
然后可以二分查找离 i 最近的某字符位置，节省时间。

## 解答

```python
def findRotateSteps(self, ring: str, key: str) -> int:
    @lru_cache(None)
    def dfs(i, j):
        if j == len(key):
            return 0
        A = d[key[j]]
        pos = bisect_left(A, i)
        left, right = A[pos-1], A[pos % len(A)]
        return 1+min((i-left)%n+dfs(left, j+1), (right-i)%n+dfs(right, j+1))

    d, n = defaultdict(list), len(ring)
    for i, char in enumerate(ring):
        d[char].append(i)
    return dfs(0, 0)
```
72 ms