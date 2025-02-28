# 1125：最小的必要团队（2250 分）


> <u>**[力扣第 145 场周赛第 4 题](https://leetcode.cn/problems/smallest-sufficient-team/)**</u>

## 题目

<p>作为项目经理，你规划了一份需求的技能清单 <code>req_skills</code>，并打算从备选人员名单 <code>people</code> 中选出些人组成一个「必要团队」（ 编号为 <code>i</code> 的备选人员 <code>people[i]</code> 含有一份该备选人员掌握的技能列表）。</p>

<p>所谓「必要团队」，就是在这个团队中，对于所需求的技能列表 <code>req_skills</code> 中列出的每项技能，团队中至少有一名成员已经掌握。可以用每个人的编号来表示团队中的成员：</p>

<ul>
<li>例如，团队 <code>team = [0, 1, 3]</code> 表示掌握技能分别为 <code>people[0]</code>，<code>people[1]</code>，和 <code>people[3]</code> 的备选人员。</li>
</ul>

<p>请你返回 <strong>任一</strong> 规模最小的必要团队，团队成员用人员编号表示。你可以按 <strong>任意顺序</strong> 返回答案，题目数据保证答案存在。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>req_skills = ["java","nodejs","reactjs"], people = [["java"],["nodejs"],["nodejs","reactjs"]]
<strong>输出：</strong>[0,2]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>req_skills = ["algorithms","math","java","reactjs","csharp","aws"], people = [["algorithms","math","java"],["algorithms","math","reactjs"],["java","csharp","aws"],["reactjs","csharp"],["csharp","math"],["aws","java"]]
<strong>输出：</strong>[1,2]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= req_skills.length <= 16</code></li>
<li><code>1 <= req_skills[i].length <= 16</code></li>
<li><code>req_skills[i]</code> 由小写英文字母组成</li>
<li><code>req_skills</code> 中的所有字符串 <strong>互不相同</strong></li>
<li><code>1 <= people.length <= 60</code></li>
<li><code>0 <= people[i].length <= 16</code></li>
<li><code>1 <= people[i][j].length <= 16</code></li>
<li><code>people[i][j]</code> 由小写英文字母组成</li>
<li><code>people[i]</code> 中的所有字符串 <strong>互不相同</strong></li>
<li><code>people[i]</code> 中的每个技能是 <code>req_skills</code> 中的技能</li>
<li>题目数据保证「必要团队」一定存在</li>
</ul>


**相似问题：**
- [1994：好子集的数目（2464 分）](/leetcode/1994)
- [1986：完成任务的最少工作时间段（1995 分）](/leetcode/1986)
- [2397：被列覆盖的最多行数（1718 分）](/leetcode/2397)


## 分析


### #1

- 典型的状压 dp
- 令 f(i,st) 代表 peope[:i] 掌握技能集合 st 的最小团队集合，即可递推


```python
class Solution:
    def smallestSufficientTeam(self, req_skills: List[str], people: List[List[str]]) -> List[int]:
        d = {x:i for i,x in enumerate(req_skills)}
        m,n = len(people),len(d)
        f = [(1<<m)-1]*(1<<n) 
        f[0] = 0
        for i,A in enumerate(people):
            st0 = sum(1<<d[a] for a in A)
            for st in range((1<<n)-1,-1,-1):
                if f[st].bit_count()==m:
                    continue
                st2 = st|st0
                if 1+f[st].bit_count()<f[st2].bit_count():
                    f[st2] = f[st]|1<<i
        return [i for i in range(m) if f[-1]>>i&1]
```
455 ms
### #2

- 还可以令 f、g 分别代表最小团队的大小和集合，节省 bit_count() 的时间
## 解答

```python
class Solution:
    def smallestSufficientTeam(self, req_skills: List[str], people: List[List[str]]) -> List[int]:
        d = {x:i for i,x in enumerate(req_skills)}
        m,n = len(people),len(d)
        f = [m]*(1<<n)
        g = [(1<<m)-1]*(1<<n) 
        f[0] = g[0] = 0
        for i,A in enumerate(people):
            st0 = sum(1<<d[a] for a in A)
            for st in range((1<<n)-1,-1,-1):
                if f[st]==m:
                    continue
                st2 = st|st0
                if 1+f[st]<f[st2]:
                    f[st2] = 1+f[st]
                    g[st2] = g[st]|1<<i
        return [i for i in range(m) if g[-1]>>i&1]
```
236 ms
