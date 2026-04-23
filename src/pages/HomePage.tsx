import styled, { keyframes } from 'styled-components'
import { theme } from '../styles/theme'
import { useNavigate } from 'react-router-dom'

const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const HomeWrapper = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background};
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

const ResumeContainer = styled.div`
  max-width: 900px;
  width: 100%;
  background-color: ${theme.colors.surface};
  min-height: 100vh;
  box-shadow: none;
  animation: ${fadeSlideUp} 800ms cubic-bezier(0.4, 0, 0.2, 1) both;
`

const IntroSection = styled.div`
  text-align: center;
  padding: 100px 60px 80px;
  animation: ${fadeSlideUp} 800ms cubic-bezier(0.4, 0, 0.2, 1) both;
  animation-delay: 100ms;
`

const IntroTitle = styled.h1`
  font-size: 48px;
  font-weight: 600;
  color: ${theme.colors.primary};
  margin-bottom: 20px;
  letter-spacing: 0.1em;
`

const IntroSubtitle = styled.p`
  font-size: 20px;
  color: ${theme.colors.accent};
  letter-spacing: 0.15em;
  margin-bottom: 48px;
  font-weight: 400;
`

const TagRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  color: ${theme.colors.textSecondary};
  letter-spacing: 0.03em;
  font-weight: 300;
  margin-bottom: 60px;

  span {
    padding: 8px 20px;
    background: ${theme.colors.highlight};
    border-radius: 24px;
    border: 1px solid ${theme.colors.border};
  }
`

const AdvantagesSection = styled.section`
  padding: 60px;
  animation: ${fadeSlideUp} 800ms cubic-bezier(0.4, 0, 0.2, 1) both;
  animation-delay: 300ms;
`

const AdvantagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
`

const AdvantageCard = styled.div`
  background-color: ${theme.colors.highlight};
  border-radius: ${theme.borderRadius.card}px;
  padding: 32px;
  border: 1px solid ${theme.colors.border};
  transition: all ${theme.transitions.cardHover};

  &:hover {
    box-shadow: ${theme.shadows.card};
    border-color: ${theme.colors.accent};
    transform: translateY(-4px);
  }
`

const AdvantageCardTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: ${theme.colors.primary};
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid ${theme.colors.accent};
`

const AdvantageCardContent = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
  color: ${theme.colors.textSecondary};
  line-height: 2;
  font-weight: 300;

  li {
    position: relative;
    padding-left: 20px;
    margin-bottom: 8px;

    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: ${theme.colors.accent};
    }
  }
`

const FooterButton = styled.button`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px 36px;
  background: linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentLight} 100%);
  border: none;
  border-radius: 40px;
  color: white;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  box-shadow: ${theme.shadows.float};
  transition: all ${theme.transitions.buttonHover};
  z-index: 100;
  letter-spacing: 0.05em;

  &:hover {
    transform: translateX(-50%) translateY(-3px);
    box-shadow: 0 8px 32px rgba(139, 115, 85, 0.4);
  }

  &:active {
    transform: translateX(-50%) translateY(0);
  }
`

export function HomePage() {
  const navigate = useNavigate()

  return (
    <HomeWrapper>
      <ResumeContainer>
        <IntroSection>
          <IntroTitle>AI Agent 开发工程师</IntroTitle>
          <IntroSubtitle>让 AI 在工业场景中真正落地</IntroSubtitle>
          <TagRow>
            <span>9年经验</span>
            <span>LangGraph</span>
            <span>RAG</span>
            <span>Python</span>
            <span>工业AGV</span>
          </TagRow>
        </IntroSection>

        <AdvantagesSection>
          <AdvantagesGrid>
            <AdvantageCard>
              <AdvantageCardTitle>Agent 架构设计与落地</AdvantageCardTitle>
              <AdvantageCardContent>
                <li>熟练掌握 LangGraph ReAct 工作流</li>
                <li>自研强制检索机制，实现 0 幻觉</li>
                <li>多节点状态机调度设计</li>
                <li>AI 协作开发流程（Cursor + Claude）</li>
              </AdvantageCardContent>
            </AdvantageCard>

            <AdvantageCard>
              <AdvantageCardTitle>RAG 系统全栈优化</AdvantageCardTitle>
              <AdvantageCardContent>
                <li>PGVector 索引调优，召回率 95%+</li>
                <li>Embedding 工厂模式（本地/云端切换）</li>
                <li>混合检索策略（向量 + 全文）</li>
                <li>多格式文档 ETL Pipeline</li>
              </AdvantageCardContent>
            </AdvantageCard>

            <AdvantageCard>
              <AdvantageCardTitle>后端工程与系统集成</AdvantageCardTitle>
              <AdvantageCardContent>
                <li>Django/DRF/FastAPI 微服务开发</li>
                <li>MQTT 工业协议与消息可靠性</li>
                <li>WMS/MES/电梯等多系统对接</li>
                <li>高并发缓存与生产级架构</li>
              </AdvantageCardContent>
            </AdvantageCard>
          </AdvantagesGrid>
        </AdvantagesSection>
      </ResumeContainer>

      <FooterButton onClick={() => navigate('/portfolio')}>
        前往我的案例库 →
      </FooterButton>
    </HomeWrapper>
  )
}