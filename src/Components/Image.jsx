import { IKImage } from 'imagekitio-react';

const Image = ({src,classname,w,h,alt}) => {
  return (
    <IKImage
        urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
        path={src}
        className={classname}
        loading='lazy'
        lqip={{active: true, quality: 20}}
        width={w}
        height={h}
        alt={alt}
    />
  )
}

export default Image
