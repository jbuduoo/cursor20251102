# 專案組織規範

## 📁 原則 1：檔案系統 = 功能實體

### 基本規則
- **每個遊戲一個資料夾**
- **各遊戲之間 JS 及 CSS 不共用**
- **遊戲檔案命名為：`遊戲名.html`**

### 檔案結構範例
```
game/
  ├── snake/
  │   └── snake.html
  ├── tetris/
  │   └── tetris.html
  └── flappybird/
      └── flappybird.html
```

### 特殊情況處理
- **實驗性專案** → 放在 `game/experimental/` 資料夾
- **教學性專案** → 獨立資料夾（如 `game/decision-tree/`）
- **相關遊戲系列** → 分開成獨立資料夾（如 `planefight/` 和 `dadattack/`）

---

## 🏷️ 原則 2：邏輯分類 = 使用者體驗

### 分類方式
- **在 `Home/index.html` 的 JavaScript 中調整分類**
- **不移動檔案系統中的檔案**
- **一個遊戲可以出現在多個分類中**

### 分類位置
- 編輯 `Home/index.html` 中的 `gameCategories` 物件
- 調整分類名稱、圖示、描述等

---

## 🔄 原則 3：開發流程

### 完成新遊戲後
1. ✅ 建立遊戲資料夾：`game/遊戲名/`
2. ✅ 建立遊戲檔案：`game/遊戲名/遊戲名.html`
3. ✅ **更新 `Home/index.html`** 中的連結
4. ✅ 檢查連結是否正確

### 檢查清單
- [ ] 檔案已建立
- [ ] 連結已加入 `Home/index.html`
- [ ] 連結路徑正確
- [ ] 分類正確

---

## 📝 備註

- 保持檔案結構清晰簡單
- 分類靈活可調整
- 維護成本低
- 易於擴展
- 當打git時，請做pull,commit,push等相關動作，確保線上及線下程式一致性。
