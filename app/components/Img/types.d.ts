import { FunctionalComponent } from '../../typings/component';

export interface ImgComponentFn extends FunctionalComponent<ImgProps> {}

export interface ImgProps {
  src: string;
  alt: string;
  className?: string;
}
