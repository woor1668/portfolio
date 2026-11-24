export default function SectionHead({ no, file, title, desc }) {
  return (
    <div className="shead" data-reveal>
      <p className="shead__file"><span className="shead__no">{no}</span> <span className="shead__type" style={{ '--n': file.length }}>{file}</span></p>
      <h2 className="shead__title"><span className="shead__mask"><span>{title}</span></span></h2>
      {desc && <p className="shead__desc">{desc}</p>}
    </div>
  )
}
