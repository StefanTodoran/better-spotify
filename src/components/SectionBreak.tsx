interface Props {
  iconSrc: string,
  children: React.ReactNode
}

export default function SectionBreak({ iconSrc, children }: Props) {
  return (
    <div className="icon-section-label">
      {children}
      <img src={iconSrc} />
      <hr/>
    </div>
  );
}