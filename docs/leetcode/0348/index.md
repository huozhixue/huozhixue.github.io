# 0348：设计井字棋（★）


> <u>**[力扣第 348 题](https://leetcode.cn/problems/design-tic-tac-toe/)**</u>

## 题目

<p>请在 n &times; n 的棋盘上，实现一个判定井字棋（Tic-Tac-Toe）胜负的神器，判断每一次玩家落子后，是否有胜出的玩家。</p>

<p>在这个井字棋游戏中，会有 2 名玩家，他们将轮流在棋盘上放置自己的棋子。</p>

<p>在实现这个判定器的过程中，你可以假设以下这些规则一定成立：</p>

<p>      1. 每一步棋都是在棋盘内的，并且只能被放置在一个空的格子里；</p>

<p>      2. 一旦游戏中有一名玩家胜出的话，游戏将不能再继续；</p>

<p>      3. 一个玩家如果在同一行、同一列或者同一斜对角线上都放置了自己的棋子，那么他便获得胜利。</p>

<p><strong>示例:</strong></p>

<pre>给定棋盘边长 <em>n</em> = 3, 玩家 1 的棋子符号是 &quot;X&quot;，玩家 2 的棋子符号是 &quot;O&quot;。

TicTacToe toe = new TicTacToe(3);

toe.move(0, 0, 1); -&gt; 函数返回 0 (此时，暂时没有玩家赢得这场对决)
|X| | |
| | | |    // 玩家 1 在 (0, 0) 落子。
| | | |

toe.move(0, 2, 2); -&gt; 函数返回 0 (暂时没有玩家赢得本场比赛)
|X| |O|
| | | |    // 玩家 2 在 (0, 2) 落子。
| | | |

toe.move(2, 2, 1); -&gt; 函数返回 0 (暂时没有玩家赢得比赛)
|X| |O|
| | | |    // 玩家 1 在 (2, 2) 落子。
| | |X|

toe.move(1, 1, 2); -&gt; 函数返回 0 (暂没有玩家赢得比赛)
|X| |O|
| |O| |    // 玩家 2 在 (1, 1) 落子。
| | |X|

toe.move(2, 0, 1); -&gt; 函数返回 0 (暂无玩家赢得比赛)
|X| |O|
| |O| |    // 玩家 1 在 (2, 0) 落子。
|X| |X|

toe.move(1, 0, 2); -&gt; 函数返回 0 (没有玩家赢得比赛)
|X| |O|
|O|O| |    // 玩家 2 在 (1, 0) 落子.
|X| |X|

toe.move(2, 1, 1); -&gt; 函数返回 1 (此时，玩家 1 赢得了该场比赛)
|X| |O|
|O|O| |    // 玩家 1 在 (2, 1) 落子。
|X|X|X|
</pre>



<p><strong>进阶:</strong><br>
您有没有可能将每一步的 <code>move()</code> 操作优化到比 O(<em>n</em><sup>2</sup>) 更快吗?</p>


## 分析

只需要维护每一行、每一列、对角线上的 'X' 和 'O' 的个数，判断是否等于 n 即可。

特别的，还可以只维护两者之差。

## 解答

```python
class TicTacToe:

    def __init__(self, n: int):
        self.n = n
        self.r = [0]*n
        self.c = [0]*n
        self.d1 = 0
        self.d2 = 0

    def move(self, row: int, col: int, player: int) -> int:
        val = 1 if player == 1 else -1
        self.r[row] += val
        self.c[col] += val
        self.d1 += val*(row+col==self.n-1)
        self.d2 += val*(row==col)
        for x in (self.r[row], self.c[col], self.d1, self.d2):
            if x == val*self.n:
                return player
        return 0
```
92 ms



