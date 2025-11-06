# GitHub Pages 設置指南

## 問題診斷

如果您看到 404 錯誤，通常是因為 GitHub Pages 還沒有在倉庫中啟用。請按照以下步驟操作：

## 步驟 1：確認文件已推送

✅ 已完成 - 文件已推送到 GitHub：
- `index.html` ✓
- `.nojekyll` ✓
- `README.md` ✓

## 步驟 2：在 GitHub 上啟用 Pages

### 方法 A：通過網頁界面（推薦）

1. **前往您的倉庫**
   - 打開瀏覽器，訪問：https://github.com/jbuduoo/cursor20251102

2. **進入設置頁面**
   - 點擊倉庫頂部的 **Settings**（設置）標籤
   - 如果看不到 Settings，請確認您有倉庫的管理權限

3. **找到 Pages 設置**
   - 在左側選單中，向下滾動找到 **Pages** 選項
   - 點擊 **Pages**

4. **配置 Pages 源**
   - 在 **Source** 部分，點擊下拉選單
   - 選擇 **Deploy from a branch**
   - 在 **Branch** 下拉選單中：
     - 選擇 **main**（或 **master**，取決於您的默認分支）
     - 選擇資料夾：**/ (root)**
   - 點擊 **Save**（保存）

5. **等待部署**
   - GitHub 會顯示一個綠色提示框，顯示您的網站 URL
   - 通常需要 1-2 分鐘來完成首次部署
   - 您會收到一封電子郵件通知（如果已啟用）

### 方法 B：通過 GitHub Actions（可選）

如果方法 A 不工作，可以創建一個 GitHub Actions 工作流程。

## 步驟 3：驗證部署

1. **檢查部署狀態**
   - 在倉庫頁面，點擊 **Actions** 標籤
   - 您應該看到 "pages build and deployment" 工作流程
   - 如果顯示綠色勾號 ✓，表示部署成功

2. **訪問您的網站**
   - 部署成功後，訪問：https://jbuduoo.github.io/cursor20251102/
   - 如果仍然顯示 404，請等待 5-10 分鐘後再試

## 常見問題排查

### 問題 1：找不到 Settings 選項
- **原因**：您可能沒有倉庫的管理權限
- **解決**：確認您是倉庫的所有者或有管理權限

### 問題 2：部署後仍然 404
- **原因 1**：DNS 傳播需要時間
- **解決**：等待 5-10 分鐘後再試，或清除瀏覽器緩存

- **原因 2**：分支名稱不對
- **解決**：確認您的默認分支是 `main` 還是 `master`，在 Settings > Pages 中選擇正確的分支

- **原因 3**：index.html 不在根目錄
- **解決**：確認 `index.html` 在倉庫的根目錄（不是在任何子資料夾中）

### 問題 3：網站顯示但樣式/功能不正常
- **原因**：路徑問題或缺少 .nojekyll 文件
- **解決**：確認 `.nojekyll` 文件存在於根目錄

## 驗證清單

在啟用 Pages 之前，請確認：

- [ ] `index.html` 存在於倉庫根目錄
- [ ] `.nojekyll` 文件存在於根目錄
- [ ] 所有文件已提交並推送到 GitHub
- [ ] 在 Settings > Pages 中選擇了正確的分支（main）
- [ ] 選擇了 `/ (root)` 作為源資料夾

## 部署後的 URL

部署成功後，您的網站將可通過以下 URL 訪問：

- **主要 URL**: https://jbuduoo.github.io/cursor20251102/
- **自訂域名**（可選）: 可以在 Settings > Pages 中設置自訂域名

## 需要幫助？

如果按照以上步驟操作後仍然遇到問題，請檢查：

1. GitHub Status: https://www.githubstatus.com/
2. GitHub Pages 文檔: https://docs.github.com/en/pages
3. 倉庫的 Actions 標籤，查看是否有錯誤訊息

---

**最後更新**: 2024-11-03

