import styled from 'styled-components'
import { theme } from '../styles/theme'
import { useNavigate } from 'react-router-dom'

const HomeWrapper = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background};
  padding: 80px 48px 120px;
  display: flex;
  justify-content: center;
`

const ResumeContainer = styled.div`
  max-width: 850px;
  width: 100%;
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.card}px;
  padding: 60px;
  box-shadow: ${theme.shadows.card};

  @media (max-width: 767px) {
    padding: 32px 24px;
  }
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 2px solid ${theme.colors.border};
`

const Name = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: 12px;
  letter-spacing: 0.1em;
`

const Title = styled.p`
  font-size: 18px;
  color: ${theme.colors.accent};
  letter-spacing: 0.15em;
  margin-bottom: 20px;
  font-weight: 500;
`

const ContactRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  font-size: 13px;
  color: ${theme.colors.textSecondary};
`

const Section = styled.section`
  margin-bottom: 36px;
`

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.primary};
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${theme.colors.border};
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    width: 4px;
    height: 16px;
    background-color: ${theme.colors.accent};
    border-radius: 2px;
  }
`

const AdvantageItem = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`

const AdvantageTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.textPrimary};
  margin-bottom: 12px;
  padding-left: 12px;
  border-left: 3px solid ${theme.colors.accent};
`

const AdvantageContent = styled.p`
  font-size: 13px;
  color: ${theme.colors.textSecondary};
  line-height: 1.9;
  margin-bottom: 8px;
`

const ExperienceCard = styled.div`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  padding: 20px 24px;
  margin-bottom: 20px;
  border: 1px solid ${theme.colors.border};

  &:last-child {
    margin-bottom: 0;
  }
`

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
  flex-wrap: wrap;
  gap: 8px;
`

const ExperienceTitle = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${theme.colors.primary};
`

const ExperienceDate = styled.span`
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  background-color: ${theme.colors.surface};
  padding: 2px 8px;
  border-radius: 4px;
`

const ExperienceCompany = styled.p`
  font-size: 13px;
  color: ${theme.colors.accent};
  margin-bottom: 12px;
  font-weight: 500;
`

const ExperienceDesc = styled.ul`
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  color: ${theme.colors.textPrimary};
  line-height: 1.8;

  li {
    margin-bottom: 6px;
  }
`

const ProjectCard = styled.div`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  padding: 20px 24px;
  margin-bottom: 20px;
  border: 1px solid ${theme.colors.border};

  &:last-child {
    margin-bottom: 0;
  }
`

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
`

const ProjectTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.primary};
`

const ProjectDate = styled.span`
  font-size: 12px;
  color: ${theme.colors.textSecondary};
`

const ProjectOverview = styled.p`
  font-size: 13px;
  color: ${theme.colors.textSecondary};
  margin-bottom: 12px;
  line-height: 1.7;
`

const ProjectItem = styled.div`
  margin-bottom: 14px;
  padding-left: 16px;
  border-left: 2px solid ${theme.colors.border};

  &:last-child {
    margin-bottom: 0;
  }
`

const ProjectItemTitle = styled.h4`
  font-size: 13px;
  font-weight: 500;
  color: ${theme.colors.textPrimary};
  margin-bottom: 8px;
`

const ProjectItemContent = styled.p`
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  line-height: 1.7;
`

const FooterButton = styled.button`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  padding: 14px 32px;
  background-color: ${theme.colors.accent};
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: ${theme.shadows.card};
  transition: all ${theme.transitions.buttonHover};
  z-index: 100;
  letter-spacing: 0.05em;

  &:hover {
    background-color: #6B8A82;
    box-shadow: ${theme.shadows.cardHover};
    transform: translateX(-50%) translateY(-2px);
  }
`

export function HomePage() {
  const navigate = useNavigate()

  return (
    <HomeWrapper>
      <ResumeContainer>
        <Header>
          <Name>武鑫</Name>
          <Title>AI Agent 开发工程师</Title>
          <ContactRow>
            <span>📧 13169578613@wo.cn</span>
            <span>📱 13169578613</span>
            <span>👤 男</span>
            <span>💼 9年工作经验</span>
            <span>🎯 AI Agent 开发工程师</span>
            <span>📍 深圳</span>
          </ContactRow>
        </Header>

        <Section>
          <SectionTitle>个人优势</SectionTitle>

          <AdvantageItem>
            <AdvantageTitle>1. Agent 架构设计与工程化落地</AdvantageTitle>
            <AdvantageContent>
              <strong>框架精通：</strong>熟练掌握 LangGraph 构建 ReAct Agent 工作流，具备基于 State 状态机的多节点调度设计经验。
            </AdvantageContent>
            <AdvantageContent>
              <strong>幻觉治理：</strong>自研 Tool Calling 强制检索机制，通过系统提示词约束 Agent 必须基于私有知识库回答，确保工业场景下回答的 0 幻觉。
            </AdvantageContent>
            <AdvantageContent>
              <strong>多模态扩展：</strong>具备 LangGraph 子代理（Subgraph）开发经验，对 Plan & Execute 模式有实践认知。
            </AdvantageContent>
            <AdvantageContent>
              <strong>AI 协作流程：</strong>Claude Code / Cursor + 结构化 AI 协作流程（任务分解→AI执行→两阶段审查→验证交付）。
            </AdvantageContent>
          </AdvantageItem>

          <AdvantageItem>
            <AdvantageTitle>2. RAG 系统全栈优化能力</AdvantageTitle>
            <AdvantageContent>
              <strong>检索调优：</strong>熟悉 PGVector 索引选型与 Chunk Overlap 参数调优，将工业文档检索召回率提升至 95%。
            </AdvantageContent>
            <AdvantageContent>
              <strong>生产级架构：</strong>封装 Embedding 工厂模式，实现本地低成本与云端高性能一键切换，兼顾数据安全与推理效果。
            </AdvantageContent>
          </AdvantageItem>

          <AdvantageItem>
            <AdvantageTitle>3. 强大的后端工程与系统集成底座</AdvantageTitle>
            <AdvantageContent>
              <strong>8年 Python 后端：</strong>基于 Django/DRF/FastAPI 的微服务开发经验，确保 Agent 能与 MES、WMS、API 等复杂业务系统无缝集成。
            </AdvantageContent>
            <AdvantageContent>
              <strong>成本与稳定性意识：</strong>具备高并发缓存设计、MQTT 消息可靠性保障经验，能够推动 AI 原型向生产级高可用系统演进。
            </AdvantageContent>
          </AdvantageItem>
        </Section>

        <Section>
          <SectionTitle>工作经历</SectionTitle>

          <ExperienceCard>
            <ExperienceHeader>
              <ExperienceTitle>Python后端 + AI 应用开发</ExperienceTitle>
              <ExperienceDate>2023.06 - 2026.04</ExperienceDate>
            </ExperienceHeader>
            <ExperienceCompany>深圳优奇智能科技有限公司</ExperienceCompany>
            <ExperienceDesc>
              <li>核心职责：在负责核心调度系统后端的同时，主导了 AI 技术在工业 AGV 运维场景的落地探索，完成了从 0 到 1 的 Agent 系统搭建与交付。</li>
            </ExperienceDesc>

            <ProjectItem>
              <ProjectItemTitle>自研 AGV 智能运维助手 —— RAG + ReAct Agent 落地实践</ProjectItemTitle>
              <ProjectItemContent>
                <strong>项目背景：</strong>针对 AGV 现场故障排查依赖纸质/PDF 手册、响应慢的痛点，立项开发智能问答系统。<br/>
                <strong>Agent 架构设计：</strong>基于 LangGraph 构建 ReAct 推理循环，设计意图识别 → 工具检索 → 信息补全 → 结果生成的多节点工作流。<br/>
                <strong>RAG 深度优化：</strong>搭建基于 PGVector 的私有知识库，处理 PDF/MD/TXT 多格式非结构化数据。<br/>
                <strong>反幻觉机制：</strong>在 System Prompt 中设计强制路由逻辑，约束 Agent 必须先调用 retrieve_knowledge 工具，严禁凭空捏造故障码解释，确保回答依据 100% 源于运维手册。<br/>
                <strong>效果数据：</strong>将一线运维获取解决方案的平均耗时从 15分钟缩短至 30秒，系统上线后覆盖 80% 的常见 L1/L2 级别故障咨询。
              </ProjectItemContent>
            </ProjectItem>

            <ProjectItem>
              <ProjectItemTitle>模型服务治理与成本控制</ProjectItemTitle>
              <ProjectItemContent>
                <strong>灵活部署策略：</strong>设计 LLM 工厂模式，支持敏感数据走本地 Ollama 部署，复杂推理走云端 API 的混合架构。<br/>
                <strong>索引优化：</strong>优化 PGVector 索引类型与 Chunk Size 参数，在保证精度的前提下降低 30% 的向量存储开销。
              </ProjectItemContent>
            </ProjectItem>

            <ProjectItem>
              <ProjectItemTitle>Agent 与复杂工业系统的集成</ProjectItemTitle>
              <ProjectItemContent>
                <strong>业务系统对接：</strong>深度熟悉 WMS、MES、旺龙电梯等系统的 API 接口规范。<br/>
                <strong>工具定义：</strong>为 Agent 设计并实现了查询实时 AGV 状态、获取点位占用信息的 Custom Tools，使 Agent 具备了对物理世界调度系统的感知与干预潜力。
              </ProjectItemContent>
            </ProjectItem>
          </ExperienceCard>

          <ExperienceCard>
            <ExperienceHeader>
              <ExperienceTitle>Python后端</ExperienceTitle>
              <ExperienceDate>2020.09 - 2023.05</ExperienceDate>
            </ExperienceHeader>
            <ExperienceCompany>深圳新超能数字信息技术有限公司</ExperienceCompany>
            <ExperienceDesc>
              <li>参与会员与权限系统的设计与开发</li>
              <li>参与优惠券系统的日常迭代与维护，通过 Redis 缓存优化券码校验效率</li>
              <li>编写系统设计文档与接口规范，降低团队协作成本</li>
            </ExperienceDesc>
          </ExperienceCard>

          <ExperienceCard>
            <ExperienceHeader>
              <ExperienceTitle>Python后端</ExperienceTitle>
              <ExperienceDate>2017.03 - 2020.06</ExperienceDate>
            </ExperienceHeader>
            <ExperienceCompany>深圳红璞科技管理有限公司</ExperienceCompany>
            <ExperienceDesc>
              <li>参与公司核心业务系统"红璞公寓管理平台"的后端研发，覆盖房源管理、合同签约、租客管理等模块</li>
              <li>基于 Django + DRF 构建 RESTful API，支撑 Web 端与移动端业务调用</li>
              <li>设计并实现水电燃气自动计费与账单生成系统，支持多城市差异化计费规则</li>
            </ExperienceDesc>
          </ExperienceCard>
        </Section>

        <Section>
          <SectionTitle>项目经历</SectionTitle>

          <ProjectCard>
            <ProjectHeader>
              <ProjectTitle>UPilot 调度系统核心中间件开发与 Agent 集成探索</ProjectTitle>
              <ProjectDate>2024.07 - 2026.04</ProjectDate>
            </ProjectHeader>
            <ProjectOverview>
              调度系统管理着50+台AGV的状态、任务与地图。为了让未来的AI Agent能够自主调度机器人，我负责将底层的复杂工业协议抽象为AI-Friendly的标准化工具接口。
            </ProjectOverview>

            <ProjectItem>
              <ProjectItemTitle>1. 工具化接口设计：将MQTT指令封装为Function Call Schema</ProjectItemTitle>
              <ProjectItemContent>
                痛点：底层MQTT协议包含20+种消息体，且需要处理QoS确认、断线重连、超时重试等复杂逻辑。<br/>
                <strong>设计思路：</strong>将Agent可能需要调用的能力封装为三个核心RESTful API：<br/>
                • get_robot_status(robot_id)：聚合电量、坐标、运行状态<br/>
                • assign_task(robot_id, target_point, task_type)：屏蔽底层MQTT发布细节，返回任务ID<br/>
                • get_point_occupancy(map_id)：查询实时点位互斥状态
              </ProjectItemContent>
            </ProjectItem>

            <ProjectItem>
              <ProjectItemTitle>2. 工业级可靠性的技术攻坚</ProjectItemTitle>
              <ProjectItemContent>
                <strong>MQTT会话保持与消息去重：</strong>确保 Exactly-Once 语义。<br/>
                <strong>分布式点位锁：</strong>利用Redis的SET NX实现地图点位的原子化互斥操作，避免Agent"纸上谈兵"式规划与物理世界碰撞的风险。
              </ProjectItemContent>
            </ProjectItem>

            <ProjectItem>
              <ProjectItemTitle>3. 多系统集成的Adapter模式实践</ProjectItemTitle>
              <ProjectItemContent>
                对接异构系统：在赣州、朗华项目中，深度对接了WMS、MES、旺龙电梯等多种协议，总结出一套Adapter设计模式，可迁移至AI Agent的Tool开发。
              </ProjectItemContent>
            </ProjectItem>
          </ProjectCard>

          <ProjectCard>
            <ProjectHeader>
              <ProjectTitle>AGV 智能运维助手</ProjectTitle>
              <ProjectDate>2025.08 - 2026.01</ProjectDate>
            </ProjectHeader>
            <ProjectOverview>
              工业AGV运维面临三大痛点：知识获取低效、通用大模型幻觉严重、多轮对话上下文丢失。
            </ProjectOverview>

            <ProjectItem>
              <ProjectItemTitle>1. Agent架构设计：从单轮问答到有状态的ReAct循环</ProjectItemTitle>
              <ProjectItemContent>
                技术选型：评估了LangChain的AgentExecutor与LangGraph，最终选择LangGraph（图结构设计：4节点工作流）。<br/>
                通过AgentState维护对话历史与检索上下文Chunk ID，多轮记忆实现通过MemorySaver持久化对话状态。
              </ProjectItemContent>
            </ProjectItem>

            <ProjectItem>
              <ProjectItemTitle>2. 强制Tool Calling机制：工业级反幻觉方案</ProjectItemTitle>
              <ProjectItemContent>
                问题：初版Agent在遇到知识库未覆盖的故障时会"编造"看似合理但错误的排查步骤。<br/>
                <strong>技术实现：</strong>在LangGraph的Tool Node中增加检索结果校验逻辑，若向量相似度低于阈值（0.75），则直接终止推理并返回兜底话术。
              </ProjectItemContent>
            </ProjectItem>

            <ProjectItem>
              <ProjectItemTitle>3. RAG检索策略的针对性调优</ProjectItemTitle>
              <ProjectItemContent>
                <strong>Chunk Size优化：</strong>调整为512 Token，Overlap=50防止故障码ID被切断。<br/>
                <strong>混合检索策略：</strong>叠加PostgreSQL全文检索作为前置过滤器，故障码精确查询准确率达到100%。<br/>
                <strong>多格式文档Pipeline：</strong>支持PDF扫描件OCR预处理、Markdown标题层级解析的ETL脚本。
              </ProjectItemContent>
            </ProjectItem>
          </ProjectCard>

          <ProjectCard>
            <ProjectHeader>
              <ProjectTitle>UPilot 机器人调度系统核心平台</ProjectTitle>
              <ProjectDate>2023.06 - 2026.04</ProjectDate>
            </ProjectHeader>
            <ProjectOverview>
              UPilot 是公司自研的机器人操作系统，调度系统作为其核心组件，负责机器人的状态监控、任务调度、地图管理与交通管制。
            </ProjectOverview>
            <ProjectItem>
              <ProjectItemContent>
                • 设计 MQTT 消息规范（20+ Topic），定义心跳、状态上报、任务下发、告警等消息体<br/>
                • 基于 DRF 开发 10+ 个 RESTful 接口，支撑机器人分组、地图查询、任务下发/取消、状态筛选等业务功能<br/>
                • 实现任务生命周期管理，支持多种子任务类型（导航/等待/顶升/滚筒/充电/旋转货架等）<br/>
                • 开发机器人实时状态采集模块，支持批量查询与多条件筛选<br/>
                • 实现点位占用状态维护与查询接口，为多车调度提供数据基础
              </ProjectItemContent>
            </ProjectItem>
          </ProjectCard>
        </Section>
      </ResumeContainer>

      <FooterButton onClick={() => navigate('/portfolio')}>
        前往我的案例库
      </FooterButton>
    </HomeWrapper>
  )
}
