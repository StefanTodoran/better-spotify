interface Props {
  iconSrc: string,
  children: React.ReactNode
}

export default function PageHeading({ iconSrc, children }: Props) {
  return (
    <h2 className="icon-heading">
      {children}
      <img src={iconSrc} />
    </h2>
  );
}