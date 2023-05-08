# 0588：设计内存文件系统（★★）


> <u>**[力扣第 588 题](https://leetcode.cn/problems/design-in-memory-file-system/)**</u>

## 题目

<p>设计一个内存文件系统，模拟以下功能：</p>

<p>实现文件系统类:</p>

<ul>
<li><code>FileSystem()</code> 初始化系统对象</li>
<li><code>List&lt;String&gt; ls(String path)</code>
<ul>
<li>如果 <code>path</code> 是一个文件路径，则返回一个仅包含该文件名称的列表。</li>
<li>如果 <code>path</code> 是一个目录路径，则返回该目录中文件和 <strong>目录名</strong> 的列表。</li>
</ul>
</li>
</ul>

<p>          答案应该 按<strong>字典顺序</strong> 排列。</p>

<ul>
<li><code>void mkdir(String path)</code> 根据给定的路径创建一个新目录。给定的目录路径不存在。如果路径中的中间目录不存在，您也应该创建它们。</li>
<li><code>void addContentToFile(String filePath, String content)</code>
<ul>
<li>如果 <code>filePath</code> 不存在，则创建包含给定内容 <code>content</code>的文件。</li>
<li>如果 <code>filePath</code> 已经存在，将给定的内容 <code>content</code>附加到原始内容。</li>
</ul>
</li>
<li><code>String readContentFromFile(String filePath)</code> 返回 <code>filePath</code>下的文件内容。</li>
</ul>



<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/04/28/filesystem.png" style="height: 315px; width: 650px;" /></p>

<pre>
<strong>输入:</strong>
["FileSystem","ls","mkdir","addContentToFile","ls","readContentFromFile"]
[[],["/"],["/a/b/c"],["/a/b/c/d","hello"],["/"],["/a/b/c/d"]]
<strong>输出:</strong>
[null,[],null,null,["a"],"hello"]

<strong>解释:</strong>
FileSystem fileSystem = new FileSystem();
fileSystem.ls("/");                         // 返回 []
fileSystem.mkdir("/a/b/c");
fileSystem.addContentToFile("/a/b/c/d", "hello");
fileSystem.ls("/");                         // 返回 ["a"]
fileSystem.readContentFromFile("/a/b/c/d"); // 返回 "hello"</pre>



<p><strong>注意:</strong></p>

<ul>
<li><code>1 &lt;= path.length, filePath.length &lt;= 100</code></li>
<li><code>path</code> 和 <code>filePath</code> 都是绝对路径，除非是根目录 <code>‘/’</code> 自身，其他路径都是以 <code>‘/’</code> 开头且 <strong>不</strong> 以 <code>‘/’</code> 结束。</li>
<li>你可以假定所有操作的参数都是有效的，即用户不会获取不存在文件的内容，或者获取不存在文件夹和文件的列表。</li>
<li>你可以假定所有文件夹名字和文件名字都只包含小写字母，且同一文件夹下不会有相同名字的文件夹或文件。</li>
<li><code>1 &lt;= content.length &lt;= 50</code></li>
<li><code>ls</code>, <code>mkdir</code>, <code>addContentToFile</code>, and <code>readContentFromFile</code> 最多被调用 <code>300</code> 次</li>
</ul>


## 分析

典型的字典树，用 '#' 标记文件即可。

## 解答

```python
class FileSystem:

    def __init__(self):
        T = lambda: defaultdict(T)
        self.trie = T()

    def ls(self, path: str) -> List[str]:
        p = reduce(dict.__getitem__, filter(None, path.split('/')), self.trie)
        return [path.split('/')[-1]] if '#' in p else sorted(p.keys())

    def mkdir(self, path: str) -> None:
        reduce(dict.__getitem__, filter(None, path.split('/')), self.trie)

    def addContentToFile(self, filePath: str, content: str) -> None:
        p = reduce(dict.__getitem__, filter(None, filePath.split('/')), self.trie)
        p['#'] = p.get('#', '') + content

    def readContentFromFile(self, filePath: str) -> str:
        return reduce(dict.__getitem__, filter(None, filePath.split('/')), self.trie)['#']
```

48 ms
