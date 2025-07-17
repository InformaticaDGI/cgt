const KPIIcon = ({ icon, size = 24, color = "#7A8E8B" }: { icon: React.ElementType, size?: number, color?: string }) => {
    const Icon = icon;
    return <Icon size={size} color={color} />
}

export default KPIIcon;