export default function SectionHead({ no, file, title, desc }) {
  return (
    <div className="shead" data-reveal>
      <p className="shead__file"><span className="shead__no">{no}</span> {file}</p>
      <h2 className="shead__title">{title}</h2>
      {desc && <p className="shead__desc">{desc}</p>}
    </div>
  )
}
