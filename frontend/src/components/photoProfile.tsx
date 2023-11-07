import photo from '../../public/lula.jpg';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function PhotoProfile({ url }: { url: string }) {
  return (
    <Avatar className="h-11 w-11 shadow-md border-black/20 border-[1px]">
      <AvatarImage src={url} />
      <AvatarFallback>{}</AvatarFallback>
    </Avatar>
  )
}