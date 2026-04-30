import styled, { keyframes } from 'styled-components'
import { theme } from '../styles/theme'
import { useNavigate } from 'react-router-dom'
import projects from '../../homepage-data/projects.json'

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

const HomeContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0 40px;
  animation: ${fadeSlideUp} 800ms cubic-bezier(0.4, 0, 0.2, 1) both;
`

const ProjectShowcase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 80px 0;
`

const ProjectItem = styled.div<{ $delay?: string }>`
  animation: ${fadeSlideUp} 800ms cubic-bezier(0.4, 0, 0.2, 1) both;
  animation-delay: ${(props) => props.$delay || '100ms'};
`

const ProjectInfo = styled.div`
  margin-bottom: 24px;
`

const ProjectTitle = styled.h3`
  font-size: 22px;
  font-weight: 500;
  color: ${theme.colors.primary};
  margin-bottom: 10px;
`

const ProjectDescription = styled.p`
  font-size: 15px;
  color: ${theme.colors.textSecondary};
  line-height: 1.8;
  font-weight: 300;
  margin: 0 0 16px 0;
`

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${theme.colors.accent};
  text-decoration: none;
  font-weight: 400;
  transition: color ${theme.transitions.fade};

  &:hover {
    color: ${theme.colors.accentLight};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`

const ProjectImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: ${theme.borderRadius.card}px;
  box-shadow: ${theme.shadows.card};
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
      <HomeContainer>
        <ProjectShowcase>
          {projects.map((project, index) => (
            <ProjectItem key={project.name} $delay={`${100 + index * 150}ms`}>
              <ProjectInfo>
                <ProjectTitle>{project.name}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectLink href={project.url} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  查看源码
                </ProjectLink>
              </ProjectInfo>
              <ProjectImage
                src={new URL(`../../homepage-data/${project.image}`, import.meta.url).href}
                alt={project.name}
              />
            </ProjectItem>
          ))}
        </ProjectShowcase>
      </HomeContainer>

      <FooterButton onClick={() => navigate('/portfolio')}>
        前往我的案例库 →
      </FooterButton>
    </HomeWrapper>
  )
}