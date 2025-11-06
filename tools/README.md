# 工具專案資料夾

本資料夾包含所有工具專案。

## 專案列表

### 1. 語音轉文字 (speech-to-text)
- **檔案**: `speech-to-text.html`
- **規格書**: `speech-to-text.md`
- **修改記錄**: `speech-to-text_log.txt`
- **說明**: 基於 Web Speech API 的語音識別工具，支援語音轉文字、AI 順稿、翻譯等功能

### 2. 文字轉語音 (text-to-speech)
- **檔案**: `text-to-speech.html`
- **規格書**: `text-to-speech.md`
- **修改記錄**: `text-to-speech_log.txt`
- **說明**: 基於 Web Speech API 的語音合成工具，可將文字轉換為語音播放

## 使用方式

1. 直接開啟各工具的 HTML 檔案即可使用
2. 查看各工具的 `.md` 檔案了解詳細規格
3. 查看各工具的 `_log.txt` 檔案了解修改歷史

## 技術規格

- **技術**: HTML5, CSS3, JavaScript (ES6)
- **API**: Web Speech API (SpeechRecognition, SpeechSynthesis)
- **依賴**: 無（純前端實現）
- **瀏覽器**: Chrome, Edge（語音識別需要特定瀏覽器支援）

## 注意事項

### 語音轉文字工具
- 需要麥克風權限
- 需要網路連線（語音識別和翻譯需要伺服器）
- 建議在安靜環境中使用
- 僅支援 Chrome 和 Edge 瀏覽器

### 文字轉語音工具
- 不同瀏覽器支援的語音可能不同
- 某些語音可能需要下載
- 語音品質取決於系統和瀏覽器

