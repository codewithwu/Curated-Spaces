# Portfolio Showcase — 设计规格

## 1. Concept & Vision

一个极简主义的个人作品集展示工具。页面以网格仪表板形式呈现，每个区域（Section）是一张卡片，内含该分类下的所有作品。整体风格干净利落，让作品本身成为视觉焦点，而非工具本身。

## 2. Design Language

### 色彩
| Token | Hex | 用途 |
|-------|-----|------|
| `primary` | #264653 | 深青色 — 标题、区域卡片边框 |
| `accent` | #2A9D8F | 青绿色 — 按钮、链接、高亮 |
| `highlight` | #E9C46A | 金黄色 — 强调、徽标 |
| `background` | #FAFAFA | 浅灰白 — 页面背景 |
| `surface` | #FFFFFF | 纯白 — 卡片背景 |
| `text-primary` | #1A1A1A | 深色 — 主文字 |
| `text-secondary` | #6B7280 | 灰色 — 次要文字 |
| `border` | #E5E7EB | 边框色 |

### 字体
- 全部使用本地字体：`./fonts/NotoSansSC-Regular.otf`
- 等宽（链接）：`"JetBrains Mono", monospace`

> 通过 @font-face 加载本地 OTF 文件，格式：otf

### 间距系统
- 基础单位：4px
- 页面内边距：24px
- 卡片间距：16px
- 卡片内边距：20px

### 动效
- 卡片悬停：translateY(-2px) + shadow 增强，200ms ease-out
- 模态框：fade-in + scale(0.95→1)，200ms ease-out
- 按钮悬停：背景色加深，150ms ease

## 3. Layout & Structure

### 页面结构
```
┌─────────────────────────────────────┐
│  Header: Logo + 页面标题            │
├─────────────────────────────────────┤
│  区域网格 (Responsive Grid)          │
│  ┌──────────┐  ┌──────────┐       │
│  │ Section A │  │ Section B │       │
│  │ [作品卡片] │  │ [作品卡片] │       │
│  │ [作品卡片] │  │           │       │
│  └──────────┘  └──────────┘       │
├─────────────────────────────────────┤
│  Footer: + 新增区域 按钮             │
└─────────────────────────────────────┘
```

### 响应式断点
- `>= 1024px`: 3 列网格
- `>= 768px`: 2 列网格
- `< 768px`: 1 列网格

## 4. Features & Interactions

### 4.1 区域 (Section) 管理
- **新增区域**：点击底部「+ 新增区域」按钮，弹出模态框，输入区域名称和类型（可选标签）
- **删除区域**：区域卡片右上角有删除按钮，点击后二次确认
- **区域排序**：暂不支持自动排序（后续可扩展拖拽）

### 4.2 作品 (Work) 管理
- **新增作品**：每个区域卡片底部有「+ 添加作品」按钮，点击弹出模态框
- **行内编辑**：作品卡片上的标题、链接、描述可直接点击编辑，编辑完成后点击空白处或按 Enter 保存
- **删除作品**：作品卡片右上角有删除按钮（hover 时显示），点击即删除

### 4.3 数据持久化
- 所有数据存储在 `localStorage`，key 为 `portfolio_data`
- 数据结构为 JSON，格式见下文「数据模型」
- 每次数据变更后自动同步到 localStorage

## 5. Component Inventory

### 5.1 SectionCard
```
状态：
- default: 白底卡片，1px border，8px 圆角
- hover: translateY(-2px)，shadow 增强
- resizing: 拖拽调整大小时，鼠标变为 col-resize / row-resize

交互：
- 每个区域卡片右下角有resize手柄（图标）
- 拖拽可调整卡片宽度和高度
- 最小尺寸：200px x 150px
- 最大尺寸：不超过网格容器
```

### 5.2 WorkItem
```
状态：
- default: 白色背景，左侧 3px accent 色竖条
- hover: 显示删除按钮（右上角 X）
- editing: 标题/链接/描述变为 input/textarea，黄色高亮边框
```

### 5.3 AddModal
```
状态：
- 覆盖层：黑色 50% 透明遮罩
- 模态框：白色背景，12px 圆角，居中显示
- 关闭：点击遮罩或右上角 X
```

### 5.4 FloatingButton (底部新增区域)
```
状态：
- default: accent 色背景，白色文字，圆形，阴影
- hover: 背景色加深
- active: 轻微缩小
```

## 6. Data Model

```typescript
interface Work {
  id: string;           // UUID
  title: string;
  url: string;
  description: string;
}

interface Section {
  id: string;           // UUID
  name: string;         // 区域名称，如"前端项目"
  works: Work[];
  width?: number;       // 卡片宽度 (px)
  height?: number;      // 卡片高度 (px)
}

interface PortfolioData {
  version: 1;
  sections: Section[];
}
```

## 7. Technical Approach

### 技术栈
- **React 18 + Hooks**
- **CSS Modules** 或 **Styled Components**（避免 Tailwind，保持极简）
- **Vite** 作为构建工具

### 项目结构
```
src/
├── components/
│   ├── App.tsx
│   ├── Header.tsx
│   ├── SectionCard.tsx
│   ├── WorkItem.tsx
│   ├── AddSectionModal.tsx
│   ├── AddWorkModal.tsx
│   └── FloatingButton.tsx
├── hooks/
│   ├── useLocalStorage.ts
│   └── usePortfolio.ts
├── types/
│   └── index.ts
├── styles/
│   └── globals.css
└── main.tsx
```

### 关键实现
- `useLocalStorage` hook：封装 localStorage 读写，自动 JSON 序列化
- `usePortfolio` hook：管理所有 section 和 work 的 CRUD 操作
- 组件状态：SectionCard 内部管理展开/折叠状态，Works 列表默认展开
- 编辑状态：WorkItem 内部管理 `isEditing` 状态，切换时使用局部状态，保存时调用父组件回调
