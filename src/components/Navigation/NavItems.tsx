import styled from "styled-components";
import MenuItem from "./MenuItem";
import buildNavItems from "./config";
import { useAuthStorage } from "../../store/auth-storage";
import { useMemo, useState } from "react";
import type { NavSectionTitleProps } from "./config";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Flex } from "../Layout/Flex";

const NavItems = () => {
  const { logout, user } = useAuthStorage()
  const menuItems = buildNavItems(user?.role.name || '*', logout);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  
  const { groupedItems, standaloneItems } = useMemo(() => {
    const groups: { section: NavSectionTitleProps; items: any[] }[] = [];
    const standalone: any[] = [];
    let currentSection: NavSectionTitleProps | null = null;
    let currentItems: any[] = [];

    menuItems.forEach((item) => {
      if ('sectionTitle' in item) {
        // Si hay una sección anterior, la guardamos
        if (currentSection) {
          groups.push({ section: currentSection, items: currentItems });
        }
        // Iniciamos nueva sección
        currentSection = item as NavSectionTitleProps;
        currentItems = [];
      } else {
        // Si no hay sección actual, es un item suelto
        if (!currentSection) {
          standalone.push(item);
        } else {
          // Agregamos el item a la sección actual
          currentItems.push(item);
        }
      }
    });

    // Agregamos la última sección
    if (currentSection) {
      groups.push({ section: currentSection, items: currentItems });
    }

    return { groupedItems: groups, standaloneItems: standalone };
  }, [menuItems]);

  const toggleSection = (sectionTitle: string) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(sectionTitle)) {
      newCollapsed.delete(sectionTitle);
    } else {
      newCollapsed.add(sectionTitle);
    }
    setCollapsedSections(newCollapsed);
  };

  return (
    <Menu>
      {/* Elementos sueltos */}
      {standaloneItems.length > 0 && (
        <StandaloneSection>
          {standaloneItems.map((item, index) => (
            <MenuItem item={item} key={`standalone-${index}`} />
          ))}
        </StandaloneSection>
      )}
      
      {/* Secciones agrupadas */}
      {groupedItems.map((group, index) => {
        const isCollapsed = collapsedSections.has(group.section.sectionTitle);
        
        return (
          <SectionGroup key={index}>
            <CollapsibleSection 
              section={group.section} 
              isCollapsed={isCollapsed}
              onToggle={() => toggleSection(group.section.sectionTitle)}
            />
            <CollapsibleContent $isCollapsed={isCollapsed}>
              {group.items.map((item, itemIndex) => (
                <MenuItem item={item} key={itemIndex} />
              ))}
            </CollapsibleContent>
          </SectionGroup>
        );
      })}
    </Menu>
  );
};

const CollapsibleSection = ({ 
  section, 
  isCollapsed = true, 
  onToggle 
}: { 
  section: NavSectionTitleProps; 
  isCollapsed: boolean; 
  onToggle: () => void;
}) => {
  const Icon = section.icon;
  
  return (
    <SectionContainer>
      <SectionHeader onClick={onToggle}>
        <Flex $justify="start" $padding="10px 14px" $direction="row" $gap="10px" $align="center">
          {Icon && <Icon color="white" size={14} />}
          <Title>{section.sectionTitle}</Title>
          <CollapseIcon $isCollapsed={isCollapsed}>
            {isCollapsed ? <FaChevronRight size={10} /> : <FaChevronDown size={10} />}
          </CollapseIcon>
        </Flex>
      </SectionHeader>
    </SectionContainer>
  );
};

export default NavItems

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  padding: 0.4em 0;
  flex: 1;
`;

const StandaloneSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  margin-bottom: 0.8em;
  padding-bottom: 0.8em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const SectionGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionContainer = styled.div`
  margin: 6px 0;
  border-radius: 10px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const SectionHeader = styled.div`
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Title = styled.h2`
  font-size: 11px;
  color: white;
  font-weight: 600;
  margin: 0;
  flex: 1;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const CollapseIcon = styled.div<{ $isCollapsed: boolean }>`
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  transform: ${props => props.$isCollapsed ? 'rotate(0deg)' : 'rotate(0deg)'};
  
  &:hover {
    color: white;
  }
`;

const CollapsibleContent = styled.div<{ $isCollapsed: boolean }>`
  max-height: ${props => props.$isCollapsed ? '0px' : '500px'};
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${props => props.$isCollapsed ? '0' : '1'};
  transform: ${props => props.$isCollapsed ? 'translateY(-8px)' : 'translateY(0)'};
  padding-left: 14px;
`;