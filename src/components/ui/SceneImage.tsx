import { getImageProps, type StaticImageData } from 'next/image';
import { preload } from 'react-dom';
import { NOT_PHONE_QUERY, PHONE_QUERY } from '@/lib/media';

type SceneImageProps = {
  src: StaticImageData;
  phone: StaticImageData;
  sizes: string;
  phoneSizes: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
};

export function SceneImage({
  src,
  phone,
  sizes,
  phoneSizes,
  fill = true,
  priority = false,
  className,
}: SceneImageProps) {
  const common = {
    alt: '',
    fill,
    loading: priority ? 'eager' : undefined,
    fetchPriority: priority ? 'high' : undefined,
  } as const;
  const { props: phoneProps } = getImageProps({ ...common, src: phone, sizes: phoneSizes });
  const {
    props: { alt, ...props },
  } = getImageProps({ ...common, src, sizes, className });

  if (priority) {
    preload(props.src, {
      as: 'image',
      imageSrcSet: props.srcSet,
      imageSizes: sizes,
      media: NOT_PHONE_QUERY,
      fetchPriority: 'high',
    });
    preload(phoneProps.src, {
      as: 'image',
      imageSrcSet: phoneProps.srcSet,
      imageSizes: phoneSizes,
      media: PHONE_QUERY,
      fetchPriority: 'high',
    });
  }

  return (
    <picture>
      <source
        media={PHONE_QUERY}
        srcSet={phoneProps.srcSet}
        sizes={phoneSizes}
        width={fill ? undefined : phone.width}
        height={fill ? undefined : phone.height}
      />
      <img alt={alt} {...props} />
    </picture>
  );
}
