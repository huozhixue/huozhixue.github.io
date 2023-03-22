# 0353：贪吃蛇（★★）


## 题目

请你设计一个 贪吃蛇游戏，该游戏将会在一个 屏幕尺寸 = 宽度 x 高度 的屏幕上运行。

起初时，蛇在左上角的 (0, 0) 位置，身体长度为 1 个单位。

你将会被给出一个数组形式的食物位置序列 food ，其中 food[i] = (ri, ci) 。
当蛇吃到食物时，身子的长度会增加 1 个单位，得分也会 +1 。

食物不会同时出现，会按列表的顺序逐一显示在屏幕上。比方讲，第一个食物被蛇吃掉后，第二个食物才会出现。

当一个食物在屏幕上出现时，保证 不会 出现在被蛇身体占据的格子里。

如果蛇越界（与边界相撞）或者头与 移动后 的身体相撞（即，身长为 4 的蛇无法与自己相撞），游戏结束。

实现 SnakeGame 类：
- SnakeGame(int width, int height, int[][] food) 初始化对象，屏幕大小为 height x width ，
食物位置序列为 food
- int move(String direction) 返回蛇在方向 direction 上移动后的得分。如果游戏结束，返回 -1 。
 
示例 1：

![img](https://assets.leetcode.com/uploads/2021/01/13/snake.jpg)

	输入：
	["SnakeGame", "move", "move", "move", "move", "move", "move"]
	[[3, 2, [[1, 2], [0, 1]]], ["R"], ["D"], ["R"], ["U"], ["L"], ["U"]]
	输出：
	[null, 0, 0, 1, 1, 2, -1]

	解释：
	SnakeGame snakeGame = new SnakeGame(3, 2, [[1, 2], [0, 1]]);
	snakeGame.move("R"); // 返回 0
	snakeGame.move("D"); // 返回 0
	snakeGame.move("R"); // 返回 1 ，蛇吃掉了第一个食物，同时第二个食物出现在 (0, 1)
	snakeGame.move("U"); // 返回 1
	snakeGame.move("L"); // 返回 2 ，蛇吃掉了第二个食物，没有出现更多食物
	snakeGame.move("U"); // 返回 -1 ，蛇与边界相撞，游戏结束
 

提示：
- 1 <= width, height <= 10^4
- 1 <= food.length <= 50
- food[i].length == 2
- 0 <= ri < height
- 0 <= ci < width
- direction.length == 1
- direction is 'U', 'D', 'L', or 'R'.
- 最多调用 10^4 次 move 方法


## 分析

用队列维护蛇身即可。

为了方便，先判断吃没吃到食物，再判断是否失败。

## 解答

```python
class SnakeGame:

    def __init__(self, width: int, height: int, food: List[List[int]]):
        self.m = height
        self.n = width
        self.food = deque(food)
        self.snake = deque([(0, 0)])
        self.score = 0
        self.d = dict(zip('UDLR', [(-1, 0), (1, 0), (0, -1), (0, 1)]))

    def move(self, direction: str) -> int:
        x, y = self.snake[-1]
        dx, dy = self.d[direction]
        x, y = x+dx, y+dy
        if self.food and self.food[0] == [x, y]:
            self.food.popleft()
            self.score += 1
        else:
            self.snake.popleft()
        if not (0<=x<self.m and 0<=y<self.n) or (x, y) in self.snake:
            return -1
        self.snake.append((x, y))
        return self.score
```
196 ms


