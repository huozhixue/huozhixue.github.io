# 2115：从给定原材料中找到所有可以做出的菜（1678 分）


> <u>**[力扣第 68 场双周赛第 2 题](https://leetcode.cn/problems/find-all-possible-recipes-from-given-supplies/)**</u>

## 题目

<p>你有 <code>n</code> 道不同菜的信息。给你一个字符串数组 <code>recipes</code> 和一个二维字符串数组 <code>ingredients</code> 。第 <code>i</code> 道菜的名字为 <code>recipes[i]</code> ，如果你有它 <strong>所有</strong> 的原材料 <code>ingredients[i]</code> ，那么你可以 <strong>做出</strong> 这道菜。一道菜的原材料可能是 <strong>另一道</strong> 菜，也就是说 <code>ingredients[i]</code> 可能包含 <code>recipes</code> 中另一个字符串。</p>

<p>同时给你一个字符串数组 <code>supplies</code> ，它包含你初始时拥有的所有原材料，每一种原材料你都有无限多。</p>

<p>请你返回你可以做出的所有菜。你可以以 <strong>任意顺序</strong> 返回它们。</p>

<p>注意两道菜在它们的原材料中可能互相包含。</p>



<p><strong>示例 1：</strong></p>

<pre><b>输入：</b>recipes = ["bread"], ingredients = [["yeast","flour"]], supplies = ["yeast","flour","corn"]
<b>输出：</b>["bread"]
<strong>解释：</strong>
我们可以做出 "bread" ，因为我们有原材料 "yeast" 和 "flour" 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><b>输入：</b>recipes = ["bread","sandwich"], ingredients = [["yeast","flour"],["bread","meat"]], supplies = ["yeast","flour","meat"]
<b>输出：</b>["bread","sandwich"]
<strong>解释：</strong>
我们可以做出 "bread" ，因为我们有原材料 "yeast" 和 "flour" 。
我们可以做出 "sandwich" ，因为我们有原材料 "meat" 且可以做出原材料 "bread" 。
</pre>

<p><strong>示例 3：</strong></p>

<pre><b>输入：</b>recipes = ["bread","sandwich","burger"], ingredients = [["yeast","flour"],["bread","meat"],["sandwich","meat","bread"]], supplies = ["yeast","flour","meat"]
<b>输出：</b>["bread","sandwich","burger"]
<strong>解释：</strong>
我们可以做出 "bread" ，因为我们有原材料 "yeast" 和 "flour" 。
我们可以做出 "sandwich" ，因为我们有原材料 "meat" 且可以做出原材料 "bread" 。
我们可以做出 "burger" ，因为我们有原材料 "meat" 且可以做出原材料 "bread" 和 "sandwich" 。
</pre>

<p><strong>示例 4：</strong></p>

<pre><b>输入：</b>recipes = ["bread"], ingredients = [["yeast","flour"]], supplies = ["yeast"]
<b>输出：</b>[]
<strong>解释：</strong>
我们没法做出任何菜，因为我们只有原材料 "yeast" 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == recipes.length == ingredients.length</code></li>
<li><code>1 &lt;= n &lt;= 100</code></li>
<li><code>1 &lt;= ingredients[i].length, supplies.length &lt;= 100</code></li>
<li><code>1 &lt;= recipes[i].length, ingredients[i][j].length, supplies[k].length &lt;= 10</code></li>
<li><code>recipes[i], ingredients[i][j]</code> 和 <code>supplies[k]</code> 只包含小写英文字母。</li>
<li>所有 <code>recipes</code> 和 <code>supplies</code> 中的值互不相同。</li>
<li><code>ingredients[i]</code> 中的字符串互不相同。</li>
</ul>


**相似问题：**
- [0210：课程表 II](/leetcode/0210)
- [1711：大餐计数（1797 分）](/leetcode/1711)


## 分析

将材料和菜看作顶点，菜对材料的依赖关系看作边，那么就是典型的拓扑排序问题。



## 解答

```python
def findAllRecipes(self, recipes: List[str], ingredients: List[List[str]], supplies: List[str]) -> List[str]:
    nxt, indeg = defaultdict(list), defaultdict(int)
    for r, ings in zip(recipes, ingredients):
        for ing in ings:
            nxt[ing].append(r)
            indeg[r] += 1
    queue = deque(u for u in supplies if indeg[u]==0)
    while queue:
        u = queue.popleft()
        for v in nxt[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)
    return [u for u in recipes if indeg[u]==0]
```
168 ms
