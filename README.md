# 專案集合

這是一個包含多個 HTML 遊戲和工具的靜態網站專案。

## 🌐 GitHub Pages 部署

本專案已配置為可在 GitHub Pages 上部署。

### 訪問地址

部署後，網站可通過以下 URL 訪問：
- **主要網站**: https://jbuduoo.github.io/cursor20251102/

### 部署步驟

#### ✅ 步驟 1：確認文件已準備好（已完成）
- `index.html` 已存在於根目錄 ✓
- `.nojekyll` 文件已創建 ✓
- 所有文件已提交並推送到 GitHub ✓

#### 🔧 步驟 2：在 GitHub 上啟用 Pages（重要！）

**這是解決 404 錯誤的關鍵步驟：**

1. **前往倉庫設置頁面**
   - 打開瀏覽器，訪問：https://github.com/jbuduoo/cursor20251102
   - 點擊倉庫頂部的 **Settings**（設置）標籤
   - ⚠️ 如果看不到 Settings，請確認您有倉庫的管理權限

2. **啟用 GitHub Pages**
   - 在左側選單中，向下滾動找到 **Pages** 選項
   - 點擊 **Pages**

3. **配置發布源**
   - 在 **Source** 部分，點擊下拉選單
   - 選擇 **Deploy from a branch**
   - 在 **Branch** 下拉選單中：
     - 選擇 **main**（確認這是您的默認分支）
     - 選擇資料夾：**/ (root)**
   - 點擊 **Save**（保存）

4. **等待部署**
   - GitHub 會顯示一個綠色提示框，顯示您的網站 URL
   - 通常需要 1-2 分鐘來完成首次部署
   - 您可以在 **Actions** 標籤中查看部署進度

#### ⚠️ 如果仍然看到 404 錯誤

**請檢查以下項目：**

1. **確認 Pages 已啟用**
   - 返回 Settings > Pages
   - 確認顯示 "Your site is live at https://jbuduoo.github.io/cursor20251102/"
   - 如果沒有顯示，請重新執行步驟 2

2. **檢查部署狀態**
   - 點擊倉庫的 **Actions** 標籤
   - 查看是否有 "pages build and deployment" 工作流程
   - 如果顯示紅色 X，點擊查看錯誤訊息

3. **等待 DNS 傳播**
   - 首次部署可能需要 5-10 分鐘
   - 清除瀏覽器緩存後再試
   - 嘗試使用無痕模式訪問

4. **確認文件結構**
   - 確認 `index.html` 在倉庫根目錄（不是子資料夾）
   - 確認 `.nojekyll` 文件存在
   - 確認分支名稱是 `main`（不是 `master`）

**詳細故障排除指南請參考：[GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md)**

### 專案結構

```
cursor20251102/
├── index.html              # 專案儀表板（入口頁面）
├── .nojekyll              # GitHub Pages 配置檔案
├── README.md              # 本檔案
├── 規則.md                # 開發規則
│
├── game/                  # 遊戲專案資料夾
│   ├── tictactoe/        # 井字遊戲
│   ├── snake/            # 貪食蛇
│   ├── angrybirds/       # 憤怒鳥
│   ├── breakout/         # 打磚塊
│   ├── flappybird/       # Flappy Bird
│   └── tetris/           # 俄羅斯方塊
│
├── tools/                 # 工具專案資料夾
│   ├── speech-to-text/   # 語音轉文字
│   └── text-to-speech/   # 文字轉語音
│
└── story/                 # 故事專案資料夾
    ├── 樂樂.txt
    └── 樂樂大屁股.txt
```

## 📋 專案內容

### 遊戲專案（game/）

1. **井字遊戲** - 經典雙人對戰遊戲
2. **貪食蛇** - 控制蛇吃食物成長
3. **憤怒鳥** - 物理模擬彈弓遊戲
4. **打磚塊** - 經典打磚塊遊戲
5. **Flappy Bird** - 控制小鳥飛翔
6. **俄羅斯方塊** - 經典益智遊戲

### 工具專案（tools/）

1. **語音轉文字** - 將語音即時轉換為文字，支援 AI 順稿、翻譯等功能
2. **文字轉語音** - 將文字轉換為語音播放

### 故事專案（story/）

- 樂樂相關故事檔案

## 🚀 本地使用

1. **直接開啟**
   - 在瀏覽器中開啟 `index.html` 即可查看專案儀表板
   - 點擊卡片即可開啟對應的程式

2. **使用本地伺服器（推薦）**
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 使用 Node.js (需要安裝 http-server)
   npx http-server
   ```
   然後在瀏覽器中訪問 `http://localhost:8000`

## 🛠️ 技術規格

- **前端技術**: HTML5, CSS3, JavaScript (ES6)
- **API 使用**: Web Speech API
- **瀏覽器支援**: 現代瀏覽器（Chrome, Edge, Safari, Firefox）

## 📝 開發規則

詳細的開發規則請參考 [規則.md](規則.md)

## 📄 授權

本專案僅供學習和個人使用。

## 🔗 相關連結

- **GitHub 倉庫**: https://github.com/jbuduoo/cursor20251102
- **GitHub Pages**: https://jbuduoo.github.io/cursor20251102/

---

© 2024 專案集合 | 使用 HTML5, CSS3, JavaScript 開發

