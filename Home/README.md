# 專案說明文件

## 專案結構

```
cursor20251103/
├── README.md                    # 專案說明文件（本檔案）
├── readme.txt                   # 開發規則文件
├── index.html                   # 專案儀表板（入口頁面）
├── index.md                     # 儀表板規格書
├── index_log.txt                # 儀表板修改記錄
│
├── game/                        # 遊戲資料夾
│   ├── tictactoe.htm           # 井字遊戲
│   ├── tictactoe.md            # 井字遊戲規格書
│   ├── tictactoe_log.txt       # 井字遊戲修改記錄
│   │
│   ├── snake.html              # 貪食蛇遊戲
│   ├── snake.html.md           # 貪食蛇遊戲規格書
│   ├── snake_log.txt           # 貪食蛇遊戲修改記錄
│   │
│   ├── angrybirds.html         # 憤怒鳥遊戲
│   ├── angrybirds.md           # 憤怒鳥遊戲規格書
│   ├── angrybirds_log.txt      # 憤怒鳥遊戲修改記錄
│   │
│   ├── breakout.html           # 打磚塊遊戲
│   ├── breakout.html.md        # 打磚塊遊戲規格書
│   ├── breakout_log.txt        # 打磚塊遊戲修改記錄
│   │
│   ├── flappybird.html         # Flappy Bird 遊戲
│   ├── flappybird.html.md      # Flappy Bird 遊戲規格書
│   └── flappybird_log.txt      # Flappy Bird 遊戲修改記錄
│
├── tools/                       # 工具資料夾
│   ├── speech-to-text.html    # 語音轉文字工具
│   ├── speech-to-text.md      # 語音轉文字工具規格書
│   ├── speech-to-text_log.txt # 語音轉文字工具修改記錄
│   │
│   ├── text-to-speech.html    # 文字轉語音工具
│   ├── text-to-speech.md      # 文字轉語音工具規格書
│   └── text-to-speech_log.txt # 文字轉語音工具修改記錄
│
└── story/                      # 故事資料夾
    ├── 樂樂.txt
    └── 樂樂大屁股.txt
```

## 開發規則

根據 `readme.txt` 的規則：

1. **每次修改前**：都要查看 `readme.txt` 的內容
2. **對話窗修改**：每次在對話窗修改內容，都要記錄在各程式的 `.md` 檔中
3. **程式修改**：每次修改各程式，均產生在 `xxxx_log.txt` 中，一直往下加內容，包含執行的狀況

## 檔案命名規範

- **遊戲檔案**：`xxxx.html` 或 `xxxx.htm`
- **規格書**：`xxxx.md`（不包含 `.html` 或 `.htm` 副檔名）
- **修改記錄**：`xxxx_log.txt`

## 專案內容

### 遊戲專案（game/）
1. **Tic-Tac-Toe** - 井字遊戲（雙人對戰）
2. **Snake** - 貪食蛇遊戲（經典街機）
3. **Angry Birds** - 憤怒鳥遊戲（物理模擬）
4. **Breakout** - 打磚塊遊戲（超高耐久度系統）
5. **Flappy Bird** - Flappy Bird 遊戲（經典挑戰）

### 工具專案（tools/）
1. **Speech to Text** - 語音轉文字工具
   - 語音識別
   - AI 順稿
   - 語音播放
   - 翻譯功能
   - AI 指令格式化
   - 特殊功能（大猩猩、一直笑、罵髒話）

2. **Text to Speech** - 文字轉語音工具
   - 文字轉語音
   - 語音選擇
   - 參數調整

### 故事專案（story/）
- 樂樂相關故事檔案

## 使用說明

### 快速開始
1. **開啟儀表板**: 直接開啟 `index.html` 即可看到所有專案
2. **瀏覽專案**: 按資料夾分類瀏覽（遊戲、工具、故事）
3. **開啟程式**: 點擊對應的卡片即可開啟程式

### 遊戲
1. 從儀表板點擊遊戲卡片，或直接開啟 HTML 檔案
2. 查看對應的 `.md` 檔案了解遊戲規格
3. 查看對應的 `_log.txt` 檔案了解修改歷史

### 工具
1. 從儀表板點擊工具卡片，或直接開啟 HTML 檔案
2. 需要麥克風權限（語音轉文字）
3. 需要網路連線（語音識別和翻譯）

## 技術規格

- **前端技術**：HTML5, CSS3, JavaScript (ES6)
- **API 使用**：Web Speech API, Translation API
- **瀏覽器支援**：現代瀏覽器（Chrome, Edge, Safari, Firefox）

## 版本資訊

- **專案版本**：1.0
- **最後更新**：2024-11-03
- **作者**：AI Generated

## 注意事項

1. 所有修改都應記錄在對應的 `_log.txt` 檔案中
2. 規格書應及時更新，反映最新功能
3. 遵循開發規則，確保專案結構完整

