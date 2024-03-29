# 0489：扫地机器人（★★）


> <u>**[力扣第 489 题](https://leetcode.cn/problems/robot-room-cleaner/)**</u>

## 题目

<p>房间（用格栅表示）中有一个扫地机器人。格栅中的每一个格子有空和障碍物两种可能。</p>

<p>扫地机器人提供4个API，可以向前进，向左转或者向右转。每次转弯90度。</p>

<p>当扫地机器人试图进入障碍物格子时，它的碰撞传感器会探测出障碍物，使它停留在原地。</p>

<p>请利用提供的4个API编写让机器人清理整个房间的算法。</p>

<pre>interface Robot {
// 若下一个方格为空，则返回true，并移动至该方格
// 若下一个方格为障碍物，则返回false，并停留在原地
boolean move();

// 在调用turnLeft/turnRight后机器人会停留在原位置
// 每次转弯90度
void turnLeft();
void turnRight();

// 清理所在方格
void clean();
}
</pre>

<p><strong>示例:</strong></p>

<pre><strong>输入:</strong>
room = [
[1,1,1,1,1,0,1,1],
[1,1,1,1,1,0,1,1],
[1,0,1,1,1,1,1,1],
[0,0,0,1,0,0,0,0],
[1,1,1,1,1,1,1,1]
],
row = 1,
col = 3

<strong>解析:</strong>
房间格栅用0或1填充。0表示障碍物，1表示可以通过。
机器人从row=1，col=3的初始位置出发。在左上角的一行以下，三列以右。
</pre>

<p><strong>注意:</strong></p>

<ol>
<li>输入只用于初始化房间和机器人的位置。你需要&ldquo;盲解&rdquo;这个问题。换而言之，你必须在对房间和机器人位置一无所知的情况下，只使用4个给出的API解决问题。 </li>
<li>扫地机器人的初始位置一定是空地。</li>
<li>扫地机器人的初始方向向上。</li>
<li>所有可抵达的格子都是相连的，亦即所有标记为1的格子机器人都可以抵达。</li>
<li>可以假定格栅的四周都被墙包围。</li>
</ol>


## 分析

回溯法遍历即可，注意退回时要保证方向也还原。

## 解答

```python
    def cleanRoom(self, robot):
        def dfs(i, j, dx, dy):
            robot.clean()
            for _ in range(4):
                x, y = i+dx, j+dy
                if (x, y) not in vis and robot.move():
                    vis.add((x, y))
                    dfs(x, y, dx, dy)
                    robot.turnRight()
                    robot.turnRight()
                    robot.move()
                    robot.turnLeft()
                    robot.turnLeft()
                dx, dy = dy, -dx
                robot.turnRight()
        
        vis = {(0, 0)}
        dfs(0, 0, -1, 0)
```

56 ms
