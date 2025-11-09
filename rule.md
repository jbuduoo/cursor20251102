從現在開始，您必須為這個專案中的所有遊戲嚴格遵守以下 UI/UX 樣式規格。請將此視為一項**不可協商**的設計準則。

**【UI 標準規格：HTML & CSS】**

**1. 頁面根元素 (Body/HTML) 設置：**
   - 目的：完全消除頁面捲動並設定背景。
   - CSS 屬性：
     - `html, body { height: 100%; width: 100%; margin: 0; padding: 0; }`
     - `body { overflow: hidden; }`
     - 背景顏色/樣式：使用簡潔的純色或線性漸變背景，**不使用背景圖片**。

**2. 容器結構與佈局 (Layout & Structure)：**
   - 目的：移除所有視覺限制元素，並將遊戲內容居中。
   - **移除所有圓角、陰影、邊框或背景色的「卡片容器」**（例如：`.game-card` 或 `.container`）。
   - 使用 Flexbox 佈局將**所有內容**垂直和水平居中。
     - 範例 CSS：`body { display: flex; flex-direction: column; align-items: center; justify-content: center; }`

**3. 畫布/遊戲區 (Canvas/Game Area) 尺寸：**
   - 目的：最大化遊戲畫面，佔用 90% 的視口空間。
   - 畫布元素 (`<canvas>`) 必須響應式：
     - `max-width: 90vw;` (最大寬度為視口寬度的 90%)
     - `max-height: 85vh;` (最大高度為視口高度的 85%)
     - **維持長寬比：** 使用 JavaScript 或 CSS 確保畫布**保持固定的長寬比**（例如 4:3 或 1:1），防止在不同螢幕尺寸下變形。

**4. 資訊顯示區 (Scoreboard/Title) 設置：**
   - 目的：最小化標題和分數佔用空間。
   - 遊戲標題 (`<h1>`) 必須使用**標準或更小的字體大小** (例如 `font-size: 1.2em;`)。
   - 所有得分、生命、關卡等文字資訊必須**緊湊排列**，不佔用垂直空間，並位於畫布**正上方**。

**【Claude 行動要求】**

請立即根據上述規格，為 [**遊戲名稱**] 重新生成完整的 HTML 和 CSS 程式碼。