# 1472：设计浏览器历史记录（1453 分）


> <u>**[力扣第 192 场周赛第 3 题](https://leetcode.cn/problems/design-browser-history/)**</u>

## 题目

<p>你有一个只支持单个标签页的 <strong>浏览器</strong> ，最开始你浏览的网页是 <code>homepage</code> ，你可以访问其他的网站 <code>url</code> ，也可以在浏览历史中后退 <code>steps</code> 步或前进 <code>steps</code> 步。</p>

<p>请你实现 <code>BrowserHistory</code> 类：</p>

<ul>
<li><code>BrowserHistory(string homepage)</code> ，用 <code>homepage</code> 初始化浏览器类。</li>
<li><code>void visit(string url)</code> 从当前页跳转访问 <code>url</code> 对应的页面  。执行此操作会把浏览历史前进的记录全部删除。</li>
<li><code>string back(int steps)</code> 在浏览历史中后退 <code>steps</code> 步。如果你只能在浏览历史中后退至多 <code>x</code> 步且 <code>steps &gt; x</code> ，那么你只后退 <code>x</code> 步。请返回后退 <strong>至多</strong> <code>steps</code> 步以后的 <code>url</code> 。</li>
<li><code>string forward(int steps)</code> 在浏览历史中前进 <code>steps</code> 步。如果你只能在浏览历史中前进至多 <code>x</code> 步且 <code>steps &gt; x</code> ，那么你只前进 <code>x</code> 步。请返回前进 <strong>至多</strong> <code>steps</code>步以后的 <code>url</code> 。</li>
</ul>



<p><strong>示例：</strong></p>

<pre><strong>输入：</strong>
[&quot;BrowserHistory&quot;,&quot;visit&quot;,&quot;visit&quot;,&quot;visit&quot;,&quot;back&quot;,&quot;back&quot;,&quot;forward&quot;,&quot;visit&quot;,&quot;forward&quot;,&quot;back&quot;,&quot;back&quot;]
[[&quot;leetcode.com&quot;],[&quot;google.com&quot;],[&quot;facebook.com&quot;],[&quot;youtube.com&quot;],[1],[1],[1],[&quot;linkedin.com&quot;],[2],[2],[7]]
<strong>输出：</strong>
[null,null,null,null,&quot;facebook.com&quot;,&quot;google.com&quot;,&quot;facebook.com&quot;,null,&quot;linkedin.com&quot;,&quot;google.com&quot;,&quot;leetcode.com&quot;]

<strong>解释：</strong>
BrowserHistory browserHistory = new BrowserHistory(&quot;leetcode.com&quot;);
browserHistory.visit(&quot;google.com&quot;);       // 你原本在浏览 &quot;leetcode.com&quot; 。访问 &quot;google.com&quot;
browserHistory.visit(&quot;facebook.com&quot;);     // 你原本在浏览 &quot;google.com&quot; 。访问 &quot;facebook.com&quot;
browserHistory.visit(&quot;youtube.com&quot;);      // 你原本在浏览 &quot;facebook.com&quot; 。访问 &quot;youtube.com&quot;
browserHistory.back(1);                   // 你原本在浏览 &quot;youtube.com&quot; ，后退到 &quot;facebook.com&quot; 并返回 &quot;facebook.com&quot;
browserHistory.back(1);                   // 你原本在浏览 &quot;facebook.com&quot; ，后退到 &quot;google.com&quot; 并返回 &quot;google.com&quot;
browserHistory.forward(1);                // 你原本在浏览 &quot;google.com&quot; ，前进到 &quot;facebook.com&quot; 并返回 &quot;facebook.com&quot;
browserHistory.visit(&quot;linkedin.com&quot;);     // 你原本在浏览 &quot;facebook.com&quot; 。 访问 &quot;linkedin.com&quot;
browserHistory.forward(2);                // 你原本在浏览 &quot;linkedin.com&quot; ，你无法前进任何步数。
browserHistory.back(2);                   // 你原本在浏览 &quot;linkedin.com&quot; ，后退两步依次先到 &quot;facebook.com&quot; ，然后到 &quot;google.com&quot; ，并返回 &quot;google.com&quot;
browserHistory.back(7);                   // 你原本在浏览 &quot;google.com&quot;， 你只能后退一步到 &quot;leetcode.com&quot; ，并返回 &quot;leetcode.com&quot;
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= homepage.length &lt;= 20</code></li>
<li><code>1 &lt;= url.length &lt;= 20</code></li>
<li><code>1 &lt;= steps &lt;= 100</code></li>
<li><code>homepage</code> 和 <code>url</code> 都只包含 &#39;.&#39; 或者小写英文字母。</li>
<li>最多调用 <code>5000</code> 次 <code>visit</code>， <code>back</code> 和 <code>forward</code> 函数。</li>
</ul>


**相似问题：**
- [2254：设计视频共享平台](/leetcode/2254)


## 分析

数组存储，维护当前下标，模拟即可。
## 解答


```python
class BrowserHistory:

    def __init__(self, homepage: str):
        self.sk = [homepage]
        self.i = 0

    def visit(self, url: str) -> None:
        self.sk = self.sk[:self.i+1]
        self.sk.append(url)
        self.i += 1

    def back(self, steps: int) -> str:
        self.i = max(0,self.i-steps)
        return self.sk[self.i]

    def forward(self, steps: int) -> str:
        self.i = min(len(self.sk)-1,self.i+steps)
        return self.sk[self.i]
```
119 ms
