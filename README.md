# 專案集合

這是一個包含多個 HTML 遊戲和工具的靜態網站專案。

## 🌐 GitHub Pages 部署

本專案已配置為可在 GitHub Pages 上部署。

### 訪問地址

部署後，網站可通過以下 URL 訪問：
- **主要網站**: https://jbuduoo.github.io/cursor20251102/

### 部署步驟

1. **確保所有檔案已提交到 GitHub**
   ```bash
   git add .
   git commit -m "準備 GitHub Pages 部署"
   git push origin main
   ```

2. **在 GitHub 上啟用 GitHub Pages**
   - 前往倉庫頁面：https://github.com/jbuduoo/cursor20251102
   - 點擊 **Settings**（設置）
   - 在左側選單中找到 **Pages**
   - 在 **Source** 部分選擇 **Deploy from a branch**
   - 選擇分支：**main**
   - 選擇資料夾：**/ (root)**
   - 點擊 **Save**

3. **等待部署完成**
   - GitHub 會在幾分鐘內完成部署
   - 部署完成後，您會收到通知
   - 網站將可通過上述 URL 訪問

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

