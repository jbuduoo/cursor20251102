# AI 框架控制面板 - 完整規格說明書

## 1. 項目概述

### 1.1 項目目標
創建一個互動式網頁工具，讓使用者可以視覺化選擇網頁框架、設定參數和定義風格，最終生成可用於其他 AI 網頁工具的精確設計提示詞。

### 1.2 目標使用者
- 網頁設計師
- 產品經理
- 無程式碼開發者

### 1.3 核心功能
- 視覺化框架選擇（左側邊欄、右側邊欄、三欄式、全寬式）
- 參數設定（頁頭高度、側邊欄寬度比例、功能描述等）
- 動態生成 AI 提示詞
- 可編輯的提示詞顯示區域
- 一鍵複製提示詞功能

---

## 2. HTML 結構規格

### 2.1 基本結構

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI 框架控制面板</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- 頁頭 -->
    <header class="header">...</header>
    
    <!-- 主容器 -->
    <div class="container">
        <!-- 左側：參數設定面板 -->
        <div class="left-panel">...</div>
        
        <!-- 右側：生成的提示詞顯示區 -->
        <div class="right-panel">...</div>
    </div>
    
    <!-- 頁尾 -->
    <footer class="footer">...</footer>
    
    <!-- Toast 提示 -->
    <div class="toast" id="toast">...</div>
    
    <script src="app.js"></script>
</body>
</html>
```

### 2.2 頁頭結構

```html
<header class="header">
    <h1>AI 框架控制面板</h1>
    <p class="subtitle">視覺化選擇框架，生成精確的設計提示詞</p>
</header>
```

### 2.3 左側面板結構

左側面板包含以下表單元素，按順序排列：

1. **頁頭高度** (`#headerHeight`)
   - 類型：`number` input
   - 預設值：`10`
   - 範圍：0-100
   - 後綴顯示：`%`

2. **頁頭功能** (`#headerFunction`)
   - 類型：`textarea` (rows="3")
   - 搭配下拉選單：`#headerFunctionDropdown`
   - 下拉選單選項：首頁、產品、定價、關於我們、聯繫我們、『註冊/登入』按鈕、搜尋、購物車、語言切換、會員中心、服務、支援

3. **選擇框架** (`.framework-grid`)
   - 2x2 網格布局
   - 四個框架卡片：
     - `data-framework="sidebar-left"` - 左側邊欄
     - `data-framework="sidebar-right"` - 右側邊欄
     - `data-framework="three-column"` - 三欄式
     - `data-framework="full-width"` - 全寬式
   - 每個卡片包含：
     - `.framework-preview` - 視覺化預覽
     - `<h3>` - 標題
     - `<p>` - 描述

4. **側邊欄寬度比例** (`#sidebarRatio`)
   - 類型：`text` input
   - 初始值：空
   - 提示文字：`#sidebarRatioHint`

5. **左側邊欄功能** (`#leftSidebarGroup`, 初始隱藏)
   - 類型：`textarea` (rows="3")
   - 搭配下拉選單：`#leftSidebarFunctionDropdown`
   - 下拉選單選項：導航選單、分類列表、標籤雲、最新文章、熱門文章、相關文章推薦、搜尋框、訂閱表單、社交媒體連結、廣告區塊、使用者資訊、快速連結、產品分類、購物車摘要、篩選器、價格範圍

6. **右側邊欄功能** (`#rightSidebarGroup`, 初始隱藏)
   - 類型：`textarea` (rows="3")
   - 搭配下拉選單：`#rightSidebarFunctionDropdown`
   - 選項同左側邊欄功能

7. **網站用途/行業** (`#websitePurpose`)
   - 類型：`text` input
   - 搭配下拉選單：`#websitePurposeDropdown`
   - 下拉選單選項：企業官網、電商平台、部落格、作品集網站、新聞媒體、線上教育、社交平台、金融服務、醫療健康、旅遊觀光、餐飲服務、房地產

8. **核心風格描述** (`#coreStyle`)
   - 類型：`textarea` (rows="4")
   - 搭配下拉選單：`#coreStyleDropdown`
   - 下拉選單選項：現代極簡、專業商務、清新活潑、科技未來、復古懷舊、藝術創意、優雅奢華、自然環保、簡約日系、工業風格、溫馨親和、動感活力

9. **間距控制** (`input[name="spacing"]`)
   - 類型：radio 按鈕組
   - 三個選項（水平排列）：
     - `value="compact"` (預設選中) - 緊湊排版
     - `value="moderate"` - 適中留白
     - `value="high"` - 高留白

10. **生成提示詞按鈕** (`#generateBtn`)
    - 文字：`✨ 生成提示詞`

### 2.4 右側面板結構

```html
<div class="right-panel">
    <section class="prompt-section">
        <div class="prompt-header">
            <h2>生成的 AI 提示詞</h2>
            <button class="btn-copy-small" id="copyBtn" disabled>copy</button>
        </div>
        <textarea class="prompt-display" id="promptDisplay" rows="20" placeholder="請在左側設定參數並點擊「生成提示詞」"></textarea>
    </section>
</div>
```

### 2.5 頁尾結構

```html
<footer class="footer">
    <p>&copy; 2025 AI 框架控制面板. All rights reserved.</p>
</footer>
```

### 2.6 Toast 提示結構

```html
<div class="toast" id="toast">✅ 提示詞已複製到剪貼板！</div>
```

---

## 3. CSS 樣式規格

### 3.1 全局樣式

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Arial', 'Helvetica Neue', 'Noto Sans', sans-serif;
    background-color: #F8F8F8;
    color: #333333;
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
```

### 3.2 頁頭樣式

```css
.header {
    background: white;
    border-bottom: 1px solid #E0E0E0;
    padding: 10px 20px;
    text-align: center;
    height: 10vh;
    min-height: 60px;
    max-height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.header h1 {
    font-size: 22px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 2px;
}

.subtitle {
    font-size: 12px;
    color: #666666;
}
```

### 3.3 主容器樣式

```css
.container {
    display: flex;
    flex: 1;
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
    gap: 20px;
    width: 100%;
}

.left-panel {
    flex: 0 0 50%;
    display: flex;
    flex-direction: column;
    gap: 0;
}

.right-panel {
    flex: 0 0 50%;
    display: flex;
    flex-direction: column;
}
```

### 3.4 設定區和提示詞區樣式

```css
.settings-section,
.prompt-section {
    background: white;
    border: 1px solid #E0E0E0;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.settings-section {
    height: fit-content;
    padding: 18px;
}

.prompt-section {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.settings-section h2,
.prompt-section h2 {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid #E0E0E0;
}

.prompt-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid #E0E0E0;
}

.prompt-header h2 {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
    flex: 1;
}
```

### 3.5 框架卡片樣式

```css
.framework-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 8px;
}

.framework-card {
    border: 2px solid #E0E0E0;
    border-radius: 6px;
    padding: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;
    text-align: center;
}

.framework-card:hover {
    border-color: #007BFF;
    background: #F0F7FF;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.1);
}

.framework-card.selected {
    border-color: #007BFF;
    background: #E7F3FF;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
}

.framework-card h3 {
    font-size: 14px;
    font-weight: 600;
    color: #333333;
    margin: 8px 0 4px;
}

.framework-card p {
    font-size: 12px;
    color: #666666;
    line-height: 1.3;
}
```

### 3.6 框架預覽視覺化

```css
.framework-preview {
    height: 80px;
    display: flex;
    gap: 4px;
    margin-bottom: 8px;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    padding: 6px;
    background: #FAFAFA;
}

.preview-sidebar-left,
.preview-sidebar-right {
    background: #D0D0D0;
    border-radius: 3px;
    flex: 0 0 20%;
}

.preview-main-left,
.preview-main-right,
.preview-main-center {
    background: #007BFF;
    border-radius: 3px;
    flex: 1;
    opacity: 0.7;
}

.preview-full {
    background: #007BFF;
    border-radius: 3px;
    width: 100%;
    height: 100%;
    opacity: 0.7;
}
```

### 3.7 提示詞顯示區樣式

```css
.prompt-display {
    background: #F8F8F8;
    border: 1px solid #E0E0E0;
    border-radius: 6px;
    padding: 20px;
    min-height: 400px;
    flex: 1;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.8;
    color: #333333;
    white-space: pre-wrap;
    word-wrap: break-word;
    margin-bottom: 15px;
    resize: vertical;
    width: 100%;
    box-sizing: border-box;
}

.prompt-display:focus {
    outline: none;
    border-color: #007BFF;
    background: #FFFFFF;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.prompt-display::placeholder {
    color: #999999;
    font-style: italic;
}
```

### 3.8 表單樣式

```css
.form-group {
    margin-bottom: 18px;
}

.settings-section .form-group {
    margin-bottom: 16px;
}

.form-group label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: #333333;
    margin-bottom: 6px;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group textarea {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #E0E0E0;
    border-radius: 5px;
    font-size: 13px;
    font-family: inherit;
    color: #333333;
    transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #007BFF;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.input-with-suffix {
    position: relative;
    display: flex;
    align-items: center;
}

.input-with-suffix input {
    padding-right: 40px;
}

.suffix {
    position: absolute;
    right: 10px;
    color: #666666;
    font-size: 13px;
    pointer-events: none;
}

.input-hint {
    display: block;
    font-size: 12px;
    color: #999999;
    margin-top: 6px;
    line-height: 1.4;
}
```

### 3.9 下拉選單組合樣式

```css
.input-with-dropdown,
.textarea-with-dropdown {
    display: flex;
    gap: 10px;
    align-items: flex-start;
}

.input-with-dropdown input,
.textarea-with-dropdown textarea {
    flex: 1;
    padding: 8px 10px;
}

.dropdown-select {
    flex: 0 0 150px;
    padding: 8px 10px;
    border: 1px solid #E0E0E0;
    border-radius: 5px;
    font-size: 13px;
    font-family: inherit;
    color: #333333;
    background: white;
    cursor: pointer;
    transition: border-color 0.3s;
}

.dropdown-select:focus {
    outline: none;
    border-color: #007BFF;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.dropdown-select:hover {
    border-color: #007BFF;
}
```

### 3.10 單選按鈕組樣式

```css
.radio-group {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.radio-option {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px 15px;
    border: 1px solid #E0E0E0;
    border-radius: 6px;
    transition: all 0.3s;
    flex: 1;
}

.radio-option:hover {
    background: #F8F8F8;
    border-color: #007BFF;
}

.radio-option input[type="radio"] {
    margin-right: 10px;
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #007BFF;
}

.radio-option input[type="radio"]:checked + .radio-label {
    color: #007BFF;
    font-weight: 500;
}

.radio-label {
    font-size: 14px;
    color: #333333;
    cursor: pointer;
}

.radio-option:has(input[type="radio"]:checked) {
    background: #E7F3FF;
    border-color: #007BFF;
}
```

### 3.11 按鈕樣式

```css
.btn-generate,
.btn-copy {
    width: 100%;
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.btn-generate {
    background: #007BFF;
    color: white;
    margin-top: 10px;
}

.btn-generate:hover {
    background: #0056B3;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
}

.btn-generate:active {
    transform: translateY(0);
}

.btn-copy {
    background: #F8F8F8;
    color: #333333;
    border: 1px solid #E0E0E0;
}

.btn-copy:hover:not(:disabled) {
    background: #E0E0E0;
    border-color: #007BFF;
}

.btn-copy:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-copy-small {
    padding: 6px 12px;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    background: #F8F8F8;
    color: #333333;
    white-space: nowrap;
}

.btn-copy-small:hover:not(:disabled) {
    background: #E0E0E0;
    border-color: #007BFF;
    color: #007BFF;
}

.btn-copy-small:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
```

### 3.12 頁尾樣式

```css
.footer {
    background: white;
    border-top: 1px solid #E0E0E0;
    padding: 20px;
    text-align: center;
    color: #666666;
    font-size: 14px;
    margin-top: auto;
}
```

### 3.13 Toast 提示樣式

```css
.toast {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: #333333;
    color: white;
    padding: 14px 24px;
    border-radius: 6px;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: all 0.3s;
    z-index: 1000;
}

.toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
}
```

### 3.14 響應式設計

#### 平板 (max-width: 1024px)
```css
@media (max-width: 1024px) {
    .container {
        flex-direction: column;
    }

    .left-panel,
    .right-panel {
        flex: 1;
    }

    .framework-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

#### 手機 (max-width: 768px)
```css
@media (max-width: 768px) {
    .header h1 {
        font-size: 24px;
    }

    .subtitle {
        font-size: 14px;
    }

    .container {
        padding: 20px 15px;
        gap: 20px;
    }

    .preview-section,
    .settings-section,
    .prompt-section {
        padding: 20px;
    }

    .framework-grid {
        grid-template-columns: 1fr;
        gap: 15px;
    }

    .framework-preview {
        height: 100px;
    }
}
```

#### 小手機 (max-width: 480px)
```css
@media (max-width: 480px) {
    .header {
        padding: 20px 15px;
    }

    .header h1 {
        font-size: 20px;
    }

    .container {
        padding: 15px 10px;
    }

    .preview-section,
    .settings-section,
    .prompt-section {
        padding: 15px;
    }

    .form-group {
        margin-bottom: 20px;
    }
}
```

---

## 4. JavaScript 功能規格

### 4.1 類別結構

使用 ES6 類別 `FrameworkControlPanel`：

```javascript
class FrameworkControlPanel {
    constructor() {
        this.selectedFramework = null;
        this.init();
    }
}
```

### 4.2 初始化方法

#### setupElements()
獲取所有 DOM 元素引用：
- 框架卡片
- 按鈕（生成、複製）
- 表單元素（所有 input、textarea、select）
- Toast 提示元素

#### setupEventListeners()
設置所有事件監聽器：
- 框架卡片點擊事件
- 生成按鈕點擊事件
- 複製按鈕點擊事件
- 下拉選單變更事件（通用處理函數）

### 4.3 下拉選單邏輯

通用下拉選單處理函數：
```javascript
setupDropdown(dropdown, inputField, separator = '、')
```

功能：
- 當下拉選單選擇值時，自動追加到對應的輸入框
- 如果輸入框已有內容，使用分隔符（預設「、」）連接
- 選擇後重置下拉選單為空值

### 4.4 框架選擇邏輯

#### selectFramework(card)
功能：
1. 移除所有框架卡片的選中狀態
2. 添加當前卡片的選中狀態
3. 保存選中的框架類型（`data-framework` 屬性值）
4. 調用 `updateSidebarVisibility()` 更新側邊欄顯示
5. 提供視覺反饋（短暫縮放效果）

#### updateSidebarVisibility()
根據選擇的框架類型動態顯示/隱藏側邊欄功能輸入框，並更新側邊欄寬度比例：

**sidebar-left（左側邊欄）**：
- 顯示：`#leftSidebarGroup`
- 隱藏：`#rightSidebarGroup`
- 側邊欄寬度比例：`2.5:7.5`
- 提示文字：`格式：左側邊欄:主內容（例如：2.5:7.5 或 2:8）`

**sidebar-right（右側邊欄）**：
- 顯示：`#rightSidebarGroup`
- 隱藏：`#leftSidebarGroup`
- 側邊欄寬度比例：`7.5:2.5`
- 提示文字：`格式：主內容:右側邊欄（例如：7.5:2.5 或 8:2）`

**three-column（三欄式）**：
- 顯示：`#leftSidebarGroup` 和 `#rightSidebarGroup`
- 側邊欄寬度比例：`1.5:7:1.5`
- 提示文字：`格式：左側邊欄:主內容:右側邊欄（例如：1.5:7:1.5）`

**full-width（全寬式）**：
- 隱藏：`#leftSidebarGroup` 和 `#rightSidebarGroup`
- 側邊欄寬度比例：清空並禁用輸入框
- 提示文字：`全寬式佈局無需設定側邊欄寬度比例`

### 4.5 提示詞生成邏輯

#### generatePrompt()
功能流程：

1. **驗證**：檢查是否已選擇框架
2. **收集參數**：
   - 頁頭高度（預設：10）
   - 側邊欄寬度比例
   - 頁頭功能
   - 左側邊欄功能（如果可見）
   - 右側邊欄功能（如果可見）
   - 網站用途/行業
   - 核心風格描述
   - 間距控制

3. **構建提示詞**：
   - 標題：`網頁框架設計規格：`
   - 【佈局結構】區塊
   - 【頁頭功能】區塊（如果填寫）
   - 【左側邊欄功能】或【右側邊欄功能】區塊（根據框架類型）
   - 【網站用途】區塊（如果填寫）
   - 【視覺風格】區塊
   - 【設計要求】區塊

4. **顯示提示詞**：
   - 將生成的提示詞寫入 `#promptDisplay` 的 `value` 屬性
   - 啟用複製按鈕
   - 滾動到提示詞區域頂部
   - 顯示成功提示

#### getFrameworkDescription()
返回框架類型的中文和英文描述：
- `sidebar-left`: `左側邊欄佈局（Sidebar Left Layout）：側邊欄位於左側，主內容區位於右側`
- `sidebar-right`: `右側邊欄佈局（Sidebar Right Layout）：主內容區位於左側，側邊欄位於右側`
- `three-column`: `三欄式佈局（Three-Column Layout）：左側邊欄、中間主內容區、右側邊欄`
- `full-width`: `全寬式佈局（Full-Width Layout）：單欄全寬設計，無側邊欄`

#### getSpacingDescription()
返回間距控制的中文描述：
- `compact`: `緊湊排版（Compact Layout，最小留白）`
- `moderate`: `適中留白（Moderate Whitespace）`
- `high`: `高留白（Moderate to High Whitespace）`

### 4.6 複製功能

#### copyPrompt()
功能：
1. 從 `#promptDisplay` 的 `value` 屬性獲取內容（支援用戶編輯後複製）
2. 驗證內容是否存在
3. 使用 `navigator.clipboard.writeText()` 複製到剪貼板
4. 顯示成功提示
5. 提供按鈕視覺反饋

### 4.7 Toast 提示

#### showToast(message, type = 'success')
功能：
1. 設置 Toast 文字內容
2. 添加 `show` class 觸發動畫
3. 3 秒後自動隱藏

### 4.8 應用初始化

```javascript
document.addEventListener('DOMContentLoaded', () => {
    new FrameworkControlPanel();
});
```

---

## 5. 顏色規範

### 5.1 主色調
- 背景色：`#F8F8F8`（淺灰）
- 主色：`#007BFF`（專業藍）
- 文字顏色：`#333333`（深灰）
- 次要文字：`#666666`（中灰）
- 提示文字：`#999999`（淺灰）

### 5.2 邊框顏色
- 預設邊框：`#E0E0E0`（淺灰）
- 聚焦邊框：`#007BFF`（專業藍）

### 5.3 背景顏色
- 白色背景：`white`
- 卡片背景：`white`
- 輸入框背景：`white`
- 輸入框聚焦背景：`#FFFFFF`
- 選中狀態背景：`#E7F3FF`（淺藍）
- 懸停狀態背景：`#F0F7FF`（極淺藍）
- Toast 背景：`#333333`（深灰）

---

## 6. 字體規範

### 6.1 字體族
- 主要字體：`-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Arial', 'Helvetica Neue', 'Noto Sans', sans-serif`
- 等寬字體（提示詞顯示）：`'Courier New', monospace`

### 6.2 字體大小
- 頁頭標題：`22px`
- 頁頭副標題：`12px`
- 區塊標題：`18px`
- 框架卡片標題：`14px`
- 框架卡片描述：`12px`
- 表單標籤：`13px`
- 輸入框文字：`13px`
- 提示文字：`12px`
- 按鈕文字：`15px`（大按鈕）、`12px`（小按鈕）
- 提示詞顯示：`14px`

### 6.3 字體粗細
- 標題：`600`
- 按鈕：`500`
- 選中狀態：`500`
- 正常文字：`400`（預設）

---

## 7. 間距規範

### 7.1 容器間距
- 主容器 padding：`20px`
- 區塊 padding：`20px`（一般）、`18px`（設定區）
- 表單組間距：`18px`（一般）、`16px`（設定區內）

### 7.2 元素間距
- 框架網格間距：`12px`
- 輸入框與標籤間距：`6px`
- 按鈕內部間距：`12px 20px`
- 小按鈕內部間距：`6px 12px`

### 7.3 頁頭高度
- 高度：`10vh`
- 最小高度：`60px`
- 最大高度：`80px`

---

## 8. 交互行為規範

### 8.1 框架選擇
- 點擊框架卡片時：
  - 移除其他卡片的選中狀態
  - 添加當前卡片的選中狀態
  - 觸發側邊欄功能顯示/隱藏邏輯
  - 更新側邊欄寬度比例
  - 提供視覺反饋（短暫縮放）

### 8.2 下拉選單
- 選擇選項後：
  - 自動追加到對應輸入框
  - 使用分隔符連接（預設「、」）
  - 重置下拉選單為空值

### 8.3 生成提示詞
- 點擊生成按鈕時：
  - 驗證必填項（框架選擇）
  - 收集所有表單參數
  - 生成提示詞
  - 顯示在可編輯的 textarea 中
  - 啟用複製按鈕
  - 提供視覺反饋

### 8.4 複製提示詞
- 點擊複製按鈕時：
  - 從 textarea 獲取內容（支援用戶編輯後複製）
  - 複製到剪貼板
  - 顯示 Toast 提示
  - 提供按鈕視覺反饋

### 8.5 提示詞編輯
- 用戶可以在 textarea 中直接編輯生成的提示詞
- 編輯後的內容可以被複製

### 8.6 Toast 提示
- 自動顯示 3 秒後隱藏
- 從底部滑入動畫
- 居中顯示

---

## 9. 響應式設計規範

### 9.1 桌面版（> 1024px）
- 兩欄布局（左 50%，右 50%）
- 框架網格：2x2
- 完整功能顯示

### 9.2 平板版（≤ 1024px）
- 單欄垂直堆疊
- 框架網格：2x2
- 保持所有功能

### 9.3 手機版（≤ 768px）
- 單欄垂直堆疊
- 框架網格：1 欄
- 調整字體大小和間距

### 9.4 小手機版（≤ 480px）
- 進一步縮小間距
- 調整字體大小
- 優化觸控體驗

---

## 10. 提示詞格式規範

生成的提示詞應包含以下結構：

```
網頁框架設計規格：

【佈局結構】
- 框架類型：[框架描述]
- 頁頭高度：[數值]%
- 側邊欄寬度比例：[比例]

【頁頭功能】
- 功能項目：[功能列表]

【左側邊欄功能】（如果適用）
- 功能項目：[功能列表]

【右側邊欄功能】（如果適用）
- 功能項目：[功能列表]

【網站用途】
- 行業/用途：[用途描述]

【視覺風格】
- 核心風格：[風格描述]
- 整體風格：現代極簡（Modern Minimalist）、功能導向（Functional）、清晰直觀（Clean & Intuitive）
- 配色方案：主色為淺灰色系（#F8F8F8 背景，#E0E0E0 區塊邊框），輔助色為專業藍色（#007BFF）用於強調按鈕和選中狀態，文字顏色為深灰色（#333333）
- 字體排版：使用簡潔、易讀的無襯線字體（Sans-serif），例如 Arial、Helvetica Neue 或 Noto Sans。文字大小適中，保持良好的對比度
- 間距控制：[間距描述]

【設計要求】
- 確保各個控制項之間有足夠的呼吸空間，避免擁擠感
- 所有文字、標籤和說明都必須清晰簡潔
- 使用者操作後應有即時的視覺反饋
- 響應式設計：在桌面、平板和手機上都能提供良好的佈局和使用者體驗
```

---

## 11. 文件結構

```
AI框架控制面板/
├── index.html          # 主 HTML 文件
├── style.css           # 樣式文件
├── app.js              # JavaScript 邏輯文件
└── SPEC.md             # 規格說明書（本文件）
```

---

## 12. 實現注意事項

1. **無外部依賴**：所有功能使用原生 JavaScript，無需引入任何庫
2. **瀏覽器兼容性**：支援現代瀏覽器（Chrome、Firefox、Safari、Edge）
3. **可編輯提示詞**：提示詞顯示區域使用 `textarea`，支援用戶編輯
4. **動態顯示邏輯**：側邊欄功能輸入框根據框架選擇動態顯示/隱藏
5. **自動填充邏輯**：選擇框架後自動填充對應的側邊欄寬度比例
6. **視覺反饋**：所有交互操作都有即時的視覺反饋
7. **響應式設計**：完全響應式，適配各種螢幕尺寸

---

## 13. 測試檢查清單

- [ ] 框架選擇功能正常
- [ ] 側邊欄功能根據框架類型正確顯示/隱藏
- [ ] 側邊欄寬度比例根據框架類型自動填充
- [ ] 下拉選單可以追加到輸入框
- [ ] 生成提示詞功能正常
- [ ] 複製功能正常（包括編輯後的內容）
- [ ] Toast 提示正常顯示和隱藏
- [ ] 響應式設計在各尺寸下正常
- [ ] 所有表單驗證正常
- [ ] 視覺反饋正常

---

## 14. 完成標準

當 AI 根據此規格生成的網站滿足以下條件時，視為完成：

1. ✅ HTML 結構完全符合規格
2. ✅ CSS 樣式完全符合規格（顏色、字體、間距、響應式）
3. ✅ JavaScript 功能完全實現（框架選擇、動態顯示、生成提示詞、複製功能）
4. ✅ 所有交互行為符合規範
5. ✅ 響應式設計在各種尺寸下正常運作
6. ✅ 提示詞格式符合規範
7. ✅ 無 JavaScript 錯誤
8. ✅ 視覺效果與規格一致

---

**版本**: 1.0  
**最後更新**: 2025-01-03  
**作者**: AI 框架控制面板開發團隊

