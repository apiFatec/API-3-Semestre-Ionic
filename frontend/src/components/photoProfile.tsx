import photo from '../../public/lula.jpg';

export function PhotoProfile() {
  return (
    <div className="flex w-8 h-8 rounded-full overflow-hidden absolute">
      <img src={photo} alt="caralho" />
    </div>
  )
}