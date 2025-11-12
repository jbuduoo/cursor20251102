"""
醫療診斷決策樹可視化腳本
使用 scikit-learn 訓練決策樹並生成可視化圖像
"""

from sklearn.tree import DecisionTreeClassifier, export_graphviz, plot_tree, export_text
from sklearn.preprocessing import OrdinalEncoder
import matplotlib.pyplot as plt
import matplotlib
import pandas as pd
import os

# 設置中文字體（Windows 系統）
plt.rcParams['font.sans-serif'] = ['Microsoft YaHei', 'SimHei', 'Arial Unicode MS', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False

# 醫療診斷訓練資料
data = [
    ["輕微", "是", "無", "輕微", "輕度感冒"],
    ["輕微", "是", "無", "無", "輕度感冒"],
    ["嚴重", "是", "有", "嚴重", "感冒/需就醫"],
    ["嚴重", "是", "有", "輕微", "感冒/需就醫"],
    ["無", "否", "無", "無", "健康"],
    ["無", "是", "無", "無", "過敏"],
    ["無", "是", "無", "輕微", "過敏"],
    ["輕微", "否", "無", "無", "健康"],
    ["嚴重", "否", "有", "嚴重", "其他狀況/需就醫"],
    ["輕微", "是", "有", "輕微", "感冒/需就醫"],
    ["無", "否", "有", "嚴重", "其他狀況/需就醫"],
    ["輕微", "否", "無", "輕微", "健康"]
]

# 轉換為 DataFrame
df = pd.DataFrame(data, columns=["喉嚨痛", "流鼻水", "發燒", "疲勞感", "診斷"])

# 分離特徵和標籤
X_raw = df[["喉嚨痛", "流鼻水", "發燒", "疲勞感"]].values
y = df["診斷"].values

# 使用 OrdinalEncoder 編碼特徵
encoder = OrdinalEncoder()
X = encoder.fit_transform(X_raw)

# 訓練決策樹模型
clf = DecisionTreeClassifier(criterion="entropy", random_state=42)
clf.fit(X, y)

# 特徵名稱（中文）
feature_names = ["喉嚨痛", "流鼻水", "發燒", "疲勞感"]

# 自定義節點標籤函數（只顯示特徵名稱和類別，不顯示 entropy、samples、value）
def custom_node_label(tree, node_id, feature_names, class_names):
    """自定義節點標籤，只顯示特徵名稱和類別"""
    if tree.children_left[node_id] == tree.children_right[node_id]:  # 葉節點
        # 只顯示類別名稱
        class_idx = tree.value[node_id].argmax()
        return f"{class_names[class_idx]}"
    else:  # 內部節點
        # 只顯示特徵名稱和閾值
        feature_idx = tree.feature[node_id]
        threshold = tree.threshold[node_id]
        return f"{feature_names[feature_idx]}\n<= {threshold:.2f}"

# 方法1: 使用 matplotlib 繪製決策樹
# 調整為 800x600 像素（DPI 100，8x6 英寸）
fig, ax = plt.subplots(figsize=(8, 6))  # 800x600 像素（DPI 100）
plot_tree(
    clf,
    feature_names=feature_names,
    class_names=clf.classes_,
    filled=True,
    rounded=True,
    fontsize=22,  # 增大一倍的字體大小
    impurity=False,  # 不顯示 entropy
    node_ids=False,  # 不顯示節點 ID
    proportion=False,  # 不顯示比例
    precision=2,
    max_depth=None,  # 顯示完整樹
    ax=ax  # 明確指定 axes
)

# 處理所有文本：移除不需要的標籤，替換 True/False，處理 class 標籤和閾值
for text in ax.texts:
    text_str = text.get_text()
    if not text_str or not text_str.strip():  # 跳過空文本
        continue
    
    # 先處理分支標籤（單獨的 True/False）
    text_str_clean = text_str.strip()
    if text_str_clean in ['True', 'False', '是', '否']:
        # 這是分支標籤，刪除它們（設為不可見）
        text.set_visible(False)
        continue
    
    # 不再替換 True/False，因為我們要刪除所有分支標籤
    
    # 判斷是否為葉節點（只包含 class，沒有特徵名稱）
    lines_original = text_str.split('\n')
    has_feature = any('<' in line or '<=' in line for line in lines_original)
    has_class = any('class' in line.lower() for line in lines_original)
    is_leaf = has_class and not has_feature
    
    # 過濾文本行
    filtered_lines = []
    for line in lines_original:
        line_lower = line.lower().strip()
        line_original = line.strip()
        
        # 跳過包含 samples、value、entropy 的行
        if any(keyword in line_lower for keyword in ['samples', 'value', 'entropy']):
            continue
        
        # 處理 class 標籤
        if 'class' in line_lower:
            if is_leaf:
                # 葉節點：移除 "class = " 前綴，只保留診斷結果
                # 例如 "class = 健康" -> "健康"
                if '=' in line_original:
                    diagnosis = line_original.split('=')[-1].strip()
                    # 處理特殊診斷結果：分成兩行
                    if diagnosis == '其他狀況/需就醫':
                        filtered_lines.append('其他狀況')
                        filtered_lines.append('需就醫')
                    elif diagnosis == '感冒/需就醫':
                        filtered_lines.append('感冒')
                        filtered_lines.append('需就醫')
                    else:
                        filtered_lines.append(diagnosis)
                else:
                    filtered_lines.append(line_original)
            else:
                # 內部節點：移除 "class = ..." 這一行
                continue
        elif '<=' in line or '<' in line or '>' in line:
            # 內部節點：只保留特徵名稱，移除閾值
            # 例如 "發燒 <= 0.5" -> "發燒"
            if '<=' in line:
                feature_name = line.split('<=')[0].strip()
                filtered_lines.append(feature_name)
            elif '<' in line:
                feature_name = line.split('<')[0].strip()
                filtered_lines.append(feature_name)
            elif '>' in line:
                feature_name = line.split('>')[0].strip()
                filtered_lines.append(feature_name)
        else:
            # 保留其他行（可能是分支標籤 "是"/"否"）
            if line_original:
                filtered_lines.append(line_original)
    
    # 更新文本內容和字體大小
    if filtered_lines:
        new_text = '\n'.join(filtered_lines)
        text.set_text(new_text)
        text.set_fontsize(22)  # 增大一倍的字體大小
        text.set_weight('bold')  # 加粗文字
        text.set_color('black')  # 確保顏色為黑色
        text.set_visible(True)  # 確保可見

# 刪除所有分支標籤（"是"/"否"）
# plot_tree 會自動生成分支標籤，但我們要刪除它們
all_texts = list(ax.texts)  # 複製列表，避免迭代時修改

for text in all_texts:
    text_str = text.get_text().strip()
    
    # 刪除所有分支標籤（True/False/是/否）
    if text_str.lower() in ['true', 'false', '是', '否']:
        text.set_visible(False)
        continue
    
    # 確保所有可見的文本都有適合的字體大小
    if text.get_visible() and text.get_fontsize() < 20:
        text.set_fontsize(22)
        text.set_weight('bold')

# 不再檢查和添加分支標籤，因為用戶要求刪除所有"是"和"否"標籤

# 最後強制設置所有文本的字體大小，確保沒有遺漏
# 同時刪除所有"是"和"否"標籤
for text in ax.texts:
    text_str = text.get_text().strip()
    # 如果是分支標籤，刪除它們（設為不可見）
    if text_str in ['是', '否', 'True', 'False']:
        text.set_visible(False)
    elif text.get_visible():
        current_size = text.get_fontsize()
        # 如果字體小於20，強制設置為22
        if current_size < 20:
            text.set_fontsize(22)
            text.set_weight('bold')

plt.title("醫療診斷決策樹", fontsize=28, pad=10, fontweight='bold')  # 增大一倍的標題大小
plt.tight_layout(pad=0.8)  # 調整邊距

# 使用絕對路徑確保保存到正確位置
script_dir = os.path.dirname(os.path.abspath(__file__))
output_path = os.path.join(script_dir, "decision_tree_matplotlib.png")
plt.savefig(output_path, dpi=100, bbox_inches='tight', pad_inches=0.15)  # DPI 100，8x6英寸 = 800x600像素
print(f"[OK] 已生成 {output_path}")

# 方法2: 使用 graphviz 導出（如果安裝了 graphviz）
try:
    from sklearn.tree import export_graphviz
    import graphviz
    
    dot_data = export_graphviz(
        clf,
        out_file=None,
        feature_names=feature_names,
        class_names=clf.classes_,
        filled=True,
        rounded=True,
        special_characters=True
    )
    
    graph = graphviz.Source(dot_data)
    graph.render("decision_tree_graphviz", format='png', cleanup=True)
    print("[OK] 已生成 decision_tree_graphviz.png")
except ImportError:
    print("[WARN] graphviz 未安裝，跳過 graphviz 導出")
    print("  如需使用，請執行: pip install graphviz")
    print("  並安裝 graphviz 系統軟體: https://graphviz.org/download/")

# 輸出決策樹的文字表示
print("\n" + "="*60)
print("決策樹文字表示:")
print("="*60)
tree_text = export_text(clf, feature_names=feature_names)
print(tree_text)

# 顯示特徵編碼對應關係
print("\n" + "="*60)
print("特徵編碼對應關係:")
print("="*60)
for i, feature in enumerate(feature_names):
    categories = encoder.categories_[i]
    print(f"\n{feature}:")
    for idx, cat in enumerate(categories):
        print(f"  {cat} -> {idx}")

print("\n[OK] 完成！")

