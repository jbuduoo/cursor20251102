// AI 框架控制面板應用
class FrameworkControlPanel {
    constructor() {
        this.selectedFramework = null;
        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
    }

    setupElements() {
        this.frameworkCards = document.querySelectorAll('.framework-card');
        this.generateBtn = document.getElementById('generateBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.promptDisplay = document.getElementById('promptDisplay');
        this.toast = document.getElementById('toast');
        
        // 表單元素
        this.headerHeight = document.getElementById('headerHeight');
        this.sidebarRatio = document.getElementById('sidebarRatio');
        this.headerFunction = document.getElementById('headerFunction');
        this.leftSidebarFunction = document.getElementById('leftSidebarFunction');
        this.rightSidebarFunction = document.getElementById('rightSidebarFunction');
        this.websitePurpose = document.getElementById('websitePurpose');
        this.coreStyle = document.getElementById('coreStyle');
        this.headerFunctionDropdown = document.getElementById('headerFunctionDropdown');
        this.leftSidebarFunctionDropdown = document.getElementById('leftSidebarFunctionDropdown');
        this.rightSidebarFunctionDropdown = document.getElementById('rightSidebarFunctionDropdown');
        this.websitePurposeDropdown = document.getElementById('websitePurposeDropdown');
        this.coreStyleDropdown = document.getElementById('coreStyleDropdown');
        this.spacingRadios = document.querySelectorAll('input[name="spacing"]');
        this.leftSidebarGroup = document.getElementById('leftSidebarGroup');
        this.rightSidebarGroup = document.getElementById('rightSidebarGroup');
        this.sidebarRatioHint = document.getElementById('sidebarRatioHint');
    }

    setupEventListeners() {
        // 框架選擇
        this.frameworkCards.forEach(card => {
            card.addEventListener('click', () => {
                this.selectFramework(card);
            });
        });

        // 生成提示詞按鈕
        this.generateBtn.addEventListener('click', () => {
            this.generatePrompt();
        });

        // 複製按鈕
        this.copyBtn.addEventListener('click', () => {
            this.copyPrompt();
        });

        // 下拉選單事件 - 通用處理函數
        const setupDropdown = (dropdown, inputField, separator = '、') => {
            if (dropdown && inputField) {
                dropdown.addEventListener('change', (e) => {
                    if (e.target.value) {
                        const currentValue = inputField.value.trim();
                        if (currentValue) {
                            inputField.value = currentValue + separator + e.target.value;
                        } else {
                            inputField.value = e.target.value;
                        }
                        // 重置下拉選單
                        e.target.value = '';
                    }
                });
            }
        };

        // 設置所有下拉選單
        setupDropdown(this.headerFunctionDropdown, this.headerFunction, '、');
        setupDropdown(this.leftSidebarFunctionDropdown, this.leftSidebarFunction, '、');
        setupDropdown(this.rightSidebarFunctionDropdown, this.rightSidebarFunction, '、');
        setupDropdown(this.websitePurposeDropdown, this.websitePurpose, '、');
        setupDropdown(this.coreStyleDropdown, this.coreStyle, '、');
    }

    selectFramework(card) {
        // 移除所有選中狀態
        this.frameworkCards.forEach(c => c.classList.remove('selected'));
        
        // 添加選中狀態
        card.classList.add('selected');
        this.selectedFramework = card.dataset.framework;
        
        // 根據選擇的框架顯示/隱藏側邊欄功能
        this.updateSidebarVisibility();
        
        // 即時視覺反饋
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }

    updateSidebarVisibility() {
        // 隱藏所有側邊欄功能組
        if (this.leftSidebarGroup) {
            this.leftSidebarGroup.style.display = 'none';
        }
        if (this.rightSidebarGroup) {
            this.rightSidebarGroup.style.display = 'none';
        }

        // 根據選擇的框架顯示對應的側邊欄功能，並更新側邊欄寬度比例
        switch (this.selectedFramework) {
            case 'sidebar-left':
                // 左側邊欄：只显示左侧边栏功能
                if (this.leftSidebarGroup) {
                    this.leftSidebarGroup.style.display = 'block';
                }
                // 更新側邊欄寬度比例為左側邊欄格式
                if (this.sidebarRatio) {
                    this.sidebarRatio.value = '2.5:7.5';
                    this.sidebarRatio.placeholder = '例如：2.5:7.5（左側邊欄:主內容）';
                    this.sidebarRatio.disabled = false;
                }
                if (this.sidebarRatioHint) {
                    this.sidebarRatioHint.textContent = '格式：左側邊欄:主內容（例如：2.5:7.5 或 2:8）';
                }
                break;
            case 'sidebar-right':
                // 右側邊欄：只显示右侧边栏功能
                if (this.rightSidebarGroup) {
                    this.rightSidebarGroup.style.display = 'block';
                }
                // 更新側邊欄寬度比例為右側邊欄格式
                if (this.sidebarRatio) {
                    this.sidebarRatio.value = '7.5:2.5';
                    this.sidebarRatio.placeholder = '例如：7.5:2.5（主內容:右側邊欄）';
                    this.sidebarRatio.disabled = false;
                }
                if (this.sidebarRatioHint) {
                    this.sidebarRatioHint.textContent = '格式：主內容:右側邊欄（例如：7.5:2.5 或 8:2）';
                }
                break;
            case 'three-column':
                // 三欄式：显示左右两侧边栏功能
                if (this.leftSidebarGroup) {
                    this.leftSidebarGroup.style.display = 'block';
                }
                if (this.rightSidebarGroup) {
                    this.rightSidebarGroup.style.display = 'block';
                }
                // 更新側邊欄寬度比例為三欄格式
                if (this.sidebarRatio) {
                    this.sidebarRatio.value = '1.5:7:1.5';
                    this.sidebarRatio.placeholder = '例如：1.5:7:1.5（左:中:右）';
                    this.sidebarRatio.disabled = false;
                }
                if (this.sidebarRatioHint) {
                    this.sidebarRatioHint.textContent = '格式：左側邊欄:主內容:右側邊欄（例如：1.5:7:1.5）';
                }
                break;
            case 'full-width':
                // 全寬式：不显示侧边栏功能
                // 更新側邊欄寬度比例為全寬格式
                if (this.sidebarRatio) {
                    this.sidebarRatio.value = '';
                    this.sidebarRatio.placeholder = '全寬式無側邊欄';
                    this.sidebarRatio.disabled = true;
                }
                if (this.sidebarRatioHint) {
                    this.sidebarRatioHint.textContent = '全寬式佈局無需設定側邊欄寬度比例';
                }
                break;
        }
    }

    getSpacingDescription() {
        const selected = document.querySelector('input[name="spacing"]:checked');
        const spacingMap = {
            'high': '高留白（Moderate to High Whitespace）',
            'moderate': '適中留白（Moderate Whitespace）',
            'compact': '緊湊排版（Compact Layout，最小留白）'
        };
        return spacingMap[selected?.value] || spacingMap['moderate'];
    }

    getFrameworkDescription() {
        const frameworkMap = {
            'sidebar-left': '左側邊欄佈局（Sidebar Left Layout）：側邊欄位於左側，主內容區位於右側',
            'sidebar-right': '右側邊欄佈局（Sidebar Right Layout）：主內容區位於左側，側邊欄位於右側',
            'three-column': '三欄式佈局（Three-Column Layout）：左側邊欄、中間主內容區、右側邊欄',
            'full-width': '全寬式佈局（Full-Width Layout）：單欄全寬設計，無側邊欄'
        };
        return frameworkMap[this.selectedFramework] || '未選擇框架';
    }

    generatePrompt() {
        // 驗證必填項
        if (!this.selectedFramework) {
            this.showToast('請先選擇一個框架', 'error');
            return;
        }

        // 收集所有參數
        const headerHeight = this.headerHeight.value || '10';
        const sidebarRatio = this.sidebarRatio.value || '1.5:7:1.5';
        const headerFunction = this.headerFunction.value.trim();
        const leftSidebarFunction = this.leftSidebarFunction ? this.leftSidebarFunction.value.trim() : '';
        const rightSidebarFunction = this.rightSidebarFunction ? this.rightSidebarFunction.value.trim() : '';
        const websitePurpose = this.websitePurpose.value.trim();
        const coreStyle = this.coreStyle.value.trim();
        const spacing = this.getSpacingDescription();

        // 構建提示詞
        let prompt = `網頁框架設計規格：\n\n`;
        prompt += `【佈局結構】\n`;
        prompt += `- 框架類型：${this.getFrameworkDescription()}\n`;
        prompt += `- 頁頭高度：${headerHeight}%\n`;
        prompt += `- 側邊欄寬度比例：${sidebarRatio}\n\n`;

        if (headerFunction) {
            prompt += `【頁頭功能】\n`;
            prompt += `- 功能項目：${headerFunction}\n\n`;
        }

        // 根據框架類型添加側邊欄功能
        if (this.selectedFramework === 'sidebar-left' && leftSidebarFunction) {
            prompt += `【左側邊欄功能】\n`;
            prompt += `- 功能項目：${leftSidebarFunction}\n\n`;
        } else if (this.selectedFramework === 'sidebar-right' && rightSidebarFunction) {
            prompt += `【右側邊欄功能】\n`;
            prompt += `- 功能項目：${rightSidebarFunction}\n\n`;
        } else if (this.selectedFramework === 'three-column') {
            if (leftSidebarFunction) {
                prompt += `【左側邊欄功能】\n`;
                prompt += `- 功能項目：${leftSidebarFunction}\n\n`;
            }
            if (rightSidebarFunction) {
                prompt += `【右側邊欄功能】\n`;
                prompt += `- 功能項目：${rightSidebarFunction}\n\n`;
            }
        }

        if (websitePurpose) {
            prompt += `【網站用途】\n`;
            prompt += `- 行業/用途：${websitePurpose}\n\n`;
        }

        if (coreStyle) {
            prompt += `【視覺風格】\n`;
            prompt += `- 核心風格：${coreStyle}\n`;
            prompt += `- 整體風格：現代極簡（Modern Minimalist）、功能導向（Functional）、清晰直觀（Clean & Intuitive）\n`;
            prompt += `- 配色方案：主色為淺灰色系（#F8F8F8 背景，#E0E0E0 區塊邊框），輔助色為專業藍色（#007BFF）用於強調按鈕和選中狀態，文字顏色為深灰色（#333333）\n`;
            prompt += `- 字體排版：使用簡潔、易讀的無襯線字體（Sans-serif），例如 Arial、Helvetica Neue 或 Noto Sans。文字大小適中，保持良好的對比度\n`;
            prompt += `- 間距控制：${spacing}\n\n`;
        } else {
            prompt += `【視覺風格】\n`;
            prompt += `- 整體風格：現代極簡（Modern Minimalist）、功能導向（Functional）、清晰直觀（Clean & Intuitive）\n`;
            prompt += `- 配色方案：主色為淺灰色系（#F8F8F8 背景，#E0E0E0 區塊邊框），輔助色為專業藍色（#007BFF）用於強調按鈕和選中狀態，文字顏色為深灰色（#333333）\n`;
            prompt += `- 字體排版：使用簡潔、易讀的無襯線字體（Sans-serif），例如 Arial、Helvetica Neue 或 Noto Sans。文字大小適中，保持良好的對比度\n`;
            prompt += `- 間距控制：${spacing}\n\n`;
        }

        prompt += `【設計要求】\n`;
        prompt += `- 確保各個控制項之間有足夠的呼吸空間，避免擁擠感\n`;
        prompt += `- 所有文字、標籤和說明都必須清晰簡潔\n`;
        prompt += `- 使用者操作後應有即時的視覺反饋\n`;
        prompt += `- 響應式設計：在桌面、平板和手機上都能提供良好的佈局和使用者體驗\n`;

        // 顯示提示詞（可編輯）
        this.promptDisplay.value = prompt;
        this.promptDisplay.classList.remove('prompt-placeholder');
        this.copyBtn.disabled = false;

        // 滾動到提示詞區域頂部
        this.promptDisplay.scrollTop = 0;

        // 視覺反饋
        this.generateBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.generateBtn.style.transform = '';
        }, 150);

        this.showToast('提示詞已生成！', 'success');
    }

    async copyPrompt() {
        // 從 textarea 的 value 獲取內容（用戶可能已編輯）
        const promptText = this.promptDisplay.value || this.promptDisplay.textContent || '';
        
        if (!promptText.trim() || promptText.includes('請在左側設定參數')) {
            this.showToast('沒有可複製的提示詞', 'error');
            return;
        }

        try {
            await navigator.clipboard.writeText(promptText);
            this.showToast('✅ 提示詞已複製到剪貼板！', 'success');
            
            // 按鈕反饋
            this.copyBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.copyBtn.style.transform = '';
            }, 150);
        } catch (error) {
            console.error('複製失敗:', error);
            this.showToast('複製失敗，請手動選擇文字複製', 'error');
        }
    }

    showToast(message, type = 'success') {
        this.toast.textContent = message;
        this.toast.className = `toast ${type}`;
        this.toast.classList.add('show');

        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 3000);
    }
}

// 初始化應用
document.addEventListener('DOMContentLoaded', () => {
    new FrameworkControlPanel();
});

