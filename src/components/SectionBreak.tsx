interface Props {
  iconSrc: string,
  children: React.ReactNode
}

export default function SectionBreak({ iconSrc, children }: Props) {
  return (
    <p className="icon-section-label">
      {children}
      <img src={iconSrc} />
      <hr/>
    </p>
  );
}