import photo from '../../public/lula.jpg';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function PhotoProfile({ url }: { url: string }) {
  return (
    <Avatar className="h-11 w-11">
      <AvatarImage src={url} />
      <AvatarFallback>{'A'}</AvatarFallback>
    </Avatar>
  )
}