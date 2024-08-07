# 1169：查询无效交易（1658 分）


> <u>**[力扣第 151 场周赛第 1 题](https://leetcode.cn/problems/invalid-transactions/)**</u>

## 题目

<p>如果出现下述两种情况，交易 <strong>可能无效</strong>：</p>

<ul>
<li>交易金额超过<meta charset="UTF-8" /> <code>$1000</code></li>
<li>或者，它和 <strong>另一个城市</strong> 中 <strong>同名</strong> 的另一笔交易相隔不超过 <code>60</code> 分钟（包含 60 分钟整）</li>
</ul>

<p>给定字符串数组交易清单<meta charset="UTF-8" /> <code>transaction</code> 。每个交易字符串 <code>transactions[i]</code> 由一些用逗号分隔的值组成，这些值分别表示交易的名称，时间（以分钟计），金额以及城市。</p>

<p>返回 <code>transactions</code>，返回可能无效的交易列表。你可以按 <strong>任何顺序</strong> 返回答案。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>transactions = ["alice,20,800,mtv","alice,50,100,beijing"]
<strong>输出：</strong>["alice,20,800,mtv","alice,50,100,beijing"]
<strong>解释：</strong>第一笔交易是无效的，因为第二笔交易和它间隔不超过 60 分钟、名称相同且发生在不同的城市。同样，第二笔交易也是无效的。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>transactions = ["alice,20,800,mtv","alice,50,1200,mtv"]
<strong>输出：</strong>["alice,50,1200,mtv"]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>transactions = ["alice,20,800,mtv","bob,50,1200,mtv"]
<strong>输出：</strong>["bob,50,1200,mtv"]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>transactions.length &lt;= 1000</code></li>
<li>每笔交易 <code>transactions[i]</code> 按 <code>"{name},{time},{amount},{city}"</code> 的格式进行记录</li>
<li>每个交易名称 <code>{name}</code> 和城市 <code>{city}</code> 都由小写英文字母组成，长度在 <code>1</code> 到 <code>10</code> 之间</li>
<li>每个交易时间 <code>{time}</code> 由一些数字组成，表示一个 <code>0</code> 到 <code>1000</code> 之间的整数</li>
<li>每笔交易金额 <code>{amount}</code> 由一些数字组成，表示一个 <code>0</code> 到 <code>2000</code> 之间的整数</li>
</ul>




## 分析

数据范围不大，可以直接两重遍历判断每个交易是否有效。

## 解答

```python
def invalidTransactions(self, transactions: List[str]) -> List[str]:
    def check(tr):
        name, time, amount, city = tr.split(',')
        if int(amount) > 1000:
            return True
        for tr2 in transactions:
            name2, time2, _, city2 = tr2.split(',')
            if name == name2 and city != city2 and abs(int(time) - int(time2)) <= 60:
                return True
        return False

    return [tr for tr in transactions if check(tr)]
```
92 ms

