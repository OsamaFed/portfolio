type Props = {
  text: string
}

export default function SectionLabel({ text }: Props) {
  return (
    <p className="font-mono text-[11px] text-white/30 tracking-[0.25em] uppercase mb-12">
      {text}
    </p>
  )
}
