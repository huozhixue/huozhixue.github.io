// pjax 返回时会用缓存的 HTML 字符串还原 DOM：元素上的 data-* 标记会被保留，
// 但事件监听器丢失。用 WeakSet 按“元素对象”判重（每次都是新对象），确保重新初始化。
const tagFilterReady = new WeakSet();
const tagCloudMoreReady = new WeakSet();
// 全局事件（scroll/resize/mask）只绑定一次：pjax 往返会反复 new Theme()，
// 若每次都 addEventListener，监听器会不断累积导致页面越用越卡。
// 统一通过 currentTheme 转发到当前实例，保证回调作用于最新 DOM 与最新的事件集合。
let currentTheme = null;
const globalEventsBound = { scroll: false, resize: false, mask: false };

// 按需加载重型库：KaTeX / 搜索 / 灯箱 / 轮播 / Bangumi 样式。
// 用全局 Map 缓存 Promise，保证同一地址只注入一次；pjax 换页后新页 config 覆盖，
// 但已加载的库命中缓存，不会重复请求。
const loadedAssets = new Map();
function loadAsset(url, type) {
    if (!url) { return Promise.resolve(); }
    const key = type + ':' + url;
    if (loadedAssets.has(key)) { return loadedAssets.get(key); }
    const p = new Promise((resolve, _reject) => {
        const el = document.createElement(type === 'css' ? 'link' : 'script');
        if (type === 'css') { el.rel = 'stylesheet'; el.href = url; }
        else { el.src = url; }
        el.onload = () => { resolve(); };
        el.onerror = () => { loadedAssets.delete(key); resolve(); }; // 失败不阻塞其它初始化
        (type === 'css' ? document.head : document.body).appendChild(el);
    });
    loadedAssets.set(key, p);
    return p;
}
// 库路径表：DEFAULT_LIBS 是唯一维护点（模板不再往 config 里写路径）。
// 仍保留 config.deferredLibs 读取，方便以后需要临时覆盖 CDN 路径时不用改 JS。
const DEFAULT_LIBS = {
    math: {
        katex: 'lib/katex/katex.min.js',
        render: 'lib/katex/auto-render.min.js',
        copyTex: 'lib/katex/copy-tex.min.js',
        mhchem: 'lib/katex/mhchem.min.js',
        sequential: true
    },
    search: {
        js: [
            'lib/autocomplete/autocomplete.min.js',
            'lib/algoliasearch/algoliasearch-lite.umd.min.js'
        ]
    },
    lightgallery: {
        css: ['lib/lightgallery/lightgallery.min.css'],
        js: [
            'lib/lightgallery/lightgallery.min.js',
            'lib/lightgallery/lg-thumbnail.min.js',
            'lib/lightgallery/lg-zoom.min.js'
        ],
        sequential: true
    },
    abbangumi: { css: ['lib/abbangumi/abbangumi.css'] },
    flexslider: {
        css: ['lib/flexslider/flexslider.css'],
        js: ['lib/flexslider/jquery.flexslider.js']
    }
};
function resolveLibUrl(path) {
    // 相对路径补成站点根路径（config.baseURL 可能是子路径，用 JS 侧统一处理）
    return /^https?:\/\//.test(path) ? path : '/' + String(path).replace(/^\//, '');
}
function normalizeLibList(value) {
    if (!value) { return []; }
    return (Array.isArray(value) ? value : [value]).filter(Boolean).map(resolveLibUrl);
}
function loadAssetSeries(urls, type) {
    return urls.reduce((chain, url) => chain.then(() => loadAsset(url, type)), Promise.resolve());
}
function loadDeferred(name) {
    const cfg = (window.config && window.config.deferredLibs) || {};
    let lib = cfg[name] || DEFAULT_LIBS[name];
    if (!lib) { return Promise.resolve(); }
    if (typeof lib === 'string') { lib = { js: [lib] }; }
    const css = normalizeLibList(lib.css);
    const js = normalizeLibList(lib.js);
    // math 的 katex/render/copyTex/mhchem 平铺键（katex 主程序必须先加载）
    ['katex', 'render', 'copyTex', 'mhchem'].forEach(key => {
        if (lib[key]) { js.push(resolveLibUrl(lib[key])); }
    });
    const jobs = css.map(url => loadAsset(url, 'css'));
    if (lib.sequential) { jobs.push(loadAssetSeries(js, 'js')); }
    else { js.forEach(url => jobs.push(loadAsset(url, 'js'))); }
    return Promise.all(jobs);
}

class Util {
    forEach(elements, handler) {
        elements = elements || [];
        for (let i = 0; i < elements.length; i++) handler(elements[i]);
    }

    getScrollTop() {
        return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    }

    isMobile() {
        return window.matchMedia('only screen and (max-width: 680px)').matches;
    }

    isTocStatic() {
        return window.matchMedia('only screen and (max-width: 960px)').matches;
    }

    animateCSS(element, animation, reserved, callback) {
        if (!Array.isArray(animation)) animation = [animation];
        element.classList.add('animated', ...animation);
        const handler = () => {
            element.classList.remove('animated', ...animation);
            element.removeEventListener('animationend', handler);
            if (typeof callback === 'function') callback();
        };
        if (!reserved) element.addEventListener('animationend', handler, false);
    }
}

class Theme {
    constructor() {
        currentTheme = this;
        this.config = window.config;
        this.data = this.config.data;
        this.isDark = document.body.getAttribute('theme') === 'dark';
        this.util = new Util();
        this.newScrollTop = this.util.getScrollTop();
        this.oldScrollTop = this.newScrollTop;
        this.scrollEventSet = new Set();
        this.resizeEventSet = new Set();
        this.switchThemeEventSet = new Set();
        this.clickMaskEventSet = new Set();
        if (window.objectFitImages) objectFitImages();
    }

    initSVGIcon() {
        this.util.forEach(document.querySelectorAll('[data-svg-src]'), $icon => {
            fetch($icon.getAttribute('data-svg-src'))
                .then(response => response.text())
                .then(svg => {
                    const $temp = document.createElement('div');
                    $temp.insertAdjacentHTML('afterbegin', svg);
                    const $svg = $temp.firstChild;
                    $svg.setAttribute('data-svg-src', $icon.getAttribute('data-svg-src'));
                    $svg.classList.add('icon');
                    const $titleElements = $svg.getElementsByTagName('title');
                    if ($titleElements.length) $svg.removeChild($titleElements[0]);
                    $icon.parentElement.replaceChild($svg, $icon);
                })
                .catch(err => { console.error(err); });
        });
    }

    initTwemoji() {
        if (this.config.twemoji) twemoji.parse(document.body);
    }

    initMenuMobile() {
        const $menuToggleMobile = document.getElementById('menu-toggle-mobile');
        const $menuMobile = document.getElementById('menu-mobile');
        $menuToggleMobile.addEventListener('click', () => {
            document.body.classList.toggle('blur');
            $menuToggleMobile.classList.toggle('active');
            $menuMobile.classList.toggle('active');
        }, false);
        this._menuMobileOnClickMask = this._menuMobileOnClickMask || (() => {
            $menuToggleMobile.classList.remove('active');
            $menuMobile.classList.remove('active');
        });
        this.clickMaskEventSet.add(this._menuMobileOnClickMask);
    }

    initSwitchTheme() {
        this.util.forEach(document.getElementsByClassName('theme-switch'), $themeSwitch => {
            $themeSwitch.addEventListener('click', () => {
                if (document.body.getAttribute('theme') === 'dark') document.body.setAttribute('theme', 'light');
                else document.body.setAttribute('theme', 'dark');
                this.isDark = !this.isDark;
                window.localStorage && localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
                const self = currentTheme || this;
                for (let event of self.switchThemeEventSet) event();
            }, false);
        });
    }

    closeSearch() {
        const isMobile = this.util.isMobile();
        const suffix = isMobile ? 'mobile' : 'desktop';
        const $header = document.getElementById(`header-${suffix}`);
        const $searchInput = document.getElementById(`search-input-${suffix}`);
        const $searchLoading = document.getElementById(`search-loading-${suffix}`);
        const $searchClear = document.getElementById(`search-clear-${suffix}`);
        if ($header) { $header.classList.remove('open'); }
        document.body.classList.remove('blur');
        if ($searchLoading) { $searchLoading.style.display = 'none'; }
        if ($searchClear) { $searchClear.style.display = 'none'; }
        const autosearch = isMobile ? this._searchMobile : this._searchDesktop;
        if (autosearch && autosearch.autocomplete) { autosearch.autocomplete.setVal(''); }
        if ($searchInput && document.activeElement === $searchInput) { $searchInput.blur(); }
        if (isMobile) {
            const $toggle = document.getElementById('menu-toggle-mobile');
            const $menu = document.getElementById('menu-mobile');
            if ($toggle) { $toggle.classList.remove('active'); }
            if ($menu) { $menu.classList.remove('active'); }
        }
    }

    initSearch() {
        const searchConfig = this.config.search;
        const isMobile = this.util.isMobile();
        if (!searchConfig || isMobile && this._searchMobileOnce || !isMobile && this._searchDesktopOnce) return;
        const self = this;
        // 搜索依赖只在用户真正准备搜索时加载：点按钮、鼠标移入按钮或输入框获得焦点。
        function ensureSearchLibraries() {
            if (self._searchLibReady) { return; }
            self._searchLibReady = true;
            self._searchLibsPromise = self._searchLibsPromise || loadDeferred('search');
            self._searchLibsPromise.then(startAutosearch);
        }

        const maxResultLength = searchConfig.maxResultLength ? searchConfig.maxResultLength : 10;
        const snippetLength = searchConfig.snippetLength ? searchConfig.snippetLength : 50;
        const highlightTag = searchConfig.highlightTag ? searchConfig.highlightTag : 'em';

        const suffix = isMobile ? 'mobile' : 'desktop';
        const $header = document.getElementById(`header-${suffix}`);
        const $searchInput = document.getElementById(`search-input-${suffix}`);
        const $searchToggle = document.getElementById(`search-toggle-${suffix}`);
        const $searchLoading = document.getElementById(`search-loading-${suffix}`);
        const $searchClear = document.getElementById(`search-clear-${suffix}`);
        if (isMobile) {
            this._searchMobileOnce = true;
            $searchInput.addEventListener('focus', () => {
                ensureSearchLibraries();
                document.body.classList.add('blur');
                $header.classList.add('open');
            }, false);
            document.getElementById('search-cancel-mobile').addEventListener('click', () => {
                this.closeSearch();
            }, false);
            $searchClear.addEventListener('click', () => {
                $searchClear.style.display = 'none';
                this._searchMobile && this._searchMobile.autocomplete.setVal('');
            }, false);
            this._searchMobileOnClickMask = this._searchMobileOnClickMask || (() => {
                this.closeSearch();
            });
            this.clickMaskEventSet.add(this._searchMobileOnClickMask);
        } else {
            this._searchDesktopOnce = true;
            $searchToggle.addEventListener('click', () => {
                if ($header.classList.contains('open')) { this.closeSearch(); return; }
                ensureSearchLibraries();
                document.body.classList.add('blur');
                $header.classList.add('open');
                $searchInput.focus();
            }, false);
            $searchToggle.addEventListener('mouseenter', ensureSearchLibraries, false);
            $searchInput.addEventListener('focus', ensureSearchLibraries, false);
            $searchClear.addEventListener('click', () => {
                $searchClear.style.display = 'none';
                this._searchDesktop && this._searchDesktop.autocomplete.setVal('');
            }, false);
            this._searchDesktopOnClickMask = this._searchDesktopOnClickMask || (() => {
                this.closeSearch();
            });
            this.clickMaskEventSet.add(this._searchDesktopOnClickMask);
        }
        $searchInput.addEventListener('input', () => {
            if ($searchInput.value === '') $searchClear.style.display = 'none';
            else $searchClear.style.display = 'inline';
        }, false);
        // 搜索框失焦（点到正文/其它菜单）或按 Esc 时自动收起，避免一直展开占着导航栏
        $searchInput.addEventListener('blur', (event) => {
            const next = event.relatedTarget;
            if (next && next.closest && (next.closest('.search') || next.closest('.search-dropdown'))) { return; }
            window.setTimeout(() => {
                const $currentHeader = document.getElementById(`header-${suffix}`);
                if ($currentHeader && $currentHeader.classList.contains('open') && document.activeElement !== $searchInput) {
                    this.closeSearch();
                }
            }, 120);
        }, false);
        $searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') { this.closeSearch(); }
        }, false);

        const initAutosearch = () => {
            const autosearch = autocomplete(`#search-input-${suffix}`, {
                hint: false,
                autoselect: true,
                dropdownMenuContainer: `#search-dropdown-${suffix}`,
                clearOnSelected: true,
                cssClasses: { noPrefix: true },
                debug: true,
            }, {
                name: 'search',
                source: (query, callback) => {
                    $searchLoading.style.display = 'inline';
                    $searchClear.style.display = 'none';
                    const finish = (results) => {
                        $searchLoading.style.display = 'none';
                        $searchClear.style.display = 'inline';
                        callback(results);
                    };
                    if (searchConfig.type === 'lunr') {
                        const search = () => {
                            if (lunr.queryHandler) query = lunr.queryHandler(query);
                            const results = {};
                            this._index.search(query).forEach(({ ref, matchData: { metadata } }) => {
                                const matchData = this._indexData[ref];
                                let { uri, title, content: context } = matchData;
                                if (results[uri]) return;
                                let position = 0;
                                Object.values(metadata).forEach(({ content }) => {
                                    if (content) {
                                        const matchPosition = content.position[0][0];
                                        if (matchPosition < position || position === 0) position = matchPosition;
                                    }
                                });
                                position -= snippetLength / 5;
                                if (position > 0) {
                                    position += context.substr(position, 20).lastIndexOf(' ') + 1;
                                    context = '...' + context.substr(position, snippetLength);
                                } else {
                                    context = context.substr(0, snippetLength);
                                }
                                Object.keys(metadata).forEach(key => {
                                    title = title.replace(new RegExp(`(${key})`, 'gi'), `<${highlightTag}>$1</${highlightTag}>`);
                                    context = context.replace(new RegExp(`(${key})`, 'gi'), `<${highlightTag}>$1</${highlightTag}>`);
                                });
                                results[uri] = {
                                    'uri': uri,
                                    'title' : title,
                                    'date' : matchData.date,
                                    'context' : context,
                                };
                            });
                            return Object.values(results).slice(0, maxResultLength);
                        }
                        if (!this._index) {
                            fetch(searchConfig.lunrIndexURL)
                                .then(response => response.json())
                                .then(data => {
                                    const indexData = {};
                                    this._index = lunr(function () {
                                        if (searchConfig.lunrLanguageCode) this.use(lunr[searchConfig.lunrLanguageCode]);
                                        this.ref('objectID');
                                        this.field('title', { boost: 50 });
                                        this.field('tags', { boost: 20 });
                                        this.field('categories', { boost: 20 });
                                        this.field('content', { boost: 10 });
                                        this.metadataWhitelist = ['position'];
                                        data.forEach((record) => {
                                            indexData[record.objectID] = record;
                                            this.add(record);
                                        });
                                    });
                                    this._indexData = indexData;
                                    finish(search());
                                }).catch(err => {
                                    console.error(err);
                                    finish([]);
                                });
                        } else finish(search());
                    } else if (searchConfig.type === 'algolia') {
                        this._algoliaIndex = this._algoliaIndex || algoliasearch(searchConfig.algoliaAppID, searchConfig.algoliaSearchKey).initIndex(searchConfig.algoliaIndex);
                        this._algoliaIndex
                            .search(query, {
                                offset: 0,
                                length: maxResultLength * 8,
                                attributesToHighlight: ['title'],
                                attributesToSnippet: [`content:${snippetLength}`],
                                highlightPreTag: `<${highlightTag}>`,
                                highlightPostTag: `</${highlightTag}>`,
                            })
                            .then(({ hits }) => {
                                const results = {};
                                hits.forEach(({ uri, date, _highlightResult: { title }, _snippetResult: { content } }) => {
                                    if (results[uri] && results[uri].context.length > content.value) return;
                                    results[uri] = {
                                        uri: uri,
                                        title: title.value,
                                        date: date,
                                        context: content.value,
                                    };
                                });
                                finish(Object.values(results).slice(0, maxResultLength));
                            })
                            .catch(err => {
                                console.error(err);
                                finish([]);
                            });
                    }
                },
                templates: {
                    suggestion: ({ title, date, context }) => `<div><span class="suggestion-title">${title}</span><span class="suggestion-date">${date}</span></div><div class="suggestion-context">${context}</div>`,
                    empty: ({ query }) => `<div class="search-empty">${searchConfig.noResultsFound}: <span class="search-query">"${query}"</span></div>`,
                    footer: ({}) => {
                        const { searchType, icon, href } = searchConfig.type === 'algolia' ? {
                            searchType: 'algolia',
                            icon: '<i class="fab fa-algolia fa-fw"></i>',
                            href: 'https://www.algolia.com/',
                        } : {
                            searchType: 'Lunr.js',
                            icon: '',
                            href: 'https://lunrjs.com/',
                        };
                        return `<div class="search-footer">Search by <a href="${href}" rel="noopener noreffer" target="_blank">${icon} ${searchType}</a></div>`;},
                },
            });
            autosearch.on('autocomplete:selected', (_event, suggestion, _dataset, _context) => {
                for (let event of this.clickMaskEventSet) event();
                document.body.classList.remove('blur');
				$.pjax({url: suggestion.uri, container: '.container', fragment: '.container', timeout: 8000});
				window.config.data = {}; window.config.media={};
				this.init2();
            });
            if (isMobile) this._searchMobile = autosearch;
            else this._searchDesktop = autosearch;
        };
        const startAutosearch = () => {
            if (searchConfig.lunrSegmentitURL && !document.getElementById('lunr-segmentit')) {
                const script = document.createElement('script');
                script.id = 'lunr-segmentit';
                script.type = 'text/javascript';
                script.src = searchConfig.lunrSegmentitURL;
                script.async = true;
                if (script.readyState) {
                    script.onreadystatechange = () => {
                        if (script.readyState == 'loaded' || script.readyState == 'complete'){
                            script.onreadystatechange = null;
                            initAutosearch();
                        }
                    };
                } else {
                    script.onload = () => {
                        initAutosearch();
                    };
                }
                document.body.appendChild(script);
            } else initAutosearch();
        };
        // 搜索依赖（autocomplete / algoliasearch）由 ensureSearchLibraries() 在用户交互时触发。
    }

    initDetails() {
        this.util.forEach(document.getElementsByClassName('details'), $details => {
            const $summary = $details.getElementsByClassName('details-summary')[0];
            $summary.addEventListener('click', () => {
                $details.classList.toggle('open');
            }, false);
        });
    }

    initLightGallery() {
        if (!this.config.lightGallery) { return; }
        const $content = document.getElementById('content');
        if (!$content || !$content.querySelector('.lightgallery')) { return; }
        loadDeferred('lightgallery').then(() => {
            const $target = document.getElementById('content');
            if ($target && $target.querySelector('.lightgallery') && typeof lightGallery === 'function') {
                lightGallery($target, this.config.lightGallery);
            }
        });
    }

    initHighlight() {
        this.util.forEach(document.querySelectorAll('.highlight > pre.chroma'), $preChroma => {
            const $chroma = document.createElement('div');
            $chroma.className = $preChroma.className;
            const $table = document.createElement('table');
            $chroma.appendChild($table);
            const $tbody = document.createElement('tbody');
            $table.appendChild($tbody);
            const $tr = document.createElement('tr');
            $tbody.appendChild($tr);
            const $td = document.createElement('td');
            $tr.appendChild($td);
            $preChroma.parentElement.replaceChild($chroma, $preChroma);
            $td.appendChild($preChroma);
        });
        this.util.forEach(document.querySelectorAll('.highlight > .chroma'), $chroma => {
            const $codeElements = $chroma.querySelectorAll('pre.chroma > code');
            if ($codeElements.length) {
                const $code = $codeElements[$codeElements.length - 1];
                const $header = document.createElement('div');
                $header.className = 'code-header ' + $code.className.toLowerCase();
                const $title = document.createElement('span');
                $title.classList.add('code-title');
                $title.insertAdjacentHTML('afterbegin', '<i class="arrow fas fa-chevron-right fa-fw"></i>');
                $title.addEventListener('click', () => {
                    $chroma.classList.toggle('open');
                }, false);
                $header.appendChild($title);
                const $ellipses = document.createElement('span');
                $ellipses.insertAdjacentHTML('afterbegin', '<i class="fas fa-ellipsis-h fa-fw"></i>');
                $ellipses.classList.add('ellipses');
                $ellipses.addEventListener('click', () => {
                    $chroma.classList.add('open');
                }, false);
                $header.appendChild($ellipses);
                const $copy = document.createElement('span');
                $copy.insertAdjacentHTML('afterbegin', '<i class="far fa-copy fa-fw"></i>');
                $copy.classList.add('copy');
                const code = $code.innerText;
                if (this.config.code.maxShownLines < 0 || code.split('\n').length < this.config.code.maxShownLines + 2) $chroma.classList.add('open');
                if (this.config.code.copyTitle) {
                    $copy.setAttribute('data-clipboard-text', code);
                    $copy.title = this.config.code.copyTitle;
                    const clipboard = new ClipboardJS($copy);
                    clipboard.on('success', _e => {
                        this.util.animateCSS($code, 'flash');
                    });
                    $header.appendChild($copy);
                }
                $chroma.insertBefore($header, $chroma.firstChild);
            }
        });
    }

    initTable() {
        this.util.forEach(document.querySelectorAll('.content table'), $table => {
            const $wrapper = document.createElement('div');
            $wrapper.className = 'table-wrapper';
            $table.parentElement.replaceChild($wrapper, $table);
            $wrapper.appendChild($table);
        });
    }

    initHeaderLink() {
        for (let num = 1; num <= 6; num++) {
            this.util.forEach(document.querySelectorAll('.single .content > h' + num), $header => {
                $header.classList.add('headerLink');
				$header.innerHTML = `<a href="#${$header.id}" class="header-mark"></a>${$header.innerText}`;
            });
        }
    }

    initToc() {
        const $tocCore = document.getElementById('TableOfContents');
        if ($tocCore === null) return;
        if (document.getElementById('toc-static').getAttribute('kept') || this.util.isTocStatic()) {
            const $tocContentStatic = document.getElementById('toc-content-static');
            if ($tocCore.parentElement !== $tocContentStatic) {
                $tocCore.parentElement.removeChild($tocCore);
                $tocContentStatic.appendChild($tocCore);
            }
            if (this._tocOnScroll) this.scrollEventSet.delete(this._tocOnScroll);
        } else {
            const $tocContentAuto = document.getElementById('toc-content-auto');
            if ($tocCore.parentElement !== $tocContentAuto) {
                $tocCore.parentElement.removeChild($tocCore);
                $tocContentAuto.appendChild($tocCore);
            }
            const $toc = document.getElementById('toc-auto');
            const $page = document.getElementsByClassName('page')[0];
            const rect = $page.getBoundingClientRect();
            $toc.style.left = `${rect.left + rect.width + 20}px`;
            $toc.style.maxWidth = `${$page.getBoundingClientRect().left - 20}px`;
            $toc.style.visibility = 'visible';
            const $tocLinkElements = $tocCore.querySelectorAll('a:first-child');
            const $tocLiElements = $tocCore.getElementsByTagName('li');
            const $headerLinkElements = document.getElementsByClassName('headerLink');
            const headerIsFixed = document.body.getAttribute('header-desktop') !== 'normal';
            const headerHeight = document.getElementById('header-desktop').offsetHeight;
            const TOP_SPACING = 20 + (headerIsFixed ? headerHeight : 0);
            const minTocTop = $toc.offsetTop;
            const minScrollTop = minTocTop - TOP_SPACING + (headerIsFixed ? 0 : headerHeight);
            this._tocOnScroll = this._tocOnScroll || (() => {
                const footerTop = document.getElementById('post-footer').offsetTop;
                const maxTocTop = footerTop - $toc.getBoundingClientRect().height;
                const maxScrollTop = maxTocTop - TOP_SPACING + (headerIsFixed ? 0 : headerHeight);
                if (this.newScrollTop < minScrollTop) {
                    $toc.style.position = 'absolute';
                    $toc.style.top = `${minTocTop}px`;
                } else if (this.newScrollTop > maxScrollTop) {
                    $toc.style.position = 'absolute';
                    $toc.style.top = `${maxTocTop}px`;
                } else {
                    $toc.style.position = 'fixed';
                    $toc.style.top = `${TOP_SPACING}px`;
                }

                this.util.forEach($tocLinkElements, $tocLink => { $tocLink.classList.remove('active'); });
                this.util.forEach($tocLiElements, $tocLi => { $tocLi.classList.remove('has-active'); });
                const INDEX_SPACING = 20 + (headerIsFixed ? headerHeight : 0);
                let activeTocIndex = $headerLinkElements.length - 1;
                for (let i = 0; i < $headerLinkElements.length - 1; i++) {
                    const thisTop = $headerLinkElements[i].getBoundingClientRect().top;
                    const nextTop = $headerLinkElements[i + 1].getBoundingClientRect().top;
                    if ((i == 0 && thisTop > INDEX_SPACING)
                     || (thisTop <= INDEX_SPACING && nextTop > INDEX_SPACING)) {
                        activeTocIndex = i;
                        break;
                    }
                }
                if (activeTocIndex !== -1) {
                    $tocLinkElements[activeTocIndex].classList.add('active');
                    let $parent = $tocLinkElements[activeTocIndex].parentElement;
                    while ($parent !== $tocCore) {
                        $parent.classList.add('has-active');
                        $parent = $parent.parentElement.parentElement;
                    }
                }
            });
            this._tocOnScroll();
            this.scrollEventSet.add(this._tocOnScroll);
        }
    }

    initMath() {
        if (!this.config.math) { return Promise.resolve(); }
        // 力扣等页面的公式是正文里裸写的 $$...$$ / $...$，没有 .math 类名，
        // 必须按定界符检测，否则 KaTeX 不会加载、公式不渲染。
        const bodyText = document.body.innerText || document.body.textContent || '';
        const hasMath = document.querySelector('.katex, .math, [class*=math]') ||
            /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|\$[^$\n]+\$/.test(bodyText);
        if (!hasMath) { return Promise.resolve(); }
        const self = this;
        return loadDeferred('math').then(() => {
            if (typeof renderMathInElement === 'function') {
                renderMathInElement(document.body, self.config.math);
            }
        });
    }

    initSmoothScroll() {
        if (SmoothScroll) new SmoothScroll('[href^="#"]', { speed: 300, speedAsDuration: true, header: '#header-desktop' });
    }

    initCookieconsent() {
        if (this.config.cookieconsent) cookieconsent.initialise(this.config.cookieconsent);
    }

    switchMedia($media, $link, curData, type){
        if ($link) {
            $link.href = curData[2];
            $link.target = '_blank';
            $link.title = curData[1];
            $link.innerText = '跳转原网站 ↗';
        }
        $media.removeChild($media.lastElementChild);
        var embedUrl = curData[0], linkUrl = curData[2], kind = curData[3];
        var player = ``;
        if (type === 'music') {
            player = `<meting-js auto="${linkUrl}" list-max-height="263px" order="random"></meting-js>`;
        } else if (kind === 'bili') {
            // 标准播放器 + 防跳转 sandbox；原网站链接统一放在控制行。
            player = `<div class="bilibili"><iframe src="${embedUrl}" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe></div>`;
        } else {
            // 非 B 站链接（如 keke）没有 iframe，提示用控制行的原网站链接观看。
            player = `<div class="media-link-tip">本站不内嵌该站点，请点击上方链接观看。</div>`;
        }
        $media.insertAdjacentHTML('beforeEnd', player);
    }

    initTagFilter() {
        this.util.forEach(document.getElementsByClassName('tag-filter'), $filter => {
            if (tagFilterReady.has($filter)) { return; }
            tagFilterReady.add($filter);
            // pjax 返回时缓存 DOM 里可能残留旧的 combo（原生 select 被隐藏、插入了 input+panel），
            // 先移除它们、恢复原生 select，避免重复插入导致筛选失效。
            Array.from($filter.querySelectorAll('.tf-combo')).forEach($wrap => {
                const $sel = $wrap.parentNode.querySelector('select');
                if ($sel) {
                    $sel.style.display = '';
                    $sel.classList.add('tag-filter-select');
                    $wrap.parentNode.insertBefore($sel, $wrap);
                }
                $wrap.parentNode.removeChild($wrap);
            });
            const $items = Array.from($filter.querySelectorAll('.tag-filter-item'));
            const $groups = Array.from($filter.querySelectorAll('.tag-filter-group'));
            const $select = $filter.querySelector('.tag-filter-select');
            const $selected = $filter.querySelector('.tag-filter-selected');
            const $mode = $filter.querySelector('.tag-filter-mode');
            const $year = $filter.querySelector('.tag-filter-year');
            const $clear = $filter.querySelector('.tag-filter-clear');
            const $count = $filter.querySelector('.tag-filter-count');
            const $pager = $filter.querySelector('.tag-filter-pager');
            const $selectedBox = $filter.querySelector('.tag-filter-selected');
            // 清除 pjax 缓存 DOM 里残留的已选 chip（selected 状态是全新的）
            if ($selectedBox) {
                while ($selectedBox.firstChild) { $selectedBox.removeChild($selectedBox.firstChild); }
            }
            const perPage = parseInt($filter.getAttribute('data-paginate') || '0', 10) || 0;

            // 为标签下拉提供“输入即过滤”体验：外观沿用原生 select，原生 select 隐藏作数据源
            const makeSearchable = ($select) => {
                if (!$select || !$select.options || !$select.parentNode) { return null; }
                const entries = Array.from($select.options).map($o => ({
                    value: $o.value, text: $o.textContent, $option: $o
                }));
                const $wrap = document.createElement('div');
                $wrap.className = 'tf-combo';
                const $input = document.createElement('input');
                $input.type = 'text';
                $input.className = 'tf-combo-input tag-filter-select';
                $input.autocomplete = 'off';
                $input.placeholder = ($select.options[0] && $select.options[0].textContent) || '选择标签…';
                if ($select.getAttribute('aria-label')) {
                    $input.setAttribute('aria-label', $select.getAttribute('aria-label'));
                }
                const $panel = document.createElement('div');
                $panel.className = 'tf-combo-panel';
                $wrap.appendChild($input);
                $wrap.appendChild($panel);
                $select.parentNode.insertBefore($wrap, $select);
                $select.style.display = 'none';

                let isOpen = false;
                const selectedText = () => {
                    const v = $select.value;
                    const hit = entries.filter(e => e.value === v)[0];
                    return v && hit ? hit.text : '';
                };
                const fireChange = () => {
                    const evt = document.createEvent('HTMLEvents');
                    evt.initEvent('change', true, true);
                    $select.dispatchEvent(evt);
                };
                const render = () => {
                    const kw = ($input.value || '').trim().toLowerCase();
                    // 空值占位项（选择标签…）不在面板显示，仅作输入框 placeholder
                    const list = entries.filter(e => e.value && e.text.toLowerCase().indexOf(kw) > -1);
                    while ($panel.firstChild) { $panel.removeChild($panel.firstChild); }
                    list.forEach(e => {
                        const $item = document.createElement('div');
                        $item.className = 'tf-combo-option' + (e.$option.disabled ? ' disabled' : '');
                        $item.textContent = e.text;
                        $item.addEventListener('mousedown', ev => {
                            if (ev && ev.preventDefault) { ev.preventDefault(); }
                            if (e.$option.disabled) { return; }
                            $select.value = e.value;
                            fireChange();
                            closePanel();
                        }, false);
                        $panel.appendChild($item);
                    });
                    if (!$panel.firstChild) {
                        const $none = document.createElement('div');
                        $none.className = 'tf-combo-none';
                        $none.textContent = '无匹配项';
                        $panel.appendChild($none);
                    }
                };
                let blurTimer = null;
                const openPanel = () => {
                    if (blurTimer) { clearTimeout(blurTimer); blurTimer = null; }
                    isOpen = true;
                    $panel.style.display = 'block';
                    $input.value = '';
                    render();
                };
                const closePanel = () => {
                    if (blurTimer) { clearTimeout(blurTimer); blurTimer = null; }
                    isOpen = false;
                    $panel.style.display = 'none';
                    $input.value = selectedText();
                };
                $input.addEventListener('focus', openPanel, false);
                // 选中某项后面板关闭但输入框仍聚焦，此时再点输入框不会触发 focus，
                // 需显式重新打开面板，才能连续选多个标签而无需先点外面失焦。
                $input.addEventListener('click', () => {
                    if (!isOpen) { openPanel(); }
                }, false);
                $input.addEventListener('input', () => {
                    if (!isOpen) { isOpen = true; $panel.style.display = 'block'; }
                    render();
                }, false);
                $input.addEventListener('blur', () => {
                    blurTimer = setTimeout(closePanel, 150);
                }, false);
                $input.addEventListener('keydown', ev => {
                    if (ev.key === 'Escape') { closePanel(); $input.blur(); }
                    else if (ev.key === 'Enter') {
                        const kw = ($input.value || '').trim().toLowerCase();
                        const hit = entries.filter(e => e.value && !e.$option.disabled
                            && e.text.toLowerCase().indexOf(kw) > -1)[0];
                        if (hit) {
                            $select.value = hit.value;
                            fireChange();
                            closePanel();
                        }
                    }
                }, false);
                // 绑定到组件容器而非 document：pjax 往返后旧容器被回收，监听器不会累积
                $filter.addEventListener('click', ev => {
                    if (isOpen && $wrap && !$wrap.contains(ev.target)) { closePanel(); }
                }, false);
                return {
                    sync() {
                        if (isOpen) { render(); }
                        else { $input.value = selectedText(); }
                    }
                };
            };
            const $tagCombo = makeSearchable($select);

            const selected = [];
            let page = 1;

            // 标签列表点击 = 下拉框选一个标签，复用同一套筛选状态
            const $cloudButtons = [];
            this.util.forEach(document.getElementsByClassName('tag-cloud-tag'), $button => {
                if ($button.getAttribute && $button.getAttribute('data-tag')) { $cloudButtons.push($button); }
            });
            const syncTagCloud = () => {
                $cloudButtons.forEach($button => {
                    const active = selected.indexOf($button.getAttribute('data-tag')) > -1;
                    if ($button.classList) { $button.classList.toggle('active', active); }
                });
            };

            const renderPager = totalPages => {
                if (!$pager) { return; }
                while ($pager.firstChild) { $pager.removeChild($pager.firstChild); }
                if (totalPages <= 1) { return; }
                const $ul = document.createElement('ul');
                $ul.className = 'pagination';
                let ellipsed = false;
                for (let p = 1; p <= totalPages; p++) {
                    const show = p === 1 || p === totalPages || Math.abs(p - page) < 3;
                    if (!show) {
                        if (!ellipsed) {
                            const $li = document.createElement('li');
                            $li.className = 'page-item';
                            const $span = document.createElement('span');
                            $span.className = 'page-link';
                            $span.textContent = '…';
                            $li.appendChild($span);
                            $ul.appendChild($li);
                            ellipsed = true;
                        }
                        continue;
                    }
                    ellipsed = false;
                    const $li = document.createElement('li');
                    $li.className = 'page-item' + (p === page ? ' active' : '');
                    const $span = document.createElement('span');
                    $span.className = 'page-link';
                    const $link = document.createElement('a');
                    $link.href = '#';
                    $link.textContent = String(p);
                    $link.addEventListener('click', event => {
                        if (event && event.preventDefault) { event.preventDefault(); }
                        page = p;
                        apply();
                    }, false);
                    $span.appendChild($link);
                    $li.appendChild($span);
                    $ul.appendChild($li);
                }
                $pager.appendChild($ul);
            };

            const apply = () => {
                const isAny = $mode && $mode.value === 'any';
                const year = $year && $year.value ? $year.value : '';
                const matched = [];
                $items.forEach($item => {
                    if (year && $item.getAttribute('data-year') !== year) { return; }
                    const tags = ($item.getAttribute('data-tags') || '').split('|').filter(Boolean);
                    const match = selected.length === 0 || (isAny
                        ? selected.some(tag => tags.indexOf(tag) > -1)
                        : selected.every(tag => tags.indexOf(tag) > -1));
                    if (match) { matched.push($item); }
                });
                const totalPages = perPage ? Math.max(1, Math.ceil(matched.length / perPage)) : 1;
                if (page > totalPages) { page = totalPages; }
                const visible = perPage ? matched.slice((page - 1) * perPage, page * perPage) : matched;
                $items.forEach($item => {
                    $item.style.display = visible.indexOf($item) > -1 ? '' : 'none';
                });
                $groups.forEach($group => {
                    const hasVisible = Array.from($group.querySelectorAll('.tag-filter-item'))
                        .some($item => $item.style.display !== 'none');
                    $group.style.display = hasVisible ? '' : 'none';
                });
                if ($count) {
                    $count.textContent = perPage && matched.length > perPage
                        ? `显示 ${(page - 1) * perPage + 1}-${Math.min(page * perPage, matched.length)} / ${matched.length}（共 ${$items.length}）`
                        : `显示 ${matched.length} / ${$items.length}`;
                }
                if ($select && $select.options) {
                    Array.from($select.options).forEach($option => {
                        if ($option.value) { $option.disabled = selected.indexOf($option.value) > -1; }
                    });
                }
                syncTagCloud();
                if ($tagCombo) { $tagCombo.sync(); }
                renderPager(totalPages);
            };

            const removeTag = tag => {
                const index = selected.indexOf(tag);
                if (index < 0) { return; }
                selected.splice(index, 1);
                if ($selected) {
                    Array.from($selected.children).forEach($chip => {
                        if ($chip.getAttribute && $chip.getAttribute('data-tag') === tag) {
                            $selected.removeChild($chip);
                        }
                    });
                }
                page = 1;
                apply();
            };

            const addTag = tag => {
                if (!tag || selected.indexOf(tag) > -1) { return; }
                selected.push(tag);
                page = 1;
                if ($selected) {
                    const $chip = document.createElement('button');
                    $chip.type = 'button';
                    $chip.className = 'tag-filter-chip';
                    $chip.setAttribute('data-tag', tag);
                    $chip.title = '点击移除';
                    $chip.textContent = tag + ' ×';
                    $chip.addEventListener('click', () => { removeTag(tag); }, false);
                    $selected.appendChild($chip);
                }
                if ($select) { $select.value = ''; }
                apply();
            };

            if ($select) {
                $select.addEventListener('change', () => { addTag($select.value); }, false);
            }
            if ($mode) {
                $mode.addEventListener('change', () => { page = 1; apply(); }, false);
            }
            if ($year) {
                $year.addEventListener('change', () => { page = 1; apply(); }, false);
            }
            if ($clear) {
                $clear.addEventListener('click', () => {
                    selected.length = 0;
                    if ($selected) {
                        while ($selected.firstChild) { $selected.removeChild($selected.firstChild); }
                    }
                    if ($select) { $select.value = ''; }
                    if ($year) { $year.value = ''; }
                    page = 1;
                    apply();
                }, false);
            }
            $cloudButtons.forEach($button => {
                $button.addEventListener('click', () => {
                    const tag = $button.getAttribute('data-tag');
                    if (selected.indexOf(tag) > -1) { removeTag(tag); }
                    else { addTag(tag); }
                }, false);
            });
            this.util.forEach(document.getElementsByClassName('tag-cloud-more'), $more => {
                if (tagCloudMoreReady.has($more)) { return; }
                tagCloudMoreReady.add($more);
                $more.addEventListener('click', () => {
                    const $parent = $more.parentNode || $more.parentElement;
                    const $extra = $parent && $parent.querySelector
                        ? $parent.querySelector('.tag-cloud-extra') : null;
                    if (!$extra || typeof $extra.hidden === 'undefined') { return; }
                    $extra.hidden = !$extra.hidden;
                    $more.textContent = $extra.hidden ? '…' : '收起';
                }, false);
            });
            // 详情页的标签链接指向 /anime/?tag=xxx 这类筛选视图，
            // 进入页面后按 URL 参数预选标签（pjax 换页同样会走到这里）。
            try {
                if (window.URLSearchParams) {
                    const params = new URLSearchParams(window.location.search);
                    const fromUrl = [];
                    params.getAll('tag').forEach(value => {
                        (value || '').split(',').forEach(tag => {
                            if (tag && fromUrl.indexOf(tag) < 0) { fromUrl.push(tag); }
                        });
                    });
                    fromUrl.forEach(tag => {
                        const valid = !$select || !$select.options
                            || Array.from($select.options).some($option => $option.value === tag);
                        if (valid) { addTag(tag); }
                    });
                }
            } catch (err) { /* 老浏览器不支持时忽略，不影响正常筛选 */ }
            apply();
        });
    }

    initMedia() {
        this.util.forEach(document.getElementsByClassName('media'), $media => {
			const data = this.config.media[$media.id];
			if (!data || !data.length) { return; }
			// 末项是「今日选中序号」，不要 pop 掉原始数据：pjax 返回时 config.media
			// 未必会被重置，重复 pop 会让后续初始化读到错误的数据。
			const items = data.slice(0, -1);
			const len = items.length;
			if (!len) { return; }
			let cur = data[len][0] % len;
			const type = $media.getAttribute('type');
			const $playlist = $media.querySelector('.media-playlist');
			const $link = $media.querySelector('.media-source-link');
            let $btn2 = $media.querySelector('.media-next');
            let $btn1 = $media.querySelector('.media-prev');
            // pjax 往返会还原/克隆 DOM：旧监听器可能残留、也可能已经丢失。
            // 克隆按钮再绑定，保证上一条/下一条始终只有一份且必然有效。
            if ($btn1) { const $fresh = $btn1.cloneNode(true); $btn1.replaceWith($fresh); $btn1 = $fresh; }
            if ($btn2) { const $fresh = $btn2.cloneNode(true); $btn2.replaceWith($fresh); $btn2 = $fresh; }
            let $select = null;

            // 统一切换入口：切换播放器、更新链接、同步下拉框选中项
            const select = (index) => {
                cur = ((index % len) + len) % len;
                this.switchMedia($media, $link, items[cur], type);
                if ($select) { $select.value = String(cur); }
            };

            // 构建下拉选择框：紧凑、选中即播放
            if ($playlist && len >= 1) {
                // 兼容修复前已经残留的重复下拉框，保证始终只有一个
                const $oldSelect = $playlist.querySelector('.media-playlist-select');
                if ($oldSelect) { $oldSelect.remove(); }
                $select = document.createElement('select');
                $select.className = 'media-playlist-select';
                for (let i = 0; i < len; i++) {
                    const $opt = document.createElement('option');
                    $opt.value = String(i);
                    $opt.textContent = items[i][1] || ('#' + (i + 1));
                    $select.appendChild($opt);
                }
                $select.addEventListener('change', () => {
                    select(parseInt($select.value, 10));
                }, false);
                $playlist.appendChild($select);
            }

            select(cur);
            if ($btn1) {
                $btn1.addEventListener('click', () => { select(cur - 1); }, false);
            }
            if ($btn2) {
                $btn2.addEventListener('click', () => { select(cur + 1); }, false);
            }
        });
    }
	
	initSlider() {
		if (!document.querySelector('.flexslider')) { return; }
		loadDeferred('flexslider').then(() => {
			const $sliders = $('.flexslider');
			if (!$sliders.length || !$.fn.flexslider) { return; }
			$sliders.flexslider({
				animation: "slide",
				// flexslider 切换时手动触发 lazysizes 加载当前帧的角色图，避免轮播到懒加载图片时空白
				before: function (slider) {
					const $cur = slider.slides.eq(slider.currentSlide).find('img.lazyload');
					if ($cur.length && window.lazySizes) {
						window.lazySizes.loader.unveil($cur[0]);
					}
				}
			});
		});
	}

	initBangumiStyle() {
		if (document.querySelector('.ab_bangumiItem, #ab_bangumi_content')) {
			loadDeferred('abbangumi');
		}
	}

    onScroll() {
        if (globalEventsBound.scroll) { return; }
        globalEventsBound.scroll = true;
        const ACCURACY = 20, MINIMUM = 100;
        window.addEventListener('scroll', () => {
            const self = currentTheme;
            if (!self) { return; }
            // 每次重新取元素：pjax 会替换 .container，缓存旧节点会导致操作失效。
            const $headers = [];
            if (document.body.getAttribute('header-desktop') === 'auto') $headers.push(document.getElementById('header-desktop'));
            if (document.body.getAttribute('header-mobile') === 'auto') $headers.push(document.getElementById('header-mobile'));
            const $fixedButtons = document.getElementById('fixed-buttons');
            if (!$fixedButtons) { return; }
            self.newScrollTop = self.util.getScrollTop();
            const scroll = self.newScrollTop - self.oldScrollTop;
            const isMobile = self.util.isMobile();
            self.util.forEach($headers, $header => {
                if (!$header) { return; }
                if (scroll > ACCURACY) {
                    $header.classList.remove('fadeInDown');
                    self.util.animateCSS($header, ['fadeOutUp', 'faster'], true);
                } else if (scroll < - ACCURACY) {
                    $header.classList.remove('fadeOutUp');
                    self.util.animateCSS($header, ['fadeInDown', 'faster'], true);
                }
            });
            if (self.newScrollTop > MINIMUM) {
                if (isMobile && scroll > ACCURACY) {
                    $fixedButtons.classList.remove('fadeIn');
                    self.util.animateCSS($fixedButtons, ['fadeOut', 'faster'], true);
                } else if (!isMobile || scroll < - ACCURACY) {
                    $fixedButtons.style.display = 'block';
                    $fixedButtons.classList.remove('fadeOut');
                    self.util.animateCSS($fixedButtons, ['fadeIn', 'faster'], true);
                }
            } else {
                if (!isMobile) {
                    $fixedButtons.classList.remove('fadeIn');
                    self.util.animateCSS($fixedButtons, ['fadeOut', 'faster'], true);
                }
                $fixedButtons.style.display = 'none';
            }
            for (let event of self.scrollEventSet) event();
            self.oldScrollTop = self.newScrollTop;
        }, false);
    }

    onResize() {
        if (globalEventsBound.resize) { return; }
        globalEventsBound.resize = true;
        window.addEventListener('resize', () => {
            const self = currentTheme;
            if (!self || self._resizeTimeout) { return; }
            self._resizeTimeout = window.setTimeout(() => {
                self._resizeTimeout = null;
                for (let event of self.resizeEventSet) event();
                self.initToc();
                self.initSearch();
            }, 100);
        }, false);
    }

    onClickMask() {
        if (globalEventsBound.mask) { return; }
        globalEventsBound.mask = true;
        document.getElementById('mask').addEventListener('click', () => {
            const self = currentTheme;
            if (self) {
                for (let event of self.clickMaskEventSet) event();
            }
            document.body.classList.remove('blur');
        }, false);
    }

    init() {
        try {
			this.initTable();
            this.initSVGIcon();
            this.initTwemoji();
            this.initMenuMobile();
            this.initSwitchTheme();
            this.initSearch();
            this.initDetails();
            this.initLightGallery();
			this.initCookieconsent();
			this.initTagFilter();
			this.initBangumiStyle();
			this.initMedia();
			this.initSlider();
        } catch (err) {
            console.error(err);
        }

        window.setTimeout(() => {
			this.initHighlight();
			this.initMath();
            this.initToc();
			this.initHeaderLink();
            this.onScroll();
            this.onResize();
            this.onClickMask();
			this.initSmoothScroll();
        }, 100);
    }
	
	init2() {
        try {
			this.initTable();
            this.initSVGIcon();
            this.initDetails();
            this.initLightGallery();
            this.initTagFilter();
            this.initBangumiStyle();
            this.initMedia();
			this.initSlider();
        } catch (err) {
            console.error(err);
        }
		window.setTimeout(() => {
			this.initHighlight();
			this.initMath();
            this.initToc();
			this.initHeaderLink();
            this.onScroll();
            this.onResize();
            this.onClickMask();
			this.initSmoothScroll();
        }, 100);
    }
}

$(function(){
	const theme = new Theme();
	theme.init();
})

 /*pjax starts*/
// 回到顶部/评论按钮以及所有 # 锚点都是页内跳转，不能交给 pjax 处理，
// 否则点击「回到顶部」会被当成一次导航：URL 变成 /#top、容器被替换，
// 标签筛选组件随之重建导致点击失效。页内滚动交给主题自带的 SmoothScroll。
$(document).pjax('a[target!=_blank]:not([href^="#"])', '.container', {fragment: '.container',timeout: 8000});
// 不监听 ready：首次加载已由上面的 $(function) 调用 init()，再监听会重复初始化。
$(document).on('pjax:end', function() {const theme = new Theme(); theme.init2();})
$(document).on('pjax:click', function() {if (currentTheme && currentTheme.closeSearch) {currentTheme.closeSearch();} window.config.data = {}; window.config.media={};})
/*pjax ends*/